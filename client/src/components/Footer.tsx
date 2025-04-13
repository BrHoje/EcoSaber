import { Button } from "@/components/ui/button";

export default function Footer() {
  const downloadPdf = () => {
    window.location.href = '/download-project-pdf';
  };

  const downloadTxt = () => {
    window.location.href = '/download-project-txt';
  };

  return (
    <footer className="bg-neutral-dark py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-8">
          <h3 className="text-xl font-bold mb-4">Projeto para Submissão Acadêmica</h3>
          <div className="flex gap-4 flex-wrap justify-center">
            <Button 
              onClick={downloadPdf}
              className="bg-un-blue hover:bg-opacity-90 transition-colors flex items-center gap-2"
            >
              <i className="fas fa-file-pdf"></i>
              Baixar Projeto em HTML
            </Button>
            <Button 
              onClick={downloadTxt}
              variant="outline"
              className="border-white text-white hover:bg-white hover:bg-opacity-10 transition-colors flex items-center gap-2"
            >
              <i className="fas fa-file-alt"></i>
              Baixar Documentação em TXT
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-leaf text-eco-green text-2xl mr-2"></i>
              <span className="font-heading font-bold text-xl text-white">EcoSaber</span>
            </div>
            <p className="text-neutral-mid mb-6">Promovendo a educação de qualidade para um futuro sustentável.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-mid hover:text-white transition-colors">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-neutral-mid hover:text-white transition-colors">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-neutral-mid hover:text-white transition-colors">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-neutral-mid hover:text-white transition-colors">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-heading font-semibold text-lg mb-4">Links Rápidos</h5>
            <ul className="space-y-2">
              <li><a href="#inicio" className="text-neutral-mid hover:text-white transition-colors">Início</a></li>
              <li><a href="#sobre" className="text-neutral-mid hover:text-white transition-colors">Sobre o Projeto</a></li>
              <li><a href="#ods" className="text-neutral-mid hover:text-white transition-colors">ODS 4</a></li>
              <li><a href="#campanha" className="text-neutral-mid hover:text-white transition-colors">Nossa Campanha</a></li>
              <li><a href="#recursos" className="text-neutral-mid hover:text-white transition-colors">Recursos</a></li>
              <li><a href="#impacto" className="text-neutral-mid hover:text-white transition-colors">Impacto</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-heading font-semibold text-lg mb-4">Recursos</h5>
            <ul className="space-y-2">
              <li><a href="#recursos" className="text-neutral-mid hover:text-white transition-colors">Materiais Didáticos</a></li>
              <li><a href="#recursos" className="text-neutral-mid hover:text-white transition-colors">Vídeos Educativos</a></li>
              <li><a href="#recursos" className="text-neutral-mid hover:text-white transition-colors">Infográficos</a></li>
              <li><a href="#recursos" className="text-neutral-mid hover:text-white transition-colors">Guias de Atividades</a></li>
              <li><a href="#" className="text-neutral-mid hover:text-white transition-colors">Centro de Pesquisa</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-heading font-semibold text-lg mb-4">Contato</h5>
            <ul className="space-y-2">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-neutral-mid"></i>
                <span className="text-neutral-mid">Rua Exemplo, 123<br />São Paulo - SP</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-neutral-mid"></i>
                <a href="mailto:contato@ecosaber.org" className="text-neutral-mid hover:text-white transition-colors">contato@ecosaber.org</a>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-3 text-neutral-mid"></i>
                <a href="tel:+551199999999" className="text-neutral-mid hover:text-white transition-colors">(11) 99999-9999</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-mid mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-mid text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EcoSaber. Todos os direitos reservados.
          </div>
          <div className="flex items-center">
            <a href="#" className="text-neutral-mid hover:text-white text-sm mr-6 transition-colors">Política de Privacidade</a>
            <a href="#" className="text-neutral-mid hover:text-white text-sm transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
