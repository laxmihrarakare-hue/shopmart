import { useEffect, useState } from 'react';
import { ArrowUpDown, ExternalLink } from 'lucide-react';
import { PlatformIcon } from '../components/PlatformIcon';
import { SearchBar } from '../components/SearchBar';
import { supabase } from '../lib/supabase';
import { Product, PriceData } from '../types';

type SortField = 'price' | 'discount' | 'platform';
type SortOrder = 'asc' | 'desc';

export function Compare() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [priceData, setPriceData] = useState<PriceData[]>([]);
  const [sortField, setSortField] = useState<SortField>('price');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (data) setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      loadProducts();
      return;
    }

    try {
      const { data } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${query}%`);

      if (data) setProducts(data);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const loadPriceData = async (productId: string) => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('price_data')
        .select('*')
        .eq('product_id', productId);

      if (data) {
        setPriceData(data);
      }
    } catch (error) {
      console.error('Error loading price data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    loadPriceData(product.id);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedPriceData = [...priceData].sort((a, b) => {
    let compareValue = 0;

    switch (sortField) {
      case 'price':
        compareValue = a.price - b.price;
        break;
      case 'discount':
        const aDiscount = parseInt(a.discount) || 0;
        const bDiscount = parseInt(b.discount) || 0;
        compareValue = aDiscount - bDiscount;
        break;
      case 'platform':
        compareValue = a.platform.localeCompare(b.platform);
        break;
    }

    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

  const lowestPrice = priceData.length > 0 ? Math.min(...priceData.map(p => p.price)) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Compare Prices</h1>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} placeholder="Search products to compare..." />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Product</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductSelect(product)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedProduct?.id === product.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <p className="font-medium text-gray-900 line-clamp-2">{product.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedProduct ? (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                  <p className="text-blue-100">{selectedProduct.category}</p>
                </div>

                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : priceData.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <p>No price data available for this product</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button
                              onClick={() => handleSort('platform')}
                              className="flex items-center space-x-1 hover:text-gray-700"
                            >
                              <span>Platform</span>
                              <ArrowUpDown className="w-4 h-4" />
                            </button>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button
                              onClick={() => handleSort('price')}
                              className="flex items-center space-x-1 hover:text-gray-700"
                            >
                              <span>Price</span>
                              <ArrowUpDown className="w-4 h-4" />
                            </button>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <button
                              onClick={() => handleSort('discount')}
                              className="flex items-center space-x-1 hover:text-gray-700"
                            >
                              <span>Discount</span>
                              <ArrowUpDown className="w-4 h-4" />
                            </button>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Delivery
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {sortedPriceData.map((price) => {
                          const isBestPrice = price.price === lowestPrice;
                          return (
                            <tr
                              key={price.id}
                              className={`hover:bg-gray-50 transition-colors ${isBestPrice ? 'bg-green-50' : ''}`}
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center space-x-2">
                                  <PlatformIcon platform={price.platform} />
                                  <span className="font-medium text-gray-900">{price.platform}</span>
                                  {isBestPrice && (
                                    <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                      Best Price
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`text-lg font-bold ${isBestPrice ? 'text-green-700' : 'text-green-600'}`}>
                                  ₹{price.price.toLocaleString('en-IN')}
                                </span>
                              </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                {price.discount || 'N/A'}
                              </span>
                            </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {price.delivery || 'N/A'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {price.url && (
                                  <a
                                    href={price.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                                  >
                                    <span>Visit</span>
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <p className="text-xl text-gray-500">Select a product to compare prices</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
