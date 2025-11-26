import { useState, useMemo } from 'react';
import { Restaurant, FilterState } from './types/restaurant';
import { mockRestaurants } from './data/mockRestaurants';
import { FiltersPanel } from './components/FiltersPanel';
import { TurntableWheel } from './components/TurntableWheel';
import { ResultDialog } from './components/ResultDialog';
import { FavoritesList } from './components/FavoritesList';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';

// 匯入圖片
import logoImage from './images/logo.png';
import yuhanImage from './images/YuHan.png';

type ViewMode = 'home' | 'favorites' | 'turntable' | 'about';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRanges: [],
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    categories: [],
    priceRanges: [],
  });
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  // 用於收藏頁的「詳細資訊」區塊
  const [detailRestaurant, setDetailRestaurant] = useState<Restaurant | null>(null);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const categoryMatch =
        appliedFilters.categories.length === 0 ||
        appliedFilters.categories.includes(restaurant.category);
      const priceMatch =
        appliedFilters.priceRanges.length === 0 ||
        appliedFilters.priceRanges.includes(restaurant.priceRange);
      return categoryMatch && priceMatch;
    });
  }, [restaurants, appliedFilters]);

  const favoriteRestaurants = useMemo(() => {
    return restaurants.filter((r) => r.isFavorite);
  }, [restaurants]);

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
  };

  const handleResetFilters = () => {
    setFilters({ categories: [], priceRanges: [] });
    setAppliedFilters({ categories: [], priceRanges: [] });
  };

  const handleToggleFavorite = (restaurantId: string) => {
    setRestaurants((prev) =>
      prev.map((r) =>
        r.id === restaurantId ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
    if (selectedRestaurant && selectedRestaurant.id === restaurantId) {
      setSelectedRestaurant({ ...selectedRestaurant, isFavorite: !selectedRestaurant.isFavorite });
    }
  };

  const handleSpinResult = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowResult(true);
  };

  // 產生 Google Map URL 的輔助函式
  const getMapUrl = (location: string) => {
    return `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          {/* Logo 顯示 */}
          <img 
            src={logoImage} 
            alt="Logo" 
            className="w-10 h-10 object-contain cursor-pointer"
            onClick={() => setViewMode('home')}
          />
          <div className="text-left cursor-pointer" onClick={() => setViewMode('home')}>
            <h1 className="text-2xl font-bold text-gray-800 leading-none">What2Eat</h1>
            <p className="text-xs text-gray-500">選擇困難症的救星 ✨</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
        
        {/* --- HOME PAGE --- */}
        {viewMode === 'home' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setViewMode('favorites')}
                className="bg-white border-2 border-[#E89BA8] text-[#E89BA8] hover:bg-[#FFF0F3] px-8 py-6 rounded-full text-lg"
              >
                ❤️ 我的收藏
              </Button>
              <Button
                onClick={() => setViewMode('turntable')}
                className="bg-[#E89BA8] hover:bg-[#D88A98] text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
              >
                🍀 轉動轉盤
              </Button>
            </div>

            <FiltersPanel
              filters={filters}
              onFilterChange={setFilters}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
            />

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-700">餐廳清單</h3>
                <span className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
                  共 {filteredRestaurants.length} 間
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredRestaurants.slice(0, 12).map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="p-4 bg-gray-50 rounded-xl text-center border border-transparent hover:border-[#E89BA8] transition-all"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <span className="text-lg">🍽️</span>
                    </div>
                    <p className="font-medium text-gray-800 truncate text-sm">{restaurant.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{restaurant.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- FAVORITES PAGE --- */}
        {viewMode === 'favorites' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">❤️ Favorite Restaurants</h2>
              <Button variant="outline" onClick={() => setViewMode('home')}>
                返回首頁
              </Button>
            </div>
            
            <FavoritesList
              favorites={favoriteRestaurants}
              onToggleFavorite={handleToggleFavorite}
              onViewDetail={(r) => setDetailRestaurant(r)}
            />

            {/* 用區塊取代彈出視窗 */}
            {detailRestaurant && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-2 mb-2 mt-8">
                  <span className="text-2xl">👇</span>
                  <h3 className="text-xl font-bold text-gray-800">
                    餐廳詳細資訊：{detailRestaurant.name}
                  </h3>
                </div>
                
                <Card className="overflow-hidden border-2 border-[#E89BA8]/30 shadow-lg">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 h-full">
                      {/* 左側：地圖 */}
                      <div className="h-[300px] md:h-auto bg-gray-100 w-full">
                        <iframe
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          scrolling="no"
                          src={getMapUrl(detailRestaurant.location)}
                          className="w-full h-full"
                        ></iframe>
                      </div>
                      
                      {/* 右側：資訊 */}
                      <div className="p-6 flex flex-col justify-center space-y-4 bg-white">
                        <div>
                          <span className="bg-[#E89BA8] text-white px-3 py-1 rounded-full text-sm">
                            {detailRestaurant.category}
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">{detailRestaurant.name}</h2>
                        <div className="space-y-2 text-gray-600">
                          <p className="flex items-center gap-2">
                            <span className="text-lg">📍</span> {detailRestaurant.location}
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="text-lg">💰</span> 價位: {detailRestaurant.priceRange}
                          </p>
                        </div>
                        <div className="pt-4">
                          <Button 
                            variant="outline" 
                            onClick={() => setDetailRestaurant(null)}
                            className="w-full"
                          >
                            關閉資訊
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* --- TURNTABLE PAGE --- */}
        {viewMode === 'turntable' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">🍀 Spin the Turntable</h2>
              <Button variant="outline" onClick={() => setViewMode('home')}>
                返回首頁
              </Button>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <TurntableWheel
                restaurants={filteredRestaurants}
                onResult={handleSpinResult}
              />
            </div>
          </div>
        )}

        {/* --- ABOUT US PAGE --- */}
        {viewMode === 'about' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">👥 About Us</h2>
              <Button variant="outline" onClick={() => setViewMode('home')}>
                返回首頁
              </Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm text-center max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-2 text-[#E89BA8]">We are What2Eat Team!</h3>
              <p className="text-gray-600 mb-8">致力於解決人類歷史上最大的難題：「等一下要吃什麼？」</p>

              <div className="space-y-6 text-left">
                {/* 成員 1 */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow-md shrink-0">
                    {/* 使用照片 */}
                    <img src={yuhanImage} alt="黃雨涵" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">黃雨涵</h4>
                    <p className="text-sm text-[#E89BA8] font-medium">系統架構 / 後端開發 / 統籌</p>
                    <p className="text-xs text-gray-500 mt-1">Python, Django, React, Tailwind</p>
                  </div>
                </div>

                {/* 成員 2 */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl border-2 border-white shadow-md shrink-0">
                    👨‍💻
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">劉至真</h4>
                    <p className="text-sm text-[#E89BA8] font-medium">前端開發 / 文本撰寫</p>
                    <p className="text-xs text-gray-500 mt-1">React, TypeScript, Tailwind CSS</p>
                  </div>
                </div>

                {/* 成員 3 */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-2xl border-2 border-white shadow-md shrink-0">
                    🎨
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">廖苡媃</h4>
                    <p className="text-sm text-[#E89BA8] font-medium">UIUX / 素材蒐集</p>
                    <p className="text-xs text-gray-500 mt-1">Figma, Design System</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Result Dialog (轉盤結果) */}
      <ResultDialog
        restaurant={selectedRestaurant}
        open={showResult}
        onClose={() => setShowResult(false)}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Footer */}
      <footer className="bg-white border-t mt-auto py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-4">© 2025 What2Eat 美食轉盤推薦平台</p>
          <div className="flex justify-center gap-6">
            {/* 這裡改成切換到 About 頁面 */}
            <button 
              onClick={() => setViewMode('about')}
              className="hover:text-[#E89BA8] transition-colors font-medium"
            >
              About Us (關於我們)
            </button>
            <button className="hover:text-[#E89BA8] transition-colors">常見問題</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
