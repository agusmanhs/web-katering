# Nirmala Premium Catering CMS & Landing Page

Website Company Profile Premium sekaligus CMS Admin Panel untuk mengelola data Landing Page Nirmala Catering. Dibangun menggunakan **Laravel 11**, **Inertia.js (React + TypeScript)**, dan **Tailwind CSS**.

---

## 🛠️ Langkah-Langkah Setup Lokal (Setelah Clone)

Bagi rekan developer yang melakukan `clone` atau `pull` proyek ini, silakan ikuti langkah-langkah berikut untuk menjalankannya di komputer lokal:

### 1. Masuk ke Direktori Proyek
Buka terminal dan masuk ke folder proyek:
```bash
cd catering
```

### 2. Install Dependensi PHP
Unduh dan pasang library PHP yang dibutuhkan menggunakan Composer:
```bash
composer install
```

### 3. Install Dependensi JavaScript (React & Tailwind)
Unduh library Node.js menggunakan npm:
```bash
npm install
```

### 4. Salin Konfigurasi Environment (`.env`)
Salin file `.env.example` menjadi `.env` baru:
```bash
cp .env.example .env
```

### 5. Generate Application Key
Buat kunci enkripsi aplikasi Laravel yang baru:
```bash
php artisan key:generate
```

### 6. Konfigurasi Database di `.env`
Buka file `.env` yang baru dibuat, lalu sesuaikan koneksi database Anda (misalnya menggunakan MySQL/MariaDB):
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database_anda
DB_USERNAME=root
DB_PASSWORD=kata_sandi_mysql_anda
```
*Catatan: Pastikan Anda sudah membuat database kosong di MySQL sesuai dengan nama di `DB_DATABASE` sebelum melangkah ke tahap berikutnya.*

### 7. Jalankan Migrasi & Seeder Database
Buat seluruh struktur tabel database beserta data pengaturan default, menu, faq, testimoni, mitra, dan akun admin awal:
```bash
php artisan migrate --seed
```

### 8. Hubungkan Symlink Storage
Hubungkan folder asset media upload agar gambar menu/katalog dapat diakses publik:
```bash
php artisan storage:link
```

### 9. Jalankan Server Pengembangan
Jalankan dua perintah berikut di jendela terminal terpisah (atau gunakan tools seperti Laravel Herd):

*   **Terminal 1 (Backend Laravel Server)**:
    ```bash
    php artisan serve
    ```
    *Aplikasi akan berjalan di [http://localhost:8000](http://localhost:8000)*

*   **Terminal 2 (Frontend Assets Compiler)**:
    ```bash
    npm run dev
    ```

---

## 🔑 Informasi Akun Admin Default

Setelah database berhasil di-seed, Anda dapat login ke Dashboard Admin menggunakan akun berikut:
- **URL Login**: [http://localhost:8000/login](http://localhost:8000/login)
- **Email**: `admin@nirmala.com`
- **Password**: `nirmalapremium123`

---

## 🚀 Perintah Build untuk Produksi
Jika ingin mem-build aplikasi untuk kebutuhan deployment hosting:
```bash
npm run build
```
