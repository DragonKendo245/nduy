if (typeof CONFIG === "undefined") {
  document.body.insertAdjacentHTML("afterbegin",
    `<div style="position:fixed;z-index:99;top:70px;left:50%;transform:translateX(-50%);padding:14px 20px;border-radius:12px;background:#ff3b6b;color:#fff;max-width:90vw;font:15px sans-serif">
    Không đọc được <b>config.js</b>. Hãy kiểm tra: file nằm cùng thư mục với index.html, tên đúng là "config.js" (không phải config.js.txt) và không bị lỗi dấu phẩy, ngoặc hoặc nháy khi chỉnh sửa.</div>`);
  throw new Error("CONFIG is not defined");
}
const $ = (id) => document.getElementById(id);
const NEON = ["#2bffb0", "#ff2bd6", "#ffd02b", "#2bb6ff", "#ff7a2b", "#b57bff"];
// Bảng màu đậm hơn cho chế độ sáng (màu neon sáng khó đọc trên nền trắng)
const NEON_LIGHT = ["#0a8f63", "#d4167f", "#b36b00", "#1160d6", "#d4470a", "#7a3ee0"];

/* ---------- Hiển thị dữ liệu từ config.js ---------- */
const FALLBACK = "data:image/svg+xml;utf8," + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='#1c2a5e'/><text x='50' y='64' font-size='46' text-anchor='middle' fill='#8fb4ff' font-family='sans-serif'>${CONFIG.name.trim().charAt(0)}</text></svg>`);
$("avatar").src = CONFIG.avatar;
$("avatar").onerror = function () { this.onerror = null; this.src = FALLBACK; };
$("bio").textContent = CONFIG.bio;
$("name").textContent = CONFIG.name;
document.title = CONFIG.name;

/* Sở thích: "I like" cố định, các mục phía sau tự gõ từng chữ rồi xóa */
(function typeLikes() {
  const items = CONFIG.likes;
  if (!items.length) return;
  const b = document.createElement("b"), caret = document.createElement("i");
  caret.className = "caret";
  $("likes").append(b, caret);
  let i = 0, n = 0, deleting = false;
  function paint() {
    const light = document.documentElement.dataset.theme === "light";
    const c = (light ? NEON_LIGHT : NEON)[i % NEON.length];
    b.style.color = c;
    b.style.textShadow = light ? "none" : `0 0 6px ${c}, 0 0 14px ${c}`;
    caret.style.background = c;
    caret.style.boxShadow = light ? "none" : `0 0 8px ${c}`;
  }
  function tick() {
    const word = items[i];
    if (!deleting) {
      n++; b.textContent = word.slice(0, n);
      if (n >= word.length) { deleting = true; return setTimeout(tick, 1500); }
      setTimeout(tick, 90);
    } else {
      n--; b.textContent = word.slice(0, n);
      if (n <= 0) { deleting = false; i = (i + 1) % items.length; paint(); return setTimeout(tick, 350); }
      setTimeout(tick, 45);
    }
  }
  window.repaintLikes = paint;
  paint(); tick();
})();


/* ---------- Biểu tượng chuẩn của Facebook / TikTok / Discord ---------- */
const ICONS = {
  facebook: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#fff"/><path fill="#1877F2" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24"><defs><path id="tt-p" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></defs><use href="#tt-p" fill="#25F4EE" transform="translate(-.9 -.7)"/><use href="#tt-p" fill="#FE2C55" transform="translate(.9 .7)"/><use href="#tt-p" class="tt-main"/></svg>`,
  discord: `<svg viewBox="0 0 24 24"><path fill="#5865F2" d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.608 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>`,
};

/* ---------- Mạng xã hội ---------- */
let openSoc = null;
const linkBox = $("linkBox");
linkBox.innerHTML = '<div class="lb-in"></div>';
const lbIn = linkBox.firstElementChild;
function placeArrow(btn) { // mũi tên của hộp trượt tới đúng nút được bấm
  const wrap = linkBox.parentElement, boxLeft = wrap.offsetWidth / 2 - linkBox.offsetWidth / 2;
  const x = btn.offsetLeft + btn.offsetWidth / 2 - boxLeft;
  linkBox.style.setProperty("--ax", Math.min(Math.max(x, 22), linkBox.offsetWidth - 22) + "px");
}
function closeLink() {
  linkBox.classList.remove("open"); openSoc = null;
  document.querySelectorAll(".soc").forEach((x) => x.classList.remove("active"));
}
CONFIG.socials.forEach((s) => {
  const btn = document.createElement("button");
  btn.className = "soc"; btn.innerHTML = ICONS[s.icon] || s.icon; btn.title = s.name;
  btn.style.setProperty("--c", s.color);
  btn.onclick = () => {
    if (openSoc === s) { closeLink(); return; }
    document.querySelectorAll(".soc").forEach((x) => x.classList.remove("active"));
    btn.classList.add("active");
    const fill = () => { lbIn.innerHTML = `<small>${s.name} của mình</small><a href="${s.url}" target="_blank" rel="noopener">${s.url}</a>`; };
    placeArrow(btn);
    if (!openSoc) { fill(); linkBox.classList.add("open"); }
    else { lbIn.classList.add("out"); setTimeout(() => { fill(); lbIn.classList.remove("out"); }, 160); } // đổi nội dung có chuyển mờ
    openSoc = s;
  };
  $("socials").appendChild(btn);
});
document.addEventListener("click", (e) => { if (openSoc && !e.target.closest(".soc-wrap")) closeLink(); });

