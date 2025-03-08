import { SupportedLanguage, GrammarRule } from '../types';
import i18next from 'i18next';

const t = i18next.t.bind(i18next);

// Grammar rules for each language pair
function getLocalizedGrammarRules(sourceLanguage: SupportedLanguage, targetLanguage: SupportedLanguage): GrammarRule[] {
  const key = `${sourceLanguage}-${targetLanguage}`;
  
  const rules: Record<string, () => GrammarRule[]> = {
    'en-zh': () => [
      {
        pattern: t('grammarRules.en-zh.svo.pattern'),
        explanation: t('grammarRules.en-zh.svo.explanation'),
        example: t('grammarRules.en-zh.svo.example')
      },
      {
        pattern: t('grammarRules.en-zh.verbTense.pattern'),
        explanation: t('grammarRules.en-zh.verbTense.explanation'),
        example: t('grammarRules.en-zh.verbTense.example')
      },
      {
        pattern: t('grammarRules.en-zh.articles.pattern'),
        explanation: t('grammarRules.en-zh.articles.explanation'),
        example: t('grammarRules.en-zh.articles.example')
      }
    ],
    'zh-en': () => [
      {
        pattern: t('grammarRules.en-zh.svo.pattern'),
        explanation: t('grammarRules.en-zh.svo.explanation'),
        example: t('grammarRules.en-zh.svo.example')
      },
      {
        pattern: t('grammarRules.en-zh.verbTense.pattern'),
        explanation: t('grammarRules.en-zh.verbTense.explanation'),
        example: t('grammarRules.en-zh.verbTense.example')
      },
      {
        pattern: t('grammarRules.en-zh.articles.pattern'),
        explanation: t('grammarRules.en-zh.articles.explanation'),
        example: t('grammarRules.en-zh.articles.example')
      }
    ],
    'en-ko': () => [
      {
        pattern: t('grammarRules.en-ko.wordOrder.pattern'),
        explanation: t('grammarRules.en-ko.wordOrder.explanation'),
        example: t('grammarRules.en-ko.wordOrder.example')
      },
      {
        pattern: t('grammarRules.en-ko.auxiliary.pattern'),
        explanation: t('grammarRules.en-ko.auxiliary.explanation'),
        example: t('grammarRules.en-ko.auxiliary.example')
      },
      {
        pattern: t('grammarRules.en-ko.particles.pattern'),
        explanation: t('grammarRules.en-ko.particles.explanation'),
        example: t('grammarRules.en-ko.particles.example')
      }
    ],
    'ko-en': () => [
      {
        pattern: t('grammarRules.en-ko.wordOrder.pattern'),
        explanation: t('grammarRules.en-ko.wordOrder.explanation'),
        example: t('grammarRules.en-ko.wordOrder.example')
      },
      {
        pattern: t('grammarRules.en-ko.auxiliary.pattern'),
        explanation: t('grammarRules.en-ko.auxiliary.explanation'),
        example: t('grammarRules.en-ko.auxiliary.example')
      },
      {
        pattern: t('grammarRules.en-ko.particles.pattern'),
        explanation: t('grammarRules.en-ko.particles.explanation'),
        example: t('grammarRules.en-ko.particles.example')
      }
    ],
    'en-th': () => [
      {
        pattern: t('grammarRules.en-th.wordOrder.pattern'),
        explanation: t('grammarRules.en-th.wordOrder.explanation'),
        example: t('grammarRules.en-th.wordOrder.example')
      },
      {
        pattern: t('grammarRules.en-th.verbForm.pattern'),
        explanation: t('grammarRules.en-th.verbForm.explanation'),
        example: t('grammarRules.en-th.verbForm.example')
      },
      {
        pattern: t('grammarRules.en-th.articles.pattern'),
        explanation: t('grammarRules.en-th.articles.explanation'),
        example: t('grammarRules.en-th.articles.example')
      }
    ],
    'th-en': () => [
      {
        pattern: t('grammarRules.en-th.wordOrder.pattern'),
        explanation: t('grammarRules.en-th.wordOrder.explanation'),
        example: t('grammarRules.en-th.wordOrder.example')
      },
      {
        pattern: t('grammarRules.en-th.verbForm.pattern'),
        explanation: t('grammarRules.en-th.verbForm.explanation'),
        example: t('grammarRules.en-th.verbForm.example')
      },
      {
        pattern: t('grammarRules.en-th.articles.pattern'),
        explanation: t('grammarRules.en-th.articles.explanation'),
        example: t('grammarRules.en-th.articles.example')
      }
    ]
  };

  // If we have a reverse pair, swap source and target languages
  const reversePair = `${targetLanguage}-${sourceLanguage}`;
  return rules[key]?.() || rules[reversePair]?.() || [];
}

