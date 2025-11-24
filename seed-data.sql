-- Sample products data
INSERT INTO products (id, name, image, description, rating, category, is_trending) VALUES
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Apple iPhone 15 Pro Max (256GB) - Natural Titanium', 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800', 'Experience the power of A17 Pro chip with titanium design, advanced camera system, and all-day battery life. Action button for quick access to features.', 4.6, 'Smartphones', true),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Samsung Galaxy Watch 6 Classic', 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800', 'Premium smartwatch with rotating bezel, advanced health tracking, sleep monitoring, and comprehensive fitness features. Elegant stainless steel design.', 4.4, 'Smartwatches', true),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Sony WH-1000XM5 Wireless Headphones', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800', 'Industry-leading noise cancellation with premium sound quality. 30-hour battery life, touch controls, and multipoint connection for seamless switching.', 4.7, 'Audio', true),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Dell XPS 15 Laptop (Intel i7, 16GB RAM, 512GB SSD)', 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800', 'High-performance laptop with stunning 15.6-inch 4K display, powerful Intel i7 processor, and premium build quality. Perfect for professionals and creators.', 4.5, 'Laptops', true),
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Nike Air Zoom Pegasus 40 Running Shoes', 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800', 'Responsive running shoes with ReactX foam for enhanced cushioning. Waffle outsole pattern provides excellent traction. Available in multiple colors.', 4.3, 'Footwear', true),
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Canon EOS R6 Mark II Mirrorless Camera', 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800', 'Professional mirrorless camera with 24.2MP sensor, 40fps burst shooting, in-body stabilization, and advanced autofocus. Perfect for photography enthusiasts.', 4.8, 'Cameras', true),
  ('a7b8c9d0-e1f2-3456-1234-567890123456', 'Philips Air Fryer XXL', 'https://images.pexels.com/photos/4252139/pexels-photo-4252139.jpeg?auto=compress&cs=tinysrgb&w=800', 'Large capacity air fryer with rapid air technology. Cook healthy meals with up to 90% less fat. Digital touchscreen with preset programs for easy cooking.', 4.2, 'Kitchen Appliances', false),
  ('b8c9d0e1-f2a3-4567-2345-678901234567', 'LG 55-inch 4K OLED Smart TV', 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=800', 'Stunning OLED display with perfect blacks and vibrant colors. α9 Gen 6 AI Processor for enhanced picture quality. WebOS smart platform with streaming apps.', 4.6, 'Televisions', false);

-- Sample price data for products
INSERT INTO price_data (product_id, platform, price, discount, delivery, url) VALUES
  -- iPhone 15 Pro Max
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Amazon', 139900.00, '5% off', '2-3 days', 'https://amazon.in'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Flipkart', 141999.00, '3% off', '3-4 days', 'https://flipkart.com'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Myntra', 142900.00, '2% off', '4-5 days', 'https://myntra.com'),

  -- Samsung Galaxy Watch
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Amazon', 32999.00, '15% off', '1-2 days', 'https://amazon.in'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Flipkart', 33499.00, '12% off', '2-3 days', 'https://flipkart.com'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Myntra', 34999.00, '10% off', '3-4 days', 'https://myntra.com'),

  -- Sony Headphones
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Amazon', 28990.00, '20% off', '1-2 days', 'https://amazon.in'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Flipkart', 29990.00, '18% off', '2-3 days', 'https://flipkart.com'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Myntra', 30990.00, '15% off', '3-4 days', 'https://myntra.com'),

  -- Dell XPS 15
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Amazon', 155999.00, '8% off', '3-5 days', 'https://amazon.in'),
  ('d4e5f6a7-b8c9-0123-def1-234567890123', 'Flipkart', 159999.00, '5% off', '4-6 days', 'https://flipkart.com'),

  -- Nike Running Shoes
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Amazon', 9999.00, '25% off', '2-3 days', 'https://amazon.in'),
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Flipkart', 10499.00, '20% off', '3-4 days', 'https://flipkart.com'),
  ('e5f6a7b8-c9d0-1234-ef12-345678901234', 'Myntra', 9899.00, '26% off', '2-3 days', 'https://myntra.com'),

  -- Canon Camera
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Amazon', 214999.00, '10% off', '3-5 days', 'https://amazon.in'),
  ('f6a7b8c9-d0e1-2345-f123-456789012345', 'Flipkart', 219999.00, '8% off', '4-6 days', 'https://flipkart.com'),

  -- Philips Air Fryer
  ('a7b8c9d0-e1f2-3456-1234-567890123456', 'Amazon', 14999.00, '30% off', '2-3 days', 'https://amazon.in'),
  ('a7b8c9d0-e1f2-3456-1234-567890123456', 'Flipkart', 15499.00, '28% off', '3-4 days', 'https://flipkart.com'),

  -- LG OLED TV
  ('b8c9d0e1-f2a3-4567-2345-678901234567', 'Amazon', 124999.00, '12% off', '5-7 days', 'https://amazon.in'),
  ('b8c9d0e1-f2a3-4567-2345-678901234567', 'Flipkart', 129999.00, '10% off', '6-8 days', 'https://flipkart.com');

-- Sample price history for trending products (last 30 days)
INSERT INTO price_history (product_id, platform, price, date) VALUES
  -- iPhone price history
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Amazon', 144900.00, NOW() - INTERVAL '30 days'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Amazon', 143900.00, NOW() - INTERVAL '20 days'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Amazon', 141900.00, NOW() - INTERVAL '10 days'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Amazon', 139900.00, NOW()),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Flipkart', 145999.00, NOW() - INTERVAL '30 days'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Flipkart', 144999.00, NOW() - INTERVAL '20 days'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Flipkart', 143499.00, NOW() - INTERVAL '10 days'),
  ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Flipkart', 141999.00, NOW()),

  -- Samsung Watch price history
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Amazon', 35999.00, NOW() - INTERVAL '30 days'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Amazon', 34999.00, NOW() - INTERVAL '20 days'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Amazon', 33999.00, NOW() - INTERVAL '10 days'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Amazon', 32999.00, NOW()),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Flipkart', 36499.00, NOW() - INTERVAL '30 days'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Flipkart', 35499.00, NOW() - INTERVAL '20 days'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Flipkart', 34499.00, NOW() - INTERVAL '10 days'),
  ('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'Flipkart', 33499.00, NOW()),

  -- Sony Headphones price history
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Amazon', 32990.00, NOW() - INTERVAL '30 days'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Amazon', 31490.00, NOW() - INTERVAL '20 days'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Amazon', 29990.00, NOW() - INTERVAL '10 days'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Amazon', 28990.00, NOW()),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Flipkart', 33490.00, NOW() - INTERVAL '30 days'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Flipkart', 31990.00, NOW() - INTERVAL '20 days'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Flipkart', 30990.00, NOW() - INTERVAL '10 days'),
  ('c3d4e5f6-a7b8-9012-cdef-123456789012', 'Flipkart', 29990.00, NOW());
