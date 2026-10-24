'use strict';

/* =========================================================
   Konfigurasi
   ========================================================= */
const CONFIG = {
  // Ganti dengan nomor WhatsApp Anda (format internasional tanpa "+")
  // Contoh: 6285156736189
  whatsappNumber: '6285156736189',

  // Pesan default jika tidak ada produk yang dipilih
  defaultMessage: 'Halo, saya ingin bertanya tentang produk premium Anda.',
};

/* =========================================================
   Data Produk — 18 item
   ========================================================= */
const PRODUCTS = [
  {
    icon: 'icon/canva.svg',
    name: 'CANVA',
    desc: 'Paket Aplikasi Canva Invite 3 Bulan.',
    price: 'Rp 7.000',
    original: 'Rp 15.000',
  },
  {
    icon: 'icon/camscanner.svg',
    name: 'CAM SCANNER',
    desc: 'Paket Aplikasi CamScanner 1 Bulan Private.',
    price: 'Rp 17.000',
    original: 'Rp 22.500',
  },
  {
    icon: 'icon/iqiyi.svg',
    name: 'IQIYI',
    desc: 'Paket Aplikasi IQIYI 1 Bulan Sharing Full Garansi.',
    price: 'Rp 15.000',
    original: 'Rp 24.000',
  },
  {
    icon: 'icon/meitu.svg',
    name: 'MEITU',
    desc: 'Paket Aplikasi Meitu VIP+ Private 7 Hari.',
    price: 'Rp 8.000',
    original: 'Rp 15.000',
  },
  {
    icon: 'icon/netflix.svg',
    name: 'NETFLIX',
    desc: 'Paket Aplikasi Netflix 1P1U 1 Bulan.',
    price: 'Rp 25.000',
    original: 'Rp 45.000',
  },
  {
    icon: 'icon/capcut.svg',
    name: 'CAPCUT',
    desc: 'Paket Aplikasi Capcut 1 Bulan Full Garansi.',
    price: 'Rp 22.000',
    original: 'Rp 30.500',
  },
  {
    icon: 'icon/capcut.svg',
    name: 'CAPCUT',
    desc: 'Paket Aplikasi Capcut Private 7 Hari.',
    price: 'Rp 5.000',
    original: 'Rp 14.000',
  },
  {
    icon: 'icon/chatgpt.svg',
    name: 'CHATGPT',
    desc: 'Paket Aplikasi Chatgpt Plus Sharing 14 Hari.',
    price: 'Rp 24.000',
    original: 'Rp 33.500',
  },
  {
    icon: 'icon/vidio.svg',
    name: 'VIDIO',
    desc: 'Paket Aplikasi Vidio TV 5 Bulan Garansi Login.',
    price: 'Rp 10.000',
    original: 'Rp 17.000',
  },
  {
    icon: 'icon/vidio.svg',
    name: 'VIDIO',
    desc: 'Paket Aplikasi Vidio Mobile & Laptop 1 Bulan.',
    price: 'Rp 22.000',
    original: 'Rp 31.500',
  },
  {
    icon: 'icon/spotify.svg',
    name: 'SPOTIFY',
    desc: 'Paket Aplikasi Spotify Premium 3 Bulan No garansi.',
    price: 'Rp 13.000',
    original: 'Rp 21.000',
  },
  {
    icon: 'icon/spotify.svg',
    name: 'SPOTIFY',
    desc: 'Paket Aplikasi Spotify Premium 1 Bulan Full Garansi.',
    price: 'Rp 20.000',
    original: 'Rp 37.000',
  },
  {
    icon: 'icon/grok.svg',
    name: 'GROK',
    desc: 'Paket Aplikasi SuperGrok 1 Bulan Private Full Garansi.',
    price: 'Rp 285.000',
    original: 'Rp 299.000',
  },
  {
    icon: 'icon/gemini.svg',
    name: 'GEMINI',
    desc: 'Paket Aplikasi Gemini 18 Bulan Link Head.',
    price: 'Rp 26.000',
    original: 'Rp 39.000',
  },
  {
    icon: 'icon/gemini.svg',
    name: 'GEMINI',
    desc: 'Paket Aplikasi Gemini Link 3 Bulan.',
    price: 'Rp 15.000',
    original: 'Rp 19.000',
  },
  {
    icon: 'icon/youtube.svg',
    name: 'YOUTUBE',
    desc: 'Paket Aplikasi JASPAY Youtube Famhead/Indplan 1 Bulan.',
    price: 'Rp 8.000',
    original: 'Rp 12.000',
  },
  {
    icon: 'icon/youtube.svg',
    name: 'YOUTUBE',
    desc: 'Paket Aplikasi Youtube Premium 3 Bulan, Garansi Setengah Masa Berlaku.',
    price: 'Rp 21.000',
    original: 'Rp 29.000',
  },
  {
    icon: 'icon/youtube.svg',
    name: 'YOUTUBE',
    desc: 'Paket Aplikasi JASPAY Youtube Premium 3 Bulan Garansi Login.',
    price: 'Rp 23.000',
    original: 'Rp 39.000',
  },
];

