import { useState } from 'react';
import { Link } from 'wouter';
import { 
  HiRectangleGroup,
  HiTableCells,
  HiMagnifyingGlass,
  HiAdjustmentsHorizontal,
  HiChevronUpDown,
  HiChevronLeft,
  HiChevronRight,
  HiEllipsisHorizontal,
  HiPencilSquare,
  HiTrash,
  HiEye,
  HiPlus,
  HiXMark,
  HiCheck,
  HiExclamationTriangle,
  HiInformationCircle,
  HiCheckCircle,
  HiClipboardDocumentList,
  HiCog6Tooth,
  HiUsers,
  HiBell,
  HiArrowTrendingUp,
  HiArrowTrendingDown,
  HiMinus,
  HiShieldCheck,
  HiClock,
  HiBuildingOffice2,
  HiCreditCard,
  HiGlobeAlt,
  HiChartBarSquare,
  HiUserGroup,
  HiCurrencyDollar,
  HiCalendarDays,
  HiArrowUpRight,
  HiArrowDownRight,
  HiBars3,
  HiHome,
  HiChatBubbleLeftRight,
  HiDocumentText,
  HiQueueList,
  HiArrowsRightLeft
} from 'react-icons/hi2';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LayoutDashboard, Target, Wrench, BarChart3, CreditCard, HelpCircle, FileText, Gift, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for tables and components
const adminUsers = [
  { id: 1, name: "Nguyễn Văn Admin", email: "admin1@ikk.com", role: "Super Admin", status: "active", lastLogin: "2024-01-15 10:30" },
  { id: 2, name: "Trần Thị Manager", email: "manager1@ikk.com", role: "Manager", status: "active", lastLogin: "2024-01-14 15:45" },
  { id: 3, name: "Lê Văn Support", email: "support1@ikk.com", role: "Support", status: "inactive", lastLogin: "2024-01-10 09:15" },
  { id: 4, name: "Phạm Thị Content", email: "content1@ikk.com", role: "Content Moderator", status: "active", lastLogin: "2024-01-15 08:20" },
];

const campaignData = [
  { id: 1, name: "Chiến dịch Summer Sale", brand: "Fashion Brand", budget: "50,000,000", spent: "32,500,000", status: "active", roi: "+125%" },
  { id: 2, name: "Beauty Product Launch", brand: "Beauty Co", budget: "30,000,000", spent: "28,900,000", status: "completed", roi: "+89%" },
  { id: 3, name: "Tech Gadget Review", brand: "Tech Store", budget: "20,000,000", spent: "15,200,000", status: "paused", roi: "+156%" },
  { id: 4, name: "Food Delivery Promo", brand: "Food App", budget: "40,000,000", spent: "8,500,000", status: "active", roi: "+234%" },
];

// Chart data
const analyticsData = [
  { month: 'Jan', users: 2400, revenue: 1200, campaigns: 24 },
  { month: 'Feb', users: 1398, revenue: 2100, campaigns: 18 },
  { month: 'Mar', users: 9800, revenue: 1800, campaigns: 32 },
  { month: 'Apr', users: 3908, revenue: 2780, campaigns: 28 },
  { month: 'May', users: 4800, revenue: 1890, campaigns: 45 },
  { month: 'Jun', users: 3800, revenue: 2390, campaigns: 38 },
];

const revenueData = [
  { day: 'Mon', amount: 1200 },
  { day: 'Tue', amount: 1900 },
  { day: 'Wed', amount: 800 },
  { day: 'Thu', amount: 2200 },
  { day: 'Fri', amount: 2800 },
  { day: 'Sat', amount: 2400 },
  { day: 'Sun', amount: 1800 },
];

const sparklineData = [
  { value: 10 }, { value: 15 }, { value: 8 }, { value: 22 }, { value: 18 }, { value: 25 }, { value: 30 }, { value: 28 }, { value: 35 }, { value: 32 }
];

const pieData = [
  { name: 'Active', value: 60, color: '#10b981' },
  { name: 'Pending', value: 25, color: '#f59e0b' },
  { name: 'Completed', value: 15, color: '#3b82f6' }
];

