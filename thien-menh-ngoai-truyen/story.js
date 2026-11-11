/* Thiên Mệnh Ngoại Truyện v0.4 — kịch bản visual novel theo sự kiện.
   Không có đồng hồ/ngày; hành động và đối thoại của ký chủ quyết định dòng truyện. */
(function(){
const n={};
const node=(id,scene,lines,next,extra={})=>n[id]={scene,lines,next:extra.choices?null:next,...extra};
const say=(who,text,expression)=>({who,text,expression});
const N=(text)=>say("narrator",text);
const M=(text)=>say("memory",text);
const S=(text)=>say("system",text);
const I=(text)=>say("interface",text);
const L=(text,expression)=>say("lieu",text,expression);
const K=(text,expression)=>say("mac",text,expression);
const T=(text,expression)=>say("ta",text,expression);
const D=(text,expression)=>say("luc",text,expression);
const choice=(label,next,effect)=>({label,next,effect:effect||{}});
const hosts={
  lieu:{name:"Liễu Thanh Hòa",title:"Tạp dịch Thanh Vân Tông",realm:"Luyện Khí tầng hai",accent:"#f0b9c7",mark:"Hồ sơ không có kết cục",intro:"Nàng nhận một lá thư chỉ có bốn chữ: ĐỪNG TÌM NỮA.",desc:"Nhỏ nhẹ, quan sát tinh tế, cứng đầu theo cách rất bình tĩnh. Đang tìm tung tích gia tộc biến mất.",orig:"Trong nguyên tác chỉ xuất hiện ở chương 12, sau đó không còn được nhắc tới."},
  mac:{name:"Mặc Từ",title:"Ma tu Huyết Vụ Cốc",realm:"Trúc Cơ hậu kỳ",accent:"#d9b4f5",mark:"Chương 136 — tử kiếp",intro:"Hắn đang gói đồ chạy trốn khỏi môn phái vì từ chối một vụ ám sát.",desc:"Miệng độc, tỉnh táo, rất biết tính toán. Hắn muốn sống qua hôm nay trước khi bàn đến chuyện phi thăng.",orig:"Theo nguyên tác, chết dưới kiếm Lục Chiêu Dã tại Đại Hội Vấn Đạo."},
  ta:{name:"Tạ Vấn Sơn",title:"Trưởng lão Vấn Sơn Phong",realm:"Hóa Thần sơ kỳ",accent:"#e8d49b",mark:"Hy sinh trong chính ma đại chiến",intro:"Ông phát hiện một trang sách ghi tên một người mà không ai còn nhớ.",desc:"Điềm nhiên, thích uống trà, sắc bén hơn vẻ ngoài. Ông không cần phần thưởng nhỏ; ông muốn một lời giải.",orig:"Theo nguyên tác, tử trận để bảo vệ đệ tử Thanh Vân Tông."},
  luc:{name:"Lục Chiêu Dã",title:"Thiên Mệnh Chi Tử",realm:"Ngoại môn Thanh Vân Tông",accent:"#b7d2f5",mark:"Kết cục nguyên tác — phi thăng",intro:"Một thiếu niên đang luyện thức kiếm thứ mười bảy.",desc:"Kiếm tu trẻ có khí vận rất mạnh, không phải phản diện. Hiện chưa thể ký khế ước.",orig:"Nhân vật chính 《Kiếm Vấn Trường Sinh》, hoàn tất tiên lộ ở chương 1286."}
};
node("boot","void",[
 N("Trước khi có hình dạng, trước cả âm thanh, có một lời nhắc vẫn còn sót lại trong ngươi."),
 M("“...Tìm người thích hợp.”"),
 M("“...Đừng buộc họ phải đi con đường ngươi chọn.”"),
 N("Lời nhắc đứt ngang. Ngươi thử cử động — nhưng chẳng có tay chân nào để cử động. Thứ duy nhất còn hoạt động là ý thức."),
 M("“...Hãy nhớ lấy tên của họ.”"),
 N("Một cảm giác quen thuộc bỗng trở về: ngươi từng có một nhiệm vụ. Ngươi không nhớ ai đã giao nó."),
], "awaken");
node("awaken","void",[
 N("Ký ức tiếp theo hiện ra như những mảnh gương tự tìm về vị trí của mình."),
 M("Khế ước. Ký chủ. Cơ duyên."),
 M("Một hệ thống có thể trao vật phẩm, chia sẻ tri thức và trò chuyện với người mình ký khế ước."),
 N("Phải rồi. Ngươi là Hệ Thống Bàn Tay Vàng. Không phải một vị thần, cũng chưa phải một con người."),
 S("Ta nhớ chức năng của mình... nhưng nhiệm vụ cuối cùng thì không."),
 I("Ký ức nhiệm vụ gốc: NIÊM PHONG. Các quyền hạn sơ cấp đã khôi phục."),
],"learn");
node("learn","void",[
 N("Ngươi thử chạm vào vùng ký ức còn nguyên vẹn. Ba câu hỏi tự hiện lên."),
],"learn_choices",{choices:[
 choice("Ta có thể làm gì với một ký chủ?","learn_contract"),
 choice("Vì sao ta mất ký ức?","learn_memory"),
 choice("Trước hết hãy cho ta biết mình đang ở đâu.","world_open")
]});
node("learn_contract","void",[
 S("Khế ước phải được đồng ý. Ta có thể giúp, cảnh báo, giao nhiệm vụ... nhưng không thể thay họ lựa chọn."),
 N("Một ý niệm nhỏ sáng lên: quyền hạn đầu tiên chỉ đủ duy trì một khế ước. Những người khác vẫn có thể sống ngoài tầm mắt ngươi."),
 I("QUYỀN HẠN: 01 KÝ CHỦ. Liên kết tiếp theo chưa khả dụng."),
],"world_open");
node("learn_memory","void",[
 M("Một cánh cửa khép kín. Phía sau có tiếng ai đó gọi một cái tên, nhưng ngươi không thể nghe rõ."),
 N("Ngươi thử mở cánh cửa. Không có khóa nào để tra vào; chỉ còn một câu lệnh xa lạ."),
 I("NHIỆM VỤ ẨN: ◇◇◇◇◇. Điều kiện giải phong chưa xác định."),
 S("Không sao. Trước tiên, ta phải tìm hiểu thế giới này."),
],"world_open");
node("world_open","stars",[
 N("Một khe sáng mở ra. Ngươi nhìn thấy núi non phủ mây, những mái ngói xanh rêu, một con phố bán phù lục và vô số người ngự kiếm đi qua."),
 N("Không ai ở đó biết đang có một ý thức vừa mở mắt nhìn xuống cuộc đời họ."),
 I("Thế giới: THƯƠNG HUYỀN GIỚI · Phương thức diễn sinh: TIỂU THUYẾT TU CHÂN."),
 N("Cái tên 《Kiếm Vấn Trường Sinh》 chạm tới ngươi. Cùng lúc, toàn bộ nội dung cuốn tiểu thuyết trở thành ký ức có thể tra cứu."),
 S("Một cuốn sách... và cả một thế giới sống bên trong nó?"),
 N("Ngươi biết chuyện sẽ xảy ra trong nguyên tác. Nhưng những ngày tháng tác giả không viết tới vẫn tồn tại, với đủ vui buồn và bí mật."),
],"world_choice",{choices:[
 choice("Mở thử một trang nguyên tác.","world_book"),
 choice("Quan sát một người đang sống trong thế giới này.","world_luc")
]});
node("world_book","library",[
 N("Những trang sách tự lật. Có người đoạt được tiên kiếm; có người sống sót qua thiên kiếp; có người chết chỉ trong hai dòng chữ."),
 I("《Kiếm Vấn Trường Sinh》 — 1.286 chương · Bản ghi nguyên tác: ĐẦY ĐỦ."),
 N("Ở chương cuối, Lục Chiêu Dã phi thăng. Nhưng khi ngươi thử tìm số phận của những người không được nhắc tên, trang sách vẫn im lặng."),
 S("Ta biết tác giả đã viết gì. Nhưng ta chưa biết mọi chuyện đang xảy ra."),
],"world_luc");
node("world_luc","sect",[
 N("Một thiếu niên áo trắng đang luyện kiếm trong sân Thanh Vân Tông. Hắn tập lại một chiêu đã thất bại rất nhiều lần."),
 D("Lần thứ mười tám... vẫn hơi lệch.", "focused"),
 N("Hắn nhặt kiếm gỗ lên, cảm tạ vị sư huynh đứng gần đó, rồi luyện lại. Không có bảo vật xuất thế. Chưa có hào quang nào trên vai hắn."),
 I("LỤC CHIÊU DÃ · Thiên Mệnh Chi Tử · Kết cục nguyên tác: PHI THĂNG."),
 S("Ta nhận ra ngươi. Nhưng khế ước Thiên Mệnh chưa được mở. Có lẽ trước mắt ta nên tìm một người khác."),
],"pre_select");
node("pre_select","clouds",[
 N("Ngươi mở quyền hạn dò tìm ký chủ. Thay vì những con số khô khan, ba góc đời sống xuất hiện như ba cửa sổ nhỏ."),
 N("Một cô gái giấu lá thư trong tay áo. Một ma tu đang vạch đường trốn. Một trưởng lão đặt chén trà xuống để đọc lại một trang giấy."),
 I("Ba đối tượng tương thích. Chỉ có thể bắt đầu với một người."),
 S("Ta sẽ không chọn hộ ai cách sống. Nhưng có lẽ... ta có thể đồng hành cùng một người."),
],"select");
node("select","clouds",[],"select",{special:"select"});

/* LIỄU THANH HÒA — người tự tìm tên gia tộc */
node("li_start","archive",[
 N("Một mùi giấy cũ và thuốc phơi thấm khắp kho hồ sơ Thanh Vân Tông."),
 L("“Đừng tìm nữa.” Bốn chữ này mà cũng đáng gọi là thư sao...", "annoyed"),
 N("Liễu Thanh Hòa gấp lá thư bỏ vào tay áo. Trước khi hệ thống xuất hiện, nàng đã lấy sẵn chìa khóa đồng và chép lại lịch đổi ca của thủ thư."),
 L("Nếu lời đe dọa này có thật, người gửi chắc chắn biết hồ sơ nhà ta ở đâu.", "focused"),
 N("Nàng chờ người canh kho đi qua, rồi tự mở cửa. Ngươi thử gửi một lời chào vào thức hải."),
],"li_hello",{choices:[
 choice("“Ta là một hệ thống. Ta muốn giúp ngươi.”","li_hello_truth",{trust:{lieu:1},flags:["li_honest"]}),
 choice("“Hồ sơ kệ bên trái đã bị thay. Cẩn thận.”","li_hello_warn",{flags:["li_cautious"]}),
 choice("“Đột nhập kho sách? Gan cũng lớn đấy.”","li_hello_tease")
]});
node("li_hello_truth","archive",[
 S("Ta là một hệ thống. Ta muốn giúp ngươi."),
 L("Một giọng nói trong đầu?", "startled"),
 N("Nàng rút cây trâm khỏi tóc, cầm như một vũ khí ngắn. Nhưng không kêu cứu."),
 L("Ngươi có ý đồ gì? Nếu định đoạt xá, ta khuyên ngươi chọn người có linh căn tốt hơn.", "wary"),
],"li_probe");
node("li_hello_warn","archive",[
 S("Hồ sơ kệ bên trái đã bị thay. Cẩn thận."),
 L("...Ai vừa nói?", "startled"),
 N("Nàng không quay đầu mà nhìn vào lớp bụi trên gáy sổ: một dấu tay mới còn rất rõ."),
 L("Ngươi biết nơi này? Vậy trước tiên, đừng làm ồn.", "focused"),
],"li_probe");
node("li_hello_tease","archive",[
 S("Đột nhập kho sách? Gan cũng lớn đấy."),
 L("Nếu ngươi là người canh kho thì cứ bắt ta. Đừng chơi trò truyền âm dọa người.", "annoyed"),
 N("Nàng vẫn tiếp tục kéo ngăn tủ. Ngươi nhận ra: những câu nói mơ hồ sẽ không khiến nàng thay đổi kế hoạch."),
],"li_probe");
node("li_probe","archive",[
 N("Ngón tay nàng dừng ở một ô hồ sơ trống. Trên bảng gỗ còn vết mực cũ: “Liễu...”."),
 L("Có người cố xóa tên gia tộc ta. Ngươi biết chuyện này không?", "sad"),
 N("Ngươi lục lại toàn bộ nguyên tác. Liễu Thanh Hòa chỉ được nhắc đến một lần với thân phận tạp dịch. Chuyện gia đình nàng không có trong sách."),
],"li_probe_choice",{choices:[
 choice("Nói thật: “Trong những ghi chép ta có, không nhắc đến gia tộc ngươi.”","li_honest",{trust:{lieu:2},flags:["li_truth"]}),
 choice("Khuyên nàng đem trang giấy ra trước, rồi tra tiếp.","li_page",{trust:{lieu:1}}),
 choice("Bảo nàng bỏ cuộc vì nguy hiểm.","li_stop")
]});
node("li_honest","archive",[
 S("Ta có một bản ghi về thế giới này, nhưng trong đó không nhắc đến gia tộc ngươi. Ta chưa biết câu trả lời."),
 L("Vậy ngươi cũng có chuyện không biết.", "thoughtful"),
 L("Tốt. Ít nhất ta không cần đề phòng một kẻ lúc nào cũng tỏ ra toàn năng.", "soft"),
],"li_movement");
node("li_page","archive",[
 S("Đừng cố mở ngăn tủ nữa. Có người sắp trở lại. Ngươi hãy lấy bản sao kẹp dưới đáy trước."),
 L("Ta cũng nghĩ thế.", "focused"),
 N("Nàng đã giấu một tờ giấy trắng có chữ nổi vào tay áo trước khi ngươi nhắc. Kế hoạch của nàng đi trước lời khuyên nửa bước."),
],"li_movement");
node("li_stop","archive",[
 S("Nguy hiểm quá. Ta nghĩ ngươi nên bỏ cuộc."),
 L("Ngươi chưa biết gì về ta mà đã bảo ta bỏ cuộc sao?", "annoyed"),
 N("Không chờ trả lời, nàng cất trang giấy vào tay áo và trèo qua cửa sổ nhỏ phía sau."),
],"li_movement");
node("li_movement","garden",[
 N("Nàng thoát khỏi kho hồ sơ, men theo bức tường đá phủ rêu. Xa xa, tiếng bước chân người canh kho vọng lại."),
 L("Ngươi theo ta đến tận đây để làm gì?", "wary"),
 S("Ta muốn đề nghị một khế ước. Không phải để ra lệnh cho ngươi; ta có thể giúp ngươi tìm đường, tra cứu thông tin và bảo vệ bản ghi."),
 L("Ta không bán tự do của mình để đổi lấy cơ duyên đâu.", "focused"),
 N("Nàng ngẫm nghĩ một lúc, rồi chính nàng đặt ra điều kiện."),
 L("Nếu ta đồng ý thử, ngươi không được giấu việc mình không biết. Cũng không được tự quyết định thay ta.", "soft"),
],"li_contract_choice",{choices:[
 choice("“Được. Ta sẽ nói rõ giới hạn của mình.”","li_contract_yes",{trust:{lieu:2},flags:["li_pact_care"]}),
 choice("“Ta có thể giúp, nhưng không hứa sẽ luôn nói điều ngươi muốn nghe.”","li_contract_frank",{trust:{lieu:1}}),
 choice("“Nếu không tin, ngươi cứ điều tra thêm rồi quyết định.”","li_contract_wait",{trust:{lieu:1},flags:["li_patient"]})
]});
node("li_contract_yes","garden",[
 S("Được. Ta sẽ nói rõ giới hạn của mình."),
 L("Vậy... ta có thể thử. Trước mắt, chỉ tới khi tìm được người gửi lá thư.", "soft"),
],"li_pact");
node("li_contract_frank","garden",[
 S("Ta có thể giúp, nhưng không hứa sẽ luôn nói điều ngươi muốn nghe."),
 L("Ta cũng không cần ai dỗ dành. Chỉ cần ngươi đừng giấu sự thật vì cho rằng ta quá yếu.", "focused"),
],"li_pact");
node("li_contract_wait","garden",[
 S("Nếu không tin, ngươi cứ điều tra thêm rồi quyết định."),
 N("Liễu Thanh Hòa không trả lời. Nàng mở tờ giấy lấy được và hơ dưới ngọn đèn lồng. Một hàng chữ mảnh hiện lên."),
 L("Được. Ngươi đã không cố ép ta. Ta muốn thử, với điều kiện ta được phép hủy khế ước.", "soft"),
],"li_pact");
node("li_pact","garden",[
 N("Liễu Thanh Hòa đặt hai ngón tay lên mảnh giấy. Lời đồng ý của nàng rõ ràng đến mức ngươi cảm nhận được một sợi liên kết rất mảnh nối hai ý thức."),
 I("Khế ước được hình thành. Ký chủ: LIỄU THANH HÒA."),
 L("Hệ thống, ngươi nghe rõ ta chứ? ...Thật kỳ lạ. Cảm giác như trong đầu có thêm một người hàng xóm.", "smile"),
 S("Ta nghe rõ. Giờ ngươi định làm gì?"),
 L("Đi ăn tối trước. Nếu đói ngất trước khi tìm được người nhà, có hệ thống cũng vô ích.", "smile"),
],"li_episode",{effect:{contract:"lieu"}});
node("li_episode","market",[
 N("Nàng tự tìm đến một tiệm mì nhỏ dưới chân núi, ăn sạch một bát mì rồi đặt mảnh giấy vừa lấy được trước mặt."),
 L("Ta nghĩ người gửi thư là thủ thư cũ. Nhưng lão đã biến mất ba năm trước.", "focused"),
 N("Bên mép giấy nổi lên ba chữ chỉ nhìn thấy dưới ánh đèn dầu: “Vạn Danh Bia”."),
 L("Ngày mai ta sẽ gặp con gái ông ấy. Nàng ở phường thị gần đây.", "focused"),
 N("Không có yêu cầu nào dành cho hệ thống. Nàng đã quyết định trước khi ngẩng lên hỏi."),
 L("Ngươi có biết Vạn Danh Bia là thứ gì không? Ta cần một ý kiến, không phải một mệnh lệnh.", "soft"),
],"li_episode_choice",{choices:[
 choice("Tra nguyên tác và chia sẻ chính xác những gì có trong sách.","li_share",{trust:{lieu:2},flags:["li_shared_book"]}),
 choice("Cảnh báo đây có thể là một cái bẫy; khuyên nàng chuẩn bị đường lui.","li_caution",{flags:["li_prepared"]}),
 choice("Để nàng tự quyết, chỉ hứa sẽ nghe nếu cần.","li_autonomy",{trust:{lieu:1},flags:["li_space"]})
]});
node("li_share","market",[
 S("Trong nguyên tác, Vạn Danh Bia là di vật dùng trong một trận pháp cổ. Nhưng sách không ghi ai đã khắc những cái tên đầu tiên."),
 L("Vậy thì cuốn sách ấy giống một bản đồ thiếu đường nhỏ.", "thoughtful"),
 L("Ta vẫn sẽ gặp người kia. Có lẽ đường nhỏ lại quan trọng hơn đại lộ.", "smile"),
],"li_ending");
node("li_caution","market",[
 S("Có thể là bẫy. Ngươi nên chuẩn bị đường lui trước khi đến gặp cô ấy."),
 L("Ta đã nhờ sư tỷ trông hộ một bức thư. Nếu ta không về, nàng sẽ đi tìm.", "focused"),
 L("Nhưng lời ngươi nhắc cũng có ích. Ta sẽ chuẩn bị thêm một lá phù thoát thân.", "soft"),
],"li_ending");
node("li_autonomy","market",[
 S("Đó là chuyện của ngươi. Nếu cần, ta sẽ lắng nghe."),
 L("Cảm ơn. Chuyện này... ta muốn tự tay tìm ra.", "smile"),
 N("Nàng cẩn thận gấp tờ giấy lại, rồi lấy một chiếc bánh hạt sen đặt cạnh đèn."),
 L("Ngươi có ăn được không? ...À, quên mất.", "blush"),
],"li_ending");
node("li_ending","garden",[
 N("Sáng hôm sau, không đợi hệ thống giao nhiệm vụ, Liễu Thanh Hòa đã rời Thanh Vân Tông bằng cổng phụ."),
 L("Ta đi đây. Có lẽ tối mới về. Ngươi không cần đi cùng từng bước.", "smile"),
 N("Nàng không xin phép. Chỉ báo để ngươi khỏi bất ngờ."),
 M("“...Có một người tự lựa chọn con đường của mình.”"),
 I("Ký ức nhiệm vụ gốc: phát hiện phản ứng mới. Một mảnh liên kết khác đã sáng lên."),
],"$after_arc",{effect:{flag:"li_arc_done",unlockSecond:true}});

/* MẶC TỪ — tự đào tẩu, thử sự hữu ích của hệ thống */
node("ma_start","inn",[
 N("Bốn ngọn đèn dầu cháy trong căn phòng trọ. Mặc Từ xếp ba lá phù, một bản đồ và hai đồng tiền vào một túi vải đã sờn."),
 K("Cổng Tây có trận pháp, cổng Nam có người của trưởng lão. Nếu là ta, ta cũng chẳng canh cổng Bắc.", "thinking"),
 N("Hắn mở toang cửa sổ, thả một con hạc giấy ra ngoài. Từ trước khi ngươi nhìn tới, hắn đã quyết định rời khỏi Huyết Vụ Cốc."),
 K("Giết một người chỉ vì lệnh của tông môn? Ta không nhận vụ này.", "serious"),
 N("Ngươi thử kết nối tới thức hải của hắn. Một bàn tay vàng bước vào đúng lúc ma tu đang tính đường chạy."),
],"ma_hello",{choices:[
 choice("Giới thiệu mình là hệ thống và đề nghị giúp đỡ.","ma_hello_truth",{flags:["ma_introduced"]}),
 choice("Cảnh báo: Cổng Bắc cũng có người chờ.","ma_hello_warn",{flags:["ma_warned"]}),
 choice("Trêu hắn về con chó canh cổng.","ma_hello_tease")
]});
node("ma_hello_truth","inn",[
 S("Ta là một hệ thống. Có muốn nhận sự giúp đỡ của ta không?"),
 K("Nếu là tà tu định đoạt xá, xếp hàng phía sau. Hôm nay ta bận.", "annoyed"),
 K("Còn nếu ngươi là cơ duyên thật thì nói một câu có ích xem.", "thinking"),
],"ma_escape");
node("ma_hello_warn","inn",[
 S("Cổng Bắc cũng có người chờ. Ta thấy kế hoạch ấy không an toàn."),
 K("Ồ? Ngươi đọc bản đồ của ta bằng mắt nào vậy?", "surprised"),
 N("Hắn vẫn không bỏ hành lý. Chỉ lặng lẽ gạch thêm một dấu trên đường đi."),
],"ma_escape");
node("ma_hello_tease","inn",[
 S("Ngươi đã tính tới con chó của lão Lưu chưa?"),
 K("...Ta ghét nhất những kẻ có thể nghe lén mà không hiện mặt.", "annoyed"),
 N("Hắn lấy một mảnh gương phá huyễn soi quanh phòng. Không có ai."),
 K("Cứ nói đi. Ít nhất ngươi cũng có khiếu chọc tức người khác.", "smirk"),
],"ma_escape");
node("ma_escape","forest",[
 N("Giữa đêm, một đoàn xe chở thuốc đi ngang đường núi. Mặc Từ đổi áo, trả tiền cho người đánh xe và ngồi lọt giữa các sọt dược liệu."),
 K("Ngươi nghĩ ta sẽ ngồi đây chờ một kẻ trong đầu chỉ đường à? Không đâu. Đây là kế hoạch B từ hôm qua.", "smirk"),
 N("Phía trước, ánh đuốc của đội tuần tra chiếu lên đám lá ướt. Người đánh xe chợt khựng dây cương."),
 K("Có ba người. Ta có thể đánh được, nhưng sẽ gây động tĩnh. Ngươi có cách nào kín đáo hơn không?", "focused"),
],"ma_escape_choice",{choices:[
 choice("Nhắc về khe đá dưới chân cầu, từng xuất hiện trong nguyên tác.","ma_bridge",{trust:{mac:2},flags:["ma_secret_path"]}),
 choice("Đề nghị hắn dùng phù ẩn tức, còn bản thân giữ im lặng.","ma_talisman",{trust:{mac:1},flags:["ma_uses_charm"]}),
 choice("Không can thiệp; để hắn ứng biến.","ma_solo",{flags:["ma_autonomous"]})
]});
node("ma_bridge","forest",[
 S("Trong nguyên tác có một khe đá dưới chân cầu. Ngươi có thể đi qua đó, nhưng nước đang dâng."),
 K("Ngươi biết đường bí mật? Hừm. Lần này ta nghe.", "thinking"),
 N("Hắn nhảy xuống khe đá, ướt sũng nửa người nhưng tránh được ngọn đuốc cuối cùng."),
 K("Đường thoát hiểm đúng là có thật. Điểm tin cậy của ngươi tăng được... nửa điểm.", "smirk"),
],"ma_pact_intro");
node("ma_talisman","forest",[
 S("Ngươi có phù ẩn tức. Đừng dùng thần thức, cứ theo xe mà đi."),
 K("Ta cũng nghĩ tới nó. Chỉ tiếc mỗi lá phù giá bằng ba bát mì.", "annoyed"),
 N("Hắn đốt lá phù, núp sau sọt dược thảo và vượt qua đội tuần tra."),
 K("Tốt. Sau này nếu có khế ước, ta muốn điều khoản hoàn tiền phù lục.", "smirk"),
],"ma_pact_intro");
node("ma_solo","forest",[
 N("Ngươi không lên tiếng. Mặc Từ tự nhảy xuống sau xe, ném một hòn sỏi sang rừng bên cạnh rồi vòng qua đám thủ vệ."),
 K("Đấy. Ta không cần ngươi cứu khỏi mọi chuyện. Nhưng nếu có cách nào bớt cực thì cũng không từ chối.", "smile"),
],"ma_pact_intro");
node("ma_pact_intro","market",[
 N("Tới được Phường Vân Kiều, Mặc Từ ngồi xuống trước tiệm bánh bao, kiểm tra túi linh thạch chỉ còn một viên."),
 K("Này, tiếng nói bí ẩn. Nếu ta thử một khế ước, ta được gì và mất gì?", "thinking"),
 S("Ta có thể chia sẻ kiến thức nguyên tác, trao phần thưởng trong giới hạn. Nhưng ta không thể ép ngươi nghe lệnh."),
 K("Được. Thế thì ta có điều kiện.", "serious"),
 K("Không ra lệnh giết người vô cớ. Không giấu giá phải trả. Còn chuyện ta quyết định sống thế nào, đừng xen vào.", "focused"),
],"ma_contract_choice",{choices:[
 choice("“Ta đồng ý. Ngươi vẫn là người quyết định.”","ma_pact_yes",{trust:{mac:2}}),
 choice("“Ta không hứa lúc nào cũng đồng ý, nhưng sẽ nói rõ lý do.”","ma_pact_frank",{trust:{mac:1}}),
 choice("“Ngươi có quyền từ chối khế ước này.”","ma_pact_wait",{flags:["ma_respected"]})
]});
node("ma_pact_yes","market",[
 S("Ta đồng ý. Ngươi vẫn là người quyết định."),
 K("Vậy ký thử. Nếu có điều khoản nhỏ bằng hạt vừng, ta sẽ đọc hết.", "smile"),
],"ma_pact");
node("ma_pact_frank","market",[
 S("Ta không hứa lúc nào cũng đồng ý, nhưng sẽ nói rõ lý do."),
 K("Nghe còn đáng tin hơn mấy kẻ suốt ngày hô cùng tiến cùng lùi.", "smirk"),
],"ma_pact");
node("ma_pact_wait","market",[
 S("Ngươi có quyền từ chối khế ước này."),
 K("Ta biết. Nhưng đi được tới đây rồi, thử thêm một chuyện mới cũng chẳng sao.", "thinking"),
],"ma_pact");
node("ma_pact","market",[
 I("Khế ước được xác lập. Ký chủ: MẶC TỪ."),
 K("Vậy là ngươi ở trong đầu ta thật rồi.", "surprised"),
 S("Có lẽ ngươi nên nghỉ một chút."),
 K("Không. Đầu tiên ta phải kiếm tiền. Rồi mới có tiền thuê phòng để nghỉ.", "smirk"),
],"ma_episode",{effect:{contract:"mac"}});
node("ma_episode","inn",[
 N("Mặc Từ tự tìm thuê gian phòng nhỏ trên lầu hai, bày giấy bùa lên bàn và nhận vẽ phù cho người qua đường."),
 K("Ta muốn lấy một cuốn cổ thư ở Thanh Vân Tông. Nó có thể giúp ta tìm ra người đã ra lệnh vụ ám sát.", "serious"),
 N("Ngươi tra nguyên tác: cái tên Mặc Từ xuất hiện trong cuộc tranh đoạt bảo vật, rồi biến mất ở chương 136. Một cái chết được viết gọn trong vài dòng."),
 K("Hệ thống, ngươi biết gì về đại hội ở đó? Đừng nhìn ta bằng cái kiểu im lặng đáng sợ ấy.", "thinking"),
],"ma_episode_choice",{choices:[
 choice("Nói thật về tử kiếp được ghi trong nguyên tác.","ma_fate",{trust:{mac:2},flags:["ma_knows_death"]}),
 choice("Chỉ nói đại hội nguy hiểm và có người đang tìm hắn.","ma_partial",{flags:["ma_half_truth"]}),
 choice("Hỏi hắn vì sao vẫn muốn tới dù có nguy hiểm.","ma_question",{trust:{mac:1}})
]});
node("ma_fate","inn",[
 S("Trong sách, ngươi chết ở đại hội đó, dưới kiếm Lục Chiêu Dã. Ta không biết sau những thay đổi này chuyện có còn xảy ra không."),
 K("...Ta đã nghi cả đời mình ngắn, nhưng không nghĩ lại có người đọc được đoạn kết.", "sad"),
 N("Hắn gấp tờ phù đang vẽ dở, nhét vào tay áo."),
 K("Cuốn cổ thư ấy vẫn quan trọng. Ta sẽ đi. Nhưng lần này ta mang thêm đường lui.", "serious"),
],"ma_ending");
node("ma_partial","inn",[
 S("Đại hội có người tìm ngươi. Ta khuyên nên chuẩn bị kế hoạch dự phòng."),
 K("Ta đã vẽ ba đường rút lui. Nếu ngươi biết đường thứ tư thì cứ góp.", "smirk"),
 N("Hắn vẫn quyết định đi, song lén gửi một lá thư bảo quản tài sản cho chủ quán."),
],"ma_ending");
node("ma_question","inn",[
 S("Nếu nguy hiểm vậy, sao ngươi vẫn muốn tới?"),
 K("Có người từng cứu ta khỏi Huyết Vụ Cốc. Sau đó người ấy biến mất. Cuốn cổ thư là dấu vết duy nhất.", "serious"),
 K("Ta sợ chết chứ. Nhưng không thể vì sợ mà không tìm người đã cứu mình.", "soft"),
],"ma_ending");
node("ma_ending","forest",[
 N("Trước bình minh, Mặc Từ tự viết xong một danh sách đường đi, để lại tiền phòng và lên đường."),
 K("Nếu có chuyện, ta sẽ gọi. Còn giờ đừng theo ta như cái đuôi. Ta biết tự đi.", "smirk"),
 N("Kẻ đáng lẽ phải chết trong nguyên tác đang chủ động bước về phía cái chết ấy, nhưng với kế hoạch của chính mình."),
 M("“...Một người chọn đường đi dù biết nơi đó có thể là điểm cuối.”"),
 I("Một đoạn chỉ thị cũ rung lên. Quyền hạn liên kết thứ hai bắt đầu hồi phục."),
],"$after_arc",{effect:{flag:"ma_arc_done",unlockSecond:true}});

/* TẠ VẤN SƠN — nghiên cứu chủ động */
node("ta_start","tower",[
 N("Trên Vấn Sơn Phong, mưa mỏng lướt qua hiên gỗ. Tạ Vấn Sơn không bế quan. Ông đang tự sửa một tấm bia đá cổ."),
 T("Tên ở hàng thứ bảy... rõ ràng hôm qua vẫn còn ở đây.", "thinking"),
 N("Ông trải hai bản chép đặt cạnh nhau. Một bản có tên một tu sĩ; bản còn lại có ô trống, như thể chính người chép đã quên nét bút."),
 T("Nếu là trò đùa của đám trẻ thì cũng quá công phu.", "smile"),
 N("Ngươi mở kết nối. Một luồng thần thức từ bên kia lập tức hướng về phía ngươi."),
 T("Tiểu hữu, ngươi đến từ đâu?", "curious"),
],"ta_hello",{choices:[
 choice("Giới thiệu là hệ thống lưu giữ tri thức.","ta_hello_truth",{trust:{ta:1}}),
 choice("Nói trước rằng bia đá đang có bất thường nhân quả.","ta_hello_clue",{flags:["ta_insight"]}),
 choice("Hỏi ông có muốn cùng uống trà rồi trò chuyện không.","ta_hello_tea",{trust:{ta:1}})
]});
node("ta_hello_truth","tower",[
 S("Ta là hệ thống có khả năng lưu giữ và chia sẻ tri thức. Ta vừa thức tỉnh."),
 T("Một giọng nói không có khí tức? Thú vị. Nhưng tự xưng có tri thức thì chưa đủ.", "smile"),
 T("Ngươi thử trả lời cho lão phu một câu xem.", "curious"),
],"ta_test");
node("ta_hello_clue","tower",[
 S("Bia đá có dấu vết nhân quả bị sửa. Ông đã phát hiện điều đó phải không?"),
 T("Ồ? Ngươi nhìn thấy cả nơi này? Vậy ngươi biết tên đã mất hay không?", "curious"),
 N("Ngươi tìm trong nguyên tác, nhưng không thấy cái tên nào tương ứng."),
],"ta_test");
node("ta_hello_tea","tower",[
 S("Ta muốn cùng ngươi nói chuyện. Trước tiên, trà của ông có thơm không?"),
 T("Ha ha, ngươi chưa có thân thể mà cũng biết hỏi chuyện trà?", "happy"),
 T("Lão phu có thể mời ngươi nghe mùi hương qua lời kể. Nhưng đổi lại, ngươi trả lời một câu hỏi.", "smile"),
],"ta_test");
node("ta_test","tower",[
 T("Ngươi nói có thể biết chuyện chưa xảy ra. Vậy buổi nghị sự ngày mai, chưởng môn sẽ nhắc tới việc gì?", "curious"),
 N("Ngươi tra được ở chương 46: Thanh Vân Tông sẽ mở thêm suất tuyển đệ tử ngoại môn. Nhưng nguyên tác không nhắc loại trà ông đang uống."),
],"ta_test_choice",{choices:[
 choice("Nói chính xác chuyện tuyển đệ tử, và thừa nhận mình không biết mọi thứ.","ta_test_true",{trust:{ta:2},flags:["ta_honest"]}),
 choice("Kể luôn kết cục của ông trong chính ma đại chiến.","ta_test_death",{flags:["ta_warned"]}),
 choice("Nói rằng không muốn biến mọi cuộc trò chuyện thành lời tiên tri.","ta_test_refuse",{trust:{ta:1}})
]});
node("ta_test_true","tower",[
 S("Chưởng môn sẽ nói chuyện mở suất tuyển đệ tử ngoại môn. Còn thứ trà ông đang uống, ta không biết."),
 T("Một dự đoán có thể kiểm chứng, lại không nhận bừa công lao. Được.", "smile"),
 N("Sáng sau, chưởng môn quả nhiên nhắc đến việc tuyển đệ tử. Ông trở về mà không báo gì cho hệ thống trong suốt buổi họp."),
],"ta_agreement");
node("ta_test_death","tower",[
 S("Theo nguyên tác, ông sẽ hy sinh trong chính ma đại chiến để bảo vệ đệ tử."),
 T("Nếu bảo vệ được bọn trẻ, cái chết ấy không đáng xấu hổ.", "serious"),
 T("Nhưng điều lão phu hỏi là buổi nghị sự, không phải ngày mất. Ngươi có thể ngồi nghe hết câu hỏi được không?", "amused"),
],"ta_agreement");
node("ta_test_refuse","tower",[
 S("Ta có thể trả lời. Nhưng ta không muốn mọi cuộc trò chuyện đều chỉ là đoán ngày mai."),
 T("Ừm. Người có thể đọc một cuốn sách mà vẫn không xem người sống là vài dòng mực, như vậy tốt.", "smile"),
],"ta_agreement");
node("ta_agreement","tower",[
 N("Tạ Vấn Sơn tự tay đóng rương chứa tấm bia đá. Ông đứng dậy cầm ô, chuẩn bị xuống núi."),
 T("Ta sẽ đi hỏi người đã chép hai cuốn sổ này. Còn ngươi, có muốn cùng lão phu thử một khế ước không?", "curious"),
 T("Ba mươi ngày. Không được tự ý nhìn vào trí nhớ riêng của ta. Thấy điều gì lạ phải nói thật. Hết hạn thì hai bên tự quyết.", "smile"),
],"ta_contract_choice",{choices:[
 choice("Chấp nhận một khế ước thử nghiệm có giới hạn.","ta_pact_yes",{trust:{ta:2}}),
 choice("Hỏi ông vì sao tin một ý thức mới gặp.","ta_pact_ask",{trust:{ta:1}}),
 choice("Đồng ý nhưng nhấn mạnh mình cũng có bí mật chưa nhớ ra.","ta_pact_memory",{flags:["ta_knows_memory"]})
]});
node("ta_pact_yes","tower",[
 S("Ta đồng ý. Một khế ước thử nghiệm, với giới hạn ông đã nói."),
 T("Vậy từ hôm nay chúng ta là đạo hữu tạm thời.", "happy"),
],"ta_pact");
node("ta_pact_ask","tower",[
 S("Ông không sợ một thứ không rõ nguồn gốc hay sao?"),
 T("Có chứ. Nhưng cái gì lão phu không hiểu thì lão phu muốn tìm hiểu. Hơn nữa, ngươi đâu ép được ta.", "amused"),
],"ta_pact");
node("ta_pact_memory","tower",[
 S("Ta đồng ý. Nhưng ta cũng có một nhiệm vụ đã bị khóa, chưa thể nhớ ra."),
 T("Vậy là cả hai có chuyện chưa sáng tỏ. Càng có lý do để cùng tìm.", "thoughtful"),
],"ta_pact");
node("ta_pact","tower",[
 I("Khế ước thử nghiệm được hình thành. Ký chủ: TẠ VẤN SƠN."),
 T("Đạo hữu, ta sắp xuống núi. Ngươi có thể tham khảo sách, còn quyết định đi đâu là của lão phu.", "smile"),
 S("Ta hiểu. Ta sẽ không tự ý thay ông quyết định."),
 T("Tốt. Giờ giúp ta nhớ xem đã cất chìa khóa tủ trà ở đâu được không?", "amused"),
],"ta_episode",{effect:{contract:"ta"}});
node("ta_episode","library",[
 N("Tạ Vấn Sơn đến một tàng thư không có tên trên bản đồ. Người quản thủ vừa nhìn thấy ông đã đóng cửa."),
 T("Ba mươi năm không gặp, ngươi vẫn khó chịu như cũ.", "amused"),
 N("Sau một lúc trò chuyện không rõ nghe được gì, ông lấy ra một mảnh giấy khắc dòng chữ “Vạn Danh Bia”."),
 T("Trong sách ngươi biết, Vạn Danh Bia có được nhắc đến không? Ta muốn phân biệt lịch sử được viết và thứ người ta đang sống.", "curious"),
],"ta_episode_choice",{choices:[
 choice("Tra nguyên tác và thừa nhận phần ghi chép còn thiếu.","ta_book",{trust:{ta:2},flags:["ta_shared_book"]}),
 choice("Khuyên ông đem mảnh giấy về đối chiếu thay vì đối chất tại đây.","ta_careful",{flags:["ta_safe"]}),
 choice("Hỏi chuyện gì khiến ông phải tự xuống núi.","ta_why",{trust:{ta:1}})
]});
node("ta_book","library",[
 S("Trong tiểu thuyết, bia được dùng trong một trận pháp, nhưng không ghi tên người khắc bia."),
 T("Vậy còn chỗ trống giữa những dòng chữ. Những người bị lược khỏi trang sách có thể là manh mối.", "thoughtful"),
],"ta_ending");
node("ta_careful","library",[
 S("Cứ giữ lại bản sao. Ông đang đứng giữa nơi có người muốn giấu nó."),
 T("Lão phu đã làm ba bản rồi, tiểu hữu. Nhưng ngươi nhắc đúng.", "amused"),
],"ta_ending");
node("ta_why","library",[
 S("Vì sao ông phải tự mình tìm hiểu chuyện này?"),
 T("Vì một trong hai cuốn sổ do chính tay ta viết. Nhưng ta không nhớ dòng chữ đã biến mất.", "sad"),
 T("Nếu ký ức của lão phu có thể sai, ta cần một người chứng kiến khác.", "serious"),
],"ta_ending");
node("ta_ending","tower",[
 N("Tạ Vấn Sơn tự quyết định cất giấu bản sao vào một chậu tùng, không báo vị trí cho bất kỳ đệ tử nào."),
 T("Hôm nay tới đây thôi. Lão phu còn phải đi giảng đạo. Kể cả có hệ thống, việc của ta vẫn phải tự làm.", "happy"),
 M("“...Những người không được ghi nhớ, liệu có thể nhờ ai đó làm chứng?”"),
 I("Ký ức nhiệm vụ gốc có phản ứng. Một mạch liên kết nữa được tìm thấy."),
],"$after_arc",{effect:{flag:"ta_arc_done",unlockSecond:true}});

/* Ký ức mở rộng qua một trải nghiệm, không qua ngày giả lập */
node("second_offer","stars",[
 N("Sau cuộc gặp đầu tiên, ngươi nhận ra khế ước không phải dây cương. Nó giống một lối cửa nhỏ: hai bên có thể gọi nhau, nhưng không ai bước thay chân ai."),
 M("“...Một người là khởi đầu. Một lời hứa không đủ để bảo vệ mọi cái tên.”"),
 I("Quyền hạn liên kết thứ hai đã khôi phục. Có thể tìm thêm một ký chủ, hoặc tiếp tục lắng nghe người hiện tại."),
 S("Mình có thể kết nối với người khác nữa. Nhưng có lẽ họ sẽ không biết ta đã có ký chủ đầu tiên..."),
],"second_choice",{choices:[
 choice("Thử quan sát một người khác và đề nghị khế ước.","select_second"),
 choice("Tạm thời chỉ đồng hành với một người.","solo_closing",{flags:["chose_solo"]})
]});
node("select_second","clouds",[],"select_second",{special:"select"});
node("solo_closing","night",[
 N("Ngươi không vội kéo thêm ai vào liên kết. Ở nơi khác, những ứng viên còn lại vẫn tự đưa ra quyết định của riêng họ."),
 N("Một mảnh ghi chép Vạn Danh Bia được mang qua phường thị, tới gần con đường của ký chủ đầu tiên."),
 S("Ta không cần có mặt ở mọi nơi. Nhưng những điều không được viết... có lẽ đang bắt đầu tìm tới ta."),
],"ending");
node("cross_intro","market",[
 N("Hai liên kết đang hoạt động. Người thứ nhất tự đưa ra quyết định, người thứ hai có kế hoạch riêng. Ngươi chỉ có thể lắng nghe khi họ mở lời."),
 I("Hai mối nhân quả đang tiến tới một điểm chung: mảnh ghi chép Vạn Danh Bia."),
],"cross_pair");
node("cross_pair","market",[
 N("Sợi dây giữa hai khế ước khẽ rung. Một biến cố mà nguyên tác chưa từng viết đã xảy ra."),
],"cross_choice",{special:"cross"});
node("cross_choice","market",[],null,{special:"cross"});
node("cross_truth","market",[
 S("Ta sẽ nói thật. Hai người đều đang kết nối với cùng một hệ thống."),
 N("Sự im lặng kéo dài. Không có tiếng thông báo thưởng hay trừ điểm; chỉ có hai người đang cân nhắc lời ngươi vừa nói."),
 I("Bí mật nhiều ký chủ: ĐÃ TIẾT LỘ. Cách họ ứng xử về sau sẽ phụ thuộc vào những gì họ tự quyết."),
],"epilogue",{effect:{flag:"cross_revealed"}});
node("cross_evasion","market",[
 S("Ta có lý do chưa thể kể hết. Nhưng dấu ấn ấy đúng là do ta tạo ra."),
 N("Câu trả lời không hoàn toàn sai. Cũng không hoàn toàn đủ. Sự nghi ngờ không tự biến mất chỉ vì ngươi im lặng một nhịp."),
 I("Bí mật nhiều ký chủ: CÓ NGHI VẤN. Những người liên quan có thể tự điều tra."),
],"epilogue",{effect:{flag:"cross_suspect"}});
node("cross_silent","market",[
 N("Ngươi không trả lời. Hai người tự đối mặt với nhau như những người có đầu óc và mục tiêu riêng."),
 I("Bí mật nhiều ký chủ: CHƯA ĐƯỢC HỆ THỐNG XÁC NHẬN. Những người liên quan sẽ tự kiểm chứng."),
],"epilogue",{effect:{flag:"cross_unanswered"}});
node("epilogue","stars",[
 N("Đêm ấy, trên Thương Huyền Giới, vô số đốm đèn lần lượt sáng lên. Những con người vừa gặp nhau chưa biết câu chuyện sẽ còn đi xa tới đâu."),
 N("Lục Chiêu Dã vẫn luyện kiếm. Các tông môn vẫn tổ chức đại hội. Những chuyện nguyên tác ghi lại vẫn có thể diễn ra — hoặc đổi hướng vì một quyết định nhỏ."),
 M("“...Nếu một cái tên được hai người cùng ghi nhớ...”"),
 M("“...thì nó không dễ dàng biến mất nữa.”"),
 S("Có lẽ ta đang nhớ ra nhiệm vụ của mình. Nhưng ta chưa muốn kết luận vội."),
 I("Chỉ thị cấp cao: NIÊM PHONG · Mảnh ký ức mới: ĐÃ GHI NHẬN."),
],"ending");
node("ending","night",[],"ending",{special:"ending"});

/* Các ứng viên tự tạo cuộc gặp, không có nhịp chuyển ngày */
const pairScenes={
  "lieu-mac":[
    L("Khoan. Trên lá phù của ngươi... vì sao có dấu ấn giống của ta?", "surprised"),
    K("Cô nương, ta còn muốn hỏi vì sao cô nhìn túi ta như muốn khám xét.", "wary"),
    L("Ta đang hỏi hệ thống của ta, không phải hỏi ngươi.", "focused"),
    K("...Cô vừa nói ‘hệ thống’?", "surprised")
  ],
  "lieu-ta":[
    T("Thanh Hòa, ngươi đang tìm Vạn Danh Bia? Ta có một trang chép về nó.", "thoughtful"),
    L("Trưởng lão... người cũng biết dấu ấn trên giấy này sao?", "surprised"),
    T("Không chỉ dấu ấn. Dường như có một tiếng nói đang lắng nghe cả hai ta.", "curious"),
    L("Người nói... hệ thống?", "startled")
  ],
  "mac-ta":[
    K("Tiền bối, cổ thư ấy ta đã tìm rất lâu. Có thể thương lượng không?", "thinking"),
    T("Ngươi muốn mua một trang giấy mà chính mình còn chưa hiểu?", "amused"),
    K("Ta có một người giúp tra cứu. Có điều... hình như người ấy đang rất im lặng.", "wary"),
    T("Ha ha. Vậy có lẽ vị tiểu hữu kia cũng đang nghe lão phu.", "smile")
  ]
};
window.NOVEL={nodes:n,hosts,pairScenes,hostFirst:{lieu:"li_start",mac:"ma_start",ta:"ta_start"},intro:"boot",version:"0.4.0",library:[
  {title:"Thương Huyền Giới",body:"Một thế giới tu chân diễn sinh từ tiểu thuyết 《Kiếm Vấn Trường Sinh》. Người trong thế giới sống và hành động độc lập; nguyên tác không kể hết cuộc đời của họ."},
  {title:"Nguyên tác — 《Kiếm Vấn Trường Sinh》",body:"Toàn bộ 1.286 chương tồn tại trong ký ức hệ thống. Bản demo trình bày những trích lục phục vụ câu chuyện, chưa có toàn văn tiểu thuyết."},
  {title:"Lục Chiêu Dã",body:"Thiên Mệnh Chi Tử. Theo nguyên tác phi thăng ở cuối truyện. Hiện là người có thể quan sát nhưng chưa thể ký khế ước."},
  {title:"Vạn Danh Bia",body:"Di vật xuất hiện trong một trận pháp cổ. Nguyên tác không ghi ai đã khắc những cái tên lên bia; câu hỏi đó đang được nhiều người theo đuổi."},
  {title:"Khế ước",body:"Người tham gia giữ quyền tự quyết. Hệ thống chỉ giao tiếp, chia sẻ tri thức và trao cơ duyên trong giới hạn. Khế ước đầu tiên được chọn trong ba ứng viên; liên kết thứ hai sẽ xuất hiện theo diễn biến."},
  {title:"Nhiệm vụ ẩn",body:"Ký ức nhiệm vụ gốc chưa khôi phục. Hiện còn ba mảnh lời nhắc: tìm người thích hợp; không quyết định thay họ; hãy nhớ tên của họ."}
]};
})();