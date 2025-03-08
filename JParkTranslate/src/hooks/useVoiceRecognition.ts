import { useState, useEffect, useCallback } from 'react';
import { translateText } from '../services/translation';
import { getPhoneticTranscription } from '../services/phonetics';
import type { VoiceRecognitionState, SupportedLanguage } from '../types';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export function useVoiceRecognition(sourceLanguage: SupportedLanguage, targetLanguage: SupportedLanguage) {
  const [state, setState] = useState<VoiceRecognitionState>({
    transcript: '',
    translation: '',
    phoneticTranscript: '',
    phoneticTranslation: '',
    isRecording: false,
    isTranslating: false,
    error: null
  });
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      const langMap: Record<SupportedLanguage, string> = {
        en: 'en-US',
        ko: 'ko-KR',
        th: 'th-TH',
        zh: 'zh-CN',
        ja: 'ja-JP'
      };
      recognition.lang = langMap[sourceLanguage];

      recognition.onresult = async (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript = transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          const phoneticTranscript = getPhoneticTranscription(finalTranscript, sourceLanguage, targetLanguage);
          
          setState(prev => ({ 
            ...prev, 
            transcript: finalTranscript,
            phoneticTranscript,
            isTranslating: true,
            error: null 
          }));

          try {
            const translatedText = await translateText(finalTranscript, sourceLanguage, targetLanguage);
            const phoneticTranslation = getPhoneticTranscription(translatedText, sourceLanguage, targetLanguage);
            
            setState(prev => ({
              ...prev,
              translation: translatedText,
              phoneticTranslation,
              isTranslating: false,
              error: null
            }));
          } catch (error) {
            setState(prev => ({
              ...prev,
              isTranslating: false,
              error: error instanceof Error ? error.message : 'translation'
            }));
          }
        } else if (interimTranscript) {
          const phoneticTranscript = getPhoneticTranscription(interimTranscript, sourceLanguage, targetLanguage);
          
          setState(prev => ({
            ...prev,
            transcript: interimTranscript,
            phoneticTranscript,
            error: null
          }));
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setState(prev => ({
          ...prev,
          isRecording: false,
          error: event.error === 'not-allowed' 
            ? 'microphoneAccess'
            : 'speechRecognition'
        }));
      };

      recognition.onend = () => {
        if (state.isRecording) {
          try {
            recognition.start();
          } catch (error) {
            console.error('Failed to restart recognition:', error);
          }
        }
      };

      setRecognition(recognition);
    } else {
      setState(prev => ({
        ...prev,
        error: 'browserSupport'
      }));
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [sourceLanguage, targetLanguage, state.isRecording]);

  const startRecording = useCallback(() => {
    if (recognition) {
      setState(prev => ({
        ...prev,
        transcript: '',
        translation: '',
        phoneticTranscript: '',
        phoneticTranslation: '',
        isRecording: true,
        error: null
      }));
      try {
        recognition.start();
      } catch (error) {
        setState(prev => ({
          ...prev,
          isRecording: false,
          error: 'startRecording'
        }));
      }
    }
  }, [recognition]);

  const stopRecording = useCallback(() => {
    if (recognition) {
      try {
        recognition.stop();
        setState(prev => ({ ...prev, isRecording: false }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          isRecording: false,
          error: 'stopRecording'
        }));
      }
    }
  }, [recognition]);

  return {
    transcript: state.transcript,
    translation: state.translation,
    phoneticTranscript: state.phoneticTranscript,
    phoneticTranslation: state.phoneticTranslation,
    isRecording: state.isRecording,
    isTranslating: state.isTranslating,
    error: state.error,
    startRecording,
    stopRecording,
  };
}