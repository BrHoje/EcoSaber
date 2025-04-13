import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ContrastMode {
  name: string;
  className: string;
}

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [selectedContrast, setSelectedContrast] = useState<string | null>(null);

  const contrastModes: ContrastMode[] = [
    { name: 'Normal', className: '' },
    { name: 'Alto Contraste', className: 'high-contrast' },
    { name: 'Daltonismo', className: 'color-blind' },
    { name: 'Escala de Cinza', className: 'grayscale' }
  ];

  // Function to read text on the page
  const speakText = () => {
    if (!isSpeaking) {
      const pageTitleElement = document.querySelector('h1');
      const pageTitle = pageTitleElement ? pageTitleElement.textContent : 'Bem-vindo ao EcoSaber';
      
      const textToRead = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, a');
      let fullText = pageTitle + ". ";
      
      textToRead.forEach((element) => {
        if (element.textContent) {
          fullText += element.textContent + ". ";
        }
      });

      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'pt-BR';
      utterance.rate = 1;
      utterance.onend = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Function to stop text-to-speech
  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // Function to change font size
  const changeFontSize = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    document.documentElement.style.setProperty('--font-size-multiplier', `${newSize}%`);
  };

  // Function to change contrast mode
  const changeContrastMode = (mode: string) => {
    // Remove any existing contrast classes
    document.body.classList.remove('high-contrast', 'color-blind', 'grayscale');
    
    if (mode !== 'Normal') {
      const contrastMode = contrastModes.find(m => m.name === mode);
      if (contrastMode && contrastMode.className) {
        document.body.classList.add(contrastMode.className);
      }
      setSelectedContrast(mode);
    } else {
      setSelectedContrast(null);
    }
  };

  // Reset all accessibility settings
  const resetSettings = () => {
    setFontSize(100);
    document.documentElement.style.setProperty('--font-size-multiplier', '100%');
    
    document.body.classList.remove('high-contrast', 'color-blind', 'grayscale');
    setSelectedContrast(null);
    
    stopSpeaking();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);
  
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            className="h-12 w-12 rounded-full bg-eco-green hover:bg-eco-green/90 text-white shadow-lg"
            aria-label="Opções de acessibilidade"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
              <path d="M12 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
              <path d="M20 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0z"></path>
              <path d="M4 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0z"></path>
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Opções de Acessibilidade</h3>
            
            <div className="space-y-2">
              <Label htmlFor="text-to-speech">Leitura de Texto</Label>
              <div className="flex gap-2">
                <Button 
                  variant={isSpeaking ? "destructive" : "default"}
                  onClick={speakText}
                  className="flex-1"
                >
                  {isSpeaking ? 'Parar Leitura' : 'Ler Página'}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="font-size">Tamanho do Texto ({fontSize}%)</Label>
              <Slider
                id="font-size"
                min={80}
                max={200}
                step={10}
                value={[fontSize]}
                onValueChange={changeFontSize}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contrast-modes">Modo de Contraste</Label>
              <div className="grid grid-cols-2 gap-2">
                {contrastModes.map((mode) => (
                  <Button
                    key={mode.name}
                    variant={selectedContrast === mode.name ? "default" : "outline"}
                    className={selectedContrast === mode.name ? "bg-un-blue text-white" : ""}
                    onClick={() => changeContrastMode(mode.name)}
                  >
                    {mode.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full border-gray-300"
              onClick={resetSettings}
            >
              Restaurar Padrão
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccessibilityWidget;