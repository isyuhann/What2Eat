import { useState, useEffect, useRef, useMemo } from 'react';

// 圖片匯入 
import logoImage from './images/logo.png'; 
import plateIcon from './images/plateicon.png';
import yuhanImage from './images/YuHan.png';
import zhizhenImage from './images/Jenny.png'; 
import yirouImage from './images/yirou.png';  

// 功能圖示
import trashIcon from './images/trashcan.png';
import filterIcon from './images/filter.png';
import clearIcon from './images/clear-alt.png';

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
import hotpotIcon from './images/hotpoticon.png'; 
import thaiIcon from './images/thaicon.png';     
import westernIcon from './images/westernicon.png';

// 1. 建立圖示對照表 (根據夥伴 HTML 中的 image 路徑邏輯)
const ICON_MAP: Record<string, string> = {
  'images/coffeeicon.png': coffeeIcon,
  'images/susiicon.png': susiIcon,
  'images/koreanicon.png': koreanIcon,
  'images/noodleicon.png': noodleIcon,
  'images/riceicon.png': riceIcon,
  'images/vegetableicon.png': vegIcon,
  'images/spaicon1.png': spaIcon1,
  'images/hotpoticon.png': hotpotIcon,
  'images/thaicon.png': thaiIcon,
  'images/westernicon.png': westernIcon,
  default: plateIcon
};

