import { 
  users, type User, type InsertUser,
  participants, type Participant, type InsertParticipant,
  resources, type Resource, type InsertResource,
  testimonials, type Testimonial, type InsertTestimonial,
  stats, type Stat, type InsertStat
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Participant methods
  getAllParticipants(): Promise<Participant[]>;
  getParticipant(id: number): Promise<Participant | undefined>;
  createParticipant(participant: InsertParticipant): Promise<Participant>;
  
  // Resource methods
  getAllResources(): Promise<Resource[]>;
  getResourcesByType(type: string): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  
  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Stat methods
  getAllStats(): Promise<Stat[]>;
  getStatsByCategory(category: string): Promise<Stat[]>;
  getStat(id: number): Promise<Stat | undefined>;
  createStat(stat: InsertStat): Promise<Stat>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private participants: Map<number, Participant>;
  private resources: Map<number, Resource>;
  private testimonials: Map<number, Testimonial>;
  private stats: Map<number, Stat>;
  
  private userId: number;
  private participantId: number;
  private resourceId: number;
  private testimonialId: number;
  private statId: number;

  constructor() {
    this.users = new Map();
    this.participants = new Map();
    this.resources = new Map();
    this.testimonials = new Map();
    this.stats = new Map();
    
    this.userId = 1;
    this.participantId = 1;
    this.resourceId = 1;
    this.testimonialId = 1;
    this.statId = 1;
    
    // Initialize with some example data
    this.initializeData();
  }

  private initializeData() {
    // Add initial statistics
    const initialStats: InsertStat[] = [
      { label: "dos participantes relatam maior consciência ambiental", value: "85%", category: "about", icon: "chart-pie" },
      { label: "escolas parceiras implementando o programa", value: "12", category: "about", icon: "school" },
      { label: "estudantes impactados diretamente", value: "2.500+", category: "about", icon: "users" },
      { label: "projetos comunitários desenvolvidos", value: "32", category: "about", icon: "project-diagram" },
      { label: "Estudantes Alcançados", value: "2.500+", category: "impact", icon: "user-graduate" },
      { label: "Educadores Capacitados", value: "180", category: "impact", icon: "chalkboard-teacher" },
      { label: "Escolas Parceiras", value: "12", category: "impact", icon: "school" },
      { label: "Projetos Comunitários", value: "32", category: "impact", icon: "project-diagram" }
    ];
    
    initialStats.forEach(stat => this.createStat(stat));
    
    // Add initial testimonials
    const initialTestimonials: InsertTestimonial[] = [
      {
        name: "Mariana Silva",
        role: "Professora, Escola Municipal São José",
        text: "Os recursos educacionais e o suporte oferecidos pelo projeto EcoSaber transformaram a maneira como abordo a sustentabilidade em sala de aula. Meus alunos estão muito mais engajados e motivados a desenvolver projetos que impactam positivamente a comunidade escolar e suas famílias.",
        imageUrl: "https://randomuser.me/api/portraits/women/12.jpg"
      },
      {
        name: "Carlos Mendes",
        role: "Coordenador de Projetos, Secretaria Municipal de Educação",
        text: "A parceria com o projeto EcoSaber tem sido fundamental para o fortalecimento da educação para o desenvolvimento sustentável em nossas escolas. Os resultados são visíveis: professores mais preparados, alunos mais conscientes e uma comunidade mais engajada com as questões ambientais e sociais.",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        name: "Fernanda Alves",
        role: "Mãe de aluno participante do projeto",
        text: "Meu filho mudou completamente sua atitude em relação ao meio ambiente depois de participar das atividades do EcoSaber. Em casa, ele tem promovido práticas sustentáveis e nos incentivado a repensar nossos hábitos de consumo. É incrível como o projeto consegue transformar crianças em verdadeiros agentes de mudança.",
        imageUrl: "https://randomuser.me/api/portraits/women/45.jpg"
      },
      {
        name: "Pedro Oliveira",
        role: "Estudante, 16 anos",
        text: "Participar dos workshops do EcoSaber abriu meus olhos para a importância da educação e da sustentabilidade. Hoje, lidero um grupo de estudantes na minha escola que desenvolve projetos ambientais e sociais. Sinto que estou fazendo a diferença na minha comunidade e construindo um futuro melhor para todos.",
        imageUrl: "https://randomuser.me/api/portraits/men/67.jpg"
      }
    ];
    
    initialTestimonials.forEach(testimonial => this.createTestimonial(testimonial));
    
    // Add initial resources
    const initialResources: InsertResource[] = [
      {
        title: "Guia para Educadores: Integrando Sustentabilidade em Sala de Aula",
        description: "Um guia completo com atividades práticas, planos de aula e recursos para integrar a educação para o desenvolvimento sustentável no currículo escolar.",
        type: "Guia Prático",
        imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
        downloadUrl: "/resources/guia-educadores.pdf"
      },
      {
        title: "30 Atividades Práticas sobre Desenvolvimento Sustentável",
        description: "Uma coletânea de atividades interativas para alunos do ensino fundamental e médio, abordando temas relacionados aos Objetivos de Desenvolvimento Sustentável.",
        type: "Kit de Atividades",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        downloadUrl: "/resources/atividades-praticas.pdf"
      },
      {
        title: "Série de Infográficos sobre ODS 4",
        description: "Conjunto de infográficos educativos que explicam de maneira visual e acessível as metas do ODS 4 e sua importância para o desenvolvimento sustentável.",
        type: "Infográficos",
        imageUrl: "https://images.unsplash.com/photo-1517157837591-17b69085bfdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1802&q=80",
        downloadUrl: "/resources/infograficos-ods4.pdf"
      }
    ];
    
    initialResources.forEach(resource => this.createResource(resource));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Participant methods
  async getAllParticipants(): Promise<Participant[]> {
    return Array.from(this.participants.values());
  }
  
  async getParticipant(id: number): Promise<Participant | undefined> {
    return this.participants.get(id);
  }
  
  async createParticipant(insertParticipant: InsertParticipant): Promise<Participant> {
    const id = this.participantId++;
    const participant: Participant = { 
      ...insertParticipant, 
      id, 
      createdAt: new Date() 
    };
    this.participants.set(id, participant);
    return participant;
  }
  
  // Resource methods
  async getAllResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }
  
  async getResourcesByType(type: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(
      resource => resource.type === type
    );
  }
  
  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }
  
  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.resourceId++;
    const resource: Resource = {
      ...insertResource,
      id,
      createdAt: new Date()
    };
    this.resources.set(id, resource);
    return resource;
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const testimonial: Testimonial = {
      ...insertTestimonial,
      id,
      createdAt: new Date()
    };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Stat methods
  async getAllStats(): Promise<Stat[]> {
    return Array.from(this.stats.values());
  }
  
  async getStatsByCategory(category: string): Promise<Stat[]> {
    return Array.from(this.stats.values()).filter(
      stat => stat.category === category
    );
  }
  
  async getStat(id: number): Promise<Stat | undefined> {
    return this.stats.get(id);
  }
  
  async createStat(insertStat: InsertStat): Promise<Stat> {
    const id = this.statId++;
    const stat: Stat = {
      ...insertStat,
      id
    };
    this.stats.set(id, stat);
    return stat;
  }
}

export const storage = new MemStorage();
