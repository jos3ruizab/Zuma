'use client';


import Icon from '@/components/ui/AppIcon';

interface PricingCardProps {
  priceVES: string;
  priceUSD: string;
  aiSuggestionVES: string;
  aiSuggestionUSD: string;
  isLoadingAI: boolean;
  onPriceVESChange: (value: string) => void;
  onPriceUSDChange: (value: string) => void;
  onGetAIPricing: () => void;
}

const PricingCard = ({
  priceVES,
  priceUSD,
  aiSuggestionVES,
  aiSuggestionUSD,
  isLoadingAI,
  onPriceVESChange,
  onPriceUSDChange,
  onGetAIPricing
}: PricingCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
        Precio
      </h2>

      {/* AI Pricing Button */}
      <button
        onClick={onGetAIPricing}
        disabled={isLoadingAI}
        className="w-full mb-6 px-6 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-all animation-ease-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icon name="SparklesIcon" size={24} variant="solid" />
        <span>{isLoadingAI ? 'Analizando mercado...' : 'Precio Justo IA'}</span>
      </button>

      {/* AI Suggestions */}
      {(aiSuggestionVES || aiSuggestionUSD) && (
        <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-lg">
          <div className="flex items-start gap-3 mb-3">
            <Icon name="LightBulbIcon" size={20} className="text-accent mt-0.5" variant="solid" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-2">
                Recomendación de Precio Justo
              </p>
              <div className="grid grid-cols-2 gap-3">
                {aiSuggestionVES && (
                  <div className="bg-background p-3 rounded-md">
                    <p className="text-xs text-muted-foreground mb-1">VES</p>
                    <p className="font-semibold text-foreground">{aiSuggestionVES}</p>
                  </div>
                )}
                {aiSuggestionUSD && (
                  <div className="bg-background p-3 rounded-md">
                    <p className="text-xs text-muted-foreground mb-1">USD</p>
                    <p className="font-semibold text-foreground">{aiSuggestionUSD}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Basado en análisis de mercado actual y tendencias regionales
          </p>
        </div>
      )}

      {/* Price Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Precio en VES
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              Bs.
            </span>
            <input
              type="number"
              value={priceVES}
              onChange={(e) => onPriceVESChange(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full pl-12 pr-4 py-3 border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Precio en USD
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              $
            </span>
            <input
              type="number"
              value={priceUSD}
              onChange={(e) => onPriceUSDChange(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full pl-12 pr-4 py-3 border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </div>

      {/* Exchange Rate Info */}
      <div className="mt-4 p-3 bg-muted rounded-md flex items-center gap-2">
        <Icon name="InformationCircleIcon" size={16} className="text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          Tasa de cambio actual: 1 USD = 36,50 VES
        </p>
      </div>
    </div>
  );
};

export default PricingCard;
