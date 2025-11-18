import { useState, useMemo } from 'react';
import { Restaurant } from '../types/restaurant';
import { Button } from './ui/button';

// 收藏的餐廳權重 (是未收藏的 5 倍)
const FAVORITE_WEIGHT = 5;

// 轉盤上的顏色
const colors = ['#FFC3A0', '#FFAB91', '#FF8A80', '#FF7043', '#F4511E', '#BF360C'];

interface Props {
  restaurants: Restaurant[];
  onResult: (restaurant: Restaurant) => void;
}

export function TurntableWheel({ restaurants, onResult }: Props) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  // 1. 繪製轉盤 (使用 Canvas)
  // useMemo 確保只有在餐廳列表變化時才重新繪製
  const wheelCanvas = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 350;
    canvas.height = 350;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const numOptions = restaurants.length;
    if (numOptions === 0) {
      // 沒有餐廳的預設畫面
      ctx.fillStyle = '#ccc';
      ctx.beginPath();
      ctx.arc(175, 175, 170, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('沒有符合的餐廳', 175, 175);
      return canvas;
    }

    const arcSize = (2 * Math.PI) / numOptions;
    
    restaurants.forEach((restaurant, i) => {
      const angle = i * arcSize;
      ctx.fillStyle = colors[i % colors.length];

      ctx.beginPath();
      ctx.moveTo(175, 175);
      ctx.arc(175, 175, 170, angle, angle + arcSize);
      ctx.closePath();
      ctx.fill();

      // 繪製文字
      ctx.save();
      ctx.fillStyle = '#fff';
      ctx.font = '14px sans-serif';
      ctx.translate(175, 175);
      ctx.rotate(angle + arcSize / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(restaurant.name.substring(0, 10), 160, 0);
      ctx.restore();
    });

    return canvas;
  }, [restaurants]);

  // 2. 轉動邏輯 (*** 包含權重實作 ***)
  const handleSpin = () => {
    if (isSpinning || restaurants.length === 0) return;

    setIsSpinning(true);

    // --- 權重邏輯開始 ---
    const weightedList: Restaurant[] = [];
    restaurants.forEach(restaurant => {
      const weight = restaurant.isFavorite ? FAVORITE_WEIGHT : 1;
      for (let i = 0; i < weight; i++) {
        weightedList.push(restaurant);
      }
    });
    // --- 權重邏輯結束 ---

    // 從加權後的列表中隨機選出贏家
    const winner = weightedList[Math.floor(Math.random() * weightedList.length)];
    // 找到贏家在原列表中的索引
    const winnerIndex = restaurants.findIndex(r => r.id === winner.id);

    const arcSize = 360 / restaurants.length;
    // 隨機偏移量，讓指針不會每次都指在正中間
    const randomOffset = Math.random() * arcSize - (arcSize / 2);
    // 5 圈 (1800 度) + 指向目標的角度
    const targetAngle = 1800 + (360 - (winnerIndex * arcSize)) - (arcSize / 2) + randomOffset;

    const newRotation = rotation + targetAngle;
    setRotation(newRotation);

    // 5 秒後 (CSS transition 時間) 停止
    setTimeout(() => {
      setIsSpinning(false);
      onResult(winner);
    }, 5000);
  };

  return (
    <div className="relative w-[350px] h-[350px] mx-auto">
      {/* 指針 */}
      <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-10"
           style={{
             width: 0, height: 0,
             borderLeft: '20px solid transparent',
             borderRight: '20px solid transparent',
             borderTop: '30px solid var(--primary, #E89BA8)',
           }}>
      </div>
      
      {/* 轉盤 (Canvas) */}
      <div
        className="w-full h-full rounded-full border-8 border-white shadow-lg"
        style={{
          transition: 'transform 5s cubic-bezier(0.25, 1, 0.5, 1)',
          transform: `rotate(${rotation}deg)`,
          backgroundImage: wheelCanvas ? `url(${wheelCanvas.toDataURL()})` : 'none',
          backgroundSize: 'cover',
        }}
      ></div>

      {/* 轉動按鈕 */}
      <Button
        onClick={handleSpin}
        disabled={isSpinning || restaurants.length === 0}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full text-lg font-bold"
        size="lg"
      >
        {isSpinning ? '...' : '轉動'}
      </Button>
    </div>
  );
}
