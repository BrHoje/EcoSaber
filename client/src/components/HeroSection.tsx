import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const handleButtonClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 64,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="inicio" className="pt-24 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-un-blue to-eco-green">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 text-white">
          <h1 className="text-3xl md:text-5xl font-bold font-heading mb-6">
            EcoSaber: Educação para um Futuro Sustentável
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Promovendo a conscientização sobre a Educação de Qualidade (ODS 4) para construir comunidades mais conscientes e sustentáveis.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => handleButtonClick("#campanha")}
              className="bg-white text-un-blue font-bold px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              style={{ color: '#0073bb' }}
            >
              Nossa Campanha
            </Button>
            <Button 
              onClick={() => handleButtonClick("#ods")}
              variant="outline" 
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Sobre o ODS 4
            </Button>
          </div>
        </div>
        <div className="md:col-span-5">
          <img 
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1009&q=80" 
            alt="Estudantes participando de atividade educacional sustentável" 
            className="rounded-lg shadow-xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
