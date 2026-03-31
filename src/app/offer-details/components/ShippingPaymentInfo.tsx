import Icon from '@/components/ui/AppIcon';

interface ShippingPaymentInfoProps {
  shippingMethods: Array<{
    name: string;
    description: string;
    estimatedDays: string;
  }>;
  paymentMethods: string[];
  terms: string[];
}

const ShippingPaymentInfo = ({
  shippingMethods,
  paymentMethods,
  terms,
}: ShippingPaymentInfoProps) => {
  return (
    <div className="space-y-6">
      {/* Shipping Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="TruckIcon" size={20} className="text-primary" />
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Información de Envío
          </h2>
        </div>
        <div className="space-y-3">
          {shippingMethods.map((method, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
              <Icon
                name="CheckCircleIcon"
                size={18}
                className="text-accent mt-0.5"
                variant="solid"
              />
              <div className="flex-1">
                <p className="font-medium text-foreground">{method.name}</p>
                <p className="text-sm text-muted-foreground">{method.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Tiempo estimado: {method.estimatedDays}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="CreditCardIcon" size={20} className="text-primary" />
          <h2 className="font-heading text-lg font-semibold text-foreground">Métodos de Pago</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {paymentMethods.map((method, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-md"
            >
              {method}
            </span>
          ))}
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="DocumentTextIcon" size={20} className="text-primary" />
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Términos y Condiciones
          </h2>
        </div>
        <ul className="space-y-2">
          {terms.map((term, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-foreground">
              <Icon name="CheckIcon" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <span>{term}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShippingPaymentInfo;
