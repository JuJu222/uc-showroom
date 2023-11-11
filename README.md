# UC Showroom Web App

Justin Jap / 0706012010042

## Spesifikasi
Frontend: React

Backend: Laravel

Database: MySQL

## Setup

Unduh dan install dependencies dengan menjalankan:

```bash
composer install
npm install
```

Buatah file <b>.env</b> dan copy isi file <b>.env.example</b> ke dalam file .env, sesuaikan juga dengan pengaturan MySQL di komputer anda.

Website menggunakan login untuk mencegah akses dari pihak yang tidak berwenang. 
Lakukan migration database dengan menjalankan:

```bash
php artisan migrate
```

Lalu seed database untuk membuat akun admin dengan:
```bash
php artisan db:seed
```

Akun admin yang dapat digunakan untuk login adalah:


<b>Email</b>: admin@ucshowroom.com

<b>Password</b>: 12345678

Untuk memulai web app, jalankan:
```bash
npm run dev
```

## Testing
Untuk melakukan unit test yang akan memeriksa sistem login dan ketersediaan semua route, jalankan:
```bash
php artisan test
```
Catatan: record database akan terhapus bila unit test dijalankan.
