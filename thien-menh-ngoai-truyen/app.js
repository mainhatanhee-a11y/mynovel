/* Thiên Mệnh Ngoại Truyện — visual novel engine, vanilla JS, chạy offline. */
(function () {
  "use strict";
  var S=window.VN_STORY;
  if(!S){document.body.textContent="Không tải được story.js";return;}
  var STORE="thien-menh-ngoai-truyen-v1";
  var $=function(id){return document.getElementById(id);};
  var scene=$("scene"), content=$("mainContent"), dialogue=$("dialogue");
  var timer=null, typing=false, fullText="", toastTimer=null, sound=false, audio=null;
  var saved;
  function fresh(){return {phase:"title",queue:[],lineIndex:0,after:"",sequence:0,lastLogged:"",log:[],day:1,energy:120,contracts:[],activeHost:null,pendingHost:null,trust:{lieu:30,mac:30,ta:30},flags:{},eventDone:false};}
  try{saved=JSON.parse(localStorage.getItem(STORE)||"null");}catch(e){saved=null;}
  var state=saved&&saved.phase&&Array.isArray(saved.contracts)&&saved.flags&&saved.trust?saved:fresh();
  function persist(){try{localStorage.setItem(STORE,JSON.stringify(state));}catch(e){/* storage disabled */}}
  function esc(t){return String(t==null?"":t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}
  function notify(message){var el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(function(){el.classList.remove("show");},2300);}
  function beep(){if(!sound)return;try{audio=audio||new (window.AudioContext||window.webkitAudioContext)();var o=audio.createOscillator(),g=audio.createGain();o.type="sine";o.frequency.value=650;g.gain.value=.012;o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+.035);}catch(e){}}
  function portrait(id){
    var cfg={lieu:{robe:"#558e9c",trim:"#acd0c7",hair:"#1a2335",eye:"#1f3240",acc:"#bfddce",skin:"#e6bc99"},mac:{robe:"#6d344c",trim:"#c68178",hair:"#afb6bd",eye:"#3c2637",acc:"#b69b8b",skin:"#dfb08c"},ta:{robe:"#e0d4b9",trim:"#b6a174",hair:"#e5e1d5",eye:"#67717d",acc:"#c9aa7f",skin:"#dfbc9e"},luc:{robe:"#8da9c0",trim:"#e2e6df",hair:"#232c37",eye:"#2d3b48",acc:"#b7c6cc",skin:"#dfb594"}}[id];
    if(!cfg)return "";
    var x='<svg class="portrait-svg" viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chân dung pixel art" shape-rendering="crispEdges">';
    x+='<rect x="34" y="32" width="32" height="53" fill="'+cfg.hair+'"/>';
    x+='<rect x="29" y="79" width="42" height="15" fill="'+cfg.skin+'"/>';
    x+='<rect x="23" y="88" width="54" height="52" fill="'+cfg.robe+'"/>';
    x+='<rect x="14" y="97" width="15" height="43" fill="'+cfg.robe+'"/><rect x="71" y="97" width="15" height="43" fill="'+cfg.robe+'"/>';
    x+='<rect x="42" y="92" width="16" height="48" fill="'+cfg.trim+'"/><rect x="47" y="96" width="6" height="44" fill="'+cfg.robe+'"/>';
    x+='<rect x="33" y="42" width="34" height="38" fill="'+cfg.skin+'"/><rect x="30" y="44" width="5" height="25" fill="'+cfg.hair+'"/><rect x="65" y="44" width="5" height="27" fill="'+cfg.hair+'"/>';
    x+='<rect x="31" y="33" width="38" height="13" fill="'+cfg.hair+'"/><rect x="39" y="26" width="26" height="12" fill="'+cfg.hair+'"/>';
    x+='<rect x="40" y="58" width="6" height="3" fill="'+cfg.eye+'"/><rect x="55" y="58" width="6" height="3" fill="'+cfg.eye+'"/>';
    x+='<rect x="47" y="71" width="8" height="2" fill="#986e67"/>';
    x+='<rect x="30" y="106" width="5" height="34" fill="'+cfg.trim+'"/><rect x="65" y="106" width="5" height="34" fill="'+cfg.trim+'"/>';
    if(id==="lieu"){x+='<rect x="58" y="33" width="16" height="4" fill="'+cfg.acc+'"/><rect x="73" y="29" width="4" height="14" fill="'+cfg.acc+'"/>';}
    if(id==="mac"){x+='<rect x="24" y="48" width="9" height="40" fill="'+cfg.hair+'"/><rect x="67" y="48" width="9" height="40" fill="'+cfg.hair+'"/><rect x="35" y="30" width="30" height="4" fill="#d6d9d6"/>';}
    if(id==="ta"){x+='<rect x="43" y="76" width="15" height="27" fill="#e8e5df"/><rect x="33" y="42" width="4" height="65" fill="'+cfg.hair+'"/><rect x="64" y="42" width="4" height="65" fill="'+cfg.hair+'"/><rect x="45" y="32" width="10" height="4" fill="'+cfg.acc+'"/>';}
    if(id==="luc"){x+='<rect x="47" y="17" width="7" height="21" fill="'+cfg.hair+'"/><rect x="42" y="23" width="17" height="6" fill="'+cfg.acc+'"/>';}
    return x+"</svg>";
  }
  function bg(b,p){scene.className="scene scene-"+(b||"hub");var label={void:"KHÔNG GIAN VÔ ĐỊNH",world:"THƯƠNG HUYỀN GIỚI",sect:"THANH VÂN TÔNG",market:"PHƯỜNG VÂN KIỀU",mountain:"VẤN SƠN PHONG",hub:"KHÔNG GIAN HỆ THỐNG",event:"ĐẠI HỘI VẤN ĐẠO",archive:"THƯ VIỆN NGUYÊN TÁC"}; $("sceneLocation").textContent=label[b]||label.hub;$("sceneKicker").textContent=b==="void"?"MEMORY / RECOVERY":b==="event"?"WORLD EVENT / CRITICAL":"SYSTEM / CONNECTION STABLE";$("scenePortrait").innerHTML=portrait(p);}
  function renderSide(){
    $("energyValue").innerHTML=state.energy+' <small>/ 200</small>';
    $("energyBar").style.width=Math.max(0,Math.min(100,state.energy/2))+"%";
    $("contractCount").textContent=String(state.contracts.length).padStart(2,"0")+" / 02";
    $("dayValue").textContent="NGÀY "+String(state.day).padStart(2,"0");
    $("hostPanelMarker").textContent=String(state.contracts.length).padStart(2,"0")+" ACTIVE";
    $("hostList").innerHTML=state.contracts.length?state.contracts.map(function(id){
      var h=S.hosts[id],status=(state.flags.macDead&&id==="mac")?"ĐÃ TỬ VONG":"TÍN NHIỆM "+state.trust[id];
      return '<button class="host-mini" type="button" data-action="switch" data-host="'+id+'"><div class="host-icon">'+portrait(id)+'</div><div class="host-info"><strong>'+esc(h.name)+'</strong><small>'+esc(h.realm)+'</small><em>'+status+'</em></div></button>';
    }).join(""):'<p class="empty">Chưa có liên kết nào được thiết lập.</p>';
    $("footerState").textContent=state.phase==="title"?"CHỜ KHỞI ĐỘNG":state.phase==="dialogue"?"ĐỒNG BỘ ĐOẠN KÝ ỨC":"KHẾ ƯỚC / "+state.contracts.length+" · MỐC NGÀY "+state.day;
    $("continueBtn").innerHTML=state.phase==="dialogue"?'TIẾP HỘI THOẠI <span>↗</span>':state.phase==="title"?'KHỞI ĐỘNG <span>↗</span>':state.phase==="hub"?'CHUYỂN NGÀY <span>↗</span>':'KHÔNG GIAN HỆ THỐNG <span>↗</span>';
  }
  function render(){
    clearInterval(timer);typing=false;
    renderSide();dialogue.classList.add("hidden");content.innerHTML="";
    if(state.phase==="title"){bg("void");content.innerHTML='<div class="screen-card"><div class="ornament">✦ · ◈ · ✦</div><div class="micro">A MULTI-HOST CULTIVATION VISUAL NOVEL</div><h1 class="main-title">THIÊN MỆNH<br>NGOẠI TRUYỆN</h1><p class="sub-title">Ngươi không phải thiên mệnh chi tử. Ngươi là bàn tay vàng trong đầu những người khác. Nhưng trước tiên... ngươi phải nhớ lại mình là ai.</p><div class="divider-gold"></div><div class="button-stack"><button class="primary-btn" data-action="start">THỨC TỈNH HỆ THỐNG <span>↗</span></button><button class="secondary-btn" data-action="archive">XEM BẢN GHI NGUYÊN TÁC <span>▤</span></button></div><p class="choice-caption">Bản demo: chương mở màn, nhiều ký chủ, sự kiện giao thoa và lưu cục bộ.</p></div>';return;}
    if(state.phase==="dialogue"){var line=state.queue[state.lineIndex];if(!line){finishQueue();return;}bg(line.b||"hub",line.p);dialogue.classList.remove("hidden");$("speaker").textContent=line.s;$("lineCounter").textContent=String(state.lineIndex+1).padStart(2,"0")+" / "+String(state.queue.length).padStart(2,"0");$("dialogueHint").textContent="NHẤN ĐỂ TIẾP TỤC · SPACE ↵";type(line.t);var key=state.sequence+":"+state.lineIndex;if(state.lastLogged!==key){state.log.push({s:line.s,t:line.t});state.log=state.log.slice(-120);state.lastLogged=key;persist();}return;}
    if(state.phase==="selection"){renderSelection();return;}
    if(state.phase==="contact-choice"){renderContactChoice();return;}
    if(state.phase==="contract-prompt"){renderContractPrompt();return;}
    if(state.phase==="hub"){renderHub();return;}
    if(state.phase==="discovery-choice"){renderDiscovery();return;}
    if(state.phase==="event-choice"){renderEventChoice();return;}
    if(state.phase==="ending"){renderEnding();return;}
  }
  function type(t){fullText=t;var i=0;typing=true;$("dialogueText").textContent="";$("nextBtn").innerHTML='BỎ QUA <span>›</span>';var reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(reduced){finishTyping();return;}timer=setInterval(function(){i=Math.min(fullText.length,i+2);$("dialogueText").textContent=fullText.slice(0,i);if(i>=fullText.length)finishTyping();},22);}
  function finishTyping(){clearInterval(timer);typing=false;$("dialogueText").textContent=fullText;$("nextBtn").innerHTML='TIẾP <span>›</span>';}
  function next(){if(state.phase!=="dialogue")return;if(typing){finishTyping();return;}beep();if(state.lineIndex<state.queue.length-1){state.lineIndex++;persist();render();}else finishQueue();}
  function runLines(lines,after){state.phase="dialogue";state.queue=lines;state.lineIndex=0;state.after=after;state.sequence++;state.lastLogged="";persist();render();}
  function finishQueue(){var after=state.after;state.queue=[];state.lineIndex=0;state.after="";if(after==="selection")state.phase="selection";else if(after==="contactChoice")state.phase="contact-choice";else if(after==="contractPrompt")state.phase="contract-prompt";else if(after==="day4Discovery")state.phase="discovery-choice";else if(after==="eventChoice")state.phase="event-choice";else if(after==="ending")state.phase="ending";else state.phase="hub";persist();render();}
  function start(){state=fresh();runLines(S.intro,"selection");}
  function renderSelection(){
    bg("world");$("scenePortrait").innerHTML="";
    var cards=Object.keys(S.hosts).map(function(id){var h=S.hosts[id],chosen=state.contracts.indexOf(id)>=0;return '<button class="candidate'+(chosen?' selected':'')+'" data-action="contact" data-host="'+id+'" '+(chosen||state.contracts.length>=2?'disabled':'')+'><div class="candidate-portrait">'+portrait(id)+'</div><div class="candidate-body"><strong>'+esc(h.name)+'</strong><small>'+esc(h.realm)+'</small><small>'+esc(h.role)+'</small><em>'+(chosen?'ĐÃ KÝ KHẾ ƯỚC':'QUAN SÁT / LIÊN LẠC →')+'</em></div></button>';}).join("");
    content.innerHTML='<div class="screen-card wide"><div class="micro">HOST DETECTION / 03 MATCHES</div><h2 class="screen-heading">Ai sẽ trở thành ký chủ của ngươi?</h2><p class="screen-description">Mỗi người có đời sống, mục tiêu và cách đối thoại riêng. Ngươi có thể liên hệ tối đa hai người trong giai đoạn đầu.</p><div class="selection-grid">'+cards+'</div><div class="info-strip">◈ KHẾ ƯỚC: '+state.contracts.length+'/2 &nbsp; · &nbsp; Bản nguyên tác không ghi lại mọi chi tiết đời sống của họ.</div><button class="secondary-btn" data-action="hub">← '+(state.contracts.length?'TRỞ VỀ TRUNG TÂM':'TẠM BỎ QUA LỰA CHỌN')+'</button></div>';
  }
  function contact(id){if(!S.hosts[id]||state.contracts.includes(id)||state.contracts.length>=2)return;state.pendingHost=id;runLines(S.hosts[id].intro,"contactChoice");}
  function renderContactChoice(){var id=state.pendingHost,h=S.hosts[id];if(!h){state.phase="selection";render();return;}bg(id==="mac"?"market":id==="ta"?"mountain":"sect",id);var html='<div class="screen-card wide"><div class="micro">CONNECTION REQUEST / '+esc(h.name)+'</div><h2 class="screen-heading">Ngươi sẽ nói gì?</h2><p class="screen-description">'+esc(h.desc)+'</p><div class="button-stack">';h.options.forEach(function(o,i){html+='<button class="choice-btn" data-action="reply" data-option="'+i+'" '+(state.energy+o.energy<0?'disabled':'')+'><span><span class="choice-number">0'+(i+1)+'.</span>'+esc(o.label)+'</span><span>›</span></button>';});html+='</div><button class="secondary-btn" style="margin-top:12px" data-action="defer">TẠM HOÃN LIÊN LẠC ↗</button></div>';content.innerHTML=html;}
  function reply(i){var h=S.hosts[state.pendingHost],o=h&&h.options[i];if(!o)return;if(state.energy+o.energy<0){notify("Không đủ linh năng");return;}state.energy+=o.energy;state.trust[state.pendingHost]=Math.min(100,Math.max(0,state.trust[state.pendingHost]+o.trust));state.flags[o.flag]=true;runLines(o.reply,"contractPrompt");}
  function renderContractPrompt(){var id=state.pendingHost,h=S.hosts[id];if(!h){state.phase="selection";render();return;}bg(id==="mac"?"market":id==="ta"?"mountain":"sect",id);content.innerHTML='<div class="screen-card"><div class="micro">CONTRACT PROTOCOL / CONSENT</div><h2 class="screen-heading">Đề nghị khế ước với '+esc(h.name)+'</h2><p class="screen-description">Khế ước cần sự chấp thuận của ký chủ. Người chơi có thể giữ bí mật về những khế ước khác, nhưng bí mật ấy có thể bị tự phát hiện.</p><div class="button-stack"><button class="primary-btn" data-action="sign">ĐỀ NGHỊ KÝ KHẾ ƯỚC <span>↗</span></button><button class="secondary-btn" data-action="defer">ĐỂ HỌ SUY NGHĨ THÊM <span>↗</span></button></div></div>';}
  function sign(){var id=state.pendingHost;if(!id||state.contracts.includes(id)||state.contracts.length>=2)return;state.contracts.push(id);state.activeHost=id;state.pendingHost=null;state.flags["signed_"+id]=true;runLines(S.hosts[id].signed,"hub");}
  function defer(){state.pendingHost=null;state.phase=state.contracts.length?"hub":"selection";persist();render();}
  function renderHub(){
    bg("hub",state.activeHost);var remaining=Math.max(0,8-state.day),selected=state.activeHost&&S.hosts[state.activeHost];
    var tiles='<button class="hub-tile" data-action="talk" '+(!selected||state.flags.macDead&&state.activeHost==="mac"?'disabled':'')+'><i>☏</i><strong>LIÊN LẠC KÝ CHỦ</strong><small>'+(selected?esc(selected.name):'Chưa có ký chủ')+' · trò chuyện</small></button>';
    tiles+='<button class="hub-tile" data-action="gift" '+(!selected||state.energy<12||state.flags.macDead&&state.activeHost==="mac"?'disabled':'')+'><i>✧</i><strong>BAN THƯỞNG</strong><small>Tiêu hao 12 linh năng · tăng tín nhiệm</small></button>';
    tiles+='<button class="hub-tile" data-action="selection" '+(state.contracts.length>=2?'disabled':'')+'><i>♧</i><strong>TÌM KÝ CHỦ</strong><small>'+state.contracts.length+'/2 ô khế ước đã sử dụng</small></button>';
    tiles+='<button class="hub-tile" data-action="archive"><i>▤</i><strong>THƯ VIỆN NGUYÊN TÁC</strong><small>Biết nội dung gốc · không toàn tri hiện tại</small></button>';
    content.innerHTML='<div class="screen-card wide"><div class="micro">SYSTEM CONTROL / DAY '+String(state.day).padStart(2,"0")+'</div><h2 class="screen-heading">Không Gian Hệ Thống</h2><p class="screen-description">Ngươi có thể hỗ trợ nhiều ký chủ, nhưng mỗi người đều có lựa chọn và cuộc sống riêng. Lời hứa, bí mật và hành động của ngươi sẽ được thế giới ghi nhớ.</p><div class="hub-stats"><span class="hub-pill">◈ '+state.energy+' LINH NĂNG</span><span class="hub-pill">♧ '+state.contracts.length+' KHẾ ƯỚC</span><span class="hub-pill">◷ '+remaining+' NGÀY ĐẾN ĐẠI HỘI</span></div><div class="hub-tiles">'+tiles+'</div><div class="notice">'+(state.contracts.length===0?'Hiện chưa có ký chủ. Hãy tìm một người để mở các kênh liên lạc.':state.eventDone?'Sự kiện đại hội đã diễn ra. Bản demo kết thúc tại đây; các chương tiếp theo chưa được viết.':'Trước khi chuyển ngày, có thể nói chuyện hoặc ban thưởng cho ký chủ. Khi chuyển ngày, thế giới sẽ tiếp tục vận hành.')+'</div><div class="button-stack"><button class="primary-btn" data-action="advance" '+(state.contracts.length===0||state.eventDone?'disabled':'')+'>'+(state.day===7?'BƯỚC VÀO ĐẠI HỘI':'CHUYỂN SANG NGÀY TIẾP THEO')+' <span>↗</span></button></div></div>';
  }
  function talk(){var id=state.activeHost;if(!id||state.flags.macDead&&id==="mac")return;var h=S.hosts[id];runLines([h.talk[(state.day+state.trust[id])%h.talk.length]],"hub");}
  function gift(){var id=state.activeHost;if(!id||state.energy<12){notify("Không đủ linh năng hoặc chưa chọn ký chủ");return;}if(state.flags.macDead&&id==="mac")return;state.energy-=12;state.trust[id]=Math.min(100,state.trust[id]+5);runLines(S.hosts[id].gift,"hub");}
  function advance(){
    if(state.contracts.length===0){notify("Hãy ký ít nhất một khế ước trước");return;}
    if(state.eventDone){notify("Bản demo đã kết thúc ở Đại Hội Vấn Đạo");return;}
    if(state.day>=8)return;
    state.day++;state.energy=Math.min(200,state.energy+18);
    var lines,after="hub";
    if(state.day===8){lines=S.daily[7].slice();after="eventChoice";}
    else if(state.day===7){lines=[{s:"DẪN TRUYỆN",t:"Đêm cuối trước đại hội, những chiếc đèn lồng cháy suốt dọc con đường Thanh Vân Sơn. Ai cũng có điều muốn đạt được vào ngày mai.",b:"sect"},{s:"HỆ THỐNG",t:"[Đại Hội Vấn Đạo còn 1 ngày.] [Hãy cân nhắc cảnh báo ký chủ có nguy cơ tử kiếp.]",b:"sect"}];}
    else{lines=(S.daily[state.day]||[]).slice();if(state.day===4&&state.contracts.includes("lieu")&&state.contracts.includes("mac"))after="day4Discovery";}
    if(state.day===2&&state.contracts.includes("lieu"))lines.push({s:"LIỄU THANH HÒA",t:"Hệ thống, ta đã ăn đủ bữa hôm nay. Không biết tại sao lại muốn kể ngươi nghe chuyện nhỏ như vậy.",b:"sect",p:"lieu"});
    if(state.day===3&&state.contracts.includes("ta"))lines.push({s:"TẠ VẤN SƠN",t:"Ta muốn đọc thử ghi chép về Cửu Diệp Thanh Tâm. Đại hội thì cứ để đám trẻ tranh nhau.",b:"mountain",p:"ta"});
    if(state.day===5&&state.contracts.includes("mac"))lines.push({s:"MẶC TỪ",t:"Cuốn cổ thư ta cần đã được đưa về Thanh Vân. Hệ thống, ngươi có kế hoạch nào không cần đánh nhau không?",b:"market",p:"mac"});
    if(state.day===6&&state.contracts.includes("mac")&&!state.flags.macWarned)lines.push({s:"HỆ THỐNG",t:"[Cảnh báo: nguyên tác ghi nhận Mặc Từ tử vong trong Đại Hội. Ký chủ vẫn chưa được báo đầy đủ về tử kiếp.]",b:"event",p:"mac"});
    runLines(lines,after);
  }
  function renderDiscovery(){bg("market","lieu");content.innerHTML='<div class="screen-card wide"><div class="micro">CROSS-CONTRACT INCIDENT / DAY 04</div><h2 class="screen-heading">Một dấu ấn, hai khế ước</h2><p class="screen-description">Liễu Thanh Hòa nhìn thấy Mặc Từ sử dụng lá phù mang cùng dấu ấn hệ thống. Cùng lúc ấy, cả hai gọi ngươi qua kênh liên lạc.</p><div class="info-strip">LIỄU: “Vì sao hắn có pháp khí giống của ta?”<br>MẶC TỪ: “Này, cô nương kia cứ nhìn ta. Ngươi biết gì à?”</div><div class="button-stack"><button class="choice-btn" data-action="discovery" data-option="truth">01 · NÓI THẬT: Cả hai đều là ký chủ của ta. <span>›</span></button><button class="choice-btn" data-action="discovery" data-option="half">02 · NÓI MỘT PHẦN: Đây là dấu ấn pháp khí chung. <span>›</span></button><button class="choice-btn" data-action="discovery" data-option="silent">03 · GIỮ IM LẶNG: Để họ tự suy luận. <span>›</span></button></div></div>';}
  function discovery(k){var lines;if(k==="truth"){state.flags.sharedSecret="revealed";state.trust.lieu=Math.min(100,state.trust.lieu+7);state.trust.mac=Math.min(100,state.trust.mac+4);lines=[{s:"HỆ THỐNG",t:"[Đã thông báo về khế ước chung cho Liễu Thanh Hòa và Mặc Từ.]",b:"market"},{s:"LIỄU THANH HÒA",t:"...Hai người? Vậy ngươi cũng từng nói với hắn những lời như nói với ta?",b:"market",p:"lieu"},{s:"MẶC TỪ",t:"Khoan, vậy ta có được giảm giá khi mua đồ trong cửa hàng hệ thống không?",b:"market",p:"mac"}];}
    else if(k==="half"){state.flags.sharedSecret="suspected";lines=[{s:"HỆ THỐNG",t:"[Đã cung cấp giải thích một phần: pháp khí cùng xuất xứ có chung dấu ấn.]",b:"market"},{s:"LIỄU THANH HÒA",t:"Nghe có lý. Nhưng sao lúc nãy ngươi ngập ngừng?",b:"market",p:"lieu"},{s:"MẶC TỪ",t:"Ngươi nói không sai... nhưng cũng chẳng giống câu trả lời đầy đủ cho lắm.",b:"market",p:"mac"}];}
    else{state.flags.sharedSecret="hidden";lines=[{s:"DẪN TRUYỆN",t:"Hệ thống không trả lời. Hai người từ xa nhìn nhau giữa đám đông phường thị.",b:"market"},{s:"LIỄU THANH HÒA",t:"Nếu ngươi không nói... ta sẽ tự tìm hiểu.",b:"market",p:"lieu"},{s:"MẶC TỪ",t:"Ha. Hình như ta vừa phát hiện một chuyện hay ho.",b:"market",p:"mac"}];}
    runLines(lines,"hub");
  }
  function renderEventChoice(){bg("event","mac");var mac=state.contracts.includes("mac");content.innerHTML='<div class="screen-card wide"><div class="micro">ORIGINAL CHAPTER 136 / CRITICAL EVENT</div><h2 class="screen-heading">Người đáng lẽ phải chết</h2><p class="screen-description">'+(mac?'Mặc Từ đang bị cuốn vào cuộc tranh đoạt cổ kiếm. Lục Chiêu Dã tiến về phía sân đấu. Ngươi biết kết cục được viết trong nguyên tác.':'Mặc Từ — một ứng viên mà ngươi chưa ký — đang bị cuốn vào cuộc tranh đoạt cổ kiếm. Nguyên tác viết rằng hắn sẽ chết tại đây.')+'</p><div class="info-strip">[Cảnh báo] Chỉ có đủ thời gian để ra một quyết định. Không có cách nào chắc chắn kiểm soát toàn bộ nhân quả.</div><div class="button-stack"><button class="choice-btn" data-action="event" data-option="protect" '+(state.energy<30?'disabled':'')+'>01 · DÙNG 30 LINH NĂNG ĐỂ CAN THIỆP VÀ BẢO HỘ <span>›</span></button><button class="choice-btn" data-action="event" data-option="warn">02 · GỬI LỜI CẢNH BÁO, ĐỂ HỌ TỰ TÌM ĐƯỜNG THOÁT <span>›</span></button><button class="choice-btn" data-action="event" data-option="observe">03 · KHÔNG CAN THIỆP, QUAN SÁT NGUYÊN TÁC <span>›</span></button></div></div>';}
  function event(k){var mac=state.contracts.includes("mac"),lines=[];state.flags.intervention=k;state.eventDone=true;
    if(k==="protect"){if(state.energy<30){notify("Không đủ linh năng");return;}state.energy-=30;state.flags.macOutcome="saved";if(mac)state.trust.mac=Math.min(100,state.trust.mac+15);lines=[{s:"HỆ THỐNG",t:"[Tiêu hao 30 linh năng.] [Đã kích hoạt màn chắn khẩn cấp trong phạm vi khế ước tạm thời.]",b:"event",p:"mac"},{s:"DẪN TRUYỆN",t:"Kiếm quang xé gió, nhưng người đáng lẽ ngã xuống vẫn còn đứng. Mặc Từ lùi lại, đôi mắt lần đầu không còn vẻ lười biếng.",b:"event",p:"mac"},{s:"MẶC TỪ",t:"...Hệ thống. Món nợ này ta nhớ.",b:"event",p:"mac"},{s:"HỆ THỐNG",t:"[Đối chiếu nguyên tác: Mặc Từ tử vong.] [Hiện tại: Mặc Từ còn sống.] [Nhân quả đã phân nhánh.]",b:"event"}];}
    else if(k==="warn"){state.flags.macOutcome="escaped";lines=[{s:"HỆ THỐNG",t:"[Đã truyền cảnh báo về tử kiếp. Không cưỡng ép hành động cá thể.]",b:"event"},{s:"DẪN TRUYỆN",t:"Mặc Từ nghe thấy cảnh báo, cắn răng bỏ cổ thư và chạy về phía lối phụ. Hắn thoát được, nhưng bị thương và mất thứ mình đến tìm.",b:"event",p:"mac"},{s:"MẶC TỪ",t:"Thứ kia còn có thể tìm lại. Mạng thì không. ...Ngươi nói đúng, lần này ta nợ ngươi.",b:"event",p:"mac"},{s:"HỆ THỐNG",t:"[Hiện tại: Mặc Từ còn sống, bị thương.] [Cổ thư: thất lạc.] [Nguyên tác đã sai lệch.]",b:"event"}];}
    else{state.flags.macOutcome="dead";if(mac)state.flags.macDead=true;lines=[{s:"DẪN TRUYỆN",t:"Kiếm quang rơi xuống giữa tiếng hô hoán. Giống như trong những trang sách, một ma tu vô danh ngã xuống bên thềm đá.",b:"event",p:"mac"},{s:"HỆ THỐNG",t:"[Đối chiếu nguyên tác: phù hợp.] [Mặc Từ đã tử vong.] [Một khế ước đã chấm dứt.] ",b:"event"},{s:"DẪN TRUYỆN",t:"Đại hội vẫn tiếp diễn. Nhưng giờ đây ngươi hiểu rằng biết trước một cái chết và quyết định không thay đổi nó là hai chuyện khác nhau.",b:"event"}];}
    lines.push({s:"KÝ ỨC",t:"...Đừng để những cái tên ấy... biến mất không một ai nhớ...",b:"void"});
    lines.push({s:"HỆ THỐNG",t:"[Nhiệm vụ cấp cao: phát hiện mảnh ký ức mới.] [Trạng thái: vẫn bị niêm phong.] [Đã ghi nhận diễn biến của một cá thể ngoài nguyên tác ban đầu.]",b:"void"});
    runLines(lines,"ending");
  }
  function renderEnding(){bg("void");$("scenePortrait").innerHTML="";var outcome=state.flags.macOutcome==="dead"?"Mặc Từ đã chết đúng như nguyên tác.":state.flags.macOutcome==="saved"?"Mặc Từ đã sống sót nhờ can thiệp trực tiếp.":"Mặc Từ đã thoát khỏi tử kiếp nhưng đánh mất cổ thư.";content.innerHTML='<div class="screen-card"><div class="micro">DEMO / CHAPTER 00 COMPLETE</div><div class="ornament">✦ · ◈ · ✦</div><h2 class="main-title">NGOẠI TRUYỆN<br>ĐÃ BẮT ĐẦU</h2><p class="sub-title">'+esc(outcome)+' Các ký chủ khác sẽ còn những câu chuyện riêng. Nhiệm vụ thật sự của ngươi vẫn chưa được khôi phục.</p><div class="info-strip">Bản thử nghiệm kết thúc tại Đại Hội Vấn Đạo. Các chương tiếp theo, bộ nguyên tác hoàn chỉnh và hệ thống tu luyện sâu sẽ được phát triển sau.</div><div class="button-stack"><button class="primary-btn" data-action="hub">TRỞ VỀ TRUNG TÂM <span>↗</span></button><button class="secondary-btn" data-action="restart">CHƠI LẠI TỪ ĐẦU <span>↺</span></button></div></div>';}
  function modal(title,html){$("modalTitle").textContent=title;$("modalBody").innerHTML=html;$("modal").classList.remove("hidden");$("modalClose").focus();}
  function closeModal(){$("modal").classList.add("hidden");}
  function showArchive(){
    var entries=S.archive.map(function(o){return '<div class="archive-entry"><small>'+esc(o.meta)+'</small><br><strong>'+esc(o.title)+'</strong><p>'+esc(o.body)+'</p></div>';}).join("");
    if(state.flags.macOutcome)entries+='<div class="archive-entry"><small>DIỄN BIẾN HIỆN TẠI</small><br><strong>Đại Hội Vấn Đạo — Kết quả thay đổi</strong><p>'+esc(state.flags.macOutcome==="dead"?"Mặc Từ tử vong như nguyên tác.":state.flags.macOutcome==="saved"?"Mặc Từ đã được cứu và còn sống.":"Mặc Từ thoát chết nhưng mất cổ thư.")+'</p></div>';
    modal("Thư Viện Nguyên Tác",'<p class="modal-intro">Hệ thống nắm toàn bộ 1.286 chương của tiểu thuyết trong thế giới truyện. Đây là mục lục bản demo gồm những trích lục quan trọng, không phải toàn văn tiểu thuyết.</p>'+entries);
  }
  function showLog(){var html=state.log.length?state.log.slice(-50).map(function(o){return '<div class="log-item"><strong>'+esc(o.s)+'</strong> — '+esc(o.t)+'</div>';}).join(""):'<p class="modal-intro">Chưa có hội thoại nào.</p>';modal("Nhật Ký Hội Thoại",html);}
  function switchHost(id){if(!state.contracts.includes(id))return;if(state.phase==="dialogue"){notify("Hãy đọc xong đoạn hội thoại hiện tại");return;}state.activeHost=id;state.phase="hub";persist();render();}
  function toHub(){if(state.phase==="dialogue"){notify("Hãy đọc xong đoạn hội thoại hiện tại");return;}if(state.phase==="title"){start();return;}state.phase=state.contracts.length?"hub":"selection";persist();render();}
  function restart(){if(window.confirm("Xóa tiến trình bản demo và bắt đầu lại từ đầu?")){state=fresh();persist();render();notify("Đã tạo tiến trình mới");}}
  document.addEventListener("click",function(e){
    var b=e.target.closest("[data-action]");if(!b)return;var a=b.dataset.action;
    if(a==="start")start();else if(a==="selection"){state.phase="selection";persist();render();}
    else if(a==="contact")contact(b.dataset.host);else if(a==="reply")reply(Number(b.dataset.option));
    else if(a==="sign")sign();else if(a==="defer")defer();else if(a==="hub")toHub();
    else if(a==="talk")talk();else if(a==="gift")gift();else if(a==="advance")advance();
    else if(a==="discovery")discovery(b.dataset.option);else if(a==="event")event(b.dataset.option);
    else if(a==="archive")showArchive();else if(a==="switch")switchHost(b.dataset.host);
    else if(a==="restart")restart();
  });
  $("dialogue").addEventListener("click",function(e){if(e.target.closest("#nextBtn"))return;next();});
  $("nextBtn").addEventListener("click",next);
  $("continueBtn").addEventListener("click",function(){if(state.phase==="dialogue")next();else if(state.phase==="title")start();else if(state.phase==="hub")advance();else if(state.phase==="selection")notify("Chọn một ứng viên để bắt đầu liên lạc");else toHub();});
  $("archiveBtn").addEventListener("click",showArchive);$("logBtn").addEventListener("click",showLog);
  $("saveBtn").addEventListener("click",function(){persist();notify("Đã lưu tiến trình trong trình duyệt");});
  $("settingsBtn").addEventListener("click",function(){sound=!sound;$("settingsBtn").textContent=sound?"♫":"♪";notify(sound?"Đã bật âm thanh UI":"Đã tắt âm thanh UI");beep();});
  $("modalClose").addEventListener("click",closeModal);
  $("modal").addEventListener("click",function(e){if(e.target===$("modal"))closeModal();});
  document.addEventListener("keydown",function(e){
    if(e.key==="Escape"&&!$("modal").classList.contains("hidden")){closeModal();return;}
    if(!$("modal").classList.contains("hidden"))return;
    if(state.phase==="dialogue"&&(e.key===" "||e.key==="Enter")){e.preventDefault();next();}
    if((state.phase==="contact-choice"||state.phase==="discovery-choice"||state.phase==="event-choice")&&/^[1-3]$/.test(e.key)){var buttons=content.querySelectorAll(".choice-btn");if(buttons[Number(e.key)-1]&&!buttons[Number(e.key)-1].disabled)buttons[Number(e.key)-1].click();}
  });
  if(state.phase==="dialogue"&&(!Array.isArray(state.queue)||!state.queue.length))state.phase=state.contracts.length?"hub":"selection";
  render();
})();