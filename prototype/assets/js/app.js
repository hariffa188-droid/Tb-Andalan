/* ==========================================================
   Tb. Andalan — shared app script (header, footer, katalog,
   daftar penawaran, modal produk, integrasi WhatsApp/marketplace)
   ========================================================== */

/* ---- Konfigurasi kanal: GANTI dengan data asli Tb. Andalan ---- */
const CONFIG = {
  storeName: "TB. Andalan Bogor",
  wa: "628158858927",
  phone: "+62 815-8858-927",
  address: "Jl. Raya Kemang Parung Bogor No. KM. 43, Pd. Udik, Kec. Kemang, Kabupaten Bogor, Jawa Barat 16310 (dekat Jembatan PWRI Kemang)",
  hours: "Senin – Sabtu, 07.00 – 17.00",
  mapsQuery: "TB. Andalan Bogor Jl. Raya Kemang Parung KM 43 Kemang Bogor",
  links: {
    shopee: "https://s.shopee.co.id/AAIlnw6WEP?share_channel_code=1",
    lazada: "https://s.lazada.co.id/s.007l1F",
    blibli: "https://blibli.onelink.me/GNtk/fvu9ktgi",
    tokopedia: "https://tk.tokopedia.com/ZSppR28Ax/",
    tiktok: "https://www.tiktok.com/@tbandalanbogor",
    tiktokShop: "https://vt.tiktok.com/ZSsd5ALMH/?page=Mall&utm_campaign=client_share&utm_source=whatsapp&share_app_id=1180",
    ig: "https://www.instagram.com/tb_andalan/",
    maps: "https://www.google.com/search?kgmid=%2Fg%2F1pzylsp3t"
  }
};
Object.freeze(CONFIG.links);
Object.freeze(CONFIG);

