import { Restaurant } from '../types/restaurant';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from './ui/dialog';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// !!! 警告：請將 'YOUR_GOOGLE_MAPS_API_KEY' 替換成你自己的金鑰 !!!
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

interface Props {
  restaurant: Restaurant | null;
  open: boolean;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
}

const mapContainerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '0.5rem',
};

export function ResultDialog({ restaurant, open, onClose, onToggleFavorite }: Props) {
  if (!restaurant) return null;

  const position = {
    lat: restaurant.lat ?? 25.0330, // 預設緯度 (例如台北車站)
    lng: restaurant.lng ?? 121.5654, // 預設經度
  };

  const hasCoords = restaurant.lat !== undefined && restaurant.lng !== undefined;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">🎉 今天吃這家！ 🎉</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <h3 className="text-3xl font-bold text-center text-[#E89BA8]">
            {restaurant.name}
          </h3>
          <div className="flex justify-center gap-4 text-sm text-gray-600">
            <span>分類: {restaurant.category}</span>
            <span>價位: {restaurant.priceRange}</span>
            <span>地址: {restaurant.location}</span>
          </div>

          {/* --- Google Map 實作 --- */}
          <div className="w-full">
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={position}
                zoom={16}
              >
                {hasCoords && <Marker position={position} />}
              </GoogleMap>
            </LoadScript>
          </div>
          {/* --- Google Map 結束 --- */}

        </div>

        <DialogFooter className="gap-2 sm:justify-between">
          <Button
            variant={restaurant.isFavorite ? 'default' : 'outline'}
            onClick={() => onToggleFavorite(restaurant.id)}
            className={restaurant.isFavorite ? 'bg-[#E89BA8] hover:bg-[#D88A98]' : ''}
          >
            {restaurant.isFavorite ? '❤️ 已收藏' : '🤍 加入收藏'}
          </Button>
          <DialogClose asChild>
            <Button variant="outline">太好了！</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