// 2. 完整餐廳資料
const RESTAURANTS = [
    // 甜點/飲料/點心
    { id: '1', name: "焦香味甜甜圈專賣店", address: "新北市三峽區大觀路12-5號1樓", price: "$1-200", rating: "4.9", reviews: "107", category: "甜點", area: "正門", image: "images/coffeeicon.png" },
    { id: '2', name: "Yukimasa。一碗幸福好滋味", address: "新北市三峽區大德路135號號1樓", price: "$1-200", rating: "4.7", reviews: "289", category: "甜點", area: "正門", image: "images/coffeeicon.png" },
    { id: '3', name: "點22 港式點心專賣店", address: "新北市三峽區民生街102號", price: "$1-200", rating: "4.4", reviews: "994", category: "甜點", area: "後門/老街", image: "images/coffeeicon.png" },
    { id: '4', name: "愛沐芋芋頭芋圓仙草凍專賣店", address: "新北市三峽區和平街103號", price: "$1-200", rating: "4.5", reviews: "180", category: "甜點", area: "後門/老街", image: "images/coffeeicon.png" },
    { id: '5', name: "糖匠秝果", address: "新北市三峽區國際一街70-1號", price: "$1-200", rating: "4.6", reviews: "139", category: "甜點", area: "側門", image: "images/coffeeicon.png" },
    { id: '6', name: "阿玉姐水果飴", address: "新北市三峽區民權街68號", price: "$1-200", rating: "4.5", reviews: "33", category: "甜點", area: "後門/老街", image: "images/coffeeicon.png" },
    { id: '7', name: "小林甜湯", address: "新北市三峽區國際一街52號", price: "$1-200", rating: "4.4", reviews: "108", category: "甜點", area: "側門", image: "images/coffeeicon.png" },
    { id: '8', name: "北投紅茶", address: "新北市三峽區國學街32號", price: "$1-200", rating: "3.3", reviews: "44", category: "飲料", area: "側門", image: "images/coffeeicon.png" },
    { id: '9', name: "再睡5分鐘", address: "新北市三峽區和平街107號之1", price: "$1-200", rating: "4.8", reviews: "160", category: "飲料", area: "後門/老街", image: "images/coffeeicon.png" },
    { id: '10', name: "珍煮丹", address: "新北市三峽區大學路145號", price: "$1-200", rating: "3.8", reviews: "267", category: "飲料", area: "正門", image: "images/coffeeicon.png" },
    { id: '11', name: "麻古茶坊", address: "新北市三峽區國際一街30號", price: "$1-200", rating: "3.6", reviews: "260", category: "飲料", area: "正門", image: "images/coffeeicon.png" },
    { id: '12', name: "果滋味綜合飲料店", address: "新北市三峽區大德路39號1樓", price: "$1-200", rating: "4.9", reviews: "29", category: "飲料", area: "正門", image: "images/coffeeicon.png" },
    { id: '13', name: "可不可熟成紅茶店", address: "新北市三峽區學成路229號", price: "$1-200", rating: "3.8", reviews: "250", category: "飲料", area: "正門", image: "images/coffeeicon.png" },
    { id: '14', name: "無飲國學店", address: "新北市三峽區國學街5號", price: "$1-200", rating: "4.0", reviews: "59", category: "飲料", area: "側門", image: "images/coffeeicon.png" },
    { id: '15', name: "清心福全", address: "新北市三峽區國際一街36號", price: "$1-200", rating: "4.8", reviews: "165", category: "飲料", area: "側門", image: "images/coffeeicon.png" },
    { id: '16', name: "50嵐", address: "新北市三峽區大學路129號1樓", price: "$1-200", rating: "4.0", reviews: "180", category: "飲料", area: "正門", image: "images/coffeeicon.png" },
    { id: '17', name: "五桐號WooTEA", address: "新北市三峽區國學街39號", price: "$1-200", rating: "3.3", reviews: "103", category: "飲料", area: "側門", image: "images/coffeeicon.png" },
    { id: '18', name: "CoCo都可", address: "新北市三峽區大學路143號", price: "$1-200", rating: "3.2", reviews: "111", category: "飲料", area: "正門", image: "images/coffeeicon.png" },
    { id: '19', name: "迷客夏Milksha", address: "新北市三峽區國際二街33號1樓", price: "$1-200", rating: "3.5", reviews: "363", category: "飲料", area: "側門", image: "images/coffeeicon.png" },
    { id: '20', name: "泡泡龍", address: "新北市三峽區民生街171號", price: "$1-200", rating: "4.0", reviews: "130", category: "飲料", area: "後門/老街", image: "images/coffeeicon.png" },

    // 日式/韓式/泰式
    { id: '21', name: "鳥鳴子雞白湯ラーメン", address: "新北市三峽區國際一街33號", price: "$200-400", rating: "4.4", reviews: "280", category: "日式", area: "側門", image: "images/susiicon.png" },
    { id: '22', name: "三禾手打烏龍麵", address: "新北市三峽區大德路109號", price: "$200-400", rating: "4.0", reviews: "957", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '23', name: "私嚐の吃飯", address: "新北市樹林區學勤路322號", price: "$200-400", rating: "4.9", reviews: "1,762", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '24', name: "吉購吉", address: "新北市三峽區大德路222號", price: "$1-200", rating: "4.2", reviews: "571", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '25', name: "一燔歐姆蛋咖哩、炸雞", address: "新北市三峽區大德路151號", price: "$1-200", rating: "4.5", reviews: "406", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '26', name: "Miss Energy 能量小姐", address: "新北市三峽區學成路246號", price: "$1-200", rating: "4.4", reviews: "497", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '27', name: "蛋白盒子健康餐盒", address: "新北市三峽區國學街37號", price: "$1-200", rating: "3.7", reviews: "50", category: "日式", area: "側門", image: "images/susiicon.png" },
    { id: '28', name: "京簡康", address: "新北市三峽區學成路250號", price: "$1-200", rating: "3.7", reviews: "177", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '29', name: "益柔廚房", address: "新北市三峽區學府路36號", price: "$200-400", rating: "4.4", reviews: "845", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '30', name: "くら寿司 藏壽司", address: "新北市三峽區學成路398號4樓", price: "$400-600", rating: "4.1", reviews: "1,999", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '31', name: "吃萬串燒專賣店", address: "新北市三峽區復興路112號", price: "$200-400", rating: "4.7", reviews: "292", category: "日式", area: "後門/老街", image: "images/susiicon.png" },
    { id: '32', name: "豚將拉麵", address: "新北市三峽區文化路228號", price: "$1-200", rating: "4.0", reviews: "442", category: "日式", area: "後門/老街", image: "images/susiicon.png" },
    { id: '33', name: "旭飛酒場居酒屋", address: "新北市三峽區學成路287號", price: "$400-600", rating: "4.3", reviews: "312", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '34', name: "師傅很忙平價鐵板燒", address: "新北市三峽區國際一街3號", price: "$200-400", rating: "3.4", reviews: "482", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '35', name: "大埔鐵板燒", address: "新北市三峽區大學路116號", price: "$200-400", rating: "3.7", reviews: "936", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '36', name: "鬼匠拉麵", address: "新北市三峽區大學路141號", price: "$1-200", rating: "4.0", reviews: "56", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '37', name: "大雄料理店", address: "新北市三峽區國學街51號", price: "$1-200", rating: "3.8", reviews: "489", category: "日式", area: "側門", image: "images/susiicon.png" },
    { id: '38', name: "すき家Sukiya", address: "新北市三峽區大學路150號", price: "$1-200", rating: "3.7", reviews: "1,307", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '39', name: "赤田屋咖哩飯", address: "新北市三峽區大學路141號", price: "$1-200", rating: "4.1", reviews: "55", category: "日式", area: "正門", image: "images/susiicon.png" },
    { id: '40', name: "肉享家 Niku Bliss", address: "新北市三峽區國際一街39號", price: "$200-400", rating: "3.9", reviews: "96", category: "日式", area: "側門", image: "images/susiicon.png" },

    { id: '41', name: "韓讚", address: "新北市三峽區國際一街47號", price: "$1-200", rating: "3.6", reviews: "743", category: "韓式", area: "側門", image: "images/koreanicon.png" },
    
    { id: '42', name: "強尼兄弟健康廚房", address: "新北市三峽區大觀路115號1樓", price: "$1-200", rating: "4.3", reviews: "857", category: "泰式", area: "正門", image: "images/thaicon.png" },
    { id: '43', name: "泰貳泰式風味料理", address: "新北市三峽區大觀路96之1號", price: "$200-400", rating: "4.7", reviews: "1,185", category: "泰式", area: "正門", image: "images/thaicon.png" },

    // 中式/飯食/麵食/水餃
    { id: '44', name: "蘇記水餃", address: "新北市三峽區和平街97號", price: "$1-200", rating: "4.1", reviews: "919", category: "中式", area: "後門/老街", image: "images/noodleicon.png" },
    { id: '45', name: "樂廚房 牛肉麵", address: "新北市三峽區大觀路116號", price: "$1-200", rating: "4.3", reviews: "242", category: "中式", area: "正門", image: "images/noodleicon.png" },
    { id: '46', name: "木子李", address: "新北市三峽區中山路42號", price: "$200-400", rating: "4.4", reviews: "323", category: "中式", area: "後門/老街", image: "images/riceicon.png" },
    { id: '47', name: "黑霸牛肉麵專賣店", address: "新北市三峽區大觀路27號", price: "$1-200", rating: "4.4", reviews: "1,027", category: "中式", area: "正門", image: "images/noodleicon.png" },
    { id: '48', name: "就這味", address: "新北市三峽區大觀路30號", price: "$1-200", rating: "4.2", reviews: "366", category: "中式", area: "正門", image: "images/noodleicon.png" },
    { id: '49', name: "三峽北大湘泊苑", address: "新北市三峽區國際一街43號", price: "$1-200", rating: "3.9", reviews: "232", category: "中式", area: "側門", image: "images/noodleicon.png" },
    { id: '50', name: "向陽冬瓜肉飯", address: "新北市樹林區學成路532號", price: "$1-200", rating: "4.3", reviews: "564", category: "中式", area: "正門", image: "images/riceicon.png" },
    { id: '51', name: "阿郎小吃", address: "新北市三峽區國學街16號", price: "$1-200", rating: "4.3", reviews: "54", category: "中式", area: "側門", image: "images/riceicon.png" },
    { id: '52', name: "大億美食", address: "新北市三峽區國學街57號", price: "$1-200", rating: "3.4", reviews: "72", category: "中式", area: "側門", image: "images/riceicon.png" },
    { id: '53', name: "元爵味 黃燜雞米飯", address: "新北市三峽區國際一街8號", price: "$200-400", rating: "4.8", reviews: "2,273", category: "中式", area: "正門", image: "images/riceicon.png" },
    { id: '54', name: "誠意鵝肉", address: "新北市三峽區大觀路20號", price: "$1-200", rating: "3.9", reviews: "312", category: "中式", area: "正門", image: "images/riceicon.png" },
    { id: '55', name: "官小二酸菜魚", address: "新北市三峽區大德路206號", price: "$200-400", rating: "4.9", reviews: "1,677", category: "中式", area: "正門", image: "images/noodleicon.png" },
    { id: '56', name: "大仁路小吃麵攤", address: "新北市三峽區大仁路35號", price: "$1-200", rating: "4.3", reviews: "328", category: "中式", area: "後門/老街", image: "images/noodleicon.png" },
    { id: '57', name: "雲南小院", address: "新北市三峽區國際一街33-1號", price: "$1-200", rating: "3.8", reviews: "25", category: "中式", area: "側門", image: "images/noodleicon.png" },
    { id: '58', name: "周哥炒翻天", address: "新北市樹林區大成路331號1樓", price: "$1-200", rating: "4.4", reviews: "83", category: "中式", area: "正門", image: "images/noodleicon.png" },
    { id: '59', name: "一品羊羊肉料理", address: "新北市三峽區和平街91-2號", price: "$1-200", rating: "4.1", reviews: "306", category: "中式", area: "後門/老街", image: "images/noodleicon.png" },
    { id: '60', name: "餃大人", address: "新北市三峽區國際一街27號2樓", price: "$1-200", rating: "4.2", reviews: "496", category: "中式", area: "側門", image: "images/noodleicon.png" },
    { id: '61', name: "快樂懷舊排骨", address: "新北市三峽區國際二街13號", price: "$1-200", rating: "3.5", reviews: "75", category: "中式", area: "側門", image: "images/riceicon.png" },
    { id: '62', name: "李記大腸蚵仔麵線", address: "新北市三峽區大觀路363號", price: "$1-200", rating: "3.3", reviews: "128", category: "中式", area: "正門", image: "images/noodleicon.png" },
    { id: '63', name: "四海遊龍", address: "新北市三峽區大學路133號", price: "$1-200", rating: "2.8", reviews: "157", category: "中式", area: "正門", image: "images/noodleicon.png" },
    { id: '64', name: "八方雲集鍋貼水餃專賣店", address: "新北市三峽區國際一街6號", price: "$1-200", rating: "2.9", reviews: "624", category: "中式", area: "正門", image: "images/noodleicon.png" },
    { id: '65', name: "武記鵝肉", address: "新北市三峽區中山路227號", price: "$1-200", rating: "4.2", reviews: "163", category: "中式", area: "後門/老街", image: "images/riceicon.png" },
    { id: '66', name: "三角鍋燒（煎餃）", address: "新北市三峽區民生街167號1樓", price: "$1-200", rating: "4.4", reviews: "263", category: "中式", area: "後門/老街", image: "images/noodleicon.png" },
    { id: '67', name: "古都燒肉飯", address: "新北市三峽區三樹路203號", price: "$1-200", rating: "4.2", reviews: "692", category: "中式", area: "正門", image: "images/riceicon.png" },
    { id: '68', name: "台灣G湯", address: "新北市三峽區學成路231-1f號", price: "$200-400", rating: "3.9", reviews: "199", category: "中式", area: "側門", image: "images/noodleicon.png" },
    { id: '69', name: "日生珍味", address: "新北市三峽區大仁路1號", price: "$1-200", rating: "3.9", reviews: "61", category: "中式", area: "後門/老街", image: "images/noodleicon.png" },
    { id: '70', name: "九品炒羊肉", address: "新北市三峽區大勇路24號", price: "$1-200", rating: "4.1", reviews: "169", category: "中式", area: "後門/老街", image: "images/noodleicon.png" },
    { id: '71', name: "大三元餃子館", address: "新北市三峽區大勇路1-3號", price: "$1-200", rating: "4.2", reviews: "485", category: "中式", area: "後門/老街", image: "images/noodleicon.png" },
    { id: '72', name: "忠將蔥抓餅", address: "新北市三峽區國學街8號", price: "$1-200", rating: "4.5", reviews: "50", category: "中式", area: "側門", image: "images/noodleicon.png" },
    { id: '73', name: "在心蛋餅舖", address: "新北市三峽區國際一街21號", price: "$1-200", rating: "4.5", reviews: "532", category: "中式", area: "側門", image: "images/noodleicon.png" },
    { id: '74', name: "峽客早午餐", address: "新北市三峽區國學街41號", price: "$1-200", rating: "4.0", reviews: "177", category: "中式", area: "側門", image: "images/noodleicon.png" },
    { id: '75', name: "元氣早餐店", address: "新北市三峽區大觀路105號", price: "$1-200", rating: "4.3", reviews: "142", category: "中式", area: "正門", image: "images/noodleicon.png" },
    { id: '76', name: "韓一美食館", address: "新北市三峽區國際二街3號", price: "$1-200", rating: "4.1", reviews: "200", category: "中式", area: "正門", image: "images/noodleicon.png" },
    { id: '77', name: "粥大福", address: "新北市三峽區大德路196號", price: "$1-200", rating: "4.6", reviews: "389", category: "中式", area: "正門", image: "images/riceicon.png" },
    { id: '78', name: "鬍鬚張魯肉飯", address: "新北市三峽區學成路250號", price: "$1-200", rating: "3.9", reviews: "1,056", category: "中式", area: "側門", image: "images/riceicon.png" },
    { id: '79', name: "福記牛肉麵.豬軟骨飯", address: "新北市三峽區國際一街45號", price: "$1-200", rating: "4.4", reviews: "279", category: "中式", area: "側門", image: "images/riceicon.png" },
    { id: '80', name: "五花馬水餃館", address: "新北市三峽區大學路86-1號", price: "$1-200", rating: "3.7", reviews: "949", category: "中式", area: "正門", image: "images/noodleicon.png" },
    { id: '81', name: "蕉ㄚ吐司", address: "新北市三峽區大觀路120號", price: "$1-200", rating: "4.6", reviews: "479", category: "中式", area: "正門", image: "images/riceicon.png" },
    { id: '82', name: "早安 幸福就該吃得飽", address: "新北市三峽區大德路479號", price: "$1-200", rating: "4.0", reviews: "417", category: "中式", area: "正門", image: "images/riceicon.png" },
    { id: '83', name: "雞博士 G-BOSS", address: "新北市三峽區大觀路315號", price: "$1-200", rating: "4.8", reviews: "56", category: "中式", area: "正門", image: "images/noodleicon.png" },
    { id: '84', name: "好棒棒本舖&蔡家虹手作三明治", address: "新北市三峽區大觀路25號", price: "$1-200", rating: "4.3", reviews: "45", category: "中式", area: "正門", image: "images/riceicon.png" },
    { id: '85', name: "早。自己【北大】", address: "新北市三峽區國際一街66-2號", price: "$1-200", rating: "4.6", reviews: "99", category: "中式", area: "側門", image: "images/riceicon.png" },
    
    // 火鍋
    { id: '86', name: "蒙虎白湯小火鍋", address: "新北市三峽區文化路262號", price: "$1-200", rating: "4.9", reviews: "2,356", category: "火鍋", area: "後門/老街", image: "images/hotpoticon.png" },
    { id: '87', name: "聚", address: "新北市三峽區學成路398號3樓", price: "$400-600", rating: "4.8", reviews: "10,966", category: "火鍋", area: "正門", image: "images/hotpoticon.png" },
    { id: '88', name: "泰鍋古藝", address: "新北市三峽區國學街88號", price: "$1-200", rating: "4.7", reviews: "1,401", category: "火鍋", area: "側門", image: "images/hotpoticon.png" },
    { id: '89', name: "八鍋小火鍋", address: "新北市三峽區國際一街10號1樓", price: "$1-200", rating: "4.2", reviews: "912", category: "火鍋", area: "側門", image: "images/hotpoticon.png" },
    { id: '90', name: "鍋媽精緻小火鍋", address: "新北市三峽區國際一街7號1樓", price: "$1-200", rating: "4.4", reviews: "1,298", category: "火鍋", area: "側門", image: "images/hotpoticon.png" },
    { id: '91', name: "麗媽四季火鍋", address: "新北市三峽區國際二街25號", price: "$1-200", rating: "3.8", reviews: "449", category: "火鍋", area: "側門", image: "images/hotpoticon.png" },
    { id: '92', name: "六扇門時尚湯鍋", address: "新北市三峽區學成路3-1號號", price: "$200-400", rating: "4.2", reviews: "1,388", category: "火鍋", area: "後門/老街", image: "images/hotpoticon.png" },
    { id: '93', name: "錢都日式涮涮鍋", address: "新北市三峽區大學路86-3號", price: "$200-400", rating: "4.3", reviews: "2,933", category: "火鍋", area: "正門", image: "images/hotpoticon.png" },
    { id: '94', name: "加分100%浜中特選昆布鍋物", address: "新北市樹林區學成路536號2樓", price: "$200-400", rating: "4.3", reviews: "77", category: "火鍋", area: "正門", image: "images/hotpoticon.png" },
    { id: '95', name: "滾吧 Qunba 鍋物", address: "新北市樹林區學勤路318號", price: "$200-400", rating: "4.8", reviews: "3,561", category: "火鍋", area: "正門", image: "images/hotpoticon.png" },
    { id: '96', name: "妖壽燒", address: "新北市三峽區中山路184巷店舖2號右2", price: "$200-400", rating: "4.6", reviews: "112", category: "火鍋", area: "後門/老街", image: "images/hotpoticon.png" },
    { id: '97', name: "耀武羊威自助火鍋", address: "新北市三峽區大學路150號2樓", price: "$400-600", rating: "4.5", reviews: "227", category: "火鍋", area: "正門", image: "images/hotpoticon.png" },
    { id: '98', name: "小李飛鍋", address: "新北市三峽區復興路170號", price: "$1-200", rating: "4.0", reviews: "100", category: "火鍋", area: "後門/老街", image: "images/hotpoticon.png" },
    { id: '99', name: "麻醉燙-川味麻辣燙", address: "新北市三峽區和平街38-1號", price: "$1-200", rating: "3.8", reviews: "387", category: "火鍋", area: "後門/老街", image: "images/hotpoticon.png" },

    // 美式/義式（統稱西式）
    { id: '100', name: "号鳥食趣義大利洋食 X 烤泡芙專賣", address: "新北市三峽區大觀路7號", price: "$200-400", rating: "4.3", reviews: "641", category: "義式", area: "正門", image: "images/spaicon1.png" },
    { id: '101', name: "Yummy亞咪義大利麵", address: "新北市三峽區大觀路109號", price: "$200-400", rating: "4.1", reviews: "485", category: "義式", area: "正門", image: "images/spaicon1.png" },
    { id: '102', name: "魔法義大利", address: "新北市三峽區國際二街1號", price: "$200-400", rating: "4.7", reviews: "3,367", category: "義式", area: "側門", image: "images/spaicon1.png" },
    { id: '103', name: "YCHY拾味", address: "新北市三峽區國際一街27-1號1樓", price: "$1-200", rating: "4.4", reviews: "777", category: "義式", area: "側門", image: "images/spaicon1.png" },
    { id: '104', name: "伊垛義式小廚", address: "新北市三峽區國際一街54號", price: "$1-200", rating: "4.3", reviews: "304", category: "義式", area: "側門", image: "images/spaicon1.png" },
    { id: '105', name: "不然去吃早午餐", address: "新北市三峽區大德路190號", price: "$1-200", rating: "4.8", reviews: "80", category: "西式", area: "正門", image: "images/westernicon.png" },
    { id: '106', name: "牛好吃", address: "新北市三峽區國際二街19號", price: "$200-400", rating: "3.8", reviews: "940", category: "西式", area: "側門", image: "images/westernicon.png" },
    { id: '107', name: "Anchor Restaurant 安可美式餐廳", address: "新北市樹林區學成路593號1樓", price: "$200-400", rating: "4.3", reviews: "336", category: "西式", area: "正門", image: "images/westernicon.png" },
    { id: '108', name: "帕司達義式料理", address: "新北市三峽區大觀路18號", price: "$200-400", rating: "4.1", reviews: "599", category: "西式", area: "正門", image: "images/westernicon.png" },
    { id: '109', name: "挑食picky eater", address: "新北市三峽區國際一街23號", price: "$1-200", rating: "4.0", reviews: "21", category: "西式", area: "側門", image: "images/westernicon.png" },
    { id: '110', name: "特點平價牛排", address: "新北市三峽區國際一街25-1號", price: "$200-400", rating: "4.1", reviews: "616", category: "西式", area: "側門", image: "images/westernicon.png" },
    { id: '111', name: "夯牛屋", address: "新北市三峽區國際一街41號", price: "$200-400", rating: "3.9", reviews: "735", category: "西式", area: "側門", image: "images/westernicon.png" },
    { id: '112', name: "La Olive綠橄欖創意蔬食料理", address: "新北市三峽區國際二街35號1 樓", price: "$200-400", rating: "4.4", reviews: "379", category: "西式", area: "側門", image: "images/westernicon.png" },
    { id: '113', name: "麥當勞", address: "新北市三峽區學成路258號", price: "$1-200", rating: "3.9", reviews: "4,446", category: "西式", area: "側門", image: "images/westernicon.png" },
    { id: '114', name: "SUBWAY", address: "新北市三峽區國學街84號", price: "$1-200", rating: "3.5", reviews: "706", category: "西式", area: "側門", image: "images/westernicon.png" },
    { id: '115', name: "肯德基KFC", address: "新北市三峽區大學路150-3號", price: "$200-400", rating: "3.4", reviews: "2,155", category: "西式", area: "正門", image: "images/westernicon.png" },
    { id: '116', name: "慢思 Amour.Sacrifice", address: "新北市三峽區國際二街25 號", price: "$1-200", rating: "4.4", reviews: "409", category: "西式", area: "側門", image: "images/westernicon.png" },
    { id: '117', name: "王子平價牛排", address: "新北市三峽區和平街95號", price: "$200-400", rating: "3.2", reviews: "102", category: "西式", area: "後門/老街", image: "images/westernicon.png" },
    { id: '118', name: "六年五班熱壓吐司", address: "新北市三峽區大仁路63號", price: "$1-200", rating: "3.4", reviews: "44", category: "西式", area: "後門/老街", image: "images/westernicon.png" },
    { id: '119', name: "Hang Ba碳烤土司", address: "新北市三峽區大學路152號", price: "$1-200", rating: "4.2", reviews: "63", category: "西式", area: "正門", image: "images/westernicon.png" },
    { id: '120', name: "享聚餐酒館 Savor Bistro", address: "新北市三峽區國際一街5號2樓", price: "$200-400", rating: "4.8", reviews: "1,485", category: "西式", area: "側門", image: "images/westernicon.png" },

    // 麵食/飯食 (獨立類別)
    { id: '121', name: "有麵煮自助泡麵", address: "新北市三峽區國學街43號", price: "$1-200", rating: "4.9", reviews: "41", category: "麵食", area: "側門", image: "images/noodleicon.png" },
    { id: '122', name: "勝博殿", address: "新北市三峽區學成路227號", price: "$400-600", rating: "4.0", reviews: "563", category: "麵食", area: "正門", image: "images/noodleicon.png" },
    { id: '123', name: "坐一下吧", address: "新北市三峽區國際一街80號1樓", price: "$200-400", rating: "3.3", reviews: "267", category: "飯食", area: "側門", image: "images/riceicon.png" },
    { id: '124', name: "津米烤肉飯", address: "新北市三峽區和平街68號", price: "$1-200", rating: "3.7", reviews: "72", category: "飯食", area: "後門/老街", image: "images/riceicon.png" }
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
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentSpaImg, setCurrentSpaImg] = useState(spaIcon1);
  const [resultIndex, setResultIndex] = useState(0);
  
  const [showListFilter, setShowListFilter] = useState(false);
  const [listFilters, setListFilters] = useState<{categories: string[], prices: string[], areas: string[]}>({
    categories: [], prices: [], areas: []
  });

  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

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
      if (value === "") {
        return { ...prev, [type]: [] };
      }
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
    setViewMode('decide');
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
        setResultIndex(0);
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

  // 背景動畫
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

    const animImages = [
      coffeeIcon, susiIcon, koreanIcon, noodleIcon, riceIcon, vegIcon, 
      spaIcon1, hotpotIcon, thaiIcon, westernIcon
    ];
    const safeIndices: number[] = [];

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
      
      if (Math.abs(row - centerRow) > 1.5 || Math.abs(col - centerCol) > 1.5) {
        safeIndices.push(i);
      }
    }

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
            if (imgEl) { imgEl.src = randomImgSrc; }
            dot.classList.add('is-flipped');
            lastIndex = rand;
        }
    }, 1200);

    return () => clearInterval(interval);
  }, [viewMode]);

  // 渲染卡片函式 (更新：加入 Detail 按鈕)
  const renderCard = (r: any, isMain = false) => (
    <div key={r.id} className={`card ${isMain ? 'card--main' : ''}`}>
      <div className="card-img-shell">
        <img src={ICON_MAP[r.image] || ICON_MAP['default']} alt={r.name} />
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
        {/* 👇 新增的 Detail 按鈕：點擊後觸發全域彈窗 */}
        <button className="btn-detail" onClick={() => setSelectedRestaurant(r)}>
          Detail
        </button>
      </div>
    </div>
  );

  const CATEGORY_OPTIONS = ['中式','日式','韓式','泰式','西式','火鍋','健康餐','飯食','麵食','甜點','飲料','咖啡廳'];
  const PRICE_OPTIONS = ['$1-200', '$200-400', '$400-600'];
  const AREA_OPTIONS = ['正門', '側門', '後門/老街'];

  return (
    <div className="app-container">
      {viewMode !== 'home' && (
        <div className="nav-shell">
          <img src={logoImage} alt="What2Eat" className="nav-logo" onClick={() => setViewMode('home')} />
          <div className="nav-pill">
            <button className={`nav-link ${viewMode === 'filters' ? 'active' : ''}`} onClick={() => setViewMode('filters')}>Decide Now</button>
            <button className={`nav-link ${viewMode === 'favorites' ? 'active' : ''}`} onClick={() => setViewMode('favorites')}>Favorites</button>
            <button className={`nav-link ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>Restaurant List</button>
            <button className={`nav-link ${viewMode === 'about' ? 'active' : ''}`} onClick={() => setViewMode('about')}>About us</button>
          </div>
        </div>
      )}

      {/* HOME */}
      {viewMode === 'home' && (
        <section className="page-section active">
          <div className="hero-bg-animation" ref={heroBgRef}></div>
          <div className="hero" style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'center', 
            textAlign: 'center', justifyContent: 'center', minHeight: '60vh'
          }}>
            <div className="hero-plate" style={{ marginBottom: '32px' }}>
              <img src={plateIcon} alt="Logo" style={{ width: '80%', height: 'auto' }} />
            </div>
            <div>
              <div className="hero-text-main">What2Eat</div>
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
            <div className="panel-sub">篩選你的偏好（類型 / 價位 / 區域），也可以直接隨機抽取！</div>

            <div className="filter-group">
              <div className="filter-label">餐廳類型：</div>
              <div className="chip-row">
                <button 
                  className={`chip ${filters.categories.length === 0 ? 'active' : ''}`}
                  onClick={() => handleFilterToggle('categories', "")}
                >All</button>
                {CATEGORY_OPTIONS.map(t => (
                  <button key={t} className={`chip ${filters.categories.includes(t) ? 'active' : ''}`}
                    onClick={() => handleFilterToggle('categories', t)}>{t}</button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <div className="filter-label">價格範圍：</div>
              <div className="chip-row">
                {PRICE_OPTIONS.map(p => (
                  <button key={p} className={`chip ${filters.prices.includes(p) ? 'active' : ''}`}
                    onClick={() => handleFilterToggle('prices', p)}>{p}</button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <div className="filter-label">校門區域：</div>
              <div className="chip-row">
                {AREA_OPTIONS.map(a => (
                  <button key={a} className={`chip ${filters.areas.includes(a) ? 'active' : ''}`}
                    onClick={() => handleFilterToggle('areas', a)}>{a}</button>
                ))}
              </div>
            </div>

            <div className="filter-actions">
              <button className="btn btn-outline" onClick={() => setFilters({categories:[], prices:[], areas:[]})}>Reset</button>
              <button className="btn btn-primary" onClick={applyFilters}>Apply Filters</button>
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
               <div className="panel-sub" style={{ marginBottom: '16px' }}>共有 {currentPool.length} 間候選餐廳，按下 Start 吧！</div>
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
               <button className="carousel-arrow" disabled={spinResult.length <= 1} onClick={() => setResultIndex(prev => (prev - 1 + spinResult.length) % spinResult.length)}>‹</button>
               <div className="carousel-track">
                  {spinResult.length > 1 && (
                    <div className="card card--side" onClick={() => setResultIndex((resultIndex - 1 + spinResult.length) % spinResult.length)}>
                      {renderCard(spinResult[(resultIndex - 1 + spinResult.length) % spinResult.length], false)}
                    </div>
                  )}
                  <div style={{ zIndex: 10 }}>{renderCard(spinResult[resultIndex], true)}</div>
                  {spinResult.length > 1 && (
                    <div className="card card--side" onClick={() => setResultIndex((resultIndex + 1) % spinResult.length)}>
                      {renderCard(spinResult[(resultIndex + 1) % spinResult.length], false)}
                    </div>
                  )}
               </div>
               <button className="carousel-arrow" disabled={spinResult.length <= 1} onClick={() => setResultIndex(prev => (prev + 1) % spinResult.length)}>›</button>
            </div>

            {(() => {
              const r = spinResult[resultIndex];
              return (
                <div className="result-details-grid">
                  <div className="detail-box">
                    <div className="detail-title">Details</div>
                    <div className="detail-content">
                      <div className="detail-row"><span className="detail-label">名稱：</span><span>{r.name}</span></div>
                      <div className="detail-row"><span className="detail-label">地址：</span><span>{r.address}</span></div>
                      <div className="detail-row"><span className="detail-label">類型：</span><span>{r.category}</span></div>
                      <div className="detail-row"><span className="detail-label">價位：</span><span>{r.price}</span></div>
                      <div className="detail-row"><span className="detail-label">評分：</span><span>{r.rating} ⭐ ({r.reviews} 則評論)</span></div>
                      <div className="detail-row"><span className="detail-label">區域：</span><span>{r.area}</span></div>
                    </div>
                  </div>
                  <div className="detail-box">
                    <div className="detail-title">Map</div>
                    <iframe 
                      className="map-frame" loading="lazy" title="map"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(r.name + " " + r.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    ></iframe>
                    <a 
                      className="btn-map-go"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name + " " + r.address)}`}
                      target="_blank" rel="noreferrer"
                    >
                      前往 Google Maps
                    </a>
                  </div>
                </div>
              );
            })()}

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
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
               {/* 👇 更新：列表動作區 (清除 & 篩選圓形按鈕) */}
               <div className="list-actions">
                 {/* 清除篩選按鈕 */}
                 <button 
                   className="list-action-btn" 
                   title="清除篩選"
                   onClick={() => setListFilters({categories:[], prices:[], areas:[]})}
                 >
                   <img src={clearIcon} alt="Clear" />
                 </button>
                 
                 {/* 開啟篩選器按鈕 */}
                 <button 
                   className="list-action-btn" 
                   title="開啟篩選"
                   onClick={() => setShowListFilter(!showListFilter)}
                 >
                   <img src={filterIcon} alt="Filter" />
                 </button>
               </div>
            </div>
            {showListFilter && (
               <div className="list-filter-panel" style={{ display: 'block', marginBottom: '16px', padding: '16px', borderTop:'1px solid #ffeef3' }}>
                  <div className="chip-row">
                    <button className="chip" onClick={() => setListFilters({categories:[], prices:[], areas:[]})}>Clear</button>
                    {CATEGORY_OPTIONS.map(t => (
                      <button key={t} className={`chip ${listFilters.categories.includes(t) ? 'active' : ''}`}
                        onClick={() => handleFilterToggle('categories', t, true)}>{t}</button>
                    ))}
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
                    <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => setSelectedRestaurant(r)}>
                      <div className="fav-item-name">{r.name}</div>
                      <div className="fav-item-address">{r.address}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {/* 👇 更新：垃圾桶現在是圖片 */}
                        <button className="fav-btn" onClick={(e) => {
                          e.stopPropagation(); toggleFavorite(r.name);
                        }}>
                          <img src={trashIcon} alt="Delete" />
                        </button>
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
              <div className="about-title">About What2Eat</div>
<div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>💡 專案緣起</h3>
                <p className="about-desc" style={{ marginBottom: '16px' }}>
                  「午餐吃什麼？」大概是每個人每天最常問、也最難回答的問題。
                  <br/>
                  為了拯救廣大選擇困難症患者，我們開發了 <strong>What2Eat</strong> —— 一款專為北大師生打造的美食決策助手。整合了三峽校區周邊（正門、側門、後門）的在地美食資訊，讓決定下一餐變得輕鬆又有趣。
                </p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>✨ 特色功能</h3>
                <ul style={{ listStyle: 'none', padding: 0, color: '#666', fontSize: '15px', lineHeight: '1.8' }}>
                  <li>🍀 <strong>趣味轉盤決策</strong>：透過可愛的義大利麵動畫，隨機抽出你的命定美食。</li>
                  <li>🔍 <strong>多重條件篩選</strong>：支援依照「餐廳類型」、「預算範圍」、「校門區域」精準過濾。</li>
                  <li>❤️ <strong>我的最愛清單</strong>：一鍵收藏喜歡的店家，資料自動儲存不遺失。</li>
                  <li>🗺️ <strong>地圖一鍵導航</strong>：整合 Google Maps API，查看評價並直接開啟導航。</li>
                </ul>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>🛠️ 使用技術</h3>
                <p className="about-desc">
                  本專案採用現代化前端技術堆疊開發：
                  <br/>
                  <span className="badge" style={{marginRight:'4px'}}>React</span>
                  <span className="badge" style={{marginRight:'4px'}}>TypeScript</span>
                  <span className="badge" style={{marginRight:'4px'}}>Tailwind CSS</span>
                  <span className="badge">Vite</span>
                </p>
              </div>
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
      {/* Modal - 詳情彈窗 */}
      {selectedRestaurant && (
        <div className="modal-overlay" onClick={() => setSelectedRestaurant(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="btn-close-absolute" onClick={() => setSelectedRestaurant(null)}>×</button>
            <div className="modal-header">
              <div className="modal-title">{selectedRestaurant.name}</div>
              <div className="modal-meta">
                <span>⭐ {selectedRestaurant.rating}</span>
                <span>💬 {selectedRestaurant.reviews} 則評論</span>
                <span className="badge">{selectedRestaurant.category}</span>
              </div>
              <div className="modal-date">資料擷取日期：2025/11/25</div>
            </div>
            <div style={{color: '#555', fontSize: '15px', display:'flex', alignItems:'center', gap:'6px', justifyContent:'center'}}>
               📍 {selectedRestaurant.address}
            </div>
            <div className="modal-map-container">
              <iframe 
                width="100%" height="100%" frameBorder="0" style={{border:0}} loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedRestaurant.name + ' ' + selectedRestaurant.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                title="Google Map"
              ></iframe>
            </div>
            <div style={{ textAlign: 'center' }}>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedRestaurant.name + ' ' + selectedRestaurant.address)}`} 
                target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}
              >
                <button className="btn btn-primary" style={{ width: '100%' }}>🌏 開啟 Google Maps 導航</button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
