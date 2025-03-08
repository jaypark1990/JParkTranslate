import { SupportedLanguage } from '../types';

// English Approximate Pronunciation Guide
function getEnglishPronunciation(text: string): string {
  const mapping: { [key: string]: string } = {
    // Common words
    'hello': 'HEH-loh',
    'thank': 'thangk',
    'you': 'yoo',
    'good': 'gud',
    'morning': 'MOR-ning',
    'bye': 'bai',
    'yes': 'yehs',
    'no': 'noh',
    'please': 'pleez',
    'sorry': 'SAW-ree',
    'what': 'wut',
    'where': 'wehr',
    'when': 'wehn',
    'who': 'hoo',
    'why': 'wai',
    'how': 'how',
    'eat': 'eet',
    'drink': 'dringk',
    'love': 'luhv',
    'like': 'laik',
    
    // Common sounds
    'th': 'th',
    'ch': 'ch',
    'sh': 'sh',
    'ph': 'f',
    'wh': 'w',
    'ck': 'k',
    
    // Vowel sounds
    'a': 'ah',
    'e': 'eh',
    'i': 'ih',
    'o': 'oh',
    'u': 'uh',
    'ee': 'ee',
    'ea': 'ee',
    'oo': 'oo',
    'ou': 'ow',
    'ow': 'ow',
    'ay': 'ay',
    'ai': 'ay',
    'igh': 'ai',
    'er': 'er',
    'ir': 'er',
    'ur': 'er',
    'ar': 'ar',
    'or': 'or',
    
    // Consonant blends
    'bl': 'bl',
    'br': 'br',
    'cl': 'kl',
    'cr': 'kr',
    'dr': 'dr',
    'fl': 'fl',
    'fr': 'fr',
    'gl': 'gl',
    'gr': 'gr',
    'pl': 'pl',
    'pr': 'pr',
    'sc': 'sk',
    'sk': 'sk',
    'sl': 'sl',
    'sm': 'sm',
    'sn': 'sn',
    'sp': 'sp',
    'st': 'st',
    'sw': 'sw',
    'tr': 'tr',
    'tw': 'tw'
  };

  let result = text.toLowerCase();
  Object.entries(mapping)
    .sort((a, b) => b[0].length - a[0].length)
    .forEach(([pattern, pronunciation]) => {
      result = result.replace(new RegExp(pattern, 'gi'), pronunciation);
    });
  
  return result.trim();
}

// Thai Phonetic Spelling
function getThaiPronunciation(text: string): string {
  const mapping: { [key: string]: string } = {
    // Common Thai consonants
    'ก': 'g',
    'ข': 'k',
    'ค': 'k',
    'ง': 'ng',
    'จ': 'j',
    'ฉ': 'ch',
    'ช': 'ch',
    'ซ': 's',
    'ญ': 'y',
    'ด': 'd',
    'ต': 't',
    'ถ': 't',
    'ท': 't',
    'น': 'n',
    'บ': 'b',
    'ป': 'p',
    'ผ': 'p',
    'ฝ': 'f',
    'พ': 'p',
    'ฟ': 'f',
    'ม': 'm',
    'ย': 'y',
    'ร': 'r',
    'ล': 'l',
    'ว': 'w',
    'ส': 's',
    'ห': 'h',
    'อ': 'a',
    
    // Thai vowels
    'า': 'aa',
    'ิ': 'i',
    'ี': 'ii',
    'ึ': 'ue',
    'ื': 'uue',
    'ุ': 'u',
    'ู': 'uu',
    'เ': 'e',
    'แ': 'ae',
    'โ': 'o',
    'ไ': 'ai',
    'ใ': 'ai',
    
    // Tone marks
    '่': '1',
    '้': '2',
    '๊': '3',
    '๋': '4'
  };

  let result = text;
  Object.entries(mapping).forEach(([thai, roman]) => {
    result = result.replace(new RegExp(thai, 'g'), roman);
  });
  
  return result;
}

// Korean Approximation (Hangul)
function getKoreanPronunciation(text: string): string {
  const mapping: { [key: string]: string } = {
    // Basic consonants
    'ㄱ': 'g/k',
    'ㄴ': 'n',
    'ㄷ': 'd/t',
    'ㄹ': 'r/l',
    'ㅁ': 'm',
    'ㅂ': 'b/p',
    'ㅅ': 's',
    'ㅇ': 'ng',
    'ㅈ': 'j',
    'ㅊ': 'ch',
    'ㅋ': 'k',
    'ㅌ': 't',
    'ㅍ': 'p',
    'ㅎ': 'h',
    
    // Vowels
    'ㅏ': 'a',
    'ㅓ': 'eo',
    'ㅗ': 'o',
    'ㅜ': 'u',
    'ㅡ': 'eu',
    'ㅣ': 'i',
    'ㅐ': 'ae',
    'ㅔ': 'e',
    'ㅚ': 'oe',
    'ㅟ': 'wi',
    
    // Common syllables
    '안': 'an',
    '녕': 'nyeong',
    '하': 'ha',
    '세': 'se',
    '요': 'yo',
    '감': 'gam',
    '사': 'sa',
    '합': 'hap',
    '니': 'ni',
    '다': 'da'
  };

  let result = text;
  Object.entries(mapping).forEach(([korean, roman]) => {
    result = result.replace(new RegExp(korean, 'g'), roman);
  });
  
  return result;
}

// Chinese Mandarin (Pinyin + Characters)
function getChinesePronunciation(text: string): string {
  const mapping: { [key: string]: string } = {
    // Common characters with pinyin
    '你': 'nǐ',
    '好': 'hǎo',
    '我': 'wǒ',
    '是': 'shì',
    '谢': 'xiè',
    '请': 'qǐng',
    '对': 'duì',
    '不': 'bù',
    '吃': 'chī',
    '喝': 'hē',
    '说': 'shuō',
    '看': 'kàn',
    '听': 'tīng',
    '写': 'xiě',
    '读': 'dú',
    '做': 'zuò',
    '去': 'qù',
    '来': 'lái',
    '想': 'xiǎng',
    '要': 'yào',
    
    // Numbers
    '一': 'yī',
    '二': 'èr',
    '三': 'sān',
    '四': 'sì',
    '五': 'wǔ',
    '六': 'liù',
    '七': 'qī',
    '八': 'bā',
    '九': 'jiǔ',
    '十': 'shí'
  };

  let result = text;
  Object.entries(mapping).forEach(([chinese, pinyin]) => {
    result = result.replace(new RegExp(chinese, 'g'), `${chinese}(${pinyin})`);
  });
  
  return result;
}

export function getPhoneticTranscription(
  text: string,
  sourceLanguage: SupportedLanguage,
  targetLanguage: SupportedLanguage
): string {
  if (!text) return '';

  switch (sourceLanguage) {
    case 'en':
      return getEnglishPronunciation(text);
    case 'th':
      return getThaiPronunciation(text);
    case 'ko':
      return getKoreanPronunciation(text);
    case 'zh':
      return getChinesePronunciation(text);
    default:
      return '';
  }
}