import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';
import { offerSchema } from '../../../lib/validations';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cropType = searchParams.get('cropType') as 'CACAO' | 'CAFE' | 'PLATANO' | null;
  const sort = searchParams.get('sort') ?? 'createdAt';
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = parseInt(searchParams.get('limit') ?? '20', 10);

  const where = {
    status: 'ACTIVE' as const,
    ...(cropType ? { cropType } : {}),
  };

  const [offers, total] = await Promise.all([
    prisma.offer.findMany({
      where,
      include: {
        producer: {
          select: {
            id: true,
            businessName: true,
            verificationStatus: true,
            trustScore: true,
            location: true,
          },
        },
      },
      orderBy: sort === 'price' ? { price: 'asc' } : { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.offer.count({ where }),
  ]);

  return NextResponse.json({ offers, total, page, limit });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  if ((session.user as { role?: string }).role !== 'PRODUCER') {
    return NextResponse.json(
      { error: 'Solo los productores pueden crear ofertas' },
      { status: 403 }
    );
  }

  const body = await req.json();
  const parsed = offerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const producer = await prisma.producerProfile.findUnique({
    where: { userId: session.user.id },
  });
  if (!producer) {
    return NextResponse.json({ error: 'Perfil de productor no encontrado' }, { status: 404 });
  }

  const offer = await prisma.offer.create({
    data: {
      ...parsed.data,
      photos: JSON.stringify(parsed.data.photos),
      producerId: producer.id,
    },
  });

  return NextResponse.json(offer, { status: 201 });
}
