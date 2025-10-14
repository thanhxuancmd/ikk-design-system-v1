import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for KOCs, Advertisers, and Admins
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("publisher"), // publisher, advertiser, admin
  avatar: text("avatar"),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// KOC (Publisher) profiles
export const kocProfiles = pgTable("koc_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  followers: json("followers"), // {facebook: number, instagram: number, tiktok: number, youtube: number}
  categories: json("categories").$type<string[]>().default([]),
  location: text("location"),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  completedCampaigns: integer("completed_campaigns").default(0),
  totalPoints: integer("total_points").default(0),
  level: text("level").default("Nano"), // Nano, Micro, Macro, Celebrity
  isVerified: boolean("is_verified").default(false),
});

// Brands table
export const brands = pgTable("brands", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  brandId: text("brand_id"),
  name: text("name").notNull(),
  logo: text("logo"),
  brandType: text("brand_type"),
  industry: text("industry"),
  description: text("description"),
  category: text("category"),
  totalCampaigns: integer("total_campaigns").default(0),
  avgReward: integer("avg_reward").default(0),
  platforms: text("platforms"),
  status: text("status").default("Active"),
  website: text("website"),
  contactEmail: text("contact_email"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Campaigns table
export const campaigns = pgTable("campaigns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  brandId: varchar("brand_id").references(() => brands.id).notNull(),
  brandName: text("brand_name"),
  description: text("description").notNull(),
  category: text("category").notNull(),
  type: text("type").notNull(), // review, checkin, cpi, cpa, seeding
  
  // Target Audience
  targetGender: text("target_gender"),
  targetAgeMin: integer("target_age_min"),
  targetAgeMax: integer("target_age_max"),
  targetLocation: json("target_location").$type<string[]>(),
  targetFollowers: text("target_followers"),
  platforms: json("platforms").$type<string[]>(),
  targetDescription: text("target_description"),
  minEngagementRate: decimal("min_engagement_rate", { precision: 5, scale: 2 }),
  minAvgViews: integer("min_avg_views"),
  
  // Content Requirements
  contentType: text("content_type"),
  contentRequirements: text("content_requirements"),
  hashtags: json("hashtags").$type<string[]>(),
  postingSchedule: text("posting_schedule"),
  
  // Budget & Rewards
  reward: integer("reward").notNull(), // Points or VND per KOC
  bonusReward: integer("bonus_reward"),
  rewardType: text("reward_type"), // cash, product, voucher, combo
  rewardAmount: integer("reward_amount"),
  budget: integer("budget").notNull(),
  kocNeeded: integer("koc_needed").notNull(),
  kocApplied: integer("koc_applied").default(0),
  kocSelected: integer("koc_selected").default(0),
  productSamples: boolean("product_samples").default(false),
  
  // Timeline
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  applicationDeadline: timestamp("application_deadline"),
  selectionDeadline: timestamp("selection_deadline"),
  contentDeadline: timestamp("content_deadline"),
  reviewDeadline: timestamp("review_deadline"),
  
  // Settings
  isUrgent: boolean("is_urgent").default(false),
  requireApproval: boolean("require_approval").default(true),
  autoApprove: boolean("auto_approve").default(false),
  isPrivate: boolean("is_private").default(false),
  
  // Terms & Usage Rights
  contentUsageAllowed: boolean("content_usage_allowed").default(false),
  contentUsageMonths: integer("content_usage_months"),
  productReturnRequired: boolean("product_return_required").default(false),
  productReturnGuide: text("product_return_guide"),
  guidelineUrl: text("guideline_url"),
  websiteUrl: text("website_url"),
  
  // Legacy fields
  requirements: json("requirements"), // Complex requirements object
  content: json("content"), // Content requirements
  timeline: json("timeline"), // Timeline dates
  kpi: json("kpi"), // KPI targets
  
  status: text("status").default("draft"), // draft, recruiting, in-progress, review, completed
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Applications table
export const applications = pgTable("applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  campaignId: varchar("campaign_id").references(() => campaigns.id).notNull(),
  kocId: varchar("koc_id").references(() => users.id).notNull(),
  status: text("status").default("pending"), // pending, selected, rejected, completed
  message: text("message").notNull(),
  submittedContent: json("submitted_content"), // Content submission data
  appliedAt: timestamp("applied_at").defaultNow(),
});

// Notifications table
export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").notNull(), // info, success, warning, error
  isRead: boolean("is_read").default(false),
  targetAudience: text("target_audience").default("all"), // all, publishers, advertisers, admins
  priority: text("priority").default("medium"), // low, medium, high
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema exports
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertKocProfileSchema = createInsertSchema(kocProfiles).omit({
  id: true,
});

export const insertBrandSchema = createInsertSchema(brands).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(2, "Tên thương hiệu phải có ít nhất 2 ký tự").refine(
    (val) => val.trim().length > 0,
    { message: "Tên thương hiệu không được để trống hoặc chỉ chứa khoảng trắng" }
  ),
  brandId: z.string().min(1, "Mã thương hiệu là bắt buộc").refine(
    (val) => val.trim().length > 0,
    { message: "Mã thương hiệu không được để trống" }
  ),
  brandType: z.string().min(1, "Loại hình là bắt buộc").refine(
    (val) => val.trim().length > 0,
    { message: "Loại hình không được để trống" }
  ),
  industry: z.string().min(1, "Ngành nghề là bắt buộc").refine(
    (val) => val.trim().length > 0,
    { message: "Ngành nghề không được để trống" }
  ),
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  appliedAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertKocProfile = z.infer<typeof insertKocProfileSchema>;
export type KocProfile = typeof kocProfiles.$inferSelect;
export type InsertBrand = z.infer<typeof insertBrandSchema>;
export type Brand = typeof brands.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type Campaign = typeof campaigns.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;
