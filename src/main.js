import './style.css'

const INSTAGRAM_DM = 'https://ig.me/m/nevmoto_klinik50'

const header = document.querySelector('[data-header]')
const menuButton = document.querySelector('[data-menu-button]')
const menu = document.querySelector('[data-menu]')
const copyButton = document.querySelector('[data-copy-draft]')
const copyStatus = document.querySelector('[data-copy-status]')
const year = document.querySelector('[data-year]')

if (year) {
  year.textContent = String(new Date().getFullYear())
}

function onScroll() {
  if (!header) return
  header.classList.toggle('is-scrolled', window.scrollY > 8)
}

onScroll()
window.addEventListener('scroll', onScroll, { passive: true })

function setMenu(open) {
  if (!menu || !menuButton) return
  menu.hidden = !open
  menuButton.setAttribute('aria-expanded', String(open))
  menuButton.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç')
}

menuButton?.addEventListener('click', () => {
  setMenu(menu?.hidden !== false)
})

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false))
})

const draft = [
  'Merhaba, NEV MOTO KLİNİK için randevu almak istiyorum.',
  'Araç tipi: motosiklet / ATV',
  'Marka ve model:',
  'Kısaca sorun:',
  'Uygun olduğum gün ve saat:',
].join('\n')

copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(draft)
    if (copyStatus) copyStatus.textContent = 'Taslak kopyalandı. Instagram mesajına yapıştırabilirsiniz.'
  } catch {
    if (copyStatus) {
      copyStatus.textContent = 'Taslak kopyalanamadı. Instagram mesajını kendiniz yazabilirsiniz.'
    }
  }
})

document.querySelectorAll('[data-ig-dm]').forEach((link) => {
  link.setAttribute('href', INSTAGRAM_DM)
})