/* ---------- Thông báo ---------- */
CONFIG.notifications.forEach((n) => {
  const li = document.createElement("li");
  li.innerHTML = `<b>${n.title}</b><span>${n.text}</span>`;
  $("notifList").appendChild(li);
});
if (!CONFIG.notifications.length) { $("notifList").innerHTML = "<li>Chưa có thông báo nào.</li>"; $("bellDot").classList.add("hide"); }
$("bellBtn").onclick = (e) => { e.stopPropagation(); $("notifPanel").classList.toggle("open"); $("bellDot").classList.add("hide"); };
document.addEventListener("click", (e) => { if (!$("notifPanel").contains(e.target)) $("notifPanel").classList.remove("open"); });

/* ---------- Game + popup ID ---------- */
let toastTimer;
function toast(msg) { const t = $("toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 1800); }
/* Ảnh vuông 1:1 của game (không có ảnh thì hiện icon) */
function thumb(g, cls) {
  const box = document.createElement("div");
  box.className = cls; box.textContent = g.icon;
  if (g.image) {
    const im = new Image(); im.alt = g.name; im.src = g.image;
    im.onload = () => { box.textContent = ""; box.append(im); };
  }
  return box;
}
CONFIG.games.forEach((g, i) => {
  const c = document.createElement("button");
  c.className = "card reveal";
  c.style.setProperty("--c1", g.colors[0]); c.style.setProperty("--c2", g.colors[1]);
  c.style.transitionDelay = i * 0.12 + "s";
  const info = document.createElement("div"); info.innerHTML = `<h3>${g.name}</h3><p>${g.type}</p>`;
  c.append(thumb(g, "gimg"), info);
  c.onclick = () => {
    $("modalIcon").replaceChildren(thumb(g, "mimg")); $("modalName").textContent = g.name; $("modalId").textContent = g.id;
    $("modal").classList.add("open");
  };
  $("gameGrid").appendChild(c);
});
$("copyBtn").onclick = async () => {
  const id = $("modalId").textContent;
  try { await navigator.clipboard.writeText(id); }
  catch { const r = document.createRange(); r.selectNode($("modalId")); getSelection().removeAllRanges(); getSelection().addRange(r); document.execCommand("copy"); }
  toast("Đã sao chép ID ✓");
};
const closeModal = () => $("modal").classList.remove("open");
$("modalClose").onclick = closeModal;
$("modal").onclick = (e) => { if (e.target === $("modal")) closeModal(); };
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

/* ---------- Hiệu ứng cuộn mượt ---------- */
const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("show")), { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
let ticking = false;
function onScroll() {
  const y = scrollY, h = innerHeight, max = document.documentElement.scrollHeight - h;
  $("progress").style.width = (y / max) * 100 + "%";
  const k = Math.min(y / h, 1);
  $("profile").style.transform = `translateY(${y * 0.25}px) scale(${1 - k * 0.12})`;
  $("profile").style.opacity = 1 - k * 1.1;
  ticking = false;
}
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();

/* ---------- Sáng / Tối ---------- */
const root = document.documentElement;
function setTheme(t) { root.dataset.theme = t; $("themeBtn").textContent = t === "dark" ? "🌙" : "☀️"; localStorage.setItem("theme", t); if (window.repaintLikes) window.repaintLikes(); }
setTheme(localStorage.getItem("theme") || "dark");
requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("ready")));
/* Đổi sáng/tối: màu chuyển dần, hai cảnh trộn mờ vào nhau, thêm một vòng sáng lan ra từ nút bấm (không dừng hiệu ứng nào) */
$("themeBtn").onclick = (e) => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  const btn = e.currentTarget;
  btn.classList.remove("spin"); void btn.offsetWidth; btn.classList.add("spin");
  const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const w = document.createElement("div");
  w.className = "wave";
  w.style.cssText = `--x:${x}px;--y:${y}px;--s:${(radius * 2) / 0.55}px;--wc:${next === "light" ? "rgba(255,214,120,.6)" : "rgba(120,150,255,.55)"}`;
  document.body.appendChild(w);
  w.onanimationend = () => w.remove();
  setTheme(next);
};

