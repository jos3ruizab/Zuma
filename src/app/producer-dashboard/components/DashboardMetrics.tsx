import Icon from '@/components/ui/AppIcon';

interface MetricCardProps {
  icon: string;
  label: string;
  value: string;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

const MetricCard = ({ icon, label, value, subValue, trend, trendValue }: MetricCardProps) => {
  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-muted-foreground'
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all animation-ease-out">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name={icon as any} size={24} className="text-primary" />
        </div>
        {trend && trendValue && (
          <div className={`flex items-center gap-1 ${trendColors[trend]}`}>
            <Icon 
              name={trend === 'up' ? 'ArrowTrendingUpIcon' : trend === 'down' ? 'ArrowTrendingDownIcon' : 'MinusIcon'} 
              size={16} 
            />
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
        {subValue && (
          <p className="text-xs text-muted-foreground mt-1">{subValue}</p>
        )}
      </div>
    </div>
  );
};

interface DashboardMetricsProps {
  metrics: {
    activeOffers: number;
    totalViews: number;
    earningsVES: number;
    earningsUSD: number;
  };
}

const DashboardMetrics = ({ metrics }: DashboardMetricsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <MetricCard
        icon="DocumentTextIcon"
        label="Ofertas Activas"
        value={metrics.activeOffers.toString()}
        trend="up"
        trendValue="+2"
      />
      <MetricCard
        icon="EyeIcon"
        label="Vistas Totales"
        value={metrics.totalViews.toLocaleString('es-VE')}
        trend="up"
        trendValue="+15%"
      />
      <MetricCard
        icon="BanknotesIcon"
        label="Ganancias (VES)"
        value={`Bs. ${metrics.earningsVES.toLocaleString('es-VE')}`}
        subValue={`≈ $${metrics.earningsUSD.toFixed(2)} USD`}
        trend="up"
        trendValue="+8%"
      />
      <MetricCard
        icon="ChartBarIcon"
        label="Tasa de Conversión"
        value="24%"
        trend="neutral"
        trendValue="0%"
      />
    </div>
  );
};

export default DashboardMetrics;
