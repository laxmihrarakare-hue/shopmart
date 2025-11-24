import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ExternalLink, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlatformIcon } from '../components/PlatformIcon';
import { supabase } from '../lib/supabase';
import { ProductWithPrices, PriceHistory } from '../types';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductWithPrices | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProductDetails(id);
    }
  }, [id]);

  const loadProductDetails = async (productId: string) => {
    setLoading(true);
    try {
      const { data: productData } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .maybeSingle();

      if (!productData) {
        navigate('/');
        return;
      }

      const { data: priceData } = await supabase
        .from('price_data')
        .select('*')
        .eq('product_id', productId);

      const { data: historyData } = await supabase
        .from('price_history')
        .select('*')
        .eq('product_id', productId)
        .order('date', { ascending: true });

      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('*, user:users(name)')
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      setProduct({
        ...productData,
        price_data: priceData || [],
        price_history: historyData || [],
        reviews: reviewsData || [],
      });
    } catch (error) {
      console.error('Error loading product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    if (!product?.price_history || product.price_history.length === 0) {
      return [];
    }

    const platformData: Record<string, Record<string, number>> = {};

    product.price_history.forEach((history: PriceHistory) => {
      const date = new Date(history.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      if (!platformData[date]) {
        platformData[date] = {};
      }

      platformData[date][history.platform] = history.price;
    });

    return Object.entries(platformData).map(([date, platforms]) => ({
      date,
      ...platforms,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const chartData = getChartData();
  const platforms = Array.from(new Set(product.price_history.map(h => h.platform)));
  const platformColors: Record<string, string> = {
    'Amazon': '#FF9900',
    'Flipkart': '#2874F0',
    'Myntra': '#FF3F6C',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-lg font-medium text-gray-700">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="text-gray-600">{product.category}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <h2 className="text-sm font-medium text-gray-500 mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Available On</h2>
              <div className="space-y-3">
                {product.price_data.map((price) => (
                  <div
                    key={price.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <PlatformIcon platform={price.platform} className="w-6 h-6" />
                      <div>
                        <p className="font-medium text-gray-900">{price.platform}</p>
                        {price.discount && (
                          <p className="text-xs text-red-600">{price.discount} off</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-bold text-green-600">
                        ₹{price.price.toFixed(2)}
                      </span>
                      {price.url && (
                        <a
                          href={price.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1"
                        >
                          <span>Buy</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {chartData.length > 0 && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Price Trend</h2>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {platforms.map((platform) => (
                  <Line
                    key={platform}
                    type="monotone"
                    dataKey={platform}
                    stroke={platformColors[platform] || '#8884d8'}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          {product.reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No reviews yet</p>
          ) : (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {review.user?.name?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <span className="font-medium text-gray-900">
                        {review.user?.name || 'Anonymous'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
