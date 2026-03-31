import { prisma } from './prisma';

export async function calculateTrustScore(producerId: string): Promise<number> {
  const producer = await prisma.producerProfile.findUnique({
    where: { id: producerId },
    include: {
      user: {
        include: {
          reviewsReceived: true,
          kycDocuments: { where: { status: 'APPROVED' } },
          transactions: { where: { producerId } },
        },
      },
    },
  });

  if (!producer) return 0;

  const reviews = producer.user.reviewsReceived;
  const approvedKyc = producer.user.kycDocuments;
  const allTransactions = await prisma.transaction.findMany({
    where: { producerId: producer.userId },
  });

  const disputedCount = allTransactions.filter(
    (t: { status: string }) => t.status === 'DISPUTED'
  ).length;

  // Average rating (0-5)
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviews.length
      : 0;

  // KYC bonus: +1 per approved document type (max 3)
  const kycBonus = Math.min(approvedKyc.length, 3);

  // Dispute penalty: -0.5 per disputed transaction
  const disputePenalty = disputedCount * 0.5;

  // Score: weighted average + bonuses - penalties, clamped to 0-5
  const raw = avgRating + kycBonus * 0.3 - disputePenalty;
  return Math.max(0, Math.min(5, parseFloat(raw.toFixed(1))));
}

export async function updateTrustScore(producerId: string): Promise<void> {
  const score = await calculateTrustScore(producerId);
  await prisma.producerProfile.update({
    where: { id: producerId },
    data: { trustScore: score },
  });
}
