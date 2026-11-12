# Website Undangan Pernikahan — Rustic Romantic

Website statis responsif menggunakan HTML, CSS, dan JavaScript murni. Tidak membutuhkan database, Firebase, atau Supabase. Bisa di-hosting di GitHub Pages.

## Struktur folder foto

Semua foto kini dikumpulkan di `assets/foto/`:

- `pengantin/mempelai-wanita.jpg` — foto mempelai wanita
- `pengantin/mempelai-pria.jpg` — foto mempelai pria
- `galeri/foto-1.jpg` sampai `foto-3.jpg` — foto galeri/prewedding
- `tema/cover.jpg` — latar halaman pembuka
- `tema/background-countdown.jpg` — latar countdown
- `tema/background-rsvp.jpg` — latar konfirmasi kehadiran
- `tema/background-penutup.jpg` — latar penutup

Untuk mengganti foto, cukup timpa file foto dengan foto baru yang memakai nama sama. Jika memakai nama atau ekstensi lain, ubah path gambar di `style.css`.

## Cara menjalankan
1. Ekstrak ZIP.
2. Buka `index.html` di browser, atau unggah seluruh isi folder ke hosting statis.
3. Edit objek `CONFIG` di bagian paling atas `script.js`.

## Data yang wajib diganti
- `bride` dan `groom`: nama lengkap pengantin.
- `weddingDate`: tanggal dan jam akad dalam format ISO, termasuk zona waktu.
- `dateLabel`: teks tanggal yang tampil.
- `whatsappNumber`: nomor WhatsApp tujuan RSVP, format internasional tanpa `+` atau spasi.
- `mapUrl`: tautan Google Maps lokasi acara.
- `bankName`, `accountNumber`, `accountOwner`: data rekening untuk kartu hadiah digital. Ganti data contoh sebelum dipublikasikan. Jika tidak ingin menampilkan hadiah rekening, hapus bagian `id="gift"` dari `index.html`.

## Tema
Foto latar bisa diganti melalui folder `assets/foto/tema/`. Warna, font, ukuran, dan dekorasi diatur melalui `style.css`.

## Musik
Isi `musicUrl` di `script.js` dengan URL file MP3 milik Anda jika ingin musik latar.

## Catatan ucapan
Ucapan hanya disimpan di `localStorage` browser masing-masing pengunjung. Tidak dibagikan ke pengunjung lain karena website ini memang tidak memakai database.

## Publikasi gratis
Unggah seluruh isi folder ke GitHub Pages, Netlify, atau Vercel. Jangan hanya mengunggah `index.html`; folder `assets`, `style.css`, dan `script.js` juga harus ikut diunggah.
