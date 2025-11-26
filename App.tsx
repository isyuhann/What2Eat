import { useState, useEffect, useRef, useMemo } from 'react';

// --- 圖片匯入 (請確認這些檔案在 images 資料夾中) ---
import logoImage from './images/logo.png'; 
import plateIcon from './images/plateicon.png';
import yuhanImage from './images/YuHan.png';
import zhizhenImage from './images/Jenny.png'; 
import yirouImage from './images/yirou.png';  

// 類別 Icon
import coffeeIcon from './images/coffeeicon.png';
import susiIcon from './images/susiicon.png';
import koreanIcon from './images/koreanicon.png';
import noodleIcon from './images/noodleicon.png';
import riceIcon from './images/riceicon.png';
import vegIcon from './images/vegetableicon.png';
import spaIcon1 from './images/spaicon1.png';
import spaIcon2 from './images/spaicon2.png';
import spaIcon3 from './images/spaicon3.png';
import spaIcon4 from './images/spaicon4.png';

// 建立圖示對照表 (用於將資料類別轉為圖片變數)
const ICON_MAP: Record<string, string> = {
  coffeeicon: coffeeIcon,
  susiicon: susiIcon,
  koreanicon: koreanIcon,
  noodleicon: noodleIcon,
  riceicon: riceIcon,
  vegetableicon: vegIcon,
  spaicon1: spaIcon1,
  default: plateIcon
};

