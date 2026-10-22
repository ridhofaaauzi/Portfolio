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
  role: 'Fullstack Web Developer',
  headline: {
    en: 'I build web interfaces that are clear on the surface and solid underneath.',
    id: 'Saya membangun antarmuka web yang jelas di permukaan dan kokoh di dalamnya.',
  },
  intro: {
    en: 'Currently at PT Amanah Karya Indonesia, building features for an HR information system and an Odoo-based ERP.',
    id: 'Saat ini di PT Amanah Karya Indonesia, membangun fitur untuk sistem informasi HR dan ERP berbasis Odoo.',
  },
  location: { en: 'Depok, West Java', id: 'Depok, Jawa Barat' },
  email: 'ridhofauzi.grafikaa@gmail.com',
  availability: {
    en: 'Have a project or a role in mind? Email is the fastest way to reach me.',
    id: 'Punya proyek atau posisi yang ingin dibicarakan? Email adalah cara tercepat menghubungi saya.',
  },
  resume: null, // e.g. '/resume.pdf' (put the file in /public)
  portrait: Object.values(portraits)[0] ?? null,
  socials: [{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/ridhofaauzi/' }],
}
