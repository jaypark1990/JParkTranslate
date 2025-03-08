import { useCallback } from 'react';
import { SupportedLanguage } from '../types';

// Language code mapping for speech synthesis
const languageMap: Record<SupportedLanguage, string> = {
  en: 'en-US',
  ko: 'ko-KR',
  th: 'th-TH',
  zh: 'zh-CN',
  ja: 'ja-JP'
};

export function useSpeechSynthesis() {
  const speak = useCallback((text: string, language: SupportedLanguage) => {
    if (!text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageMap[language];
    
    // Use default voice settings
    utterance.pitch = 1.0;
    utterance.rate = 1.0;
    utterance.volume = 1.0;
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find a voice for the specified language
    const voice = voices.find(v => v.lang.startsWith(languageMap[language]));

    if (voice) {
      utterance.voice = voice;
    }

    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak };
}