// --- 完整餐廳資料 (共 60 筆) ---
const RESTAURANTS = [
  { id: '1', name: '吃萬串燒專賣店', address: '新北市三峽區復興路112號', price: '$$', rating: '4.8', reviews: '120', category: '串燒烤肉店', area: '校外', icon: koreanIcon },
  { id: '2', name: '不然去吃早午餐', address: '新北市三峽區大德路190號', price: '$', rating: '4.5', reviews: '85', category: '早午餐', area: '正門', icon: coffeeIcon },
  { id: '3', name: '官小二酸菜魚 北大店', address: '新北市三峽區大德路206號', price: '$$', rating: '4.2', reviews: '340', category: '中國菜', area: '正門', icon: riceIcon },
  { id: '4', name: '麒哥嘉義火雞肉飯', address: '新北市三峽區大德路145號', price: '$', rating: '4.0', reviews: '560', category: '雞肉', area: '正門', icon: riceIcon },
  { id: '5', name: '大仁路小吃麵攤', address: '新北市三峽區大仁路', price: '$', rating: '4.3', reviews: '90', category: '中式麵食', area: '校外', icon: noodleIcon },
  { id: '6', name: '私嚐の吃飯-北大店', address: '新北市三峽區國際一街3號2樓', price: '$$', rating: '4.9', reviews: '1763', category: '日式咖哩', area: '側門', icon: riceIcon },
  { id: '7', name: '藏壽司 三峽學成店', address: '新北市三峽區學成路398號4樓', price: '$$$', rating: '4.6', reviews: '2500', category: '壽司', area: '正門', icon: susiIcon },
  { id: '8', name: '牛好吃-三峽旗艦店', address: '新北市三峽區大學路162號', price: '$$', rating: '4.4', reviews: '890', category: '牛扒', area: '正門', icon: vegIcon },
  { id: '9', name: '鳥鳴子雞白湯ラーメン', address: '新北市三峽區國際一街33號1樓', price: '$$', rating: '4.4', reviews: '278', category: '拉麵', area: '側門', icon: noodleIcon },
  { id: '10', name: '紅燈籠熱炒', address: '新北市三峽區復興路23巷', price: '$', rating: '3.8', reviews: '150', category: '小吃攤', area: '校外', icon: riceIcon },
  { id: '11', name: '老私房牛肉麵', address: '新北市三峽區國際一街66號', price: '$$', rating: '4.7', reviews: '1262', category: '中式麵食', area: '側門', icon: noodleIcon },
  { id: '12', name: '老街坊麵食館', address: '新北市三峽區大德路168號', price: '$', rating: '4.1', reviews: '320', category: '餐廳', area: '正門', icon: noodleIcon },
  { id: '13', name: '一燔歐姆蛋咖哩', address: '新北市三峽區國際一街22號', price: '$', rating: '4.5', reviews: '405', category: '餐廳', area: '側門', icon: riceIcon },
  { id: '14', name: '麵匡匡拉麵食堂', address: '新北市三峽區和平街38號', price: '$$', rating: '4.6', reviews: '227', category: '拉麵', area: '後門', icon: noodleIcon },
  { id: '15', name: '鍋媽精緻小火鍋', address: '新北市三峽區大德路477號', price: '$', rating: '4.4', reviews: '1306', category: '火鍋', area: '側門', icon: koreanIcon },
  { id: '16', name: '滾吧 Qunba 鍋物', address: '新北市三峽區學成路319號', price: '$$', rating: '4.3', reviews: '980', category: '火鍋', area: '正門', icon: koreanIcon },
  { id: '17', name: '伍豐早午餐', address: '新北市三峽區大學路109號', price: '$', rating: '4.2', reviews: '210', category: '早午餐', area: '正門', icon: coffeeIcon },
  { id: '18', name: '李記大腸蚵仔麵線', address: '新北市三峽區大觀路6號', price: '$', rating: '4.0', reviews: '450', category: '中式麵食', area: '正門', icon: noodleIcon },
  { id: '19', name: 'Yummy亞咪義大利麵', address: '新北市三峽區大觀路10號', price: '$$', rating: '4.1', reviews: '485', category: '意大利菜', area: '正門', icon: spaIcon1 },
  { id: '20', name: '八方雲集 (國際店)', address: '新北市三峽區國際一街50號', price: '$', rating: '3.9', reviews: '600', category: '餃子', area: '側門', icon: noodleIcon },
  { id: '21', name: 'ELSA CAFE', address: '新北市三峽區國際一街72號', price: '$', rating: '4.7', reviews: '156', category: '甜點', area: '側門', icon: coffeeIcon },
  { id: '22', name: '六扇門時尚湯鍋', address: '新北市三峽區學成路333號', price: '$', rating: '4.2', reviews: '1383', category: '火鍋', area: '後門', icon: koreanIcon },
  { id: '23', name: '泰鍋古藝', address: '新北市三峽區大德路176號', price: '$$', rating: '4.7', reviews: '1401', category: '火鍋', area: '側門', icon: koreanIcon },
  { id: '24', name: '享樂煮義三峽店', address: '新北市三峽區國際一街54號', price: '$', rating: '4.3', reviews: '320', category: '義大利菜', area: '側門', icon: spaIcon1 },
  { id: '25', name: '古都燒肉飯', address: '新北市三峽區大德路214號', price: '$', rating: '4.0', reviews: '550', category: '便當', area: '正門', icon: riceIcon },
  { id: '26', name: '點22 港式點心', address: '新北市三峽區民生街152號', price: '$', rating: '4.2', reviews: '480', category: '港式', area: '校外', icon: susiIcon },
  { id: '27', name: '旭飛酒場居酒屋', address: '新北市三峽區大德路471號', price: '$$$', rating: '4.8', reviews: '150', category: '居酒屋', area: '正門', icon: susiIcon },
  { id: '28', name: '麥當勞-三峽學成', address: '新北市三峽區學成路326號', price: '$', rating: '3.8', reviews: '3000', category: '快餐', area: '正門', icon: vegIcon },
  { id: '29', name: '韓讚', address: '新北市三峽區大德路200號', price: '$', rating: '3.6', reviews: '743', category: '韓式', area: '側門', icon: koreanIcon },
  { id: '30', name: '特點平價牛排', address: '新北市三峽區大德路473號', price: '$$', rating: '4.1', reviews: '670', category: '牛扒', area: '正門', icon: vegIcon },
  { id: '31', name: '黑霸牛肉麵專賣店', address: '新北市三峽區大德路196號', price: '$', rating: '4.4', reviews: '1026', category: '中式麵食', area: '正門', icon: noodleIcon },
  { id: '32', name: '在心蛋餅舖', address: '新北市三峽區國際一街21號', price: '$', rating: '4.5', reviews: '330', category: '早午餐', area: '側門', icon: coffeeIcon },
  { id: '33', name: '元爵味 黃燜雞米飯', address: '新北市三峽區大德路198號', price: '$', rating: '4.8', reviews: '2273', category: '中菜館', area: '側門', icon: riceIcon },
  { id: '34', name: '伊垛義式小廚', address: '新北市三峽區國際二街19號', price: '$', rating: '4.2', reviews: '280', category: '意大利菜', area: '側門', icon: spaIcon1 },
  { id: '35', name: '大埔鐵板燒', address: '新北市三峽區大學路174號', price: '$$', rating: '4.0', reviews: '900', category: '鐵板燒', area: '正門', icon: riceIcon },
  { id: '36', name: '強尼兄弟健康廚房', address: '新北市三峽區大德路166號', price: '$', rating: '4.3', reviews: '856', category: '健康食品', area: '正門', icon: vegIcon },
  { id: '37', name: 'すき家Sukiya', address: '新北市三峽區大學路152號', price: '$', rating: '4.1', reviews: '1500', category: '牛丼餐廳', area: '正門', icon: riceIcon },
  { id: '38', name: '魔法義大利', address: '新北市三峽區大學路200號', price: '$$', rating: '4.7', reviews: '3366', category: '餐廳', area: '側門', icon: spaIcon1 },
  { id: '39', name: '肯德基KFC', address: '新北市三峽區學成路360號', price: '$$', rating: '3.7', reviews: '1200', category: '快餐', area: '正門', icon: vegIcon },
  { id: '40', name: '韓一美食館', address: '新北市三峽區大學路131號', price: '$', rating: '4.0', reviews: '550', category: '餐廳', area: '正門', icon: koreanIcon },
  { id: '41', name: '麗媽四季火鍋', address: '新北市三峽區國際一街7號', price: '$', rating: '3.8', reviews: '449', category: '火鍋', area: '側門', icon: koreanIcon },
  { id: '42', name: '慢思 Amour.Sacrifice', address: '新北市三峽區國際二街25號', price: '$', rating: '4.3', reviews: '380', category: '早午餐', area: '側門', icon: coffeeIcon },
  { id: '43', name: 'Anchor 安可美式', address: '新北市三峽區國際一街13號', price: '$$', rating: '4.5', reviews: '600', category: '美國菜', area: '側門', icon: vegIcon },
  { id: '44', name: 'Yukimasa', address: '新北市三峽區大德路135號1樓', price: '$', rating: '4.6', reviews: '120', category: '咖啡廳', area: '正門', icon: coffeeIcon },
  { id: '45', name: '粥大福', address: '新北市三峽區大德路164號', price: '$', rating: '4.4', reviews: '350', category: '粥餐廳', area: '正門', icon: riceIcon },
  { id: '46', name: '肉享家 Niku Bliss', address: '新北市三峽區國際一街39號', price: '$$', rating: '4.6', reviews: '220', category: '餐廳', area: '側門', icon: vegIcon },
  { id: '47', name: '勝博殿', address: '新北市三峽區學成路398號3樓', price: '$$$', rating: '4.4', reviews: '980', category: '日式炸豬扒', area: '正門', icon: riceIcon },
  { id: '48', name: '錢都日式涮涮鍋', address: '新北市三峽區大學路150號', price: '$$', rating: '4.3', reviews: '2902', category: '火鍋', area: '正門', icon: koreanIcon },
  { id: '49', name: '北大烤鴨', address: '新北市三峽區大德路182號', price: '$$', rating: '4.1', reviews: '450', category: '燒烤', area: '正門', icon: riceIcon },
  { id: '50', name: '享聚餐酒館', address: '新北市三峽區國際一街5號2樓', price: '$$', rating: '4.5', reviews: '380', category: '餐廳', area: '側門', icon: vegIcon },
  { id: '51', name: '泰貳泰式風味料理', address: '新北市三峽區大德路202號', price: '$$', rating: '4.4', reviews: '560', category: '泰國菜', area: '正門', icon: riceIcon },
  { id: '52', name: '帕司達義式料理', address: '新北市三峽區大觀路16號', price: '$$', rating: '4.2', reviews: '410', category: '意大利菜', area: '正門', icon: spaIcon1 },
  { id: '53', name: '拾汣茶屋', address: '新北市三峽區中華路27號', price: '$', rating: '4.0', reviews: '150', category: '冰品飲料店', area: '校外', icon: coffeeIcon },
  { id: '54', name: '可不可熟成紅茶', address: '新北市三峽區大學路148號', price: '$', rating: '4.5', reviews: '680', category: '冰品飲料店', area: '正門', icon: coffeeIcon },
  { id: '55', name: '50嵐', address: '新北市三峽區大學路160號', price: '$', rating: '4.4', reviews: '890', category: '冰品飲料店', area: '正門', icon: coffeeIcon },
  { id: '56', name: '迷客夏Milksha', address: '新北市三峽區學成路261號', price: '$', rating: '4.6', reviews: '720', category: '珍珠奶茶', area: '正門', icon: coffeeIcon },
  { id: '57', name: '鬍鬚張魯肉飯', address: '新北市三峽區大觀路16號', price: '$', rating: '4.0', reviews: '1200', category: '台灣菜', area: '正門', icon: riceIcon },
  { id: '58', name: '厚野雞排', address: '新北市三峽區和平街87號', price: '$', rating: '4.2', reviews: '340', category: '炸雞', area: '後門', icon: vegIcon },
  { id: '59', name: '三角鍋燒', address: '新北市三峽區大德路194號', price: '$', rating: '4.1', reviews: '250', category: '餐廳', area: '正門', icon: noodleIcon },
  { id: '60', name: '夯牛屋', address: '新北市三峽區國際二街23號', price: '$$', rating: '4.3', reviews: '480', category: '牛扒', area: '側門', icon: vegIcon }
];

