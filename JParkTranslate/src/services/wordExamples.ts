import { SupportedLanguage } from '../types';

// Function to generate example sentences for words
export function generateWordExample(word: string, language: SupportedLanguage): string {
  // Common words and their example sentences for each language
  const examples: Record<SupportedLanguage, Record<string, string>> = {
    en: {
      // Common English words with the word included in the sentence
      'hello': 'Hello to my silly cat',
      'world': 'The world is so tiny',
      'love': 'I love dancing penguins',
      'eat': 'Dinosaurs eat rainbow cookies',
      'sleep': 'Cats sleep on clouds',
      'run': 'Unicorns run through candy',
      'happy': 'Happy dolphins play jazz',
      'sad': 'The sad pizza cries',
      'big': 'My big dreams fly',
      'small': 'The small dragon giggles',
      'good': 'Your good cake dances',
      'bad': 'That bad weather disappeared',
      'beautiful': 'Beautiful rainbows wear hats',
      'ugly': 'The ugly sweater laughs',
      'fast': 'Fast snails race backward',
      'slow': 'The slow turtle wins',
      'hot': 'Hot chocolate does yoga',
      'cold': 'Cold penguins surf waves',
      'new': 'My new shoes sparkle',
      'old': 'The old book whispers'
    },
    ko: {
      '안녕': '안녕 우리 강아지야',
      '세상': '작은 세상 속에서',
      '사랑': '나는 사랑 노래해',
      '먹다': '토끼가 당근 먹다',
      '자다': '고양이가 자다 꿈꿔',
      '달리다': '강아지가 달리다 웃어',
      '행복': '행복 가득한 하루',
      '슬픔': '슬픔 없는 날들',
      '크다': '크다란 무지개 떴다',
      '작다': '작다란 별이 반짝',
      '좋다': '날씨가 좋다 웃네',
      '나쁘다': '기분이 나쁘다 가네',
      '아름답다': '꽃이 아름답다 피네',
      '못생기다': '못생긴 인형도 귀여워',
      '빠르다': '토끼가 빠르다 뛰네',
      '느리다': '거북이 느리다 가네',
      '뜨겁다': '커피가 뜨겁다 식혀',
      '차갑다': '아이스크림 차갑다 녹아',
      '새롭다': '새롭다 우리 만남',
      '오래되다': '오래된 책이 말해'
    },
    zh: {
      '你好': '我说你好就笑了',
      '世界': '这个世界真奇妙',
      '爱': '我爱吃甜甜圈',
      '吃': '小猫吃鱼高兴',
      '睡觉': '熊猫睡觉真可爱',
      '跑': '小狗跑得快',
      '开心': '我很开心地唱歌',
      '伤心': '小鸟伤心地飞走',
      '大': '一个大苹果红了',
      '小': '小花猫在玩',
      '好': '天气好得很',
      '坏': '坏天气快走',
      '美丽': '美丽的彩虹来了',
      '丑': '丑小鸭变天鹅',
      '快': '火车快地跑',
      '慢': '乌龟慢慢爬',
      '热': '太阳热得晒',
      '冷': '冰淇淋冷得很',
      '新': '新衣服真漂亮',
      '旧': '旧书本有故事'
    },
    th: {
      'สวัสดี': 'สวัสดี เพื่อนรัก',
      'โลก': 'โลก นี้สวยงาม',
      'รัก': 'ฉัน รัก ขนมหวาน',
      'กิน': 'แมว กิน ปลา',
      'นอน': 'หมี นอน สบาย',
      'วิ่ง': 'หมา วิ่ง เร็ว',
      'มีความสุข': 'ฉัน มีความสุข มาก',
      'เศร้า': 'นก เศร้า บิน',
      'ใหญ่': 'บ้าน ใหญ่ มาก',
      'เล็ก': 'แมว เล็ก น่ารัก',
      'ดี': 'อากาศ ดี จัง',
      'ไม่ดี': 'อารมณ์ ไม่ดี หาย',
      'สวย': 'ดอกไม้ สวย บาน',
      'น่าเกลียด': 'หน้ากาก น่าเกลียด หาย',
      'เร็ว': 'รถ เร็ว มาก',
      'ช้า': 'เต่า ช้า คลาน',
      'ร้อน': 'กาแฟ ร้อน จัง',
      'เย็น': 'ไอศกรีม เย็น ละลาย',
      'ใหม่': 'รองเท้า ใหม่ สวย',
      'เก่า': 'หนังสือ เก่า เล่า'
    },
    ja: {
      'こんにちは': 'こんにちは 私の友達',
      '世界': '小さな 世界 の中で',
      '愛': '私は 愛 を歌う',
      '食べる': 'うさぎが 食べる にんじん',
      '寝る': '猫が 寝る 夢を見る',
      '走る': '犬が 走る 笑顔で',
      '幸せ': '幸せ いっぱいの一日',
      '悲しい': '悲しい 日々は去って',
      '大きい': '大きい 虹が出た',
      '小さい': '小さい 星が輝く',
      '良い': '天気が 良い 笑顔',
      '悪い': '気分が 悪い 消える',
      '美しい': '花が 美しい 咲く',
      '醜い': '醜い 人形も可愛い',
      '速い': 'うさぎが 速い 走る',
      '遅い': '亀が 遅い 歩く',
      '熱い': 'コーヒーが 熱い 冷ます',
      '冷たい': 'アイスが 冷たい 溶ける',
      '新しい': '新しい 出会いだ',
      '古い': '古い 本が語る'
    }
  };

  // Language-specific default examples
  const defaultExamples: Record<SupportedLanguage, (word: string) => string[]> = {
    en: (word) => [
      `The ${word} dances away`,
      `My ${word} brings joy`,
      `Little ${word} sparkles bright`,
      `The ${word} tells stories`,
      `Happy ${word} jumps high`
    ],
    ko: (word) => [
      `${word} 하는 강아지`,
      `${word} 노래 부르기`,
      `${word} 꿈꾸는 밤`,
      `${word} 웃는 하늘`,
      `${word} 춤추는 별`
    ],
    zh: (word) => [
      `${word}的小猫咪`,
      `${word}在跳舞`,
      `${word}真可爱`,
      `${word}笑得开心`,
      `${word}像彩虹`
    ],
    th: (word) => [
      `${word} น่ารักจัง`,
      `${word} เต้นรำสวย`,
      `${word} ยิ้มสดใส`,
      `${word} ฝันดี`,
      `${word} มีความสุข`
    ],
    ja: (word) => [
      `${word}の子猫`,
      `${word}が踊る`,
      `${word}は可愛い`,
      `${word}と笑顔`,
      `${word}は虹のよう`
    ]
  };

  // Try to find a predefined example for the word
  const languageExamples = examples[language];
  if (languageExamples && languageExamples[word]) {
    return languageExamples[word];
  }

  // If no example is found, return a random language-specific default example
  const defaultLanguageExamples = defaultExamples[language](word);
  const randomIndex = Math.floor(Math.random() * defaultLanguageExamples.length);
  return defaultLanguageExamples[randomIndex];
}