/* ---------- Bầu trời sao + sao băng (chế độ tối) ---------- */
/* ---------- Tự chọn mức hiệu ứng: điện thoại / máy yếu dùng "chế độ nhẹ" cho đỡ nóng máy, máy tính dùng đầy đủ ---------- */
const PERF = new URLSearchParams(location.search).get("perf") || CONFIG.performance || "auto"; // "auto" | "low" | "high" (thử: thêm ?perf=low vào link)
let LITE = false;
{
  let saved = null; try { saved = sessionStorage.getItem("perf"); } catch {}
  const phone = matchMedia("(pointer:coarse)").matches || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  LITE = PERF === "low" ? true : PERF === "high" ? false : phone || saveData || saved === "lite";
  document.documentElement.classList.toggle("lite", LITE);
}
function setLite(on, auto) {
  LITE = on; document.documentElement.classList.toggle("lite", on);
  if (auto) { try { sessionStorage.setItem("perf", "lite"); } catch {} }
  resize(); initDay(); buildNight();
}

const cv = $("sky"), ctx = cv.getContext("2d");
let W, H, stars = [], shooters = [], nextShoot = 0;
function resize() {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  stars = Array.from({ length: Math.floor((W * H) / (LITE ? 11000 : 5500)) }, () => ({
    x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5 + 0.3,
    s: Math.random() * 2 + 0.5, z: Math.random() * 0.8 + 0.2, p: Math.random() * 6.28,
    c: ["#ffffff", "#bcd2ff", "#ffe9b8"][Math.floor(Math.random() * 3)],
  }));
}
/* ---------- Đêm nâng cấp: cực quang, tinh vân, dải ngân hà, mặt trăng, sao nghiêng theo chuột ---------- */
const par = { x: 0, y: 0 }, sm = { x: 0, y: 0 }, mouse = { x: 0, y: 0 };
addEventListener("pointermove", (e) => { mouse.x = (e.clientX / innerWidth) * 2 - 1; mouse.y = (e.clientY / innerHeight) * 2 - 1; }, { passive: true });
let nebula = null, moon = null, strips = null, aur = null, actx = null, sunImg = null;
const RIBBONS = [
  { s: 0, base: 0.27, amp: 50, h: 0.27, ph: 0,   sp: 1,   al: 0.55 },
  { s: 2, base: 0.19, amp: 40, h: 0.22, ph: 2.1, sp: 0.8, al: 0.45 },
  { s: 1, base: 0.23, amp: 55, h: 0.2,  ph: 1,   sp: 0.6, al: 0.3 },
  { s: 3, base: 0.32, amp: 35, h: 0.15, ph: 4.2, sp: 1.2, al: 0.26 },
];
function makeStrip(r, g, b) {
  const c = document.createElement("canvas"); c.width = 1; c.height = 256;
  const x = c.getContext("2d"), gr = x.createLinearGradient(0, 0, 0, 256);
  gr.addColorStop(0, `rgba(${r},${g},${b},0)`); gr.addColorStop(0.55, `rgba(${r},${g},${b},.22)`);
  gr.addColorStop(0.9, `rgba(${r},${g},${b},.85)`); gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
  x.fillStyle = gr; x.fillRect(0, 0, 1, 256); return c;
}
function buildNight() {
  if (!strips) strips = [makeStrip(60, 255, 170), makeStrip(40, 220, 235), makeStrip(170, 110, 255), makeStrip(255, 90, 200)];
  // Tinh vân + dải ngân hà (vẽ sẵn 1 lần)
  let sd = 20260;
  const rnd = () => ((sd = (sd * 1664525 + 1013904223) >>> 0) / 4294967296);
  nebula = document.createElement("canvas"); nebula.width = W; nebula.height = H;
  const n = nebula.getContext("2d"); n.globalCompositeOperation = "lighter";
  const blob = (x, y, r, ratio, rot, c, a) => {
    n.save(); n.translate(x, y); n.rotate(rot); n.scale(1, ratio);
    const g = n.createRadialGradient(0, 0, 0, 0, 0, r);
    g.addColorStop(0, `rgba(${c},${a})`); g.addColorStop(0.5, `rgba(${c},${a * 0.45})`); g.addColorStop(1, `rgba(${c},0)`);
    n.fillStyle = g; n.beginPath(); n.arc(0, 0, r, 0, 6.28); n.fill(); n.restore();
  };
  const pal = ["130,70,220", "50,110,235", "210,60,170", "40,190,220"];
  for (let i = 0; i < 16; i++) blob(rnd() * W, rnd() * H, (0.15 + rnd() * 0.22) * W, 0.35 + rnd() * 0.35, rnd() * 3.14, pal[i % 4], 0.07 + rnd() * 0.09);
  const rot = -Math.atan2(H * 0.85, W * 0.9);
  for (let i = 0; i < 10; i++) { const t = i / 9; blob(W * (0.05 + 0.9 * t), H * (0.95 - 0.85 * t), W * 0.15, 0.32, rot, "190,205,255", 0.06); }
  // Mặt trăng (vẽ sẵn)
  const R = Math.max(26, Math.min(W, H) * 0.055), S = Math.ceil(R * 2 + 8), c = document.createElement("canvas");
  c.width = c.height = S;
  const m = c.getContext("2d"), o = S / 2;
  m.save(); m.beginPath(); m.arc(o, o, R, 0, 6.28); m.clip();
  const body = m.createRadialGradient(o - R * 0.3, o - R * 0.3, R * 0.1, o, o, R);
  body.addColorStop(0, "#fffef3"); body.addColorStop(0.6, "#e7ecf8"); body.addColorStop(1, "#b7c2dd");
  m.fillStyle = body; m.fillRect(0, 0, S, S);
  m.fillStyle = "rgba(120,135,172,.26)";
  for (const [dx, dy, rr] of [[-0.35, -0.25, 0.18], [0.25, 0.15, 0.24], [-0.1, 0.45, 0.13], [0.45, -0.4, 0.12], [-0.5, 0.2, 0.1], [0.05, -0.05, 0.08]]) { m.beginPath(); m.arc(o + dx * R, o + dy * R, rr * R, 0, 6.28); m.fill(); }
  const sh = m.createRadialGradient(o - R * 0.4, o - R * 0.4, R * 0.4, o, o, R * 1.05);
  sh.addColorStop(0, "rgba(8,12,34,0)"); sh.addColorStop(1, "rgba(8,12,34,.55)");
  m.fillStyle = sh; m.fillRect(0, 0, S, S); m.restore();
  moon = { img: c, R, S };
  aur = document.createElement("canvas"); aur.width = Math.ceil(W / 2); aur.height = Math.ceil(H / 2); actx = aur.getContext("2d");
  // Mặt trời (vẽ sẵn đĩa)
  const SR = Math.max(34, Math.min(W, H) * 0.07), SS = Math.ceil(SR * 2 + 8), sc = document.createElement("canvas");
  sc.width = sc.height = SS;
  const sx = sc.getContext("2d"), so = SS / 2, sg = sx.createRadialGradient(so - SR * 0.25, so - SR * 0.25, SR * 0.08, so, so, SR);
  sg.addColorStop(0, "#fffef2"); sg.addColorStop(0.45, "#fff1a6"); sg.addColorStop(0.82, "#ffd75c"); sg.addColorStop(1, "#ffb53f");
  sx.fillStyle = sg; sx.beginPath(); sx.arc(so, so, SR, 0, 6.28); sx.fill();
  sunImg = { img: sc, R: SR, S: SS };
}
function drawBackdrop(t, k) {
  // Tinh vân + cực quang gộp chung 1 lớp ở nửa độ phân giải, rồi phóng lên 1 lần → mềm và nhẹ máy
  const hw = aur.width, hh = aur.height, step = LITE ? 4 : (W < 700 ? 6 : 5), breath = 0.78 + 0.22 * Math.sin(t / 4000);
  actx.globalCompositeOperation = "source-over"; actx.clearRect(0, 0, hw, hh);
  actx.globalAlpha = 0.9; actx.drawImage(nebula, 0, 0, hw, hh);
  actx.globalCompositeOperation = "lighter";
  for (const r of (LITE ? RIBBONS.slice(0, 2) : RIBBONS)) {
    const strip = strips[r.s];
    for (let x = 0; x < hw; x += step) {
      const u = x / hw, edge = Math.pow(Math.sin(Math.PI * u), 0.6);
      const yb = hh * r.base + Math.sin(u * 5 + t * 0.00025 * r.sp + r.ph) * r.amp * 0.5 + Math.sin(u * 11 - t * 0.0004 * r.sp + r.ph * 2) * r.amp * 0.2;
      const h = hh * r.h * (0.7 + 0.3 * Math.sin(u * 7 + t * 0.0006 * r.sp + r.ph));
      const ray = 0.35 + 0.65 * Math.pow(0.5 + 0.5 * Math.sin(u * 14 + t * 0.0009 * r.sp + r.ph), 1.5);
      actx.globalAlpha = r.al * ray * edge * breath;
      actx.drawImage(strip, 0, 0, 1, 256, x, yb - h, step, h);
    }
  }
  ctx.globalAlpha = k; ctx.drawImage(aur, par.x * 0.4 - 8, par.y * 0.4 - 6, W + 16, H + 12);
  // Mặt trăng + quầng sáng thở
  const mx = W * 0.85 + par.x * 0.6, my = H * 0.2 + par.y * 0.6 + (1 - k) * H * 0.28, pulse = 0.85 + 0.15 * Math.sin(t / 2500); // trăng lặn khi sang ngày
  const glow = ctx.createRadialGradient(mx, my, moon.R * 0.8, mx, my, moon.R * 5);
  glow.addColorStop(0, `rgba(190,210,255,${0.3 * pulse})`); glow.addColorStop(1, "rgba(190,210,255,0)");
  ctx.globalAlpha = k; ctx.fillStyle = glow; ctx.fillRect(mx - moon.R * 5, my - moon.R * 5, moon.R * 10, moon.R * 10);
  ctx.drawImage(moon.img, mx - moon.S / 2, my - moon.S / 2);
  ctx.globalAlpha = 1;
}

