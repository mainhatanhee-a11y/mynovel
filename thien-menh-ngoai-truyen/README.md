# Thiên Mệnh Ngoại Truyện ✦ Visual Novel Tu Chân — demo v0.5

> Bạn là **Hệ Thống Bàn Tay Vàng** vừa thức tỉnh, biết toàn bộ nguyên tác 《Kiếm Vấn Trường Sinh》 nhưng không nhớ nhiệm vụ thực sự của mình. Thay vì điều khiển người khác như một game nuôi nhân vật, bạn đồng hành với những ký chủ có mục tiêu và suy nghĩ riêng.

## Chơi online

Trang game (khi GitHub Pages được bật cho nhánh main):

https://mainhatanhee-a11y.github.io/mynovel/thien-menh-ngoai-truyen/

Trang chủ repository chuyển tiếp đến game. Website cũ được giữ nguyên tại ../old-site/ .

## Bản rework 0.4

- **Bỏ hoàn toàn chuyển ngày / bấm để nuôi ký chủ.** Chuyện tiến lên qua những hành động mà ký chủ tự khởi xướng.
- **Mở màn có nhịp chậm:** hệ thống thức tỉnh → nhớ về ký chủ và nhiệm vụ dang dở → học cách lập khế ước → khám phá thế giới diễn sinh từ tiểu thuyết → quan sát Thiên Mệnh Chi Tử → chọn ứng viên.
- **Chỉ chọn một trong ba ký chủ ban đầu.** Hệ thống mở khả năng liên kết thứ hai sau một cột mốc của tuyến nhân vật đầu. Có thể từ chối ký thêm người.
- **Ba tuyến mở đầu khác nhau:** Liễu Thanh Hòa tự đi tìm hồ sơ gia tộc; Mặc Từ tự đào tẩu khỏi ma môn; Tạ Vấn Sơn tự điều tra tấm bia ghi tên bị mất.
- **Đối thoại có người nói rõ ràng.** Các lựa chọn được hiển thị là câu hệ thống thực sự phát biểu; ký chủ có thể phản đối hoặc làm điều khác với lời khuyên.
- **Phân nhánh và giao thoa:** tổ hợp Liễu+Mặc, Liễu+Tạ, Mặc+Tạ có sự kiện chạm mặt riêng và lựa chọn có tiết lộ chuyện nhiều khế ước không.
- **Giao diện cinematic chibi:** nhân vật SVG tự vẽ với biểu cảm, mái tóc, trang sức, trang phục; 12 phông cảnh SVG gốc, ánh đèn và hạt sáng. Không dùng hình ảnh của game khác.
- **Màu thoại rõ ràng:** lời Hệ Thống màu xanh ngọc, ký ức màu tím, lời dẫn màu xám tím, các ký chủ có màu tên riêng.
- **Lưu tự động** bằng localStorage, thư viện trích lục nguyên tác và nhật ký hội thoại.
- **Responsive**, có bàn phím Space/Enter để đọc tiếp, 1–4 để chọn lời đáp khi hiện các lựa chọn.

## File

- index.html: khung visual novel
- styles.css: giao diện pastel fantasy, bố cục điện ảnh, responsive
- visuals.js: nhân vật chibi SVG theo biểu cảm và các cảnh nền SVG tự tạo
- story.js: kịch bản theo sự kiện, ba tuyến và những nhánh giao thoa
- app.js: visual novel engine, state machine, các lựa chọn, localStorage và nhật ký

## Giới hạn của demo

Đây là chương mở đầu và các tuyến nhân vật mẫu, **chưa phải game hoàn chỉnh**. Thư viện nguyên tác chứa các trích lục cốt truyện (trong thế giới hư cấu hệ thống có đủ 1.286 chương); toàn bộ 1.286 chương chưa được viết. Đồ họa là SVG vẽ bằng code, chưa phải sprite sheet pixel art thủ công. Không có AI chat tự do, hệ thống chiến đấu hoặc cơ chế nuôi chỉ số.

Bản v0.4 sử dụng khóa lưu tiến trình mới để không xung đột với các lần thử v0.1/v0.2. Tiến trình cũ không bị xóa nhưng không được nạp vào bản mới.

## Chạy cục bộ

Mở index.html bằng trình duyệt hiện đại; hoặc dùng một static server trong thư mục này, ví dụ python3 -m http.server 8000, rồi mở http://localhost:8000.

## Kịch bản & mở rộng

Mỗi cảnh trong story.js có ID, location/background, danh sách lines và choices. Ký chủ không đợi hệ thống giao nhiệm vụ; hành động của họ tạo ra các nút chuyện tiếp theo. Các ảnh SVG đều là thành phần code tự vẽ để dễ thay bằng sprite sheets sau này.

Đây là bản nháp để tiếp tục chỉnh nội dung cùng người chơi.

## Tích hợp hình ảnh v0.5

- `assets/backgrounds/*.webp`: 12 phông nền đẹp đã duyệt, không chứa nhân vật; engine dùng đúng scene key (`void`, `stars`, `clouds`, `sect`, `archive`, `garden`, `market`, `inn`, `forest`, `tower`, `library`, `night`).
- `assets/characters/*.webp`: Liễu Thanh Hòa (hai búi tóc), Mặc Từ, Tạ Vấn Sơn, ảnh nguyên bản đã xử lý alpha trong suốt, không hòa vào nền.
- `visuals.js` cung cấp ảnh bằng thẻ `<img>`; `app.js` đặt background riêng và nhân vật ở `characterLayer` (phía trước, hộp thoại phía trên).
- Lưu ý hiện ba nhân vật dùng **một pose chuẩn**; phần code vẫn nhớ trạng thái cảm xúc của thoại, nhưng biểu cảm đổi hình toàn phần cần thêm những ảnh được cắt thành frame riêng, không nên tưởng đã có đầy đủ pose.
