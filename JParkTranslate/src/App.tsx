import React, { useState } from 'react';
import { Mic, StopCircle, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguagePair } from './components/LanguagePair';
import { LanguageSelector } from './components/LanguageSelector';
import { TranscriptionDisplay } from './components/TranscriptionDisplay';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';
import { SupportedLanguage } from './types';

function App() {
  const { t, i18n } = useTranslation();
  const [sourceLanguage, setSourceLanguage] = useState<SupportedLanguage>('en');
  const [targetLanguage, setTargetLanguage] = useState<SupportedLanguage>('ko');
  const [isRecording, setIsRecording] = useState(false);
  const { 
    transcript, 
    translation,
    phoneticTranscript,
    phoneticTranslation, 
    error,
    startRecording, 
    stopRecording 
  } = useVoiceRecognition(sourceLanguage, targetLanguage);

  const handleStartRecording = () => {
    setIsRecording(true);
    startRecording();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopRecording();
  };

  const handleInterfaceLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pickled-bluewood-50 to-white p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Languages className="w-6 h-6 sm:w-8 sm:h-8 text-pickled-bluewood-600" />
              <h1 className="text-xl sm:text-2xl font-bold text-pickled-bluewood-900">{t('app.title')}</h1>
            </div>
            <LanguageSelector
              value={i18n.language as SupportedLanguage}
              onChange={handleInterfaceLanguageChange}
              isInterfaceLanguage
            />
          </div>

          {/* Language Selection */}
          <div className="mb-8">
            <LanguagePair
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              onSourceChange={setSourceLanguage}
              onTargetChange={setTargetLanguage}
            />
          </div>

          {/* Recording Button */}
          <div className="flex flex-col items-center mb-8">
            <button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full transition-all duration-300 ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-pickled-bluewood-600 hover:bg-pickled-bluewood-700'
              }`}
            >
              {isRecording ? (
                <StopCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              ) : (
                <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium text-pickled-bluewood-600 whitespace-nowrap">
                {isRecording ? t('actions.stop') : t('actions.speak')}
              </span>
            </button>
          </div>

          {/* Transcription Display */}
          <TranscriptionDisplay
            transcript={transcript}
            translation={translation}
            phoneticTranscript={phoneticTranscript}
            phoneticTranslation={phoneticTranslation}
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default App