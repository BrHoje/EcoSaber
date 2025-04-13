import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertParticipantSchema } from "@shared/schema";
import { ZodError } from "zod";
import * as htmlPdf from "html-pdf-node";
import { generateProjectPdfTemplate } from "./pdfTemplate";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints
  app.get("/api/stats", async (req, res) => {
    try {
      const category = req.query.category as string;
      let stats;
      
      if (category) {
        stats = await storage.getStatsByCategory(category);
      } else {
        stats = await storage.getAllStats();
      }
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  app.get("/api/resources", async (req, res) => {
    try {
      const type = req.query.type as string;
      let resources;
      
      if (type) {
        resources = await storage.getResourcesByType(type);
      } else {
        resources = await storage.getAllResources();
      }
      
      res.json(resources);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resources" });
    }
  });

  app.post("/api/participants", async (req, res) => {
    try {
      const participantData = insertParticipantSchema.parse(req.body);
      const newParticipant = await storage.createParticipant(participantData);
      res.status(201).json(newParticipant);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          error: "Invalid participant data", 
          details: error.errors 
        });
      } else {
        res.status(500).json({ error: "Failed to create participant" });
      }
    }
  });

  // Rota para gerar o PDF do projeto
  app.get("/download-project-pdf", async (req, res) => {
    try {
      // Obtendo dados do storage
      const resources = await storage.getAllResources();
      const testimonials = await storage.getAllTestimonials();
      const aboutStats = await storage.getStatsByCategory("about");
      const impactStats = await storage.getStatsByCategory("impact");
      
      // Gerando o HTML para o PDF
      const htmlContent = generateProjectPdfTemplate({
        resources,
        testimonials,
        aboutStats,
        impactStats
      });
      
      // Configurando opções do PDF
      const options = {
        format: 'A4',
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm'
        },
        printBackground: true,
        preferCSSPageSize: true
      };
      
      // Gerando o PDF
      const file = { content: htmlContent };
      const pdfBuffer = await htmlPdf.generatePdf(file, options);
      
      // Configurando cabeçalhos para download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=Projeto_EcoSaber.pdf');
      
      // Enviando o PDF para download
      res.send(pdfBuffer);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      res.status(500).json({ error: "Falha ao gerar o PDF do projeto" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