const CATEGORIES = [
  { id: "semen-instan",  name: "Semen Instan & Mortar",       icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M9 5v5M15 10v4M9 14v5M3 14h18"/></svg>' },
  { id: "waterproofing", name: "Waterproofing & Anti Bocor",  icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3s6 6.5 6 10.5a6 6 0 1 1-12 0C6 9.5 12 3 12 3z"/></svg>' },
  { id: "cat",           name: "Cat & Pelapis",               icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h12v5H4z"/><path d="M16 7h3v5l-7 2v5"/></svg>' },
  { id: "papan",         name: "Papan GRC & Kalsium Silikat", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7l8-4 8 4v10l-8 4-8-4z"/><path d="M4 7l8 4 8-4M12 11v10"/></svg>' },
  { id: "gypsum",        name: "Gypsum & Plafon",             icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 10l9-6 9 6v10H3z"/><path d="M3 14h18"/></svg>' },
  { id: "atap",          name: "Atap & Genteng Metal",        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 13l9-7 9 7"/><path d="M5 12v7h14v-7"/></svg>' }
];

const APP_LOGOS = {
  wa: '<svg class="app-logo" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#25D366"/><path fill="#fff" d="M12.03 5.5a6.47 6.47 0 0 0-5.57 9.77l-.73 2.94 3.03-.79a6.47 6.47 0 1 0 3.27-11.92zm3.78 9.13c-.16.45-.93.86-1.29.91-.33.05-.75.07-1.21-.08-.28-.09-.64-.21-1.1-.41-1.93-.83-3.19-2.78-3.29-2.91-.1-.13-.79-1.05-.79-2 0-.95.5-1.42.68-1.61.18-.2.39-.24.52-.24h.38c.12 0 .28-.05.44.33.16.39.55 1.35.6 1.45.05.1.08.21.02.34-.06.13-.1.21-.19.33-.1.12-.2.26-.29.35-.1.1-.2.2-.09.4.11.2.5.82 1.07 1.33.74.66 1.36.86 1.56.96.2.1.31.08.43-.05.11-.13.49-.57.62-.77.13-.2.26-.16.44-.1.18.06 1.15.54 1.35.64.2.1.33.15.38.23.05.08.05.48-.11.93z"/></svg>',
  shopee: '<svg class="app-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="#EE4D2D" d="M16.5 7.5h-1.35a3.15 3.15 0 0 0-6.3 0H7.5l-3 .01a1 1 0 0 0-1 .92l-.96 11.4A2.2 2.2 0 0 0 4.73 22h14.54a2.2 2.2 0 0 0 2.19-2.17L20.5 8.43a1 1 0 0 0-1-.92l-3-.01zm-4.5-2.6a1.65 1.65 0 0 1 1.65 1.6h-3.3A1.65 1.65 0 0 1 12 4.9z"/><path fill="#fff" d="M12.1 10.6c-1.78 0-3.02.93-3.02 2.25 0 1.38 1.15 1.93 2.77 2.27 1.24.26 1.82.56 1.82 1.18 0 .68-.72 1.12-1.7 1.12-1.05 0-1.92-.39-2.56-.94l-.78 1.22c.78.64 1.94 1.08 3.28 1.08 2.02 0 3.36-.99 3.36-2.48 0-1.36-1.02-1.99-2.78-2.34-1.22-.24-1.78-.52-1.78-1.12 0-.58.59-.94 1.43-.94.84 0 1.61.29 2.22.71l.66-1.22c-.72-.48-1.73-.79-2.92-.79z"/></svg>',
  lazada: '<svg class="app-logo" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="lazGradA" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#F36D00"/><stop offset="52%" stop-color="#ED008C"/><stop offset="100%" stop-color="#0F146D"/></linearGradient><linearGradient id="lazGradB" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#FF8A00"/><stop offset="100%" stop-color="#ED008C"/></linearGradient></defs><rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="#0F146D"/><path fill="url(#lazGradA)" d="M12 18.8a.9.9 0 0 1-.46-.13l-5.7-3.35A1 1 0 0 1 5.3 14.4V8.55a.8.8 0 0 1 1.18-.7L12 10.75l5.52-2.9a.8.8 0 0 1 1.18.7v5.85a1 1 0 0 1-.54.92l-5.7 3.35a.9.9 0 0 1-.46.13z"/><path fill="url(#lazGradB)" d="M12 10.75L5.7 7.45a.75.75 0 0 1 .08-1.36l2.48-1.02a1.2 1.2 0 0 1 1.06.08L12 6.72l2.68-1.57a1.2 1.2 0 0 1 1.06-.08l2.48 1.02a.75.75 0 0 1 .08 1.36L12 10.75z"/></svg>',
  tokopedia: '<svg class="app-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="#42B549" d="M16.1 6.8a4.1 4.1 0 0 0-8.2 0H4.7a.9.9 0 0 0-.9.83l-.92 12.1A2.1 2.1 0 0 0 4.98 22h14.04a2.1 2.1 0 0 0 2.1-2.27L20.2 7.63a.9.9 0 0 0-.9-.83h-3.2zm-4.1-2.6a2.3 2.3 0 0 1 2.3 2.6H9.7A2.3 2.3 0 0 1 12 4.2z"/><circle cx="9.1" cy="13.2" r="2.2" fill="#fff"/><circle cx="14.9" cy="13.2" r="2.2" fill="#fff"/><circle cx="9.2" cy="13.2" r="1.05" fill="#212121"/><circle cx="14.8" cy="13.2" r="1.05" fill="#212121"/><path fill="#FFC400" d="M10.4 15.9h3.2L12 18.1z"/></svg>',
  blibli: '<svg class="app-logo" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="3.5" width="20" height="17" rx="5.5" fill="#0095DA"/><circle cx="8" cy="11.2" r="2.1" fill="#fff"/><circle cx="16" cy="11.2" r="2.1" fill="#fff"/><circle cx="8.2" cy="11.2" r=".95" fill="#0095DA"/><circle cx="15.8" cy="11.2" r=".95" fill="#0095DA"/><path fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" d="M9.1 15.8c1.6 1.25 4.2 1.25 5.8 0"/></svg>',
  tiktok: '<svg class="app-logo" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#111111"/><path fill="#25F4EE" d="M13.9 5.8v7.4a2.75 2.75 0 1 1-2.15-2.68v1.86a1 1 0 1 0 .77.97V5.8h1.38a3.6 3.6 0 0 0 3.05 3.05v1.65a5.1 5.1 0 0 1-3.05-1.05z"/><path fill="#FE2C55" d="M14.7 6.3v7.4a2.75 2.75 0 1 1-2.15-2.68v1.86a1 1 0 1 0 .77.97V6.3h1.38a3.6 3.6 0 0 0 3.05 3.05v1.65a5.1 5.1 0 0 1-3.05-1.05z"/><path fill="#fff" d="M14.3 6.05v7.4a2.75 2.75 0 1 1-2.15-2.68v1.86a1 1 0 1 0 .77.97V6.05h1.38a3.6 3.6 0 0 0 3.05 3.05v1.65a5.1 5.1 0 0 1-3.05-1.05v3.65a4.4 4.4 0 1 1-4.4-4.4c.3 0 .58.03.85.09v1.88a2.55 2.55 0 1 0 1.78 2.43V6.05h1.77z"/></svg>',
  ig: '<svg class="app-logo" viewBox="0 0 24 24" aria-hidden="true"><defs><radialGradient id="igGradA" cx="30%" cy="107%" r="150%"><stop offset="0%" stop-color="#FDF497"/><stop offset="5%" stop-color="#FDF497"/><stop offset="45%" stop-color="#FD5949"/><stop offset="60%" stop-color="#D6249F"/><stop offset="90%" stop-color="#285AEB"/></radialGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igGradA)"/><rect x="6" y="6" width="12" height="12" rx="3.6" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="2.9" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="15.8" cy="8.2" r="1.05" fill="#fff"/></svg>',
  maps: '<svg class="app-logo" viewBox="0 0 24 24" aria-hidden="true"><path fill="#EA4335" d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7z"/><circle cx="12" cy="9" r="2.6" fill="#fff"/></svg>'
};
APP_LOGOS.tiktokShop = APP_LOGOS.tiktok;
const UNIT_FIX = { "Join-X Pengisi Nat GRC": "kaleng", "Masterproof": "kaleng", "Property Cat Tembok": "pail", "Vinilex 5000": "pail", "Sikatop 107 Seal": "set", "Lemkra DS 105": "sak", "Lemkra FK 103": "sak" };
const FEATURED = ["mu-301-3053078", "aquaproof-4kg-4067489", "gyproc-gypsum-board-2986334", "superplank-grc-9x200x2440-4085702", "damdex-anti-bocor-5-liter-5427452", "decon-beton-instan-50kg-5426904", "vinilex-5000-4825098", "versaboard-1220x2440x4mm-2986392"];

const PRODUCTS = (window.PRODUCTS || []).map(p => ({ ...p, unit: UNIT_FIX[p.name] || p.unit }));
const catName = id => (CATEGORIES.find(c => c.id === id) || {}).name || id;
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const WA_ICON = '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.1.1.7-.1 1.3z"/></svg>';

/* ================= Layout (header/footer dipakai semua halaman) ================= */
function renderLayout(active) {
  document.body.insertAdjacentHTML("afterbegin", `
  <div class="topbar"><div class="container">
    <span>Buka: <b>${CONFIG.hours}</b></span>
    <span class="hide-m">Kemang – Parung, Kab. Bogor · <b>Harga grosir</b> untuk toko & kontraktor</span>
    <span>WhatsApp: <a href="#" data-link="wa"><b>${CONFIG.phone}</b></a></span>
  </div></div>
  <header><div class="container">
    <div class="nav">
      <button class="icon-btn nav-burger" onclick="openMobileNav()" aria-label="Menu navigasi">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <a href="index.html" class="brand"><img src="assets/logo.jpg" alt="Logo Tb. Andalan"><div><span>ANDALAN</span><small>BAHAN BANGUNAN</small></div></a>
      <form class="search" action="katalog.html" role="search">
        <input name="q" type="search" placeholder="Cari mortar, gypsum, anti bocor, GRC…" aria-label="Cari produk">
        <button type="submit">Cari</button>
      </form>
      <div class="nav-actions">
        <a class="icon-btn" href="katalog.html"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg><span class="lbl">Katalog</span></a>
        <button class="icon-btn" onclick="openQuote()" aria-label="Daftar penawaran"><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1z"/><path d="M8 6H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-2"/><path d="M9 12h6M9 16h4"/></svg><span class="badge" id="qCount">0</span><span class="lbl">Penawaran</span></button>
      </div>
    </div>
    <nav class="menu" aria-label="Navigasi utama">
      <a href="index.html" class="${active === 'home' ? 'active' : ''}">Beranda</a>
      <a href="katalog.html" class="${active === 'katalog' ? 'active' : ''}">Katalog Produk</a>
      ${CATEGORIES.slice(0, 4).map(c => `<a href="katalog.html?cat=${c.id}">${c.name}</a>`).join("")}
      <a href="index.html#lokasi">Lokasi Toko</a>
    </nav>
  </div></header>`);

  document.body.insertAdjacentHTML("beforeend", `
  <footer><div class="container">
    <div class="foot">
      <div>
        <a href="index.html" class="brand" style="margin-bottom:14px"><img src="assets/logo.jpg" alt=""><div><span>ANDALAN</span><small>BAHAN BANGUNAN</small></div></a>
        <p style="font-size:.92rem">Supplier bahan bangunan dengan harga grosir: Versaboard, Gyproc, mortar MU, GRC Superplank, baja ringan, pipa Wavin, kloset Toho, cat anti bocor & lainnya.</p>
        <p style="font-size:.88rem;margin-top:10px">${CONFIG.address}</p>
      </div>
      <div><h4>Katalog</h4><ul>${CATEGORIES.map(c => `<li><a href="katalog.html?cat=${c.id}">${c.name}</a></li>`).join("")}</ul></div>
      <div><h4>Belanja di</h4><ul><li><a href="#" data-link="wa">WhatsApp Order</a></li><li><a href="#" data-link="shopee">Shopee</a></li><li><a href="#" data-link="lazada">Lazada</a></li><li><a href="#" data-link="blibli">Blibli</a></li><li><a href="#" data-link="tokopedia">Tokopedia</a></li><li><a href="#" data-link="tiktokShop">TikTok Shop</a></li></ul></div>
      <div><h4>Ikuti Kami</h4><ul><li><a href="#" data-link="ig">Instagram (@tb_andalan)</a></li><li><a href="#" data-link="tiktok">TikTok (@tbandalanbogor)</a></li><li><a href="#" data-link="maps">Google Maps</a></li></ul></div>
    </div>
    <div class="copy">© 2026 Tb. Andalan — Supplier Bahan Bangunan, Bogor. All rights reserved.</div>
  </div></footer>

  <div class="fab-hub" id="fabHub">
    <div class="fab-menu" id="fabMenu" role="menu" aria-label="Kanal Resmi TB Andalan">
      <div class="fab-menu-head">Belanja Resmi TB Andalan</div>
      <a class="fab-item" style="--i:6" href="#" data-link="shopee" role="menuitem"><span class="fab-ico">${APP_LOGOS.shopee}</span><span>Shopee</span></a>
      <a class="fab-item" style="--i:5" href="#" data-link="lazada" role="menuitem"><span class="fab-ico">${APP_LOGOS.lazada}</span><span>Lazada</span></a>
      <a class="fab-item" style="--i:4" href="#" data-link="blibli" role="menuitem"><span class="fab-ico">${APP_LOGOS.blibli}</span><span>Blibli</span></a>
      <a class="fab-item" style="--i:3" href="#" data-link="tokopedia" role="menuitem"><span class="fab-ico">${APP_LOGOS.tokopedia}</span><span>Tokopedia</span></a>
      <a class="fab-item" style="--i:2" href="https://vt.tiktok.com/ZSsd5ALMH/?page=Mall&utm_campaign=client_share&utm_source=whatsapp&share_app_id=1180" target="_blank" rel="noopener noreferrer" data-link="tiktokShop" role="menuitem"><span class="fab-ico">${APP_LOGOS.tiktokShop}</span><span>TikTok Shop</span></a>
      <a class="fab-item" style="--i:1" href="#" data-link="ig" role="menuitem"><span class="fab-ico">${APP_LOGOS.ig}</span><span>Instagram</span></a>
      <a class="fab-item fab-item-wa" style="--i:0" href="#" data-link="wa" role="menuitem"><span class="fab-ico">${APP_LOGOS.wa}</span><span>Chat WhatsApp</span></a>
    </div>
    <a class="fab" id="fabMain" href="#" data-link="wa" aria-label="Buka kanal resmi & WhatsApp TB Andalan" aria-expanded="false">${WA_ICON}</a>
  </div>
  <div class="overlay" id="overlay" onclick="closeAll()"></div>

  <aside class="mobile-nav" id="mobileNav" aria-label="Menu navigasi mobile">
    <div class="drawer-head">
      <div><h3>Menu</h3><p>${CONFIG.storeName}</p></div>
      <button onclick="closeAll()" style="font-size:1.6rem;width:44px;height:44px" aria-label="Tutup">×</button>
    </div>
    <nav class="mobile-nav-list">
      <a href="index.html" onclick="closeAll()">Beranda</a>
      <a href="katalog.html" onclick="closeAll()">Semua Katalog</a>
      <div class="mobile-nav-label">Kategori</div>
      ${CATEGORIES.map(c => `<a href="katalog.html?cat=${c.id}" onclick="closeAll()">${c.name}</a>`).join("")}
      <div class="mobile-nav-label">Info Toko</div>
      <a href="index.html#kalkulator" onclick="closeAll()">Kalkulator Material</a>
      <a href="index.html#proyek" onclick="closeAll()">Penawaran Proyek</a>
      <a href="index.html#lokasi" onclick="closeAll()">Lokasi Toko</a>
    </nav>
  </aside>

  <aside class="drawer" id="drawer" aria-label="Daftar penawaran">
    <div class="drawer-head"><div><h3>Daftar Penawaran</h3><p>Kirim daftar ini, kami balas dengan harga terbaik</p></div><button onclick="closeAll()" style="font-size:1.6rem" aria-label="Tutup">×</button></div>
    <div class="drawer-body" id="qBody"></div>
    <div class="drawer-foot">
      <div class="row">
        <div class="field"><label for="qName">Nama</label><input id="qName" placeholder="Nama / toko"></div>
        <div class="field"><label for="qArea">Lokasi kirim</label><input id="qArea" placeholder="Kec. / kota"></div>
      </div>
      <button class="btn btn-wa" onclick="sendQuote()">${WA_ICON.replace('<svg', '<svg width="20" height="20" fill="#fff"')} Minta Harga via WhatsApp</button>
      <p class="note">Harga, stok & ongkir dikonfirmasi admin melalui WhatsApp.</p>
    </div>
  </aside>

  <div class="modal" id="modal" onclick="if(event.target===this)closeAll()"><div class="modal-box" id="modalBox"></div></div>
  <div class="toast" id="toast"></div>`);

  bindLinks();
  initFabHub();
  renderQuote();
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(); });
}

function initFabHub() {
  const hub = $("fabHub");
  const main = $("fabMain");
  const menu = $("fabMenu");
  if (!hub || !main || !menu) return;

  let closeTimer = null;
  const setOpen = open => {
    clearTimeout(closeTimer);
    hub.classList.toggle("is-open", open);
    main.setAttribute("aria-expanded", open ? "true" : "false");
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => setOpen(false), 120);
  };

  // Hanya buka saat kursor tepat di tombol WA, tetap buka saat bergerak ke menu di atasnya
  main.addEventListener("mouseenter", () => setOpen(true));
  main.addEventListener("mouseleave", scheduleClose);
  menu.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  menu.addEventListener("mouseleave", scheduleClose);

  main.addEventListener("click", e => {
    const isTouchLike = window.matchMedia("(hover: none)").matches || window.innerWidth <= 960;
    if (isTouchLike && !hub.classList.contains("is-open")) {
      e.preventDefault();
      setOpen(true);
    }
  });

  document.addEventListener("click", e => {
    if (hub.classList.contains("is-open") && !hub.contains(e.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && hub.classList.contains("is-open")) {
      setOpen(false);
    }
  });
}

/* ================= Product card & modal ================= */
function productCard(p) {
  const inList = quote[p.slug];
  return `
  <article class="card">
    <div class="thumb" onclick="openProduct('${p.slug}')">
      ${FEATURED.includes(p.slug) ? '<span class="tag">Terlaris</span>' : ""}
      <img src="${p.img}" alt="${esc(p.name)}" loading="lazy">
    </div>
    <div class="card-body">
      <span class="card-cat">${catName(p.cat)}</span>
      <h3 onclick="openProduct('${p.slug}')">${esc(p.name)}</h3>
      <span class="card-brand">Merek: ${esc(p.brand)} · per ${p.unit}</span>
      <div class="card-actions">
        <button class="add ${inList ? "in" : ""}" onclick="addQuote('${p.slug}')">${inList ? `✓ Di daftar (${inList})` : "+ Daftar Penawaran"}</button>
        <button class="mini" onclick="openWA(askText(PRODUCTS.find(x=>x.slug==='${p.slug}')))" title="Tanya harga via WhatsApp" aria-label="Tanya harga via WhatsApp">${WA_ICON}</button>
      </div>
    </div>
  </article>`;
}

function openProduct(slug) {
  const p = PRODUCTS.find(x => x.slug === slug); if (!p) return;
  const related = PRODUCTS.filter(x => x.cat === p.cat && x.slug !== p.slug).slice(0, 3);
  $("modalBox").innerHTML = `
    <button class="modal-close" onclick="closeAll()" aria-label="Tutup">×</button>
    <div class="modal-img"><img src="${p.img}" alt="${esc(p.name)}"></div>
    <div class="modal-info">
      <div class="meta"><span>${catName(p.cat)}</span><span>${esc(p.brand)}</span><span>Satuan: ${p.unit}</span></div>
      <h2>${esc(p.name)}</h2>
      <div class="ask-box"><b>Harga: Hubungi Kami</b>Harga grosir menyesuaikan jumlah pembelian & lokasi pengiriman.</div>
      <div class="desc">${esc(p.desc || "Deskripsi produk akan segera dilengkapi.")}</div>
      <div class="qty-row">
        <span style="font-size:.9rem;font-weight:600">Jumlah</span>
        <div class="qty"><button onclick="mq(-1)">−</button><input id="mQty" type="number" min="1" value="${quote[p.slug] || 1}"><button onclick="mq(1)">+</button></div>
        <span style="font-size:.85rem;color:var(--muted)">${p.unit}</span>
      </div>
      <div class="modal-actions">
        <button class="btn btn-dark" onclick="addQuote('${p.slug}', +$('mQty').value, true)">+ Daftar Penawaran</button>
        <button class="btn btn-wa" onclick="openWA(askText(PRODUCTS.find(x=>x.slug==='${p.slug}'), $('mQty').value))">Tanya Harga</button>
      </div>
      <div class="mp-row">Juga tersedia di:
        <a class="chip" href="#" data-link="shopee">${APP_LOGOS.shopee}Shopee</a>
        <a class="chip" href="#" data-link="lazada">${APP_LOGOS.lazada}Lazada</a>
        <a class="chip" href="#" data-link="blibli">${APP_LOGOS.blibli}Blibli</a>
        <a class="chip" href="#" data-link="tokopedia">${APP_LOGOS.tokopedia}Tokopedia</a>
        <a class="chip" href="#" data-link="tiktok">${APP_LOGOS.tiktok}TikTok Shop</a>
      </div>
      ${related.length ? `<div style="border-top:1px solid var(--line);padding-top:12px"><b style="font-size:.9rem">Produk terkait</b>
        <div style="display:flex;gap:10px;margin-top:8px">${related.map(r => `<button onclick="openProduct('${r.slug}')" style="flex:1;border:1px solid var(--line);border-radius:10px;padding:8px;text-align:left;font-size:.78rem;line-height:1.3"><img src="${r.img}" alt="" style="height:60px;margin:0 auto 6px;object-fit:contain">${esc(r.name)}</button>`).join("")}</div></div>` : ""}
    </div>`;
  $("modal").classList.add("show"); $("overlay").classList.add("show");
  bindLinks($("modalBox"));
  history.replaceState(null, "", "#produk=" + slug);
}
function mq(d) { const i = $("mQty"); i.value = Math.max(1, (+i.value || 1) + d); }

/* ================= Daftar penawaran (quote list) ================= */
let quote = JSON.parse(localStorage.getItem("andalan_quote") || "{}");
function saveQuote() { localStorage.setItem("andalan_quote", JSON.stringify(quote)); renderQuote(); if (window.onQuoteChange) window.onQuoteChange(); }
function addQuote(slug, qty, set) {
  quote[slug] = set ? Math.max(1, qty || 1) : (quote[slug] || 0) + 1;
  saveQuote(); toast("✓ Ditambahkan ke daftar penawaran");
  if (set) closeAll();
}
function changeQ(slug, d) { quote[slug] += d; if (quote[slug] <= 0) delete quote[slug]; saveQuote(); }
function renderQuote() {
  const items = Object.entries(quote).map(([s, q]) => ({ ...PRODUCTS.find(p => p.slug === s), q })).filter(i => i.name);
  if ($("qCount")) $("qCount").textContent = items.length;
  if (!$("qBody")) return;
  $("qBody").innerHTML = items.length ? items.map(i => `
    <div class="ci"><img src="${i.img}" alt="">
      <div class="ci-info"><b>${esc(i.name)}</b><span>${esc(i.brand)} · per ${i.unit}</span></div>
      <div class="qty"><button onclick="changeQ('${i.slug}',-1)">−</button><span>${i.q}</span><button onclick="changeQ('${i.slug}',1)">+</button></div>
    </div>`).join("") : `<div class="empty">Daftar penawaran masih kosong.<br><a class="link-gold" href="katalog.html">Lihat katalog →</a></div>`;
}
function openQuote() { closeAll(); $("drawer").classList.add("show"); $("overlay").classList.add("show"); }
function openMobileNav() { closeAll(); $("mobileNav").classList.add("show"); $("overlay").classList.add("show"); }
function closeAll() {
  ["drawer", "modal", "overlay", "mobileNav"].forEach(id => $(id) && $(id).classList.remove("show"));
  document.querySelector(".sidebar")?.classList.remove("show");
  if (location.hash.startsWith("#produk=")) history.replaceState(null, "", location.pathname + location.search);
}
function sendQuote() {
  const items = Object.entries(quote).map(([s, q]) => ({ ...PRODUCTS.find(p => p.slug === s), q })).filter(i => i.name);
  if (!items.length) return toast("Daftar penawaran masih kosong");
  const lines = items.map((i, n) => `${n + 1}. ${i.name} — ${i.q} ${i.unit}`).join("\n");
  openWA(`Halo ${CONFIG.storeName}, saya minta penawaran harga untuk:\n\n${lines}\n\nNama: ${$("qName").value || "-"}\nLokasi kirim: ${$("qArea").value || "-"}\n\nMohon info harga, stok & ongkir. Terima kasih 🙏`);
}

/* ================= Helpers ================= */
function waLink(text) { return CONFIG.wa ? `https://wa.me/${CONFIG.wa}?text=${encodeURIComponent(text)}` : ""; }
function openWA(text) {
  const url = waLink(text);
  if (!url) return toast("Nomor WhatsApp belum diisi — segera tersedia");
  window.open(url, "_blank", "noopener,noreferrer");
}
function askText(p, qty) { return `Halo ${CONFIG.storeName}, saya mau tanya harga & stok:\n*${p.name}*${qty ? ` — ${qty} ${p.unit}` : ""}\n\nLink: ${location.origin}${location.pathname.replace(/[^/]*$/, "")}katalog.html#produk=${p.slug}`; }
function bindLinks(root = document) {
  root.querySelectorAll("[data-link]").forEach(a => {
    const k = a.dataset.link;
    const url = k === "wa" ? waLink(`Halo ${CONFIG.storeName}, saya mau tanya produk.`) : CONFIG.links[k];
    if (url) {
      a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
      a.classList.remove("is-soon");
    } else {
      a.href = "#"; a.removeAttribute("target");
      a.classList.add("is-soon");
      a.onclick = e => { e.preventDefault(); toast("Link belum diisi — akan segera tersedia"); };
    }
  });
}
let _tt;
function toast(m) { const t = $("toast"); t.textContent = m; t.classList.add("show"); clearTimeout(_tt); _tt = setTimeout(() => t.classList.remove("show"), 2000); }
function openFromHash() { const m = location.hash.match(/^#produk=(.+)$/); if (m) openProduct(m[1]); }
