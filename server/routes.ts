import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertParticipantSchema } from "@shared/schema";
import { ZodError } from "zod";

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

  const httpServer = createServer(app);

  return httpServer;
}
