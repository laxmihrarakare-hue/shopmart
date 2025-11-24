import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const IconComponent = (Icons[category.icon as keyof typeof Icons] as LucideIcon) || Icons.Package;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-blue-500"
    >
      <div className="flex items-center space-x-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg">
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
          <p className="text-sm text-gray-500">{category.product_count} Products</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-600 line-clamp-2">{category.description}</p>
    </div>
  );
}
