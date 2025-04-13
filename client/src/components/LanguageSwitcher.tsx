import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full border-un-blue bg-white hover:bg-gray-100"
          style={{ width: '40px', height: '40px', minWidth: '40px', padding: '0' }}
        >
          <Globe className="h-5 w-5 text-un-blue" />
          <span className="sr-only">{t('language.title')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white shadow-lg border border-neutral-200">
        <DropdownMenuItem 
          onClick={() => changeLanguage('pt')}
          className={currentLanguage.startsWith('pt') ? 'bg-blue-50 font-semibold text-un-blue' : 'hover:bg-blue-50'}
        >
          {t('language.pt')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={currentLanguage.startsWith('en') ? 'bg-blue-50 font-semibold text-un-blue' : 'hover:bg-blue-50'}
        >
          {t('language.en')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;