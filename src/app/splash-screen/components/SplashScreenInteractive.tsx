'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedLogo from './AnimatedLogo';
import RoleCard from './RoleCard';

interface RoleOption {
  id: 'producer' | 'buyer';
  title: string;
  description: string;
  iconName: 'UserGroupIcon' | 'ShoppingBagIcon';
  route: string;
}

const SplashScreenInteractive = () => {
  const router = useRouter();
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'producer' | 'buyer' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const roleOptions: RoleOption[] = [
    {
      id: 'producer',
      title: 'Productor',
      description:
        'Vende tus cultivos directamente a compradores globales con precios justos impulsados por IA',
      iconName: 'UserGroupIcon',
      route: '/producer-dashboard',
    },
    {
      id: 'buyer',
      title: 'Comprador',
      description: 'Descubre productos agrícolas auténticos de Venezuela con calidad verificada',
      iconName: 'ShoppingBagIcon',
      route: '/buyer-marketplace-feed',
    },
  ];

  const handleAnimationComplete = () => {
    setShowRoleSelection(true);
  };

  const handleRoleSelect = (role: 'producer' | 'buyer') => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (!selectedRole) return;

    setIsTransitioning(true);

    // Store role preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRole', selectedRole);
    }

    const selectedOption = roleOptions.find((opt) => opt.id === selectedRole);

    setTimeout(() => {
      if (selectedOption) {
        router.push(selectedOption.route);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div
        className={`w-full max-w-2xl transition-opacity duration-500 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Animated Logo Section */}
        <div className="mb-12">
          <AnimatedLogo onAnimationComplete={handleAnimationComplete} />
        </div>

        {/* Role Selection Section */}
        <div
          className={`transition-all duration-700 ${
            showRoleSelection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl font-semibold text-foreground mb-2">
              Selecciona tu Rol
            </h2>
            <p className="text-muted-foreground">Elige cómo deseas usar ZUMA Marketplace</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {roleOptions.map((option) => (
              <RoleCard
                key={option.id}
                role={option.id}
                title={option.title}
                description={option.description}
                iconName={option.iconName}
                isSelected={selectedRole === option.id}
                onClick={() => handleRoleSelect(option.id)}
              />
            ))}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`
              w-full py-4 rounded-lg font-heading font-semibold text-lg
              transition-all animation-ease-out
              ${
                selectedRole
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }
            `}
          >
            Continuar
          </button>

          {/* Helper Text */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Puedes cambiar tu rol en cualquier momento desde la configuración
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreenInteractive;
