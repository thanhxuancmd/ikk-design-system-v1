// Sample Campaign Data for Apple HIG Pattern 6
// Author: AIK
// Date: 14/10/2025

export interface Campaign {
  id: string;
  code: string;
  title: string;
  description: string;
  brand: {
    id: string;
    name: string;
    logo: string;
  };
  status: 'recruiting' | 'draft' | 'completed' | 'paused';
  progress: number; // 0-100
  kocJoined: number;
  kocNeeded: number;
  budget: number;
  spent: number;
  platform: 'tiktok' | 'facebook' | 'instagram' | 'youtube';
  category: string;
  startDate: Date;
  endDate: Date;
  performance: {
    views: number;
    engagement: number;
    engagementRate: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const sampleCampaigns: Campaign[] = [
  {
    id: 'CPG-001',
    code: 'CPG-001',
    title: 'Review Son Môi Maybelline SuperStay Matte Ink',
    description: 'Chiến dịch review son lì Maybelline cho KOC beauty',
    brand: {
      id: 'brand-1',
      name: 'Maybelline New York',
      logo: '💄'
    },
    status: 'recruiting',
    progress: 75,
    kocJoined: 89,
    kocNeeded: 100,
    budget: 85000000,
    spent: 63000000,
    platform: 'tiktok',
    category: 'Beauty & Cosmetics',
    startDate: new Date('2025-01-15'),
    endDate: new Date('2025-02-28'),
    performance: {
      views: 245000,
      engagement: 18500,
      engagementRate: 4.2
    },
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-20')
  },
  {
    id: 'CPG-002',
    code: 'CPG-002',
    title: 'Unboxing Kem Nền Loreal Paris Infallible',
    description: 'Chiến dịch unboxing kem nền Loreal cho KOC makeup',
    brand: {
      id: 'brand-2',
      name: "L'Oréal Paris",
      logo: '🎨'
    },
    status: 'recruiting',
    progress: 60,
    kocJoined: 45,
    kocNeeded: 80,
    budget: 64000000,
    spent: 38400000,
    platform: 'instagram',
    category: 'Beauty & Cosmetics',
    startDate: new Date('2025-01-20'),
    endDate: new Date('2025-03-15'),
    performance: {
      views: 189000,
      engagement: 14200,
      engagementRate: 3.8
    },
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-22')
  },
  {
    id: 'CPG-003',
    code: 'CPG-003',
    title: 'Tutorial Trang Điểm Với NARS Cosmetics',
    description: 'Chiến dịch tutorial makeup với sản phẩm NARS',
    brand: {
      id: 'brand-3',
      name: 'NARS Cosmetics',
      logo: '✨'
    },
    status: 'completed',
    progress: 100,
    kocJoined: 50,
    kocNeeded: 50,
    budget: 50000000,
    spent: 50000000,
    platform: 'youtube',
    category: 'Beauty & Cosmetics',
    startDate: new Date('2024-12-01'),
    endDate: new Date('2025-01-15'),
    performance: {
      views: 456000,
      engagement: 32400,
      engagementRate: 5.1
    },
    createdAt: new Date('2024-11-15'),
    updatedAt: new Date('2025-01-16')
  },
  {
    id: 'CPG-004',
    code: 'CPG-004',
    title: 'Review Sữa Rửa Mặt Innisfree Green Tea',
    description: 'Chiến dịch review sữa rửa mặt Innisfree',
    brand: {
      id: 'brand-4',
      name: 'Innisfree',
      logo: '🌿'
    },
    status: 'recruiting',
    progress: 85,
    kocJoined: 68,
    kocNeeded: 80,
    budget: 72000000,
    spent: 61200000,
    platform: 'tiktok',
    category: 'Skincare',
    startDate: new Date('2025-01-10'),
    endDate: new Date('2025-02-20'),
    performance: {
      views: 312000,
      engagement: 24800,
      engagementRate: 4.5
    },
    createdAt: new Date('2024-12-28'),
    updatedAt: new Date('2025-01-21')
  },
  {
    id: 'CPG-005',
    code: 'CPG-005',
    title: 'Unboxing Nước Hoa Chanel No.5',
    description: 'Chiến dịch unboxing nước hoa cao cấp Chanel',
    brand: {
      id: 'brand-5',
      name: 'Chanel',
      logo: '🌸'
    },
    status: 'draft',
    progress: 0,
    kocJoined: 0,
    kocNeeded: 30,
    budget: 120000000,
    spent: 0,
    platform: 'instagram',
    category: 'Fragrance',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-03-30'),
    performance: {
      views: 0,
      engagement: 0,
      engagementRate: 0
    },
    createdAt: new Date('2025-01-18'),
    updatedAt: new Date('2025-01-18')
  },
  {
    id: 'CPG-006',
    code: 'CPG-006',
    title: 'Review Giày Thể Thao Nike Air Max',
    description: 'Chiến dịch review giày thể thao Nike cho KOC fashion',
    brand: {
      id: 'brand-6',
      name: 'Nike',
      logo: '👟'
    },
    status: 'recruiting',
    progress: 55,
    kocJoined: 33,
    kocNeeded: 60,
    budget: 96000000,
    spent: 52800000,
    platform: 'facebook',
    category: 'Fashion & Footwear',
    startDate: new Date('2025-01-12'),
    endDate: new Date('2025-03-01'),
    performance: {
      views: 178000,
      engagement: 12400,
      engagementRate: 3.5
    },
    createdAt: new Date('2025-01-02'),
    updatedAt: new Date('2025-01-19')
  },
  {
    id: 'CPG-007',
    code: 'CPG-007',
    title: 'Tutorial Phối Đồ Với Zara',
    description: 'Chiến dịch tutorial phối đồ với trang phục Zara',
    brand: {
      id: 'brand-7',
      name: 'Zara',
      logo: '👗'
    },
    status: 'paused',
    progress: 40,
    kocJoined: 24,
    kocNeeded: 60,
    budget: 72000000,
    spent: 28800000,
    platform: 'instagram',
    category: 'Fashion & Apparel',
    startDate: new Date('2025-01-08'),
    endDate: new Date('2025-02-28'),
    performance: {
      views: 145000,
      engagement: 9800,
      engagementRate: 3.2
    },
    createdAt: new Date('2024-12-25'),
    updatedAt: new Date('2025-01-15')
  },
  {
    id: 'CPG-008',
    code: 'CPG-008',
    title: 'Review Laptop Dell XPS 13',
    description: 'Chiến dịch review laptop Dell cho KOC tech',
    brand: {
      id: 'brand-8',
      name: 'Dell',
      logo: '💻'
    },
    status: 'recruiting',
    progress: 70,
    kocJoined: 21,
    kocNeeded: 30,
    budget: 150000000,
    spent: 105000000,
    platform: 'youtube',
    category: 'Technology',
    startDate: new Date('2025-01-18'),
    endDate: new Date('2025-03-10'),
    performance: {
      views: 289000,
      engagement: 21500,
      engagementRate: 4.8
    },
    createdAt: new Date('2025-01-08'),
    updatedAt: new Date('2025-01-23')
  },
  {
    id: 'CPG-009',
    code: 'CPG-009',
    title: 'Unboxing iPhone 15 Pro Max',
    description: 'Chiến dịch unboxing iPhone mới nhất',
    brand: {
      id: 'brand-9',
      name: 'Apple',
      logo: '📱'
    },
    status: 'completed',
    progress: 100,
    kocJoined: 40,
    kocNeeded: 40,
    budget: 200000000,
    spent: 200000000,
    platform: 'tiktok',
    category: 'Technology',
    startDate: new Date('2024-12-15'),
    endDate: new Date('2025-01-20'),
    performance: {
      views: 567000,
      engagement: 45300,
      engagementRate: 5.4
    },
    createdAt: new Date('2024-12-01'),
    updatedAt: new Date('2025-01-21')
  },
  {
    id: 'CPG-010',
    code: 'CPG-010',
    title: 'Review Tai Nghe Sony WH-1000XM5',
    description: 'Chiến dịch review tai nghe chống ồn Sony',
    brand: {
      id: 'brand-10',
      name: 'Sony',
      logo: '🎧'
    },
    status: 'recruiting',
    progress: 65,
    kocJoined: 26,
    kocNeeded: 40,
    budget: 80000000,
    spent: 52000000,
    platform: 'youtube',
    category: 'Technology',
    startDate: new Date('2025-01-14'),
    endDate: new Date('2025-02-25'),
    performance: {
      views: 198000,
      engagement: 15800,
      engagementRate: 4.0
    },
    createdAt: new Date('2025-01-04'),
    updatedAt: new Date('2025-01-20')
  },
  {
    id: 'CPG-011',
    code: 'CPG-011',
    title: 'Tutorial Chụp Ảnh Với Canon EOS R6',
    description: 'Chiến dịch tutorial nhiếp ảnh với Canon',
    brand: {
      id: 'brand-11',
      name: 'Canon',
      logo: '📷'
    },
    status: 'draft',
    progress: 0,
    kocJoined: 0,
    kocNeeded: 25,
    budget: 125000000,
    spent: 0,
    platform: 'youtube',
    category: 'Technology',
    startDate: new Date('2025-02-05'),
    endDate: new Date('2025-03-20'),
    performance: {
      views: 0,
      engagement: 0,
      engagementRate: 0
    },
    createdAt: new Date('2025-01-22'),
    updatedAt: new Date('2025-01-22')
  },
  {
    id: 'CPG-012',
    code: 'CPG-012',
    title: 'Review Đồng Hồ Thông Minh Samsung Galaxy Watch',
    description: 'Chiến dịch review smartwatch Samsung',
    brand: {
      id: 'brand-12',
      name: 'Samsung',
      logo: '⌚'
    },
    status: 'paused',
    progress: 30,
    kocJoined: 18,
    kocNeeded: 60,
    budget: 90000000,
    spent: 27000000,
    platform: 'tiktok',
    category: 'Technology',
    startDate: new Date('2025-01-05'),
    endDate: new Date('2025-02-15'),
    performance: {
      views: 134000,
      engagement: 8900,
      engagementRate: 3.1
    },
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2025-01-12')
  }
];

// Helper functions
export const getCampaignsByStatus = (status: Campaign['status']) => {
  return sampleCampaigns.filter(c => c.status === status);
};

export const getCampaignsByPlatform = (platform: Campaign['platform']) => {
  return sampleCampaigns.filter(c => c.platform === platform);
};

export const getCampaignsByCategory = (category: string) => {
  return sampleCampaigns.filter(c => c.category === category);
};

export const getCampaignStats = () => {
  return {
    total: sampleCampaigns.length,
    recruiting: getCampaignsByStatus('recruiting').length,
    draft: getCampaignsByStatus('draft').length,
    completed: getCampaignsByStatus('completed').length,
    paused: getCampaignsByStatus('paused').length,
    totalKOC: sampleCampaigns.reduce((sum, c) => sum + c.kocJoined, 0),
    totalBudget: sampleCampaigns.reduce((sum, c) => sum + c.budget, 0),
    totalSpent: sampleCampaigns.reduce((sum, c) => sum + c.spent, 0)
  };
};

