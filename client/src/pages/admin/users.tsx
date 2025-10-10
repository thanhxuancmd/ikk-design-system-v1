import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  HiOutlineUsers,
  HiOutlineUserPlus,
  HiOutlineUserMinus,
  HiOutlineArrowUp,
  HiOutlineArrowTrendingDown,
  HiOutlineMagnifyingGlass,
  HiOutlineFunnel,
  HiOutlineShieldCheck,
  HiOutlineStar,
  HiOutlineBriefcase,
  HiOutlineUser,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineExclamationTriangle,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineEllipsisHorizontal,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2"
import IKKAdminLayout from "@/components/ikk-admin-layout"

export default function AdminUsersPage() {
  return (
    <IKKAdminLayout>
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <Card className="shadow-sm border border-gray-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <HiOutlineUsers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="title-user-management">Quản lý người dùng</h2>
                  <p className="text-gray-600" data-testid="subtitle-user-management">Quản lý tài khoản, phân quyền và hoạt động người dùng</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center" data-testid="icon-user-management">
                <HiOutlineUsers className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Total Users */}
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" data-testid="label-total-users">Tổng người dùng</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1" data-testid="value-total-users">12,458</p>
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <HiOutlineArrowUp className="w-3 h-3" />
                        <span>+12.5% so với tháng trước</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <HiOutlineUsers className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Users */}
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" data-testid="label-active-users">Đang hoạt động</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1" data-testid="value-active-users">9,842</p>
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <HiOutlineArrowUp className="w-3 h-3" />
                        <span>+8.3% so với tháng trước</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <HiOutlineCheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* New This Month */}
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" data-testid="label-new-users">Mới tháng này</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1" data-testid="value-new-users">1,356</p>
                      <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <HiOutlineArrowUp className="w-3 h-3" />
                        <span>+18.2% so với tháng trước</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <HiOutlineUserPlus className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Blocked Users */}
              <Card className="shadow-sm border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600" data-testid="label-blocked-users">Bị chặn</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1" data-testid="value-blocked-users">124</p>
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <HiOutlineArrowTrendingDown className="w-3 h-3" />
                        <span>-5.1% so với tháng trước</span>
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <HiOutlineUserMinus className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="flex-1 w-full md:w-auto">
                <div className="relative">
                  <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, email..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-transparent"
                    data-testid="input-search-users"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[150px]" data-testid="select-role-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả vai trò</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="koc">KOC</SelectItem>
                    <SelectItem value="brand">Brand</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full md:w-[150px]" data-testid="select-status-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                    <SelectItem value="blocked">Bị chặn</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2" data-testid="btn-filter-users">
                  <HiOutlineFunnel className="w-4 h-4" />
                  Bộ lọc
                </Button>
                <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white gap-2" data-testid="btn-add-user">
                  <HiOutlineUserPlus className="w-4 h-4" />
                  Thêm người dùng
                </Button>
              </div>
            </div>

            {/* User Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-select-all" />
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Người dùng</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Vai trò</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Trạng thái</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ngày tham gia</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Hoạt động cuối</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* User 1 - Admin */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-1">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            NV
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-1">Nguyễn Văn An</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-1">nguyenvanan@ikk.vn</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100" data-testid="badge-role-1">
                          <HiOutlineShieldCheck className="w-3 h-3 mr-1" />
                          Admin
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="badge-status-1">
                          <HiOutlineCheckCircle className="w-3 h-3 mr-1" />
                          Hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">15/01/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">5 phút trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-1">
                            <HiOutlineEye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-1">
                            <HiOutlinePencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-1">
                            <HiOutlineEllipsisHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 2 - KOC */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-2">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            TL
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-2">Trần Thị Lan</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-2">tranthilan@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100" data-testid="badge-role-2">
                          <HiOutlineStar className="w-3 h-3 mr-1" />
                          KOC
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="badge-status-2">
                          <HiOutlineCheckCircle className="w-3 h-3 mr-1" />
                          Hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">28/02/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">2 giờ trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-2">
                            <HiOutlineEye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-2">
                            <HiOutlinePencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-2">
                            <HiOutlineEllipsisHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 3 - Brand */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-3">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            LV
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-3">Lê Văn Minh</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-3">levanminh@brand.vn</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100" data-testid="badge-role-3">
                          <HiOutlineBriefcase className="w-3 h-3 mr-1" />
                          Brand
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="badge-status-3">
                          <HiOutlineCheckCircle className="w-3 h-3 mr-1" />
                          Hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">10/03/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">1 ngày trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-3">
                            <HiOutlineEye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-3">
                            <HiOutlinePencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-3">
                            <HiOutlineEllipsisHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 4 - User (Inactive) */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-4">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            PH
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-4">Phạm Thị Hoa</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-4">phamthihoa@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100" data-testid="badge-role-4">
                          <HiOutlineUser className="w-3 h-3 mr-1" />
                          User
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100" data-testid="badge-status-4">
                          <HiOutlineExclamationCircle className="w-3 h-3 mr-1" />
                          Không hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">05/04/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">15 ngày trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-4">
                            <HiOutlineEye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-4">
                            <HiOutlinePencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-4">
                            <HiOutlineEllipsisHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 5 - KOC */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-5">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            ĐQ
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-5">Đỗ Quang Huy</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-5">doquanghuy@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-100" data-testid="badge-role-5">
                          <HiOutlineStar className="w-3 h-3 mr-1" />
                          KOC
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="badge-status-5">
                          <HiOutlineCheckCircle className="w-3 h-3 mr-1" />
                          Hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">18/03/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">30 phút trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-5">
                            <HiOutlineEye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-5">
                            <HiOutlinePencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-5">
                            <HiOutlineEllipsisHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 6 - User (Blocked) */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-6">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            HM
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-6">Hoàng Văn Nam</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-6">hoangvannam@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100" data-testid="badge-role-6">
                          <HiOutlineUser className="w-3 h-3 mr-1" />
                          User
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100" data-testid="badge-status-6">
                          <HiOutlineExclamationTriangle className="w-3 h-3 mr-1" />
                          Bị chặn
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">22/02/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">7 ngày trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-6">
                            <HiOutlineEye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-6">
                            <HiOutlinePencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-6">
                            <HiOutlineEllipsisHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 7 - Brand */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-7">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            VT
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-7">Vũ Thị Trang</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-7">vuthitrang@brand.vn</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100" data-testid="badge-role-7">
                          <HiOutlineBriefcase className="w-3 h-3 mr-1" />
                          Brand
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="badge-status-7">
                          <HiOutlineCheckCircle className="w-3 h-3 mr-1" />
                          Hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">08/04/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">3 giờ trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-7">
                            <HiOutlineEye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-7">
                            <HiOutlinePencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-7">
                            <HiOutlineEllipsisHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>

                    {/* User 8 - User */}
                    <tr className="hover:bg-gray-50 transition-colors" data-testid="row-user-8">
                      <td className="px-4 py-4">
                        <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            BK
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900" data-testid="text-user-name-8">Bùi Khánh Linh</p>
                            <p className="text-xs text-gray-500" data-testid="text-user-email-8">buikhanhlinh@gmail.com</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100" data-testid="badge-role-8">
                          <HiOutlineUser className="w-3 h-3 mr-1" />
                          User
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100" data-testid="badge-status-8">
                          <HiOutlineCheckCircle className="w-3 h-3 mr-1" />
                          Hoạt động
                        </Badge>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">12/04/2024</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-900">1 giờ trước</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-view-user-8">
                            <HiOutlineEye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-edit-user-8">
                            <HiOutlinePencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-gray-100" data-testid="btn-more-user-8">
                            <HiOutlineEllipsisHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Hiển thị <span className="font-semibold">1-8</span> trong tổng số <span className="font-semibold">12,458</span> người dùng
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled data-testid="btn-prev-page">
                  <HiOutlineChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-[#ff0086] text-white hover:bg-[#e6007a]" data-testid="btn-page-1">
                  1
                </Button>
                <Button variant="outline" size="sm" data-testid="btn-page-2">
                  2
                </Button>
                <Button variant="outline" size="sm" data-testid="btn-page-3">
                  3
                </Button>
                <Button variant="outline" size="sm" data-testid="btn-next-page">
                  <HiOutlineChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </IKKAdminLayout>
  )
}