/* ---------- Ban ngày (chế độ sáng): mây, cánh hoa, máy bay giấy ---------- */
let clouds = [], petals = [], planes = [], nextPlane = 0;
const PETAL_COLORS = ["#ffb7d1", "#ffc9de", "#ffd9e8", "#ffa8c8"];
function newPetal(anywhere) {
  return { x: Math.random() * W, y: anywhere ? Math.random() * H : -20, r: 5 + Math.random() * 5, vy: 0.6 + Math.random() * 0.8,
    sw: Math.random() * 6.28, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.04, c: PETAL_COLORS[Math.floor(Math.random() * 4)] };
}
function initDay() {
  clouds = Array.from({ length: LITE ? 4 : 6 }, () => ({ x: Math.random() * W, y: 50 + Math.random() * H * 0.55, s: 0.6 + Math.random() * 1.1, v: 0.15 + Math.random() * 0.25 }));
  petals = Array.from({ length: LITE ? 7 : Math.max(14, Math.floor(W / 60)) }, () => newPetal(true));
}
function drawCloud(c) {
  const b = 60 * c.s;
  ctx.fillStyle = "rgba(255,255,255,.85)";
  ctx.beginPath();
  ctx.arc(c.x, c.y, b * 0.5, 0, 6.28); ctx.arc(c.x + b * 0.5, c.y - b * 0.25, b * 0.6, 0, 6.28);
  ctx.arc(c.x + b * 1.1, c.y, b * 0.5, 0, 6.28); ctx.arc(c.x + b * 0.55, c.y + b * 0.1, b * 0.55, 0, 6.28);
  ctx.fill();
}
/* Mặt trời: quầng sáng thở, tia nắng xoay chậm, đĩa sáng, vài vệt lóa; mọc lên đúng chỗ mặt trăng lặn xuống */
function drawSun(t, k) {
  const R = sunImg.R, sx = W * 0.85 + par.x * 0.6, sy = H * 0.2 + par.y * 0.6 + (1 - k) * H * 0.28, pulse = 0.88 + 0.12 * Math.sin(t / 1800);
  ctx.globalAlpha = k;
  // quầng sáng
  const glow = ctx.createRadialGradient(sx, sy, R * 0.9, sx, sy, R * 8);
  glow.addColorStop(0, `rgba(255,226,130,${0.6 * pulse})`); glow.addColorStop(0.35, `rgba(255,205,110,${0.2 * pulse})`); glow.addColorStop(1, "rgba(255,200,100,0)");
  ctx.fillStyle = glow; ctx.fillRect(sx - R * 8, sy - R * 8, R * 16, R * 16);
  // tia nắng xoay chậm
  ctx.save(); ctx.translate(sx, sy); ctx.rotate(t / 26000);
  const rg = ctx.createRadialGradient(0, 0, R * 1.1, 0, 0, R * 10);
  rg.addColorStop(0, `rgba(255,228,130,${0.22 * pulse})`); rg.addColorStop(1, "rgba(255,228,130,0)");
  ctx.fillStyle = rg;
  const N = LITE ? 8 : 16;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * 6.283, w = i % 2 ? 0.045 : 0.028, L = R * (i % 2 ? 6 : 9.5);
    ctx.beginPath(); ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a - w) * L, Math.sin(a - w) * L); ctx.lineTo(Math.cos(a + w) * L, Math.sin(a + w) * L);
    ctx.closePath(); ctx.fill();
  }
  ctx.restore();
  // đĩa mặt trời
  ctx.drawImage(sunImg.img, sx - sunImg.S / 2, sy - sunImg.S / 2);
  // vệt lóa nhỏ chạy từ mặt trời về giữa màn hình
  const dx = W / 2 - sx, dy = H / 2 - sy;
  if (!LITE) for (const [f, r, c, a] of [[0.3, 16, "255,200,120", 0.16], [0.5, 28, "255,150,190", 0.12], [0.72, 12, "150,200,255", 0.18], [0.9, 38, "255,230,150", 0.1]]) {
    const fx = sx + dx * f, fy = sy + dy * f, fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, r * 1.6);
    fg.addColorStop(0, `rgba(${c},${a * 1.5})`); fg.addColorStop(0.6, `rgba(${c},${a * 0.6})`); fg.addColorStop(1, `rgba(${c},0)`);
    ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(fx, fy, r * 1.6, 0, 6.28); ctx.fill();
  }
  ctx.globalAlpha = k;
}

