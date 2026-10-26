# Maison Forme

เว็บไซต์ร้านเฟอร์นิเจอร์ออนไลน์พร้อม AI Furniture Designer สำหรับเลือกซื้อสินค้า ออกแบบเฟอร์นิเจอร์ตามขนาด และจัดการร้านค้า

## ความสามารถหลัก

- เลือกดูสินค้า หมวดหมู่ รายละเอียดสินค้า และโปรโมชั่น
- จัดการตะกร้าสินค้าและขั้นตอนสั่งซื้อ
- ออกแบบเฟอร์นิเจอร์สั่งทำ พร้อมคำนวณวัสดุและแผนตัดแผ่น
- จัดการสินค้า หมวดหมู่ คำสั่งซื้อ และการตั้งค่าร้านผ่านหน้าแอดมิน
- รองรับภาษาไทยและอังกฤษ แสดงราคาเป็นเงินบาท และใช้หน่วยเมตริก

## เทคโนโลยี

- Next.js 16, React 19 และ TypeScript
- Tailwind CSS 4
- PostgreSQL และ Drizzle ORM
- Better Auth
- pnpm

## เริ่มต้นใช้งานด้วย Docker

ต้องติดตั้ง Docker พร้อม Docker Compose ก่อน

1. สร้างไฟล์ environment จากตัวอย่าง:

   ```bash
   cp .env.example .env
   ```

   บน PowerShell ใช้ `Copy-Item .env.example .env`

2. สร้างค่า secret ด้วยคำสั่ง `openssl rand -base64 32` แล้วใส่ค่าที่ได้ลงใน `BETTER_AUTH_SECRET` และ `ADMIN_SESSION_SECRET` ใน `.env` ตั้งอีเมลและรหัสแอดมินใน `ADMIN_EMAIL` และ `ADMIN_PASSWORD` ด้วย

3. สร้างและเริ่มเว็บกับฐานข้อมูล:

   ```bash
   docker compose up --build
   ```

   เมื่อเว็บเริ่มทำงาน จะสร้างตารางฐานข้อมูลและข้อมูลสินค้าเริ่มต้นให้อัตโนมัติ

4. เปิด [http://localhost:3000](http://localhost:3000) และเข้าสู่หน้าแอดมินที่ [http://localhost:3000/admin](http://localhost:3000/admin)

หยุดบริการด้วย `docker compose down` ข้อมูล PostgreSQL จะยังอยู่ใน volume `postgres_data` หากต้องการลบข้อมูลและเริ่มใหม่ ใช้ `docker compose down -v`

## เริ่มต้นพัฒนาบนเครื่อง

ต้องติดตั้ง Node.js 22 ขึ้นไป, pnpm และ PostgreSQL

1. ติดตั้ง dependencies:

   ```bash
   pnpm install --frozen-lockfile
   ```

2. สร้างไฟล์ `.env.development.local` และกำหนดค่าที่จำเป็น:

   ```dotenv
   DATABASE_URL=postgresql://postgres:password@localhost:5432/maison_forme
   BETTER_AUTH_SECRET=replace-with-a-long-random-secret
   GOOGLE_CLIENT_ID=your-google-oauth-client-id
   GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
   ADMIN_SESSION_SECRET=replace-with-another-long-random-secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=replace-with-a-strong-password
   ```

3. สร้าง schema และเติมข้อมูลตัวอย่าง:

   ```bash
   node --env-file-if-exists=.env.development.local scripts/migrate.mjs scripts/001-schema.sql scripts/002-seed.sql
   ```

4. เริ่มเซิร์ฟเวอร์พัฒนา:

   ```bash
   pnpm dev
   ```

เปิด [http://localhost:3000](http://localhost:3000) เพื่อดูเว็บไซต์

## คำสั่งที่ใช้บ่อย

| คำสั่ง | รายละเอียด |
| --- | --- |
| `pnpm dev` | เริ่มเซิร์ฟเวอร์สำหรับพัฒนา |
| `pnpm build` | สร้าง production build |
| `pnpm start` | เริ่ม production server หลัง build |
| `node --env-file-if-exists=.env.development.local scripts/migrate.mjs` | สร้าง schema หลัก |
| `node --env-file-if-exists=.env.development.local scripts/migrate.mjs scripts/001-schema.sql scripts/002-seed.sql` | สร้าง schema และข้อมูลสินค้าเริ่มต้น |
| `node --env-file-if-exists=.env.development.local scripts/create-admin.mjs` | สร้างหรืออัปเดตบัญชีผู้ดูแลในฐานข้อมูล Better Auth |

## Environment variables

| ตัวแปร | จำเป็น | รายละเอียด |
| --- | --- | --- |
| `DATABASE_URL` | ใช่ | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | ใช่สำหรับ Better Auth | secret สำหรับเซสชัน Better Auth |
| `BETTER_AUTH_URL` | แนะนำใน production | URL หลักของเว็บไซต์ เช่น `https://example.com` |
| `GOOGLE_CLIENT_ID` | ไม่บังคับ | OAuth Client ID จาก Google Cloud Console สำหรับ Google Sign-In |
| `GOOGLE_CLIENT_SECRET` | ไม่บังคับ | OAuth Client Secret จาก Google Cloud Console เก็บเป็น secret และห้ามใส่ในโค้ดฝั่ง browser |
| `ADMIN_EMAIL` | ใช่สำหรับล็อกอินแอดมิน | อีเมลแอดมินที่หน้า `/admin/login` ยอมรับ |
| `ADMIN_PASSWORD` | ใช่สำหรับล็อกอินแอดมิน | รหัสผ่านแอดมิน ตั้งรหัสที่คาดเดายากและเก็บไว้นอก Git |
| `ADMIN_SESSION_SECRET` | แนะนำ | secret สำหรับลงลายเซ็นคุกกี้แอดมิน หากไม่กำหนด ระบบใช้ `BETTER_AUTH_SECRET` เป็นค่า fallback |

อย่า commit ไฟล์ `.env`, `.env.development.local` หรือ secrets ลง repository

### เปิดใช้ Google Sign-In

1. ใน Google Cloud Console สร้าง OAuth Client ID ประเภท **Web application** และตั้ง OAuth consent screen ให้เรียบร้อย
2. เพิ่ม Authorized JavaScript origins สำหรับ `http://localhost:3000` และ URL Production ของเว็บ
3. เพิ่ม Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://<โดเมน-production>/api/auth/callback/google`
4. ใส่ `GOOGLE_CLIENT_ID` และ `GOOGLE_CLIENT_SECRET` ใน `.env.development.local` และ Vercel Project → Settings → Environment Variables แล้วเลือก Production (และ Preview ถ้าต้องการทดสอบบน Preview)
5. ตั้ง `BETTER_AUTH_URL` ใน Production เป็น URL หลักของเว็บ เช่น `https://<โดเมน-production>` ให้ตรงกับ OAuth callback แล้ว Redeploy

ปุ่ม Google จะแสดงในหน้าเข้าสู่ระบบและสมัครสมาชิก เมื่อผู้ใช้ยืนยันตัวตน Better Auth จะสร้าง/เชื่อมบัญชีและบันทึก session ลงฐานข้อมูลเดียวกับระบบล็อกอินเดิม ผู้ใช้ที่มีอีเมลเดียวกันจะเชื่อมบัญชีได้เมื่อ Google ยืนยันอีเมลแล้ว

## Repository layout

```text
app/             หน้าเว็บและ API routes
components/      React components และ UI
lib/             auth, database, catalog และ business logic
scripts/         SQL schema, seed data และ migration scripts
public/          รูปภาพและ static assets
```
