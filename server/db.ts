import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export const db = drizzle({ client: pool, schema });

// Função auxiliar para verificar a existência de tabelas
export async function checkTablesExist() {
  try {
    // Verificar se a tabela resources existe
    const result = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'resources'
      );
    `);
    
    return result.rows[0].exists;
  } catch (error) {
    console.error('Erro ao verificar tabelas:', error);
    return false;
  }
}

// Função auxiliar para criar esquema básico caso necessário
export async function ensureSchemaExists() {
  const tablesExist = await checkTablesExist();
  
  if (!tablesExist) {
    console.log("Tabelas não encontradas. Criando esquema básico...");
    try {
      // Criar as tabelas do esquema
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          role TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS participants (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          institution TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS resources (
          id SERIAL PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          type TEXT NOT NULL,
          url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS testimonials (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          role TEXT NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS stats (
          id SERIAL PRIMARY KEY,
          label TEXT NOT NULL,
          value TEXT NOT NULL,
          icon TEXT,
          category TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Esquema básico criado com sucesso.");
    } catch (error) {
      console.error('Erro ao criar esquema:', error);
    }
  } else {
    console.log("Tabelas já existem no banco de dados.");
  }
}