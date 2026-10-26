-- Initial catalog data. Safe to re-run: existing rows are left untouched.
INSERT INTO categories (slug, name, description, sort_order) VALUES
  ('sofas', 'โซฟาและอาร์มแชร์', 'โซฟา อาร์มแชร์ และที่นั่งพักผ่อนสำหรับห้องนั่งเล่น', 1),
  ('desks', 'โต๊ะทำงาน', 'โต๊ะทำงานและโต๊ะปรับระดับสำหรับบ้านและออฟฟิศ', 2),
  ('dining-tables', 'โต๊ะรับประทานอาหาร', 'โต๊ะอาหารสำหรับครอบครัวทุกขนาด', 3),
  ('chairs', 'เก้าอี้', 'เก้าอี้รับประทานอาหารและเก้าอี้อเนกประสงค์', 4),
  ('bedroom', 'เตียงและเฟอร์นิเจอร์ห้องนอน', 'เตียง หัวเตียง และเฟอร์นิเจอร์ห้องนอน', 5),
  ('storage', 'ตู้และชั้นวางของ', 'ตู้ ชั้นวาง และระบบจัดเก็บ', 6),
  ('living', 'โต๊ะกลางและห้องนั่งเล่น', 'โต๊ะกลาง โต๊ะข้าง และของตกแต่งห้องนั่งเล่น', 7),
  ('office', 'เฟอร์นิเจอร์สำนักงาน', 'เก้าอี้และอุปกรณ์สำหรับสำนักงาน', 8),
  ('custom', 'เฟอร์นิเจอร์สั่งทำ', 'เฟอร์นิเจอร์ออกแบบและผลิตตามขนาดพื้นที่ของคุณ', 9)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (slug, name, description, category_id, price, compare_at_price, stock, is_featured, is_new, made_to_order, lead_time_days, style, materials, colors, width_cm, depth_cm, height_cm, weight_kg, image_url)
