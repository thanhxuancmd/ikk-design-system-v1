import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { 
  HiTrophy as Trophy,
  HiCalendar as Calendar,
  HiChevronDown as ChevronDown,
  HiArrowUp as ArrowUp,
  HiInformationCircle as Info,
  HiChatBubbleLeftRight as MessageCircle,
  HiPlus as Plus
} from 'react-icons/hi2';
import { FaTiktok, FaInstagram, FaFacebookF } from 'react-icons/fa';
import IKKAdminLayout from "@/components/ikk-admin-layout";

export default function KOCRankingPage() {
  const [selectedTab, setSelectedTab] = useState('top-doanh-thu');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSocialChannel, setSelectedSocialChannel] = useState('all');

  return (
    <IKKAdminLayout>
      <section className="max-w-7xl mx-auto px-4 mb-12" data-testid="section-koc-ranking">
        <Card className="shadow-sm border border-gray-100">
          {/* Header with Trophy */}
          <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2" data-testid="title-koc-ranking">
                  Bảng top KOLs
                </CardTitle>
                <p className="text-sm text-gray-600" data-testid="subtitle-koc-ranking">
                  Bảng xếp hạng KOL dựa trên hiệu suất trong thời gian đã chọn
                </p>
              </div>
              <div className="ml-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg" data-testid="icon-trophy">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Three Tabs */}
            <div className="flex items-center gap-4 mb-6 border-b border-gray-200">
              <button
                onClick={() => setSelectedTab('top-doanh-thu')}
                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                  selectedTab === 'top-doanh-thu'
                    ? 'border-[#ff0086] text-[#ff0086]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                data-testid="tab-top-doanh-thu"
              >
                Top Doanh Thu
              </button>
              <button
                onClick={() => setSelectedTab('tang-truong-nhanh')}
                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                  selectedTab === 'tang-truong-nhanh'
                    ? 'border-[#ff0086] text-[#ff0086]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                data-testid="tab-tang-truong-nhanh"
              >
                Tăng trưởng nhanh
              </button>
              <button
                onClick={() => setSelectedTab('noi-dung-shopee')}
                className={`pb-3 px-4 text-sm font-medium transition-colors border-b-2 ${
                  selectedTab === 'noi-dung-shopee'
                    ? 'border-[#ff0086] text-[#ff0086]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                data-testid="tab-noi-dung-shopee"
              >
                Nổi dụng phổ biến trên Shopee
              </button>
            </div>

            {/* Filter Row 1 - Ngành hàng */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block" data-testid="label-nganh-hang">
                Ngành hàng
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-all"
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setSelectedCategory('phu-kien')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'phu-kien'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-phu-kien"
                >
                  Phụ Kiện Thời Trang
                </button>
                <button
                  onClick={() => setSelectedCategory('thoi-trang-nu')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'thoi-trang-nu'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-thoi-trang-nu"
                >
                  Thời Trang Nữ
                </button>
                <button
                  onClick={() => setSelectedCategory('sac-dep')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'sac-dep'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-sac-dep"
                >
                  Sắc Đẹp
                </button>
                <button
                  onClick={() => setSelectedCategory('van-phong-pham')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'van-phong-pham'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-van-phong-pham"
                >
                  Văn Phòng Phẩm
                </button>
                <button
                  onClick={() => setSelectedCategory('me-be')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'me-be'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-me-be"
                >
                  Mẹ & Bé
                </button>
                <button
                  onClick={() => setSelectedCategory('so-thich')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'so-thich'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-so-thich"
                >
                  Sở thích & Sưu tầm
                </button>
                <button
                  onClick={() => setSelectedCategory('tui-vi')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'tui-vi'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-tui-vi"
                >
                  Túi Ví Nữ
                </button>
                <button
                  onClick={() => setSelectedCategory('dien-thoai')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === 'dien-thoai'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-category-dien-thoai"
                >
                  Điện Thoại & Phụ Kiện
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  data-testid="btn-expand-categories"
                >
                  Mở rộng
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Row 2 - Kênh mạng xã hội */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block" data-testid="label-kenh-mang-xa-hoi">
                Kênh mạng xã hội
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedSocialChannel('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSocialChannel === 'all'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-social-all"
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setSelectedSocialChannel('shopee-live')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSocialChannel === 'shopee-live'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-social-shopee-live"
                >
                  Shopee Live
                </button>
                <button
                  onClick={() => setSelectedSocialChannel('shopee-video')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSocialChannel === 'shopee-video'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-social-shopee-video"
                >
                  Shopee Video
                </button>
                <button
                  onClick={() => setSelectedSocialChannel('facebook')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSocialChannel === 'facebook'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-social-facebook"
                >
                  Facebook
                </button>
                <button
                  onClick={() => setSelectedSocialChannel('tiktok')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSocialChannel === 'tiktok'
                      ? 'bg-[#ff0086] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid="filter-social-tiktok"
                >
                  Tiktok
                </button>
              </div>
            </div>

            {/* Time Period Selector */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700" data-testid="label-time-period">Theo Tuần</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-200">
                  <span className="text-sm text-gray-900" data-testid="text-date-range">21-09-2025 - 27-09-2025</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div className="text-sm text-gray-500" data-testid="text-last-update">
                Lần cập nhật gần nhất: <span className="font-medium text-gray-700">09:06:52 28-09-2025</span>
              </div>
            </div>

            {/* Ranking Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-rank">Xếp hạng</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-account">Tên tài khoản KOL</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-orders">Đơn hàng</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-gmv">GMV</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-followers">Người theo dõi</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-agency">Agency/MCN</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700" data-testid="header-actions">Hoạt động</th>
                  </tr>
                </thead>
                <tbody>
                  {/* KOL 1: Sam Official */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors" data-testid="row-kol-1">
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" data-testid="rank-1">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=sam"
                          alt="Sam Official"
                          className="w-10 h-10 rounded-full"
                          data-testid="avatar-kol-1"
                        />
                        <div>
                          <div className="font-medium text-gray-900" data-testid="name-kol-1">Sam Official</div>
                          <div className="text-xs text-gray-500" data-testid="username-kol-1">@sam.ngo</div>
                          <div className="flex items-center gap-2 mt-1">
                            <FaInstagram className="w-4 h-4 text-pink-600" data-testid="platform-instagram-1" />
                            <FaTiktok className="w-4 h-4 text-gray-800" data-testid="platform-tiktok-1" />
                            <FaFacebookF className="w-4 h-4 text-blue-600" data-testid="platform-facebook-1" />
                            <Badge variant="secondary" className="text-xs" data-testid="category-badge-1">Sắc Đẹp</Badge>
                            <span className="text-xs text-gray-500" data-testid="category-count-1">+2</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="orders-kol-1">&gt; 5k</span>
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="text-xs text-gray-500 mt-1" data-testid="orders-value-kol-1">&gt; đ10tr</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="gmv-kol-1">&gt; đ10tr</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900" data-testid="followers-kol-1">256.6k</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="agency-kol-1">Social Elite</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="btn-collab-kol-1">
                          Hợp tác
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1" data-testid="btn-add-list-kol-1">
                          <Plus className="w-4 h-4" />
                          Thêm vào danh sách
                        </Button>
                        <Button size="sm" variant="outline" data-testid="btn-chat-kol-1">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* KOL 2: Võ Hoàng Yến Official */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors" data-testid="row-kol-2">
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full" data-testid="rank-2">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=vohoangyen"
                          alt="Võ Hoàng Yến Official"
                          className="w-10 h-10 rounded-full"
                          data-testid="avatar-kol-2"
                        />
                        <div>
                          <div className="font-medium text-gray-900" data-testid="name-kol-2">Võ Hoàng Yến Official</div>
                          <div className="text-xs text-gray-500" data-testid="username-kol-2">@vo.hoangyen</div>
                          <div className="flex items-center gap-2 mt-1">
                            <FaInstagram className="w-4 h-4 text-pink-600" data-testid="platform-instagram-2" />
                            <FaTiktok className="w-4 h-4 text-gray-800" data-testid="platform-tiktok-2" />
                            <FaFacebookF className="w-4 h-4 text-blue-600" data-testid="platform-facebook-2" />
                            <Badge variant="secondary" className="text-xs" data-testid="category-badge-2">Sắc Đẹp</Badge>
                            <span className="text-xs text-gray-500" data-testid="category-count-2">+2</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="orders-kol-2">&gt; 5k</span>
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="text-xs text-gray-500 mt-1" data-testid="orders-value-kol-2">&gt; đ10tr</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="gmv-kol-2">&gt; đ10tr</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900" data-testid="followers-kol-2">164.4k</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="agency-kol-2">Woo!</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="btn-collab-kol-2">
                          Hợp tác
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1" data-testid="btn-add-list-kol-2">
                          <Plus className="w-4 h-4" />
                          Thêm vào danh sách
                        </Button>
                        <Button size="sm" variant="outline" data-testid="btn-chat-kol-2">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* KOL 3: Ngô Đức Duy */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors" data-testid="row-kol-3">
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full" data-testid="rank-3">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=ngoducduy"
                          alt="Ngô Đức Duy"
                          className="w-10 h-10 rounded-full"
                          data-testid="avatar-kol-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900" data-testid="name-kol-3">Ngô Đức Duy</div>
                          <div className="text-xs text-gray-500" data-testid="username-kol-3">@nguyenchannel</div>
                          <div className="flex items-center gap-2 mt-1">
                            <FaInstagram className="w-4 h-4 text-pink-600" data-testid="platform-instagram-3" />
                            <FaTiktok className="w-4 h-4 text-gray-800" data-testid="platform-tiktok-3" />
                            <FaFacebookF className="w-4 h-4 text-blue-600" data-testid="platform-facebook-3" />
                            <Badge variant="secondary" className="text-xs" data-testid="category-badge-3">Sắc Đẹp</Badge>
                            <span className="text-xs text-gray-500" data-testid="category-count-3">+2</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="orders-kol-3">&gt; 5k</span>
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="text-xs text-gray-500 mt-1" data-testid="orders-value-kol-3">&gt; đ10tr</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="gmv-kol-3">&gt; đ10tr</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900" data-testid="followers-kol-3">213.5k</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="agency-kol-3">BeyondK</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="btn-collab-kol-3">
                          Hợp tác
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1" data-testid="btn-add-list-kol-3">
                          <Plus className="w-4 h-4" />
                          Thêm vào danh sách
                        </Button>
                        <Button size="sm" variant="outline" data-testid="btn-chat-kol-3">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>

                  {/* KOL 4: Liêu Hà Trinh Official */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors" data-testid="row-kol-4">
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full" data-testid="rank-4">
                        <span className="text-sm font-bold text-gray-700">4</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=lieuhatrinh"
                          alt="Liêu Hà Trinh Official"
                          className="w-10 h-10 rounded-full"
                          data-testid="avatar-kol-4"
                        />
                        <div>
                          <div className="font-medium text-gray-900" data-testid="name-kol-4">Liêu Hà Trinh Official</div>
                          <div className="text-xs text-gray-500" data-testid="username-kol-4">@lieuhatrinh</div>
                          <div className="flex items-center gap-2 mt-1">
                            <FaInstagram className="w-4 h-4 text-pink-600" data-testid="platform-instagram-4" />
                            <FaTiktok className="w-4 h-4 text-gray-800" data-testid="platform-tiktok-4" />
                            <FaFacebookF className="w-4 h-4 text-blue-600" data-testid="platform-facebook-4" />
                            <Badge variant="secondary" className="text-xs" data-testid="category-badge-4">Sắc Đẹp</Badge>
                            <span className="text-xs text-gray-500" data-testid="category-count-4">+2</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="orders-kol-4">&gt; 5k</span>
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="text-xs text-gray-500 mt-1" data-testid="orders-value-kol-4">&gt; đ10tr</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900" data-testid="gmv-kol-4">&gt; đ10tr</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900" data-testid="followers-kol-4">248.9k</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-900" data-testid="agency-kol-4">Social Elite</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="btn-collab-kol-4">
                          Hợp tác
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1" data-testid="btn-add-list-kol-4">
                          <Plus className="w-4 h-4" />
                          Thêm vào danh sách
                        </Button>
                        <Button size="sm" variant="outline" data-testid="btn-chat-kol-4">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </IKKAdminLayout>
  );
}