/* =========================================================
   Data Langkah "Cara Order"
   ========================================================= */
const STEPS = [
  { title: 'Pilih Produk',       desc: 'Pilih aplikasi yang ingin kamu gunakan.' },
  { title: 'Hubungi Admin',      desc: 'Klik tombol WhatsApp pada produk.' },
  { title: 'Lakukan Pembayaran', desc: 'Ikuti instruksi pembayaran dari admin.' },
  { title: 'Produk Diproses',    desc: 'Admin akan memproses pesanan kamu.' },
];

/* =========================================================
   Util: buat URL WhatsApp dengan pesan ter-encode
   ========================================================= */
function buildWhatsAppURL(message) {
  const text = encodeURIComponent(message);
  const number = encodeURIComponent(CONFIG.whatsappNumber);
  return `https://wa.me/${number}?text=${text}`;
}

/* =========================================================
   Render kartu produk (tanpa innerHTML → aman dari XSS)
   ========================================================= */
function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'card';

  const icon = document.createElement('div');
  icon.className = 'card-icon';

  const iconImg = document.createElement('img');
  iconImg.src = product.icon;
  iconImg.alt = '';                     // ikon dekoratif
  iconImg.width = 24;
  iconImg.height = 24;
  iconImg.loading = 'lazy';             // hemat bandwidth
  iconImg.decoding = 'async';
  iconImg.addEventListener('error', () => {
  // Fallback kalau gambar gagal dimuat → tampilkan simbol netral
  iconImg.remove();
  icon.textContent = '◆';
});

icon.appendChild(iconImg);

  const title = document.createElement('h3');
  title.textContent = product.name;

  const desc = document.createElement('p');
  desc.textContent = product.desc;

  const price = document.createElement('div');
  price.className = 'card-price';
  price.textContent = product.price;

  if (product.original) {
    const original = document.createElement('small');
    original.textContent = product.original;
    price.appendChild(original);
  }

  const button = document.createElement('a');
  button.className = 'btn btn-primary';
  button.textContent = 'Beli via WhatsApp';
  button.target = '_blank';
  button.rel = 'noopener noreferrer';
  button.href = buildWhatsAppURL(
    `Halo, saya tertarik membeli "${product.name}" (${product.price}). Mohon info selanjutnya.`
  );

  card.append(icon, title, desc, price, button);
  return card;
}

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const fragment = document.createDocumentFragment();
  for (const product of PRODUCTS) {
    fragment.appendChild(createProductCard(product));
  }
  grid.appendChild(fragment);
}

/* =========================================================
   Render langkah "Cara Order" (tanpa innerHTML)
   ========================================================= */
function createStepItem(step) {
  const li = document.createElement('li');

  const title = document.createElement('strong');
  title.textContent = step.title;

  const desc = document.createElement('span');
  desc.textContent = step.desc;

  li.append(title, desc);
  return li;
}

function renderSteps() {
  const list = document.getElementById('steps-list');
  if (!list) return;

  const fragment = document.createDocumentFragment();
  for (const step of STEPS) {
    fragment.appendChild(createStepItem(step));
  }
  list.appendChild(fragment);
}

/* =========================================================
   Tombol WhatsApp umum
   ========================================================= */
function setupGeneralWhatsApp() {
  const btn = document.getElementById('wa-general');
  if (!btn) return;
  btn.href = buildWhatsAppURL(CONFIG.defaultMessage);
}

/* =========================================================
   Tahun otomatis di footer
   ========================================================= */
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = String(new Date().getFullYear());
}

/* =========================================================
   Init
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderSteps();
  setupGeneralWhatsApp();
  setYear();
});