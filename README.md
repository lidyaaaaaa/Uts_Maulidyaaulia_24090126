# 💻 UTS Pemrograman Web 1: Aplikasi Dashboard Sederhana

Proyek ini adalah implementasi front-end dari desain Figma untuk Ujian Tengah Semester mata kuliah Pemrograman Web 1. Proyek ini dibangun menggunakan HTML, CSS, dan JavaScript dasar dengan fokus pada struktur layout, manipulasi DOM, dan event listener.

## 👤 Informasi Mahasiswa

Nama: Maulidya Aulia
NIM: 24090126

## 🔗 Repository & Deployment

File README.md wajib berisi Link GitHub Repository dan Link GitHub Pages. Repository dibuat dengan format uts-web-[uts_nama_nim].

GitHub Repository:
 https://github.com/lidyaaaaaa/Uts_Maulidyaaulia_24090126 
GitHub Pages :
 https://lidyaaaaaa.github.io/Uts_Maulidyaaulia_24090126/ 

Catatan: Pastikan Anda telah mengaktifkan **GitHub Pages* di repository Anda agar halaman utama (index.html) dapat diakses melalui link tersebut*.

## 📂 Deskripsi Singkat project

Project ini adalah aplikasi Dashboard Manajemen Produk sederhana. Sistem dibuat menggunakan HTML, CSS, dan JavaScript tanpa backend.
Alur sistem:
Login → Dashboard → Kelola Produk (CRUD).

## Fungsi Tiap halaman

1.Login page (index.html)

- Halaman pertama sebelum masuk ke dashboard.
- User harus mengisi email & password.
- Jika input kosong → muncul notifikasi Login Gagal.

TOMBOL & FUNGSI:
* Login → memanggil fungsi login() dari script.js.
* Toggle Password → Fitur show/hide password.
* Google & Facebook → hanya tampilan (non-aktif).

2.Dashboard Page (dashboard.html)

- Menampilkan ringkasan data berupa:
    Total Products
    Total Sales
    Total Revenue
- Menampilkan grafik:
    Grafik produk terjual (salesTableChart)
    Grafik pendapatan (revenueChart)
- Menggunakan Chart.js untuk menampilkan data grafik
- Sidebar untuk navigasi:
    Dashboard
    Products
    Settings (icon)
    Logout (kembali ke index.html)
- Tombol “Lihat Data Produk” → menuju halaman products.html.

3.Products Page (products.html)

- Menampilkan tabel daftar produk (nama, harga, stok).
- Memiliki fitur CRUD sederhana menggunakan JavaScript:
    Add Product:
    Muncul modal addModal
    Tambah nama, harga, dan stok produk

    Edit Product:
    Muncul modal editModal
    Update data produk

    Delete Product:
    Muncul notifikasi konfirmasi

- Tabel diisi dari array di script.js (manipulasi DOM).
- Sidebar navigasi sama seperti dashboard.
