import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SupportedLanguage } from '../types';
import { US, KR, TH, CN, JP } from 'country-flag-icons/react/3x2';

interface LanguageSelectorProps {
  value: SupportedLanguage;
  onChange: (language: SupportedLanguage) => void;
  isInterfaceLanguage?: boolean;
}

const flagComponents = {
  en: US,
  ko: KR,
  th: TH,
  zh: CN,
  ja: JP
};

const allLanguages: SupportedLanguage[] = ['en', 'ko', 'th', 'zh', 'ja'];

export function LanguageSelector({ value, onChange, isInterfaceLanguage = false }: LanguageSelectorProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    if (isInterfaceLanguage) {
      i18n.changeLanguage(newLanguage);
    }
    onChange(newLanguage);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const FlagIcon = flagComponents[value];

  return (
    <div className="relative w-full sm:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 bg-white rounded-lg hover:bg-pickled-bluewood-50 transition-colors border border-pickled-bluewood-200"
      >
        <FlagIcon className="w-5 h-5 rounded-sm" />
        <span className="text-sm font-medium text-pickled-bluewood-700">{t(`languages.${value}`)}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 left-0 sm:left-auto mt-2 w-full sm:w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-pickled-bluewood-200">
          {allLanguages.map((lang) => {
            const Flag = flagComponents[lang];
            return (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-pickled-bluewood-50 transition-colors ${
                  value === lang ? 'text-pickled-bluewood-600 font-medium bg-pickled-bluewood-50' : 'text-pickled-bluewood-700'
                }`}
              >
                <Flag className="w-5 h-5 rounded-sm" />
                {t(`languages.${lang}`)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}