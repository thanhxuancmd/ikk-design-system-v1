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
import { LayoutDashboard, Target, Wrench, BarChart3, CreditCard, HelpCircle, FileText, Gift, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for tables and components
const adminUsers = [
  { id: 1, name: "Nguyễn Văn Admin", email: "admin1@ikk.com", role: "Super Admin", status: "active", lastLogin: "2024-01-15 10:30" },
  { id: 2, name: "Trần Thị Manager", email: "manager1@ikk.com", role: "Manager", status: "active", lastLogin: "2024-01-14 15:45" },
  { id: 3, name: "Lê Văn Support", email: "support1@ikk.com", role: "Support", status: "inactive", lastLogin: "2024-01-10 09:15" },
  { id: 4, name: "Phạm Thị Content", email: "content1@ikk.com", role: "Content Moderator", status: "active", lastLogin: "2024-01-15 08:20" },
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
                    <li className="text-gray-500">Campaign Details</li>
                  </ol>
                </nav>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Tabs</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="profile" data-testid="tabs-sample">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>
                  <TabsContent value="profile" className="pt-4 text-sm text-gray-700">User profile information goes here.</TabsContent>
                  <TabsContent value="settings" className="pt-4 text-sm text-gray-700">Account settings and preferences.</TabsContent>
                  <TabsContent value="notifications" className="pt-4 text-sm text-gray-700">Notification settings and history.</TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Sidebar Navigation */}
            <div className="lg:col-span-2">
              <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Sidebar Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <NavigationSample />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Data Display & Tables */}
        <section className="mb-8" data-testid="section-data-display">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Display & Tables</h2>
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Search by name or email..." 
                    className="max-w-sm rounded" 
                    value={searchTerm} 
                    onChange={(e) => handleSearchChange(e.target.value)}
                    data-testid="search-input"
                  />
                  <Select value={filterStatus} onValueChange={handleStatusFilterChange}>
                    <SelectTrigger className="w-[180px] rounded" data-testid="status-filter">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="rounded" data-testid="button-reset-filters">Reset</Button>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="rounded-lg" data-testid="button-add-user">
                  <HiPlus className="w-4 h-4 mr-2" />
                  Add New User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort('id')}>ID</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>User</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('role')}>Role</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-50" data-testid={`user-row-${user.id}`}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Badge className={statusBadgeVariant(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0" data-testid={`actions-menu-${user.id}`}>
                                <HiEllipsisHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => { setSelectedUser(user); setIsModalOpen(true); }} data-testid={`edit-user-${user.id}`}>
                                <HiPencilSquare className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem data-testid={`view-user-${user.id}`}>
                                <HiEye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem className="text-red-600" data-testid={`delete-user-trigger-${user.id}`}>
                                  <HiTrash className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* Pagination */}
              <div className="flex items-center justify-between pt-4" data-testid="pagination-controls">
                <div className="text-sm text-gray-700">
                  Showing <strong>{startIndex + 1}</strong> to <strong>{Math.min(startIndex + pageSize, sortedUsers.length)}</strong> of <strong>{sortedUsers.length}</strong> results
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    data-testid="pagination-prev"
                  >
                    <HiChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm">{`Page ${currentPage} of ${totalPages}`}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    data-testid="pagination-next"
                  >
                    <HiChevronRight className="w-4 h-4" />
                  </Button>
                  <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
                    <SelectTrigger className="w-[80px] rounded" data-testid="pagination-size">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form Controls & Inputs */}
        <section className="mb-8" data-testid="section-forms">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Form Controls & Inputs</h2>
          <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
            <CardHeader>
              <CardTitle>Example Form</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="e.g., John Doe" className="rounded" data-testid="form-input-name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="e.g., john.doe@example.com" className="rounded" data-testid="form-input-email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger className="rounded" data-testid="form-select-role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message here..." className="rounded" data-testid="form-textarea-message" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" data-testid="form-checkbox-terms" />
                <Label htmlFor="terms">I agree to the terms and conditions</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" data-testid="form-switch-notifications" />
                <Label htmlFor="notifications">Enable email notifications</Label>
              </div>
              <div className="md:col-span-2 flex justify-end gap-2">
                <Button variant="outline" className="rounded-lg" data-testid="form-button-cancel">Cancel</Button>
                <Button className="rounded-lg bg-[#ff0086] hover:bg-[#e6007a]" data-testid="form-button-submit">Submit</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Feedback & Overlays */}
        <section className="mb-8" data-testid="section-feedback">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Feedback & Overlays</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Alerts */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-50 text-blue-700 flex items-start gap-3" data-testid="alert-info">
                  <HiInformationCircle className="w-5 h-5 mt-0.5" />
                  <div>This is an informational alert.</div>
                </div>
                <div className="p-4 rounded-lg bg-green-50 text-green-700 flex items-start gap-3" data-testid="alert-success">
                  <HiCheckCircle className="w-5 h-5 mt-0.5" />
                  <div>This is a success alert.</div>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 text-yellow-700 flex items-start gap-3" data-testid="alert-warning">
                  <HiExclamationTriangle className="w-5 h-5 mt-0.5" />
                  <div>This is a warning alert.</div>
                </div>
                <div className="p-4 rounded-lg bg-red-50 text-red-700 flex items-start gap-3" data-testid="alert-danger">
                  <HiExclamationTriangle className="w-5 h-5 mt-0.5" />
                  <div>This is a danger alert.</div>
                </div>
              </CardContent>
            </Card>

            {/* Modals & Dialogs */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader>
                <CardTitle>Modals & Dialogs</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Button onClick={() => setIsModalOpen(true)} className="rounded-lg" data-testid="button-open-modal">Open Standard Modal</Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="rounded-lg" data-testid="button-open-alert-dialog">Open Alert Dialog</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the item.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>

            {/* Sheet (Side Panel) */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow">
              <CardHeader>
                <CardTitle>Sheet (Side Panel)</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setIsSheetOpen(true)} className="rounded-lg" data-testid="button-open-sheet">Open Sheet</Button>
              </CardContent>
            </Card>

            {/* Progress & Skeletons */}
            <Card className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-shadow lg:col-span-3">
              <CardHeader>
                <CardTitle>Progress & Skeletons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Loading Progress</Label>
                  <Progress value={66} className="w-full mt-2" data-testid="progress-bar" />
                </div>
                <div className="space-y-3">
                  <Label>Skeleton Loading State</Label>
                  <div className="flex items-center space-x-4" data-testid="skeleton-sample">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

      </div>

      {/* Modal for Add/Edit User */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-lg">
          <DialogHeader>
            <DialogTitle>{selectedUser ? 'Edit User' : 'Add New User'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modal-name" className="text-right">Name</Label>
              <Input id="modal-name" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="col-span-3 rounded" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modal-email" className="text-right">Email</Label>
              <Input id="modal-email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="col-span-3 rounded" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modal-role" className="text-right">Role</Label>
              <Select onValueChange={(value) => setNewUser({...newUser, role: value})}>
                <SelectTrigger className="col-span-3 rounded">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="rounded-lg bg-[#ff0086] hover:bg-[#e6007a]">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sheet for Details */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Details Panel</SheetTitle>
            <SheetDescription>
              This is a side panel to display additional information.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">...</div>
        </SheetContent>
      </Sheet>

    </div>
  );
}
