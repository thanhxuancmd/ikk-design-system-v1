import { useState } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  HiOutlineCog6Tooth,
  HiOutlineArrowPath,
  HiOutlineCheck,
  HiOutlineShieldCheck,
  HiOutlineBell,
  HiOutlineSquares2X2,
  HiOutlineGlobeAlt,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlineArrowUpTray,
  HiOutlineExclamationCircle,
  HiOutlineLockClosed,
  HiOutlineServer,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineCodeBracket,
  HiOutlineInformationCircle,
  HiOutlineLink
} from "react-icons/hi2"
import { FaTiktok, FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa"
import IKKAdminLayout from "@/components/ikk-admin-layout"

export default function AdminSettingsPage() {
  const [selectedSettingsTab, setSelectedSettingsTab] = useState<'general' | 'security' | 'notifications' | 'integrations'>('general')

  return (
    <IKKAdminLayout>
      <section className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-system-settings">
        <Card className="shadow-sm border border-gray-100">
          {/* Header with Settings Icon */}
          <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <HiOutlineCog6Tooth className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2" data-testid="title-system-settings">Cài đặt hệ thống</h2>
                  <p className="text-gray-600" data-testid="subtitle-system-settings">Quản lý cấu hình và tùy chỉnh hệ thống nền tảng</p>
                </div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-slate-600 rounded-lg flex items-center justify-center" data-testid="icon-system-settings">
                <HiOutlineCog6Tooth className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Action Buttons - MANDATORY 2-button layout */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2" data-testid="btn-reset-settings">
                  <HiOutlineArrowPath className="w-4 h-4" />
                  <span>Đặt lại mặc định</span>
                </button>
                <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2" data-testid="btn-save-settings">
                  <HiOutlineCheck className="w-4 h-4" />
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </div>

            {/* Settings Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex gap-1">
                <button
                  onClick={() => setSelectedSettingsTab('general')}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    selectedSettingsTab === 'general'
                      ? 'text-[#ff0086]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  data-testid="tab-settings-general"
                >
                  <div className="flex items-center gap-2">
                    <HiOutlineCog6Tooth className="w-4 h-4" />
                    <span>Cài đặt chung</span>
                  </div>
                  {selectedSettingsTab === 'general' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff0086]"></div>
                  )}
                </button>
                <button
                  onClick={() => setSelectedSettingsTab('security')}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    selectedSettingsTab === 'security'
                      ? 'text-[#ff0086]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  data-testid="tab-settings-security"
                >
                  <div className="flex items-center gap-2">
                    <HiOutlineShieldCheck className="w-4 h-4" />
                    <span>Bảo mật</span>
                  </div>
                  {selectedSettingsTab === 'security' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff0086]"></div>
                  )}
                </button>
                <button
                  onClick={() => setSelectedSettingsTab('notifications')}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    selectedSettingsTab === 'notifications'
                      ? 'text-[#ff0086]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  data-testid="tab-settings-notifications"
                >
                  <div className="flex items-center gap-2">
                    <HiOutlineBell className="w-4 h-4" />
                    <span>Thông báo</span>
                  </div>
                  {selectedSettingsTab === 'notifications' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff0086]"></div>
                  )}
                </button>
                <button
                  onClick={() => setSelectedSettingsTab('integrations')}
                  className={`px-4 py-3 text-sm font-medium transition-colors relative ${
                    selectedSettingsTab === 'integrations'
                      ? 'text-[#ff0086]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  data-testid="tab-settings-integrations"
                >
                  <div className="flex items-center gap-2">
                    <HiOutlineSquares2X2 className="w-4 h-4" />
                    <span>Tích hợp</span>
                  </div>
                  {selectedSettingsTab === 'integrations' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff0086]"></div>
                  )}
                </button>
              </div>
            </div>

            {/* General Settings Tab */}
            {selectedSettingsTab === 'general' && (
              <div className="space-y-6" data-testid="tab-content-general">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Platform Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <HiOutlineGlobeAlt className="w-4 h-4 text-gray-500" />
                      Tên nền tảng
                    </label>
                    <input
                      type="text"
                      defaultValue="IKK Platform"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-transparent"
                      data-testid="input-platform-name"
                    />
                  </div>

                  {/* Language */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <HiOutlineGlobeAlt className="w-4 h-4 text-gray-500" />
                      Ngôn ngữ mặc định
                    </label>
                    <Select defaultValue="vi">
                      <SelectTrigger className="w-full" data-testid="select-language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vi">Tiếng Việt</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ko">한국어</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Timezone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <HiOutlineClock className="w-4 h-4 text-gray-500" />
                      Múi giờ
                    </label>
                    <Select defaultValue="asia-ho-chi-minh">
                      <SelectTrigger className="w-full" data-testid="select-timezone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia-ho-chi-minh">Hồ Chí Minh (GMT+7)</SelectItem>
                        <SelectItem value="asia-bangkok">Bangkok (GMT+7)</SelectItem>
                        <SelectItem value="asia-seoul">Seoul (GMT+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Format */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <HiOutlineCalendar className="w-4 h-4 text-gray-500" />
                      Định dạng ngày tháng
                    </label>
                    <Select defaultValue="dd-mm-yyyy">
                      <SelectTrigger className="w-full" data-testid="select-date-format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Currency */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <HiOutlineCurrencyDollar className="w-4 h-4 text-gray-500" />
                      Đơn vị tiền tệ
                    </label>
                    <Select defaultValue="vnd">
                      <SelectTrigger className="w-full" data-testid="select-currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vnd">VND (đ)</SelectItem>
                        <SelectItem value="usd">USD ($)</SelectItem>
                        <SelectItem value="krw">KRW (₩)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Max File Upload Size */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <HiOutlineArrowUpTray className="w-4 h-4 text-gray-500" />
                      Kích thước file tối đa
                    </label>
                    <Select defaultValue="10mb">
                      <SelectTrigger className="w-full" data-testid="select-file-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5mb">5 MB</SelectItem>
                        <SelectItem value="10mb">10 MB</SelectItem>
                        <SelectItem value="25mb">25 MB</SelectItem>
                        <SelectItem value="50mb">50 MB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Maintenance Mode */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <HiOutlineExclamationCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Chế độ bảo trì</h4>
                        <p className="text-sm text-gray-600 mt-1">Tạm dừng nền tảng để thực hiện bảo trì và nâng cấp hệ thống</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" data-testid="toggle-maintenance" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings Tab */}
            {selectedSettingsTab === 'security' && (
              <div className="space-y-6" data-testid="tab-content-security">
                {/* Two-Factor Authentication */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <HiOutlineShieldCheck className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Xác thực hai yếu tố (2FA)</h4>
                        <p className="text-sm text-gray-600 mt-1">Bảo vệ tài khoản bằng mã xác thực bổ sung khi đăng nhập</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked data-testid="toggle-2fa" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                    </label>
                  </div>
                </div>

                {/* Password Policy */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <HiOutlineLockClosed className="w-4 h-4 text-gray-500" />
                    Chính sách mật khẩu
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Độ dài tối thiểu</label>
                      <Select defaultValue="8">
                        <SelectTrigger className="w-full" data-testid="select-password-length">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 ký tự</SelectItem>
                          <SelectItem value="8">8 ký tự</SelectItem>
                          <SelectItem value="12">12 ký tự</SelectItem>
                          <SelectItem value="16">16 ký tự</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Thời gian hết hạn</label>
                      <Select defaultValue="90">
                        <SelectTrigger className="w-full" data-testid="select-password-expiry">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 ngày</SelectItem>
                          <SelectItem value="60">60 ngày</SelectItem>
                          <SelectItem value="90">90 ngày</SelectItem>
                          <SelectItem value="never">Không hết hạn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Session Timeout */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <HiOutlineClock className="w-4 h-4 text-gray-500" />
                    Thời gian timeout phiên làm việc
                  </label>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-full" data-testid="select-session-timeout">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 phút</SelectItem>
                      <SelectItem value="30">30 phút</SelectItem>
                      <SelectItem value="60">1 giờ</SelectItem>
                      <SelectItem value="120">2 giờ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* IP Whitelist */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <HiOutlineServer className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Whitelist IP</h4>
                        <p className="text-sm text-gray-600 mt-1">Chỉ cho phép truy cập từ các địa chỉ IP đã được phê duyệt</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" data-testid="toggle-ip-whitelist" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings Tab */}
            {selectedSettingsTab === 'notifications' && (
              <div className="space-y-6" data-testid="tab-content-notifications">
                {/* Email Notifications */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <HiOutlineEnvelope className="w-5 h-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Thông báo Email</h4>
                        <p className="text-sm text-gray-600 mt-1">Nhận thông báo quan trọng qua email</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked data-testid="toggle-email-notif" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                    </label>
                  </div>
                  <div className="space-y-3 ml-8">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-email-campaign" />
                      Chiến dịch mới
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-email-koc" />
                      Hoạt động KOC
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-email-report" />
                      Báo cáo hàng tuần
                    </label>
                  </div>
                </div>

                {/* SMS Notifications */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <HiOutlinePhone className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Thông báo SMS</h4>
                        <p className="text-sm text-gray-600 mt-1">Nhận thông báo khẩn cấp qua tin nhắn SMS</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" data-testid="toggle-sms-notif" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                    </label>
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <HiOutlineBell className="w-5 h-5 text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Thông báo đẩy</h4>
                        <p className="text-sm text-gray-600 mt-1">Nhận thông báo realtime trên thiết bị di động</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked data-testid="toggle-push-notif" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff0086]"></div>
                    </label>
                  </div>
                  <div className="space-y-3 ml-8">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-push-message" />
                      Tin nhắn mới
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-push-order" />
                      Đơn hàng mới
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" className="w-4 h-4 text-[#ff0086] border-gray-300 rounded focus:ring-[#ff0086]" data-testid="checkbox-push-update" />
                      Cập nhật hệ thống
                    </label>
                  </div>
                </div>

                {/* Notification Frequency */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <HiOutlineClock className="w-4 h-4 text-gray-500" />
                    Tần suất gửi thông báo
                  </label>
                  <Select defaultValue="realtime">
                    <SelectTrigger className="w-full" data-testid="select-notif-frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Realtime</SelectItem>
                      <SelectItem value="hourly">Mỗi giờ</SelectItem>
                      <SelectItem value="daily">Mỗi ngày</SelectItem>
                      <SelectItem value="weekly">Mỗi tuần</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Integration Settings Tab */}
            {selectedSettingsTab === 'integrations' && (
              <div className="space-y-6" data-testid="tab-content-integrations">
                {/* API Configuration */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <HiOutlineCodeBracket className="w-4 h-4 text-gray-500" />
                    Cấu hình API
                  </h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">API Key</p>
                          <p className="text-xs text-gray-500 mt-1 font-mono">ikk_live_********************************</p>
                        </div>
                        <Button variant="outline" size="sm" data-testid="btn-regenerate-api">
                          <HiOutlineArrowPath className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Rate Limit</label>
                      <Select defaultValue="1000">
                        <SelectTrigger className="w-full" data-testid="select-rate-limit">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="100">100 requests/phút</SelectItem>
                          <SelectItem value="500">500 requests/phút</SelectItem>
                          <SelectItem value="1000">1000 requests/phút</SelectItem>
                          <SelectItem value="unlimited">Không giới hạn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Third-party Integrations */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <HiOutlineSquares2X2 className="w-4 h-4 text-gray-500" />
                    Tích hợp bên thứ ba
                  </h4>
                  <div className="space-y-3">
                    {/* TikTok */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                            <FaTiktok className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">TikTok Marketing API</p>
                            <Badge className="mt-1 bg-green-100 text-green-700 hover:bg-green-100">Đã kết nối</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" data-testid="btn-config-tiktok">
                          <HiOutlineCog6Tooth className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Instagram */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <FaInstagram className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Instagram Graph API</p>
                            <Badge className="mt-1 bg-green-100 text-green-700 hover:bg-green-100">Đã kết nối</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" data-testid="btn-config-instagram">
                          <HiOutlineCog6Tooth className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* YouTube */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
                            <FaYoutube className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">YouTube Data API</p>
                            <Badge className="mt-1 bg-gray-100 text-gray-700 hover:bg-gray-100">Chưa kết nối</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" data-testid="btn-connect-youtube">
                          <HiOutlineLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Facebook */}
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                            <FaFacebookF className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Facebook Marketing API</p>
                            <Badge className="mt-1 bg-green-100 text-green-700 hover:bg-green-100">Đã kết nối</Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" data-testid="btn-config-facebook">
                          <HiOutlineCog6Tooth className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Webhook Configuration */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <HiOutlineServer className="w-4 h-4 text-gray-500" />
                    Webhook
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Webhook URL</label>
                      <input
                        type="url"
                        defaultValue="https://api.ikk.vn/webhook"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ff0086] focus:border-transparent"
                        data-testid="input-webhook-url"
                      />
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-start gap-2">
                        <HiOutlineInformationCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                        <p className="text-xs text-blue-700">Webhook sẽ nhận thông báo khi có sự kiện: chiến dịch mới, đơn hàng mới, thanh toán thành công</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </IKKAdminLayout>
  )
}
