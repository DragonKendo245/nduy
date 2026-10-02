// ============================================================
//  ✏️  FILE NÀY LÀ NƠI BẠN SỬA MỌI THỨ — không cần đụng vào code khác
// ============================================================
const CONFIG = {
  // Ảnh đại diện: bỏ ảnh vào thư mục "images" rồi đổi tên ở đây
  avatar: "images/avatar.jpg",

  bio: "Cơn gió nào đưa bạn tới đây vậy",
  name: "Nguyễn Duy",

  // Sở thích: chữ "I like" cố định, sửa/thêm/bớt các mục bên dưới (mỗi mục 1 màu neon)
  likes: ["music", "game", "coding", "and design"],

  // Mạng xã hội: icon là "facebook", "tiktok" hoặc "discord" (logo chuẩn). Bấm vào sẽ hiện đường link
  socials: [
    { name: "Facebook", icon: "facebook", color: "#1877F2", url: "https://facebook.com/dragonkendooo" },
    { name: "TikTok",   icon: "tiktok", color: "#fe2c55", url: "https://tiktok.com/@_only.duy" },
    { name: "Discord",  icon: "discord", color: "#5865F2", url: "https://discord.com/users/1541749158015279124" },
  ],

  // Màn hình chào: người xem bấm "Vào với nhạc" thì nhạc phát luôn (trình duyệt cần 1 cú bấm mới cho phát nhạc).
  // Đặt enabled: false nếu không muốn có màn hình này.
  welcome: {
    enabled: true,
    hello: "Chào mừng bạn ✨",
    sub: "Trang này có nhạc nền, nghe cùng mình nhé.",
    musicBtn: "♪ Vào với nhạc",
    silentBtn: "Vào im lặng",
  },

  // Nhạc nền: bỏ file mp3 vào thư mục "music" rồi ghi đúng tên vào src (nên đặt tên không dấu, không khoảng trắng)
  music: {
    src: "music/nhac.mp3",
    title: "turn to letters ᡣ𐭩.ᐟ.ᐟ w/ entri (rewind)",
    artist: "vesta, entri",
    cover: "images/cover.jpg", // ảnh vuông 1:1 làm đĩa nhạc (không dùng thì để "")
    volume: 0.6,               // âm lượng từ 0 đến 1
    loop: true,                // true = hết bài tự phát lại
  },

  // Thông báo trong nút chuông (để [] nếu không muốn có thông báo)
  notifications: [
    { title: "Chào mừng bạn! 👋", text: "Cảm ơn đã ghé thăm trang của mình." },
    { title: "Trang đang cập nhật", text: "Mình mới tạo trang này để mọi người hiểu thêm về mình nhưng trình mình kém nên mình sẽ còn cập nhật thêm trong thời gian tới, cảm ơn bạn đã ghé qua." },
  ],

  // Game: "image" là ảnh vuông 1:1 trong thư mục images (đổi đuôi .jpg/.png cho đúng file). Chưa có ảnh thì tự hiện icon.
  // "id" là ID trong game của bạn
  games: [
    { name: "Liên Quân Mobile", type: "MOBA • Mobile",        image: "images/lienquan.jpg", icon: "⚔️", colors: ["#1e6bff", "#00d4ff"], id: "only_nduy." },
    { name: "Free Fire",        type: "Battle Royale • Mobile", image: "images/freefire.jpg", icon: "🔥", colors: ["#ff7a00", "#ffd000"], id: "3758881404" },
    { name: "VALORANT",         type: "Tactical Shooter • PC",  image: "images/valorant.jpg", icon: "🎯", colors: ["#ff3b4e", "#ff8a5c"], id: "원덕두#103" },
    { name: "Genshin Impact",   type: "Open World • RPG",       image: "images/genshin.jpg", icon: "✨", colors: ["#7a5cff", "#4de1c1"], id: "1825172657" },
  ],
};
