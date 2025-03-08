import translate from 'translate';
import { SupportedLanguage } from '../types';

// Language code mapping for translation
const languageMap: Record<SupportedLanguage, string> = {
  en: 'en',
  ko: 'ko',
  th: 'th',
  zh: 'zh-CN',
  ja: 'ja'
};

export function getWordsFromText(text: string, language: SupportedLanguage): string[] {
  if (!text) return [];

  switch (language) {
    case 'th':
      return segmentThaiText(text);
    case 'ko':
      return text.match(/[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]+|\S+/g) || [];
    case 'zh':
      return text.match(/[\u4E00-\u9FFF\u3400-\u4DBF\u20000-\u2A6DF\u2A700-\u2B73F\u2B740-\u2B81F\u2B820-\u2CEAF\uF900-\uFAFF]+/g) || [];
    case 'ja':
      return text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\uFF66-\uFF9F]+|\S+/g) || [];
    default:
      return text.split(' ').filter(word => word.trim());
  }
}

export async function translateText(
  text: string,
  sourceLanguage: SupportedLanguage,
  targetLanguage: SupportedLanguage
): Promise<string> {
  if (!text.trim()) {
    return '';
  }

  try {
    translate.engine = 'google';
    translate.from = languageMap[sourceLanguage];
    
    const translatedText = await translate(text, {
      to: languageMap[targetLanguage]
    });

    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('translation');
  }
}

export async function translateWord(
  word: string,
  sourceLanguage: SupportedLanguage,
  targetLanguage: SupportedLanguage
): Promise<string> {
  if (!word.trim()) {
    return word;
  }

  try {
    translate.engine = 'google';
    translate.from = languageMap[sourceLanguage];
    
    const translatedWord = await translate(word, {
      to: languageMap[targetLanguage]
    });

    return translatedWord || word;
  } catch (error) {
    console.error('Translation error:', error);
    return word;
  }
}

function segmentThaiText(text: string): string[] {
  const THAI_PATTERNS = [
    '[ก-ฮ]เ[ก-ฮ]',
    '[ก-ฮ]่[ก-ฮ]',
    '[ก-ฮ][ะาิีุูเแโใไ็่้๊๋์]์?',
    '[ก-ฮ][ก-ฮ]',
    '[ก-ฮ]'
  ];

  let remaining = text;
  const words: string[] = [];
  
  while (remaining.length > 0) {
    let matched = false;
    
    for (const pattern of THAI_PATTERNS) {
      const regex = new RegExp('^' + pattern);
      const match = remaining.match(regex);
      
      if (match) {
        words.push(match[0]);
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      words.push(remaining[0]);
      remaining = remaining.slice(1);
    }
  }
  
  return words;
}