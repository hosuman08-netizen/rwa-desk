
(function(){
  var cards=[
    {t:'RWA란?',b:'실물 자산을 온체인으로 표현한 토큰. 학습용 설명이며 투자 권유 아님.'},
    {t:'리스크',b:'유동성·규제·수탁·스마트컨트랙트 리스크를 항상 같이 읽기.'},
    {t:'고지',b:'수익 보장 문구는 위험 신호. 공식 문서·면허부터.'}
  ];
  var i=0; var root=document.getElementById('app');
  function render(){
    var c=cards[i];
    root.innerHTML='<div class="card" style="color:#67e8f9;font-size:12px">교육 전용 · 투자 권유 아님</div><div class="card"><h2 style="color:var(--gold)">'+c.t+'</h2><p style="margin-top:10px">'+c.b+'</p><div class="row" style="margin-top:12px"><button id="prev" class="sec">이전</button><button id="next">다음</button></div><div class="sub">'+(i+1)+'/'+cards.length+'</div></div>';
    document.getElementById('prev').onclick=function(){i=(i+cards.length-1)%cards.length;render();};
    document.getElementById('next').onclick=function(){i=(i+1)%cards.length;render();try{legionTrack('activate',{i:i})}catch(e){}};
    if(!document.getElementById('shareCard')){
      var b=document.createElement('button'); b.id='shareCard'; b.className='sec'; b.style.marginTop='8px'; b.style.width='100%';
      b.textContent='카드 문구 복사'; b.onclick=function(){var c=cards[i];var text=c.t+': '+c.b+' · https://hosuman08-netizen.github.io/rwa-desk/';
        if(navigator.clipboard)navigator.clipboard.writeText(text);try{legionTrack('share_peak',{})}catch(e){}};
      root.appendChild(b);
    }
  }
  try{legionTrack('session_start',{})}catch(e){}
  render();
})();