type ViewMode = 'home' | 'filters' | 'favorites' | 'list' | 'about' | 'decide' | 'result';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [filters, setFilters] = useState<{categories: string[], prices: string[], areas: string[]}>({
    categories: [], prices: [], areas: []
  });
  
  // 收藏清單
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("w2e_favs") || "[]");
    } catch {
      return [];
    }
  });

  const [currentPool, setCurrentPool] = useState(RESTAURANTS);
  const [spinResult, setSpinResult] = useState<any>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSpaImg, setCurrentSpaImg] = useState(spaIcon1);
  const [showListFilter, setShowListFilter] = useState(false);
  const [listFilters, setListFilters] = useState<{categories: string[], prices: string[], areas: string[]}>({
    categories: [], prices: [], areas: []
  });

  const toggleFavorite = (name: string) => {
    setFavorites(prev => {
      const newFavs = prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name];
      localStorage.setItem("w2e_favs", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const handleFilterToggle = (type: 'categories' | 'prices' | 'areas', value: string, isListMode = false) => {
    const targetSet = isListMode ? setListFilters : setFilters;
    const targetState = isListMode ? listFilters : filters;
    
    targetSet(prev => {
      const list = prev[type];
      const newList = list.includes(value) ? list.filter(v => v !== value) : [...list, value];
      return { ...prev, [type]: newList };
    });
  };

  const applyFilters = () => {
    const pool = RESTAURANTS.filter(r => {
      const catMatch = !filters.categories.length || filters.categories.includes(r.category);
      const priceMatch = !filters.prices.length || filters.prices.includes(r.price);
      const areaMatch = !filters.areas.length || filters.areas.includes(r.area);
      return catMatch && priceMatch && areaMatch;
    });

    if (pool.length === 0) {
      alert("哎呀！找不到符合條件的餐廳，請放寬條件。");
    } else {
      setCurrentPool(pool);
      setViewMode('decide');
    }
  };

  const startSpin = () => {
    setIsSpinning(true);
    const frames = [spaIcon1, spaIcon2, spaIcon3, spaIcon4];
    let step = 0;
    
    const interval = setInterval(() => {
      setCurrentSpaImg(frames[step % 4]);
      step++;
      if (step > 8) { 
        clearInterval(interval);
        const shuffled = [...currentPool].sort(() => Math.random() - 0.5);
        const main = shuffled[0];
        const others = shuffled.slice(1, 5);
        setSpinResult([main, ...others]);
        setCarouselIndex(0);
        setIsSpinning(false);
        setViewMode('result');
      }
    }, 200);
  };

  const filteredList = useMemo(() => {
    return RESTAURANTS.filter(r => {
      const catMatch = !listFilters.categories.length || listFilters.categories.includes(r.category);
      const priceMatch = !listFilters.prices.length || listFilters.prices.includes(r.price);
      const areaMatch = !listFilters.areas.length || listFilters.areas.includes(r.area);
      return catMatch && priceMatch && areaMatch;
    });
  }, [listFilters]);

  const favoriteList = useMemo(() => {
    return RESTAURANTS.filter(r => favorites.includes(r.name));
  }, [favorites]);

  // --- 背景動畫 (確保動畫正確執行) ---
  const heroBgRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (viewMode !== 'home' || !heroBgRef.current) return;

    const container = heroBgRef.current;
    container.innerHTML = ''; 
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const dotSize = 116; 
    const cols = Math.floor(width / dotSize);
    const rows = Math.floor(height / dotSize);
    const totalDots = cols * rows;

    const animImages = [coffeeIcon, susiIcon, koreanIcon, noodleIcon, riceIcon, vegIcon, spaIcon1];
    const safeIndices: number[] = [];

    // 建立格子
    for (let i = 0; i < totalDots; i++) {
      const dotWrapper = document.createElement('div');
      dotWrapper.className = 'bg-dot-container';
      
      const dot = document.createElement('div');
      dot.className = 'bg-dot';
      dot.id = `dot-${i}`;
      
      const front = document.createElement('div');
      front.className = 'bg-dot-face bg-dot-front';
      
      const back = document.createElement('div');
      back.className = 'bg-dot-face bg-dot-back';
      
      const img = document.createElement('img');
      img.style.width = '80%';
      img.style.height = '80%';
      img.style.objectFit = 'contain';
      
      back.appendChild(img);
      dot.appendChild(front);
      dot.appendChild(back);
      dotWrapper.appendChild(dot);
      container.appendChild(dotWrapper);
      
      const row = Math.floor(i / cols);
      const col = i % cols;
      const centerRow = rows / 2;
      const centerCol = cols / 2;
      
      // 避免中間被遮擋
      if (Math.abs(row - centerRow) > 1.5 || Math.abs(col - centerCol) > 1.5) {
        safeIndices.push(i);
      }
    }

    // 動畫 Loop
    let lastIndex = -1;
    const interval = setInterval(() => {
        if (safeIndices.length === 0) return;
        
        if (lastIndex !== -1) {
            const lastDot = document.getElementById(`dot-${lastIndex}`);
            if (lastDot) lastDot.classList.remove('is-flipped');
        }

        const rand = safeIndices[Math.floor(Math.random() * safeIndices.length)];
        const dot = document.getElementById(`dot-${rand}`);
        const randomImgSrc = animImages[Math.floor(Math.random() * animImages.length)];
        
        if (dot) {
            const imgEl = dot.querySelector('img');
            if (imgEl) {
              imgEl.src = randomImgSrc;
            }
            dot.classList.add('is-flipped');
            lastIndex = rand;
        }
    }, 1200);

    return () => clearInterval(interval);
  }, [viewMode]);

  const renderCard = (r: any, isMain = false) => (
    <div key={r.id} className={`card ${isMain ? 'card--main' : ''}`}>
      <div className="card-img-shell">
        <img src={r.icon} alt={r.name} />
      </div>
      <div className="card-header">
        <div className="card-title">{r.name}</div>
        <span className="badge">{r.category}</span>
      </div>
      <div className="card-sub">Rating: {r.rating} ({r.reviews})</div>
      <div className="card-sub">Price: {r.price}</div>
      <div className="card-sub">Area: {r.area}</div>
      <div className="card-actions">
        <button className="btn-heart" onClick={() => toggleFavorite(r.name)}>
          {favorites.includes(r.name) ? '❤️ Fav' : '🤍 Fav'}
        </button>
        <button className="btn-detail" onClick={() => alert(`${r.name}\n${r.address}`)}>Detail</button>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      {/* Navigation - 只在非首頁時顯示 */}
      {viewMode !== 'home' && (
        <div className="nav-shell">
          <div className="nav-pill">
            <button className={`nav-link ${viewMode === 'filters' ? 'active' : ''}`} onClick={() => setViewMode('filters')}>Decide Now</button>
            <button className={`nav-link ${viewMode === 'favorites' ? 'active' : ''}`} onClick={() => setViewMode('favorites')}>Favorites</button>
            <button className={`nav-link ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>Restaurant List</button>
            <button className={`nav-link ${viewMode === 'about' ? 'active' : ''}`} onClick={() => setViewMode('about')}>Contact us</button>
          </div>
        </div>
      )}
      {/* HOME */}
      {viewMode === 'home' && (
        <section className="page-section active">
          {/* 背景動畫 (維持原樣) */}
          <div className="hero-bg-animation" ref={heroBgRef}></div>
          
          {/* 👇 修改這裡：加入 style 強制變成直式置中排版 */}
          <div className="hero" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center', 
            justifyContent: 'center',
            minHeight: '60vh' /* 確保垂直視覺重心在中間 */
          }}>
            
            {/* 盤子圖 - 加入 margin-bottom 拉開距離 */}
            <div className="hero-plate" style={{ marginBottom: '32px' }}>
              <img src={plateIcon} alt="Logo" style={{ width: '80%', height: 'auto' }} />
            </div>
            
            <div>
              {/* 標題 - 改為全小寫 */}
              <div className="hero-text-main">what2eat</div>
              
              {/* Slogan - 更新文案，並加入 margin 拉開與按鈕的距離 */}
              <div className="hero-sub" style={{ margin: '16px 0 40px', fontSize: '16px', lineHeight: '1.6' }}>
                Stop Overthinking, Start Eating.<br/>
                別再糾結，直接開動！
              </div>
              
              <div className="hero-cta">
                <button className="btn-primary-lg" onClick={() => setViewMode('filters')}>Decide Now</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FILTERS */}
      {viewMode === 'filters' && (
        <section className="page-section active">
          <div className="panel">
            <div className="panel-title">Filters</div>
            <div className="panel-sub">篩選你的偏好</div>

            <div className="filter-group">
              <div className="filter-label">類型</div>
              <div className="chip-row">
                {['甜點','日式','韓式','麵食','飯食','健身','火鍋','義式'].map(t => (
                  <button key={t} className={`chip ${filters.categories.includes(t) ? 'active' : ''}`}
                    onClick={() => handleFilterToggle('categories', t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <div className="filter-label">價位</div>
              <div className="chip-row">
                {['$','$$','$$$'].map(p => (
                  <button key={p} className={`chip ${filters.prices.includes(p) ? 'active' : ''}`}
                    onClick={() => handleFilterToggle('prices', p)}>{p}</button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <div className="filter-label">區域</div>
              <div className="chip-row">
                {['正門','後門','側門','校外'].map(a => (
                  <button key={a} className={`chip ${filters.areas.includes(a) ? 'active' : ''}`}
                    onClick={() => handleFilterToggle('areas', a)}>{a}</button>
                ))}
              </div>
            </div>

            <div className="filter-actions">
              <button className="btn btn-outline" onClick={() => setFilters({categories:[], prices:[], areas:[]})}>Reset</button>
              <button className="btn btn-primary" onClick={applyFilters}>Apply</button>
            </div>
            <button className="btn-back" onClick={() => setViewMode('home')}>Back</button>
          </div>
        </section>
      )}

      {/* DECIDE */}
      {viewMode === 'decide' && (
        <section className="page-section active">
          <div className="decide-shell" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div className="hero-plate" style={{ border: '6px solid #f4c7d4' }}>
               <img src={currentSpaImg} alt="pasta" style={{ width: '80%' }} />
            </div>
            <div>
               <div className="panel-title">Let's Decide!</div>
               <div className="panel-sub" style={{ marginBottom: '16px' }}>共有 {currentPool.length} 間餐廳，按下 Start 吧！</div>
               <button className="btn btn-primary" onClick={startSpin} disabled={isSpinning}>
                 {isSpinning ? 'Spinning...' : 'Start'}
               </button>
               <br/>
               <button className="btn-back" onClick={() => setViewMode('filters')}>Back</button>
            </div>
          </div>
        </section>
      )}

      {/* RESULT */}
      {viewMode === 'result' && spinResult && (
        <section className="page-section active">
          <div className="result-shell">
            <div className="result-title">今天吃這家吧！</div>
            <div className="carousel">
               <button className="carousel-arrow" onClick={() => setCarouselIndex(prev => Math.max(0, prev - 1))} disabled={carouselIndex===0}>‹</button>
               <div className="carousel-track">
                  {renderCard(spinResult[carouselIndex], true)}
               </div>
               <button className="carousel-arrow" onClick={() => setCarouselIndex(prev => Math.min(spinResult.length-1, prev + 1))} disabled={carouselIndex===spinResult.length-1}>›</button>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
               <button className="btn btn-primary" onClick={startSpin}>再抽一次</button>
            </div>
            <button className="btn-back" onClick={() => setViewMode('home')}>Back Home</button>
          </div>
        </section>
      )}

      {/* LIST */}
      {viewMode === 'list' && (
        <section className="page-section active">
          <div className="list-shell">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
               <div>
                 <div className="result-title">Restaurant List</div>
                 <p className="panel-sub">可以左右滑動查看所有餐廳。</p>
               </div>
               <div className="list-actions">
                 <button className="btn btn-outline" style={{padding:'4px 12px'}} onClick={() => setShowListFilter(!showListFilter)}>🔍 Filter</button>
               </div>
            </div>
            
            {showListFilter && (
               <div className="list-filter-panel" style={{ display: 'block', marginBottom: '16px', padding: '16px', borderTop:'1px solid #ffeef3' }}>
                  <div className="chip-row">
                    {['甜點','日式','韓式','麵食','飯食','火鍋','義大利菜'].map(t => (
                      <button key={t} className={`chip ${listFilters.categories.includes(t) ? 'active' : ''}`}
                        onClick={() => handleFilterToggle('categories', t, true)}>{t}</button>
                    ))}
                    <button className="chip" onClick={() => setListFilters({categories:[], prices:[], areas:[]})}>Clear</button>
                  </div>
               </div>
            )}

            <div className="list-row">
               {filteredList.map(r => renderCard(r))}
            </div>
            <button className="btn-back" onClick={() => setViewMode('home')}>Back</button>
          </div>
        </section>
      )}

      {/* FAVORITES */}
      {viewMode === 'favorites' && (
        <section className="page-section active">
          <div className="fav-shell">
             <div className="result-title">Favorites</div>
             <div className="fav-list" style={{ marginTop: '16px' }}>
                {favoriteList.length === 0 ? <div style={{color:'#999'}}>尚無收藏</div> : favoriteList.map(r => (
                  <div key={r.id} className="fav-item">
                    <div>
                      {/* 改用新 CSS 定義的 class */}
                      <div className="fav-item-name">{r.name}</div>
                      <div className="fav-item-address">{r.address}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {/* 按鈕樣式維持不變，你的 CSS 已經有 .fav-btn */}
                        <button className="fav-btn" onClick={() => toggleFavorite(r.name)}>🗑️</button>
                    </div>
                  </div>
                ))}
             </div>
             <button className="btn-back" onClick={() => setViewMode('home')}>Back</button>
          </div>
        </section>
      )}

      {/* ABOUT */}
      {viewMode === 'about' && (
        <section className="page-section active">
           <div className="about">
              <div className="about-title">About What2EAT</div>
              <p className="about-desc">
                專為台北大學學生打造的美食決策助手。我們整合了三峽校區周邊（正門、後門、側門）的各類餐廳資訊，
                透過直覺的篩選與趣味的隨機抽籤動畫，解決每日最讓人頭痛的「午餐吃什麼」難題。
              </p>
              <div className="team-section-title">Meet the Team</div>
              <div className="about-plates">
                <div className="member-item">
                  <div className="about-plate"><img src={yuhanImage} alt="黃雨涵"/></div>
                  <div className="member-name">黃雨涵</div>
                </div>
                <div className="member-item">
                  <div className="about-plate"><img src={zhizhenImage} alt="劉至真"/></div>
                  <div className="member-name">劉至真</div>
                </div>
                <div className="member-item">
                  <div className="about-plate"><img src={yirouImage} alt="廖苡媃"/></div>
                  <div className="member-name">廖苡媃</div>
                </div>
              </div>
              <button className="btn-back" onClick={() => setViewMode('home')}>Back</button>
           </div>
        </section>
      )}
    </div>
  );
}
