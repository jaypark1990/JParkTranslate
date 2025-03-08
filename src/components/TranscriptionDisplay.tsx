import React from 'react';
import { Loader2, AlertCircle, BookOpen, MessageSquare, Languages, Volume2, Drama as GrammarIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SupportedLanguage, GrammarRule } from '../types';
import { translateWord, getWordsFromText } from '../services/translation';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { getGrammarRules, analyzeSentenceStructure } from '../services/grammarRules';
import { generateWordExample } from '../services/wordExamples';

interface TranscriptionDisplayProps {
  transcript: string;
  translation: string;
  phoneticTranscript: string;
  phoneticTranslation: string;
  sourceLanguage: SupportedLanguage;
  targetLanguage: SupportedLanguage;
  error?: string | null;
}

export function TranscriptionDisplay({
  transcript,
  translation,
  phoneticTranscript,
  phoneticTranslation,
  sourceLanguage,
  targetLanguage,
  error
}: TranscriptionDisplayProps) {
  const { t } = useTranslation();
  const { speak } = useSpeechSynthesis();

  const handleSpeakSource = () => {
    if (transcript) {
      speak(transcript, sourceLanguage);
    }
  };

  const handleSpeakTranslation = () => {
    if (translation && !error) {
      speak(translation, targetLanguage);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-pickled-bluewood-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              {t('sections.speech')} ({t(`languages.${sourceLanguage}`)})
            </h2>
            <button
              onClick={handleSpeakSource}
              className={`p-2 transition-all duration-200 ${
                transcript
                  ? 'text-pickled-bluewood-600 hover:text-pickled-bluewood-800 cursor-pointer'
                  : 'text-pickled-bluewood-300 cursor-not-allowed'
              }`}
              disabled={!transcript}
              title={transcript ? `Listen in ${t(`languages.${sourceLanguage}`)}` : 'No text to speak'}
            >
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div className="min-h-[6rem] p-3 sm:p-4 bg-pickled-bluewood-50 rounded-lg">
            <p className="text-sm sm:text-base text-pickled-bluewood-700 whitespace-pre-wrap">
              {transcript || t('app.startSpeaking')}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-pickled-bluewood-900 flex items-center gap-2">
              <Languages className="w-4 h-4 sm:w-5 sm:h-5" />
              {t('sections.translated')} ({t(`languages.${targetLanguage}`)})
            </h2>
            <button
              onClick={handleSpeakTranslation}
              className={`p-2 transition-all duration-200 ${
                translation && !error
                  ? 'text-pickled-bluewood-600 hover:text-pickled-bluewood-800 cursor-pointer'
                  : 'text-pickled-bluewood-300 cursor-not-allowed'
              }`}
              disabled={!translation || !!error}
              title={translation && !error ? `Listen in ${t(`languages.${targetLanguage}`)}` : 'No text to speak'}
            >
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <div className="min-h-[6rem] p-3 sm:p-4 bg-pickled-bluewood-50 rounded-lg">
            {error ? (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <p className="text-sm sm:text-base">{t(`errors.${error}`)}</p>
              </div>
            ) : (
              <p className="text-sm sm:text-base text-pickled-bluewood-700 whitespace-pre-wrap">
                {translation || t('app.translationWillAppear')}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-base sm:text-lg font-semibold text-pickled-bluewood-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
          {t('sections.explanation')}
        </h2>
        
        <div className="bg-pickled-bluewood-50 rounded-lg p-3 sm:p-4 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs sm:text-sm font-medium text-pickled-bluewood-600 flex items-center gap-2">
              <Languages className="w-4 h-4" />
              {t('explanation.wordByWord')}
            </h3>
            <div className="grid gap-2">
              {transcript ? (
                getWordsFromText(transcript, sourceLanguage).map((word, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                    <span className="text-pickled-bluewood-900 font-medium">{word}</span>
                    <span className="text-pickled-bluewood-400">→</span>
                    <span className="text-pickled-bluewood-700">{word}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs sm:text-sm text-pickled-bluewood-500 italic">
                  {t('app.translationWillAppear')}
                </p>
              )}
            </div>
          </div>

          {transcript && (
            <>
              <div className="space-y-2 border-t border-pickled-bluewood-100 pt-4">
                <h3 className="text-xs sm:text-sm font-medium text-pickled-bluewood-600 flex items-center gap-2">
                  <GrammarIcon className="w-4 h-4" />
                  {t('explanation.grammar')}
                </h3>
                <div className="space-y-3">
                  {getGrammarRules(sourceLanguage, targetLanguage).map((rule, index) => (
                    <div key={index} className="space-y-1">
                      <p className="text-xs sm:text-sm font-medium text-pickled-bluewood-800">
                        {rule.pattern}
                      </p>
                      <p className="text-xs sm:text-sm text-pickled-bluewood-600">
                        {rule.explanation}
                      </p>
                      <p className="text-xs sm:text-sm text-pickled-bluewood-500 italic">
                        {t('example')}: {rule.example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 border-t border-pickled-bluewood-100 pt-4">
                <h3 className="text-xs sm:text-sm font-medium text-pickled-bluewood-600 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {t('explanation.structure')}
                </h3>
                <div className="text-xs sm:text-sm text-pickled-bluewood-600 whitespace-pre-line">
                  {analyzeSentenceStructure(transcript, sourceLanguage, targetLanguage)}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}