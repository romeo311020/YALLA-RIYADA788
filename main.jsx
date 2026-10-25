import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Activity, ArrowLeft, ArrowRight, Bell, CalendarDays, ChevronLeft, CircleHelp,
  Clock3, Flame, Home, Languages, Menu, Search, ShoppingBag, Sparkles, Trophy,
  UserRound, Volleyball, X, Zap, Newspaper, ChevronDown, Play, MessageCircle,
  Filter, Star, ExternalLink
} from 'lucide-react';
import './styles.css';

const sports = ['الكل','كرة القدم','كرة السلة','التنس','كرة اليد','الكرة الطائرة'];
const matches = [
  { sport:'كرة القدم', league:'الدوري الإنجليزي', time:'18:30', status:'اليوم', home:'مانشستر سيتي', away:'ليفربول', homeIcon:'🔵', awayIcon:'🔴', color:'blue' },
  { sport:'كرة القدم', league:'الدوري الإسباني', time:'21:00', status:'اليوم', home:'ريال مدريد', away:'برشلونة', homeIcon:'⚪', awayIcon:'🔴', color:'gold' },
  { sport:'كرة السلة', league:'NBA', time:'22:15', status:'اليوم', home:'ليكرز', away:'واريرز', homeIcon:'🟣', awayIcon:'🔵', color:'purple' },
  { sport:'التنس', league:'بطولة دولية', time:'19:45', status:'اليوم', home:'المباراة 1', away:'المباراة 2', homeIcon:'🎾', awayIcon:'🎾', color:'green' },
  { sport:'كرة اليد', league:'بطولة الأندية', time:'20:00', status:'غدًا', home:'الأهلي', away:'الزمالك', homeIcon:'🔴', awayIcon:'⚪', color:'red' },
  { sport:'الكرة الطائرة', league:'الدوري المحلي', time:'17:00', status:'غدًا', home:'الفريق الأول', away:'الفريق الثاني', homeIcon:'🏐', awayIcon:'🏐', color:'orange' },
];
const news = [
  { tag:'كرة القدم', title:'كل أخبار الرياضة في مكان واحد', text:'تابع آخر المستجدات والنتائج والتحليلات من عالم الرياضة.', image:'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=85', time:'منذ 15 دقيقة' },
  { tag:'تحليلات', title:'الأرقام تحكي القصة قبل صافرة البداية', text:'نظرة أعمق على الأداء والإحصائيات قبل المواجهات الكبيرة.', image:'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85', time:'منذ ساعة' },
  { tag:'لياقة', title:'التدريب الذكي يبدأ بالمعلومة الصحيحة', text:'نصائح ومحتوى رياضي يساعدك على فهم اللعبة بشكل أفضل.', image:'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=85', time:'منذ ساعتين' },
];
const products = [
  { name:'كرة تدريب احترافية', brand:'SPORT PRO', price:'السعر عند البائع', emoji:'⚽', bg:'mint' },
  { name:'حذاء رياضي للأداء', brand:'RUN ACTIVE', price:'السعر عند البائع', emoji:'👟', bg:'lavender' },
  { name:'زجاجة مياه رياضية', brand:'HYDRO FIT', price:'السعر عند البائع', emoji:'🥤', bg:'peach' },
  { name:'حقيبة معدات رياضية', brand:'ATHLETE', price:'السعر عند البائع', emoji:'🎒', bg:'sky' },
];

