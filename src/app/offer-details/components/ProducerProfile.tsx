import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ProducerProfileProps {
  name: string;
  location: string;
  avatar: string;
  avatarAlt: string;
  verified: boolean;
  rating: number;
  totalSales: number;
  memberSince: string;
  bio: string;
}

const ProducerProfile = ({
  name,
  location,
  avatar,
  avatarAlt,
  verified,
  rating,
  totalSales,
  memberSince,
  bio
}: ProducerProfileProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
        Información del Productor
      </h2>

      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <AppImage
            src={avatar}
            alt={avatarAlt}
            fill
            className="object-cover"
          />
          {verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full border-2 border-background flex items-center justify-center">
              <Icon name="CheckBadgeIcon" size={16} className="text-accent-foreground" variant="solid" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              {name}
            </h3>
            {verified && (
              <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded">
                Verificado
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Icon name="MapPinIcon" size={16} />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Icon name="StarIcon" size={16} className="text-primary" variant="solid" />
              <span className="text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {totalSales} ventas
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-border">
        <p className="text-sm text-foreground leading-relaxed">
          {bio}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="CalendarIcon" size={14} />
          <span>Miembro desde {memberSince}</span>
        </div>
      </div>
    </div>
  );
};

export default ProducerProfile;