function drawDay(t, k) {
  ctx.shadowBlur = 0; ctx.globalAlpha = k;
  drawSun(t, k);
  for (const c of clouds) { c.x += c.v * FS; if (c.x > W + 150) c.x = -c.s * 150; drawCloud(c); }
  for (let i = 0; i < petals.length; i++) {
    const p = petals[i];
    p.x += (Math.sin(t / 1000 + p.sw) * 0.6 + 0.35) * FS; p.y += p.vy * FS; p.rot += p.vr * FS;
    if (p.y > H + 20 || p.x > W + 20) petals[i] = newPetal(false);
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.fillStyle = p.c; ctx.globalAlpha = 0.9 * k;
    ctx.beginPath(); ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 6.28); ctx.fill();
    ctx.restore();
  }
  ctx.globalAlpha = k;
  if (t > nextPlane) { planes.push({ x: -60, y: H * (0.12 + Math.random() * 0.3), p: 0 }); nextPlane = t + 10000 + Math.random() * 10000; }
  planes = planes.filter((a) => a.x < W + 80);
  for (const a of planes) {
    a.x += 2.2 * FS; a.p += 0.03 * FS;
    ctx.save(); ctx.translate(a.x, a.y + Math.sin(a.p * 2) * 18); ctx.rotate(Math.sin(a.p * 2) * 0.12);
    ctx.fillStyle = "#fff"; if (!LITE) { ctx.shadowColor = "rgba(80,100,200,.35)"; ctx.shadowBlur = 8; }
    ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(-26, -13); ctx.lineTo(-14, 0); ctx.lineTo(-26, 13); ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0; ctx.fillStyle = "#cfd8f5";
    ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(-14, 0); ctx.lineTo(-26, 13); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
}
addEventListener("resize", () => { resize(); initDay(); buildNight(); }); resize(); initDay(); buildNight();
function drawNight(t, k) {
  drawBackdrop(t, k);
  for (const s of stars) {
    const a = 0.35 + 0.65 * Math.abs(Math.sin(t / 1000 * s.s + s.p));
    ctx.globalAlpha = a * k; ctx.fillStyle = s.c;
    const px = s.x + par.x * s.z, py = s.y + par.y * s.z;
    if (LITE) { ctx.fillRect(px - s.r, py - s.r, s.r * 2, s.r * 2); continue; } // bỏ quầng sáng của từng sao (rất tốn)
    ctx.shadowBlur = s.r * 5; ctx.shadowColor = s.c;
    ctx.beginPath(); ctx.arc(px, py, s.r, 0, 6.28); ctx.fill();
  }
  ctx.shadowBlur = 0;
  if (t > nextShoot) {
    shooters.push({ x: Math.random() * W * 0.9 + W * 0.1, y: -20, vx: -(6 + Math.random() * 5), vy: 5 + Math.random() * 4, life: 1 });
    nextShoot = t + 2500 + Math.random() * 4500;
  }
  shooters = shooters.filter((m) => m.life > 0 && m.y < H + 100);
  for (const m of shooters) {
    const len = 14;
    const g = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * len, m.y - m.vy * len);
    g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(1, "rgba(120,160,255,0)");
    ctx.globalAlpha = Math.max(m.life, 0) * k; ctx.strokeStyle = g; ctx.lineWidth = 2.2; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(m.x - m.vx * len, m.y - m.vy * len); ctx.stroke();
    m.x += m.vx * FS; m.y += m.vy * FS; m.life -= 0.006 * FS;
  }
  ctx.globalAlpha = 1;
}
/* Hai cảnh (đêm / ngày) cùng chạy, chỉ trộn độ mờ → mọi hiệu ứng không bị dừng khi đổi chế độ */
let mix = null, lastT = 0, FS = 1, fpsAcc = 0, fpsN = 0, lowWin = 0;
function frame(t) {
  requestAnimationFrame(frame);
  if (LITE && t - lastT < 30) return; // chế độ nhẹ: 30 khung hình/giây cho đỡ nóng máy
  const target = root.dataset.theme === "light" ? 1 : 0;
  if (mix === null) mix = target;
  const raw = t - lastT, dt = Math.min(raw, 50); lastT = t; FS = dt / 16.667;
  // Máy tính mà vẫn giật (dưới ~38 khung/giây suốt ~4 giây) thì tự chuyển sang chế độ nhẹ
  if (PERF === "auto" && !LITE && raw < 250 && !document.getElementById("gate") && Math.abs(target - mix) < 0.01) {
    fpsAcc += raw; fpsN++;
    if (fpsAcc >= 2000) { lowWin = fpsN / (fpsAcc / 1000) < 38 ? lowWin + 1 : 0; fpsAcc = fpsN = 0; if (lowWin >= 2) setLite(true, true); }
  } else { fpsAcc = fpsN = 0; }
  mix += Math.sign(target - mix) * Math.min(Math.abs(target - mix), dt / 1200);
  const e = mix * mix * (3 - 2 * mix);
  sm.x += (mouse.x - sm.x) * 0.05; sm.y += (mouse.y - sm.y) * 0.05;
  par.x = -(sm.x + Math.sin(t / 7000) * 0.25) * 24; par.y = -(sm.y + Math.cos(t / 9000) * 0.25) * 16;
  ctx.clearRect(0, 0, W, H);
  if (e < 0.999) drawNight(t, 1 - e);
  if (e > 0.001) drawDay(t, e);
  ctx.globalAlpha = 1;
}
requestAnimationFrame(frame);


