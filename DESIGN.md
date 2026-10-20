# Portfolio — Design Concept (Phase 1–3)

> Status: **prototype awal** (Hero, navigasi, satu project card). Semua data pribadi masih placeholder di `src/data/`.

---

## Phase 1 — Analisis Referensi

### Apa yang benar-benar bisa saya akses

| Referensi | Akses | Catatan keterbatasan |
|---|---|---|
| Dribbble #26995447 — *Personal Portfolio Website — Animations* (Dymas Alfin / Mikan Team) | Teks deskripsi, palet resmi, dan beberapa frame video | Shot berupa video; saya hanya melihat frame statis (grid project & daftar experience). Timing/easing animasi **tidak** bisa diverifikasi. |
| Dribbble #24978876 — *Personal Portfolio Website Design* (Wolfpixel) | Satu mockup hero di laptop | Tidak ada deskripsi; section di bawah hero tidak terlihat. |
| landonorris.com | Hero, section "message", struktur halaman (via teks), aset | Section bawah tidak ter-render di browser saya (lazy load). Library animasi tidak bisa dipastikan (aset menunjukkan Webflow + Rive). |

### Temuan per referensi

**A. Dribbble #1 — editorial minimal**
- Palet resmi: `#FDFDFD` `#707070` `#0A0909` `#5E3A30` `#CEB3A6` `#9C6455` — monokrom + aksen cokelat hangat.
- Hierarki tipografi kuat, whitespace lega, alur: intro → selected projects → services → experience → contact.
- Project card: thumbnail besar, judul 2 baris, tag kecil berbentuk pill di bawahnya.
- Experience disajikan sebagai **daftar baris** (perusahaan / peran / rentang tanggal rata kanan) di atas panel gelap — bukan kartu.
- Yang diambil: disiplin hierarki, daftar experience berbaris, tag pill yang hemat.

**B. Dribbble #2 — modern portfolio UI**
- Hero monokrom: kata "Hello" raksasa tipis, potret grayscale cut-out, teks hantu "PORTFOLIO" sangat besar di belakang layout, teks vertikal di sisi kiri, "Scroll down ↓".
- Yang diambil: **tipografi sebagai elemen visual** (skala ekstrem), potret grayscale sebagai jangkar, layering teks–gambar.
- Yang ditinggalkan: statistik "+200 projects" (tidak boleh mengarang angka), teks hantu dekoratif.

**C. landonorris.com — immersive**
- Hero: potret besar; **kursor membuka "lapisan lain"** (mask lingkaran yang menampilkan helm di bawah wajah) + helm wireframe.
- Garis kontur topografi tipis sebagai tekstur latar.
- Transisi warna latar saat scroll: off-white → olive gelap.
- Campuran serif ekspresif + grotesk tebal, baris marquee berlawanan arah, tanda tangan yang "tergambar".
- Yang diambil: **satu momen interaksi utama berbasis kursor** dan **perubahan suasana warna antar-section**.
- Yang ditinggalkan: lime neon, marquee ganda, 3D, loader — terlalu "sport promo" untuk developer.

---

## Phase 2 — Konsep: **"Surface / Structure"**

Ide inti: seorang web developer bekerja di dua lapisan — **permukaan** (UI yang dilihat pengguna) dan **struktur** (grid, box model, kode) di bawahnya. Portfolio ini menampilkan keduanya.

Momen utama (satu-satunya "kemewahan" visual): di Hero, kursor menjadi **lensa inspector**. Di dalam lingkaran lensa, hero yang sama tampil sebagai *blueprint* — kotak elemen bergaris, label tag (`<h1>`, `<p>`), ukuran (font-size, line-height), dan kolom grid. Ini adaptasi langsung dari mask helm Lando, tapi bercerita tentang profesi developer.
Di perangkat sentuh, lensa diganti tombol **"Lihat struktur"** yang menyapu lapisan blueprint masuk (clip-path).

Semua hal lain sengaja tenang dan disiplin.

### Warna

| Token | Hex | Peran |
|---|---|---|
| `paper` | `#F2F3F0` | Latar utama — putih abu dingin, bukan krem |
| `ink` | `#1B1D24` | Teks utama, section gelap (Experience) |
| `graphite` | `#5D616B` | Teks sekunder, metadata (kontras 5.6:1 di paper) |
| `rule` | `#D5D7D1` | Garis pembatas, border |
| `blueprint` | `#2340D0` | Warna primer — lapisan struktur, link aktif, focus ring |
| `blueprint-line` | `#B9C5FF` | Garis & teks di atas latar blueprint (kontras 4.6:1) |

