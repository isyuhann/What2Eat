import { Restaurant } from '../types/restaurant';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';

interface Props {
  favorites: Restaurant[];
  onToggleFavorite: (id: string) => void;
  onViewDetail: (restaurant: Restaurant) => void;
}

export function FavoritesList({ favorites, onToggleFavorite, onViewDetail }: Props) {
  if (favorites.length === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p className="text-lg">還沒有收藏任何餐廳喔！</p>
        <p>快去轉盤或首頁逛逛吧～</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {favorites.map((restaurant) => (
        <Card key={restaurant.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex justify-between items-center">
              {restaurant.name}
              <span className="text-sm font-normal bg-gray-100 px-2 py-1 rounded text-gray-600">
                {restaurant.category}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pb-2">
            <p className="text-sm text-gray-600 truncate">📍 {restaurant.location}</p>
            <div className="flex gap-2">
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                價位: {restaurant.priceRange}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 pt-2">
            <Button
              variant="default"
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white"
              onClick={() => onViewDetail(restaurant)}
            >
              View Detail
            </Button>
            <Button
              variant="outline"
              className="border-red-200 text-red-500 hover:bg-red-50"
              onClick={() => onToggleFavorite(restaurant.id)}
            >
              Remove
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
