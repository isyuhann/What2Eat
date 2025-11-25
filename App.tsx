import React, { useState, useMemo } from 'react'; // 修正：明確引入 React
import { Restaurant, FilterState } from './types/restaurant';
import { mockRestaurants } from './data/mockRestaurants';
import { FiltersPanel } from './components/FiltersPanel';
import { TurntableWheel } from './components/TurntableWheel';
import { ResultDialog } from './components/ResultDialog';
import { FavoritesList } from './components/FavoritesList';
import { Button } from './components/ui/button';

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
    return restaurants.filter((restaurant: Restaurant) => { // 修正：為參數加上型別
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
    return restaurants.filter((r: Restaurant) => r.isFavorite); // 修正：為參數加上型別
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
      prev.map((r: Restaurant) => // 修正：為參數加上型別
        r.id === restaurantId ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
    // Update selected restaurant if it's the one being toggled
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
      {/* Header */}
      <header className="bg-white shadow-sm py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl mb-2">What2Eat</h1>
          <p className="text-gray-600">選擇困難症的救星 ✨</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {viewMode === 'home' && (
          <section className="space-y-8">
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setViewMode('favorites')}
                className="bg-white border-2 border-[#E89BA8] text-[#E89BA8] hover:bg-[#FFF0F3] px-8 py-6"
              >
                Favorites
              </Button>
              <Button
                onClick={() => setViewMode('turntable')}
                className="bg-[#E89BA8] hover:bg-[#D88A98] text-white px-8 py-6"
              >
                Spin the Turntable
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
                <h3 className="text-lg font-semibold">符合條件的餐廳</h3>
                <span className="text-gray-600">
                  共 {filteredRestaurants.length} 間 
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredRestaurants.slice(0, 8).map((restaurant: Restaurant) => ( // 修正：為參數加上型別
                  <div
                    key={restaurant.id}
                    className="p-3 bg-gray-50 rounded-lg text-center"
                  >
                    <div className="w-12 h-12 bg-[#FFE4E8] rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl">🍜</span>
                    </div>
                    <p className="text-sm truncate">{restaurant.name}</p>
                    <p className="text-xs text-gray-500">{restaurant.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {viewMode === 'favorites' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Favorite Restaurants</h2>
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
              <h2 className="text-2xl font-bold">Spin the Turntable</h2>
              <Button
                variant="outline"
                onClick={() => setViewMode('home')}
              >
                返回首頁
              </Button>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <p className="text-center text-gray-600 mb-6">
                讓命運決定你今天吃什麼吧！轉動轉盤開始選擇...
              </p>
              <TurntableWheel
                restaurants={filteredRestaurants}
                onResult={handleSpinResult}
              />
              <p className="text-center text-sm text-gray-500 mt-6">
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
      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 text-sm">
          <div className="flex justify-center gap-8 mb-2">
            <button className="hover:text-[#E89BA8]">聯絡我們</button>
            <button className="hover:text-[#E89BA8]">常見問題</button>
            <button className="hover:text-[#E89BA8]">關於我們</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