Aturan: `blueprint` dipakai untuk **struktur & interaksi** saja (lensa, focus, active state) — tidak pernah untuk dekorasi. Ritme suasana ala Lando: Hero/Projects di `paper`, Experience berpindah ke `ink`, Contact kembali ke `blueprint` penuh sebagai penutup.

### Tipografi

- **Bricolage Grotesque Variable** — display & heading. Punya sumbu `wdth` 75–100 dan `opsz`: nama di hero ditulis condensed lebar-penuh; judul project melebar (`wdth` 78 → 100) saat hover. Tipografi = elemen aktif.
- **Instrument Sans Variable** — body & UI, netral dan sangat terbaca.
- **JetBrains Mono Variable** — **hanya** di dalam lapisan blueprint, karena di sana isinya memang kode.

Skala (rasio ~1.25, fluid dengan `clamp`):

| Token | Ukuran | Pemakaian |
|---|---|---|
| `--fs-hero` | clamp(4.5rem, 15vw, 15rem) | Nama di hero |
| `--fs-display` | clamp(2.75rem, 6vw, 5.5rem) | Judul section |
| `--fs-h3` | clamp(1.5rem, 2.4vw, 2.25rem) | Judul project |
| `--fs-lead` | clamp(1.125rem, 1.4vw, 1.375rem) | Lead/deskripsi |
| `--fs-body` | 1rem | Body |
| `--fs-small` | 0.875rem | Meta, tag |

Body max ~65ch, line-height 1.55; display line-height 0.88–1.

### Spacing, radius, garis

- Spacing: basis 4px → `--space-1 … --space-10` (4, 8, 12, 16, 24, 32, 48, 64, 96, 160).
- Grid: 12 kolom, gutter `clamp(16px, 2vw, 32px)`, margin `clamp(20px, 5vw, 72px)`.
- Radius berdasarkan hierarki, bukan satu nilai untuk semua: tombol & tag `999px` (pill), gambar project `4px`, panel besar `0`.
- Garis 1px `rule` hanya untuk memisahkan baris data (Experience, metadata project) — bukan dekorasi.
- Tanpa shadow, gradient, glow, glassmorphism.

### Tombol & link

- **Primary**: pill `ink` → teks `paper`. Hover: isi `blueprint` menyapu dari bawah (transform, bukan warna-transisi lebar), ikon bergeser 2px.
- **Secondary**: pill bergaris `ink`. Hover: latar `ink` 6%.
- **Link teks**: garis bawah 1px yang menggambar dari kiri (`scaleX`).
- **Focus**: outline 2px `blueprint`, offset 3px — selalu terlihat dengan keyboard (`:focus-visible`).
- **Active/pressed**: `scale(0.97)`.
- **Nav active section**: indikator kecil yang meluncur antar-link (Motion `layoutId`).

### Gambar & thumbnail

- Rasio thumbnail project 16:10; potret 4:5.
- Potret grayscale; screenshot project berwarna asli (karya harus terlihat apa adanya).
- Format WebP/AVIF, `loading="lazy"` kecuali hero, `width/height` eksplisit untuk mencegah layout shift.
- Hover: gambar `scale(1.04)` di dalam frame yang `overflow:hidden`; masuk viewport: reveal `clip-path: inset()` dari bawah.

### Animasi (dirancang, bukan ditabur)

1. **Hero entrance** (sekali, ~1.4s total): huruf nama naik dari mask per-baris (stagger 30ms) → headline → deskripsi → CTA. Tidak ada loading screen.
2. **Lensa inspector** di hero (pointer) / tombol "Lihat struktur" (sentuh).
3. **Project**: reveal clip-path saat masuk viewport, hover = zoom gambar + judul melebar + detail tech muncul.
4. **Transisi warna** latar saat masuk Experience/Contact.
5. Micro-interaction tombol/link/ikon (CSS).

`prefers-reduced-motion`: semua entrance langsung tampil, lensa tidak mengikuti kursor (toggle tetap ada, tanpa animasi), tidak ada transisi warna bertahap.

### Alur halaman

