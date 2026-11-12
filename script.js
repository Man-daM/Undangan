// EDIT DATA PERNIKAHAN DI BAGIAN CONFIG INI
const CONFIG = {
  bride: "Perempuan",
  groom: "Pria",
  weddingDate: "2026-12-20T08:00:00+07:00", // format ISO: YYYY-MM-DDTHH:mm:ss+07:00
  dateLabel: "Sabtu, 33 Desember 2033",
  whatsappNumber: "6281234567890", // ganti dengan nomor WhatsApp penerima RSVP
  mapUrl: "https://maps.google.com/?q=Lokasi+Pernikahan",
  bankName: "Nama Bank", // contoh: BCA, BRI, Mandiri
  accountNumber: "0000000000",
  accountOwner: "Nama Pemilik Rekening",
  musicUrl: "assets/music/backsound.mp3", // opsional: masukkan URL file MP3 milik Anda
};

document.querySelectorAll("[data-bride]").forEach(el => el.textContent = CONFIG.bride);
document.querySelectorAll("[data-groom]").forEach(el => el.textContent = CONFIG.groom);
document.querySelectorAll("[data-date-label]").forEach(el => el.textContent = CONFIG.dateLabel);
document.querySelectorAll("[data-map-link]").forEach(el => el.href = CONFIG.mapUrl);
document.querySelectorAll("[data-bank-name]").forEach(el => el.textContent = CONFIG.bankName);
document.querySelectorAll("[data-account-number]").forEach(el => el.textContent = CONFIG.accountNumber);
document.querySelectorAll("[data-account-owner]").forEach(el => el.textContent = CONFIG.accountOwner);
document.querySelectorAll("[data-copy-account]").forEach(button => {
  button.dataset.copyAccount = CONFIG.accountNumber;
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.accountNumber);
      const original = button.textContent;
      button.textContent = "Nomor rekening tersalin ✓";
      setTimeout(() => button.textContent = original, 1800);
    } catch {
      alert("Tidak dapat menyalin otomatis. Silakan salin nomor rekening secara manual: " + CONFIG.accountNumber);
    }
  });
});

const openButton = document.getElementById("openInvitation");
const invitation = document.getElementById("invitation");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

openButton.addEventListener("click", () => {
  invitation.classList.remove("hidden");
  musicToggle.classList.remove("hidden");
  invitation.scrollIntoView({ behavior: "smooth" });
  if (CONFIG.musicUrl) {
    music.src = CONFIG.musicUrl;
    music.play().then(() => musicToggle.textContent = "♫").catch(() => {});
  }
});
musicToggle.addEventListener("click", () => {
  if (!music.src) return;
  if (music.paused) music.play().then(() => musicToggle.textContent = "♫");
  else { music.pause(); musicToggle.textContent = "♪"; }
});

function updateCountdown() {
  const distance = new Date(CONFIG.weddingDate).getTime() - Date.now();
  const values = distance > 0 ? [
    Math.floor(distance / 86400000),
    Math.floor((distance % 86400000) / 3600000),
    Math.floor((distance % 3600000) / 60000),
    Math.floor((distance % 60000) / 1000)
  ] : [0,0,0,0];
  ["days","hours","minutes","seconds"].forEach((id,i) => {
    document.getElementById(id).textContent = String(values[i]).padStart(2,"0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

document.getElementById("rsvpForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const count = document.getElementById("guestCount").value;
  const message = `Assalamu'alaikum, saya ${name}. Konfirmasi kehadiran: ${attendance}. Jumlah tamu: ${count} orang.`;
  if (!CONFIG.whatsappNumber || CONFIG.whatsappNumber === "6281234567890") {
    alert("Silakan ganti whatsappNumber pada file script.js dengan nomor WhatsApp tujuan RSVP terlebih dahulu.");
    return;
  }
  window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
});

// Ucapan disimpan di browser pengunjung (localStorage), bukan database online.
document.getElementById("wishForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("wishName").value.trim();
  const message = document.getElementById("wishMessage").value.trim();
  const wishes = JSON.parse(localStorage.getItem("weddingWishes") || "[]");
  wishes.unshift({name, message, date: new Date().toISOString()});
  localStorage.setItem("weddingWishes", JSON.stringify(wishes.slice(0,50)));
  renderWishes();
  event.target.reset();
});
function renderWishes() {
  const wishes = JSON.parse(localStorage.getItem("weddingWishes") || "[]");
  const list = document.getElementById("wishList");
  list.innerHTML = "";
  if (!wishes.length) {
    list.innerHTML = '<p class="empty-wish">Jadilah yang pertama mengirimkan ucapan.</p>';
    return;
  }
  wishes.forEach(wish => {
    const item = document.createElement("article");
    item.className = "wish-item";
    const name = document.createElement("strong");
    name.textContent = wish.name;
    const message = document.createElement("p");
    message.textContent = wish.message;
    item.append(name, message);
    list.appendChild(item);
  });
}
renderWishes();