export function getGrammarRules(sourceLanguage: SupportedLanguage, targetLanguage: SupportedLanguage): GrammarRule[] {
  return getLocalizedGrammarRules(sourceLanguage, targetLanguage);
}

export function analyzeSentenceStructure(
  text: string,
  sourceLanguage: SupportedLanguage,
  targetLanguage: SupportedLanguage
): string {
  if (!text) return '';

  const key = `${sourceLanguage}-${targetLanguage}`;
  
  switch (sourceLanguage) {
    case 'en':
      return analyzeEnglishSentence(text);
    case 'zh':
      return analyzeChineseSentence(text);
    case 'ko':
      return analyzeKoreanSentence(text);
    case 'th':
      return analyzeThaiSentence(text);
    default:
      return t('analysis.notAvailable');
  }
}

function analyzeEnglishSentence(text: string): string {
  const words = text.toLowerCase().split(' ');
  let analysis = t('analysis.englishStructure') + '\n';

  // Identify sentence components
  const hasSubject = words.some(word => englishPatterns.pronouns.includes(word));
  const hasAuxiliary = words.some(word => englishPatterns.auxiliaries.includes(word));
  const hasArticle = words.some(word => englishPatterns.articles.includes(word));
  const hasPreposition = words.some(word => englishPatterns.prepositions.includes(word));
  const hasCompound = words.some(word => englishPatterns.compounds.includes(word));

  if (hasSubject) analysis += t('grammar.subject') + '\n';
  if (hasAuxiliary) analysis += t('grammar.auxiliary') + '\n';
  if (hasArticle) analysis += t('grammar.article') + '\n';
  if (hasPreposition) analysis += t('grammar.preposition') + '\n';
  if (hasCompound) analysis += t('grammar.compound') + '\n';

  if (text.endsWith('?')) {
    analysis += t('grammar.question') + '\n';
  } else if (text.endsWith('!')) {
    analysis += t('grammar.exclamation') + '\n';
  } else {
    analysis += t('grammar.declarative') + '\n';
  }

  return analysis;
}

// English word types and patterns for better segmentation
const englishPatterns = {
  compounds: [
    'into',
    'onto',
    'upon',
    'within',
    'without',
    'throughout',
    'nevertheless',
    'nonetheless',
    'however',
    'therefore',
    'moreover',
    'furthermore'
  ],
  prepositions: [
    'in',
    'on',
    'at',
    'to',
    'for',
    'with',
    'by',
    'from',
    'of',
    'about'
  ],
  articles: ['a', 'an', 'the'],
  auxiliaries: [
    'am',
    'is',
    'are',
    'was',
    'were',
    'be',
    'being',
    'been',
    'have',
    'has',
    'had',
    'do',
    'does',
    'did'
  ],
  pronouns: [
    'i',
    'you',
    'he',
    'she',
    'it',
    'we',
    'they',
    'me',
    'him',
    'her',
    'us',
    'them',
    'my',
    'your',
    'his',
    'its',
    'our',
    'their'
  ]
};

function analyzeChineseSentence(text: string): string {
  const hasSubject = /^[我你他她它我们你们他们]/.test(text);
  const hasTimeWord = /(今天|明天|昨天|现在)/.test(text);
  const hasObject = text.length > 2;
  
  let analysis = t('analysis.chineseStructure') + '\n';
  if (hasSubject) analysis += t('analysis.zh.subject') + '\n';
  if (hasTimeWord) analysis += t('analysis.zh.time') + '\n';
  if (hasObject) analysis += t('analysis.zh.object') + '\n';
  
  return analysis;
}

function analyzeKoreanSentence(text: string): string {
  const hasSubject = /(는|은|가|이)/.test(text);
  const hasObject = /(를|을)/.test(text);
  const hasPoliteEnding = /(습니다|니다|세요|어요)/.test(text);
  
  let analysis = t('analysis.koreanStructure') + '\n';
  if (hasSubject) analysis += t('analysis.ko.subject') + '\n';
  if (hasObject) analysis += t('analysis.ko.object') + '\n';
  if (hasPoliteEnding) analysis += t('analysis.ko.polite') + '\n';
  
  return analysis;
}

function analyzeThaiSentence(text: string): string {
  const hasSubject = /^(ผม|ฉัน|เขา|เธอ|คุณ)/.test(text);
  const hasTimeWord = /(วันนี้|พรุ่งนี้|เมื่อวาน)/.test(text);
  
  let analysis = t('analysis.thaiStructure') + '\n';
  if (hasSubject) analysis += t('analysis.th.subject') + '\n';
  if (hasTimeWord) analysis += t('analysis.th.time') + '\n';
  
  return analysis;
}