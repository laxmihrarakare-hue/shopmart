import { Star } from 'lucide-react';
import { Product, PriceData } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  priceData?: PriceData[];
}

export function ProductCard({ product, priceData }: ProductCardProps) {
  const lowestPrice = priceData?.reduce((min, p) => p.price < min ? p.price : min, Infinity) || 0;

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          {product.is_trending && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Trending
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
            {product.name}
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-700">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="ml-2 text-xs text-gray-500">
              {product.category}
            </span>
          </div>

          {lowestPrice > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-gray-500">Best Price</span>
                <span className="text-xl font-bold text-green-600">
                  ₹{lowestPrice.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
