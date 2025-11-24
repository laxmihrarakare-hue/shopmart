import { ShoppingBag, Package, Store, Zap } from 'lucide-react';

interface PlatformIconProps {
  platform: string;
  className?: string;
}

export function PlatformIcon({ platform, className = "w-6 h-6" }: PlatformIconProps) {
  const platformColors: Record<string, string> = {
    'Amazon': 'text-orange-500',
    'Flipkart': 'text-blue-600',
    'Myntra': 'text-pink-600',
    'Reliance Digital': 'text-red-600',
    'Croma': 'text-green-600',
  };

  const color = platformColors[platform] || 'text-gray-600';

  return (
    <div className={`${color} ${className}`}>
      {platform === 'Amazon' && <ShoppingBag />}
      {platform === 'Flipkart' && <Package />}
      {platform === 'Myntra' && <ShoppingBag />}
      {platform === 'Reliance Digital' && <Zap />}
      {platform === 'Croma' && <Store />}
      {!['Amazon', 'Flipkart', 'Myntra', 'Reliance Digital', 'Croma'].includes(platform) && <Package />}
    </div>
  );
}
