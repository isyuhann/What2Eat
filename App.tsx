import { useState, useMemo } from 'react';
import { Restaurant, FilterState } from './types/restaurant';
import { mockRestaurants } from './data/mockRestaurants';
import { FiltersPanel } from './components/FiltersPanel';
import { TurntableWheel } from './components/TurntableWheel';
import { ResultDialog } from './components/ResultDialog';
import { FavoritesList } from './components/FavoritesList';
import { Button } from './components/ui/button';
import logoImage from './images/logo.png';

type ViewMode = 'home' | 'favorites' | 'turntable';

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ▼▼▼ Header 修改開始 ▼▼▼ */}
      <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          {/* Logo 圖片 */}
          <img 
            src={logoImage} 
            alt="What2Eat Logo" 
            className="w-12 h-12 object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setViewMode('home')}
          />
          
          {/* 標題文字區塊 */}
          <div className="text-left">
            <h1 
              className="text-2xl font-bold text-gray-800 leading-tight cursor-pointer"
              onClick={() => setViewMode('home')}
            >
              What2Eat
            </h1>
            <p className="text-xs text-gray-500">選擇困難症的救星 ✨</p>
          </div>
        </div>
      </header>
      {/* ▲▲▲ Header 修改結束 ▲▲▲ */}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {viewMode === 'home' && (
          <div className="space-y-8">
            {/* Action Buttons */}
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

            {/* Filters */}
            <FiltersPanel
              filters={filters}
              onFilterChange={setFilters}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
            />

            {/* Preview Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-700">符合條件的餐廳</h3>
                <span className="text-gray-500 text-sm bg-gray-100 px-3 py-1 rounded-full">
                  共 {filteredRestaurants.length} 間
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredRestaurants.slice(0, 8).map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="p-4 bg-gray-50 rounded-xl text-center hover:bg-[#FFF0F3] transition-colors cursor-default border border-transparent hover:border-[#E89BA8]"
                  >
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
                      <span className="text-xl">🍜</span>
                    </div>
                    <p className="font-medium text-gray-800 truncate">{restaurant.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{restaurant.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === 'favorites' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">❤️ Favorite Restaurants</h2>
              <Button
                variant="outline"
                onClick={() => setViewMode('home')}
              >
                返回首頁
              </Button>
            </div>
            <FavoritesList
              favorites={favoriteRestaurants}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        )}

        {viewMode === 'turntable' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">🍀 Spin the Turntable</h2>
              <Button
                variant="outline"
                onClick={() => setViewMode('home')}
              >
                返回首頁
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="text-center text-gray-600 mb-6">
                讓命運決定你今天吃什麼吧！轉動轉盤開始選擇...
              </p>
              <TurntableWheel
                restaurants={filteredRestaurants}
                onResult={handleSpinResult}
              />
              <p className="text-center text-sm text-gray-400 mt-8">
                目前有 {filteredRestaurants.length} 間餐廳在轉盤中
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Result Dialog */}
      <ResultDialog
        restaurant={selectedRestaurant}
        open={showResult}
        onClose={() => setShowResult(false)}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-4">© 2025 What2Eat 美食轉盤推薦平臺</p>
          <div className="flex justify-center gap-6">
            <button className="hover:text-[#E89BA8] transition-colors">聯絡我們</button>
            <button className="hover:text-[#E89BA8] transition-colors">常見問題</button>
            <button className="hover:text-[#E89BA8] transition-colors">關於我們</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
