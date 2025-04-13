import { Button } from "@/components/ui/button";

export default function CampaignSection() {
  const strategies = [
    {
      icon: "lightbulb",
      title: "Workshops Educacionais",
      description: "Realizamos workshops interativos em escolas e centros comunitários, abordando temas relacionados à sustentabilidade ambiental, consumo consciente e educação para a cidadania global."
    },
    {
      icon: "users",
      title: "Formação de Multiplicadores",
      description: "Capacitamos jovens e educadores para se tornarem agentes de mudança em suas comunidades, promovendo a educação sustentável em seus círculos de influência."
    },
    {
      icon: "laptop",
      title: "Plataforma Digital de Aprendizagem",
      description: "Desenvolvemos uma plataforma online com recursos educacionais gratuitos sobre desenvolvimento sustentável, acessíveis a educadores, estudantes e comunidade em geral."
    },
    {
      icon: "handshake",
      title: "Parcerias Estratégicas",
      description: "Estabelecemos colaborações com escolas, universidades, empresas e organizações não-governamentais para ampliar o alcance e o impacto de nossas iniciativas."
    }
  ];

  const timeline = [
    {
      phase: "Fase 1: Planejamento e Mobilização",
      period: "Março - Abril 2023",
      description: "Definição de objetivos, identificação de stakeholders e planejamento estratégico. Formação da equipe e estabelecimento das primeiras parcerias.",
      current: false
    },
    {
      phase: "Fase 2: Desenvolvimento de Conteúdo",
      period: "Maio - Julho 2023",
      description: "Criação de materiais educativos, desenvolvimento da plataforma digital e capacitação da equipe de multiplicadores.",
      current: false
    },
    {
      phase: "Fase 3: Implementação",
      period: "Agosto - Novembro 2023",
      description: "Realização de workshops, eventos comunitários e lançamento da plataforma digital. Início do programa de formação de multiplicadores.",
      current: true
    },
    {
      phase: "Fase 4: Avaliação e Expansão",
      period: "Dezembro 2023 - Fevereiro 2024",
      description: "Avaliação de resultados, documentação de aprendizados e planejamento para expansão do programa para novas comunidades.",
      current: false
    },
    {
      phase: "Fase 5: Consolidação",
      period: "Março - Dezembro 2024",
      description: "Institucionalização do programa, ampliação de parcerias e estabelecimento de um modelo sustentável de longo prazo.",
      current: false
    }
  ];

  const participationOptions = [
    {
      icon: "user-plus",
      title: "Voluntariado",
      description: "Junte-se à nossa equipe como voluntário e contribua com suas habilidades e conhecimentos para o sucesso da campanha.",
      action: "Seja Voluntário"
    },
    {
      icon: "handshake",
      title: "Parcerias",
      description: "Estabeleça uma parceria com nossa iniciativa e ajude a ampliar o alcance e o impacto de nossas ações educativas.",
      action: "Torne-se Parceiro"
    },
    {
      icon: "share-alt",
      title: "Divulgação",
      description: "Compartilhe nossas mensagens e materiais educativos em suas redes sociais e ajude a promover a consciência sobre a importância da educação sustentável.",
      action: "Compartilhar"
    }
  ];

  return (
    <section id="campanha" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-heading text-neutral-dark mb-4">Nossa Campanha</h2>
          <p className="text-lg text-neutral-dark max-w-3xl mx-auto">
            Conheça as ações que estamos desenvolvendo para promover a educação de qualidade em nossa comunidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-2xl font-bold font-heading text-un-blue mb-6">Estratégias de Ação</h3>
            
            {strategies.map((strategy, index) => (
              <div key={index} className="flex items-start mb-8">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-eco-green text-white">
                    <i className={`fas fa-${strategy.icon}`}></i>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold font-heading text-neutral-dark mb-2">{strategy.title}</h4>
                  <p className="text-gray-700">{strategy.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold font-heading text-un-blue mb-6">Linha do Tempo</h3>
            
            <div className="relative border-l-2 border-un-blue pl-8 pb-8">
              {timeline.map((phase, index) => (
                <div key={index}>
                  <div className={`absolute -left-2 top-[calc(${index * 25}%-0.5rem)] h-4 w-4 rounded-full ${phase.current ? 'bg-un-blue' : index < 2 ? 'bg-un-blue' : 'bg-neutral-mid'}`}></div>
                  <div className="mb-8">
                    <h4 className={`text-lg font-semibold font-heading ${phase.current ? 'text-action-orange' : 'text-neutral-dark'} mb-1`}>
                      {phase.phase}
                      {phase.current && (
                        <span className="bg-action-orange bg-opacity-20 text-action-orange text-xs font-semibold px-2 py-1 rounded-full ml-2">
                          Atual
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">{phase.period}</p>
                    <p className="text-gray-700">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-neutral-light rounded-xl p-8 shadow-md">
          <h3 className="text-2xl font-bold font-heading text-un-blue mb-6 text-center">Como Participar</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {participationOptions.map((option, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-un-blue text-white text-2xl mb-4">
                  <i className={`fas fa-${option.icon}`}></i>
                </div>
                <h4 className="text-lg font-semibold font-heading text-neutral-dark mb-2">{option.title}</h4>
                <p className="text-gray-700">{option.description}</p>
                <Button variant="link" onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })} className="mt-4 text-un-blue font-semibold hover:underline">
                  {option.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
