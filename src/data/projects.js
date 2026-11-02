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
    links: { demo: 'https://berbagi.link/' },
  },
]
