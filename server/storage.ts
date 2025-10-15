import type {
  InsertUser, User, InsertKocProfile, KocProfile,
  InsertBrand, Brand, InsertCampaign, Campaign,
  InsertApplication, Application, InsertNotification, Notification,
  Category, InsertCategory
} from "@shared/schema";
import { categoriesTable } from "@shared/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  createUser(user: InsertUser): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserById(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;

  // KOC Profile operations
  createKocProfile(profile: InsertKocProfile): Promise<KocProfile>;
  getKocProfileByUserId(userId: string): Promise<KocProfile | undefined>;
  updateKocProfile(userId: string, updates: Partial<KocProfile>): Promise<KocProfile | undefined>;
  deleteKocProfile(userId: string): Promise<void>;
  getAllKocProfiles(): Promise<KocProfile[]>;
  getAllKocProfilesEnriched(): Promise<any[]>;
  getKocRankings(period?: string, category?: string): Promise<any[]>;

  // Brand operations
  createBrand(brand: InsertBrand): Promise<Brand>;
  getAllBrands(): Promise<Brand[]>;
  getBrandById(id: string): Promise<Brand | undefined>;
  updateBrand(id: string, updates: Partial<InsertBrand>): Promise<Brand | undefined>;
  deleteBrand(id: string): Promise<boolean>;

  // Campaign operations
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  getAllCampaigns(): Promise<Campaign[]>;
  getCampaignById(id: string): Promise<Campaign | undefined>;
  getCampaignsByBrandId(brandId: string): Promise<Campaign[]>;
  updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined>;

  // Application operations
  createApplication(application: InsertApplication): Promise<Application>;
  getApplicationsByKocId(kocId: string): Promise<Application[]>;
  getApplicationsByCampaignId(campaignId: string): Promise<Application[]>;
  updateApplicationStatus(id: string, status: string): Promise<Application | undefined>;

  // Notification operations
  createNotification(notification: InsertNotification): Promise<Notification>;
  getAllNotifications(): Promise<Notification[]>;
  markNotificationRead(id: string): Promise<void>;

  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, updates: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users = new Map<string, User>();
  private kocProfiles = new Map<string, KocProfile>();
  private brands = new Map<string, Brand>();
  private campaigns = new Map<string, Campaign>();
  private applications = new Map<string, Application>();
  private notifications = new Map<string, Notification>();
  private categories = new Map<string, Category>();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Create mock users and KOC profiles
    const mockUsers = [
      {
        id: "user-1",
        username: "minh_beauty_official",
        email: "minh@beauty.vn",
        password: "hashed_password",
        role: "publisher",
        avatar: "/avatars/minh-anh.jpg",
        name: "Nguyễn Minh Anh",
        createdAt: new Date("2023-03-15"),
        updatedAt: new Date()
      },
      {
        id: "user-2", 
        username: "chef_huong_kitchen",
        email: "huong@chef.vn",
        password: "hashed_password",
        role: "publisher",
        avatar: "/avatars/huong-chef.jpg",
        name: "Lê Thị Hương",
        createdAt: new Date("2023-01-20"),
        updatedAt: new Date()
      },
      {
        id: "user-3",
        username: "tech_reviewer_nam",
        email: "nam@tech.vn", 
        password: "hashed_password",
        role: "publisher",
        avatar: "/avatars/nam-tech.jpg",
        name: "Phạm Văn Nam",
        createdAt: new Date("2023-05-10"),
        updatedAt: new Date()
      },
      {
        id: "user-4",
        username: "fitness_linh_official",
        email: "linh@fitness.vn",
        password: "hashed_password", 
        role: "publisher",
        avatar: "/avatars/linh-fitness.jpg",
        name: "Trần Thùy Linh",
        createdAt: new Date("2023-02-28"),
        updatedAt: new Date()
      },
      {
        id: "user-5",
        username: "travel_blogger_duc",
        email: "duc@travel.vn",
        password: "hashed_password",
        role: "publisher", 
        avatar: "/avatars/duc-travel.jpg",
        name: "Vũ Minh Đức",
        createdAt: new Date("2023-07-05"),
        updatedAt: new Date()
      },
      {
        id: "user-6",
        username: "fashionista_mai",
        email: "mai@fashion.vn",
        password: "hashed_password",
        role: "publisher",
        avatar: "/avatars/mai-fashion.jpg", 
        name: "Đỗ Thị Mai",
        createdAt: new Date("2023-04-12"),
        updatedAt: new Date()
      },
      {
        id: "user-7",
        username: "gaming_pro_quan",
        email: "quan@gaming.vn",
        password: "hashed_password",
        role: "publisher",
        avatar: "/avatars/quan-gaming.jpg",
        name: "Nguyễn Minh Quân", 
        createdAt: new Date("2023-06-18"),
        updatedAt: new Date()
      },
      {
        id: "user-8",
        username: "mom_blogger_thao",
        email: "thao@mom.vn",
        password: "hashed_password",
        role: "publisher",
        avatar: "/avatars/thao-mom.jpg",
        name: "Lý Thanh Thảo",
        createdAt: new Date("2023-08-22"),
        updatedAt: new Date()
      }
    ];

    const mockKocProfiles = [
      {
        id: "koc-1",
        userId: "user-1",
        followers: { 
          facebook: 45000,
          instagram: 180000, 
          tiktok: 320000,
          youtube: 85000
        },
        categories: ["Làm đẹp", "Thời trang", "Skincare"],
        location: "TP. Hồ Chí Minh",
        rating: "4.8",
        completedCampaigns: 45,
        totalPoints: 89500,
        level: "Diamond",
        isVerified: true
      },
      {
        id: "koc-2",
        userId: "user-2", 
        followers: {
          facebook: 65000,
          instagram: 120000,
          tiktok: 280000,
          youtube: 150000
        },
        categories: ["Ẩm thực", "Nấu ăn", "Review nhà hàng"],
        location: "Hà Nội",
        rating: "4.9",
        completedCampaigns: 52,
        totalPoints: 105000,
        level: "Diamond",
        isVerified: true
      },
      {
        id: "koc-3",
        userId: "user-3",
        followers: {
          facebook: 32000,
          instagram: 95000,
          tiktok: 150000,
          youtube: 220000
        },
        categories: ["Công nghệ", "Điện thoại", "Laptop"],
        location: "Đà Nẵng",
        rating: "4.7",
        completedCampaigns: 35,
        totalPoints: 72000,
        level: "Gold",
        isVerified: true
      },
      {
        id: "koc-4",
        userId: "user-4",
        followers: {
          facebook: 28000,
          instagram: 75000, 
          tiktok: 180000,
          youtube: 45000
        },
        categories: ["Thể thao", "Gym", "Sức khỏe"],
        location: "TP. Hồ Chí Minh",
        rating: "4.6",
        completedCampaigns: 28,
        totalPoints: 55000,
        level: "Gold", 
        isVerified: true
      },
      {
        id: "koc-5",
        userId: "user-5",
        followers: {
          facebook: 55000,
          instagram: 110000,
          tiktok: 95000,
          youtube: 80000
        },
        categories: ["Du lịch", "Khách sạn", "Review địa điểm"],
        location: "Hà Nội",
        rating: "4.5",
        completedCampaigns: 22,
        totalPoints: 48000,
        level: "Silver",
        isVerified: true
      },
      {
        id: "koc-6", 
        userId: "user-6",
        followers: {
          facebook: 38000,
          instagram: 160000,
          tiktok: 210000,
          youtube: 35000
        },
        categories: ["Thời trang", "Phụ kiện", "Street style"],
        location: "TP. Hồ Chí Minh", 
        rating: "4.4",
        completedCampaigns: 31,
        totalPoints: 62000,
        level: "Gold",
        isVerified: false
      },
      {
        id: "koc-7",
        userId: "user-7",
        followers: {
          facebook: 15000,
          instagram: 45000,
          tiktok: 380000, 
          youtube: 95000
        },
        categories: ["Gaming", "Esports", "Review game"],
        location: "Hà Nội",
        rating: "4.3",
        completedCampaigns: 18,
        totalPoints: 35000,
        level: "Silver",
        isVerified: false
      },
      {
        id: "koc-8",
        userId: "user-8",
        followers: {
          facebook: 85000,
          instagram: 65000,
          tiktok: 120000,
          youtube: 40000
        },
        categories: ["Parenting", "Gia đình", "Sản phẩm trẻ em"],
        location: "Cần Thơ",
        rating: "4.7",
        completedCampaigns: 26,
        totalPoints: 52000,
        level: "Silver", 
        isVerified: true
      }
    ];

    // Store users and profiles
    mockUsers.forEach(user => this.users.set(user.id, user as User));
    mockKocProfiles.forEach(profile => this.kocProfiles.set(profile.id, profile as KocProfile));

    // Create financial brands from CSV data
    const financialBrands: Brand[] = [
      {
        id: randomUUID(),
        brandId: "FIN001",
        name: "Finmart",
        logo: null,
        brandType: "Fintech",
        industry: "Tài chính số",
        description: "Nền tảng so sánh và tư vấn thẻ tín dụng",
        category: "Tài chính",
        totalCampaigns: 1,
        avgReward: 800000,
        platforms: "TikTok",
        status: "Active",
        website: null,
        contactEmail: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        brandId: "FIN002",
        name: "KBank",
        logo: null,
        brandType: "Bank",
        industry: "Ngân hàng",
        description: "Ngân hàng Kasikornbank",
        category: "Tài chính",
        totalCampaigns: 1,
        avgReward: 900000,
        platforms: "Facebook",
        status: "Active",
        website: null,
        contactEmail: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        brandId: "FIN003",
        name: "VNSC",
        logo: null,
        brandType: "Securities",
        industry: "Chứng khoán",
        description: "Vietnam Securities Corporation - Công ty chứng khoán",
        category: "Tài chính",
        totalCampaigns: 1,
        avgReward: 700000,
        platforms: "TikTok",
        status: "Active",
        website: null,
        contactEmail: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        brandId: "FIN004",
        name: "GREENCAP",
        logo: null,
        brandType: "Investment",
        industry: "Đầu tư",
        description: "Công ty đầu tư và xuất bản sách tài chính",
        category: "Tài chính",
        totalCampaigns: 1,
        avgReward: 700000,
        platforms: "Facebook",
        status: "Active",
        website: null,
        contactEmail: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        brandId: "FIN005",
        name: "1Long",
        logo: null,
        brandType: "Fintech",
        industry: "Tài chính số",
        description: "App quản lý tài chính cá nhân",
        category: "Tài chính",
        totalCampaigns: 1,
        avgReward: 700000,
        platforms: "Facebook, App Store, Google Play",
        status: "Active",
        website: null,
        contactEmail: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        brandId: "FIN006",
        name: "VPBank",
        logo: null,
        brandType: "Bank",
        industry: "Ngân hàng",
        description: "Ngân hàng Việt Nam Thịnh Vượng",
        category: "Tài chính",
        totalCampaigns: 2,
        avgReward: 700000,
        platforms: "TikTok",
        status: "Active",
        website: null,
        contactEmail: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        brandId: "FIN007",
        name: "GENERALI",
        logo: null,
        brandType: "Insurance",
        industry: "Bảo hiểm",
        description: "Tập đoàn bảo hiểm Generali Việt Nam",
        category: "Tài chính",
        totalCampaigns: 13,
        avgReward: 500000,
        platforms: "Facebook, TikTok",
        status: "Active",
        website: null,
        contactEmail: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        brandId: "FIN008",
        name: "TOPI",
        logo: null,
        brandType: "Fintech",
        industry: "Tài chính số",
        description: "App quản lý tài chính và đầu tư",
        category: "Tài chính",
        totalCampaigns: 1,
        avgReward: 800000,
        platforms: "TikTok, Facebook",
        status: "Active",
        website: null,
        contactEmail: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        brandId: "FIN009",
        name: "ZaloPay",
        logo: null,
        brandType: "E-wallet",
        industry: "Ví điện tử",
        description: "Ví điện tử ZaloPay của VNG",
        category: "Tài chính",
        totalCampaigns: 1,
        avgReward: 500000,
        platforms: "TikTok",
        status: "Active",
        website: null,
        contactEmail: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        brandId: "FIN010",
        name: "HANAGOLD",
        logo: null,
        brandType: "Fintech",
        industry: "Tài chính số",
        description: "App đầu tư vàng trực tuyến",
        category: "Tài chính",
        totalCampaigns: 1,
        avgReward: 800000,
        platforms: "TikTok, Facebook",
        status: "Active",
        website: null,
        contactEmail: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        brandId: "FIN011",
        name: "Chứng khoán Shinhan",
        logo: null,
        brandType: "Securities",
        industry: "Chứng khoán",
        description: "Công ty chứng khoán Shinhan Việt Nam",
        category: "Tài chính",
        totalCampaigns: 1,
        avgReward: 800000,
        platforms: "TikTok",
        status: "Active",
        website: null,
        contactEmail: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        brandId: "FIN012",
        name: "ADTECHINNO",
        logo: null,
        brandType: "Fintech",
        industry: "Công nghệ tài chính",
        description: "Công ty công nghệ phát triển app ngân hàng",
        category: "Tài chính",
        totalCampaigns: 1,
        avgReward: 700000,
        platforms: "TikTok",
        status: "Active",
        website: null,
        contactEmail: null,
        createdAt: new Date()
      },
      {
        id: randomUUID(),
        brandId: "FIN013",
        name: "TPBank",
        logo: null,
        brandType: "Bank",
        industry: "Ngân hàng",
        description: "Ngân hàng Tiên Phong (qua Xanh Marketing)",
        category: "Tài chính",
        totalCampaigns: 1,
        avgReward: 500000,
        platforms: "TikTok",
        status: "Active",
        website: null,
        contactEmail: null,
        createdAt: new Date()
      }
    ];

    financialBrands.forEach(brand => this.brands.set(brand.id, brand));

    // Create mock notifications
    const notification1: Notification = {
      id: "notif-1",
      title: "Chiến dịch mới có sẵn",
      message: "Shopee Flash Sale - Commission 3.5% đang chờ bạn tham gia",
      type: "info",
      isRead: false,
      targetAudience: "publishers",
      priority: "medium",
      createdAt: new Date()
    };

    const notification2: Notification = {
      id: "notif-2",
      title: "Thanh toán thành công",
      message: "Bạn đã nhận được 1,500,000 VND từ chiến dịch Tiki Electronics",
      type: "success",
      isRead: false,
      targetAudience: "publishers",
      priority: "high",
      createdAt: new Date()
    };

    this.notifications.set(notification1.id, notification1);
    this.notifications.set(notification2.id, notification2);

    const mockCategories: Category[] = [
      { id: 'CAT001', name: 'Hướng dẫn Dịch vụ', slug: 'revu_guide', type: 'MAIN', parentId: null, iconNumber: '6', description: 'REVU GUIDE - Hướng dẫn sử dụng dịch vụ', createdAt: new Date(), updatedAt: new Date() },
      { id: 'CAT002', name: 'Nhà hàng, cà phê', slug: 'restaurants_cafes', type: 'MAIN', parentId: null, iconNumber: '7', description: 'Restaurants & Cafes - Dịch vụ ăn uống', createdAt: new Date(), updatedAt: new Date() },
      { id: 'CAT003', name: 'Làm đẹp', slug: 'beauty', type: 'MAIN', parentId: null, iconNumber: '8', description: 'Beauty & Cosmetics - Mỹ phẩm và làm đẹp', createdAt: new Date(), updatedAt: new Date() },
      { id: 'P002', name: 'Mỹ phẩm', slug: 'cosmetics', type: 'PRODUCT', parentId: 'CAT003', iconNumber: null, description: 'Sản phẩm mỹ phẩm và làm đẹp', createdAt: new Date(), updatedAt: new Date() },
      { id: 'S005', name: 'Làm đẹp', slug: 'beauty_service', type: 'SERVICE', parentId: 'CAT003', iconNumber: '8', description: 'Spa và làm đẹp', createdAt: new Date(), updatedAt: new Date() },
    ];

    mockCategories.forEach(category => this.categories.set(category.id, category));
  }

  // User operations
  async createUser(userData: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      id,
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // KOC Profile operations
  async createKocProfile(profileData: InsertKocProfile): Promise<KocProfile> {
    const id = randomUUID();
    const profile: KocProfile = {
      id,
      ...profileData,
    };
    this.kocProfiles.set(id, profile);
    return profile;
  }

  async getKocProfileByUserId(userId: string): Promise<KocProfile | undefined> {
    return Array.from(this.kocProfiles.values()).find(profile => profile.userId === userId);
  }

  async updateKocProfile(userId: string, updates: Partial<KocProfile>): Promise<KocProfile | undefined> {
    const profile = Array.from(this.kocProfiles.values()).find(p => p.userId === userId);
    if (!profile) return undefined;
    
    const updatedProfile = { ...profile, ...updates };
    this.kocProfiles.set(profile.id, updatedProfile);
    return updatedProfile;
  }

  async deleteKocProfile(userId: string): Promise<void> {
    const profile = Array.from(this.kocProfiles.values()).find(p => p.userId === userId);
    if (profile) {
      this.kocProfiles.delete(profile.id);
    }
  }

  async getAllKocProfiles(): Promise<KocProfile[]> {
    return Array.from(this.kocProfiles.values());
  }

  async getAllKocProfilesEnriched(): Promise<any[]> {
    const profiles = Array.from(this.kocProfiles.values());
    const users = Array.from(this.users.values());
    
    const enrichedProfiles = profiles.map(profile => {
      const user = users.find(u => u.id === profile.userId);
      if (!user) return null;
      
      return {
        id: profile.id,
        userId: user.id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        followers: profile.followers,
        categories: profile.categories,
        location: profile.location,
        rating: profile.rating,
        completedCampaigns: profile.completedCampaigns,
        totalPoints: profile.totalPoints,
        level: profile.level,
        isVerified: profile.isVerified
      };
    }).filter(Boolean);

    return enrichedProfiles;
  }

  async getKocRankings(period?: string, category?: string): Promise<any[]> {
    const profiles = Array.from(this.kocProfiles.values());
    const users = Array.from(this.users.values());
    
    // Create enriched ranking data by joining profiles with user data
    let rankings = profiles.map(profile => {
      const user = users.find(u => u.id === profile.userId);
      if (!user) return null;
      
      const followers = profile.followers as any;
      const totalFollowers = followers ? 
        (followers.facebook || 0) + (followers.instagram || 0) + 
        (followers.tiktok || 0) + (followers.youtube || 0) : 0;
      
      const engagementRate = Math.random() * 10 + 2; // Mock engagement rate 2-12%
      const monthlyRevenue = profile.totalPoints * 100 + Math.random() * 50000;
      
      return {
        id: profile.id,
        userId: user.id,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        level: profile.level,
        rating: parseFloat(profile.rating || "0"),
        completedCampaigns: profile.completedCampaigns,
        totalPoints: profile.totalPoints,
        totalFollowers,
        followers: profile.followers,
        categories: profile.categories,
        location: profile.location,
        isVerified: profile.isVerified,
        engagementRate: Math.round(engagementRate * 100) / 100,
        monthlyRevenue: Math.round(monthlyRevenue),
        growthRate: (Math.random() * 30 - 5), // -5% to +25% growth
        influence: totalFollowers * engagementRate * (profile.completedCampaigns || 1) / 1000
      };
    }).filter(Boolean);

    // Filter by category if specified
    if (category && category !== 'all') {
      rankings = rankings.filter(ranking => 
        ranking.categories && ranking.categories.includes(category)
      );
    }

    // Sort by different criteria based on period (default: influence score)
    rankings.sort((a, b) => {
      switch (period) {
        case 'points':
          return b.totalPoints - a.totalPoints;
        case 'campaigns':
          return b.completedCampaigns - a.completedCampaigns;  
        case 'engagement':
          return b.engagementRate - a.engagementRate;
        case 'followers':
          return b.totalFollowers - a.totalFollowers;
        case 'revenue':
          return b.monthlyRevenue - a.monthlyRevenue;
        default:
          return b.influence - a.influence; // Default influence-based ranking
      }
    });

    return rankings;
  }

  // Brand operations
  async createBrand(brandData: InsertBrand): Promise<Brand> {
    const id = randomUUID();
    const brand: Brand = {
      id,
      ...brandData,
      createdAt: new Date(),
    };
    this.brands.set(id, brand);
    return brand;
  }

  async getAllBrands(): Promise<Brand[]> {
    return Array.from(this.brands.values());
  }

  async getBrandById(id: string): Promise<Brand | undefined> {
    return this.brands.get(id);
  }

  async updateBrand(id: string, updates: Partial<InsertBrand>): Promise<Brand | undefined> {
    const brand = this.brands.get(id);
    if (!brand) return undefined;
    
    const updatedBrand = { ...brand, ...updates };
    this.brands.set(id, updatedBrand);
    return updatedBrand;
  }

  async deleteBrand(id: string): Promise<boolean> {
    return this.brands.delete(id);
  }

  // Campaign operations
  async createCampaign(campaignData: InsertCampaign): Promise<Campaign> {
    const id = randomUUID();
    const campaign: Campaign = {
      id,
      ...campaignData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async getAllCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values());
  }

  async getCampaignById(id: string): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async getCampaignsByBrandId(brandId: string): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).filter(campaign => campaign.brandId === brandId);
  }

  async updateCampaign(id: string, updates: Partial<Campaign>): Promise<Campaign | undefined> {
    const campaign = this.campaigns.get(id);
    if (!campaign) return undefined;
    
    const updatedCampaign = { 
      ...campaign, 
      ...updates, 
      updatedAt: new Date() 
    };
    this.campaigns.set(id, updatedCampaign);
    return updatedCampaign;
  }

  // Application operations
  async createApplication(applicationData: InsertApplication): Promise<Application> {
    const id = randomUUID();
    const application: Application = {
      id,
      ...applicationData,
      appliedAt: new Date(),
    };
    this.applications.set(id, application);
    return application;
  }

  async getApplicationsByKocId(kocId: string): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(app => app.kocId === kocId);
  }

  async getApplicationsByCampaignId(campaignId: string): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(app => app.campaignId === campaignId);
  }

  async updateApplicationStatus(id: string, status: string): Promise<Application | undefined> {
    const application = this.applications.get(id);
    if (!application) return undefined;
    
    const updatedApplication = { ...application, status };
    this.applications.set(id, updatedApplication);
    return updatedApplication;
  }

  // Notification operations
  async createNotification(notificationData: InsertNotification): Promise<Notification> {
    const id = randomUUID();
    const notification: Notification = {
      id,
      ...notificationData,
      createdAt: new Date(),
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async getAllNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values());
  }

  async markNotificationRead(id: string): Promise<void> {
    const notification = this.notifications.get(id);
    if (notification) {
      this.notifications.set(id, { ...notification, isRead: true });
    }
  }

  // Category operations
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(categoryData: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = {
      id,
      ...categoryData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: string, updates: Partial<InsertCategory>): Promise<Category | undefined> {
    const category = this.categories.get(id);
    if (!category) return undefined;
    const updatedCategory = { ...category, ...updates, updatedAt: new Date() };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<boolean> {
    return this.categories.delete(id);
  }
}

export const storage = new MemStorage();
