import { useState } from 'react';
import { Trash2, Clock, Heart, MapPin, PlusCircle, Bookmark, Share2, Crown, DollarSign, Users, Award } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CampaignItem {
  id: number;
  title: string;
  brand: string;
  brandLogo: string;
  commission: string;
  deadline: string;
  daysLeft: number;
  engagement: string;
  countdown: string;
  location: string;
  status: string;
  platform: string;
}

export default function SpecialKOCCampaigns() {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([
    {
      id: 1,
      title: "Ra mắt BST son mới",
      brand: "Maybelline",
      brandLogo: "/placeholder.svg",
      commission: "15%",
      deadline: "30/11/2025",
      daysLeft: 45,
      engagement: "2.5M",
      countdown: "Còn 45 ngày",
      location: "TP. Hồ Chí Minh",
      status: "Đang hoạt động",
      platform: "TikTok"
    },
    {
      id: 2,
      title: "Trải nghiệm tai nghe không dây",
      brand: "Sony",
      brandLogo: "/placeholder.svg",
      commission: "20%",
      deadline: "15/11/2025",
      daysLeft: 30,
      engagement: "3.8M",
      countdown: "Còn 30 ngày",
      location: "Toàn quốc",
      status: "Đang hoạt động",
      platform: "Instagram"
    },
    {
      id: 3,
      title: "Review quán cafe mới",
      brand: "The Coffee House",
      brandLogo: "/placeholder.svg",
      commission: "18%",
      deadline: "05/11/2025",
      daysLeft: 20,
      engagement: "1.9M",
      countdown: "Còn 20 ngày",
      location: "Hà Nội",
      status: "Sắp kết thúc",
      platform: "Facebook"
    }
  ]);

  const handleDeleteCampaign = (idToDelete: number) => {
    const campaignToDelete = campaigns.find(c => c.id === idToDelete);
    if (campaignToDelete) {
      setCampaigns(prev => prev.filter(c => c.id !== idToDelete));
      toast.success(`Đã xóa chiến dịch ${campaignToDelete.title} thành công`);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 mb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Chiến dịch KOC đặc sắc</h2>
          <p className="text-gray-600">Cơ hội hợp tác với các thương hiệu hàng đầu</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
            <span className="flex items-center space-x-2">
              <span>Bộ lọc</span>
            </span>
          </button>
          <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors">
            Xem tất cả
          </button>
        </div>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => {
          return (
            <Card key={campaign.id} className="bg-white rounded-xl border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group relative">
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteCampaign(campaign.id);
                }}
                className="absolute top-2 right-2 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 p-1 rounded-full transition-colors opacity-0 group-hover:opacity-100 z-20"
                data-testid={`delete-campaign-${campaign.id}`}
                title={`Xóa ${campaign.title}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <img src={campaign.brandLogo} alt={campaign.brand} className="w-10 h-10 rounded-lg" />
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#ff0086] transition-colors" data-testid={`title-${campaign.id}`}>
                        {campaign.title}
                      </h3>
                      <p className="text-sm text-gray-500" data-testid={`brand-${campaign.id}`}>{campaign.brand}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${campaign.status === 'Đang hoạt động' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`} data-testid={`status-${campaign.id}`}>
                    {campaign.status}
                  </span>
                </div>
                
                {/* Commission & Platform */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-lg font-bold text-[#ff0086]" data-testid={`commission-${campaign.id}`}>{campaign.commission}</div>
                  <div className="flex items-center space-x-1 text-xs font-medium text-gray-600">
                    <span className={`w-2 h-2 rounded-full ${campaign.platform === 'TikTok' ? 'bg-black' : campaign.platform === 'Instagram' ? 'bg-purple-500' : 'bg-blue-500'}`}></span>
                    <span data-testid={`platform-${campaign.id}`}>{campaign.platform}</span>
                  </div>
                </div>
                
                {/* Campaign Meta Info */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center space-x-1 ${campaign.daysLeft <= 7 ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                        <Clock className="w-3 h-3" />
                        <span data-testid={`text-deadline-${campaign.id}`}>
                          {campaign.daysLeft <= 7 
                            ? `Còn ${campaign.daysLeft} ngày` 
                            : campaign.deadline
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span data-testid={`text-engagement-${campaign.id}`}>{campaign.engagement}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs font-medium text-[#ff0086]">
                      <Clock className="w-3 h-3" />
                      <span data-testid={`text-countdown-${campaign.id}`}>{campaign.countdown}</span>
                    </div>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-center space-x-1 mb-3 text-xs text-gray-600">
                  <MapPin className="w-3 h-3 text-blue-500" />
                  <span data-testid={`text-location-${campaign.id}`}>{campaign.location}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors" data-testid={`button-apply-${campaign.id}`}>
                    <PlusCircle className="w-4 h-4 mr-1" />
                    Ứng tuyển ngay
                  </Button>
                  <Button variant="outline" size="sm" className="p-2 border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors group" data-testid={`button-bookmark-${campaign.id}`}>
                    <Bookmark className="w-4 h-4 text-gray-600 group-hover:text-[#ff0086]" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2 border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors group" data-testid={`button-share-${campaign.id}`}>
                    <Share2 className="w-4 h-4 text-gray-600 group-hover:text-[#ff0086]" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Statistics & CTA Section */}
      <div className="mt-8">
        <Card className="bg-white border-gray-100 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900" data-testid="stat-special-campaigns">48+</div>
              <div className="text-sm text-gray-600">Chiến dịch đặc sắc</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900" data-testid="stat-total-rewards">2.8B+</div>
              <div className="text-sm text-gray-600">Tổng giá trị thưởng (VNĐ)</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900" data-testid="stat-premium-kocs">156</div>
              <div className="text-sm text-gray-600">KOC Premium tham gia</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900" data-testid="stat-luxury-brands">24+</div>
              <div className="text-sm text-gray-600">Thương hiệu cao cấp</div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trở thành KOC Elite</h3>
            <p className="text-gray-600 mb-4">Tham gia các chiến dịch cao cấp với thưởng lên đến 120 triệu VNĐ</p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-[#ff0086] hover:bg-[#e6007a] text-white" data-testid="button-join-elite">
                <Crown className="w-4 h-4 mr-2" />
                Gia nhập Elite
              </Button>
              <Button variant="outline" data-testid="button-learn-more">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
