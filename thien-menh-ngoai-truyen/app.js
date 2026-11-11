/* Thiên Mệnh Ngoại Truyện v0.4 — sự kiện và lựa chọn, không có đồng hồ/ngày.
 * Không phụ thuộc framework, API hay server; lưu tiến trình bằng localStorage. */
(function(){
"use strict";
const story=window.NOVEL,art=window.NOVEL_ART;
const $=id=>document.getElementById(id);
if(!story||!art){document.body.textContent="Không thể tải kịch bản hoặc đồ họa. Hãy làm mới trang.";return;}
const SAVE="thien-menh-vn-event-v4";
const fresh=()=>({node:"cover",idx:0,contracts:[],primary:null,prospect:null,preview:null,trust:{lieu:0,mac:0,ta:0},flags:{},applied:{},expressions:{},lastLogged:"",log:[],sound:false});
let state=fresh(),typing=false,typingTimer=null,fullText="",activeBg="",toastTimeout=null,audio=null,modalOpen=false;
try{const raw=JSON.parse(localStorage.getItem(SAVE)||"null");if(raw&&typeof raw.node==="string"&&(story.nodes[raw.node]||raw.node==="cover")&&Array.isArray(raw.contracts))state={...fresh(),...raw,flags:raw.flags||{},trust:raw.trust||fresh().trust,applied:raw.applied||{},expressions:raw.expressions||{}};}catch(e){}
function esc(s){return String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}
function persist(){try{localStorage.setItem(SAVE,JSON.stringify(state));}catch(e){}}
function toast(s){$("toast").textContent=s;$("toast").classList.add("show");clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>$("toast").classList.remove("show"),2300);}
function sound(){if(!state.sound)return;try{const A=window.AudioContext||window.webkitAudioContext;audio=audio||new A();let osc=audio.createOscillator(),gain=audio.createGain();osc.type="sine";osc.frequency.value=640;gain.gain.value=.013;osc.connect(gain);gain.connect(audio.destination);osc.start();osc.stop(audio.currentTime+.025);}catch(e){}}
function apply(e){
 if(!e)return;
 if(e.flag)state.flags[e.flag]=true;
 if(e.flags)for(const f of e.flags)state.flags[f]=true;
 if(e.trust)for(const k of Object.keys(e.trust))state.trust[k]=(state.trust[k]||0)+e.trust[k];
 if(e.contract&&!state.contracts.includes(e.contract)){
   if(state.contracts.length>=2)throw Error("Không thể ký quá hai khế ước trong demo.");
   state.contracts.push(e.contract);
   if(!state.primary)state.primary=e.contract;
   toast("✧ Ký kết thành công với "+story.hosts[e.contract].name);
 }
 if(e.unlockSecond)state.flags.secondUnlocked=true;
}
function go(id){
 if(id==="$after_arc")id=state.contracts.length<2?"second_offer":"cross_intro";
 if(!story.nodes[id]){console.error("Unknown scene:",id);return;}
 state.node=id;state.idx=0;state.lastLogged="";
 const node=story.nodes[id];
 if(node.effect&&!state.applied[id]){apply(node.effect);state.applied[id]=true;}
 if(node.special==="select")state.preview=state.contracts.length===0?"lieu":(["lieu","mac","ta"].find(x=>!state.contracts.includes(x))||"lieu");
 persist();render();
}
function current(){return story.nodes[state.node];}
function names(w){return {narrator:"Dẫn truyện",memory:"Ký ức còn sót",system:"Hệ thống · Ngươi",interface:"Thông báo hệ thống",lieu:"Liễu Thanh Hòa",mac:"Mặc Từ",ta:"Tạ Vấn Sơn",luc:"Lục Chiêu Dã"}[w]||"Dẫn truyện";}
function scenePlace(k){return {void:"Không gian vô định",stars:"Tinh không Thương Huyền",clouds:"Một thế giới đang sống",sect:"Thanh Vân Tông",archive:"Kho hồ sơ cũ",garden:"Dược viên Thanh Vân",market:"Phường Vân Kiều",inn:"Quán trọ dưới chân núi",forest:"Đường núi Huyết Vụ",tower:"Vấn Sơn Phong",library:"Tàng Thư Các",night:"Đêm Thương Huyền Giới"}[k]||"Thương Huyền Giới";}
function sceneChapter(){
 const id=state.node;
 if(id==="cover")return "THIÊN MỆNH NGOẠI TRUYỆN";
 if(id==="ending"||id==="epilogue")return "HỒI KẾT / NGOẠI TRUYỆN";
 if(id.startsWith("li_"))return "TUYẾN TRUYỆN / LIỄU THANH HÒA";
 if(id.startsWith("ma_"))return "TUYẾN TRUYỆN / MẶC TỪ";
 if(id.startsWith("ta_"))return "TUYẾN TRUYỆN / TẠ VẤN SƠN";
 if(id.startsWith("cross"))return "GIAO THOA / KHẾ ƯỚC";
 if(id.startsWith("second"))return "KÝ ỨC MỚI / KHẾ ƯỚC";
 return "CHƯƠNG 00 / THỨC TỈNH";
}
const pairKey=()=>state.contracts.slice().sort().join("-");
const pairExtra={
 "lieu-mac":{
   truth:[{who:"lieu",text:"...Thì ra không phải chỉ có mình ta. Ngươi giấu vì sợ ta nghĩ nhiều sao?",expression:"thoughtful"},{who:"mac",text:"Khoan. Hai người dùng chung một hệ thống? Vậy phí sử dụng có chia đôi không?",expression:"smirk"}],
   evade:[{who:"lieu",text:"Ta sẽ tự tìm hiểu phần còn lại.",expression:"focused"},{who:"mac",text:"Ngươi giấu cũng vụng đấy. Ta có thể giúp giấu, nếu ngươi nói cho ta biết lý do.",expression:"thinking"}],
   silent:[{who:"lieu",text:"Ngươi không muốn nói. Không sao. Ta sẽ hỏi hắn.",expression:"focused"},{who:"mac",text:"Có vẻ ta và cô nương này cần nói chuyện riêng rồi.",expression:"smirk"}]
 },
 "lieu-ta":{
   truth:[{who:"lieu",text:"Vậy tiền bối cũng có thể nghe được ngươi?",expression:"surprised"},{who:"ta",text:"Lão phu có nghe. Nhưng chuyện này tốt hay xấu thì còn phải hỏi chính tiểu hữu ấy.",expression:"smile"}],
   evade:[{who:"ta",text:"Câu trả lời thiếu một nửa. Nhưng lão phu không ép.",expression:"thoughtful"},{who:"lieu",text:"Ta sẽ nhớ điều này. Có lẽ sẽ có ngày ta hỏi lại.",expression:"focused"}],
   silent:[{who:"ta",text:"Hai bên im lặng. Thế thì chúng ta uống trà, tự bàn chuyện của mình.",expression:"amused"},{who:"lieu",text:"...Chuyện này lại càng đáng nghi.",expression:"thinking"}]
 },
 "mac-ta":{
   truth:[{who:"mac",text:"Một hệ thống dùng chung với đại năng Hóa Thần? Vậy ta không được chiết khấu linh thạch à?",expression:"smirk"},{who:"ta",text:"Ha ha. Ta lại thấy kẻ không có linh thạch này rất thú vị.",expression:"happy"}],
   evade:[{who:"ta",text:"Tiểu hữu đang tránh nói dối mà cũng chưa muốn nói thật. Lão phu hiểu.",expression:"thoughtful"},{who:"mac",text:"Được, ta cũng sẽ giữ bí mật của mình.",expression:"wary"}],
   silent:[{who:"mac",text:"Ông già, hay chúng ta thử hỏi cùng một câu?",expression:"smirk"},{who:"ta",text:"Được. Lão phu đang muốn xem điều gì xảy ra.",expression:"amused"}]
 }
};
function linesFor(id,node){
 let lines=node.lines?node.lines.slice():[];
 if(id==="cross_pair"){const key=pairKey(),extra=story.pairScenes[key]||[];lines=lines.concat(extra);}
 if(["cross_truth","cross_evasion","cross_silent"].includes(id)){
   const x=pairExtra[pairKey()];if(x){const response=x[id==="cross_truth"?"truth":id==="cross_evasion"?"evade":"silent"];const end=lines.pop();lines=lines.concat(response,end); }
 }
 return lines;
}
function bg(k){if(activeBg!==k){$("background").innerHTML=art.background(k);activeBg=k;}$("locationText").textContent=scenePlace(k);$("chapterText").textContent=sceneChapter();}
function portraitFor(line,nodeId){
 if(["void","stars"].includes(current()?.scene)&&!["cross_intro","epilogue"].includes(nodeId))return [];
 if(nodeId==="world_luc")return ["luc"];
 if(nodeId.startsWith("li_"))return ["lieu"];
 if(nodeId.startsWith("ma_"))return ["mac"];
 if(nodeId.startsWith("ta_"))return ["ta"];
 if(nodeId.startsWith("cross"))return state.contracts.slice(0,2);
 if(nodeId==="pre_select")return ["lieu","mac"];
 return [];
}
function drawCharacters(list){
 const ids=list.filter(x=>story.hosts[x]);
 $("characterLayer").innerHTML=ids.map((id,i)=>{
   const both=ids.length>1;const cls=both?(i===0?"duo-left":"duo-right"):"solo";
   const expr=state.expressions[id]||"soft";
   return '<div class="character '+cls+'"><div class="name-float">'+esc(story.hosts[id].name)+'</div>'+art.chibi(id,expr,i===0&&both?"left":"right")+'</div>';
 }).join("");
}
function setScene(node,line){
 bg(node.scene||"stars");
 if(line&&story.hosts[line.who]&&line.expression)state.expressions[line.who]=line.expression;
 const visible=portraitFor(line,state.node);
 drawCharacters(visible);
 $("statusLabel").textContent=state.contracts.length?"✦ "+state.contracts.length+" KHẾ ƯỚC ĐANG KẾT NỐI":"✧ CHƯA KÝ KHẾ ƯỚC";
 $("footerText").textContent=state.contracts.length?state.contracts.map(x=>story.hosts[x].name).join(" · "):"Một trang sách chưa được viết";
}
function hidePanels(){clearInterval(typingTimer);typing=false;$("dialogueBox").classList.add("hidden");$("sceneContent").innerHTML="";}
function typeLine(str){
 fullText=str;$("dialogueText").textContent="";typing=true;
 clearInterval(typingTimer);
 const reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(reduced){finishType();return;}
 let i=0;typingTimer=setInterval(()=>{i=Math.min(str.length,i+2);$("dialogueText").textContent=str.slice(0,i);if(i>=str.length)finishType();},22);
}
function finishType(){clearInterval(typingTimer);typing=false;$("dialogueText").textContent=fullText;}
function renderLine(node,lines){
 const item=lines[state.idx];hidePanels();setScene(node,item);
 $("speakerName").textContent=names(item.who);
 $("dialogueBox").dataset.tone=item.who;
 $("dialogueProgress").textContent=String(state.idx+1).padStart(2,"0")+" / "+String(lines.length).padStart(2,"0");
 $("dialogueBox").classList.remove("hidden");
 typeLine(item.text);
 const key=state.node+":"+state.idx;
 if(state.lastLogged!==key){state.log.push({who:item.who,text:item.text});if(state.log.length>150)state.log=state.log.slice(-150);state.lastLogged=key;}
 persist();
}
function showOverlay(html,node,portraits=[]){hidePanels();setScene(node||current()||{scene:"clouds"},null);if(portraits.length)drawCharacters(portraits);$("sceneContent").innerHTML=html;}
function renderChoices(node){
 const count=node.choices.length;
 const last=story.nodes[state.node].lines?.slice(-1)[0];
 const prompt=last?.who==="narrator"?"Ngươi muốn làm gì tiếp?":"Ngươi sẽ đáp lại thế nào?";
 const html='<section class="overlay-card"><span class="micro">✧ LỰA CHỌN / '+count+' HƯỚNG</span><h2 class="section-title">'+prompt+'</h2><p class="small-copy">Mỗi lời nói đều có thể được ký chủ ghi nhớ. Họ vẫn có quyền không làm theo ngươi.</p><div class="overlay-actions">'+node.choices.map((c,i)=>'<button type="button" class="choice-btn" data-action="choice" data-index="'+i+'"><span><span class="number">'+String(i+1).padStart(2,"0")+'.</span>'+esc(c.label)+'</span><span>›</span></button>').join("")+'</div></section>';
 showOverlay(html,node);
}
function showSelection(){
 const second=state.contracts.length===1;
 const ids=["lieu","mac","ta"].filter(id=>!state.contracts.includes(id)),selected=ids.includes(state.preview)?state.preview:ids[0];
 state.preview=selected;
 const host=story.hosts[selected];
 const cards=ids.map(id=>{const h=story.hosts[id];return '<button type="button" data-action="preview" data-host="'+id+'" class="candidate-card '+(selected===id?"active":"")+'"><div class="candidate-sprite">'+art.chibi(id,selected===id?"smile":"soft")+'</div><div class="candidate-meta"><strong>'+esc(h.name)+'</strong><span>'+esc(h.title)+'</span><em>'+esc(h.realm)+'</em></div></button>';}).join("");
 const html='<section class="overlay-card selection-card"><span class="micro">✧ '+(second?"QUYỀN HẠN THỨ HAI":"KHẾ ƯỚC ĐẦU TIÊN")+' / '+ids.length+' ỨNG VIÊN</span><h2 class="section-title">'+(second?"Một tiếng nói khác đang chờ.":"Chọn người ngươi muốn lắng nghe.")+'</h2><p class="small-copy">'+(second?"Ngươi đã đồng hành với một người. Những người còn lại vẫn có cuộc sống và quyết định riêng.":"Chỉ được tiếp xúc với một người lúc đầu. Hãy nhìn xem họ đang làm gì, rồi quyết định sẽ lên tiếng với ai.")+'</p><div class="candidate-list">'+cards+'</div><div class="profile-detail"><strong>'+esc(host.name)+' — '+esc(host.mark)+'</strong><p>'+esc(host.intro)+'</p></div><div class="split-actions"><button class="ghost-btn" type="button" data-action="archive">XEM NGUYÊN TÁC ▤</button><button class="big-btn" type="button" data-action="selectHost" data-host="'+selected+'">LẮNG NGHE NGƯỜI NÀY ›</button></div></section>';
 showOverlay(html,current());
}
function showCrossChoice(){
 const html='<section class="overlay-card"><span class="micro">⚘ HAI KHẾ ƯỚC / CÙNG MỘT THẾ GIỚI</span><h2 class="section-title">Họ đã nghe thấy một dấu hiệu chung.</h2><p class="small-copy">Hai ký chủ đang tự nói chuyện với nhau. Ngươi có thể trả lời, không thể ép họ tin.</p><div class="overlay-actions"><button class="choice-btn" data-action="goto" data-next="cross_truth"><span><span class="number">01.</span> Thành thật: “Cả hai ngươi đều là ký chủ của ta.”</span><span>›</span></button><button class="choice-btn" data-action="goto" data-next="cross_evasion"><span><span class="number">02.</span> Nói một phần: “Dấu ấn ấy do ta tạo ra.”</span><span>›</span></button><button class="choice-btn" data-action="goto" data-next="cross_silent"><span><span class="number">03.</span> Không xen vào cuộc đối thoại của họ.</span><span>›</span></button></div></section>';
 showOverlay(html,current(),state.contracts.slice(0,2));
}
function showCover(){
 bg("clouds");drawCharacters(["lieu","mac"]);$("statusLabel").textContent="✦ VISUAL NOVEL · 0.4";$("chapterText").textContent="BẢN DEMO / NGOẠI TRUYỆN";$("sceneContent").innerHTML='<section class="overlay-card cover-card"><div class="cover-symbol">命</div><span class="micro">✦ A CULTIVATION VISUAL NOVEL ✦</span><h1>Thiên Mệnh<br>Ngoại Truyện</h1><p>Ngươi không phải người được chọn. Ngươi là hệ thống vừa thức tỉnh — và chẳng còn nhớ vì sao mình cần tìm ký chủ.</p><button class="big-btn" type="button" data-action="start" style="margin:auto;max-width:300px">BẮT ĐẦU CÂU CHUYỆN <span>✧</span></button><p class="small-copy" style="font:11px var(--ui);margin-top:17px">Không có đồng hồ đếm ngày · Người trong thế giới tự lựa chọn con đường của mình</p></section>';
 $("dialogueBox").classList.add("hidden");
 $("footerText").textContent="Những cuộc đời nằm ngoài trang sách";
}
function showEnding(){
 const ids=state.contracts;
 const summary=ids.map(id=>'<div class="status-entry"><div class="mini-chibi">'+art.chibi(id,"smile")+'</div><div><strong>'+esc(story.hosts[id].name)+'</strong><p>'+esc(story.hosts[id].title)+'</p><span>Vẫn có con đường và những bí mật riêng.</span></div></div>').join("");
 const html='<section class="overlay-card"><span class="micro">◈ CHƯƠNG 0 / BẢN DEMO ĐÃ KẾT THÚC</span><h2 class="section-title">Ngoại truyện chỉ vừa bắt đầu.</h2><p class="small-copy">Ngươi đã thức tỉnh, nhớ lại một phần nhiệm vụ và gặp '+ids.length+' ký chủ. Những cuộc đời ấy sẽ tiếp tục vận hành — dù ngươi có quan sát hay không.</p><div class="status-list">'+summary+'</div><div class="split-actions"><button class="ghost-btn" type="button" data-action="journal">XEM HỘI THOẠI ☷</button><button class="big-btn" type="button" data-action="restart">CHƠI LẠI ↺</button></div><p class="small-copy" style="margin-top:12px">Bản tiếp theo sẽ mở rộng tuyến nguyên tác, nhiệm vụ ẩn và nhiều biến cố do ký chủ tự khởi xướng.</p></section>';
 showOverlay(html,current());
}
function render(){
 const id=state.node;
 if(id==="cover"){showCover();return;}
 const node=current();
 if(!node){state.node="cover";persist();showCover();return;}
 const lines=linesFor(id,node);
 if(state.idx<lines.length){renderLine(node,lines);return;}
 if(node.special==="select"){showSelection();return;}
 if(node.special==="cross"){showCrossChoice();return;}
 if(node.special==="ending"){showEnding();return;}
 if(node.choices){renderChoices(node);return;}
 if(node.next){go(node.next);return;}
 showEnding();
}
function advance(){
 if(modalOpen)return;
 if(state.node==="cover")return;
 const node=current();if(!node)return;
 const lines=linesFor(state.node,node);
 if(state.idx>=lines.length)return;
 if(typing){finishType();return;}
 sound();state.idx++;state.lastLogged="";
 persist();render();
}
function choose(i){const node=current(),opt=node?.choices?.[i];if(!opt)return;apply(opt.effect);sound();go(opt.next);}
function selectHost(id){
 const node=current();
 if(node?.special!=="select")return;
 if(state.contracts.includes(id)||!["lieu","mac","ta"].includes(id)||state.contracts.length>=2)return;
 if(state.contracts.length===1&&!state.flags.secondUnlocked)return;
 state.prospect=id;sound();go(story.hostFirst[id]);
}
function openModal(title,inner){
 $("modalTitle").textContent=title;$("modalBody").innerHTML=inner;$("modal").classList.remove("hidden");modalOpen=true;$("closeModal").focus();
}
function closeModal(){$("modal").classList.add("hidden");modalOpen=false;}
function archive(){
 const html='<p class="small-copy">Ngươi đã nhớ toàn bộ nguyên tác, nhưng thế giới không chỉ có những người tác giả nhắc đến. Những mục dưới đây là trích lục dành cho bản demo, không phải toàn văn 1.286 chương.</p>'+story.library.map(x=>'<div class="book-entry"><strong>'+esc(x.title)+'</strong><p>'+esc(x.body)+'</p></div>').join("")+'<h3 class="section-title" style="font-size:20px;margin-top:22px">Số phận trong nguyên tác</h3>'+Object.keys(story.hosts).map(id=>'<div class="book-entry"><strong>'+esc(story.hosts[id].name)+'</strong><p>'+esc(story.hosts[id].orig)+'</p></div>').join("");
 openModal("Thư viện nguyên tác",html);
}
function journal(){const logs=state.log.slice(-90);const html=logs.length?logs.map(l=>'<div class="backlog-entry"><strong>'+esc(names(l.who))+'</strong><div>'+esc(l.text)+'</div></div>').join(""):'<p class="small-copy">Chưa có đoạn thoại nào được lưu.</p>';openModal("Nhật ký hội thoại",html);}
function menu(){
 const data='<p class="small-copy">Game tự lưu mỗi khi diễn biến thay đổi. Các đoạn kịch bản được kích hoạt bởi lựa chọn và hành động của ký chủ, không phải nút chuyển ngày.</p>'
 +'<div class="book-entry"><strong>Tiến trình</strong><p>'+esc(state.contracts.length?state.contracts.map(x=>story.hosts[x].name).join(" · "):"Chưa có khế ước")+'</p><p>Quyền hạn thứ hai: '+(state.flags.secondUnlocked?"Đã mở":"Chưa khôi phục")+'</p></div>'
 +'<div class="overlay-actions"><button class="choice-btn" data-action="save"><span>◇ Lưu tiến trình ngay</span><span>✓</span></button><button class="choice-btn" data-action="sound"><span>♫ Âm thanh giao diện: '+(state.sound?"BẬT":"TẮT")+'</span><span>›</span></button><button class="choice-btn" data-action="restart"><span>↺ Bắt đầu lại từ đầu</span><span>›</span></button></div>';
 openModal("Cài đặt & tiến trình",data);
}
function restart(){if(window.confirm("Bắt đầu lại từ đầu? Tiến trình v0.4 hiện tại sẽ được thay thế.")){state=fresh();activeBg="";closeModal();persist();render();toast("Đã bắt đầu câu chuyện mới.");}}
function dispatch(action,button){
 if(action==="start"){go(story.intro);}
 else if(action==="choice"){choose(Number(button.dataset.index));}
 else if(action==="preview"){state.preview=button.dataset.host;persist();render();}
 else if(action==="selectHost"){selectHost(button.dataset.host);}
 else if(action==="goto"){go(button.dataset.next);}
 else if(action==="archive"){archive();}
 else if(action==="journal"){journal();}
 else if(action==="menu"){menu();}
 else if(action==="save"){persist();toast("Đã lưu tiến trình ♡");}
 else if(action==="sound"){state.sound=!state.sound;persist();menu();toast(state.sound?"Âm thanh đã bật":"Âm thanh đã tắt");}
 else if(action==="restart"){restart();}
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-action]");if(b){dispatch(b.dataset.action,b);}});
$("nextBtn").addEventListener("click",e=>{e.stopPropagation();advance();});
$("dialogueBox").addEventListener("click",advance);
$("archiveBtn").addEventListener("click",archive);
$("journalBtn").addEventListener("click",journal);
$("menuBtn").addEventListener("click",menu);
$("closeModal").addEventListener("click",closeModal);
$("modal").addEventListener("click",e=>{if(e.target===$("modal"))closeModal();});
document.addEventListener("keydown",e=>{
 if(e.key==="Escape"&&modalOpen){closeModal();return;}
 if(modalOpen)return;
 const tag=e.target?.tagName;
 if((e.key===" "||e.key==="Enter")&&!["BUTTON","INPUT","TEXTAREA"].includes(tag)&&!e.ctrlKey){if(state.node!=="cover"){e.preventDefault();advance();}}
 if(/^[1-4]$/.test(e.key)&&current()?.choices&&state.idx>=linesFor(state.node,current()).length){choose(Number(e.key)-1);}
});
persist();render();
})();