function Brand() {
  return <NavLink to="/" className="brand"><img src="/logo.svg" alt="شعار يلا رياضة" /><span><b>يلا رياضة</b><small>YALLA RIYADA</small></span></NavLink>;
}
function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navItems = [
    ['/', 'الرئيسية', Home], ['/matches','المباريات',Trophy], ['/news','الأخبار',Newspaper],
    ['/assistant','المساعد الذكي',Sparkles], ['/store','المتجر',ShoppingBag], ['/profile','حسابي',UserRound]
  ];
  return <header className="topbar">
    <div className="topbar-inner">
      <Brand />
      <nav className={open ? 'main-nav opened' : 'main-nav'}>
        {navItems.map(([to,label,Icon]) => <NavLink key={to} to={to} end={to==='/'} onClick={()=>setOpen(false)} className={({isActive})=>isActive?'nav-link active':'nav-link'}><Icon size={17}/>{label}</NavLink>)}
      </nav>
      <div className="top-actions">
        <button className="icon-btn search-toggle" aria-label="بحث" onClick={()=>setSearchOpen(!searchOpen)}><Search size={19}/></button>
        <button className="icon-btn notification" aria-label="الإشعارات"><Bell size={19}/><i /></button>
        <button className="lang-btn"><Languages size={16}/> EN</button>
        <button className="mobile-menu icon-btn" aria-label="فتح القائمة" onClick={()=>setOpen(!open)}>{open?<X size={21}/>:<Menu size={21}/>}</button>
      </div>
    </div>
    {searchOpen && <div className="search-panel"><Search size={18}/><input autoFocus placeholder="ابحث عن فريق، لاعب، بطولة أو خبر..." /><button onClick={()=>setSearchOpen(false)}><X size={18}/></button></div>}
  </header>;
}
function PageIntro({eyebrow,title,description,icon:Icon}) {
 return <div className="page-intro"><div><div className="eyebrow">{Icon&&<Icon size={15}/>} {eyebrow}</div><h1>{title}</h1><p>{description}</p></div></div>;
}
function SectionTitle({title,subtitle,link,to='/matches'}) {
 return <div className="section-title"><div><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div>{link&&<NavLink to={to} className="text-link">{link}<ChevronLeft size={16}/></NavLink>}</div>;
}
function MatchCard({m}) {
 return <article className="match-card"><div className="match-top"><span className="league-dot"></span><span>{m.league}</span><span className="match-status">{m.status}</span></div><div className="match-teams"><div className="team"><span className={`team-logo ${m.color}`}>{m.homeIcon}</span><b>{m.home}</b></div><div className="match-time"><strong>{m.time}</strong><small>توقيت القاهرة</small><span>VS</span></div><div className="team"><span className={`team-logo ${m.color}`}>{m.awayIcon}</span><b>{m.away}</b></div></div><div className="match-bottom"><span><Clock3 size={14}/> لم تبدأ بعد</span><button className="small-outline">التفاصيل <ChevronLeft size={14}/></button></div></article>;
}
function HomePage() {
 const navigate=useNavigate();
 return <><section className="hero"><div className="hero-content"><div className="hero-chip"><span className="live-dot"></span> عالم الرياضة بين إيديك</div><h1>عِش كل لحظة.<br/><span>عِش الرياضة.</span></h1><p>من المباريات والنتائج إلى الأخبار والتحليلات والمعدات الرياضية — كل اللي بتحبه في منصة واحدة.</p><div className="hero-actions"><button className="primary-btn" onClick={()=>navigate('/matches')}>اكتشف المباريات <ArrowLeft size={18}/></button><button className="ghost-btn" onClick={()=>navigate('/assistant')}><Sparkles size={17}/> اسأل المساعد الذكي</button></div><div className="hero-stats"><div><b>كل الألعاب</b><small>مش كرة قدم بس</small></div><div><b>تجربة واحدة</b><small>لكل عشاق الرياضة</small></div><div><b>24/7</b><small>محتوى رياضي</small></div></div></div><div className="hero-visual"><div className="hero-glow"></div><div className="hero-photo"></div><div className="floating-score"><span className="live-dot"></span><div><b>مستعد للمواجهة؟</b><small>تابع المباريات لحظة بلحظة</small></div><Trophy size={24}/></div><div className="floating-tag"><Zap size={15} fill="currentColor"/> طاقة الرياضة</div></div></section>
 <main className="content-wrap"><div className="quick-grid"><button onClick={()=>navigate('/matches')} className="quick-card"><span className="quick-icon blue-bg"><CalendarDays/></span><span><b>جدول المباريات</b><small>مواعيد ونتائج</small></span><ChevronLeft/></button><button onClick={()=>navigate('/news')} className="quick-card"><span className="quick-icon orange-bg"><Flame/></span><span><b>آخر الأخبار</b><small>كل جديد في الرياضة</small></span><ChevronLeft/></button><button onClick={()=>navigate('/assistant')} className="quick-card"><span className="quick-icon violet-bg"><Sparkles/></span><span><b>المساعد الذكي</b><small>اسأل عن أي رياضة</small></span><ChevronLeft/></button><button onClick={()=>navigate('/store')} className="quick-card"><span className="quick-icon green-bg"><ShoppingBag/></span><span><b>المتجر الرياضي</b><small>اكتشف المنتجات</small></span><ChevronLeft/></button></div>
 <section className="section-block"><SectionTitle title="المباريات القادمة" subtitle="اختار رياضتك وتابع أهم المواجهات" link="كل المباريات"/><SportTabs selected="الكل"/><div className="match-grid">{matches.slice(0,3).map((m,i)=><MatchCard m={m} key={i}/>)}</div></section>
 <section className="section-block"><SectionTitle title="من عالم الرياضة" subtitle="محتوى رياضي متنوع يهمك" link="كل الأخبار" to="/news"/><div className="news-grid">{news.filter(n=>!n.image.includes('photo-151746＊')).map((n,i)=><NewsCard n={n} key={i}/>)}</div></section>
 <section className="section-block"><SectionTitle title="اختيارات رياضية" subtitle="معدات وأدوات تساعدك في رحلتك" link="تصفح المتجر" to="/store"/><ProductGrid items={products.slice(0,3)}/></section></main></>;
}
function SportTabs({selected,onSelect}) {
 const [current,setCurrent]=useState(selected||'الكل');
 return <div className="sport-tabs">{sports.map(s=><button key={s} onClick={()=>{setCurrent(s);onSelect?.(s)}} className={current===s?'sport-tab selected':'sport-tab'}>{s}</button>)}</div>;
}
function MatchesPage() {
 const [sport,setSport]=useState('الكل'); const [day,setDay]=useState('اليوم');
 const filtered=matches.filter(m=>(sport==='الكل'||m.sport===sport)&&(day==='الكل'||m.status===day));
 return <main className="content-wrap page-content"><PageIntro eyebrow="جدول المواجهات" title="المباريات والنتائج" description="تابع مواعيد أهم المواجهات في مختلف الرياضات، من مكان واحد." icon={Trophy}/><div className="filter-row"><div className="day-tabs">{['أمس','اليوم','غدًا','الكل'].map(d=><button className={day===d?'day-tab active':'day-tab'} key={d} onClick={()=>setDay(d)}>{d}</button>)}</div><span className="filter-label"><Filter size={16}/> تصفية حسب الرياضة</span></div><SportTabs selected={sport} onSelect={setSport}/><div className="match-grid">{filtered.length?filtered.map((m,i)=><MatchCard m={m} key={i}/>):<div className="empty-state">لا توجد مباريات تجريبية في هذا الاختيار حاليًا.</div>}</div><p className="demo-note">ملاحظة: المواعيد المعروضة حاليًا بيانات تجريبية وليست نتائج مباشرة.</p></main>;
}
function NewsCard({n}) {
 return <article className="news-card"><div className="news-image" style={{backgroundImage:`linear-gradient(0deg,rgba(10,15,23,.72),transparent 65%),url("${n.image}")`}}><span>{n.tag}</span></div><div className="news-body"><small>{n.time}</small><h3>{n.title}</h3><p>{n.text}</p><button className="read-more">اقرأ المزيد <ArrowLeft size={15}/></button></div></article>;
}
function NewsPage() {
 return <main className="content-wrap page-content"><PageIntro eyebrow="من قلب الحدث" title="أخبار الرياضة" description="تابع الأخبار والتحليلات والمحتوى الرياضي من مختلف الألعاب." icon={Newspaper}/><div className="news-grid news-grid-large">{news.filter(n=>!n.image.includes('photo-151746＊')).map((n,i)=><NewsCard n={n} key={i}/>)}</div><div className="notice-card"><Activity size={22}/><div><b>الأخبار المعروضة نموذج تجريبي</b><p>سيتم ربط المنصة بمصدر أخبار موثوق في مرحلة التطوير التالية.</p></div></div></main>;
}
function AssistantPage() {
 const [messages,setMessages]=useState([{from:'ai',text:'أهلًا بيك في المساعد الرياضي! ⚡ اسألني عن القواعد، الفرق، اللاعبين، البطولات أو أي رياضة بتحبها.'}]); const [value,setValue]=useState('');
 const send=()=>{if(!value.trim())return;setMessages(m=>[...m,{from:'user',text:value.trim()},{from:'ai',text:'وصل سؤالك! واجهة المساعد جاهزة، لكن الإجابات الذكية تحتاج ربط خدمة ذكاء اصطناعي في الخطوة القادمة.'}]);setValue('')};
 return <main className="content-wrap page-content"><PageIntro eyebrow="اسأل واكتشف" title="المساعد الرياضي الذكي" description="مكان واحد تسأل فيه عن الرياضات والفرق واللاعبين والقوانين." icon={Sparkles}/><div className="assistant-layout"><aside className="assistant-side"><div className="assistant-orb"><Sparkles size={35}/></div><h2>معاك في كل لعبة</h2><p>مساعد رياضي لمساعدتك على اكتشاف معلومات وفهم تفاصيل الألعاب.</p><div className="suggestions"><b>جرّب تسأل عن</b>{['اشرحلي قانون التسلل','إيه الفرق بين كرة اليد والسلة؟','إزاي بتتحسب نقاط التنس؟'].map(s=><button key={s} onClick={()=>setValue(s)}>{s}<ArrowLeft size={14}/></button>)}</div></aside><section className="chat-panel"><div className="chat-head"><span className="ai-avatar"><Sparkles size={19}/></span><div><b>يلا AI</b><small><span className="live-dot"/> المساعد الرياضي</small></div><span className="beta-label">نسخة تجريبية</span></div><div className="chat-messages">{messages.map((m,i)=><div key={i} className={`chat-message ${m.from==='user'?'user-message':''}`}><span>{m.from==='ai'?<Sparkles size={16}/>:<UserRound size={16}/>}</span><p>{m.text}</p></div>)}</div><div className="chat-input"><input value={value} onChange={e=>setValue(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="اكتب سؤالك الرياضي هنا..." /><button onClick={send} aria-label="إرسال"><ArrowLeft size={19}/></button></div><small className="chat-disclaimer">الردود الحالية تجريبية، وسيتم تفعيل الذكاء الاصطناعي بعد ربط الخدمة.</small></section></div></main>;
}
function ProductGrid({items}) {
 return <div className="product-grid">{items.map((p,i)=><article className="product-card" key={p.name}><div className={`product-art ${p.bg}`}><span>{p.emoji}</span><small>{p.brand}</small><button aria-label="إضافة للمفضلة" className="heart-btn"><Star size={16}/></button></div><div className="product-info"><span className="product-category">معدات رياضية</span><h3>{p.name}</h3><div className="product-bottom"><b>{p.price}</b><button className="cart-btn" aria-label="عرض المنتج"><ShoppingBag size={17}/></button></div></div></article>)}</div>;
}
function StorePage() {
 const [filter,setFilter]=useState('الكل');
 return <main className="content-wrap page-content"><PageIntro eyebrow="جهّز نفسك" title="المتجر الرياضي" description="اكتشف المعدات والملابس الرياضية من علامات تجارية مختلفة." icon={ShoppingBag}/><div className="store-banner"><div><span className="eyebrow">اختيارات لعشاق الرياضة</span><h2>الأداء يبدأ من<br/><span>المعدات المناسبة.</span></h2><p>استكشف منتجات رياضية متنوعة من مكان واحد.</p></div><div className="store-banner-art">👟<span>⚽</span></div></div><div className="filter-row"><h2>منتجات مختارة</h2><select value={filter} onChange={e=>setFilter(e.target.value)}><option>الكل</option><option>معدات</option><option>ملابس</option></select></div><ProductGrid items={products}/><div className="notice-card"><ShoppingBag size={22}/><div><b>المتجر في المرحلة التجريبية</b><p>المنتجات للعرض فقط؛ لا يوجد شراء أو دفع إلكتروني حتى الآن.</p></div></div></main>;
}
function ProfilePage() {
 return <main className="content-wrap page-content"><PageIntro eyebrow="مساحتك الرياضية" title="حسابي" description="خصص تجربتك وتابع اهتماماتك الرياضية من مكان واحد." icon={UserRound}/><div className="profile-card"><div className="profile-avatar"><UserRound size={34}/></div><div><h2>أهلًا بيك في يلا رياضة</h2><p>أنشئ حسابك مستقبلًا لحفظ فرقك المفضلة والتنبيهات.</p></div><button className="primary-btn" onClick={()=>alert('تسجيل الحساب سيتم إضافته في مرحلة لاحقة.')}>تسجيل الدخول <ArrowLeft size={17}/></button></div><div className="profile-options"><div><span className="quick-icon blue-bg"><Trophy/></span><b>الفرق المفضلة</b><p>تابع فرقك وألعابك المفضلة بسهولة.</p></div><div><span className="quick-icon orange-bg"><Bell/></span><b>التنبيهات</b><p>استعد لتلقي تنبيهات المباريات المهمة.</p></div><div><span className="quick-icon violet-bg"><CircleHelp/></span><b>المساعدة والدعم</b><p>هنضيف مركز مساعدة متكامل قريبًا.</p></div></div></main>;
}
function Footer() {
 return <footer className="footer"><div className="footer-inner"><Brand/><p>المنصة الأقوى في الوطن العربي</p><span>© {new Date().getFullYear()} يلا رياضة — كل الحقوق محفوظة</span></div></footer>;
}
function AppShell() {
 const location=useLocation();
 React.useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});},[location.pathname]);
 return <><Header/><Routes><Route path="/" element={<HomePage/>}/><Route path="/matches" element={<MatchesPage/>}/><Route path="/news" element={<NewsPage/>}/><Route path="/assistant" element={<AssistantPage/>}/><Route path="/store" element={<StorePage/>}/><Route path="/profile" element={<ProfilePage/>}/><Route path="*" element={<HomePage/>}/></Routes><Footer/></>;
}
function App() {
 return <HashRouter><AppShell/></HashRouter>;
}
createRoot(document.getElementById('root')).render(<App/>);