VALUES
  ('cloud-curve-sofa', 'Cloud Curve Sofa', 'โซฟา 3 ที่นั่งทรงโค้งนุ่ม เบาะโฟมความหนาแน่นสูงหุ้มผ้าบูเคล่ ถอดซักได้ เหมาะกับห้องนั่งเล่นที่ต้องการความอบอุ่นและผ่อนคลาย',
    (SELECT id FROM categories WHERE slug='sofas'), 32900, 38900, 6, true, false, false, 5, 'Soft Pastel', ARRAY['ผ้าบูเคล่','ไม้เนื้อแข็ง'], ARRAY['ครีม','ชมพูอ่อน'], 220, 95, 78, 48, '/images/products/cloud-curve-sofa.png'),
  ('pebble-armchair', 'Pebble Armchair', 'อาร์มแชร์ทรงก้อนกรวด นั่งสบาย ขนาดกะทัดรัด เหมาะกับมุมอ่านหนังสือหรือห้องขนาดเล็ก',
    (SELECT id FROM categories WHERE slug='sofas'), 12900, NULL, 10, true, true, false, 3, 'Modern', ARRAY['ผ้ากำมะหยี่','ไม้เนื้อแข็ง'], ARRAY['เขียวมิ้นต์','ครีม'], 82, 80, 74, 16, '/images/products/pebble-armchair.png'),
  ('atelier-oak-desk', 'Atelier Oak Desk', 'โต๊ะทำงานไม้โอ๊คแท้ พร้อมลิ้นชักซ่อนและช่องร้อยสายไฟ ขอบมนปลอดภัย',
    (SELECT id FROM categories WHERE slug='desks'), 15900, NULL, 8, false, false, false, 4, 'Japandi', ARRAY['ไม้โอ๊ค','เหล็กพ่นสี'], ARRAY['ไม้ธรรมชาติ'], 140, 65, 75, 32, '/images/products/atelier-oak-desk.png'),
  ('lift-pro-standing-desk', 'Lift Pro Standing Desk', 'โต๊ะปรับระดับไฟฟ้ามอเตอร์คู่ ปรับความสูง 65–128 ซม. จำตำแหน่งได้ 4 ระดับ พร้อมถาดจัดสายไฟ',
    (SELECT id FROM categories WHERE slug='desks'), 18900, 21900, 3, true, true, false, 5, 'Minimal', ARRAY['ไม้อัด MDF','เหล็ก'], ARRAY['ขาว','ไม้ธรรมชาติ'], 160, 75, 128, 41, '/images/products/lift-pro-standing-desk.png'),
  ('soleil-dining-table', 'Soleil Dining Table', 'โต๊ะอาหารทรงรีสำหรับ 6 ที่นั่ง ท็อปไม้แอชเคลือบด้าน ขาทรงกระบอก',
    (SELECT id FROM categories WHERE slug='dining-tables'), 24500, NULL, 4, true, false, false, 7, 'Scandinavian', ARRAY['ไม้แอช'], ARRAY['ไม้ธรรมชาติ'], 180, 95, 75, 45, '/images/products/soleil-dining-table.png'),
  ('mochi-dining-chair', 'Mochi Dining Chair', 'เก้าอี้รับประทานอาหารเบาะนุ่มทรงมน โครงไม้บีช ซ้อนได้ประหยัดพื้นที่',
    (SELECT id FROM categories WHERE slug='chairs'), 3900, 4500, 24, false, true, false, 3, 'Soft Pastel', ARRAY['ไม้บีช','ผ้าบูเคล่'], ARRAY['ชมพูอ่อน','ครีม','เหลือง'], 48, 52, 80, 6, '/images/products/mochi-dining-chair.png'),
  ('dune-upholstered-bed', 'Dune Upholstered Bed', 'เตียงหุ้มผ้าขนาด 6 ฟุต หัวเตียงบุนวมทรงโค้ง พร้อมลิ้นชักเก็บของใต้เตียง สั่งผลิตตามสีได้',
    (SELECT id FROM categories WHERE slug='bedroom'), 29900, NULL, 0, false, false, true, 21, 'Contemporary', ARRAY['ผ้าลินิน','ไม้อัด'], ARRAY['เบจ','ฟ้าอ่อน'], 190, 215, 110, 70, '/images/products/dune-upholstered-bed.png'),
  ('arc-oak-bookshelf', 'Arc Oak Bookshelf', 'ชั้นวางหนังสือทรงโค้งด้านบน 5 ชั้น ไม้โอ๊ควีเนียร์ ยึดผนังได้เพื่อความปลอดภัย',
    (SELECT id FROM categories WHERE slug='storage'), 9900, NULL, 12, false, true, false, 4, 'Japandi', ARRAY['ไม้โอ๊ควีเนียร์','ไม้อัด'], ARRAY['ไม้ธรรมชาติ'], 90, 32, 190, 38, '/images/products/arc-oak-bookshelf.png'),
  ('pebble-coffee-table', 'Pebble Coffee Table', 'โต๊ะกลางทรงก้อนกรวด ผิวลายหินทราเวอร์ทีน ขอบมนทุกด้าน เหมาะกับบ้านที่มีเด็ก',
    (SELECT id FROM categories WHERE slug='living'), 8900, 10500, 2, true, false, false, 3, 'Modern', ARRAY['ไฟเบอร์กลาส','เรซิน'], ARRAY['ครีม'], 110, 70, 38, 22, '/images/products/pebble-coffee-table.png'),
  ('halo-ergonomic-chair', 'Halo Ergonomic Chair', 'เก้าอี้สำนักงานเพื่อสุขภาพ รองรับหลังส่วนล่าง ปรับความสูงและพนักพิงได้',
    (SELECT id FROM categories WHERE slug='office'), 11900, NULL, 15, false, true, false, 3, 'Modern', ARRAY['ผ้าตาข่าย','อะลูมิเนียม'], ARRAY['ชมพูอ่อน','ขาว'], 66, 66, 118, 17, '/images/products/halo-ergonomic-chair.png')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO store_settings (key, value) VALUES
  ('store', '{"name":"Maison Forme","tagline":"เฟอร์นิเจอร์ที่ออกแบบมาเพื่อพื้นที่ของคุณ","phone":"02-000-0000","email":"hello@maisonforme.co","address":"กรุงเทพมหานคร ประเทศไทย","lineId":"@maisonforme"}'),
  ('shipping', '{"standardFee":500,"expressFee":1200,"freeThreshold":30000}'),
  ('banner', '{"enabled":true,"text":"ส่งฟรีทั่วกรุงเทพฯ เมื่อสั่งซื้อครบ ฿30,000"}'),
  ('payment', '{"bankTransfer":{"enabled":true,"bankName":"ธนาคารกสิกรไทย","accountName":"บจก. เมซง ฟอร์ม","accountNumber":"ยังไม่ได้ตั้งค่า"},"cod":{"enabled":true}}')
ON CONFLICT (key) DO NOTHING;
