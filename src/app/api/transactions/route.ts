import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';
import { transactionSchema } from '../../../lib/validations';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const userId = session.user.id;
  const role = (session.user as { role?: string }).role;

  let transactions;
  if (role === 'BUYER') {
    transactions = await prisma.transaction.findMany({
      where: { buyerId: userId },
      include: {
        offer: {
          include: { producer: { select: { businessName: true, trustScore: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  } else {
    const producer = await prisma.producerProfile.findUnique({ where: { userId } });
    transactions = producer
      ? await prisma.transaction.findMany({
          where: { producerId: producer.userId },
          include: {
            buyer: { select: { name: true, email: true } },
            offer: { select: { cropType: true, quantity: true, unit: true } },
          },
          orderBy: { createdAt: 'desc' },
        })
      : [];
  }

  return NextResponse.json(transactions);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  if ((session.user as { role?: string }).role !== 'BUYER') {
    return NextResponse.json(
      { error: 'Solo los compradores pueden crear transacciones' },
      { status: 403 }
    );
  }

  const body = await req.json();
  const parsed = transactionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const offer = await prisma.offer.findUnique({
    where: { id: parsed.data.offerId },
    include: { producer: true },
  });

  if (!offer) return NextResponse.json({ error: 'Oferta no encontrada' }, { status: 404 });
  if (offer.status !== 'ACTIVE') {
    return NextResponse.json({ error: 'La oferta no está disponible' }, { status: 409 });
  }

  const [transaction] = await prisma.$transaction([
    prisma.transaction.create({
      data: {
        offerId: parsed.data.offerId,
        buyerId: session.user.id,
        producerId: offer.producer.userId,
        amount: parsed.data.amount,
        status: 'ESCROW_HELD',
        escrowStatus: 'HELD',
      },
    }),
    prisma.offer.update({
      where: { id: parsed.data.offerId },
      data: { status: 'SOLD' },
    }),
  ]);

  return NextResponse.json(transaction, { status: 201 });
}
