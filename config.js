// ============================================================
//  ✏️  FILE NÀY LÀ NƠI BẠN SỬA MỌI THỨ — không cần đụng vào code khác
// ============================================================
const CONFIG = {
  // Ảnh đại diện: bỏ ảnh vào thư mục "images" rồi đổi tên ở đây
  avatar: "images/avatar.jpg",

  bio: "Thân không mà ấn vô :v",
  name: "Nguyễn Duy",

  // Sở thích: chữ "I like" cố định, sửa/thêm/bớt các mục bên dưới (mỗi mục 1 màu neon)
  likes: ["music", "game", "coding", "and I just want a peaceful life"],

  // Mạng xã hội: icon là "facebook", "tiktok" hoặc "discord" (logo chuẩn). Bấm vào sẽ hiện đường link
  socials: [
    { name: "Facebook", icon: "facebook", color: "#1877F2", url: "https://facebook.com/ten-cua-ban" },
    { name: "TikTok",   icon: "tiktok", color: "#fe2c55", url: "https://tiktok.com/@ten-cua-ban" },
    { name: "Discord",  icon: "discord", color: "#5865F2", url: "https://discord.com/users/id-cua-ban" },
  ],

  // Màn hình chào: người xem bấm "Vào với nhạc" thì nhạc phát luôn (trình duyệt cần 1 cú bấm mới cho phát nhạc).
  // Đặt enabled: false nếu không muốn có màn hình này.
  welcome: {
    enabled: true,
    hello: "Chào mừng bạn ✨",
    sub: "Trang này có nhạc nền, bạn muốn nghe cùng mình chứ?",
    musicBtn: "♪ Vào với nhạc",
    silentBtn: "Vào im lặng",
  },

  // Nhạc nền: bỏ file mp3 vào thư mục "music" rồi ghi đúng tên vào src (nên đặt tên không dấu, không khoảng trắng)
  music: {
    src: "music/nhac.mp3",
    title: "Tên bài hát",
    artist: "Tên ca sĩ",
    cover: "images/cover.jpg", // ảnh vuông 1:1 làm đĩa nhạc (không dùng thì để "")
    volume: 0.6,               // âm lượng từ 0 đến 1
    loop: true,                // true = hết bài tự phát lại
  },

  // Thông báo trong nút chuông (để [] nếu không muốn có thông báo)
  notifications: [
    { title: "Chào mừng bạn! 👋", text: "Cảm ơn đã ghé thăm trang của mình." },
    { title: "Tìm đồng đội", text: "Mình hay chơi buổi tối, kết bạn rồi rủ nhau nhé." },
  ],

  // Game: "image" là ảnh vuông 1:1 trong thư mục images (đổi đuôi .jpg/.png cho đúng file). Chưa có ảnh thì tự hiện icon.
  // "id" là ID trong game của bạn
  games: [
    { name: "Liên Quân Mobile", type: "MOBA • Mobile",        image: "images/lienquan.jpg", icon: "⚔️", colors: ["#1e6bff", "#00d4ff"], id: "ID-LIEN-QUAN" },
    { name: "Free Fire",        type: "Battle Royale • Mobile", image: "images/freefire.jpg", icon: "🔥", colors: ["#ff7a00", "#ffd000"], id: "ID-FREE-FIRE" },
    { name: "VALORANT",         type: "Tactical Shooter • PC",  image: "images/valorant.jpg", icon: "🎯", colors: ["#ff3b4e", "#ff8a5c"], id: "Ten#0000" },
    { name: "Genshin Impact",   type: "Open World • RPG",       image: "images/genshin.jpg", icon: "✨", colors: ["#7a5cff", "#4de1c1"], id: "UID-GENSHIN" },
  ],
};
