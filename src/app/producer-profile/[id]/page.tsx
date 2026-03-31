import { CheckBadgeIcon, StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const CROP_LABELS: Record<string, string> = {
  CACAO: 'Cacao',
  CAFE: 'Café',
  PLATANO: 'Plátano',
};

interface ProducerPageProps {
  params: Promise<{ id: string }>;
}

async function getProducer(id: string) {
  const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:4028';
  const res = await fetch(`${baseUrl}/api/producers/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

function Stars({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) =>
        i <= Math.round(score) ? (
          <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
        ) : (
          <StarOutlineIcon key={i} className="w-4 h-4 text-secondary-300" />
        )
      )}
      <span className="text-secondary-600 text-sm ml-1">{score.toFixed(1)}</span>
    </div>
  );
}

export default async function ProducerProfilePage({ params }: ProducerPageProps) {
  const { id } = await params;
  const producer = await getProducer(id);

  if (!producer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-secondary-500">Productor no encontrado.</p>
      </div>
    );
  }

  const reviews = producer.user?.reviewsReceived ?? [];

  return (
    <div className="min-h-screen bg-surface-50 p-4 pb-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/buyer-marketplace-feed"
          className="text-secondary-500 hover:text-secondary-700 text-sm"
        >
          ← Volver al marketplace
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl border border-secondary-200 p-6 mt-4 mb-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-display font-bold text-secondary-900">
                  {producer.businessName}
                </h1>
                {producer.verificationStatus === 'VERIFIED' && (
                  <CheckBadgeIcon
                    className="w-6 h-6 text-primary-500"
                    title="Productor verificado"
                  />
                )}
              </div>
              <p className="text-secondary-500 text-sm">{producer.location}</p>
              {producer.bio && <p className="text-secondary-700 mt-2 text-sm">{producer.bio}</p>}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <Stars score={producer.trustScore} />
            <span className="text-secondary-400 text-sm">·</span>
            <span className="text-secondary-600 text-sm">{reviews.length} reseñas</span>
          </div>
        </div>

        {/* Active offers */}
        {producer.offers?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-secondary-800 mb-3">Ofertas activas</h2>
            <div className="space-y-3">
              {producer.offers.map(
                (offer: {
                  id: string;
                  cropType: string;
                  quantity: number;
                  unit: string;
                  price: number;
                  quality: string;
                }) => (
                  <Link
                    key={offer.id}
                    href={`/offer-details?id=${offer.id}`}
                    className="bg-white rounded-xl border border-secondary-200 p-4 flex items-center justify-between hover:border-primary-300 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-secondary-800">
                        {CROP_LABELS[offer.cropType] ?? offer.cropType}
                      </p>
                      <p className="text-secondary-500 text-sm">
                        {offer.quantity} {offer.unit} · Calidad {offer.quality}
                      </p>
                    </div>
                    <p className="font-semibold text-primary-600">
                      ${offer.price.toLocaleString()}
                    </p>
                  </Link>
                )
              )}
            </div>
          </section>
        )}

        {/* Reviews */}
        <section>
          <h2 className="text-lg font-semibold text-secondary-800 mb-3">Reseñas</h2>
          {reviews.length === 0 ? (
            <p className="text-secondary-400 text-sm">Sin reseñas aún.</p>
          ) : (
            <div className="space-y-3">
              {reviews.map(
                (r: {
                  id: string;
                  rating: number;
                  comment?: string;
                  createdAt: string;
                  reviewer?: { name: string };
                }) => (
                  <div key={r.id} className="bg-white rounded-xl border border-secondary-200 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Stars score={r.rating} />
                      <span className="text-secondary-400 text-xs">
                        {new Date(r.createdAt).toLocaleDateString('es-VE')}
                      </span>
                    </div>
                    {r.comment && <p className="text-secondary-700 text-sm">{r.comment}</p>}
                    <p className="text-secondary-400 text-xs mt-1">{r.reviewer?.name}</p>
                  </div>
                )
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
