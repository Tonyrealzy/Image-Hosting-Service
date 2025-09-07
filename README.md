# 📷 Image Hosting Service

A backend service for uploading, storing, and retrieving images with **Supabase Storage**, **Prisma ORM**, and **Express.js**.

Features include:

- ✅ **Secure image uploads** (private by default)
- ✅ **Deduplication** via SHA-256 hashing
- ✅ **Metadata extraction** (width, height, size, format)
- ✅ **Private + signed URL access**
- ✅ **Role-based security** with Supabase Row Level Security (RLS)
- ✅ **Production-ready Prisma + PostgreSQL setup**

---

## 🏗️ Architecture

```text
React (frontend) → Express (backend API) → Prisma ORM → Postgres (Supabase)
                                           ↓
                                       Supabase Storage
                                           ↓
                                      Public or Signed URLs
```

- **Supabase Storage** → stores raw images in a bucket (`images`).
- **Postgres (Prisma)** → stores metadata (`Image` table: hash, dimensions, owner, etc).
- **Express API** → handles file uploads, deduplication, signed URL generation.
- **Sharp** → normalizes and extracts metadata from uploaded images.
- **Cloud deployment** → e.g. Render (backend) + Supabase (storage + DB).

---

## ⚡️ Tech Stack

- **Node.js + Express** → API
- **Prisma** → ORM for Postgres
- **Supabase** → Storage + Auth + Database
- **Sharp** → image processing
- **Multer** → file uploads middleware
- **TypeScript** → strong typing
- **Swagger** → API documentation

---

## 📂 Project Structure

```text
src/
 ├── routes/          # Express routes
 │   └── image.ts     # Upload + fetch endpoints
 ├── services/        # Business logic
 │   ├── uploadImage.ts
 │   ├── storage.ts
 │   └── prismaClient.ts
 ├── lib/             # External clients
 │   └── supabase.ts
 └── utilities/       # Config + logger
```

---

## 🚀 Getting Started

### 1️⃣ Clone and Install

```bash
git clone https://github.com/Tonyrealzy/Image-Hosting-Service.git
cd Image-Hosting-Service
npm install
```

### 2️⃣ Setup Environment Variables

Create a `.env` file in the root:

```env
# Supabase
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_ANON_KEY=eyJ...         # for frontend use
SUPABASE_SERVICE_ROLE_KEY=eyJ... # backend only (⚠️ never expose to frontend)

# Database (from Supabase Project Settings → Connection Pooling)
DIRECT_URL="postgresql://postgres:<password>@<host>:6543/postgres?pgbouncer=true&connect_timeout=15"
DATABASE_URL="postgresql://postgres:<password>@<host>:5432/postgres"

# Other configurations
PORT=4000
LIMIT_TIME=1
LIMIT_REQUEST=50
NODE_ENV=development
URL_TIMEOUT=3600
```

---

### 3️⃣ Prisma Setup

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

### 4️⃣ Run the Server

```bash
npm run dev   # starts Express server on port 4000
```

---

## 🔑 API Endpoints

### Upload Image

```http
POST /upload
Content-Type: multipart/form-data
Form field: image (file)

Response:
{
  "status": "success",
  "message": "Image uploaded",
  "image": { ...metadata },
  "url": "https://...signed-url..."
}
```

### Get Image URL

```http
GET /?key=<storageKey>

Response:
{
  "status": "success",
  "message": "Image path in bucket retrieved",
  "url": "https://...signed-url..."
}
```

---

## 🔐 Security

- All uploads go through the **service_role key** (server only).
- Buckets are set **private** by default.
- Clients never see the service key — they receive signed URLs with expiry.
- Authenticated users can only upload images if your RLS policies allow.

---

## 🧪 Development Notes

- Deduplication is done using **SHA-256 hashes**.
- Prisma connection pooling must be tuned when deployed (see: [Prisma Connection Pool Docs](https://pris.ly/d/connection-pool)).

---

## 📖 API Documentation

Swagger UI available at:

```http
http://localhost:4000/api/swagger
```

```https
https://image-hosting-service.onrender.com/api/swagger
```

---

## 🛠️ Future Improvements

- [ ] Image resizing & thumbnails
- [ ] CDN integration (Cloudflare/Supabase Edge)
- [ ] User authentication with Supabase Auth
- [ ] Caching with Redis for signed URLs

---

## ⚠️ Disclaimer

This project is for **educational/practice purposes**.
Do **not** expose your `SUPABASE_SERVICE_ROLE_KEY` to the frontend.
Always keep secrets safe in environment variables.

---
