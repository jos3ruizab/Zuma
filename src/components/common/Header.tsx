'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  userRole?: 'producer' | 'buyer' | null;
}

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
  roles: ('producer' | 'buyer')[];
  tooltip: string;
}

const Header = ({ userRole = null }: HeaderProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    {
      label: 'Panel',
      path: '/producer-dashboard',
      icon: 'ChartBarIcon',
      roles: ['producer'],
      tooltip: 'Gestiona tus ofertas y ventas'
    },
    {
      label: 'Crear Oferta',
      path: '/producer-offer-creation',
      icon: 'PlusCircleIcon',
      roles: ['producer'],
      tooltip: 'Publica un nuevo producto'
    },
    {
      label: 'Mercado',
      path: '/buyer-marketplace-feed',
      icon: 'ShoppingBagIcon',
      roles: ['buyer'],
      tooltip: 'Explora productos disponibles'
    },
    {
      label: 'Mis Compras',
      path: '/offer-details',
      icon: 'ClipboardDocumentListIcon',
      roles: ['buyer'],
      tooltip: 'Revisa tus pedidos'
    }
  ];

  const filteredNavItems = userRole 
    ? navigationItems.filter(item => item.roles.includes(userRole))
    : [];

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-[100] bg-background border-b border-border shadow-sm">
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Image
              src="/assets/images/upscalemedia-transformed_1_-1763869666562.png"
              alt="ZUMA Venezuelan indigenous-inspired geometric logo"
              width={40}
              height={40}
              className="transition-transform hover:scale-105 animation-ease-out"
              priority
            />
            <span className="font-heading text-xl font-bold text-foreground hidden sm:block">
              ZUMA
            </span>
          </Link>

          {/* Desktop Navigation */}
          {userRole && (
            <nav className="hidden md:flex items-center space-x-1 ml-8">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-md
                    transition-all animation-ease-out
                    ${isActive(item.path)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                  title={item.tooltip}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Right Actions */}
          <div className="flex items-center space-x-3 ml-auto">
            {/* Profile/Account */}
            {userRole && (
              <button
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-muted transition-all animation-ease-out"
                title="Mi cuenta"
              >
                <Icon name="UserCircleIcon" size={24} />
                <span className="hidden lg:block text-sm font-medium text-foreground">
                  Cuenta
                </span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            {userRole && (
              <button
                className="md:hidden p-2 rounded-md hover:bg-muted transition-all animation-ease-out"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <Icon 
                  name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} 
                  size={24} 
                />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {userRole && isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="px-4 py-3 space-y-1">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-md
                    transition-all animation-ease-out
                    ${isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item.icon as any} size={22} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <button
                className="flex items-center space-x-3 px-4 py-3 rounded-md w-full text-left hover:bg-muted transition-all animation-ease-out"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name="UserCircleIcon" size={22} />
                <span className="font-medium text-foreground">Mi Cuenta</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
