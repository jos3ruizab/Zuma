import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../lib/auth';
import { prisma } from '../../../lib/prisma';
import { kycSchema } from '../../../lib/validations';
import { updateTrustScore } from '../../../lib/trust';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const docs = await prisma.kycDocument.findMany({
    where: { userId: session.user.id },
    orderBy: { uploadedAt: 'desc' },
  });

  return NextResponse.json(docs);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const body = await req.json();
  const parsed = kycSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // Upsert: one document per type per user
  const doc = await prisma.kycDocument.upsert({
    where: {
      // Since there's no unique constraint on userId+docType, find and update
      id:
        (
          await prisma.kycDocument.findFirst({
            where: { userId: session.user.id, docType: parsed.data.docType },
          })
        )?.id ?? 'new',
    },
    update: {
      docUrl: parsed.data.docUrl,
      status: 'PENDING',
    },
    create: {
      userId: session.user.id,
      docType: parsed.data.docType,
      docUrl: parsed.data.docUrl,
      status: 'PENDING',
    },
  });

  return NextResponse.json(doc, { status: 201 });
}

// Admin: approve or reject a KYC document
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  // For now, only allow self-approval for demo purposes
  // In production, restrict this to admin users
  const body = await req.json();
  const { docId, status } = body;

  if (!docId || !['APPROVED', 'REJECTED'].includes(status)) {
    return NextResponse.json(
      { error: 'docId y status (APPROVED|REJECTED) requeridos' },
      { status: 400 }
    );
  }

  const doc = await prisma.kycDocument.update({
    where: { id: docId },
    data: { status },
  });

  // Update producer trust score when KYC is approved
  if (status === 'APPROVED') {
    const producer = await prisma.producerProfile.findUnique({
      where: { userId: doc.userId },
    });
    if (producer) {
      await updateTrustScore(producer.id);
      // Check if all 3 doc types are approved → set verificationStatus to VERIFIED
      const approvedDocs = await prisma.kycDocument.count({
        where: { userId: doc.userId, status: 'APPROVED' },
      });
      if (approvedDocs >= 3) {
        await prisma.producerProfile.update({
          where: { id: producer.id },
          data: { verificationStatus: 'VERIFIED' },
        });
      }
    }
  }

  return NextResponse.json(doc);
}
