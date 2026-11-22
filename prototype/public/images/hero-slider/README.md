# Hero Background Slider Images

Folder ini menyimpan gambar background untuk **Hero Section** pada halaman utama (`index.html`).

## Daftar File Saat Ini
- `hero-1.jpg` — Proyek konstruksi bangunan modern
- `hero-2.jpg` — Gudang distribusi & stok bahan bangunan (semen, mortar, papan GRC/gypsum)
- `hero-3.jpg` — Pekerja konstruksi di lapangan proyek
- `hero-4.jpg` — Eksterior & interior bangunan modern

## Cara Menambah, Menghapus, atau Mengganti Gambar
1. Letakkan file gambar baru ke dalam folder ini (`public/images/hero-slider/`).
   - Format yang disarankan: `.jpg` atau `.webp`
   - Rasio aspek: Landscape `16:9` (rekomendasi resolusi `1920×1080` px)
   - Ukuran file ideal: `< 400 KB` agar loading cepat
2. Buka file konfigurasi `assets/js/hero-slider.js` dan perbarui array `HERO_SLIDER_IMAGES`:
   ```js
   const HERO_SLIDER_IMAGES = [
     { src: "public/images/hero-slider/hero-1.jpg", alt: "Proyek konstruksi bangunan modern" },
     { src: "public/images/hero-slider/hero-2.jpg", alt: "Gudang distribusi bahan bangunan Andalan" },
     // Tambahkan atau ubah item di sini
   ];
   ```
3. Tidak perlu mengubah HTML atau CSS — slider akan otomatis menyesuaikan jumlah slide, dot indicator, dan autoplay.

## Fallback
Jika gambar gagal dimuat atau belum tersedia, hero section otomatis menampilkan background fallback gelap bertekstur industrial khas brand **Tb. Andalan**.
