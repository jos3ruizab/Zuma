import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../lib/auth';
import { prisma } from '../../../../lib/prisma';
import { updateTrustScore } from '../../../../lib/trust';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const action = body?.action as string;

  const transaction = await prisma.transaction.findUnique({ where: { id } });
  if (!transaction)
    return NextResponse.json({ error: 'Transacción no encontrada' }, { status: 404 });

  if (transaction.buyerId !== session.user.id) {
    return NextResponse.json({ error: 'Sin permiso' }, { status: 403 });
  }

  if (action === 'confirm') {
    const updated = await prisma.transaction.update({
      where: { id },
      data: { status: 'COMPLETED', escrowStatus: 'RELEASED' },
    });
    // Recalculate producer trust score
    const producer = await prisma.producerProfile.findUnique({
      where: { userId: transaction.producerId },
    });
    if (producer) await updateTrustScore(producer.id);
    return NextResponse.json(updated);
  }

  if (action === 'dispute') {
    const updated = await prisma.transaction.update({
      where: { id },
      data: { status: 'DISPUTED' },
    });
    return NextResponse.json(updated);
  }

  return NextResponse.json(
    { error: 'Acción no válida. Use "confirm" o "dispute"' },
    { status: 400 }
  );
}
