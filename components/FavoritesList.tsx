import { Restaurant } from '../types/restaurant';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from './ui/card';

interface Props {
  favorites: Restaurant[];
  onToggleFavorite: (id: string) => void;
}

export function FavoritesList({ favorites, onToggleFavorite }: Props) {
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
        <Card key={restaurant.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl">{restaurant.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-600">{restaurant.location}</p>
            <div className="flex gap-2">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {restaurant.category}
              </span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {restaurant.priceRange}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              onClick={() => onToggleFavorite(restaurant.id)}
            >
              ❤️ 移出收藏
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
