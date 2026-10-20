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
export const projects = [
  {
    id: 'sihris',
    title: 'SIHRIS',
    summary: {
      en: 'A human resource information system for attendance, shifts, time off, overtime and payroll. I built user and device management with audit logging, payroll component assignment, and announcements and notifications — and sped up the Time Off and Overtime modules.',
      id: 'Sistem informasi sumber daya manusia untuk absensi, shift, cuti, lembur, dan payroll. Saya membangun user dan device management beserta audit logging, penetapan komponen payroll, serta pengumuman dan notifikasi — dan mempercepat modul Time Off dan Overtime.',
    },
    year: { en: '2024 – Now', id: '2024 – Sekarang' },
    role: 'Fullstack Developer',
    stack: ['React', 'Laravel', 'MySQL'],
    image: sihris,
    imageAlt: {
      en: 'SIHRIS landing page with a preview of the HR dashboard',
      id: 'Halaman utama SIHRIS dengan pratinjau dashboard HR',
    },
    links: { demo: 'https://sihris.id/' },
  },
  {
    id: 'mflash',
    title: 'MFLASH ERP',
    summary: {
      en: 'Odoo ERP for a repair-service business. I built technician override requests with admin approval, automatic Sales PIC assignment, payment-method-to-COA mapping, and more flexible Balance Sheet and P&L reports.',
      id: 'ERP berbasis Odoo untuk bisnis jasa servis. Saya membangun request override teknisi dengan persetujuan admin, penetapan Sales PIC otomatis, pemetaan metode pembayaran ke COA, serta laporan Balance Sheet dan Laba Rugi yang lebih fleksibel.',
    },
    year: { en: '2025 – Now', id: '2025 – Sekarang' },
    role: 'Fullstack Developer',
    stack: ['Odoo', 'Python'],
    image: mflashShot ?? mflashCover,
    imageAlt: mflashShot
      ? { en: 'MFLASH ERP screen in Odoo', id: 'Tampilan MFLASH ERP di Odoo' }
      : {
          en: 'Illustration of an ERP repair-order list and financial report',
          id: 'Ilustrasi daftar repair order dan laporan keuangan ERP',
        },
    links: {},
  },
  {
    id: 'berbagilink',
    title: 'Berbagilink',
    summary: {
      en: 'A one-link mini-website platform for online stores, events and donations. I built the REST API behind its mobile app, an affiliate feature based on shareable links, data import and export, and a unique QR code for every store.',
      id: 'Platform mini-website satu tautan untuk toko online, event, dan donasi. Saya membangun REST API untuk aplikasi mobile-nya, fitur afiliasi berbasis tautan, impor dan ekspor data, serta QR code unik untuk setiap toko.',
    },
    year: '2024 – 2025',
    role: { en: 'Fullstack Developer (intern)', id: 'Fullstack Developer (magang)' },
    stack: ['React', 'Laravel', 'MySQL'],
    image: berbagilink,
    imageAlt: {
      en: 'Berbagilink landing page with a mini-website demo',
      id: 'Halaman utama Berbagilink dengan demo mini-website',
    },
    links: { demo: 'https://berbagi.link/' },
  },
]
