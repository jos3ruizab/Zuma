import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';
import { offerSchema } from '../../../../lib/validations';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const offer = await prisma.offer.findUnique({
    where: { id },
    include: {
      producer: {
        include: {
          user: { select: { name: true, phone: true } },
        },
      },
      reviews: {
        include: {
          reviewer: { select: { name: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!offer) {
    return NextResponse.json({ error: 'Oferta no encontrada' }, { status: 404 });
  }

  // Increment view count
  await prisma.offer.update({ where: { id }, data: { viewCount: { increment: 1 } } });

  return NextResponse.json(offer);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;
  const offer = await prisma.offer.findUnique({
    where: { id },
    include: { producer: true },
  });

  if (!offer) return NextResponse.json({ error: 'Oferta no encontrada' }, { status: 404 });
  if (offer.producer.userId !== session.user.id) {
    return NextResponse.json({ error: 'Sin permiso' }, { status: 403 });
  }

  const body = await req.json();
  const parsed = offerSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { photos, ...rest } = parsed.data;
  const updated = await prisma.offer.update({
    where: { id },
    data: {
      ...rest,
      ...(photos ? { photos: JSON.stringify(photos) } : {}),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;
  const offer = await prisma.offer.findUnique({
    where: { id },
    include: { producer: true },
  });

  if (!offer) return NextResponse.json({ error: 'Oferta no encontrada' }, { status: 404 });
  if (offer.producer.userId !== session.user.id) {
    return NextResponse.json({ error: 'Sin permiso' }, { status: 403 });
  }

  await prisma.offer.update({ where: { id }, data: { status: 'CANCELLED' } });
  return NextResponse.json({ success: true });
}