/* ---------- Cuộn nguyên trang (full-page scroll) ---------- */
(function fullPage() {
  const sections = [...document.querySelectorAll("main > section")];
  const topOf = (s) => s.getBoundingClientRect().top + scrollY;
  const coarse = () => matchMedia("(pointer:coarse)").matches; // điện thoại: dùng scroll-snap của CSS
  let animating = false, lock = 0;

  function curIndex() {
    const mid = scrollY + innerHeight / 2; let k = 0;
    sections.forEach((s, i) => { if (topOf(s) <= mid) k = i; });
    return k;
  }
  function animateTo(y, dur, done) {
    const y0 = scrollY, d = y - y0, t0 = performance.now();
    (function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; // easeInOutCubic
      scrollTo({ top: y0 + d * e, behavior: "instant" });
      p < 1 ? requestAnimationFrame(step) : done();
    })(t0);
  }
  function goTo(i) {
    i = Math.max(0, Math.min(sections.length - 1, i));
    if (animating) return;
    animating = true;
    animateTo(topOf(sections[i]), 950, () => { animating = false; lock = performance.now() + 350; });
  }

  addEventListener("wheel", (e) => {
    if (document.documentElement.classList.contains("gate-open")) { e.preventDefault(); return; }
    if (e.ctrlKey || coarse()) return;
    if ($("modal").classList.contains("open")) { e.preventDefault(); return; }
    const dir = Math.sign(e.deltaY); if (!dir) return;
    const i = curIndex(), s = sections[i], top = topOf(s);
    const inside = (dir > 0 && scrollY + innerHeight < top + s.offsetHeight - 4) || (dir < 0 && scrollY > top + 4);
    if (inside && s.offsetHeight > innerHeight + 8 && !animating) return; // trang dài hơn màn hình: cuộn thường
    e.preventDefault();
    if (animating || performance.now() < lock || Math.abs(e.deltaY) < 4) return;
    if (i + dir >= 0 && i + dir < sections.length) goTo(i + dir);
  }, { passive: false });

  addEventListener("keydown", (e) => {
    if (document.documentElement.classList.contains("gate-open")) return;
    if ($("modal").classList.contains("open") || e.target.closest("input,textarea")) return;
    const k = e.key, i = curIndex();
    if (k === " " && e.target.closest("button,a")) return;
    if (k === "ArrowDown" || k === "PageDown" || (k === " " && !e.shiftKey)) { e.preventDefault(); goTo(i + 1); }
    else if (k === "ArrowUp" || k === "PageUp" || (k === " " && e.shiftKey)) { e.preventDefault(); goTo(i - 1); }
    else if (k === "Home") { e.preventDefault(); goTo(0); }
    else if (k === "End") { e.preventDefault(); goTo(sections.length - 1); }
  });

  // Nút "Cuộn xuống" + chấm điều hướng bên phải
  document.querySelector(".scroll-hint").onclick = (e) => { e.preventDefault(); goTo(1); };
  const dots = sections.map((s, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", "Trang " + (i + 1));
    b.onclick = () => goTo(i);
    $("dots").appendChild(b); return b;
  });
  const sync = () => { const k = curIndex(); dots.forEach((b, i) => b.classList.toggle("on", i === k)); };
  addEventListener("scroll", sync, { passive: true }); sync();
})();


