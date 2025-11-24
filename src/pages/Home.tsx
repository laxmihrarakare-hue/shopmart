import { useEffect, useState } from 'react';
import { TrendingUp, Tag, Grid3x3, Flame } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { DealCard } from '../components/DealCard';
import { supabase } from '../lib/supabase';
import { Product, PriceData, Category } from '../types';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [bestDeals, setBestDeals] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [priceDataMap, setPriceDataMap] = useState<Record<string, PriceData[]>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: trendingData } = await supabase
        .from('products')
        .select('*')
        .eq('is_trending', true)
        .order('rating', { ascending: false })
        .limit(9);

      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('product_count', { ascending: false });

      const { data: pricesData } = await supabase
        .from('price_data')
        .select('*');

      if (productsData) setProducts(productsData);
      if (trendingData) {
        setTrendingProducts(trendingData);
        setBestDeals(trendingData.slice(0, 6));
      }
      if (categoriesData) setCategories(categoriesData);

      if (pricesData) {
        const priceMap: Record<string, PriceData[]> = {};
        pricesData.forEach((price) => {
          if (!priceMap[price.product_id]) {
            priceMap[price.product_id] = [];
          }
          priceMap[price.product_id].push(price);
        });
        setPriceDataMap(priceMap);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Find the Best Deals
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Compare prices across Amazon, Flipkart, Myntra, Reliance Digital, and Croma
          </p>
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        <div className="mb-16">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Best Offers Today</h2>
                </div>
                <p className="text-lg">Save up to 70% on selected products</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">70%</p>
                <p className="text-sm">OFF</p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {!searchQuery && (
              <>
                {categories.length > 0 && (
                  <div className="mb-16">
                    <div className="flex items-center space-x-2 mb-6">
                      <Grid3x3 className="w-7 h-7 text-blue-600" />
                      <h2 className="text-3xl font-bold text-gray-900">Popular Categories</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {categories.slice(0, 8).map((category) => (
                        <CategoryCard
                          key={category.id}
                          category={category}
                          onClick={() => handleSearch(category.name)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {bestDeals.length > 0 && (
                  <div className="mb-16">
                    <div className="flex items-center space-x-2 mb-6">
                      <Flame className="w-7 h-7 text-orange-600" />
                      <h2 className="text-3xl font-bold text-gray-900">Best Deals of the Day</h2>
                      <div className="ml-auto bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-semibold">
                        Limited Time
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {bestDeals.map((product) => (
                        <DealCard
                          key={product.id}
                          product={product}
                          priceData={priceDataMap[product.id]}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {trendingProducts.length > 0 && (
                  <div className="mb-12">
                    <div className="flex items-center space-x-2 mb-6">
                      <TrendingUp className="w-7 h-7 text-blue-600" />
                      <h2 className="text-3xl font-bold text-gray-900">Trending Products</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {trendingProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          priceData={priceDataMap[product.id]}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
              </h2>
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-500">No products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      priceData={priceDataMap[product.id]}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
