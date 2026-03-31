import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';
import { reviewSchema } from '../../../lib/validations';
import { updateTrustScore } from '../../../lib/trust';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const revieweeId = searchParams.get('revieweeId');

  if (!revieweeId) {
    return NextResponse.json({ error: 'revieweeId requerido' }, { status: 400 });
  }

  const reviews = await prisma.review.findMany({
    where: { revieweeId },
    include: { reviewer: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(reviews);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // Verify the buyer completed a transaction for this offer
  const transaction = await prisma.transaction.findFirst({
    where: {
      offerId: parsed.data.offerId,
      buyerId: session.user.id,
      status: 'COMPLETED',
    },
  });

  if (!transaction) {
    return NextResponse.json(
      { error: 'Solo puedes reseñar ofertas con transacciones completadas' },
      { status: 403 }
    );
  }

  const review = await prisma.review.create({
    data: {
      reviewerId: session.user.id,
      revieweeId: parsed.data.revieweeId,
      offerId: parsed.data.offerId,
      rating: parsed.data.rating,
      comment: parsed.data.comment,
    },
  });

  // Update trust score for the reviewee
  const producer = await prisma.producerProfile.findUnique({
    where: { userId: parsed.data.revieweeId },
  });
  if (producer) await updateTrustScore(producer.id);

  return NextResponse.json(review, { status: 201 });
}
