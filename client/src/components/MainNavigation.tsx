import { useState } from 'react';
import { Menu, X, ChevronDown, Home, Palette, Type, Navigation, MousePointer, Play, MessageSquare, Trophy, User, Smartphone, Settings, Layout, Crown, Grid, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MainNavigationProps {
  onSectionChange: (sectionId: string) => void;
  activeSection: string;
}

export default function MainNavigation({ onSectionChange, activeSection }: MainNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  // Following Apple HIG structure: Getting Started, Foundations, Patterns, Components, Inputs, Technologies
  const menuStructure = [
    {
      id: 'overview',
      title: 'Tổng quan',
      icon: Home,
      description: 'Tạo ứng dụng hoặc game cảm thấy như ở nhà trên mọi nền tảng bạn hỗ trợ'
    },
    {
      id: 'foundations',
      title: 'Foundations',
      icon: Palette,
      description: 'Hiểu cách các yếu tố thiết kế cơ bản giúp bạn tạo ra trải nghiệm phong phú',
      hasDropdown: true,
      items: [
        { id: 'colors', title: 'Color', section: 'ColorPalette', description: 'Sử dụng màu sắc một cách khôn ngoan để tăng cường giao tiếp' },
        { id: 'typography', title: 'Typography', section: 'Typography', description: 'Typography rõ ràng và có cấu trúc giúp người dùng dễ dàng điều hướng' },
        { id: 'layout', title: 'Layout', section: 'LayoutPatterns', description: 'Layout nhất quán thích ứng với nhiều ngữ cảnh khác nhau' },
        { id: 'icons', title: 'Icons', section: 'InteractiveElements', description: 'Icons truyền đạt ý nghĩa một cách ngắn gọn và rõ ràng' },
        { id: 'materials', title: 'Materials', section: 'NavigationComponents', description: 'Materials định nghĩa độ mờ và hiệu ứng blur của các thành phần UI' }
      ]
    },
    {
      id: 'patterns',
      title: 'Patterns', 
      icon: Grid,
      description: 'Nhận hướng dẫn thiết kế để hỗ trợ các hành động, tác vụ và trải nghiệm phổ biến của người dùng',
      hasDropdown: true,
      items: [
        { id: 'live-streaming', title: 'Live streaming', section: 'LiveStreamComponents', description: 'Patterns cho trải nghiệm phát trực tiếp' },
        { id: 'chat-messaging', title: 'Chat & messaging', section: 'ChatSystem', description: 'Patterns cho hệ thống chat và tin nhắn' },
        { id: 'user-profiles', title: 'User profiles', section: 'UserProfileComponents', description: 'Patterns cho hồ sơ người dùng và thông tin cá nhân' },
        { id: 'ranking-leaderboards', title: 'Ranking & leaderboards', section: 'RankingSystem', description: 'Patterns cho bảng xếp hạng và thành tích' }
      ]
    },
    {
      id: 'components',
      title: 'Components',
      icon: MousePointer,
      description: 'Học cách sử dụng và tùy chỉnh các thành phần do hệ thống xác định',
      hasDropdown: true,
      items: [
        { id: 'soop-live-components', title: 'SOOP Live Components', section: 'SOOPLiveComponents', description: 'Components thực tế từ nền tảng SOOPLIVE' },
        { id: 'affiliate-components', title: 'Affiliate Marketing', section: 'AffiliateComponents', description: 'Components cho nền tảng affiliate marketing và KOC' },
        { id: 'ecommerce-components', title: 'E-Commerce', section: 'ECommerceComponents', description: 'Components cho website thương mại điện tử' },
        { id: 'stream-cards', title: 'Stream cards', section: 'StreamCards', description: 'Thẻ hiển thị thông tin stream' },
        { id: 'event-banners', title: 'Event banners', section: 'EventBanners', description: 'Banner quảng bá sự kiện và giải đấu' },
        { id: 'esports-components', title: 'E-sports components', section: 'EsportsComponents', description: 'Components dành riêng cho e-sports' },
        { id: 'admin-components', title: 'Admin components', section: 'AdminComponents', description: 'Components quản trị hệ thống' }
      ]
    },
    {
      id: 'inputs',
      title: 'Inputs',
      icon: Type,
      description: 'Tìm hiểu về các phương pháp khác nhau mà người dùng sử dụng để điều khiển ứng dụng',
      hasDropdown: true,
      items: [
        { id: 'mobile-inputs', title: 'Mobile inputs', section: 'MobileComponents', description: 'Input patterns cho thiết bị di động' },
        { id: 'gaming-inputs', title: 'Gaming inputs', section: 'SpecialFeatures', description: 'Input patterns cho gaming và tương tác game' }
      ]
    },
    {
      id: 'technologies',
      title: 'Technologies',
      icon: Crown,
      description: 'Khám phá các công nghệ, tính năng và dịch vụ bạn có thể tích hợp',
      hasDropdown: true,
      items: [
        { id: 'page-templates', title: 'Page templates', section: 'PageTemplates', description: 'Templates cho các trang chính của ứng dụng' },
        { id: 'section-components', title: 'Section components', section: 'SectionComponents', description: 'Components cho các sections và layouts' },
        { id: 'usage-guidelines', title: 'Usage guidelines', section: 'UsageGuidelines', description: 'Hướng dẫn sử dụng design system' },
        { id: 'code-snippets', title: 'Code snippets', section: 'CodeSnippets', description: 'Mẫu code và implementation' }
      ]
    }
  ];

  const toggleDropdown = (menuId: string) => {
    setOpenDropdowns(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation Bar - Apple HIG Style */}
      <nav 
        className="bg-background/80 border-b border-border/20 backdrop-blur-xl" 
        style={{
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderColor: 'rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Apple & SOOPLIVE Style */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                I
              </div>
              <div>
                <span className="text-xl font-bold text-primary">
                  IKK Design System
                </span>
                <div className="text-xs text-muted-foreground font-medium">Human Interface Guidelines</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {menuStructure.map((menu) => (
                <div key={menu.id} className="relative">
                  {menu.hasDropdown ? (
                    <div className="relative">
                      <Button
                        variant="ghost"
                        className="flex items-center gap-1 px-3 py-2 text-sm font-medium"
                        onClick={() => toggleDropdown(menu.id)}
                      >
                        <menu.icon className="w-4 h-4" />
                        {menu.title}
                        <ChevronDown className={`w-3 h-3 transition-transform ${
                          openDropdowns.includes(menu.id) ? 'rotate-180' : ''
                        }`} />
                      </Button>
                      
                      {openDropdowns.includes(menu.id) && (
                        <div 
                          className="absolute top-full left-0 mt-2 w-80 bg-background/95 border border-border/20 rounded-xl shadow-2xl z-50 backdrop-blur-xl"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                          }}
                        >
                          <div className="py-3">
                            {menu.items?.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => handleSectionClick(item.section)}
                                className={`w-full text-left px-4 py-3 transition-all duration-200 ${
                                  activeSection === item.section 
                                    ? 'bg-primary/10 text-primary font-medium border-l-2 border-primary' 
                                    : 'text-foreground hover:bg-accent/50'
                                }`}
                              >
                                <div className="font-medium text-sm">{item.title}</div>
                                {item.description && (
                                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    {item.description}
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium"
                      onClick={() => handleSectionClick(menu.id)}
                    >
                      <menu.icon className="w-4 h-4" />
                      {menu.title}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="space-y-2">
              {menuStructure.map((menu) => (
                <div key={menu.id}>
                  {menu.hasDropdown ? (
                    <div>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-3 text-left"
                        onClick={() => toggleDropdown(`mobile-${menu.id}`)}
                      >
                        <div className="flex items-center gap-3">
                          <menu.icon className="w-5 h-5" />
                          <span className="font-medium">{menu.title}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${
                          openDropdowns.includes(`mobile-${menu.id}`) ? 'rotate-180' : ''
                        }`} />
                      </Button>
                      
                      {openDropdowns.includes(`mobile-${menu.id}`) && (
                        <div className="ml-6 mt-2 space-y-1">
                          {menu.items?.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSectionClick(item.section)}
                              className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                                activeSection === item.section 
                                  ? 'bg-primary text-white' 
                                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                              }`}
                            >
                              {item.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-3"
                      onClick={() => handleSectionClick(menu.id)}
                    >
                      <menu.icon className="w-5 h-5 mr-3" />
                      {menu.title}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overlay for dropdowns */}
      {(openDropdowns.length > 0 || isMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setOpenDropdowns([]);
            setIsMenuOpen(false);
          }}
        />
      )}
    </>
  );
}