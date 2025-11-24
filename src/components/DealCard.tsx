import { Star, TrendingDown } from 'lucide-react';
import { Product, PriceData } from '../types';
import { Link } from 'react-router-dom';

interface DealCardProps {
  product: Product;
  priceData?: PriceData[];
}

export function DealCard({ product, priceData }: DealCardProps) {
  const lowestPrice = priceData?.reduce((min, p) => p.price < min ? p.price : min, Infinity) || 0;
  const bestDeal = priceData?.find(p => p.price === lowestPrice);
  const discountValue = bestDeal?.discount ? parseInt(bestDeal.discount) : 0;

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 border-blue-200">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          {discountValue > 0 && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
              <TrendingDown className="w-4 h-4" />
              <span>{bestDeal?.discount}</span>
            </div>
          )}
          {product.is_trending && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Hot Deal
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-2 h-12">
            {product.name}
          </h3>

          <div className="flex items-center mb-3">
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
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Starting from</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{lowestPrice.toLocaleString('en-IN')}
                  </p>
                </div>
                {bestDeal && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">on</p>
                    <p className="text-sm font-semibold text-gray-900">{bestDeal.platform}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
