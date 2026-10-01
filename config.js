// ============================================================
//  ✏️  FILE NÀY LÀ NƠI BẠN SỬA MỌI THỨ — không cần đụng vào code khác
// ============================================================
const CONFIG = {
  // Ảnh đại diện: bỏ ảnh vào thư mục "images" rồi đổi tên ở đây
  avatar: "images/avatar.jpg",

  bio: "Ủa ai mà ấn vô đây vậy? 😳",
  name: "Nguyễn Duy",

  // Sở thích: chữ "I like" cố định, sửa/thêm/bớt các mục bên dưới (mỗi mục 1 màu neon)
  likes: ["music", "game", "coding", "and eat...."],

  // Mạng xã hội: icon là "facebook", "tiktok" hoặc "discord" (logo chuẩn). Bấm vào sẽ hiện đường link
  socials: [
    { name: "Facebook", icon: "facebook", color: "#1877F2", url: "https://facebook.com/dragonkendooo" },
    { name: "TikTok",   icon: "tiktok", color: "#fe2c55", url: "https://tiktok.com/@_only.duy" },
    { name: "Discord",  icon: "discord", color: "#5865F2", url: "https://discord.com/users/1541749158015279124" },
  ],

  // Thông báo trong nút chuông (để [] nếu không muốn có thông báo)
  notifications: [
    { title: "Chào mừng bạn! 👋", text: "Cảm ơn đã ghé thăm trang của mình." },
    { title: "Web đang cập nhật thêm", text: "Mình mới tạo website này để giới thiệu bản thân và kiếm thêm bạn bè nhưng trình mình còn kém nên mình sẽ cập nhật thêm website này trong thời gian tới, cảm ơn bạn đã ghé qua đây." },
  ],

  // Game: "image" là ảnh vuông 1:1 trong thư mục images (đổi đuôi .jpg/.png cho đúng file). Chưa có ảnh thì tự hiện icon.
  // "id" là ID trong game của bạn
  games: [
    { name: "Liên Quân Mobile", type: "MOBA • Mobile",        image: "images/lienquan.jpg", icon: "⚔️", colors: ["#1e6bff", "#00d4ff"], id: "ony_nduy." },
    { name: "Free Fire",        type: "Battle Royale • Mobile", image: "images/freefire.jpg", icon: "🔥", colors: ["#ff7a00", "#ffd000"], id: "3758881404" },
    { name: "VALORANT",         type: "Tactical Shooter • PC",  image: "images/valorant.jpg", icon: "🎯", colors: ["#ff3b4e", "#ff8a5c"], id: "원덕두#103" },
    { name: "Genshin Impact",   type: "Open World • RPG",       image: "images/genshin.jpg", icon: "✨", colors: ["#7a5cff", "#4de1c1"], id: "1825172657" },
  ],
};
