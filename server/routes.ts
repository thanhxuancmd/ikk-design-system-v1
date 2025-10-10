import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, insertKocProfileSchema, insertBrandSchema, 
  insertCampaignSchema, insertApplicationSchema, insertNotificationSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json({ users });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const user = insertUserSchema.parse(req.body);
      const newUser = await storage.createUser(user);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // KOC Profile routes
  app.post("/api/koc-profiles", async (req, res) => {
    try {
      const profile = insertKocProfileSchema.parse(req.body);
      const newProfile = await storage.createKocProfile(profile);
      res.status(201).json(newProfile);
    } catch (error) {
      res.status(400).json({ error: "Invalid profile data" });
    }
  });

  app.get("/api/koc-profiles/user/:userId", async (req, res) => {
    try {
      const profile = await storage.getKocProfileByUserId(req.params.userId);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  app.patch("/api/koc-profiles/user/:userId", async (req, res) => {
    try {
      const updates = req.body;
      const updatedProfile = await storage.updateKocProfile(req.params.userId, updates);
      if (!updatedProfile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      res.json(updatedProfile);
    } catch (error) {
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  app.delete("/api/koc-profiles/user/:userId", async (req, res) => {
    try {
      const profile = await storage.getKocProfileByUserId(req.params.userId);
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      await storage.deleteKocProfile(req.params.userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete profile" });
    }
  });

  app.get("/api/koc-profiles", async (req, res) => {
    try {
      const profiles = await storage.getAllKocProfilesEnriched();
      res.json({ profiles });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profiles" });
    }
  });

  app.get("/api/koc-rankings", async (req, res) => {
    try {
      const { period, category } = req.query;
      const rankings = await storage.getKocRankings(
        period as string | undefined, 
        category as string | undefined
      );
      res.json({ rankings });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rankings" });
    }
  });

  // Brand routes
  app.get("/api/brands", async (req, res) => {
    try {
      const brands = await storage.getAllBrands();
      res.json({ brands });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brands" });
    }
  });

  app.post("/api/brands", async (req, res) => {
    try {
      const brand = insertBrandSchema.parse(req.body);
      const newBrand = await storage.createBrand(brand);
      res.status(201).json(newBrand);
    } catch (error) {
      res.status(400).json({ error: "Invalid brand data" });
    }
  });

  app.get("/api/brands/:id", async (req, res) => {
    try {
      const brand = await storage.getBrandById(req.params.id);
      if (!brand) {
        return res.status(404).json({ error: "Brand not found" });
      }
      res.json(brand);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch brand" });
    }
  });

  app.patch("/api/brands/:id", async (req, res) => {
    try {
      const updates = req.body;
      const updatedBrand = await storage.updateBrand(req.params.id, updates);
      if (!updatedBrand) {
        return res.status(404).json({ error: "Brand not found" });
      }
      res.json(updatedBrand);
    } catch (error) {
      res.status(500).json({ error: "Failed to update brand" });
    }
  });

  app.delete("/api/brands/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteBrand(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Brand not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete brand" });
    }
  });

  // Campaign routes
  app.get("/api/campaigns", async (req, res) => {
    try {
      const { brandId } = req.query;
      let campaigns;
      
      if (brandId) {
        campaigns = await storage.getCampaignsByBrandId(brandId as string);
      } else {
        campaigns = await storage.getAllCampaigns();
      }
      
      res.json({ campaigns });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    try {
      const campaign = insertCampaignSchema.parse(req.body);
      const newCampaign = await storage.createCampaign(campaign);
      res.status(201).json(newCampaign);
    } catch (error) {
      res.status(400).json({ error: "Invalid campaign data" });
    }
  });

  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const campaign = await storage.getCampaignById(req.params.id);
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaign" });
    }
  });

  app.patch("/api/campaigns/:id", async (req, res) => {
    try {
      const updates = req.body;
      const updatedCampaign = await storage.updateCampaign(req.params.id, updates);
      if (!updatedCampaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      res.json(updatedCampaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to update campaign" });
    }
  });

  // Application routes
  app.post("/api/applications", async (req, res) => {
    try {
      const application = insertApplicationSchema.parse(req.body);
      const newApplication = await storage.createApplication(application);
      
      // Update campaign applied count
      const campaign = await storage.getCampaignById(application.campaignId);
      if (campaign) {
        await storage.updateCampaign(campaign.id, { 
          kocApplied: campaign.kocApplied + 1 
        });
      }
      
      res.status(201).json(newApplication);
    } catch (error) {
      res.status(400).json({ error: "Invalid application data" });
    }
  });

  app.get("/api/applications/koc/:kocId", async (req, res) => {
    try {
      const applications = await storage.getApplicationsByKocId(req.params.kocId);
      res.json({ applications });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.get("/api/applications/campaign/:campaignId", async (req, res) => {
    try {
      const applications = await storage.getApplicationsByCampaignId(req.params.campaignId);
      res.json({ applications });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  });

  app.patch("/api/applications/:id/status", async (req, res) => {
    try {
      const { status } = req.body;
      const updatedApplication = await storage.updateApplicationStatus(req.params.id, status);
      if (!updatedApplication) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.json(updatedApplication);
    } catch (error) {
      res.status(500).json({ error: "Failed to update application" });
    }
  });

  // Notification routes
  app.get("/api/notifications", async (req, res) => {
    try {
      const notifications = await storage.getAllNotifications();
      res.json({ notifications });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  });

  app.post("/api/notifications", async (req, res) => {
    try {
      const notification = insertNotificationSchema.parse(req.body);
      const newNotification = await storage.createNotification(notification);
      res.status(201).json(newNotification);
    } catch (error) {
      res.status(400).json({ error: "Invalid notification data" });
    }
  });

  app.patch("/api/notifications/:id/read", async (req, res) => {
    try {
      await storage.markNotificationRead(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to mark notification as read" });
    }
  });

  // Placeholder image route (for development)
  app.get("/api/placeholder/:width/:height", (req, res) => {
    const { width, height } = req.params;
    const color = req.query.color || '9CA3AF';
    const text = req.query.text || `${width}x${height}`;
    
    // Generate a simple SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#${color}"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial, sans-serif" font-size="${Math.min(parseInt(width), parseInt(height)) / 8}">${text}</text>
      </svg>
    `;
    
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(svg);
  });

  const httpServer = createServer(app);

  return httpServer;
}
