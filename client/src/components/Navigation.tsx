import { useState } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const getNavLinks = (t: any) => [
  { href: "#inicio", label: t('menu.home') },
  { href: "#sobre", label: t('menu.about') },
  { href: "#ods", label: t('menu.sdg') },
  { href: "#campanha", label: t('menu.campaign') },
  { href: "#recursos", label: t('menu.resources') },
  { href: "#impacto", label: t('menu.impact') },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#inicio");
  const { t } = useTranslation();

  const handleNavLinkClick = (href: string) => {
    setActiveLink(href);
    setIsMobileMenuOpen(false);
    
    // Handle smooth scrolling
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 64,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center">
                <i className="fas fa-leaf text-eco-green text-2xl mr-2"></i>
                <span className="font-heading font-bold text-xl text-un-blue">EcoSaber</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
              {getNavLinks(t).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavLinkClick(link.href);
                  }}
                  className={cn(
                    "border-b-2 px-1 py-4 font-medium text-sm text-neutral-dark",
                    activeLink === link.href
                      ? "border-un-blue"
                      : "border-transparent hover:border-un-blue hover:text-un-blue"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center gap-3">
            <Button
              className="bg-un-blue hover:bg-opacity-90 transition-colors text-white font-semibold"
              onClick={() => handleNavLinkClick("#participar")}
              style={{ backgroundColor: '#0073bb', color: 'white' }}
            >
              {t('menu.join')}
            </Button>
            <LanguageSwitcher />
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-dark hover:text-un-blue hover:bg-neutral-mid focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("sm:hidden", !isMobileMenuOpen && "hidden")} id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {getNavLinks(t).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick(link.href);
              }}
              className={cn(
                "block pl-3 pr-4 py-2 text-base font-medium",
                activeLink === link.href
                  ? "bg-neutral-mid text-un-blue"
                  : "hover:bg-neutral-mid hover:text-un-blue"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-neutral-mid">
          <div className="flex items-center px-4 gap-2">
            <div className="flex-1">
              <Button
                className="w-full bg-un-blue hover:bg-opacity-90 transition-colors text-white font-semibold"
                onClick={() => handleNavLinkClick("#participar")}
                style={{ backgroundColor: '#0073bb', color: 'white' }}
              >
                {t('menu.join')}
              </Button>
            </div>
            <div className="flex-shrink-0">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
