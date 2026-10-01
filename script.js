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
CONFIG.socials.forEach((s) => {
  const btn = document.createElement("button");
  btn.className = "soc"; btn.innerHTML = ICONS[s.icon] || s.icon; btn.title = s.name;
  btn.style.setProperty("--c", s.color);
  btn.onclick = () => {
    const box = $("linkBox");
    if (openSoc === s) { box.classList.remove("open"); btn.classList.remove("active"); openSoc = null; return; }
    document.querySelectorAll(".soc").forEach((x) => x.classList.remove("active"));
    btn.classList.add("active"); openSoc = s;
    box.innerHTML = `<small>${s.name} của mình</small><a href="${s.url}" target="_blank" rel="noopener">${s.url}</a>`;
    box.classList.add("open");
  };
  $("socials").appendChild(btn);
});

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
const cv = $("sky"), ctx = cv.getContext("2d");
let W, H, stars = [], shooters = [], nextShoot = 0;
function resize() {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  stars = Array.from({ length: Math.floor((W * H) / 5500) }, () => ({
    x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5 + 0.3,
    s: Math.random() * 2 + 0.5, p: Math.random() * 6.28,
    c: ["#ffffff", "#bcd2ff", "#ffe9b8"][Math.floor(Math.random() * 3)],
  }));
}
/* ---------- Ban ngày (chế độ sáng): mây, cánh hoa, máy bay giấy ---------- */
let clouds = [], petals = [], planes = [], nextPlane = 0;
const PETAL_COLORS = ["#ffb7d1", "#ffc9de", "#ffd9e8", "#ffa8c8"];
function newPetal(anywhere) {
  return { x: Math.random() * W, y: anywhere ? Math.random() * H : -20, r: 5 + Math.random() * 5, vy: 0.6 + Math.random() * 0.8,
    sw: Math.random() * 6.28, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.04, c: PETAL_COLORS[Math.floor(Math.random() * 4)] };
}
function initDay() {
  clouds = Array.from({ length: 6 }, () => ({ x: Math.random() * W, y: 50 + Math.random() * H * 0.55, s: 0.6 + Math.random() * 1.1, v: 0.15 + Math.random() * 0.25 }));
  petals = Array.from({ length: Math.max(14, Math.floor(W / 60)) }, () => newPetal(true));
}
function drawCloud(c) {
  const b = 60 * c.s;
  ctx.fillStyle = "rgba(255,255,255,.85)";
  ctx.beginPath();
  ctx.arc(c.x, c.y, b * 0.5, 0, 6.28); ctx.arc(c.x + b * 0.5, c.y - b * 0.25, b * 0.6, 0, 6.28);
  ctx.arc(c.x + b * 1.1, c.y, b * 0.5, 0, 6.28); ctx.arc(c.x + b * 0.55, c.y + b * 0.1, b * 0.55, 0, 6.28);
  ctx.fill();
}
function drawDay(t, k) {
  ctx.shadowBlur = 0; ctx.globalAlpha = k;
  const sun = ctx.createRadialGradient(W * 0.85, 0, 0, W * 0.85, 0, W * 0.5);
  sun.addColorStop(0, "rgba(255,230,150,.55)"); sun.addColorStop(1, "rgba(255,230,150,0)");
  ctx.fillStyle = sun; ctx.fillRect(0, 0, W, H);
  for (const c of clouds) { c.x += c.v; if (c.x > W + 150) c.x = -c.s * 150; drawCloud(c); }
  for (let i = 0; i < petals.length; i++) {
    const p = petals[i];
    p.x += Math.sin(t / 1000 + p.sw) * 0.6 + 0.35; p.y += p.vy; p.rot += p.vr;
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
    a.x += 2.2; a.p += 0.03;
    ctx.save(); ctx.translate(a.x, a.y + Math.sin(a.p * 2) * 18); ctx.rotate(Math.sin(a.p * 2) * 0.12);
    ctx.fillStyle = "#fff"; ctx.shadowColor = "rgba(80,100,200,.35)"; ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(-26, -13); ctx.lineTo(-14, 0); ctx.lineTo(-26, 13); ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0; ctx.fillStyle = "#cfd8f5";
    ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(-14, 0); ctx.lineTo(-26, 13); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
}
addEventListener("resize", () => { resize(); initDay(); }); resize(); initDay();
function drawNight(t, k) {
  for (const s of stars) {
    const a = 0.35 + 0.65 * Math.abs(Math.sin(t / 1000 * s.s + s.p));
    ctx.globalAlpha = a * k; ctx.fillStyle = s.c;
    ctx.shadowBlur = s.r * 5; ctx.shadowColor = s.c;
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.28); ctx.fill();
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
    m.x += m.vx; m.y += m.vy; m.life -= 0.006;
  }
  ctx.globalAlpha = 1;
}
/* Hai cảnh (đêm / ngày) cùng chạy, chỉ trộn độ mờ → mọi hiệu ứng không bị dừng khi đổi chế độ */
let mix = null, lastT = 0;
function frame(t) {
  requestAnimationFrame(frame);
  const target = root.dataset.theme === "light" ? 1 : 0;
  if (mix === null) mix = target;
  const dt = Math.min(t - lastT, 50); lastT = t;
  mix += Math.sign(target - mix) * Math.min(Math.abs(target - mix), dt / 1200);
  const e = mix * mix * (3 - 2 * mix);
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
