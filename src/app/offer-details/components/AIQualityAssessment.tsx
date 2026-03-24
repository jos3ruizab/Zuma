import Icon from '@/components/ui/AppIcon';

interface AIQualityAssessmentProps {
  overallScore: number;
  visualQuality: number;
  ripeness: number;
  consistency: number;
  analysis: string;
  recommendations: string[];
}

const AIQualityAssessment = ({
  overallScore,
  visualQuality,
  ripeness,
  consistency,
  analysis,
  recommendations
}: AIQualityAssessmentProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-accent';
    if (score >= 75) return 'text-primary';
    return 'text-warning';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-accent/10';
    if (score >= 75) return 'bg-primary/10';
    return 'bg-warning/10';
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="SparklesIcon" size={24} className="text-primary-foreground" variant="solid" />
        </div>
        <div>
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Evaluación de Calidad IA
          </h2>
          <p className="text-xs text-muted-foreground">
            Análisis realizado por Gemini Pro Vision
          </p>
        </div>
      </div>

      {/* Overall Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Puntuación General</span>
          <span className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
            {overallScore}/100
          </span>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full ${getScoreBgColor(overallScore)} transition-all duration-500`}
            style={{ width: `${overallScore}%` }}
          />
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-background/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="EyeIcon" size={18} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Calidad Visual</span>
          </div>
          <p className={`text-2xl font-bold ${getScoreColor(visualQuality)}`}>
            {visualQuality}%
          </p>
        </div>
        <div className="bg-background/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="ClockIcon" size={18} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Madurez</span>
          </div>
          <p className={`text-2xl font-bold ${getScoreColor(ripeness)}`}>
            {ripeness}%
          </p>
        </div>
        <div className="bg-background/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="CheckCircleIcon" size={18} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Consistencia</span>
          </div>
          <p className={`text-2xl font-bold ${getScoreColor(consistency)}`}>
            {consistency}%
          </p>
        </div>
      </div>

      {/* Analysis */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-2">Análisis Detallado</h3>
        <p className="text-sm text-foreground leading-relaxed">
          {analysis}
        </p>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Recomendaciones</h3>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <Icon name="CheckCircleIcon" size={16} className="text-accent mt-0.5 flex-shrink-0" variant="solid" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIQualityAssessment;
