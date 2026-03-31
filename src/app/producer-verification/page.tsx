'use client';

import { useState, useEffect } from 'react';
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

type DocType = 'CEDULA' | 'RIF' | 'LICENCIA_NEGOCIO';
type KycStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

interface KycDocument {
  id: string;
  docType: DocType;
  docUrl: string;
  status: KycStatus;
  uploadedAt: string;
}

const DOC_LABELS: Record<DocType, string> = {
  CEDULA: 'Cédula de Identidad',
  RIF: 'RIF (Registro Fiscal)',
  LICENCIA_NEGOCIO: 'Licencia de Negocio',
};

function StatusBadge({ status }: { status: KycStatus }) {
  if (status === 'APPROVED')
    return (
      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
        <CheckCircleIcon className="w-4 h-4" /> Aprobado
      </span>
    );
  if (status === 'REJECTED')
    return (
      <span className="flex items-center gap-1 text-red-600 text-sm font-medium">
        <XCircleIcon className="w-4 h-4" /> Rechazado
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-yellow-600 text-sm font-medium">
      <ClockIcon className="w-4 h-4" /> Pendiente
    </span>
  );
}

export default function ProducerVerificationPage() {
  const [docs, setDocs] = useState<KycDocument[]>([]);
  const [uploading, setUploading] = useState<DocType | null>(null);
  const [urls, setUrls] = useState<Record<DocType, string>>({
    CEDULA: '',
    RIF: '',
    LICENCIA_NEGOCIO: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/kyc')
      .then((r) => r.json())
      .then(setDocs)
      .catch(() => {});
  }, []);

  function getDoc(type: DocType) {
    return docs.find((d) => d.docType === type);
  }

  async function handleUpload(docType: DocType) {
    const url = urls[docType];
    if (!url) return;
    setUploading(docType);
    setMessage('');

    const res = await fetch('/api/kyc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ docType, docUrl: url }),
    });

    setUploading(null);

    if (res.ok) {
      const newDoc = await res.json();
      setDocs((prev) => {
        const filtered = prev.filter((d) => d.docType !== docType);
        return [...filtered, newDoc];
      });
      setUrls((prev) => ({ ...prev, [docType]: '' }));
      setMessage('Documento enviado correctamente. Estará en revisión pronto.');
    } else {
      setMessage('Error al subir el documento. Intente de nuevo.');
    }
  }

  const allApproved = (['CEDULA', 'RIF', 'LICENCIA_NEGOCIO'] as DocType[]).every(
    (type) => getDoc(type)?.status === 'APPROVED'
  );

  return (
    <div className="min-h-screen bg-surface-50 p-4 pb-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/producer-dashboard"
            className="text-secondary-500 hover:text-secondary-700 text-sm"
          >
            ← Volver
          </Link>
        </div>

        <h1 className="text-2xl font-display font-bold text-secondary-900 mb-2">
          Verificación KYC
        </h1>
        <p className="text-secondary-600 mb-6">
          Sube tus documentos para obtener el badge de productor verificado y aumentar tu confianza
          en la plataforma.
        </p>

        {allApproved && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
            <p className="text-green-700 font-medium">
              ¡Cuenta verificada! Tu badge aparecerá en tus ofertas.
            </p>
          </div>
        )}

        {message && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 text-blue-700 text-sm">
            {message}
          </div>
        )}

        <div className="space-y-4">
          {(['CEDULA', 'RIF', 'LICENCIA_NEGOCIO'] as DocType[]).map((docType) => {
            const existing = getDoc(docType);
            return (
              <div key={docType} className="bg-white rounded-xl border border-secondary-200 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-secondary-800">{DOC_LABELS[docType]}</h3>
                  {existing ? (
                    <StatusBadge status={existing.status} />
                  ) : (
                    <span className="text-secondary-400 text-sm">Sin subir</span>
                  )}
                </div>

                {existing?.status !== 'APPROVED' && (
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="URL del documento (Google Drive, Dropbox, etc.)"
                      value={urls[docType]}
                      onChange={(e) => setUrls((prev) => ({ ...prev, [docType]: e.target.value }))}
                      className="flex-1 border border-secondary-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                    />
                    <button
                      onClick={() => handleUpload(docType)}
                      disabled={uploading === docType || !urls[docType]}
                      className="bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowUpTrayIcon className="w-4 h-4" />
                      {uploading === docType ? 'Subiendo...' : 'Subir'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-secondary-400 text-xs mt-4 text-center">
          Los documentos son revisados por nuestro equipo en 1-2 días hábiles.
        </p>
      </div>
    </div>
  );
}