```
┌──────────────────────────────────────────────────────────────┐
│ YN   Work  About  Experience  Contact        ( Available ●) │  nav fixed
│                                                              │
│ YOUR                                        ┌──────────┐     │
│ NAME                                        │ portrait │     │  HERO
│ Web developer — headline 2 baris            │  4:5 bw  │     │  (lensa blueprint)
│ deskripsi singkat ≤ 2 kalimat               └──────────┘     │
│ [See selected work]  [Email me]          Scroll ↓            │
├──────────────────────────────────────────────────────────────┤
│ About: pernyataan besar 2–3 baris (kiri 8 kol) +             │  ABOUT (editorial)
│        cara kerja dalam 3 paragraf pendek (kanan)            │
├──────────────────────────────────────────────────────────────┤
│ Selected work — layout bergantian, bukan grid seragam:       │  PROJECTS
│ [ proyek unggulan full-width ]                               │
│ [ proyek 7 kol ]      [ proyek 5 kol, offset turun ]         │
├══════════════════════ latar → ink ═══════════════════════════┤
│ Experience — daftar baris: perusahaan | peran | tahun        │  EXPERIENCE
│ Skills — 3–4 kelompok teks (bukan dinding badge)             │  SKILLS
├══════════════════════ latar → blueprint ═════════════════════┤
│ "Let's build something" besar + email (salin) + sosial       │  CONTACT
│ footer kecil: © tahun, tautan kembali ke atas                │  FOOTER
└──────────────────────────────────────────────────────────────┘
```

### Review terhadap default generik (yang saya ubah)

