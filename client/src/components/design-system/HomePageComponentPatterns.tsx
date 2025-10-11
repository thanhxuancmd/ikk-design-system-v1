import { Menu, ClipboardList, DollarSign, Video, Megaphone, Grid3X3, Palette, ShoppingBag, Camera, Plane, Shirt, Heart, Trophy, Users, Award, Clock, Target, Star, User, MessageCircle, Info, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';

export default function HomePageComponentPatterns() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">10 Mẫu Component Quan Trọng từ Home Page</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Các component patterns được trích xuất từ trang chủ, tuân thủ Design Principles
        </p>
      </div>

      {/* 1. Navigation Megamenu Component */}
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Menu className="w-5 h-5 text-[#ff0086]" />
          1. Navigation Megamenu
        </h3>
        
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#ff0086]/10 rounded-lg flex items-center justify-center">
                  <ClipboardList className="w-4 h-4 text-[#ff0086]" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">DỊCH VỤ</h4>
              </div>
              <ul className="space-y-1.5">
                <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Nhà hàng, cà phê</a></li>
                <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Du lịch</a></li>
                <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Giải trí</a></li>
              </ul>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">SẢN PHẨM</h4>
              </div>
              <ul className="space-y-1.5">
                <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Mỹ phẩm</a></li>
                <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Đồ ăn, thức uống</a></li>
                <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Mẹ và bé</a></li>
              </ul>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Video className="w-4 h-4 text-green-500" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">NỘI DUNG</h4>
              </div>
              <ul className="space-y-1.5">
                <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Hóa dược phẩm</a></li>
                <li><a className="block px-2 py-1.5 text-sm text-gray-600 hover:text-[#ff0086] hover:bg-gray-50 rounded-md transition-colors">Thú cưng</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <a className="text-sm text-gray-600 hover:text-[#ff0086] transition-colors">Hướng dẫn KOC mới</a>
                <a className="text-sm text-gray-600 hover:text-[#ff0086] transition-colors">Chính sách hỗ trợ</a>
              </div>
              <button className="px-4 py-2 bg-[#ff0086] text-white text-sm font-medium rounded-lg hover:bg-[#e6007a] transition-colors">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>

      {/* 2. Event Banner Carousel */}
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-[#ff0086]" />
          2. Event Banner Carousel
        </h3>
        
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {[
            { title: "Lễ hội Beauty IKK", subtitle: "28/8 (Thứ 5) 2:00 PM", tag: "TRỰC TIẾP", color: "from-pink-500 to-rose-500" },
            { title: "Thử thách Review", subtitle: "28/8 (Thứ 5) 7:00 PM", tag: "Báo trước", color: "from-blue-500 to-indigo-500" },
            { title: "Ẩm thực & Du lịch", subtitle: "29/8 (Thứ 6) 12:00 PM", tag: "Báo trước", color: "from-green-500 to-emerald-500" }
          ].map((banner, index) => (
            <div key={index} className="flex-shrink-0 w-80 h-48 relative rounded-xl overflow-hidden group cursor-pointer">
              <div className={`absolute inset-0 bg-gradient-to-br ${banner.color} opacity-90`}></div>
              <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                <div>
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold mb-3">
                    {banner.tag}
                  </span>
                  <h4 className="text-xl font-bold mb-1">{banner.title}</h4>
                  <p className="text-sm opacity-90">{banner.subtitle}</p>
                </div>
                <button className="self-start px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Category Icon Grid */}
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Grid3X3 className="w-5 h-5 text-[#ff0086]" />
          3. Category Icon Grid
        </h3>
        
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {[
            { icon: Palette, label: "Làm đẹp", color: "from-pink-100 to-rose-100", iconColor: "text-pink-600" },
            { icon: ShoppingBag, label: "Mua sắm", color: "from-blue-100 to-indigo-100", iconColor: "text-blue-600" },
            { icon: Camera, label: "Ẩm thực", color: "from-orange-100 to-amber-100", iconColor: "text-orange-600" },
            { icon: Plane, label: "Du lịch", color: "from-green-100 to-emerald-100", iconColor: "text-green-600" },
            { icon: Shirt, label: "Thời trang", color: "from-rose-100 to-pink-100", iconColor: "text-rose-600" },
            { icon: Heart, label: "Lối sống", color: "from-purple-100 to-violet-100", iconColor: "text-purple-600" },
            { icon: Trophy, label: "Thể thao", color: "from-red-100 to-rose-100", iconColor: "text-red-600" },
            { icon: Video, label: "Giải trí", color: "from-yellow-100 to-amber-100", iconColor: "text-yellow-600" }
          ].map((category, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className={`w-14 h-14 bg-gradient-to-br ${category.color} group-hover:shadow-md rounded-xl flex items-center justify-center mb-2 transition-all duration-300`}>
                <category.icon className={`w-7 h-7 ${category.iconColor}`} />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
                {category.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Popular Streamer Card */}
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-[#ff0086]" />
          4. Popular Streamer Card
        </h3>
        
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {[
            { name: "IKKBeauty", category: "Làm đẹp/Mỹ phẩm", viewers: "10,754", isLive: true },
            { name: "TechGuruVN", category: "Đánh giá công nghệ", viewers: "7,535", isLive: true },
            { name: "FoodieLife", category: "Ẩm thực/Nấu ăn", viewers: "4,523", isLive: false }
          ].map((streamer, index) => (
            <div key={index} className="flex-shrink-0 group">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors min-w-[200px]">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{streamer.name.substring(0, 2)}</span>
                  </div>
                  {streamer.isLive && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-gray-900 truncate">{streamer.name}</div>
                  <div className="text-xs text-gray-500 mb-1 truncate">{streamer.category}</div>
                  <div className="text-xs text-pink-500 font-medium">{streamer.viewers} viewers</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Featured Campaign Banner */}
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#ff0086]" />
          5. Featured Campaign Banner
        </h3>
        
        <div className="relative bg-gradient-to-r from-[#ff0086] to-pink-600 rounded-2xl overflow-hidden h-48 md:h-64">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10 h-full flex items-center justify-between p-8">
            <div className="text-white max-w-2xl">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  Chiến dịch đặc biệt
                </span>
                <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                  MEGA REWARDS
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-3">Beauty Festival 2025</h3>
              <p className="text-lg mb-4 opacity-90">
                Lễ hội làm đẹp lớn nhất năm với tổng giải thưởng lên đến 500 triệu đồng
              </p>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>1,200+ KOC tham gia</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Còn 15 ngày</span>
                </div>
              </div>
            </div>
            <button className="bg-white text-[#ff0086] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Tham gia ngay
            </button>
          </div>
        </div>
      </div>

      {/* 6. Campaign Card */}
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-[#ff0086]" />
          6. Campaign Card
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden">
            <div className="relative overflow-hidden">
              <div className="w-full h-40 bg-gray-50">
                <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200"></div>
              </div>
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full font-medium">
                  Đang tuyển
                </span>
                <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-medium">
                  Urgent
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Maybelline Vietnam</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-current" />
                  <span className="text-xs font-medium">4.8</span>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                Review son môi Maybelline SuperStay Matte Ink
              </h4>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-[#ff0086]">2,000,000đ</span>
                <span className="text-xs text-gray-500">Còn 5 ngày</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-xs text-gray-500">67/100 KOC</span>
              </div>
              <button className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white py-2 rounded-lg text-sm font-medium transition-colors">
                Ứng tuyển ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Profile Avatar with Status */}
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-[#ff0086]" />
          7. Profile Avatar with Status
        </h3>
        
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {[
            { name: "Nguyễn Thị A", status: "Online", avatar: "https://via.placeholder.com/40/FF0086/FFFFFF?text=NA" },
            { name: "Trần Văn B", status: "Offline", avatar: "https://via.placeholder.com/40/007BFF/FFFFFF?text=TB" },
            { name: "Lê Thị C", status: "Busy", avatar: "https://via.placeholder.com/40/FFA500/FFFFFF?text=LC" }
          ].map((user, index) => (
            <div key={index} className="flex-shrink-0 flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors min-w-[180px]">
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                <span className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full ring-2 ring-white ${user.status === "Online" ? "bg-green-500" : user.status === "Busy" ? "bg-yellow-500" : "bg-gray-400"}`}></span>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Notification Card */}
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[#ff0086]" />
          8. Notification Card
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Thông báo hệ thống</p>
              <p className="text-sm text-blue-700">Chiến dịch "Beauty Festival 2025" đã bắt đầu. Hãy kiểm tra ngay!</p>
              <span className="text-xs text-blue-500">1 giờ trước</span>
            </div>
          </div>
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Cập nhật trạng thái</p>
              <p className="text-sm text-green-700">Yêu cầu rút tiền của bạn đã được xử lý thành công.</p>
              <span className="text-xs text-green-500">30 phút trước</span>
            </div>
          </div>
        </div>
      </div>

      {/* 9. Trending Topic Card */}
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#ff0086]" />
          9. Trending Topic Card
        </h3>
        
        <div className="space-y-4">
          {[
            { title: "#ReviewSonMoi", count: "1.2M bài đăng", trend: "up" },
            { title: "#ThoiTrangDuLich", count: "850K bài đăng", trend: "up" },
            { title: "#AnUongTaiGia", count: "500K bài đăng", trend: "down" }
          ].map((topic, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-semibold text-gray-900">{topic.title}</p>
                <p className="text-sm text-gray-500">{topic.count}</p>
              </div>
              {topic.trend === "up" ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 10. KOC Leaderboard Card */}
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-[#ff0086]" />
          10. KOC Leaderboard Card
        </h3>
        
        <div className="space-y-4">
          {[
            { name: "IKKBeauty", score: "9,876", rank: 1, avatar: "https://via.placeholder.com/40/FF0086/FFFFFF?text=IB" },
            { name: "Fashionista", score: "9,123", rank: 2, avatar: "https://via.placeholder.com/40/007BFF/FFFFFF?text=FS" },
            { name: "FoodExplorer", score: "8,543", rank: 3, avatar: "https://via.placeholder.com/40/FFA500/FFFFFF?text=FE" }
          ].map((koc, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="font-bold text-lg text-[#ff0086] w-6">{koc.rank}.</span>
              <img src={koc.avatar} alt={koc.name} className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{koc.name}</p>
                <p className="text-sm text-gray-500">Điểm: {koc.score}</p>
              </div>
              <Trophy className="w-5 h-5 text-yellow-500 fill-current" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
]
