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
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // <-- 不再需要
// const GOOGLE_MAPS_API_KEY = '...'; // <-- 不再需要

interface Props {
  restaurant: Restaurant | null;
  open: boolean;
  onClose: () => void;
  onToggleFavorite: (id: string) => void;
}

export function ResultDialog({ restaurant, open, onClose, onToggleFavorite }: Props) {
  if (!restaurant) return null;

  // --- iFrame 嵌入 ---
  // 我們使用 restaurant.location (地址) 來產生 Google Map 嵌入 URL
  // encodeURIComponent 會將地址轉換為 URL 安全的格式
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(restaurant.location)}&output=embed`;

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
            {/* 地址現在由地圖顯示, 這裡可以隱藏 */}
            {/* <span>地址: {restaurant.location}</span> */}
          </div>

          {/* --- Google Map iFrame 實作 --- */}
          <div className="w-full h-[300px] rounded-lg overflow-hidden border">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={embedUrl}
              title={restaurant.name}
              aria-label={restaurant.name}
              loading="lazy"
            ></iframe>
          </div>
          {/* --- Google Map iFrame 結束 --- */}

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
