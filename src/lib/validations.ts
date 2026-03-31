import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).max(100),
  phone: z.string().optional(),
  role: z.enum(['PRODUCER', 'BUYER']),
  businessName: z.string().optional(),
  location: z.string().optional(),
});

export const offerSchema = z.object({
  cropType: z.enum(['CACAO', 'CAFE', 'PLATANO']),
  quantity: z.number().positive(),
  unit: z.string().default('kg'),
  price: z.number().positive(),
  quality: z.enum(['A', 'B', 'C']).default('B'),
  description: z.string().max(1000).optional(),
  photos: z.array(z.string().url()).default([]),
});

export const reviewSchema = z.object({
  revieweeId: z.string(),
  offerId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
});

export const transactionSchema = z.object({
  offerId: z.string(),
  amount: z.number().positive(),
});

export const kycSchema = z.object({
  docType: z.enum(['CEDULA', 'RIF', 'LICENCIA_NEGOCIO']),
  docUrl: z.string().url(),
});
