import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { LanguageSelector } from './LanguageSelector';

interface LanguagePairProps {
  sourceLanguage: SupportedLanguage;
  targetLanguage: SupportedLanguage;
  onSourceChange: (language: SupportedLanguage) => void;
  onTargetChange: (language: SupportedLanguage) => void;
}

export function LanguagePair({
  sourceLanguage,
  targetLanguage,
  onSourceChange,
  onTargetChange
}: LanguagePairProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <label className="text-sm font-medium text-pickled-bluewood-600 text-center">
            {t('translation.from')}
          </label>
          <LanguageSelector
            value={sourceLanguage}
            onChange={onSourceChange}
          />
        </div>
        <div className="hidden sm:block pb-2.5">
          <ArrowRight className="w-5 h-5 text-pickled-bluewood-400" />
        </div>
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <label className="text-sm font-medium text-pickled-bluewood-600 text-center">
            {t('translation.to')}
          </label>
          <LanguageSelector
            value={targetLanguage}
            onChange={onTargetChange}
          />
        </div>
      </div>
    </div>
  );
}