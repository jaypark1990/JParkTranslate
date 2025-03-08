export interface TranslationResponse {
  translation_text: string;
}

export interface VoiceRecognitionState {
  transcript: string;
  translation: string;
  phoneticTranscript: string;
  phoneticTranslation: string;
  isRecording: boolean;
  isTranslating: boolean;
  error: string | null;
}

export type SupportedLanguage = 'en' | 'ko' | 'th' | 'zh' | 'ja';

export interface PhoneticResult {
  text: string;
  phonetic: string;
}

export interface GrammarRule {
  pattern: string;
  explanation: string;
  example: string;
}

export interface TranslationExplanation {
  wordByWord: Array<{ source: string; target: string }>;
  grammarRules: GrammarRule[];
  sentenceStructure: {
    source: string;
    explanation: string;
  };
}