// Picks up src/assets/profile.(jpg|jpeg|png|webp|avif) automatically if it exists.
const portraits = import.meta.glob('../assets/profile.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
})

// Text fields are { en, id } pairs; see src/i18n/language.js
export const profile = {
  name: 'Ridho Fauzi Grafika',
  // How the name is set in the hero, one entry per line
  displayName: ['Ridho', 'Fauzi'],
  initials: 'RF',
  role: 'Full Stack Developer',
  headline: {
    en: 'Building intuitive, functional, and reliable web applications, from the user interface to the systems behind them.',
    id: 'Membangun aplikasi web yang intuitif, fungsional, dan andal, dari antarmuka hingga sistem di baliknya.',
  },
  intro: {
    en: 'Currently at PT Amanah Karya Indonesia, building features for an HR information system and an Odoo-based ERP.',
    id: 'Saat ini di PT Amanah Karya Indonesia, membangun fitur untuk sistem informasi HR dan ERP berbasis Odoo.',
  },
  location: { en: 'Depok, West Java', id: 'Depok, Jawa Barat' },
  email: 'ridhofauzi.grafikaa@gmail.com',
  // Shown as a badge in the hero and contact section; set to null to hide it
  openTo: {
    en: 'Open to full-time & freelance work',
    id: 'Terbuka untuk full-time & freelance',
  },
  availability: {
    en: 'Have a project or a role in mind? Email is the fastest way to reach me.',
    id: 'Punya proyek atau posisi yang ingin dibicarakan? Email adalah cara tercepat menghubungi saya.',
  },
  // PDFs in /public, one per language
  resume: { en: '/CV_Ridho_Fauzi_Grafika_English.pdf', id: '/CV_Ridho_Fauzi_Grafika.pdf' },
  portrait: Object.values(portraits)[0] ?? null,
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ridhofaauzi/' },
    { label: 'GitHub', href: 'https://github.com/ridhofaaauzi' },
  ],
}
