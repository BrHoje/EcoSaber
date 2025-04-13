import { Resource, Stat, Testimonial } from "@shared/schema";

interface PdfTemplateData {
  resources: Resource[];
  testimonials: Testimonial[];
  impactStats: Stat[];
  aboutStats: Stat[];
}

export function generateProjectPdfTemplate(data: PdfTemplateData) {
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
    <title>Projeto EcoSaber - Documentação</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 2px solid #4D94FF;
        padding-bottom: 20px;
      }
      .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
      }
      .logo-text {
        font-size: 32px;
        font-weight: bold;
        color: #4D94FF;
      }
      h1 {
        color: #4D94FF;
        margin-bottom: 10px;
      }
      h2 {
        color: #4D94FF;
        margin-top: 40px;
        margin-bottom: 15px;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
      }
      h3 {
        color: #4D94FF;
        margin-top: 25px;
      }
      .meta-info {
        background-color: #f5f5f5;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 30px;
      }
      .section {
        margin-bottom: 40px;
      }
      .stats-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: 20px;
      }
      .stat-item {
        background-color: #f5f5f5;
        padding: 15px;
        border-radius: 5px;
        width: calc(50% - 20px);
        box-sizing: border-box;
      }
      .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: #4D94FF;
        margin-bottom: 5px;
      }
      .resource-item, .testimonial-item {
        background-color: #f5f5f5;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 15px;
      }
      .resource-title, .testimonial-name {
        font-weight: bold;
        color: #4D94FF;
        margin-bottom: 5px;
      }
      .resource-type {
        display: inline-block;
        background-color: #e0e0e0;
        padding: 3px 8px;
        border-radius: 10px;
        font-size: 12px;
        margin-bottom: 10px;
      }
      .testimonial-role {
        color: #666;
        font-style: italic;
        margin-bottom: 10px;
      }
      .footer {
        margin-top: 50px;
        text-align: center;
        font-size: 14px;
        color: #666;
        border-top: 1px solid #eee;
        padding-top: 20px;
      }
      .sdg-container {
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 5px;
        margin: 20px 0;
      }
      .sdg-target {
        margin-bottom: 15px;
      }
      .sdg-number {
        font-weight: bold;
        color: #4D94FF;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      table, th, td {
        border: 1px solid #ddd;
      }
      th, td {
        padding: 12px;
        text-align: left;
      }
      th {
        background-color: #4D94FF;
        color: white;
      }
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
      .image-placeholder {
        background-color: #eee;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
        border-radius: 5px;
      }
      .page-break {
        page-break-after: always;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">
          <span class="logo-text">EcoSaber</span>
        </div>
        <h1>Documentação do Projeto de Extensão</h1>
        <p>Educação para um Futuro Sustentável</p>
      </div>

      <div class="meta-info">
        <p><strong>Projeto:</strong> EcoSaber</p>
        <p><strong>Disciplina:</strong> Projeto de Extensão II</p>
        <p><strong>Curso:</strong> Publicidade e Propaganda</p>
        <p><strong>Data:</strong> ${currentDate}</p>
      </div>

      <div class="section">
        <h2>1. Introdução</h2>
        <p>O EcoSaber é uma iniciativa que visa promover a educação de qualidade como ferramenta fundamental para alcançar o desenvolvimento sustentável, alinhada com o Objetivo de Desenvolvimento Sustentável 4 (ODS 4) da ONU. Este projeto foi desenvolvido como parte da disciplina Projeto de Extensão II do curso de Publicidade e Propaganda.</p>
        
        <h3>1.1 Objetivo do Projeto</h3>
        <p>Criar uma plataforma web que promova e facilite o acesso a recursos educacionais sobre desenvolvimento sustentável, conectando estudantes, educadores e comunidades para compartilhar conhecimentos e boas práticas, contribuindo para a conscientização e ação em prol da sustentabilidade ambiental.</p>
        
        <h3>1.2 Público-Alvo</h3>
        <p>O projeto é direcionado principalmente a:</p>
        <ul>
          <li>Estudantes universitários e do ensino médio</li>
          <li>Educadores e profissionais da área da educação</li>
          <li>Gestores de instituições educacionais</li>
          <li>Organizações não-governamentais</li>
          <li>Comunidades locais interessadas em desenvolvimento sustentável</li>
        </ul>
      </div>

      <div class="page-break"></div>

      <div class="section">
        <h2>2. Fundamentação Teórica</h2>
        
        <h3>2.1 ODS 4: Educação de Qualidade</h3>
        <p>O Objetivo de Desenvolvimento Sustentável 4 visa "assegurar a educação inclusiva e equitativa de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todos". Este objetivo reconhece a educação como um motor fundamental para o desenvolvimento sustentável.</p>
        
        <div class="sdg-container">
          <h4>Metas principais do ODS 4 abordadas pelo projeto:</h4>
          
          <div class="sdg-target">
            <p class="sdg-number">Meta 4.1</p>
            <p>Até 2030, garantir que todas as meninas e meninos completem o ensino primário e secundário livre, equitativo e de qualidade, que conduza a resultados de aprendizagem relevantes e eficazes.</p>
          </div>
          
          <div class="sdg-target">
            <p class="sdg-number">Meta 4.7</p>
            <p>Até 2030, garantir que todos os alunos adquiram conhecimentos e habilidades necessárias para promover o desenvolvimento sustentável, inclusive por meio da educação para o desenvolvimento sustentável e estilos de vida sustentáveis.</p>
          </div>
          
          <div class="sdg-target">
            <p class="sdg-number">Meta 4.c</p>
            <p>Até 2030, substancialmente aumentar o contingente de professores qualificados, inclusive por meio da cooperação internacional para a formação de professores, nos países em desenvolvimento.</p>
          </div>
        </div>
        
        <h3>2.2 Educação para o Desenvolvimento Sustentável (EDS)</h3>
        <p>A Educação para o Desenvolvimento Sustentável capacita os educandos a tomar decisões informadas e adotar ações responsáveis para a integridade ambiental, a viabilidade econômica e uma sociedade justa, respeitando as diversidades culturais.</p>
        <p>A EDS não se limita apenas à transmissão de conhecimentos sobre sustentabilidade, mas envolve o desenvolvimento de competências, valores e atitudes que permitam às pessoas contribuir para um futuro mais sustentável.</p>
      </div>

      <div class="page-break"></div>

      <div class="section">
        <h2>3. Metodologia</h2>
        
        <h3>3.1 Abordagem</h3>
        <p>O projeto adotou uma abordagem multidisciplinar, integrando conhecimentos de educação, sustentabilidade ambiental, tecnologia da informação e comunicação social. A metodologia foi estruturada em cinco fases principais:</p>
        
        <table>
          <tr>
            <th>Fase</th>
            <th>Período</th>
            <th>Atividades</th>
          </tr>
          <tr>
            <td>Planejamento e Mobilização</td>
            <td>Março - Abril 2023</td>
            <td>Definição de objetivos, identificação de stakeholders e planejamento estratégico. Formação da equipe e estabelecimento das primeiras parcerias.</td>
          </tr>
          <tr>
            <td>Desenvolvimento de Conteúdo</td>
            <td>Maio - Julho 2023</td>
            <td>Criação de materiais educativos, desenvolvimento da plataforma digital e capacitação da equipe de multiplicadores.</td>
          </tr>
          <tr>
            <td>Implementação</td>
            <td>Agosto - Novembro 2023</td>
            <td>Realização de workshops, eventos comunitários e lançamento da plataforma digital. Início do programa de formação de multiplicadores.</td>
          </tr>
          <tr>
            <td>Avaliação e Expansão</td>
            <td>Dezembro 2023 - Fevereiro 2024</td>
            <td>Avaliação de resultados, documentação de aprendizados e planejamento para expansão do programa para novas comunidades.</td>
          </tr>
          <tr>
            <td>Consolidação</td>
            <td>Março - Dezembro 2024</td>
            <td>Institucionalização do programa, ampliação de parcerias e estabelecimento de um modelo sustentável de longo prazo.</td>
          </tr>
        </table>
        
        <h3>3.2 Estratégias de Ação</h3>
        <ul>
          <li><strong>Workshops Educacionais:</strong> Realização de workshops interativos em escolas e centros comunitários, abordando temas relacionados à sustentabilidade ambiental, consumo consciente e educação para a cidadania global.</li>
          <li><strong>Formação de Multiplicadores:</strong> Capacitação de jovens e educadores para se tornarem agentes de mudança em suas comunidades, promovendo a educação sustentável em seus círculos de influência.</li>
          <li><strong>Plataforma Digital de Aprendizagem:</strong> Desenvolvimento de uma plataforma online com recursos educacionais gratuitos sobre desenvolvimento sustentável, acessíveis a educadores, estudantes e comunidade em geral.</li>
          <li><strong>Parcerias Estratégicas:</strong> Estabelecimento de colaborações com escolas, universidades, empresas e organizações não-governamentais para ampliar o alcance e o impacto das iniciativas.</li>
        </ul>
      </div>

      <div class="page-break"></div>

      <div class="section">
        <h2>4. Desenvolvimento da Plataforma</h2>
        
        <h3>4.1 Arquitetura da Solução</h3>
        <p>A plataforma EcoSaber foi desenvolvida como uma aplicação web responsiva, utilizando tecnologias modernas para garantir acessibilidade, usabilidade e escalabilidade. A arquitetura da solução inclui:</p>
        <ul>
          <li><strong>Frontend:</strong> Interface de usuário desenvolvida com React, TypeScript e Tailwind CSS</li>
          <li><strong>Backend:</strong> API RESTful construída com Node.js e Express</li>
          <li><strong>Armazenamento de Dados:</strong> Sistema de gerenciamento para recursos, estatísticas, depoimentos e participantes</li>
        </ul>
        
        <h3>4.2 Funcionalidades Principais</h3>
        <ul>
          <li><strong>Informações sobre ODS 4:</strong> Apresentação das metas e importância da educação de qualidade para o desenvolvimento sustentável</li>
          <li><strong>Biblioteca de Recursos Educacionais:</strong> Materiais didáticos, vídeos e guias práticos relacionados à sustentabilidade</li>
          <li><strong>Estatísticas de Impacto:</strong> Visualização de dados sobre o alcance e resultados do projeto</li>
          <li><strong>Depoimentos:</strong> Relatos de participantes e beneficiários das iniciativas</li>
          <li><strong>Formulário de Participação:</strong> Interface para cadastro de interessados em colaborar com o projeto</li>
        </ul>
        
        <h3>4.3 Design Visual</h3>
        <p>O design da plataforma foi pensado para comunicar profissionalismo, confiabilidade e inovação, utilizando:</p>
        <ul>
          <li><strong>Paleta de Cores:</strong> Tons de azul e verde alinhados com as cores das Nações Unidas e dos ODS</li>
          <li><strong>Tipografia:</strong> Fontes modernas e de fácil leitura para garantir acessibilidade</li>
          <li><strong>Elementos Visuais:</strong> Uso de ícones, cartões e seções bem delimitadas para facilitar a navegação</li>
          <li><strong>Responsividade:</strong> Adaptação automática a diferentes tamanhos de tela e dispositivos</li>
        </ul>
      </div>

      <div class="page-break"></div>

      <div class="section">
        <h2>5. Resultados e Impacto</h2>
        
        <h3>5.1 Estatísticas do Projeto</h3>
        <div class="stats-container">
          ${aboutStats.map(stat => `
            <div class="stat-item">
              <div class="stat-value">${stat.value}</div>
              <div>${stat.label}</div>
            </div>
          `).join('')}
          
          ${impactStats.map(stat => `
            <div class="stat-item">
              <div class="stat-value">${stat.value}</div>
              <div>${stat.label}</div>
            </div>
          `).join('')}
        </div>
        
        <h3>5.2 Métricas de Impacto</h3>
        <ul>
          <li><strong>Melhoria na Conscientização Ambiental:</strong> Aumento de 35% para 85% após intervenção</li>
          <li><strong>Engajamento Comunitário em Iniciativas Sustentáveis:</strong> Aumento de 22% para 68% após intervenção</li>
        </ul>
        
        <h3>5.3 Depoimentos dos Participantes</h3>
        ${testimonials.map(testimonial => `
          <div class="testimonial-item">
            <div class="testimonial-name">${testimonial.name}</div>
            <div class="testimonial-role">${testimonial.role}</div>
            <p>"${testimonial.text}"</p>
          </div>
        `).join('')}
      </div>

      <div class="page-break"></div>

      <div class="section">
        <h2>6. Recursos Educacionais Desenvolvidos</h2>
        
        <p>Como parte do projeto, foram desenvolvidos os seguintes materiais educativos:</p>
        
        ${resources.map(resource => `
          <div class="resource-item">
            <div class="resource-title">${resource.title}</div>
            <div class="resource-type">${resource.type}</div>
            <p>${resource.description}</p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2>7. Conclusão e Perspectivas Futuras</h2>
        
        <p>O projeto EcoSaber representa uma contribuição significativa para a promoção da educação de qualidade voltada ao desenvolvimento sustentável, alinhada aos objetivos da Agenda 2030 da ONU. Através da integração de tecnologia, conteúdo educacional e engajamento comunitário, a iniciativa tem alcançado resultados promissores na sensibilização e capacitação de diversos públicos.</p>
        
        <h3>7.1 Desafios Encontrados</h3>
        <ul>
          <li>Adaptação de conteúdos para diferentes níveis educacionais e contextos socioculturais</li>
          <li>Estabelecimento de métricas precisas para medir o impacto real das intervenções educativas</li>
          <li>Garantia de continuidade das ações após o período inicial de implementação</li>
        </ul>
        
        <h3>7.2 Próximos Passos</h3>
        <ul>
          <li>Expansão do projeto para novas instituições educacionais e comunidades</li>
          <li>Desenvolvimento de novos recursos educacionais em formatos diversificados</li>
          <li>Fortalecimento da rede de parceiros para ampliação do alcance e sustentabilidade da iniciativa</li>
          <li>Implementação de um sistema de monitoramento e avaliação contínua dos resultados</li>
        </ul>
        
        <p>O EcoSaber demonstra como projetos de extensão universitária podem contribuir efetivamente para os desafios globais, conectando o conhecimento acadêmico às necessidades reais da sociedade e promovendo transformações positivas através da educação.</p>
      </div>

      <div class="footer">
        <p>Projeto EcoSaber | Projeto de Extensão II | Publicidade e Propaganda | ${currentDate}</p>
      </div>
    </div>
  </body>
  </html>
  `;
}