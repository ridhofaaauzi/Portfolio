import sihris from '../assets/projects/sihris.webp'
import berbagilink from '../assets/projects/berbagilink.webp'
import mflashCover from '../assets/projects/mflash-cover.svg'
import sihrisDashboard from '../assets/projects/sihris/dashboard.webp'
import sihrisUsers from '../assets/projects/sihris/user-management.webp'
import sihrisDevices from '../assets/projects/sihris/user-device-management.webp'
import mflashAccounting from '../assets/projects/mflash/accounting-dashboard.webp'
import mflashImport from '../assets/projects/mflash/import-template-center.webp'
import mflashWebsite from '../assets/projects/mflash/customer-website.webp'

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
//               { src: importedImage, width: 1600, height: 760, alt: { en: '…', id: '…' } }
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
    gallery: [
      {
        src: sihrisDashboard,
        width: 1600,
        height: 760,
        alt: {
          en: 'SIHRIS dashboard with clock in and out, employee list, team members and shift schedule',
          id: 'Dashboard SIHRIS dengan clock in/out, daftar karyawan, anggota tim, dan jadwal shift',
        },
      },
      {
        src: sihrisUsers,
        width: 1600,
        height: 754,
        alt: {
          en: 'User Management page listing users with role, status, years of service and permission count',
          id: 'Halaman User Management berisi daftar pengguna dengan role, status, masa kerja, dan jumlah izin',
        },
      },
      {
        src: sihrisDevices,
        width: 1600,
        height: 744,
        alt: {
          en: 'User Device Management page showing active devices per user and a company-wide device limit',
          id: 'Halaman User Device Management yang menampilkan perangkat aktif tiap pengguna dan batas perangkat perusahaan',
        },
      },
    ],
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
    gallery: [
      {
        src: mflashAccounting,
        width: 1600,
        height: 751,
        alt: {
          en: 'MFLASH accounting dashboard in Odoo with sales, purchases, bank, QRIS and cash journals',
          id: 'Dashboard akuntansi MFLASH di Odoo dengan jurnal penjualan, pembelian, bank, QRIS, dan kas',
        },
      },
      {
        src: mflashImport,
        width: 1600,
        height: 748,
        alt: {
          en: 'Import Template Center for importing suppliers, customers and account groups step by step',
          id: 'Import Template Center untuk mengimpor supplier, customer, dan account group secara bertahap',
        },
      },
      {
        src: mflashWebsite,
        width: 1600,
        height: 758,
        alt: {
          en: 'MFlash customer website for phone and laptop repairs, with online repair status tracking',
          id: 'Website pelanggan MFlash untuk perbaikan HP dan laptop, dengan pelacakan status repair online',
        },
      },
    ],
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
