# Thiên Mệnh Ngoại Truyện — visual novel tu chân (bản thử nghiệm 0.2)

Web visual novel bằng HTML, CSS, JavaScript thuần, không cần build hay server. Người chơi là Hệ Thống Bàn Tay Vàng, tỉnh dậy và bắt đầu nhớ lại một nhiệm vụ đã bị niêm phong, trước khi được giới thiệu Thương Huyền Giới — thế giới diễn sinh từ tiểu thuyết 《Kiếm Vấn Trường Sinh》.

## Chạy game

- Mở file index.html trên trình duyệt hiện đại, hoặc chạy một static server trong thư mục này: python3 -m http.server 8000, rồi vào http://localhost:8000.
- Trên GitHub Pages, nếu repo mynovel đang publish từ nhánh main, thư mục / (root), đường dẫn sẽ là: https://mainhatanhee-a11y.github.io/mynovel/thien-menh-ngoai-truyen/
- Nếu Pages chưa bật, mở Settings → Pages → Build and deployment → Deploy from a branch → main / (root). Việc bật Pages không thể thực hiện qua connector hiện tại.
- Không cần API key, cơ sở dữ liệu hay đăng nhập. Game tự lưu vào localStorage của trình duyệt hiện tại.

## Nội dung bản demo

1. Mở màn mới: thức tỉnh → ký ức về nhiệm vụ trở lại từng mảnh → nhiệm vụ cấp cao bị niêm phong → giới thiệu thế giới, nguyên tác và Thiên Mệnh Chi Tử → hướng dẫn ký khế ước.
2. Ba ứng viên: Liễu Thanh Hòa, Mặc Từ, Tạ Vấn Sơn. Mỗi người có màn gặp gỡ, 3 lựa chọn lời đáp và đoạn ký khế ước riêng.
3. Ban đầu chỉ được chọn một trong ba ký chủ. Khi ký ức khôi phục ở ngày thứ tư, hệ thống mới mở khóa ô khế ước thứ hai. Bảng chỉ số ẩn sau nút Hệ thống; tập trung vào khung hình và hội thoại.
4. Thế giới chung: từng ngày đi tới Đại Hội Vấn Đạo; nếu ký Liễu Thanh Hòa và Mặc Từ sau khi mở khóa quyền hạn, sẽ gặp sự kiện hai người phát hiện khế ước chung vào ngày thứ sáu hoặc bảy.
5. Phân nhánh thử nghiệm: lựa chọn cứu, cảnh báo hoặc đứng ngoài tử kiếp của Mặc Từ; kết quả được ghi trong thư viện nguyên tác.
6. Nhật ký và lưu tiến trình: có thể xem lại hội thoại, lưu thủ công hoặc tiếp tục ngay khi tải lại trang.

## Điều khiển

- Click vùng thoại, bấm Tiếp, Space hoặc Enter để hiển thị/tiếp tục.
- Bấm 1 / 2 / 3 để chọn một trong ba lựa chọn trong những màn tương thích.
- Nguyên tác đọc trích lục và so sánh biến cố; Nhật ký xem lại hội thoại; Lưu lưu thủ công.
- Chọn chân dung ở bảng bên phải để chuyển ký chủ (ngoài đoạn thoại đang chạy).
- Nút nhạc bật tiếng bíp giao diện nhỏ, không có bản nhạc có bản quyền.

## Cấu trúc

- index.html: bố cục responsive và khung visual novel.
- styles.css: giao diện hệ thống màu tối, cảnh nền SVG phong cách pixel, layout mobile.
- story.js: toàn bộ văn bản mở màn, ký chủ, lựa chọn, sự kiện ngày và trích lục nguyên tác.
- app.js: trình xử lý hội thoại, lựa chọn, tài nguyên, nhiều ký chủ, sự kiện và lưu tiến trình.

## Giới hạn của prototype

Đây là bản demo có thể chơi, chưa phải game hoàn chỉnh. Chưa có toàn văn 1.286 chương tiểu thuyết, chỉ có trích lục phục vụ demo; chương tiếp theo sau Đại Hội chưa được viết. Nền và chân dung vẫn là đồ họa SVG dạng pixel tự vẽ bằng code, sẽ được thay bằng sprite/background pixel art chi tiết ở bản sau. Các hệ thống tu luyện, cửa hàng, nhiệm vụ, định tuyến cốt truyện và cân bằng chiến đấu cần mở rộng.

Nội dung hư cấu và minh họa của prototype là bản thảo, có thể chỉnh trực tiếp tại story.js.
ver 0.2

## Cập nhật giao diện 0.2

- Bố cục cinematic: thoại và cảnh chiếm trọng tâm, bảng thông số ẩn dưới nút Hệ thống.
- Lời thoại Hệ Thống có nền xanh ngọc và chữ sáng riêng, ký ức màu tím, dẫn truyện màu xanh xám, nhân vật màu vàng ngà.
- Hệ thống thực sự phát biểu lời người chơi đã chọn trước khi ký chủ trả lời.
- Vì thay đổi cấu trúc khế ước, bản 0.2 dùng vùng lưu tiến trình mới. Bản lưu 0.1 không bị xóa nhưng sẽ không được nạp vào v0.2.
