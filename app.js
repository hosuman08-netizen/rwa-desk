
(function(){
  // Finance dual-track: education only · 투자 권유 아님
  var cards=[
    {t:'RWA란?',b:'실물 자산을 온체인으로 표현한 토큰. 학습용 설명이며 투자 권유 아님.'},
    {t:'리스크',b:'유동성·규제·수탁·스마트컨트랙트 리스크를 항상 같이 읽기.'},
    {t:'고지',b:'수익 보장 문구는 위험 신호. 공식 문서·면허부터.'},
    {t:'유동성',b:'장외·락업·2차시장 깊이 부족 시 원하는 가격에 못 팔 수 있음.'},
    {t:'수탁',b:'실물 보관·감사 주체가 누구인지, 파산 시 청구권 구조를 확인.'},
    {t:'규제',b:'관할·라이선스·대상 투자자 제한이 상품마다 다름. 미고지=회피.'},
    {t:'가격 오라클',b:'실물 평가·지수 피드 지연·조작 가능 지점을 문서에서 확인. 교육용.'},
    {t:'환금성',b:'온체인 토큰 ≠ 즉시 현금. 청약·환매 창·수수료 스케줄을 먼저.'}
  ];
  var i=+(localStorage.getItem('rwa_i')||0); if(i>=cards.length)i=0;
  var seen=+(localStorage.getItem('rwa_seen')||0);
  var root=document.getElementById('app');
  function dayKey(off){var d=new Date();d.setDate(d.getDate()+(off||0));return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
  function markRead(idx){
    try{
      var r=JSON.parse(localStorage.getItem('rwa_read')||'{}');
      r[idx]=1; localStorage.setItem('rwa_read',JSON.stringify(r));
    }catch(e){}
  }
  function readCount(){
    try{return Object.keys(JSON.parse(localStorage.getItem('rwa_read')||'{}')).length;}catch(e){return 0;}
  }
  function bumpStreak(){
    try{
      var st=JSON.parse(localStorage.getItem('rwa_streak')||'{}');
      var t=dayKey(0); if(st.last===t) return st.count||0;
      st.count=(st.last===dayKey(-1))?(st.count||0)+1:1; st.last=t;
      localStorage.setItem('rwa_streak',JSON.stringify(st)); return st.count;
    }catch(e){return 0;}
  }
  function todayN(){try{return +(localStorage.getItem('rwa_day_'+dayKey(0))||0);}catch(e){return 0;}}
  function bumpToday(){try{localStorage.setItem('rwa_day_'+dayKey(0),String(todayN()+1));}catch(e){}}
  function fomoLeft(){var e=new Date();e.setHours(24,0,0,0);var ms=Math.max(0,e-Date.now());return Math.floor(ms/3600000)+'h '+Math.floor((ms%3600000)/60000)+'m';}
  function understood(){try{return JSON.parse(localStorage.getItem('rwa_ok')||'{}');}catch(e){return{};}}
  function firstUnread(){
    try{
      var r=JSON.parse(localStorage.getItem('rwa_read')||'{}');
      for(var k=0;k<cards.length;k++) if(!r[k]) return k;
    }catch(e){}
    return -1;
  }
  function render(){
    var c=cards[i];
    var sc=0; try{sc=(JSON.parse(localStorage.getItem('rwa_streak')||'{}').count)||0;}catch(e){}
    var rc=readCount();
    var pct=Math.round(rc/cards.length*100);
    markRead(i);
    var ok=understood();
    var okN=Object.keys(ok).length;
    root.innerHTML='<div class="card" style="color:#67e8f9;font-size:12px">교육 전용 · 정진 · 투자 권유 아님 · 투명 금융</div>'
      +'<div class="card"><span class="chip">🔥 '+sc+'일</span> <span class="chip">오늘 '+todayN()+'장</span> <span class="chip">열람 '+seen+'</span> <span class="chip">커버 '+rc+'/'+cards.length+'</span> <span class="chip">이해체크 '+okN+'</span> <span class="chip">창 '+fomoLeft()+'</span></div>'
      +'<div class="card"><div style="height:6px;background:#1c1826;border-radius:4px;overflow:hidden;margin-bottom:10px"><i style="display:block;height:100%;width:'+pct+'%;background:#67e8f9"></i></div>'
      +'<h2 style="color:var(--gold)">'+c.t+'</h2><p style="margin-top:10px">'+c.b+'</p>'
      +'<label style="display:flex;gap:8px;margin-top:12px;font-size:13px;cursor:pointer"><input type="checkbox" id="gotIt" '+(ok[i]?'checked':'')+'/> 이해했어요 (로컬)</label>'
      +'<div class="row" style="margin-top:12px"><button id="prev" class="sec">이전</button><button id="next">다음</button><button class="sec" id="jumpUnread">미열람 점프</button></div>'
      +'<div class="sub">'+(i+1)+'/'+cards.length+' · 커버리지 '+pct+'%</div>'
      +'<div class="row" style="flex-wrap:wrap;gap:4px;margin-top:8px">'+cards.map(function(x,idx){
        var read=false; try{read=!!JSON.parse(localStorage.getItem('rwa_read')||'{}')[idx];}catch(e){}
        return '<button class="sec" data-j="'+idx+'" style="padding:4px 8px;font-size:11px;opacity:'+(read?'.55':'1')+(idx===i?';border-color:#67e8f9':'')+'">'+(idx+1)+'</button>';
      }).join('')+'</div></div>'
      +'<button id="shareCard" class="sec" style="width:100%;margin-top:8px">카드 문구 복사</button>'
      +(rc>=cards.length?'<div style="margin-top:10px;padding:10px;border:1px solid #67e8f944;border-radius:12px;text-align:center"><p class="sub" style="margin:0 0 6px">✨ 전체 카드 1회 이상 열람</p><button id="shareAll" class="sec">진행 공유</button></div>':'')
      +'<div id="moneyPipe" style="margin-top:12px;padding:10px;border:1px solid #67e8f944;border-radius:12px;background:#121820;text-align:center;font-size:12px">'
      +'<div style="color:#67e8f9;font-weight:700;margin-bottom:4px">💎 투명 금융 크로스</div>'
      +'<a style="color:#ece8f1;margin:0 6px" href="https://hosuman08-netizen.github.io/fund-card/?utm_source=rwa&utm_medium=pipe">📋 Fund Card</a>'
      +'<a style="color:#ece8f1;margin:0 6px" href="https://hosuman08-netizen.github.io/etf-flow/?utm_source=rwa&utm_medium=pipe">📈 ETF Flow</a>'
      +'<a style="color:#e0b552;margin:0 6px" href="https://hosuman08-netizen.github.io/legion-hub/?utm_source=rwa&utm_medium=pipe">🎮 Arcade</a></div>';
    document.getElementById('gotIt').onchange=function(){
      var o=understood();
      if(document.getElementById('gotIt').checked) o[i]=1; else delete o[i];
      localStorage.setItem('rwa_ok',JSON.stringify(o));
      try{legionTrack('understood',{i:i})}catch(e){}
    };
    document.getElementById('prev').onclick=function(){
      i=(i+cards.length-1)%cards.length; localStorage.setItem('rwa_i',i); render();
    };
    document.getElementById('next').onclick=function(){
      i=(i+1)%cards.length; localStorage.setItem('rwa_i',i);
      seen++; localStorage.setItem('rwa_seen',seen); bumpToday(); bumpStreak();
      render(); try{legionTrack('activate',{i:i,seen:seen})}catch(e){}
    };
    document.getElementById('jumpUnread').onclick=function(){
      var u=firstUnread(); if(u<0){return;} i=u; localStorage.setItem('rwa_i',i); render();
    };
    Array.prototype.forEach.call(document.querySelectorAll('[data-j]'),function(b){
      b.onclick=function(){i=+b.getAttribute('data-j'); localStorage.setItem('rwa_i',i); render();};
    });
    document.getElementById('shareCard').onclick=function(){
      var text=c.t+': '+c.b+' · 교육용(투자권유 아님) · https://hosuman08-netizen.github.io/rwa-desk/';
      if(navigator.clipboard)navigator.clipboard.writeText(text); try{legionTrack('share_peak',{})}catch(e){}
    };
    var sa=document.getElementById('shareAll');
    if(sa) sa.onclick=function(){
      var text='RWA desk 커버 '+rc+'/'+cards.length+' · 이해 '+okN+' · 교육용 · https://hosuman08-netizen.github.io/rwa-desk/';
      if(navigator.clipboard)navigator.clipboard.writeText(text); try{legionTrack('share_peak',{all:1})}catch(e){}
    };
  }
  try{legionTrack('session_start',{})}catch(e){}
  render();

/* LEGION_WAVE_27_share_counter */
document.addEventListener('click',function(ev){try{var el=ev.target;if(!el)return;var tx=(el.textContent||'')+(el.id||'');if(/share|copy/i.test(tx)||/\uacf5\uc720|\ubcf5\uc0ac/.test(tx)){localStorage.setItem('lw_p33_rwa_stor_share_counter',String((+(localStorage.getItem('lw_p33_rwa_stor_share_counter')||0))+1));}}catch(e){}},true);
})();
/* LEGION_WAVE_72_pipe_ensure */ /* pipe already present wave 72 */
