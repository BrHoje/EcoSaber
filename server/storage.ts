import { 
  users, type User, type InsertUser,
  participants, type Participant, type InsertParticipant,
  resources, type Resource, type InsertResource,
  testimonials, type Testimonial, type InsertTestimonial,
  stats, type Stat, type InsertStat
} from "@shared/schema";
import { db } from "./db";
import { eq, count } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Participant methods
  async getAllParticipants(): Promise<Participant[]> {
    return await db.select().from(participants);
  }
  
  async getParticipant(id: number): Promise<Participant | undefined> {
    const [participant] = await db.select().from(participants).where(eq(participants.id, id));
    return participant || undefined;
  }
  
  async createParticipant(insertParticipant: InsertParticipant): Promise<Participant> {
    const [participant] = await db.insert(participants).values({
      ...insertParticipant,
      createdAt: new Date()
    }).returning();
    return participant;
  }
  
  // Resource methods
  async getAllResources(): Promise<Resource[]> {
    return await db.select().from(resources);
  }
  
  async getResourcesByType(type: string): Promise<Resource[]> {
    return await db.select().from(resources).where(eq(resources.type, type));
  }
  
  async getResource(id: number): Promise<Resource | undefined> {
    const [resource] = await db.select().from(resources).where(eq(resources.id, id));
    return resource || undefined;
  }
  
  async createResource(insertResource: InsertResource): Promise<Resource> {
    const [resource] = await db.insert(resources).values({
      ...insertResource,
      createdAt: new Date()
    }).returning();
    return resource;
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    const [testimonial] = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return testimonial || undefined;
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values({
      ...insertTestimonial,
      createdAt: new Date()
    }).returning();
    return testimonial;
  }
  
  // Stat methods
  async getAllStats(): Promise<Stat[]> {
    return await db.select().from(stats);
  }
  
  async getStatsByCategory(category: string): Promise<Stat[]> {
    return await db.select().from(stats).where(eq(stats.category, category));
  }
  
  async getStat(id: number): Promise<Stat | undefined> {
    const [stat] = await db.select().from(stats).where(eq(stats.id, id));
    return stat || undefined;
  }
  
  async createStat(insertStat: InsertStat): Promise<Stat> {
    const [stat] = await db.insert(stats).values(insertStat).returning();
    return stat;
  }
}

// Inicializa com dados padrão se o banco estiver vazio
async function initializeDatabaseWithDefaultData() {
  // Verifica se já existem estatísticas
  const statsCount = await db.select({ count: count() }).from(stats);
  
  if (statsCount[0].count === 0) {
    // Adiciona estatísticas iniciais
    await db.insert(stats).values([
      { label: "dos participantes relatam maior consciência ambiental", value: "85%", category: "about", icon: "chart-pie" },
      { label: "escolas parceiras implementando o programa", value: "12", category: "about", icon: "school" },
      { label: "estudantes impactados diretamente", value: "2.500+", category: "about", icon: "users" },
      { label: "projetos comunitários desenvolvidos", value: "32", category: "about", icon: "project-diagram" },
      { label: "Estudantes Alcançados", value: "2.500+", category: "impact", icon: "user-graduate" },
      { label: "Educadores Capacitados", value: "180", category: "impact", icon: "chalkboard-teacher" },
      { label: "Escolas Parceiras", value: "12", category: "impact", icon: "school" },
      { label: "Projetos Comunitários", value: "32", category: "impact", icon: "project-diagram" }
    ]);
  }
  
  // Verifica se já existem depoimentos
  const testimonialsCount = await db.select({ count: count() }).from(testimonials);
  
  if (testimonialsCount[0].count === 0) {
    // Adiciona depoimentos iniciais
    await db.insert(testimonials).values([
      {
        name: "Mariana Silva",
        role: "Professora, Escola Municipal São José",
        text: "Os recursos educacionais e o suporte oferecidos pelo projeto EcoSaber transformaram a maneira como abordo a sustentabilidade em sala de aula. Meus alunos estão muito mais engajados e motivados a desenvolver projetos que impactam positivamente a comunidade escolar e suas famílias.",
        imageUrl: "https://randomuser.me/api/portraits/women/12.jpg",
        createdAt: new Date()
      },
      {
        name: "Carlos Mendes",
        role: "Coordenador de Projetos, Secretaria Municipal de Educação",
        text: "A parceria com o projeto EcoSaber tem sido fundamental para o fortalecimento da educação para o desenvolvimento sustentável em nossas escolas. Os resultados são visíveis: professores mais preparados, alunos mais conscientes e uma comunidade mais engajada com as questões ambientais e sociais.",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
        createdAt: new Date()
      },
      {
        name: "Fernanda Alves",
        role: "Mãe de aluno participante do projeto",
        text: "Meu filho mudou completamente sua atitude em relação ao meio ambiente depois de participar das atividades do EcoSaber. Em casa, ele tem promovido práticas sustentáveis e nos incentivado a repensar nossos hábitos de consumo. É incrível como o projeto consegue transformar crianças em verdadeiros agentes de mudança.",
        imageUrl: "https://randomuser.me/api/portraits/women/45.jpg",
        createdAt: new Date()
      },
      {
        name: "Pedro Oliveira",
        role: "Estudante, 16 anos",
        text: "Participar dos workshops do EcoSaber abriu meus olhos para a importância da educação e da sustentabilidade. Hoje, lidero um grupo de estudantes na minha escola que desenvolve projetos ambientais e sociais. Sinto que estou fazendo a diferença na minha comunidade e construindo um futuro melhor para todos.",
        imageUrl: "https://randomuser.me/api/portraits/men/67.jpg",
        createdAt: new Date()
      }
    ]);
  }
  
  // Verifica se já existem recursos
  const resourcesCount = await db.select({ count: count() }).from(resources);
  
  if (resourcesCount[0].count === 0) {
    // Adiciona recursos iniciais
    await db.insert(resources).values([
      {
        title: "Guia para Educadores: Integrando Sustentabilidade em Sala de Aula",
        description: "Um guia completo com atividades práticas, planos de aula e recursos para integrar a educação para o desenvolvimento sustentável no currículo escolar.",
        type: "Guia Prático",
        imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
        downloadUrl: "/resources/guia-educadores.pdf",
        createdAt: new Date()
      },
      {
        title: "30 Atividades Práticas sobre Desenvolvimento Sustentável",
        description: "Uma coletânea de atividades interativas para alunos do ensino fundamental e médio, abordando temas relacionados aos Objetivos de Desenvolvimento Sustentável.",
        type: "Kit de Atividades",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
        downloadUrl: "/resources/atividades-praticas.pdf",
        createdAt: new Date()
      },
      {
        title: "Série de Infográficos sobre ODS 4",
        description: "Conjunto de infográficos educativos que explicam de maneira visual e acessível as metas do ODS 4 e sua importância para o desenvolvimento sustentável.",
        type: "Infográficos",
        imageUrl: "https://images.unsplash.com/photo-1517157837591-17b69085bfdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1802&q=80",
        downloadUrl: "/resources/infograficos-ods4.pdf",
        createdAt: new Date()
      }
    ]);
  }
}

// Inicializa o banco de dados e cria a instância de armazenamento
(async () => {
  try {
    await initializeDatabaseWithDefaultData();
    console.log("Database initialized with default data (if needed)");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
})();

export const storage = new DatabaseStorage();
