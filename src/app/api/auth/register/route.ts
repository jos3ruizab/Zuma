import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../lib/prisma';
import { registerSchema } from '../../../../lib/validations';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { email, password, name, phone, role, businessName, location } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'El correo ya está registrado' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      phone,
      role,
      ...(role === 'PRODUCER'
        ? {
            producerProfile: {
              create: {
                businessName: businessName ?? name,
                location: location ?? '',
              },
            },
          }
        : {
            buyerProfile: {
              create: {
                businessName,
                location,
              },
            },
          }),
    },
    select: { id: true, email: true, name: true, role: true },
  });

  return NextResponse.json(user, { status: 201 });
}
