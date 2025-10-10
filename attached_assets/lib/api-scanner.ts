export interface APIEndpoint {
  method: string
  path: string
  description: string
  parameters: Array<{
    name: string
    type: string
    required: boolean
    description: string
  }>
  response: string
  example: string
}

export interface APICategory {
  category: string
  icon: any
  endpoints: APIEndpoint[]
}

// Real API endpoints discovered from codebase
export const realApiEndpoints: APICategory[] = [
  {
    category: "Authentication",
    icon: "Shield",
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/signout",
        description: "Đăng xuất người dùng và xóa session cookie",
        parameters: [],
        response: "Redirect to login page",
        example: `// Response: Redirect to /auth/login`,
      },
      {
        method: "POST",
        path: "/api/auth/test-login",
        description: "Test đăng nhập với credentials cơ bản",
        parameters: [
          { name: "email", type: "string", required: true, description: "Email đăng nhập" },
          { name: "password", type: "string", required: true, description: "Mật khẩu" },
        ],
        response: "User object với thông tin đăng nhập",
        example: `{
  "success": true,
  "message": "Admin credentials are correct", 
  "user": { "email": "admin", "role": "admin" }
}`,
      },
      {
        method: "POST",
        path: "/api/auth/simple-test",
        description: "Test authentication với hardcoded credentials",
        parameters: [
          { name: "email", type: "string", required: true, description: "Email (admin/user)" },
          { name: "password", type: "string", required: true, description: "Password (admin/user)" },
        ],
        response: "Detailed user object với database status",
        example: `{
  "success": true,
  "user": {
    "email": "admin",
    "role": "admin",
    "status": "active"
  }
}`,
      },
    ],
  },
  {
    category: "Admin Management",
    icon: "Users",
    endpoints: [
      {
        method: "GET",
        path: "/api/check-admin",
        description: "Kiểm tra admin user và database schema - ACTIVE ENDPOINT",
        parameters: [],
        response: "Admin user info và database status",
        example: `{
  "hasPasswordColumn": true,
  "totalUsers": 5,
  "adminUser": { "id": 1, "email": "admin" },
  "hasAdmin": true
}`,
      },
      {
        method: "POST",
        path: "/api/create-admin",
        description: "Tạo admin user mới trong database - ACTIVE ENDPOINT",
        parameters: [
          { name: "email", type: "string", required: true, description: "Email admin" },
          { name: "password", type: "string", required: true, description: "Password admin" },
        ],
        response: "Admin user được tạo",
        example: `{
  "success": true,
  "user": { "id": 1, "email": "admin", "role": "admin" },
  "message": "Admin user created successfully"
}`,
      },
    ],
  },
  {
    category: "Brands Management - LIVE DATA",
    icon: "Database",
    endpoints: [
      {
        method: "GET",
        path: "/api/brands",
        description: "Lấy danh sách thương hiệu - CONNECTED TO NEON DB",
        parameters: [
          { name: "page", type: "number", required: false, description: "Số trang (default: 1)" },
          { name: "limit", type: "number", required: false, description: "Số items per page (default: 10)" },
          { name: "status", type: "string", required: false, description: "Filter theo status" },
          { name: "category", type: "string", required: false, description: "Filter theo category" },
          { name: "search", type: "string", required: false, description: "Tìm kiếm theo tên/mô tả" },
        ],
        response: "Danh sách brands từ Neon database hoặc mock data",
        example: `{
  "brands": [
    {
      "id": 1,
      "name": "Maybelline Vietnam",
      "category": "Mỹ phẩm", 
      "status": "active",
      "monthly_budget": 50000000,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 10,
  "database_status": "mock_data_fallback"
}`,
      },
      {
        method: "POST",
        path: "/api/brands",
        description: "Tạo thương hiệu mới - FULL CRUD SUPPORT",
        parameters: [
          { name: "name", type: "string", required: true, description: "Tên thương hiệu" },
          { name: "slug", type: "string", required: true, description: "URL slug" },
          { name: "description", type: "string", required: false, description: "Mô tả" },
          { name: "industry", type: "string", required: false, description: "Ngành nghề" },
          { name: "category", type: "string", required: false, description: "Danh mục" },
          { name: "monthly_budget", type: "number", required: false, description: "Ngân sách hàng tháng" },
        ],
        response: "Brand object được tạo",
        example: `{
  "brand": {
    "id": 6,
    "name": "New Brand",
    "slug": "new-brand", 
    "status": "active",
    "created_at": "2024-01-15T10:30:00Z"
  }
}`,
      },
      {
        method: "GET",
        path: "/api/brands/[id]",
        description: "Lấy thông tin chi tiết một thương hiệu",
        parameters: [{ name: "id", type: "string", required: true, description: "Brand ID" }],
        response: "Brand object chi tiết",
        example: `{
  "brand": {
    "id": 1,
    "name": "Maybelline Vietnam",
    "description": "Thương hiệu mỹ phẩm hàng đầu",
    "monthly_budget": 50000000,
    "campaigns_count": 12
  }
}`,
      },
      {
        method: "PUT",
        path: "/api/brands/[id]",
        description: "Cập nhật thông tin thương hiệu - FULL CRUD",
        parameters: [
          { name: "id", type: "string", required: true, description: "Brand ID" },
          { name: "name", type: "string", required: false, description: "Tên thương hiệu" },
          { name: "description", type: "string", required: false, description: "Mô tả" },
          { name: "status", type: "string", required: false, description: "Trạng thái" },
        ],
        response: "Brand object đã cập nhật",
        example: `{
  "brand": {
    "id": 1,
    "name": "Updated Brand Name",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}`,
      },
      {
        method: "DELETE",
        path: "/api/brands/[id]",
        description: "Xóa thương hiệu - FULL CRUD",
        parameters: [{ name: "id", type: "string", required: true, description: "Brand ID" }],
        response: "Confirmation message",
        example: `{
  "message": "Brand deleted successfully",
  "deleted_id": 1
}`,
      },
    ],
  },
  {
    category: "Categories Management - LIVE DATA",
    icon: "Key",
    endpoints: [
      {
        method: "GET",
        path: "/api/categories",
        description: "Lấy danh sách tất cả danh mục - CONNECTED TO NEON DB",
        parameters: [],
        response: "Danh sách categories từ database",
        example: `{
  "categories": [
    {
      "id": 1,
      "name": "Nhà hàng, cà phê",
      "type": "service",
      "status": "active",
      "sort_order": 1,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 26,
  "database_status": "connected"
}`,
      },
      {
        method: "POST",
        path: "/api/categories",
        description: "Tạo danh mục mới - FULL CRUD SUPPORT",
        parameters: [
          { name: "name", type: "string", required: true, description: "Tên danh mục" },
          { name: "type", type: "string", required: true, description: "Loại (service/product)" },
          { name: "description", type: "string", required: false, description: "Mô tả" },
        ],
        response: "Category object được tạo",
        example: `{
  "category": {
    "id": 27,
    "name": "New Category",
    "type": "service",
    "status": "active",
    "created_at": "2024-01-15T10:30:00Z"
  }
}`,
      },
      {
        method: "PUT",
        path: "/api/categories/[id]",
        description: "Cập nhật danh mục - FULL CRUD",
        parameters: [
          { name: "id", type: "string", required: true, description: "Category ID" },
          { name: "name", type: "string", required: false, description: "Tên danh mục" },
          { name: "type", type: "string", required: false, description: "Loại danh mục" },
          { name: "status", type: "string", required: false, description: "Trạng thái" },
        ],
        response: "Category object đã cập nhật",
        example: `{
  "category": {
    "id": 1,
    "name": "Updated Category",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}`,
      },
      {
        method: "DELETE",
        path: "/api/categories/[id]",
        description: "Xóa danh mục - FULL CRUD",
        parameters: [{ name: "id", type: "string", required: true, description: "Category ID" }],
        response: "Confirmation message",
        example: `{
  "message": "Category deleted successfully",
  "deleted_id": 1
}`,
      },
    ],
  },
  {
    category: "Campaigns Management - LIVE DATA",
    icon: "Server",
    endpoints: [
      {
        method: "GET",
        path: "/api/campaigns",
        description: "Lấy danh sách chiến dịch KOC - CONNECTED TO NEON DB",
        parameters: [],
        response: "Danh sách campaigns với thông tin chi tiết từ database",
        example: `[
  {
    "id": 1,
    "name": "SHILLA - Tặng 300.000đ khi post ảnh có sẵn",
    "brand": "SHILLA DUTY FREE",
    "category": "Du lịch",
    "locations": ["Ha Noi", "Ho Chi Minh"],
    "reward_amount": 300000,
    "applied_kocs": 244,
    "target_kocs": 10,
    "status": "ended",
    "hashtags": ["#myphamhanquoc", "#dulichhanquoc"],
    "created_at": "2024-01-15T10:30:00Z"
  }
]`,
      },
      {
        method: "POST",
        path: "/api/campaigns",
        description: "Tạo chiến dịch KOC mới - FULL CRUD SUPPORT",
        parameters: [
          { name: "name", type: "string", required: true, description: "Tên chiến dịch" },
          { name: "brand", type: "string", required: true, description: "Thương hiệu" },
          { name: "category", type: "string", required: true, description: "Danh mục" },
          { name: "locations", type: "array", required: false, description: "Danh sách địa điểm" },
          { name: "reward_amount", type: "number", required: false, description: "Giá trị phần thưởng (VND)" },
          { name: "target_kocs", type: "number", required: false, description: "Số KOC target" },
          { name: "hashtags", type: "array", required: false, description: "Danh sách hashtags" },
        ],
        response: "Campaign object được tạo",
        example: `{
  "id": 3,
  "name": "New Campaign",
  "brand": "Brand Name",
  "status": "recruiting",
  "reward_amount": 500000,
  "created_at": "2024-01-15T10:30:00Z"
}`,
      },
    ],
  },
]

// Calculate real stats from endpoints
export const getRealAPIStats = () => {
  const totalEndpoints = realApiEndpoints.reduce((sum, category) => sum + category.endpoints.length, 0)
  const authEndpoints = realApiEndpoints.find((cat) => cat.category === "Authentication")?.endpoints.length || 0
  const crudEndpoints = realApiEndpoints.reduce((sum, category) => {
    return (
      sum +
      category.endpoints.filter((ep) => ep.method === "POST" || ep.method === "PUT" || ep.method === "DELETE").length
    )
  }, 0)

  return {
    totalEndpoints,
    authEndpoints,
    crudEndpoints,
    categories: realApiEndpoints.length,
  }
}
