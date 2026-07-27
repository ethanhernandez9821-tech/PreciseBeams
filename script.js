const links=[...document.querySelectorAll('[data-page-link]')];
const pages=[...document.querySelectorAll('[data-page]')];

function showPage(name){
  if(!pages.some(page=>page.dataset.page===name)) name='home';
  pages.forEach(page=>page.classList.toggle('active',page.dataset.page===name));
  links.forEach(link=>link.classList.toggle('active',link.dataset.pageLink===name));
  if(location.hash!==`#${name}`) history.replaceState(null,'',`#${name}`);
  scrollTo({top:0,behavior:'instant'});
}

links.forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();
  showPage(link.dataset.pageLink);
}));
showPage(location.hash.slice(1)||'home');
addEventListener('hashchange',()=>showPage(location.hash.slice(1)||'home'));

const generatorCard=document.querySelector('.gen-card');
if(generatorCard){
  const openGenerator=()=>location.href='https://app.beamse.pro/gen/PreciseBeams';
  generatorCard.setAttribute('role','link');
  generatorCard.setAttribute('tabindex','0');
  generatorCard.setAttribute('aria-label','Open Ultima generator');
  generatorCard.addEventListener('click',openGenerator);
  generatorCard.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){
      event.preventDefault();
      openGenerator();
    }
  });
}

let audioContext;
function enableSound(){
  const AudioContext=window.AudioContext||window.webkitAudioContext;
  if(!AudioContext) return;
  audioContext ||= new AudioContext();
  if(audioContext.state==='suspended') audioContext.resume();
}
function tone(from,to,duration,volume){
  if(!audioContext||audioContext.state!=='running') return;
  const oscillator=audioContext.createOscillator();
  const gain=audioContext.createGain();
  const now=audioContext.currentTime;
  oscillator.type='sine';
  oscillator.frequency.setValueAtTime(from,now);
  oscillator.frequency.exponentialRampToValueAtTime(to,now+duration);
  gain.gain.setValueAtTime(0.0001,now);
  gain.gain.exponentialRampToValueAtTime(volume,now+.008);
  gain.gain.exponentialRampToValueAtTime(0.0001,now+duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now+duration+.01);
}
addEventListener('pointerdown',enableSound,{once:true});
addEventListener('keydown',enableSound,{once:true});

const interactive=document.querySelectorAll('a,button,.gen-card,.stats article,.term-list article,.tutorial-card');
interactive.forEach(element=>{
  let lastHover=0;
  element.addEventListener('pointerenter',()=>{
    const now=performance.now();
    if(now-lastHover>90){
      tone(420,600,.045,.012);
      lastHover=now;
    }
  });
  element.addEventListener('click',()=>tone(620,360,.06,.017));
});

const orb=document.querySelector('.cursor-orb');
if(orb&&matchMedia('(pointer: fine)').matches){
  let tx=innerWidth/2,ty=innerHeight/2,x=tx,y=ty;
  addEventListener('mousemove',event=>{
    tx=event.clientX;
    ty=event.clientY;
    orb.classList.add('visible');
  });
  addEventListener('mouseleave',()=>orb.classList.remove('visible'));
  const draw=()=>{
    x+=(tx-x)*.16;
    y+=(ty-y)*.16;
    orb.style.transform=`translate3d(${x}px,${y}px,0)`;
    requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw);
}
