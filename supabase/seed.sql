-- Seed data for products table
-- Updated to use token_id instead of policy_id/asset_name
-- Prices are in the smallest unit of the currency (lovelace for ADA, token units for tokens)
-- ADA products have NULL token_id
-- Token products have non-NULL token_id (foreign key to supported_tokens)

-- Insert token metadata first (required for foreign key constraints)
INSERT INTO supported_tokens (
  policy_id,
  asset_name,
  display_name,
  decimals,
  is_active
) VALUES
  ('0030630e5173e8be7f0a004cda6f6958f19f88a5179cfe6af87efdf7', '425549444c45525f524557415244', null, 0, true); -- REAL PREVIEW TOKEN for testing

-- Insert products priced in tokens
INSERT INTO products (
  name,
  description,
  price,
  stock,
  is_active,
  is_featured,
  token_id
) VALUES 
  ('Mate', 'Mate', 1, 35, true, true, (SELECT id FROM supported_tokens WHERE asset_name = '425549444c45525f524557415244' LIMIT 1)),
  ('Botella', 'Botella', 1, 35, true, true, (SELECT id FROM supported_tokens WHERE asset_name = '425549444c45525f524557415244' LIMIT 1)),
  ('Buzo', 'Buzo', 1, 35, true, true, (SELECT id FROM supported_tokens WHERE asset_name = '425549444c45525f524557415244' LIMIT 1)),
  ('Power Bank', 'Power Bank', 1, 35, true, true, (SELECT id FROM supported_tokens WHERE asset_name = '425549444c45525f524557415244' LIMIT 1));


-- Insert reliable placeholder images with consistent service
INSERT INTO product_images (product_id, image_url, alt_text, display_order) 
SELECT 
  id,
  'https://xppdernnhjwbgdpygodo.supabase.co/storage/v1/object/public/product-images/mate.png',
  'Mate image',
  0
FROM products WHERE name = 'Mate';