// Navigation Sample Component based on dashboard sidebar
const NavigationSample = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedItems, setExpandedItems] = useState<string[]>(['campaigns']);

  const menuItems = [
    {
      id: 'dashboard',
      title: "Tổng quan",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: 'campaigns',
      title: "Chiến dịch",
      href: "/dashboard/campaigns",
      icon: Target,
      submenu: [
        { title: "Tất cả chiến dịch", href: "/dashboard/campaigns", slug: "all" },
        { title: "Chiến dịch đã tham gia", href: "/dashboard/campaigns/joined", slug: "joined" },
        { title: "Săn thưởng chiến dịch", href: "/dashboard/campaigns/rewards", slug: "rewards" },
      ],
    },
    {
      id: 'reports',
      title: "Báo cáo",
      href: "/dashboard/reports",
      icon: BarChart3,
      submenu: [
        { title: "Báo cáo đơn hàng", href: "/dashboard/reports/orders", slug: "orders" },
        { title: "Lưu lượng truy cập", href: "/dashboard/reports/traffic", slug: "traffic" },
        { title: "Báo cáo chiến dịch", href: "/dashboard/reports/campaigns", slug: "campaigns" },
        { title: "Báo cáo UTM", href: "/dashboard/reports/utm", slug: "utm" },
      ],
    },
    {
      id: 'tools',
      title: "Công cụ",
      href: "/dashboard/tools",
      icon: Wrench,
      submenu: [
        { title: "Liên kết sản phẩm", href: "/dashboard/tools/product-link", slug: "product-link" },
        { title: "Liên kết sâu", href: "/dashboard/tools/deep-link", slug: "deep-link" },
        { title: "Chuyển đổi liên kết", href: "/dashboard/tools/convert-link", slug: "convert-link" },
        { title: "Nguồn sản phẩm", href: "/dashboard/tools/feeds", slug: "feeds" },
        { title: "Mã giảm giá & Ưu đãi", href: "/dashboard/tools/coupons", slug: "coupons" },
      ],
    },
    {
      id: 'payments',
      title: "Thanh toán",
      href: "/dashboard/payments",
      icon: CreditCard,
      submenu: [
        { title: "Doanh thu - Đối soát", href: "/dashboard/payments/revenue", slug: "revenue" },
        { title: "Thanh toán", href: "/dashboard/payments/schedule", slug: "schedule" },
        { title: "Tạm ứng", href: "/dashboard/payments/advance", slug: "advance" },
        { title: "Lịch sử nhận tiền", href: "/dashboard/payments/history", slug: "history" },
      ],
    },
    {
      id: 'help',
      title: "Trợ giúp",
      href: "/dashboard/help",
      icon: HelpCircle,
      submenu: [
        { title: "Hướng dẫn sử dụng", href: "/dashboard/help/guide", slug: "guide" },
        { title: "Câu hỏi thường gặp (FAQ)", href: "/dashboard/help/faq", slug: "faq" },
        { title: "Báo mất đơn hàng", href: "/dashboard/help/missing-order", slug: "missing-order" },
      ],
    },
    {
      id: 'events',
      title: "Sự kiện",
      href: "/dashboard/events",
      icon: Gift,
    },
    {
      id: 'violations',
      title: "Vi phạm",
      href: "/dashboard/violations",
      icon: FileText,
    },
  ];

  const handleItemClick = (itemId: string, hasSubmenu: boolean) => {
    setActiveItem(itemId);
    if (hasSubmenu) {
      setExpandedItems(prev => 
        prev.includes(itemId) 
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    }
  };

  const handleSubItemClick = (parentId: string, subItemHref: string) => {
    setActiveItem(`${parentId}-${subItemHref}`);
  };

  return (
    <div className="w-64 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden" data-testid="navigation-sample">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8" data-testid="nav-logo">
          <div className="w-8 h-8 bg-gradient-to-r from-[#ff0086] to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">I</span>
          </div>
          <div>
            <div className="font-bold text-gray-900">IKK Affiliate</div>
            <div className="text-xs text-gray-500">KOC Platform</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2" data-testid="nav-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isExpanded = expandedItems.includes(item.id);
            const hasSubmenu = item.submenu && item.submenu.length > 0;
            
            return (
              <div key={item.id}>
                <div
                  onClick={() => handleItemClick(item.id, !!hasSubmenu)}
                  className={cn(
                    "flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                    isActive 
                      ? "bg-pink-50 text-[#ff0086]" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  data-testid={`nav-item-${item.id}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    {item.title}
                  </div>
                  {hasSubmenu && (
                    <div className="ml-auto">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" data-testid={`nav-chevron-up-${item.id}`} />
                      ) : (
                        <ChevronDown className="w-4 h-4" data-testid={`nav-chevron-down-${item.id}`} />
                      )}
                    </div>
                  )}
                </div>
                
                {hasSubmenu && isExpanded && (
                  <div className="ml-6 mt-1 space-y-1" data-testid={`nav-submenu-${item.id}`}>
                    {item.submenu!.map((subItem, subIndex) => {
                      const subItemId = `${item.id}-${subItem.href}`;
                      const isSubActive = activeItem === subItemId;
                      const subItemSlug = subItem.slug || `item-${subIndex}`;
                      
                      return (
                        <div
                          key={subItemSlug}
                          onClick={() => handleSubItemClick(item.id, subItem.href)}
                          className={cn(
                            "block px-3 py-1 text-xs rounded-md transition-colors cursor-pointer",
                            isSubActive
                              ? "text-[#ff0086] bg-pink-50 font-medium"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          )}
                          data-testid={`nav-subitem-${item.id}-${subItemSlug}`}
                        >
                          {subItem.title}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default function AdminDesignSystem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort users
  const filteredUsers = adminUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField as keyof typeof a];
    const bValue = b[sortField as keyof typeof b];
    const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    return sortDirection === "asc" ? comparison : -comparison;
  });

  // Paginate users
  const totalPages = Math.ceil(sortedUsers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: string) => {
    setPageSize(parseInt(size));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  // Reset page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setFilterStatus(value);
    setCurrentPage(1);
  };

  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 border-green-200";
      case "inactive": return "bg-gray-100 text-gray-800 border-gray-200"; 
      case "completed": return "bg-blue-100 text-blue-800 border-blue-200";
      case "paused": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200" data-testid="admin-design-header">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/design-system" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <HiChevronLeft className="w-4 h-4" />
                <span className="text-sm">Back to Design System</span>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900" data-testid="page-title">Admin Design System</h1>
                <p className="text-sm text-gray-600">Comprehensive component showcase for admin interfaces</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" data-testid="button-docs">
                <HiDocumentText className="w-4 h-4 mr-2" />
                Documentation
              </Button>
              <Button size="sm" className="bg-[#ff0086] hover:bg-[#e6007a]" data-testid="button-export">
                <HiArrowUpRight className="w-4 h-4 mr-2" />
                Export Components
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <section className="mb-8" data-testid="section-stats">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Design System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Components</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="stat-components">47</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <HiRectangleGroup className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Admin Pages</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="stat-pages">12</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <HiTableCells className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Usage Rate</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="stat-usage">94%</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <HiArrowTrendingUp className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Consistency Score</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="stat-consistency">A+</p>
                  </div>
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <HiShieldCheck className="w-5 h-5 text-gray-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Charts & Analytics */}
        <section className="mb-8" data-testid="section-charts">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Charts & Analytics</h2>
          
          {/* KPI Trend Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Daily Revenue</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="kpi-revenue">₫24.8M</p>
                    <div className="flex items-center mt-1">
                      <HiArrowTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500 font-medium">+12.5%</span>
                    </div>
                  </div>
                  <div className="w-16 h-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sparklineData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#10b981" 
                          strokeWidth={2} 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="kpi-users">8,924</p>
                    <div className="flex items-center mt-1">
                      <HiArrowTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500 font-medium">+8.2%</span>
                    </div>
                  </div>
                  <div className="w-16 h-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sparklineData.map(d => ({ value: d.value + 5 }))}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3b82f6" 
                          strokeWidth={2} 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="kpi-conversion">3.4%</p>
                    <div className="flex items-center mt-1">
                      <HiArrowTrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-sm text-red-500 font-medium">-2.1%</span>
                    </div>
                  </div>
                  <div className="w-16 h-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sparklineData.map(d => ({ value: d.value - 3 }))}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#ef4444" 
                          strokeWidth={2} 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Campaign ROI</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="kpi-roi">245%</p>
                    <div className="flex items-center mt-1">
                      <HiArrowTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-500 font-medium">+18.7%</span>
                    </div>
                  </div>
                  <div className="w-16 h-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={sparklineData.map(d => ({ value: d.value + 10 }))}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#8b5cf6" 
                          strokeWidth={2} 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Area Chart */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">User Growth Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#ff0086" 
                        fill="#ff0086" 
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Weekly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="amount" 
                        fill="#3b82f6" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Multi-line Chart */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#fff', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="campaigns" 
                        stroke="#f59e0b" 
                        strokeWidth={3}
                        dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Campaign Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center">
                  <div className="w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 space-y-3">
                    {pieData.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <div className="text-sm">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 ml-2">{item.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Navigation Showcase */}
        <section className="mb-8" data-testid="section-navigation">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation Elements</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Breadcrumbs */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Breadcrumbs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <nav className="flex" data-testid="breadcrumb-admin">
                  <ol className="flex items-center space-x-2 text-sm">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Admin</a></li>
                    <HiChevronRight className="w-4 h-4 text-gray-400" />
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Users</a></li>
                    <HiChevronRight className="w-4 h-4 text-gray-400" />
                    <li className="text-gray-500">User Profile</li>
                  </ol>
                </nav>
                <nav className="flex" data-testid="breadcrumb-campaigns">
                  <ol className="flex items-center space-x-2 text-sm">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Dashboard</a></li>
                    <HiChevronRight className="w-4 h-4 text-gray-400" />
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Campaigns</a></li>
                    <HiChevronRight className="w-4 h-4 text-gray-400" />
                    <li className="text-gray-500">Analytics</li>
                  </ol>
                </nav>
              </CardContent>
            </Card>

            {/* Tab Navigation */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Tab Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview" className="w-full" data-testid="tabs-admin">
                  <TabsList className="grid w-full grid-cols-4 bg-gray-100">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-[#ff0086]">Overview</TabsTrigger>
                    <TabsTrigger value="users" className="data-[state=active]:bg-white data-[state=active]:text-[#ff0086]">Users</TabsTrigger>
                    <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:text-[#ff0086]">Settings</TabsTrigger>
                    <TabsTrigger value="logs" className="data-[state=active]:bg-white data-[state=active]:text-[#ff0086]">Logs</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-4">
                    <p className="text-sm text-gray-600">Overview content with admin metrics and summaries.</p>
                  </TabsContent>
                  <TabsContent value="users" className="mt-4">
                    <p className="text-sm text-gray-600">User management and administration tools.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Components */}
        <section className="mb-8" data-testid="section-forms">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Form Components</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Input Fields */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Input Fields</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="admin-email">Email Address</Label>
                  <Input 
                    id="admin-email" 
                    type="email" 
                    placeholder="admin@ikk.com" 
                    className="mt-1"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Label htmlFor="admin-search">Search with Icon</Label>
                  <div className="relative mt-1">
                    <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      id="admin-search"
                      placeholder="Search users, campaigns..." 
                      className="pl-10"
                      data-testid="input-search"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="admin-description">Description</Label>
                  <Textarea 
                    id="admin-description"
                    placeholder="Enter detailed description..."
                    className="mt-1 min-h-[80px]"
                    data-testid="textarea-description"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Select and Controls */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Select & Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="admin-role">User Role</Label>
                  <Select data-testid="select-role">
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select user role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super-admin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="admin-active" data-testid="checkbox-active" />
                  <Label htmlFor="admin-active" className="text-sm">User is active</Label>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="admin-notifications" className="text-sm">Email Notifications</Label>
                  <Switch id="admin-notifications" data-testid="switch-notifications" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="admin-two-factor" className="text-sm">Two-Factor Authentication</Label>
                  <Switch id="admin-two-factor" defaultChecked data-testid="switch-2fa" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Buttons & Actions */}
        <section className="mb-8" data-testid="section-buttons">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Buttons & Actions</h2>
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Primary Actions */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Primary Actions</h3>
                  <div className="space-y-2">
                    <Button className="w-full bg-[#ff0086] hover:bg-[#e6007a]" data-testid="button-create">
                      <HiPlus className="w-4 h-4 mr-2" />
                      Create New
                    </Button>
                    <Button className="w-full bg-[#ff0086] hover:bg-[#e6007a]" data-testid="button-save">
                      <HiCheck className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" data-testid="button-publish">
                      <HiArrowUpRight className="w-4 h-4 mr-2" />
                      Publish
                    </Button>
                  </div>
                </div>

                {/* Secondary Actions */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Secondary Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full" data-testid="button-edit">
                      <HiPencilSquare className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" className="w-full" data-testid="button-view">
                      <HiEye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" className="w-full" data-testid="button-duplicate">
                      <HiClipboardDocumentList className="w-4 h-4 mr-2" />
                      Duplicate
                    </Button>
                  </div>
                </div>

                {/* Danger Actions */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Danger Actions</h3>
                  <div className="space-y-2">
                    <Button variant="destructive" className="w-full" data-testid="button-delete">
                      <HiTrash className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                    <Button variant="outline" className="w-full text-orange-600 border-orange-300 hover:bg-orange-50" data-testid="button-suspend">
                      <HiMinus className="w-4 h-4 mr-2" />
                      Suspend
                    </Button>
                    <Button variant="outline" className="w-full text-yellow-600 border-yellow-300 hover:bg-yellow-50" data-testid="button-archive">
                      <HiClock className="w-4 h-4 mr-2" />
                      Archive
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Status Badges & Indicators */}
        <section className="mb-8" data-testid="section-badges">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Badges & Indicators</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Status Badges */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Status Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-100 text-green-800 border-green-200" data-testid="badge-active">
                    <HiCheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200" data-testid="badge-pending">
                    <HiClock className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                  <Badge className="bg-red-100 text-red-800 border-red-200" data-testid="badge-inactive">
                    <HiXMark className="w-3 h-3 mr-1" />
                    Inactive
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200" data-testid="badge-completed">
                    <HiCheck className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200" data-testid="badge-premium">
                    <HiShieldCheck className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200" data-testid="badge-trial">
                    <HiClock className="w-3 h-3 mr-1" />
                    Trial
                  </Badge>
                  <Badge className="bg-pink-100 text-pink-800 border-pink-200" data-testid="badge-featured">
                    <HiShieldCheck className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Progress Indicators */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Progress Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Campaign Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" data-testid="progress-campaign" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Budget Utilization</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" data-testid="progress-budget" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>User Engagement</span>
                    <span>89%</span>
                  </div>
                  <Progress value={89} className="h-2" data-testid="progress-engagement" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Data Tables */}
        <section className="mb-8" data-testid="section-tables">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Tables</h2>
          
          {/* Search and Filters */}
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex flex-1 gap-4 items-center">
                  <div className="relative max-w-sm">
                    <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="Search users..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      data-testid="input-table-search"
                    />
                  </div>
                  
                  <Select value={filterStatus} onValueChange={handleStatusFilterChange} data-testid="select-table-filter">
                    <SelectTrigger className="w-32">
                      <HiAdjustmentsHorizontal className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-2 items-center">
                  <Select value={pageSize.toString()} onValueChange={handlePageSizeChange} data-testid="select-page-size">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" data-testid="button-table-export">
                    Export
                  </Button>
                  <Button size="sm" className="bg-[#ff0086] hover:bg-[#e6007a]" data-testid="button-table-add">
                    <HiPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin Users Table */}
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table data-testid="table-admin-users">
                <TableHeader>
                  <TableRow className="border-gray-100">
                    <TableHead className="w-[50px]">
                      <Checkbox data-testid="checkbox-select-all" />
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("name")}
                      data-testid="th-name"
                    >
                      <div className="flex items-center gap-2">
                        Name
                        <HiChevronUpDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort("role")}
                      data-testid="th-role"
                    >
                      <div className="flex items-center gap-2">
                        Role
                        <HiChevronUpDown className="w-4 h-4 text-gray-400" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user.id} className="border-gray-100 hover:bg-gray-50">
                      <TableCell>
                        <Checkbox data-testid={`checkbox-user-${user.id}`} />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-gray-900" data-testid={`user-name-${user.id}`}>{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs" data-testid={`user-role-${user.id}`}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={`text-xs ${statusBadgeVariant(user.status)}`}
                          data-testid={`user-status-${user.id}`}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500" data-testid={`user-login-${user.id}`}>
                        {user.lastLogin}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" data-testid={`dropdown-user-${user.id}`}>
                              <HiEllipsisHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem data-testid={`action-view-${user.id}`}>
                              <HiEye className="w-4 h-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem data-testid={`action-edit-${user.id}`}>
                              <HiPencilSquare className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" data-testid={`action-delete-${user.id}`}>
                              <HiTrash className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600" data-testid="pagination-info">
              Showing {startIndex + 1}-{Math.min(startIndex + pageSize, sortedUsers.length)} of {sortedUsers.length} users
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 mr-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                data-testid="button-prev-page"
              >
                <HiChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                if (totalPages <= 5) {
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className={currentPage === pageNum ? "bg-[#ff0086] hover:bg-[#e6007a]" : ""}
                      data-testid={`button-page-${pageNum}`}
                    >
                      {pageNum}
                    </Button>
                  );
                }
                return null;
              })}
              
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                data-testid="button-next-page"
              >
                Next
                <HiChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Cards & Panels */}
        <section className="mb-8" data-testid="section-cards">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Cards & Panels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Analytics Card */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <HiChartBarSquare className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800" data-testid="badge-growth">
                    <HiArrowTrendingUp className="w-3 h-3 mr-1" />
                    +12%
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1" data-testid="metric-users">
                  15,248
                </h3>
                <p className="text-sm text-gray-600">Total Users</p>
                <div className="mt-4">
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">78% of monthly target</p>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Card */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <HiCurrencyDollar className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-800" data-testid="badge-revenue">
                    <HiArrowTrendingUp className="w-3 h-3 mr-1" />
                    +23%
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1" data-testid="metric-revenue">
                  ₫2.4B
                </h3>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <div className="mt-4">
                  <Progress value={92} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">92% of monthly target</p>
                </div>
              </CardContent>
            </Card>

            {/* Campaigns Card */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <HiBuildingOffice2 className="w-5 h-5 text-white" />
                  </div>
                  <Badge className="bg-blue-100 text-blue-800" data-testid="badge-campaigns">
                    <HiArrowTrendingUp className="w-3 h-3 mr-1" />
                    +8%
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1" data-testid="metric-campaigns">
                  342
                </h3>
                <p className="text-sm text-gray-600">Active Campaigns</p>
                <div className="mt-4">
                  <Progress value={65} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">65% completion rate</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Modals & Dialogs */}
        <section className="mb-8" data-testid="section-modals">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Modals & Dialogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Standard Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex-col" data-testid="button-modal-form">
                  <HiPlus className="w-5 h-5 mb-2" />
                  Form Modal
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md" data-testid="modal-form">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="modal-name">Full Name</Label>
                    <Input 
                      id="modal-name" 
                      placeholder="Enter full name" 
                      className="mt-1"
                      value={newUser.name}
                      onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                      data-testid="input-modal-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="modal-email">Email</Label>
                    <Input 
                      id="modal-email" 
                      type="email" 
                      placeholder="Enter email" 
                      className="mt-1"
                      value={newUser.email}
                      onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                      data-testid="input-modal-email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="modal-role">Role</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                      <SelectTrigger className="mt-1" data-testid="select-modal-role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                        <SelectItem value="content-moderator">Content Moderator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsModalOpen(false);
                      setNewUser({ name: '', email: '', role: '' });
                    }}
                    data-testid="button-modal-cancel"
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-[#ff0086] hover:bg-[#e6007a]" 
                    onClick={() => {
                      if (newUser.name && newUser.email && newUser.role) {
                        // Simulate adding user (in real app, would call API)
                        console.log('Adding user:', newUser);
                        setIsModalOpen(false);
                        setNewUser({ name: '', email: '', role: '' });
                      }
                    }}
                    disabled={!newUser.name || !newUser.email || !newUser.role}
                    data-testid="button-modal-add"
                  >
                    Add User
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="h-20 flex-col text-red-600 border-red-200 hover:bg-red-50" data-testid="button-modal-confirm">
                  <HiExclamationTriangle className="w-5 h-5 mb-2" />
                  Confirm Dialog
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent data-testid="modal-confirm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the user account and remove all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Side Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col" 
                  data-testid="button-sheet"
                  onClick={() => {
                    setSelectedUser(adminUsers[0]); // Select first user for demo
                    setIsSheetOpen(true);
                  }}
                >
                  <HiBars3 className="w-5 h-5 mb-2" />
                  Side Sheet
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]" data-testid="sheet-content">
                <SheetHeader>
                  <SheetTitle>User Details</SheetTitle>
                  <SheetDescription>
                    View and edit user information
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {selectedUser && (
                    <>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <HiUsers className="w-8 h-8 text-gray-700" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
                          <p className="text-sm text-gray-600">{selectedUser.email}</p>
                          <Badge className="mt-1">{selectedUser.role}</Badge>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <span className="text-sm font-medium text-gray-900">Status</span>
                            <Badge 
                              className={statusBadgeVariant(selectedUser.status)}
                              data-testid="sheet-user-status"
                            >
                              {selectedUser.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <span className="text-sm font-medium text-gray-900">Last Login</span>
                            <p className="text-sm text-gray-600">{selectedUser.lastLogin}</p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h4 className="text-sm font-medium text-gray-900">Quick Actions</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" size="sm" className="w-full" data-testid="sheet-action-edit">
                              <HiPencilSquare className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="w-full" data-testid="sheet-action-view">
                              <HiEye className="w-4 h-4 mr-2" />
                              View Logs
                            </Button>
                            <Button variant="outline" size="sm" className="w-full" data-testid="sheet-action-reset">
                              <HiClock className="w-4 h-4 mr-2" />
                              Reset Password
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full text-red-600 border-red-200 hover:bg-red-50"
                              data-testid="sheet-action-suspend"
                            >
                              <HiMinus className="w-4 h-4 mr-2" />
                              Suspend
                            </Button>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-gray-900">Recent Activity</h4>
                          <div className="space-y-2">
                            {[
                              { action: 'Logged in', time: '2 hours ago', icon: HiCheckCircle, color: 'text-green-500' },
                              { action: 'Updated profile', time: '1 day ago', icon: HiPencilSquare, color: 'text-blue-500' },
                              { action: 'Changed password', time: '3 days ago', icon: HiShieldCheck, color: 'text-purple-500' }
                            ].map((activity, index) => (
                              <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                                <activity.icon className={`w-4 h-4 ${activity.color}`} />
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{activity.action}</p>
                                  <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </section>

        {/* Navigation Components */}
        <section className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-navigation-components">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Navigation Components</h2>
              <p className="text-sm text-gray-600">Interactive navigation patterns based on dashboard sidebar design with Vietnamese localization</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" data-testid="button-nav-filter">
                <HiAdjustmentsHorizontal className="w-4 h-4 mr-2" />
                Filter Views
              </Button>
              <Button size="sm" className="bg-[#ff0086] hover:bg-[#e6007a]" data-testid="button-nav-export">
                <HiArrowUpRight className="w-4 h-4 mr-2" />
                Export Navigation
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Navigation Demo */}
            <div className="lg:col-span-2">
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <HiBars3 className="w-5 h-5 text-[#ff0086]" />
                    Interactive Navigation Demo
                  </CardTitle>
                  <p className="text-sm text-gray-600">Live demo with expandable menu items, hover effects, and active states using IKK brand colors.</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <NavigationSample />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Usage Guidelines */}
            <div className="space-y-6">
              {/* Features */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">Key Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <HiCheck className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Vietnamese Localization</p>
                      <p className="text-xs text-gray-600">All menu items use Vietnamese labels</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <HiCheck className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Interactive States</p>
                      <p className="text-xs text-gray-600">Active, hover, and expanded states</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <HiCheck className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Submenu Support</p>
                      <p className="text-xs text-gray-600">Collapsible navigation groups</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <HiCheck className="w-3 h-3 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Brand Colors</p>
                      <p className="text-xs text-gray-600">IKK pink (#ff0086) active states</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Implementation */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">Implementation Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="text-xs font-medium text-gray-900 mb-1">Required Imports</h4>
                    <div className="bg-gray-50 rounded-md p-2 text-xs font-mono text-gray-600">
                      <div>import {'{ LayoutDashboard, Target,'}</div>
                      <div>&nbsp;&nbsp;BarChart3, Wrench {'}'} from 'lucide-react';</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-900 mb-1">Active State Class</h4>
                    <div className="bg-gray-50 rounded-md p-2 text-xs font-mono text-gray-600">
                      bg-pink-50 text-[#ff0086]
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-900 mb-1">Test Coverage</h4>
                    <p className="text-xs text-gray-600">All interactive elements include data-testid attributes for automated testing.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Usage Stats */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Dashboard Pages</span>
                    <span className="text-sm font-medium">8/8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Admin Sections</span>
                    <span className="text-sm font-medium">12/15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Accessibility Score</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">A+</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Mobile Responsive</span>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">Yes</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Loading States */}
        <section className="mb-8" data-testid="section-loading">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Loading States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Skeleton Components */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Skeleton Loading</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" data-testid="skeleton-avatar" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" data-testid="skeleton-name" />
                    <Skeleton className="h-4 w-[150px]" data-testid="skeleton-email" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" data-testid="skeleton-line1" />
                  <Skeleton className="h-4 w-[80%]" data-testid="skeleton-line2" />
                  <Skeleton className="h-4 w-[60%]" data-testid="skeleton-line3" />
                </div>
              </CardContent>
            </Card>

            {/* Progress Loading */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Progress States</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Processing...</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-3" data-testid="progress-processing" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Uploading files...</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-3" data-testid="progress-upload" />
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                  Loading data...
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Brand Management Section */}
        <section className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-brand-management">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">#1 Quản lý Thương hiệu</h2>
              <p className="text-gray-600">Comprehensive brand management system with product categorization, verification, and performance tracking</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                data-testid="button-brand-filter"
              >
                <HiAdjustmentsHorizontal className="w-4 h-4 mr-2" />
                Bộ lọc Thương hiệu
              </Button>
              <Button 
                size="sm" 
                className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors"
                data-testid="button-add-brand"
              >
                <HiPlus className="w-4 h-4 mr-2" />
                Thêm Thương hiệu
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Brand Overview Dashboard */}
            <div className="lg:col-span-2">
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <HiBuildingOffice2 className="w-5 h-5 text-[#ff0086]" />
                    Dashboard Thương hiệu
                  </CardTitle>
                  <p className="text-sm text-gray-600">Real-time brand performance metrics, verification status, and product catalog management.</p>
                </CardHeader>
                <CardContent>
                  {/* Brand Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center" data-testid="stat-total-brands">
                      <HiBuildingOffice2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-900">247</div>
                      <div className="text-sm text-blue-700">Tổng Thương hiệu</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center" data-testid="stat-verified-brands">
                      <HiCheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-900">189</div>
                      <div className="text-sm text-green-700">Đã Xác minh</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center" data-testid="stat-pending-brands">
                      <HiClock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-900">23</div>
                      <div className="text-sm text-yellow-700">Chờ Duyệt</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center" data-testid="stat-total-products">
                      <HiGlobeAlt className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-900">8.9K</div>
                      <div className="text-sm text-purple-700">Tổng Sản phẩm</div>
                    </div>
                  </div>

                  {/* Brand List Table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="text-left font-medium">Thương hiệu</TableHead>
                          <TableHead className="text-left font-medium">Danh mục</TableHead>
                          <TableHead className="text-left font-medium">Trạng thái</TableHead>
                          <TableHead className="text-left font-medium">Sản phẩm</TableHead>
                          <TableHead className="text-right font-medium">Hành động</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { 
                            name: "Nike Vietnam", 
                            category: "Thời trang & Thể thao", 
                            status: "verified", 
                            products: "1,245",
                            logo: "N"
                          },
                          { 
                            name: "Samsung Electronics", 
                            category: "Điện tử & Công nghệ", 
                            status: "verified", 
                            products: "892",
                            logo: "S"
                          },
                          { 
                            name: "L'Oréal Paris", 
                            category: "Làm đẹp & Chăm sóc", 
                            status: "pending", 
                            products: "456",
                            logo: "L"
                          },
                          { 
                            name: "Unilever Vietnam", 
                            category: "Gia dụng & Tiêu dùng", 
                            status: "verified", 
                            products: "672",
                            logo: "U"
                          }
                        ].map((brand, index) => (
                          <TableRow key={index} className="hover:bg-gray-50" data-testid={`brand-row-${index}`}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-[#ff0086] to-pink-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                                  {brand.logo}
                                </div>
                                <span className="font-medium text-gray-900">{brand.name}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600">{brand.category}</TableCell>
                            <TableCell>
                              <Badge 
                                className={brand.status === 'verified' 
                                  ? 'bg-green-100 text-green-800 border-green-200' 
                                  : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                }
                                data-testid={`brand-status-${index}`}
                              >
                                {brand.status === 'verified' ? 'Đã xác minh' : 'Chờ duyệt'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-600">{brand.products} sản phẩm</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="sm" data-testid={`button-view-brand-${index}`}>
                                  <HiEye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" data-testid={`button-edit-brand-${index}`}>
                                  <HiPencilSquare className="w-4 h-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" data-testid={`button-menu-brand-${index}`}>
                                      <HiEllipsisHorizontal className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem data-testid={`menu-verify-${index}`}>
                                      <HiShieldCheck className="w-4 h-4 mr-2" />
                                      Xác minh
                                    </DropdownMenuItem>
                                    <DropdownMenuItem data-testid={`menu-products-${index}`}>
                                      <HiGlobeAlt className="w-4 h-4 mr-2" />
                                      Quản lý Sản phẩm
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600" data-testid={`menu-delete-${index}`}>
                                      <HiTrash className="w-4 h-4 mr-2" />
                                      Xóa
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Brand Management Features */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">Thao tác Nhanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" data-testid="quick-action-add-category">
                    <HiTableCells className="w-4 h-4 mr-2" />
                    Thêm Danh mục
                  </Button>
                  <Button variant="outline" className="w-full justify-start" data-testid="quick-action-bulk-verify">
                    <HiShieldCheck className="w-4 h-4 mr-2" />
                    Xác minh Hàng loạt
                  </Button>
                  <Button variant="outline" className="w-full justify-start" data-testid="quick-action-export-brands">
                    <HiArrowUpRight className="w-4 h-4 mr-2" />
                    Xuất Danh sách
                  </Button>
                  <Button variant="outline" className="w-full justify-start" data-testid="quick-action-import-products">
                    <HiArrowDownRight className="w-4 h-4 mr-2" />
                    Nhập Sản phẩm
                  </Button>
                </CardContent>
              </Card>

              {/* Brand Categories */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">Danh mục Thương hiệu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Thời trang & Thể thao", count: 89, color: "bg-blue-100 text-blue-800" },
                    { name: "Điện tử & Công nghệ", count: 67, color: "bg-purple-100 text-purple-800" },
                    { name: "Làm đẹp & Chăm sóc", count: 45, color: "bg-pink-100 text-pink-800" },
                    { name: "Gia dụng & Tiêu dùng", count: 34, color: "bg-green-100 text-green-800" },
                    { name: "Thực phẩm & Đồ uống", count: 12, color: "bg-orange-100 text-orange-800" }
                  ].map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50" data-testid={`category-${index}`}>
                      <div className="flex items-center gap-2">
                        <Badge className={`${category.color} border-0`}>
                          {category.count}
                        </Badge>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" data-testid={`category-manage-${index}`}>
                        <HiArrowUpRight className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">Hiệu suất Tháng này</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Thương hiệu mới</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">+23</span>
                      <HiArrowTrendingUp className="w-3 h-3 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sản phẩm mới</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">+1.2K</span>
                      <HiArrowTrendingUp className="w-3 h-3 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Xác minh hoàn thành</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">94%</span>
                      <HiArrowTrendingUp className="w-3 h-3 text-green-500" />
                    </div>
                  </div>
                  <Separator />
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tiến độ xác minh</span>
                      <span>189/247</span>
                    </div>
                    <Progress value={76} className="h-2" data-testid="verification-progress" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Category Brand Management Section */}
        <section className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-category-management">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">#2 Quản lý danh mục thương hiệu</h2>
              <p className="text-gray-600">Advanced category management system with hierarchical structure, product mapping, and performance analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                data-testid="button-category-filter"
              >
                <HiAdjustmentsHorizontal className="w-4 h-4 mr-2" />
                Bộ lọc Danh mục
              </Button>
              <Button 
                size="sm" 
                className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors"
                data-testid="button-add-category"
              >
                <HiPlus className="w-4 h-4 mr-2" />
                Thêm Danh mục
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Category Management Dashboard */}
            <div className="lg:col-span-2">
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <HiTableCells className="w-5 h-5 text-[#ff0086]" />
                    Dashboard Danh mục
                  </CardTitle>
                  <p className="text-sm text-gray-600">Category hierarchy management, product distribution, and performance tracking across all brand categories.</p>
                </CardHeader>
                <CardContent>
                  {/* Category Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center" data-testid="stat-total-categories">
                      <HiTableCells className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-900">28</div>
                      <div className="text-sm text-blue-700">Tổng Danh mục</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center" data-testid="stat-active-categories">
                      <HiCheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-900">24</div>
                      <div className="text-sm text-green-700">Đang Hoạt động</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center" data-testid="stat-subcategories">
                      <HiQueueList className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-900">156</div>
                      <div className="text-sm text-yellow-700">Danh mục Con</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center" data-testid="stat-mapped-products">
                      <HiChartBarSquare className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-900">8.9K</div>
                      <div className="text-sm text-purple-700">Sản phẩm Mapped</div>
                    </div>
                  </div>

                  {/* Category Hierarchy Tree */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900">Cây Phân cấp Danh mục</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      {[
                        { 
                          name: "Thời trang & Phụ kiện", 
                          count: 2845, 
                          subcats: ["Quần áo Nam", "Quần áo Nữ", "Giày dép", "Túi xách"], 
                          icon: "👔",
                          color: "blue"
                        },
                        { 
                          name: "Điện tử & Công nghệ", 
                          count: 1892, 
                          subcats: ["Smartphone", "Laptop", "Tai nghe", "Phụ kiện"], 
                          icon: "📱",
                          color: "purple"
                        },
                        { 
                          name: "Làm đẹp & Chăm sóc", 
                          count: 1567, 
                          subcats: ["Skincare", "Makeup", "Nước hoa", "Chăm sóc tóc"], 
                          icon: "💄",
                          color: "pink"
                        },
                        { 
                          name: "Gia dụng & Tiêu dùng", 
                          count: 1234, 
                          subcats: ["Nội thất", "Đồ bếp", "Điện máy", "Vệ sinh"], 
                          icon: "🏠",
                          color: "green"
                        }
                      ].map((category, index) => (
                        <div key={index} className="space-y-2" data-testid={`category-tree-${index}`}>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{category.icon}</span>
                              <div>
                                <span className="font-medium text-gray-900">{category.name}</span>
                                <div className="text-sm text-gray-500">{category.count} sản phẩm</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={`bg-${category.color}-100 text-${category.color}-800 border-${category.color}-200`}>
                                {category.subcats.length} danh mục con
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" data-testid={`category-menu-${index}`}>
                                    <HiEllipsisHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem data-testid={`category-edit-${index}`}>
                                    <HiPencilSquare className="w-4 h-4 mr-2" />
                                    Chỉnh sửa
                                  </DropdownMenuItem>
                                  <DropdownMenuItem data-testid={`category-subcats-${index}`}>
                                    <HiQueueList className="w-4 h-4 mr-2" />
                                    Quản lý Danh mục con
                                  </DropdownMenuItem>
                                  <DropdownMenuItem data-testid={`category-products-${index}`}>
                                    <HiChartBarSquare className="w-4 h-4 mr-2" />
                                    Xem Sản phẩm
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600" data-testid={`category-delete-${index}`}>
                                    <HiTrash className="w-4 h-4 mr-2" />
                                    Xóa Danh mục
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          
                          {/* Subcategories */}
                          <div className="ml-8 space-y-1">
                            {category.subcats.map((subcat, subIndex) => (
                              <div key={subIndex} className="flex items-center justify-between py-2 px-3 bg-white border border-gray-100 rounded-md" data-testid={`subcat-${index}-${subIndex}`}>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                                  <span className="text-sm text-gray-700">{subcat}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500">{Math.floor(Math.random() * 500) + 100} SP</span>
                                  <Button variant="ghost" size="sm" data-testid={`subcat-edit-${index}-${subIndex}`}>
                                    <HiPencilSquare className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Management Tools */}
            <div className="space-y-6">
              {/* Quick Category Actions */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">Công cụ Danh mục</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" data-testid="tool-bulk-edit">
                    <HiPencilSquare className="w-4 h-4 mr-2" />
                    Chỉnh sửa Hàng loạt
                  </Button>
                  <Button variant="outline" className="w-full justify-start" data-testid="tool-merge-categories">
                    <HiArrowsRightLeft className="w-4 h-4 mr-2" />
                    Gộp Danh mục
                  </Button>
                  <Button variant="outline" className="w-full justify-start" data-testid="tool-export-structure">
                    <HiArrowUpRight className="w-4 h-4 mr-2" />
                    Xuất Cấu trúc
                  </Button>
                  <Button variant="outline" className="w-full justify-start" data-testid="tool-import-categories">
                    <HiArrowDownRight className="w-4 h-4 mr-2" />
                    Nhập Danh mục
                  </Button>
                  <Button variant="outline" className="w-full justify-start" data-testid="tool-analytics">
                    <HiChartBarSquare className="w-4 h-4 mr-2" />
                    Phân tích Hiệu suất
                  </Button>
                </CardContent>
              </Card>

              {/* Category Performance */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">Top Danh mục</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Thời trang & Phụ kiện", sales: "₫12.4B", growth: "+15%", color: "blue" },
                    { name: "Điện tử & Công nghệ", sales: "₫8.9B", growth: "+22%", color: "purple" },
                    { name: "Làm đẹp & Chăm sóc", sales: "₫6.7B", growth: "+18%", color: "pink" },
                    { name: "Gia dụng & Tiêu dùng", sales: "₫4.2B", growth: "+8%", color: "green" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between" data-testid={`top-category-${index}`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 bg-${item.color}-500 rounded-full`}></div>
                        <div>
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.sales}</div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {item.growth}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Category Distribution Chart */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">Phân bố Sản phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Thời trang", percentage: 32, count: 2845 },
                      { name: "Điện tử", percentage: 21, count: 1892 },
                      { name: "Làm đẹp", percentage: 17, count: 1567 },
                      { name: "Gia dụng", percentage: 14, count: 1234 },
                      { name: "Khác", percentage: 16, count: 1462 }
                    ].map((category, index) => (
                      <div key={index} className="space-y-1" data-testid={`distribution-${index}`}>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">{category.name}</span>
                          <span className="text-gray-500">{category.percentage}%</span>
                        </div>
                        <Progress value={category.percentage} className="h-2" />
                        <div className="text-xs text-gray-500">{category.count.toLocaleString()} sản phẩm</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Product Brand Management Section */}
        <section className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-product-management">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">#3 Quản lý sản phẩm thương hiệu</h2>
              <p className="text-gray-600">Comprehensive product management system with inventory tracking, pricing optimization, and catalog organization</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                data-testid="button-product-filter"
              >
                <HiAdjustmentsHorizontal className="w-4 h-4 mr-2" />
                Bộ lọc Sản phẩm
              </Button>
              <Button 
                size="sm" 
                className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors"
                data-testid="button-add-product"
              >
                <HiPlus className="w-4 h-4 mr-2" />
                Thêm Sản phẩm
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Management Dashboard */}
            <div className="lg:col-span-2">
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <HiGlobeAlt className="w-5 h-5 text-[#ff0086]" />
                    Dashboard Sản phẩm
                  </CardTitle>
                  <p className="text-sm text-gray-600">Product catalog management, inventory tracking, pricing optimization, and performance analytics across all brand products.</p>
                </CardHeader>
                <CardContent>
                  {/* Product Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center" data-testid="stat-total-products">
                      <HiGlobeAlt className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-900">8,943</div>
                      <div className="text-sm text-blue-700">Tổng Sản phẩm</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center" data-testid="stat-active-products">
                      <HiCheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-900">7,892</div>
                      <div className="text-sm text-green-700">Đang Bán</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center" data-testid="stat-low-stock">
                      <HiExclamationTriangle className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-900">234</div>
                      <div className="text-sm text-yellow-700">Sắp Hết hàng</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center" data-testid="stat-revenue">
                      <HiCurrencyDollar className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-900">₫45.2B</div>
                      <div className="text-sm text-purple-700">Doanh thu Tháng</div>
                    </div>
                  </div>

                  {/* Product Catalog Table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-900">Catalog Sản phẩm Nổi bật</h3>
                    </div>
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow>
                          <TableHead className="text-left font-medium">Sản phẩm</TableHead>
                          <TableHead className="text-left font-medium">Thương hiệu</TableHead>
                          <TableHead className="text-left font-medium">Danh mục</TableHead>
                          <TableHead className="text-left font-medium">Giá</TableHead>
                          <TableHead className="text-left font-medium">Tồn kho</TableHead>
                          <TableHead className="text-left font-medium">Trạng thái</TableHead>
                          <TableHead className="text-right font-medium">Hành động</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { 
                            name: "iPhone 15 Pro Max 256GB", 
                            brand: "Apple Vietnam",
                            category: "Điện tử", 
                            price: "29,990,000₫",
                            stock: 45,
                            status: "active",
                            image: "📱"
                          },
                          { 
                            name: "Nike Air Force 1 '07", 
                            brand: "Nike Vietnam",
                            category: "Thời trang", 
                            price: "2,929,000₫",
                            stock: 156,
                            status: "active",
                            image: "👟"
                          },
                          { 
                            name: "L'Oréal Paris Revitalift Serum", 
                            brand: "L'Oréal Paris",
                            category: "Làm đẹp", 
                            price: "345,000₫",
                            stock: 8,
                            status: "low_stock",
                            image: "💄"
                          },
                          { 
                            name: "Samsung Galaxy Buds3 Pro", 
                            brand: "Samsung Electronics",
                            category: "Điện tử", 
                            price: "4,990,000₫",
                            stock: 0,
                            status: "out_of_stock",
                            image: "🎧"
                          }
                        ].map((product, index) => (
                          <TableRow key={index} className="hover:bg-gray-50" data-testid={`product-row-${index}`}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                                  {product.image}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{product.name}</div>
                                  <div className="text-sm text-gray-500">SKU: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600">{product.brand}</TableCell>
                            <TableCell className="text-gray-600">{product.category}</TableCell>
                            <TableCell className="font-semibold text-gray-900">{product.price}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                product.stock === 0 ? 'bg-red-100 text-red-800' :
                                product.stock < 20 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {product.stock} units
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                className={
                                  product.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' :
                                  product.status === 'low_stock' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                  'bg-red-100 text-red-800 border-red-200'
                                }
                                data-testid={`product-status-${index}`}
                              >
                                {product.status === 'active' ? 'Đang bán' :
                                 product.status === 'low_stock' ? 'Sắp hết' : 'Hết hàng'}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="sm" data-testid={`button-view-product-${index}`}>
                                  <HiEye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" data-testid={`button-edit-product-${index}`}>
                                  <HiPencilSquare className="w-4 h-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" data-testid={`button-menu-product-${index}`}>
                                      <HiEllipsisHorizontal className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem data-testid={`menu-duplicate-${index}`}>
                                      <HiDocumentText className="w-4 h-4 mr-2" />
                                      Nhân bản
                                    </DropdownMenuItem>
                                    <DropdownMenuItem data-testid={`menu-pricing-${index}`}>
                                      <HiCurrencyDollar className="w-4 h-4 mr-2" />
                                      Cập nhật Giá
                                    </DropdownMenuItem>
                                    <DropdownMenuItem data-testid={`menu-inventory-${index}`}>
                                      <HiTableCells className="w-4 h-4 mr-2" />
                                      Quản lý Kho
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600" data-testid={`menu-delete-${index}`}>
                                      <HiTrash className="w-4 h-4 mr-2" />
                                      Xóa Sản phẩm
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Management Tools */}
            <div className="space-y-6">
              {/* Quick Product Actions */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">Công cụ Sản phẩm</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" data-testid="tool-bulk-import">
                    <HiArrowDownRight className="w-4 h-4 mr-2" />
                    Nhập Hàng loạt
                  </Button>
                  <Button variant="outline" className="w-full justify-start" data-testid="tool-bulk-price-update">
                    <HiCurrencyDollar className="w-4 h-4 mr-2" />
                    Cập nhật Giá
                  </Button>
                  <Button variant="outline" className="w-full justify-start" data-testid="tool-inventory-sync">
                    <HiArrowsRightLeft className="w-4 h-4 mr-2" />
                    Đồng bộ Kho
                  </Button>
                  <Button variant="outline" className="w-full justify-start" data-testid="tool-export-catalog">
                    <HiArrowUpRight className="w-4 h-4 mr-2" />
                    Xuất Catalog
                  </Button>
                  <Button variant="outline" className="w-full justify-start" data-testid="tool-seo-optimization">
                    <HiMagnifyingGlass className="w-4 h-4 mr-2" />
                    Tối ưu SEO
                  </Button>
                </CardContent>
              </Card>

              {/* Inventory Alerts */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">Cảnh báo Tồn kho</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "L'Oréal Revitalift Serum", stock: 8, status: "critical", color: "red" },
                    { name: "Nike Air Max 270", stock: 15, status: "low", color: "yellow" },
                    { name: "Samsung Galaxy S24", stock: 19, status: "low", color: "yellow" },
                    { name: "iPhone 15 Pro", stock: 12, status: "critical", color: "orange" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg" data-testid={`inventory-alert-${index}`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 bg-${item.color}-500 rounded-full`}></div>
                        <div>
                          <div className="text-sm font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.stock} units còn lại</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" data-testid={`alert-action-${index}`}>
                        <HiPlus className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Selling Products */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">Sản phẩm Bán chạy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "iPhone 15 Pro Max", sales: "₫2.1B", units: "1,245", growth: "+18%" },
                    { name: "Nike Air Force 1", sales: "₫892M", units: "3,456", growth: "+25%" },
                    { name: "L'Oréal Hyaluron Serum", sales: "₫567M", units: "12,890", growth: "+12%" },
                    { name: "Samsung Galaxy Buds", sales: "₫434M", units: "2,345", growth: "+8%" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between" data-testid={`top-product-${index}`}>
                      <div>
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.units} units • {item.sales}</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        {item.growth}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Price Analytics */}
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-sm font-medium">Phân tích Giá</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { range: "< 500K", percentage: 28, count: 2507, color: "blue" },
                      { range: "500K - 2M", percentage: 35, count: 3130, color: "green" },
                      { range: "2M - 10M", percentage: 24, count: 2146, color: "yellow" },
                      { range: "10M - 50M", percentage: 10, count: 895, color: "orange" },
                      { range: "> 50M", percentage: 3, count: 265, color: "red" }
                    ].map((range, index) => (
                      <div key={index} className="space-y-1" data-testid={`price-range-${index}`}>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-700">{range.range}</span>
                          <span className="text-gray-500">{range.percentage}%</span>
                        </div>
                        <Progress value={range.percentage} className="h-2" />
                        <div className="text-xs text-gray-500">{range.count.toLocaleString()} sản phẩm</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-600" data-testid="footer">
          <p>IKK Admin Design System - Version 1.0.0</p>
          <p className="mt-1">Built with ❤️ using shadcn/ui, Tailwind CSS, and React</p>
        </footer>
      </div>
    </div>
  );
}