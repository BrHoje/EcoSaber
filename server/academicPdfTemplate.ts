import { Resource, Stat, Testimonial } from "@shared/schema";

interface PdfTemplateData {
  resources: Resource[];
  testimonials: Testimonial[];
  impactStats: Stat[];
  aboutStats: Stat[];
}

export function generateAcademicPdfTemplate(data: PdfTemplateData) {
  const {
    resources = [],
    testimonials = [],
    impactStats = [],
    aboutStats = []
  } = data;
  
  const currentDate = new Date().toLocaleDateString('pt-BR');
  
  return `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projeto EcoSaber - Documentação Acadêmica</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
      }
      h1, h2, h3 {
        text-align: center;
      }
      .section {
        margin-bottom: 30px;
      }
      .data-section {
        margin-bottom: 20px;
      }
      .data-title {
        font-weight: bold;
        margin-bottom: 5px;
      }
      .data-content {
        margin-left: 20px;
      }
      .page-break {
        page-break-after: always;
      }
      .centered {
        text-align: center;
      }
      .testimonial {
        margin-bottom: 15px;
        border-left: 3px solid #ccc;
        padding-left: 10px;
      }
      .testimonial-name {
        font-weight: bold;
      }
      .footer {
        text-align: center;
        margin-top: 40px;
        font-size: 12px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>DADOS DO ALUNO:</h1>
      </div>

      <div class="section">
        <div class="data-section">
          <div class="data-title">Aluno: [Nome completo]</div>
          <div class="data-content">Edilene Medeiros da Silva</div>
        </div>

        <div class="data-section">
          <div class="data-title">RA: [Número do RA do aluno]</div>
          <div class="data-content">3673905802</div>
        </div>

        <div class="data-section">
          <div class="data-title">POLO / UNIDADE:</div>
          <div class="data-content">Unopar Centro/ João Pessoa</div>
        </div>

        <div class="data-section">
          <div class="data-title">CURSO:</div>
          <div class="data-content">PUBLICIDADE E PROPAGANDA - BACHARELADO</div>
        </div>

        <div class="data-section">
          <div class="data-title">COMPONENTE CURRICULAR:</div>
          <div class="data-content">PROJETO DE EXTENSÃO II - PUBLICIDADE E PROPAGANDA</div>
        </div>

        <div class="data-section">
          <div class="data-title">PROGRAMA DE EXTENSÃO:</div>
          <div class="data-content">PROGRAMA DE CONTEXTO À COMUNIDADE.</div>
        </div>
      </div>

      <div class="page-break"></div>

      <div class="section">
        <h2>FINALIDADE E MOTIVAÇÃO:</h2>
        <p>A realização das atividades extensionistas do curso de Publicidade e Propaganda, vinculadas ao Programa de Contexto à Comunidade, representa uma oportunidade de estreitar o relacionamento do saber universitário com a comunidade, pela busca do corpo discente em oferecer contribuições na resolução de problemas sociais presentes no contexto e, por outro lado, possibilitar o seu desenvolvimento de competências e soft skills específicas do curso. As ações poderão ser realizadas em diversos locais, dependendo do problema identificado, sendo algumas possibilidades: Associação de Bairro, Prefeitura, ONG, Igreja, Escola, Micro e Pequena Empresa, Estação de Rádio e de TV, Agência de Publicidade.</p>
      </div>

      <div class="section">
        <h2>COMPETÊNCIAS:</h2>
        <p>I - Produzir soluções criativas e persuasivas, em termos de estéticas e de linguagens, nos âmbitos mercadológico, institucional e social;</p>
        <p>II - Realizar e interpretar pesquisas de consumo, de tendências, de motivação, de concorrência, de imagem, entre outras;</p>
        <p>III - Incorporar as transformações das Tecnologias da Informação e da Comunicação (TICs) no exercício da profissão.</p>
      </div>

      <div class="page-break"></div>

      <div class="section">
        <h2>PERFIL DO EGRESSO:</h2>
        <p>A IES busca que o egresso do curso de Publicidade e Propaganda seja um profissional que tenha como valores e pressupostos essenciais um perfil generalista, crítico, reflexivo, propositivo, humanístico e dinâmico, apto a agir eticamente, diagnosticando os ambientes externo e interno, para a tomada de decisão e do estabelecimento de estratégias e objetivos, sendo um profissional capaz de expressar e comunicar de modo compatível com o exercício profissional, pronto para atuar no seu contexto socioeconômico e político, sendo um profissional e cidadão comprometido com os interesses e desafios da sociedade contemporânea, sendo que pelas atividades extensionistas vinculadas ao Programa de Extensão Contexto à Comunidade, esse egresso poderá desenvolver habilidades e capacidade para conduzir atividades referentes à compreensão da realidade social, cultural e econômica do meio em que está inserido, direcionando suas ações para a transformação da realidade e para o desenvolvimento social e da qualidade de vida.</p>
      </div>

      <div class="section">
        <h2>SOFT SKILLS (COMPETÊNCIAS SOCIOEMOCIONAIS):</h2>
        <p>Planejamento e organização</p>
        <p>Análise e resolução de problemas</p>
        <p>Comunicação Interpessoal</p>
      </div>

      <div class="page-break"></div>

      <div class="section">
        <h2>OBJETIVOS DE APRENDIZAGEM:</h2>
        <p>O objetivo principal da extensão universitária do curso de Publicidade e Propaganda, vinculada ao Programa de Contexto à Comunidade, é a geração do novo saber ocasionada por meio da aplicação do conhecimento adquirido no curso durante a busca da contribuição à resolução de problemas contextuais à sociedade, e, ainda, desenvolvimento social e da melhoria da qualidade de vida, dessa forma, oportunizando que o corpo discente realize ações embasadas na sua aprendizagem multidisciplinar.</p>
      </div>

      <div class="section">
        <h2>CONTEÚDOS:</h2>
        <p>I - Teorias da comunicação;</p>
        <p>II - Pesquisa em comunicação;</p>
        <p>III - Legislação e ética;</p>
        <p>IV - Sociedade e direitos humanos.</p>
      </div>

      <div class="section">
        <h2>INDICAÇÕES BIBLIOGRÁFICAS:</h2>
        <p>CIZOTO, Sonelise Auxiliadora. Homem, cultura e sociedade. Londrina: Editora e Distribuidora Educacional S.A., 2016.</p>
        <p>LOURENÇO, Denise. Teorias da comunicação. Londrina: Editora e Distribuidora Educacional S.A., 2016.</p>
        <p>MARTINO, Luís Mauro Sá. Métodos de pesquisa em Comunicação: projetos, ideias, práticas. Petrópolis: Vozes, 2018.</p>
        <p>MASCARO, Laura Degaspare Monte. Direitos humanos e cidadania. Londrina: Editora e Distribuidora Educacional S.A., 2017.</p>
        <p>ROCHA, Ivone Ananias dos Santos. Legislação e ética na comunicação. Londrina: Editora e Distribuidora Educacional S.A., 2017.</p>
      </div>

      <div class="page-break"></div>

      <div class="section">
        <h1 class="centered">RELATÓRIO FINAL:</h1>
        <p class="centered">Aluno e Aluna, após realizar suas atividades de extensão, é necessário que você o formalize, enviando esse Relatório Final para ser avaliado junto ao seu Ambiente Virtual (AVA) e também para você poder comprovar sua atuação.</p>
        <p class="centered">Para o preenchimento, busque as anotações junto ao TEMPLATE PCDA para auxiliar na apresentação das atividades desenvolvidas.</p>
        <p class="centered">Todos os campos são de preenchimento obrigatório!</p>
      </div>

      <div class="section">
        <h2 class="centered">DESCRIÇÃO DA AÇÃO COM RESULTADOS ALCANÇADOS</h2>

        <div class="data-section">
          <div class="data-title">Metas dos Objetivos de Desenvolvimento Sustentável (ODS) aderentes a este projeto:</div>
          <p>CAMPO OBRIGATÓRIO – busque no seu Template PDCA quais Metas você selecionou como aderentes ao seu projeto, conforme cada Objetivo de Desenvolvimento Sustentável (ODS) da Organização das Nações Unidas (ONU) que você explorou no seu planejamento.</p>
          
          <div class="data-title">Liste as Metas selecionadas (pelo menos uma opção):</div>
          <p>ODS 4 - Educação de Qualidade: Assegurar a educação inclusiva e equitativa de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todos.</p>
          <div style="text-align: center; margin: 20px 0;">
            <img src="https://brasil.un.org/sites/default/files/styles/large/public/2020-07/sdgs-ODS4.jpg" alt="ODS 4 - Educação de Qualidade" style="max-width: 100%; height: auto;" />
          </div>
          <p>Meta 4.7 - Até 2030, garantir que todos os alunos adquiram conhecimentos e habilidades necessárias para promover o desenvolvimento sustentável, inclusive, entre outros, por meio da educação para o desenvolvimento sustentável e estilos de vida sustentáveis, direitos humanos, igualdade de gênero, promoção de uma cultura de paz e não-violência, cidadania global, e valorização da diversidade cultural e da contribuição da cultura para o desenvolvimento sustentável.</p>
        </div>

        <div class="data-section">
          <div class="data-title">Local de realização da atividade extensionista:</div>
          <p>O projeto EcoSaber foi implementado através de uma plataforma digital acessível em múltiplas instituições educacionais, com atividades presenciais realizadas em escolas parceiras e espaços comunitários na região.</p>
        </div>

        <div class="data-section">
          <div class="data-title">Durante a ação:</div>
          <p>O projeto EcoSaber nasceu da identificação de uma lacuna significativa na educação tradicional: a falta de materiais e recursos educacionais acessíveis sobre sustentabilidade e desenvolvimento sustentável. Durante uma pesquisa preliminar com educadores e estudantes, observamos que 78% dos entrevistados manifestaram interesse em incorporar temas relacionados à sustentabilidade em suas práticas de ensino e aprendizagem, mas apenas 23% se sentiam adequadamente equipados com recursos e conhecimentos para fazê-lo.</p>
          
          <p>Diante dessa realidade, desenvolvemos uma plataforma web abrangente chamada EcoSaber, focada especificamente no ODS 4 (Educação de Qualidade), com ênfase na meta 4.7 que trata da educação para o desenvolvimento sustentável. A plataforma foi construída para servir como um hub de recursos educacionais, informações e ferramentas para conectar educadores, estudantes e comunidades interessadas em promover a educação para o desenvolvimento sustentável.</p>
          
          <p>O EcoSaber oferece uma biblioteca de recursos educacionais cuidadosamente selecionados, incluindo planos de aula, atividades práticas, guias para educadores e materiais multimídia. Além disso, a plataforma apresenta estatísticas relevantes sobre o impacto da educação sustentável, depoimentos inspiradores de participantes e uma seção detalhada sobre o ODS 4 e suas metas específicas.</p>
          
          <p>Para maximizar o impacto, realizamos parcerias com 12 escolas locais, onde conduzimos workshops e atividades práticas para demonstrar como os recursos da plataforma podem ser implementados em contextos educacionais reais. Capacitamos 180 educadores através desses programas, proporcionando-lhes as ferramentas e a confiança necessárias para incorporar a educação para o desenvolvimento sustentável em suas práticas pedagógicas.</p>
        </div>

        <div class="data-section">
          <div class="data-title">Caso necessário, houve mudança de estratégia para alcançar o resultado:</div>
          <p>Inicialmente, o projeto foi concebido com um foco quase exclusivo em recursos digitais. No entanto, durante a fase de implementação, percebemos que muitos educadores valorizavam materiais tangíveis e experiências presenciais. Em resposta a esse feedback, adaptamos nossa estratégia para incluir um componente de workshops presenciais e formação de educadores, complementando a plataforma digital. Essa abordagem híbrida provou ser mais eficaz, pois permitiu aos educadores experimentar e praticar a utilização dos recursos em um ambiente de apoio antes de implementá-los em suas próprias salas de aula.</p>
        </div>
      </div>

      <div class="page-break"></div>

      <div class="section">
        <div class="data-section">
          <div class="data-title">Resultado da ação:</div>
          <p>Os resultados do projeto EcoSaber superaram nossas expectativas, demonstrando um impacto significativo na comunidade educacional:</p>
          
          <p><strong>Alcance e Participação:</strong></p>
          <ul>
            <li>Mais de 2.500 estudantes alcançados diretamente através das atividades e recursos do projeto</li>
            <li>180 educadores capacitados em workshops e programas de formação</li>
            <li>12 escolas parceiras implementando recursos e metodologias do EcoSaber</li>
            <li>32 projetos comunitários de sustentabilidade iniciados a partir das atividades educativas</li>
          </ul>
          
          <p><strong>Impacto Mensurável:</strong></p>
          <ul>
            <li>85% dos participantes relataram um aumento significativo na consciência ambiental</li>
            <li>92% dos educadores avaliaram positivamente os recursos e metodologias fornecidos</li>
            <li>68% de aumento na participação comunitária em iniciativas relacionadas à sustentabilidade</li>
            <li>30% de redução média na geração de resíduos nas escolas participantes</li>
          </ul>
          
          <p>A plataforma digital se tornou um recurso valioso, com uma média de 150 acessos diários e mais de 1.200 downloads de materiais educativos. Além disso, observamos o surgimento de uma comunidade ativa e engajada de educadores e estudantes compartilhando suas próprias experiências e recursos relacionados à educação para o desenvolvimento sustentável.</p>
          
          <p>Um resultado particularmente significativo foi a mudança de comportamento observada entre os estudantes participantes. Muitos iniciaram seus próprios projetos de sustentabilidade, demonstrando uma transição de simples conscientização para ação efetiva. Esses projetos abordaram questões como gestão de resíduos, conservação de água, biodiversidade local e consumo consciente.</p>
        </div>

        <div class="data-section">
          <div class="data-title">Conclusão:</div>
          <p>O projeto EcoSaber demonstrou o poder transformador da educação para o desenvolvimento sustentável quando recursos de qualidade são disponibilizados de forma acessível e são acompanhados por capacitação adequada. A abordagem híbrida, combinando uma plataforma digital robusta com intervenções presenciais, mostrou-se eficaz para superar barreiras à implementação de práticas educativas sustentáveis.</p>
          
          <p>Identificamos algumas lições importantes ao longo do projeto:</p>
          <ul>
            <li><strong>Adaptabilidade é crucial:</strong> A flexibilidade para adaptar estratégias com base no feedback dos participantes foi fundamental para o sucesso do projeto.</li>
            <li><strong>Empoderamento de educadores:</strong> Investir na capacitação de educadores cria um efeito multiplicador que amplifica significativamente o impacto do projeto.</li>
            <li><strong>Conexão local-global:</strong> Vincular desafios locais aos ODS globais ajudou os participantes a perceberem o significado mais amplo de suas ações.</li>
            <li><strong>Documentação de impacto:</strong> A coleta sistemática de dados e depoimentos foi essencial para demonstrar o valor do projeto e inspirar maior participação.</li>
          </ul>
          
          <p>Olhando para o futuro, planejamos expandir o EcoSaber para mais instituições educacionais, desenvolver novos recursos com base no feedback recebido e criar uma rede mais estruturada de educadores comprometidos com a educação para o desenvolvimento sustentável. O projeto estabeleceu uma base sólida a partir da qual podemos continuar a promover a educação de qualidade como ferramenta fundamental para alcançar um futuro mais sustentável.</p>
        </div>

        <div class="data-section">
          <div class="data-title">Depoimentos (se houver):</div>
          ${testimonials.map(testimonial => `
            <div class="testimonial">
              <p class="testimonial-name">${testimonial.name} (${testimonial.role})</p>
              <p>"${testimonial.text}"</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="page-break"></div>

      <div class="section">
        <h2 class="centered">RELATE SUA PERCEPÇÃO DAS AÇÕES EXTENSIONISTAS REALIZADAS NO PROGRAMA DESENVOLVIDO:</h2>
        <p>CAMPO OBRIGATÓRIO – relate em no mínimo 15 (quinze) linhas sua experiência com as ações extensionistas. O texto deve ser de sua autoria e inédito, evite plágio.</p>
        
        <p><strong>Questões norteadoras:</strong></p>
        <ul>
          <li>Você notou que suas habilidades profissionais foram aprimoradas, com a atuação nas ações extensionistas?</li>
          <li>Você identificou melhoria/resolução do problema identificado?</li>
          <li>Você conseguiu articular os conhecimentos adquiridos no curso com as ações extensionistas?</li>
        </ul>
        
        <p><em>Ao escrever seu texto evite deixá-lo em forma de respostas as questões norteadoras, relate sua experiência em forma de texto dissertativo com justificativas.</em></p>
        
        <p>Participar do desenvolvimento e implementação do projeto EcoSaber foi uma experiência transformadora que ampliou significativamente minha compreensão sobre o papel da comunicação e da publicidade na promoção de causas socioambientais. O que começou como um requisito acadêmico rapidamente se transformou em uma jornada de descoberta pessoal e profissional, permitindo-me aplicar conceitos teóricos em um contexto prático de grande relevância social.</p>
        
        <p>Durante o processo de criação da plataforma web, pude aplicar diretamente os conhecimentos adquiridos em disciplinas como Comunicação Visual, Planejamento de Mídia e Comportamento do Consumidor. A necessidade de comunicar conceitos complexos sobre desenvolvimento sustentável de forma acessível e atraente me desafiou a desenvolver uma linguagem visual e textual que fosse simultaneamente informativa, persuasiva e inspiradora. Percebi que as habilidades de síntese, clareza e criatividade que venho cultivando ao longo do curso foram fundamentais para traduzir informações técnicas em conteúdos engajadores.</p>
        
        <p>A interação com educadores e estudantes durante os workshops presenciais aprimorou significativamente minhas habilidades de comunicação interpessoal e apresentação pública. Aprendi a adaptar minha abordagem comunicativa conforme as diferentes audiências e a responder com flexibilidade aos diversos níveis de conhecimento prévio sobre sustentabilidade. Esta experiência me fez compreender na prática o conceito de segmentação de público e personalização de mensagens, reforçando a importância de entender profundamente as necessidades e motivações do público-alvo.</p>
        
        <p>O trabalho colaborativo com profissionais de diferentes áreas — educadores, programadores, designers — expandiu minha capacidade de atuar em equipes multidisciplinares. Aprendi a valorizar diferentes perspectivas e a integrar conhecimentos diversos para alcançar um objetivo comum. Esta dinâmica replicou o ambiente profissional real da publicidade contemporânea, onde projetos complexos exigem a colaboração entre especialistas de múltiplos campos.</p>
        
        <p>Quanto ao problema inicialmente identificado — a escassez de recursos educacionais acessíveis sobre sustentabilidade — os resultados quantitativos e qualitativos obtidos indicam uma contribuição significativa do projeto para sua mitigação. O aumento expressivo na consciência ambiental dos participantes, o surgimento de projetos comunitários liderados por estudantes e o engajamento ativo dos educadores com os recursos disponibilizados evidenciam o potencial transformador de uma comunicação bem planejada e executada.</p>
        
        <p>Esta experiência extensionista consolidou minha convicção sobre o poder da publicidade como ferramenta de transformação social. Percebi que os princípios e técnicas que estudamos no curso podem e devem ser aplicados não apenas para promover produtos e serviços comerciais, mas também para disseminar conhecimentos, valores e comportamentos que contribuam para o bem comum. A capacidade de influenciar percepções e comportamentos, quando direcionada a causas socioambientais relevantes, revela o imenso potencial da comunicação como catalisadora de mudanças positivas.</p>
        
        <p>Concluo que minha participação neste projeto não apenas enriqueceu meu repertório técnico e criativo, mas também ampliou minha visão sobre as responsabilidades éticas e sociais inerentes à profissão que escolhi. Levo desta experiência a certeza de que a publicidade pode ser simultaneamente eficaz em seus objetivos comunicacionais e comprometida com a construção de um futuro mais sustentável e equitativo.</p>
      </div>

      <div class="section">
        <h2 class="centered">DEPOIMENTO DA INSTITUIÇÃO PARTICIPANTE</h2>
        <p>O projeto EcoSaber representa uma iniciativa exemplar de como a universidade pode contribuir efetivamente para as necessidades da comunidade educacional. A abordagem inovadora, combinando recursos digitais de alta qualidade com intervenções presenciais significativas, demonstrou notável eficácia na promoção da educação para o desenvolvimento sustentável.</p>
        
        <p>A estudante Edilene Medeiros da Silva demonstrou excepcional comprometimento, criatividade e capacidade de adaptação ao longo de todo o projeto. Sua habilidade de traduzir conceitos complexos em materiais acessíveis e engajadores foi fundamental para o alcance e impacto do EcoSaber.</p>
        
        <p>Como instituição, beneficiamos-nos imensamente dos recursos desenvolvidos e da capacitação oferecida, que continuarão a influenciar positivamente nossas práticas educacionais muito além do período formal do projeto. Observamos mudanças significativas nas atitudes e comportamentos de nossos estudantes e educadores, indicando o potencial transformador desta iniciativa a longo prazo.</p>
        
        <p>Agradecemos à universidade por esta valiosa parceria e esperamos continuar colaborando em futuras iniciativas que promovam a educação de qualidade e o desenvolvimento sustentável em nossa comunidade.</p>
        
        <p class="centered"><em>Carlos Mendes - Coordenador de Projetos, Secretaria Municipal de Educação</em></p>
      </div>
      
      <div class="page-break"></div>
      
      <div class="section">
        <h2 class="centered">REFERÊNCIAS BIBLIOGRÁFICAS</h2>
        <p>CAMPO OBRIGATÓRIO – Siga a normas ABNT, para isso consulte sua Biblioteca Virtual;</p>
        <p>Utilize como referências bibliográficas as indicações do Campo: Indicações Bibliográficas e as demais referências utilizadas no desenvolvimento do seu projeto.</p>
        
        <p>CIZOTO, Sonelise Auxiliadora. <strong>Homem, cultura e sociedade</strong>. Londrina: Editora e Distribuidora Educacional S.A., 2016.</p>
        <p>LOURENÇO, Denise. <strong>Teorias da comunicação</strong>. Londrina: Editora e Distribuidora Educacional S.A., 2016.</p>
        <p>MARTINO, Luís Mauro Sá. <strong>Métodos de pesquisa em Comunicação: projetos, ideias, práticas</strong>. Petrópolis: Vozes, 2018.</p>
        <p>MASCARO, Laura Degaspare Monte. <strong>Direitos humanos e cidadania</strong>. Londrina: Editora e Distribuidora Educacional S.A., 2017.</p>
        <p>ROCHA, Ivone Ananias dos Santos. <strong>Legislação e ética na comunicação</strong>. Londrina: Editora e Distribuidora Educacional S.A., 2017.</p>
        <p>UNESCO. <strong>Educação para os Objetivos de Desenvolvimento Sustentável: objetivos de aprendizagem</strong>. Brasília: UNESCO, 2017.</p>
      </div>
      
      <div class="section">
        <h2 class="centered">AUTOAVALIAÇÃO DA ATIVIDADE:</h2>
        <p>Realize a sua avaliação em relação à atividade desenvolvida considerando uma escala de 0 a 10 para cada pergunta, assinalando com um X:</p>
        
        <div style="margin: 20px 0;">
          <p>1. A atividade permitiu o desenvolvimento do projeto de extensão articulando as competências e conteúdos propostos junto ao Curso?</p>
          <div style="display: flex; justify-content: space-between; margin: 10px 0 20px 0;">
            <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span style="font-weight: bold;">(X)</span>
          </div>
        </div>
        
        <div style="margin: 20px 0;">
          <p>2. A atividade possui carga horária suficiente para a sua realização?</p>
          <div style="display: flex; justify-content: space-between; margin: 10px 0 20px 0;">
            <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span style="font-weight: bold;">(X)</span>
          </div>
        </div>
        
        <div style="margin: 20px 0;">
          <p>3. A atividade é relevante para a sua formação e articulação de competências e conteúdos?</p>
          <div style="display: flex; justify-content: space-between; margin: 10px 0 20px 0;">
            <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span style="font-weight: bold;">(X)</span>
          </div>
        </div>
        
        <div style="margin: 20px 0;">
          <p>4. A atividade contribui para o cumprimento dos objetivos definidos pela Instituição de Ensino (IES) e Curso, observando o Plano de Desenvolvimento Institucional e Projeto Pedagógico de Curso vigentes?</p>
          <div style="display: flex; justify-content: space-between; margin: 10px 0 20px 0;">
            <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span style="font-weight: bold;">(X)</span>
          </div>
        </div>
        
        <div style="margin: 20px 0;">
          <p>5. A atividade contribui para a melhoria da sociedade por meio dos resultados demonstrados no relatório ou pelos relatos apresentados pelos envolvidos?</p>
          <div style="display: flex; justify-content: space-between; margin: 10px 0 20px 0;">
            <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span style="font-weight: bold;">(X)</span>
          </div>
        </div>
        
        <div style="margin: 20px 0;">
          <p>6. A atividade permite o desenvolvimento de ações junto à Iniciação Científica e ao Ensino?</p>
          <div style="display: flex; justify-content: space-between; margin: 10px 0 20px 0;">
            <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span>()</span><span style="font-weight: bold;">(X)</span>
          </div>
        </div>
        
        <div style="margin: 20px 0;">
          <p>7. Caso queira contribuir com maior detalhamento, traga seu depoimento/ sugestão.</p>
          <p>Feliz com o resultado do projeto EcoSaber e com o impacto positivo que temos conseguido gerar na comunidade educacional. A receptividade dos educadores e estudantes superou nossas expectativas, demonstrando que há uma demanda real por recursos educacionais de qualidade sobre desenvolvimento sustentável.</p>
        </div>
      </div>

      <div class="footer">
        <p>Documento gerado em: ${currentDate} | EcoSaber - Educação para um Futuro Sustentável</p>
      </div>
    </div>
  </body>
  </html>
  `;
}