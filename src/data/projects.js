import sihris from '../assets/projects/sihris.webp'
import berbagilink from '../assets/projects/berbagilink.webp'
import mflashCover from '../assets/projects/mflash-cover.svg'

// A real screenshot at src/assets/projects/mflash.(png|jpg|webp) replaces the illustration.
const mflashShots = import.meta.glob('../assets/projects/mflash.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
})
const mflashShot = Object.values(mflashShots)[0]

// Best first. The first project gets the full-width feature layout.
// Text fields are { en, id } pairs. stack: leave empty to hide the "Built with" row.
//
// Each project also has a case study page at /work/<id>/:
//   context     what the product is and how you came to work on it
//   highlights  what you built, one item per line
//   metrics     measurable results, shown as large numbers; hidden while empty. e.g.
//               { value: '−80%', label: { en: 'Time Off page load time', id: 'Waktu muat halaman Time Off' } }
//   gallery     extra screenshots; hidden while empty. e.g.
//               { src: importedImage, alt: { en: '…', id: '…' } }
export const projects = [
  {
    id: 'sihris',
    title: 'SIHRIS',
    summary: {
      en: 'An HRIS for attendance, shifts, time off, overtime and payroll. I built user and device management with audit logging, and sped up the Time Off and Overtime modules.',
      id: 'HRIS untuk absensi, shift kerja, cuti, lembur dan penggajian. Saya membangun manajemen pengguna dan perangkat dengan audit logging, serta mempercepat modul Time Off dan Overtime.',
    },
    year: { en: '2024 – Now', id: '2024 – Sekarang' },
    role: 'Fullstack Developer',
    stack: ['React', 'Laravel', 'MySQL'],
    image: sihris,
    imageAlt: {
      en: 'SIHRIS landing page with a preview of the HR dashboard',
      id: 'Halaman utama SIHRIS dengan pratinjau dashboard HR',
    },
    context: {
      en: 'SIHRIS is an HR information system covering attendance, work shifts, time off, overtime and payroll. I joined it as an intern in 2024 and have kept working on it as a freelance fullstack developer.',
      id: 'SIHRIS adalah sistem informasi HR yang mencakup absensi, shift kerja, cuti, lembur, dan penggajian. Saya mulai mengerjakannya saat magang pada 2024 dan berlanjut sebagai fullstack developer freelance.',
    },
    highlights: [
      {
        en: 'User and device management with structured activity logging, so audits and troubleshooting have something to go on.',
        id: 'Manajemen pengguna dan perangkat dengan logging aktivitas yang terstruktur, sebagai pegangan untuk audit dan troubleshooting.',
      },
      {
        en: 'Faster Time Off and Overtime modules through query optimisation, database indexes and less duplicated code.',
        id: 'Modul Time Off dan Overtime yang lebih cepat lewat optimasi query, indeks database, dan pengurangan duplikasi kode.',
      },
      { en: 'Payroll components.', id: 'Komponen penggajian (payroll).' },
      {
        en: 'Announcements, notifications and UI fixes during my internship.',
        id: 'Fitur pengumuman, notifikasi, dan perbaikan UI selama magang.',
      },
    ],
    metrics: [],
    gallery: [],
    links: { demo: 'https://sihris.id/' },
  },
  {
    id: 'mflash',
    title: 'MFLASH ERP',
    summary: {
      en: 'Odoo ERP for a repair service. I built technician override approvals, automatic Sales PIC assignment, payment-to-COA mapping, and flexible Balance Sheet and P&L reports.',
      id: 'ERP Odoo untuk jasa servis. Saya membangun persetujuan override teknisi, penetapan Sales PIC otomatis, pemetaan pembayaran ke COA, serta laporan Balance Sheet dan Laba Rugi yang fleksibel.',
    },
    year: { en: '2025 – Now', id: '2025 – Sekarang' },
    role: 'Fullstack Developer',
    stack: ['Odoo', 'Python', 'PostgreSQL'],
    image: mflashShot ?? mflashCover,
    imageAlt: mflashShot
      ? { en: 'MFLASH ERP screen in Odoo', id: 'Tampilan MFLASH ERP di Odoo' }
      : {
          en: 'Illustration of an ERP repair-order list and financial report',
          id: 'Ilustrasi daftar repair order dan laporan keuangan ERP',
        },
    context: {
      en: 'MFLASH ERP runs the operations and finances of a repair service on Odoo. I customise its modules in Python around how the business actually works.',
      id: 'MFLASH ERP menjalankan operasional dan keuangan sebuah jasa servis di atas Odoo. Saya mengustomisasi modul-modulnya dengan Python agar sesuai dengan cara kerja bisnisnya.',
    },
    highlights: [
      { en: 'Approval flow for technician overrides.', id: 'Alur persetujuan untuk override teknisi.' },
      { en: 'Automatic Sales PIC assignment.', id: 'Penetapan Sales PIC secara otomatis.' },
      {
        en: 'Payment methods mapped to the chart of accounts (COA).',
        id: 'Pemetaan metode pembayaran ke chart of accounts (COA).',
      },
      {
        en: 'Flexible Balance Sheet and Profit & Loss reports.',
        id: 'Laporan Balance Sheet dan Laba Rugi yang fleksibel.',
      },
    ],
    metrics: [],
    gallery: [],
    links: {},
  },
  {
    id: 'berbagilink',
    title: 'Berbagilink',
    summary: {
      en: 'A one-link mini-website platform for stores, events and donations. I built the mobile REST API, link-based affiliate tracking, data import and export, and a unique QR code per store.',
      id: 'Platform mini-website satu tautan untuk toko, event dan donasi. Saya membangun REST API untuk mobile, afiliasi berbasis tautan, impor dan ekspor data, serta QR code unik per toko.',
    },
    year: '2024 – 2025',
    role: { en: 'Fullstack Developer (intern)', id: 'Fullstack Developer (magang)' },
    stack: ['React', 'Laravel', 'MySQL'],
    image: berbagilink,
    imageAlt: {
      en: 'Berbagilink landing page with a mini-website demo',
      id: 'Halaman utama Berbagilink dengan demo mini-website',
    },
    context: {
      en: 'Berbagilink lets stores, events and donation campaigns publish a mini-website behind a single link. I worked on it as a fullstack developer intern.',
      id: 'Berbagilink memungkinkan toko, event, dan kampanye donasi memiliki mini-website di balik satu tautan. Saya mengerjakannya sebagai fullstack developer magang.',
    },
    highlights: [
      { en: 'REST API for the mobile app.', id: 'REST API untuk aplikasi mobile.' },
      { en: 'Link-based affiliate tracking.', id: 'Pelacakan afiliasi berbasis tautan.' },
      { en: 'Data import and export.', id: 'Impor dan ekspor data.' },
      { en: 'A unique QR code for every store.', id: 'QR code unik untuk setiap toko.' },
    ],
    metrics: [],
    gallery: [],
    links: { demo: 'https://berbagi.link/' },
  },
]
