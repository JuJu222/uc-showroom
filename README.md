# UC Showroom Web App

Justin Jap / 0706012010042

## Spesifikasi
Frontend: React

Backend: Laravel

Database: MySQL

## Setup

Website menggunakan login untuk mencegah akses dari pihak yang tidak berwenang. 
Lakukan migration database dengan menjalankan:

```bash
php artisan migrate
```

Lalu seed database untuk membuat login admin dengan:
```bash
php artisan db:seed
```

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