- *Lime neon dari Lando* → diganti `blueprint` biru ultramarine: lime+gelap adalah klise, dan biru blueprint punya makna profesi.
- *Cokelat hangat Dribbble #1* → tidak dipakai; terlalu dekat dengan "krem + terracotta" yang generik.
- *Statistik besar di hero (Dribbble #2)* → dihapus; tidak ada data nyata, dan tidak boleh mengarang.
- *Label ALL-CAPS di atas tiap heading, nomor 01/02/03* → tidak dipakai; experience memakai tahun (memang urutan waktu).
- *Monospace untuk label kecil* → hanya di lapisan blueprint, di mana isinya memang kode.

---

## Phase 3 — Struktur Folder

```
src/
├── assets/            gambar & placeholder (portrait, thumbnail project)
├── components/        komponen reusable lintas section
│   ├── Button/        primary / secondary, render <a> atau <button>
│   ├── Navbar/        nav desktop + menu mobile + indikator section aktif
│   └── ProjectCard/   kartu project (gambar, judul, tech, link)
├── sections/          satu folder per section halaman
│   └── Hero/          Hero.jsx, HeroContent.jsx (dipakai 2x: surface & blueprint), styles
├── layouts/
│   └── MainLayout.jsx skip-link, Navbar, <main>
├── data/              konten terpisah dari UI — edit di sini, bukan di komponen
│   ├── profile.js     nama, peran, headline, email, sosial
│   ├── navigation.js  item navigasi
│   └── projects.js    daftar project
├── hooks/
│   ├── useActiveSection.js   IntersectionObserver → section aktif untuk nav
│   └── useCanHover.js        deteksi pointer halus (lensa vs tombol sentuh)
├── styles/
│   ├── tokens.css     design tokens (warna, tipe, spacing, radius, easing)
│   └── global.css     reset, base typography, focus, reduced-motion
├── App.jsx            komposisi section
└── main.jsx           entry point + import font & style
```

Folder `utils/` belum dibuat — belum ada helper yang dibutuhkan. Section lain (About, Projects, Experience, Skills, Contact) ditambahkan di Phase 5.

**Styling: CSS Modules + CSS custom properties.** Desainnya sangat bespoke (clip-path, sumbu font variabel, layering), jadi CSS biasa dengan token lebih jelas daripada utility class panjang, dan tanpa dependency build tambahan.

### Dependency

| Paket | Alasan |
|---|---|
| `react`, `react-dom` 19, `vite` 8 | Sudah ada dari scaffold |
| `motion` (Motion for React, `motion/react`) | Entrance stagger, pegas lensa, `layoutId` indikator nav, `useReducedMotion` |
| `lucide-react` | Ikon (panah, menu, mail, github, linkedin) |
| `@fontsource-variable/*` (Bricolage Grotesque, Instrument Sans, JetBrains Mono) | Font self-hosted: tanpa request ke pihak ketiga, `font-display: swap` |

---

## Phase 4 — Prototype (status)

Sudah dibuat: Navbar (desktop + menu mobile, indikator section aktif), Hero dengan lensa inspector + tombol "Show the structure", dan satu `ProjectCard` di section *Selected work*. About / Experience / Contact masih berupa stub agar navigasi bisa diuji.

Jalankan: `npm run dev`.

Catatan untuk Phase 5/6:
- Ukuran nama di hero disetel untuk placeholder "Your Name"; perlu disetel ulang dengan nama asli (nama panjang bisa butuh ukuran lebih kecil).

---

## Phase 5 — Implementasi (status)

Semua section sudah dibangun. Urutan: Hero → Selected work → About → Experience → Skills → Contact → Footer (karya ditaruh lebih awal agar recruiter langsung melihatnya).

| Section | Scene | Interaksi utama |
|---|---|---|
| Hero | paper | Entrance huruf, lensa inspector / "Show the structure" |
| Selected work | paper | Feature full-width + pasangan 7/4 kolom; clip reveal, zoom gambar, judul melebar |
| About | paper | Kata-kata menyala sesuai progres scroll |
| Experience | ink | Garis antar-baris tergambar saat masuk viewport |
| Skills | ink | Statis — judul sticky, daftar teks per kelompok |
| Contact + Footer | blueprint | Huruf naik saat masuk viewport, salin email |

- **Scene system**: `data-scene-zone` di tiap section, `useScene` men-set `html[data-scene]`, warna berpindah lewat variabel `--scene-*` yang terdaftar dengan `@property` sehingga transisinya halus.
- Semua konten di `src/data/` — isi yang bertanda *Placeholder* wajib diganti. `skills.js` hanya berisi stack yang dipakai portfolio ini.
- `profile.resume` & `profile.portrait` bernilai `null`; tautan résumé dan foto otomatis muncul begitu diisi.

---

## Phase 6 — Refinement (hasil)

**Performa**
- `LazyMotion` + komponen `m` dengan fitur `domAnimation` (bukan bundle Motion penuh). Indikator nav kini satu elemen yang digeser CSS, sehingga `layoutId`/`domMax` tidak diperlukan. JS: 131 → ~118 kB gzip.
- Animasi memakai string `transform` penuh (bukan `y`/`scaleX`) agar Motion bisa menjalankannya lewat WAAPI di compositor. TBT mobile (simulasi Lighthouse) turun dari ~510–760 ms ke ~300 ms.
- Lapisan blueprint hero baru di-mount setelah entrance → first paint hanya me-layout satu salinan hero; font mono tidak diunduh sampai dibutuhkan.
- `will-change` permanen pada huruf dihapus; total stagger huruf dibatasi 0.5 s agar nama panjang tidak memperlambat entrance.

**Aksesibilitas**
- Menu mobile: fokus pindah ke link pertama, `main`/`footer` dibuat `inert`, Escape menutup & mengembalikan fokus ke tombol, menu tertutup otomatis saat layar melebar.
- `aria-current="location"` untuk section aktif; nama aksesibel logo "YN" kini cocok dengan teks visual.
- Kata-kata About tidak pernah di bawah opacity 0.5 (≥3:1 untuk teks besar).
- `scrollbar-gutter: stable` mencegah layout bergeser saat scroll dikunci.

**Lainnya**: favicon baru (motif ink + kotak blueprint), meta Open Graph, `robots.txt`.

**Lighthouse (build produksi, lokal)**

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Desktop | 100 | 100 | 100 | 100 |
| Mobile (simulasi 4G lambat, CPU 4×) | 78–85 | 100 | 100 | 100 |

LCP mobile ~2.6–2.9 s terutama karena ini SPA yang dirender di klien (teks hero menunggu JS). Jika perlu lebih cepat: prerender HTML statis (mis. `vite-plugin-prerender` / SSG) — belum dikerjakan.

**Belum terverifikasi secara visual**: animasi scroll (reveal project, garis Experience, judul Contact, transisi scene) hanya diuji lewat pengukuran DOM, karena browser pane tidak me-render saat jendela tidak terlihat. Perlu dicek manual dengan `npm run dev`.

---

## Intro loader & bilingual (status)

- **Intro "line reveal"** (diadaptasi dari contoh Motion *Loading overlay*): garis blueprint tumbuh dari tengah layar mengikuti progres loading (font + foto hero), melebar menjadi panel blueprint, lalu terbelah dari tengah — entrance hero dimulai saat panel terbuka. Markup ada di `index.html` (menutup sejak first paint), logika di `src/intro/intro.js`. Hanya sekali per sesi, dilewati jika `prefers-reduced-motion`, dan punya failsafe CSS 6 detik bila JS gagal. Durasi total ±1,7–2,5 s.
- **Dwibahasa EN/ID**: `src/i18n/` (context + string UI), konten di `src/data/` berupa pasangan `{ en, id }`. Pilihan disimpan di `localStorage`, default mengikuti bahasa browser; `html[lang]`, judul, dan meta description ikut berganti.
- **Aset**: `src/assets/profile.webp` (640×800, dipotong 4:5 dari foto asli) dimuat otomatis oleh `profile.js`; screenshot proyek di `src/assets/projects/*.webp`.
