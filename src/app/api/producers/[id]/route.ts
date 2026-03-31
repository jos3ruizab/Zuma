import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const producer = await prisma.producerProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: { name: true, createdAt: true },
        include: {
          reviewsReceived: {
            include: {
              reviewer: { select: { name: true } },
              offer: { select: { cropType: true } },
            },
            orderBy: { createdAt: 'desc' },
            take: 20,
          },
          kycDocuments: { select: { docType: true, status: true } },
        },
      },
      offers: {
        where: { status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  });

  if (!producer) {
    return NextResponse.json({ error: 'Productor no encontrado' }, { status: 404 });
  }

  return NextResponse.json(producer);
}
