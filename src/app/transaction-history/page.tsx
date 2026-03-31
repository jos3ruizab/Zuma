'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type EscrowStatus = 'HELD' | 'RELEASED' | 'REFUNDED';
type TransactionStatus = 'PENDING' | 'ESCROW_HELD' | 'DELIVERED' | 'COMPLETED' | 'DISPUTED';

interface Transaction {
  id: string;
  amount: number;
  status: TransactionStatus;
  escrowStatus: EscrowStatus;
  createdAt: string;
  offer?: {
    cropType: string;
    quantity: number;
    unit: string;
    producer?: { businessName: string; trustScore: number };
  };
  buyer?: { name: string; email: string };
}

const STATUS_LABELS: Record<TransactionStatus, { label: string; color: string }> = {
  PENDING: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700' },
  ESCROW_HELD: { label: 'Pago en escrow', color: 'bg-blue-100 text-blue-700' },
  DELIVERED: { label: 'Entregado', color: 'bg-indigo-100 text-indigo-700' },
  COMPLETED: { label: 'Completado', color: 'bg-green-100 text-green-700' },
  DISPUTED: { label: 'En disputa', color: 'bg-red-100 text-red-700' },
};

const CROP_LABELS: Record<string, string> = {
  CACAO: 'Cacao',
  CAFE: 'Café',
  PLATANO: 'Plátano',
};

export default function TransactionHistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/transactions')
      .then((r) => r.json())
      .then((data) => {
        setTransactions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleAction(id: string, action: 'confirm' | 'dispute') {
    const res = await fetch(`/api/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    });
    if (res.ok) {
      const updated = await res.json();
      setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
    }
  }

  return (
    <div className="min-h-screen bg-surface-50 p-4 pb-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold text-secondary-900">Mis Transacciones</h1>
          <Link
            href="/splash-screen"
            className="text-secondary-500 hover:text-secondary-700 text-sm"
          >
            ← Inicio
          </Link>
        </div>

        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-5 animate-pulse">
                <div className="h-4 bg-secondary-200 rounded w-1/3 mb-2" />
                <div className="h-3 bg-secondary-100 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {!loading && transactions.length === 0 && (
          <div className="text-center py-16 text-secondary-400">
            <p className="text-lg">No tienes transacciones aún.</p>
          </div>
        )}

        <div className="space-y-4">
          {transactions.map((tx) => {
            const meta = STATUS_LABELS[tx.status];
            return (
              <div key={tx.id} className="bg-white rounded-xl border border-secondary-200 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-secondary-800">
                      {tx.offer
                        ? `${CROP_LABELS[tx.offer.cropType] ?? tx.offer.cropType} — ${tx.offer.quantity} ${tx.offer.unit}`
                        : 'Oferta'}
                    </p>
                    {tx.offer?.producer && (
                      <p className="text-secondary-500 text-sm">{tx.offer.producer.businessName}</p>
                    )}
                    {tx.buyer && (
                      <p className="text-secondary-500 text-sm">Comprador: {tx.buyer.name}</p>
                    )}
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${meta.color}`}>
                    {meta.label}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-secondary-600">
                  <span className="font-medium text-secondary-800">
                    ${tx.amount.toLocaleString()}
                  </span>
                  <span>{new Date(tx.createdAt).toLocaleDateString('es-VE')}</span>
                </div>

                {tx.status === 'ESCROW_HELD' && (
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleAction(tx.id, 'confirm')}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 rounded-lg transition-colors"
                    >
                      Confirmar entrega
                    </button>
                    <button
                      onClick={() => handleAction(tx.id, 'dispute')}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium py-2 rounded-lg transition-colors"
                    >
                      Abrir disputa
                    </button>
                  </div>
                )}

                {tx.status === 'COMPLETED' && (
                  <div className="mt-3">
                    <Link
                      href={`/offer-details/${tx.offer ? '' : ''}?review=true&txId=${tx.id}`}
                      className="text-primary-600 text-sm font-medium hover:underline"
                    >
                      Dejar reseña →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