/* ---------- Nhạc nền ---------- */
(function music() {
  const M = CONFIG.music, card = $("player"), mini = $("miniPlay");
  if (!M || !M.src) { card.remove(); mini.remove(); return; }
  const audio = new Audio(M.src);
  audio.loop = M.loop !== false; audio.volume = M.volume ?? 0.6; audio.preload = "metadata";

  const title = $("pTitle");
  title.firstElementChild.textContent = M.title || "Bài hát";
  $("pArtist").textContent = M.artist || "";
  requestAnimationFrame(() => { // tên dài thì chạy chữ qua lại
    const over = title.firstElementChild.scrollWidth - title.clientWidth;
    if (over > 2) { title.classList.add("marq"); title.style.setProperty("--shift", -(over + 6) + "px"); }
  });
  if (M.cover) {
    const im = new Image();
    im.onload = () => { $("pDisc").style.backgroundImage = `url("${M.cover}")`; $("pDisc").classList.add("has-cover"); };
    im.src = M.cover;
  }

  const fmt = (s) => (isFinite(s) ? Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0") : "0:00");
  const ui = () => {
    $("pFill").style.width = (audio.duration ? (audio.currentTime / audio.duration) * 100 : 0) + "%";
    $("pCur").textContent = fmt(audio.currentTime); $("pDur").textContent = fmt(audio.duration);
  };
  const setPlaying = (on) => { card.classList.toggle("playing", on); mini.classList.toggle("playing", on); };
  audio.addEventListener("timeupdate", ui); audio.addEventListener("loadedmetadata", ui);
  audio.addEventListener("play", () => setPlaying(true)); audio.addEventListener("pause", () => setPlaying(false));

  const toggle = () => {
    if (audio.paused) audio.play().catch(() => toast("Chưa tìm thấy file nhạc 🎵"));
    else audio.pause();
  };
  $("pBtn").onclick = toggle; mini.onclick = toggle;

  // Bấm hoặc kéo trên thanh tiến độ để tua
  const bar = $("pBar");
  const seek = (e) => {
    const r = bar.getBoundingClientRect(), p = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    if (audio.duration) audio.currentTime = p * audio.duration;
    ui();
  };
  bar.addEventListener("pointerdown", (e) => { bar.setPointerCapture(e.pointerId); bar.classList.add("drag"); seek(e); });
  bar.addEventListener("pointermove", (e) => { if (bar.classList.contains("drag")) seek(e); });
  ["pointerup", "pointercancel"].forEach((n) => bar.addEventListener(n, () => bar.classList.remove("drag")));

  window.MUSIC = { play: () => audio.play().catch(() => toast("Chưa tìm thấy file nhạc 🎵")) };

  // Rời trang 1 thì hiện nút nhạc nhỏ ở góc để vẫn bật/tắt được
  addEventListener("scroll", () => mini.classList.toggle("show", scrollY > innerHeight * 0.6), { passive: true });
})();


/* ---------- Màn hình chào: bấm "Vào với nhạc" = cú bấm đầu tiên cho phép phát nhạc ---------- */
(function gate() {
  const html = document.documentElement, g = $("gate"), W_ = CONFIG.welcome || {};
  let silent = false;
  try { silent = localStorage.getItem("entry") === "silent"; } catch {}
  const enabled = W_.enabled !== false && !!window.MUSIC && !silent;
  const reveal = () => html.classList.remove("gate-open");
  if (!enabled) { g.remove(); html.classList.add("quick"); requestAnimationFrame(() => requestAnimationFrame(reveal)); return; }

  $("gAvatar").src = CONFIG.avatar;
  $("gAvatar").onerror = function () { this.onerror = null; this.src = FALLBACK; };
  $("gHi").textContent = W_.hello || "Chào mừng bạn ✨";
  $("gName").textContent = CONFIG.name;
  $("gSub").textContent = W_.sub || "Trang này có nhạc nền, bạn muốn nghe cùng mình chứ?";
  $("gMusic").textContent = W_.musicBtn || "♪ Vào với nhạc";
  $("gSilent").textContent = W_.silentBtn || "Vào im lặng";

  // Chùm tia sáng bắn ra từ chỗ ảnh đại diện
  function burst() {
    const cols = ["var(--ca)", "var(--cb)", "var(--cc)", "#fff"], reach = Math.min(innerWidth, innerHeight) * 0.5;
    for (let i = 0; i < (LITE ? 10 : 40); i++) {
      const a = Math.random() * Math.PI * 2, d = 140 + Math.random() * reach, el = document.createElement("i");
      el.style.cssText = `--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;--sz:${3 + Math.random() * 5}px;--pc:${cols[i % 4]};--du:${0.9 + Math.random() * 0.9}s;--dl:${0.15 + Math.random() * 0.25}s`;
      $("gBurst").appendChild(el);
    }
  }

  let opened = false;
  const open = (withMusic) => {
    if (opened) return; opened = true;
    if (withMusic) window.MUSIC.play(); // gọi ngay trong cú bấm để trình duyệt cho phép
    try { localStorage.setItem("entry", withMusic ? "music" : "silent"); } catch {}
    // Ảnh đại diện ở màn chào bay (và phóng to) về đúng vị trí ảnh trên trang 1
    const av = $("gAvatar"), s = av.getBoundingClientRect(), t = document.querySelector(".avatar-wrap").getBoundingClientRect();
    const cx = t.left + t.width / 2, cy = t.top + t.height / 2;
    g.style.setProperty("--cx", cx + "px"); g.style.setProperty("--cy", cy + "px");
    // Vòng sáng chỉ cần loang đủ tới góc xa nhất của màn hình
    const vm = Math.max(innerWidth, innerHeight), far = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
    g.style.setProperty("--rend", far + vm * 0.08 + "px"); g.style.setProperty("--rd", 2 * (far + vm * 0.04) + "px");
    av.style.transform = `translate(${cx - (s.left + s.width / 2)}px,${cy - (s.top + s.height / 2)}px) scale(${t.width / s.width})`;
    burst();
    g.classList.add("opening"); reveal();
    setTimeout(() => g.remove(), 2700);
  };
  $("gMusic").onclick = () => open(true);
  $("gSilent").onclick = () => open(false);
  $("gMusic").focus({ preventScroll: true });
})();
