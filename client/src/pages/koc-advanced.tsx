import { useState } from 'react';
import { Link } from 'wouter';
import { 
  Star, 
  Heart, 
  Users, 
  TrendingUp, 
  Award, 
  Target, 
  DollarSign, 
  CheckCircle,
  Play,
  Camera,
  Video,
  Share2,
  MessageCircle,
  Gift,
  Clock,
  Smartphone,
  Eye,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Crown,
  Trophy,
  Zap,
  Shield,
  Globe,
  BarChart3,
  Brain,
  Users2,
  Lightbulb,
  Rocket,
  Network,
  BookOpen,
  PieChart,
  BadgeCheck,
  GraduationCap,
  Building,
  MapPin,
  Calendar,
  PhoneCall,
  Mail,
  Youtube,
  Instagram,
  Settings,
  User
} from 'lucide-react';
import { FaTiktok, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function KOCAdvancedPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const advancedFeatures = [
    {
      icon: BarChart3,
      title: "Analytics Pro",
      description: "Theo dõi performance chi tiết với insights AI và báo cáo tùy chỉnh",
      benefits: ["Real-time analytics", "AI insights", "Custom reports", "ROI tracking"],
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Network,
      title: "KOC Network",
      description: "Kết nối với network KOC elite và collaborate trong các dự án lớn",
      benefits: ["Elite community", "Collaboration tools", "Joint campaigns", "Mentorship"],
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Brain,
      title: "AI Content Assistant",
      description: "Công cụ AI hỗ trợ tạo content, tối ưu hashtag và chiến lược posting",
      benefits: ["Content suggestions", "Hashtag optimization", "Best timing", "Trend alerts"],
      iconColor: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: GraduationCap,
      title: "KOC Academy",
      description: "Chương trình đào tạo nâng cao với certificate từ các chuyên gia hàng đầu",
      benefits: ["Expert courses", "Certificates", "Live workshops", "1-on-1 coaching"],
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Crown,
      title: "Premium Campaigns",
      description: "Tiếp cận các chiến dịch độc quyền với thương hiệu luxury và thưởng cao",
      benefits: ["Exclusive brands", "Higher rewards", "Priority access", "VIP support"],
      iconColor: "text-[#ff0086]",
      bgColor: "bg-pink-50"
    },
    {
      icon: Rocket,
      title: "Growth Accelerator",
      description: "Công cụ tăng trưởng với automation và strategic planning",
      benefits: ["Automated posting", "Growth strategies", "Audience analysis", "Competitor insights"],
      iconColor: "text-cyan-600",
      bgColor: "bg-cyan-50"
    }
  ];

  const learningPaths = [
    {
      title: "Content Mastery",
      level: "Beginner to Pro",
      duration: "8 tuần",
      modules: 12,
      students: 2340,
      rating: 4.9,
      description: "Từ cơ bản đến nâng cao về tạo content viral và engaging",
      topics: ["Storytelling", "Visual design", "Video editing", "Copywriting"]
    },
    {
      title: "Brand Partnership Pro",
      level: "Intermediate",
      duration: "6 tuần", 
      modules: 8,
      students: 1890,
      rating: 4.8,
      description: "Kỹ năng đàm phán và xây dựng mối quan hệ dài hạn với thương hiệu",
      topics: ["Negotiation", "Contract review", "Relationship building", "Portfolio presentation"]
    },
    {
      title: "Analytics & ROI Optimization",
      level: "Advanced",
      duration: "4 tuần",
      modules: 6,
      students: 1200,
      rating: 5.0,
      description: "Phân tích dữ liệu và tối ưu ROI cho campaigns",
      topics: ["Data analysis", "ROI calculation", "A/B testing", "Performance optimization"]
    }
  ];

  const successMetrics = [
    {
      icon: Users2,
      value: "15K+",
      label: "Active KOC Elite",
      growth: "+23%"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Success Rate",
      growth: "+12%"
    },
    {
      icon: DollarSign,
      value: "2.5B+",
      label: "Total Earnings",
      growth: "+45%"
    },
    {
      icon: Award,
      value: "500+",
      label: "Brand Partners",
      growth: "+30%"
    }
  ];

  const eliteKOCs = [
    {
      name: "Đỗ Minh Tú",
      role: "Beauty & Lifestyle KOC",
      tier: "Diamond",
      followers: "150K+",
      earnings: "45M/tháng",
      specialties: ["Skincare", "Makeup", "Fashion"],
      achievements: ["Top 1% earner", "Brand ambassador", "Course instructor"],
      avatar: ""
    },
    {
      name: "Lê Quang Minh",
      role: "Tech Reviewer",
      tier: "Platinum",
      followers: "200K+",
      earnings: "38M/tháng",
      specialties: ["Gadgets", "Gaming", "Mobile"],
      achievements: ["Tech expert", "YouTube partner", "Innovation award"],
      avatar: ""
    },
    {
      name: "Nguyễn Thảo My",
      role: "Food & Travel",
      tier: "Gold",
      followers: "80K+",
      earnings: "25M/tháng",
      specialties: ["F&B", "Travel", "Culture"],
      achievements: ["Food blogger", "Travel guide", "Cultural ambassador"],
      avatar: ""
    }
  ];

  const upcomingEvents = [
    {
      title: "KOC Summit 2025",
      date: "15-16 Tháng 3",
      location: "TP.HCM",
      type: "Conference",
      attendees: "500+ KOC",
      description: "Sự kiện KOC lớn nhất năm với các chuyên gia hàng đầu"
    },
    {
      title: "Brand Networking Night",
      date: "28 Tháng 2",
      location: "Hà Nội",
      type: "Networking",
      attendees: "100+ Brands",
      description: "Gặp gỡ trực tiếp với đại diện các thương hiệu lớn"
    },
    {
      title: "Content Creation Workshop",
      date: "12 Tháng 3",
      location: "Online",
      type: "Workshop",
      attendees: "Unlimited",
      description: "Workshop chuyên sâu về tạo content viral với AI"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Badge className="bg-[#ff0086] text-white px-4 py-2">
                  <Crown className="w-4 h-4 mr-2" />
                  KOC Elite Program
                </Badge>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                <span className="text-[#ff0086]">
                  Nâng tầm
                </span>
                <br />
                <span>sự nghiệp KOC</span>
                <br />
                <span>của bạn</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Chương trình độc quyền dành cho KOC professional. Truy cập công cụ AI, 
                analytics nâng cao, và kết nối với network KOC elite toàn quốc.
              </p>
              
              {/* Feature highlights */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#ff0086]/10 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-[#ff0086]" />
                  </div>
                  <span className="text-gray-700 font-medium">AI Content Assistant</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#ff0086]/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-[#ff0086]" />
                  </div>
                  <span className="text-gray-700 font-medium">Analytics Pro</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#ff0086]/10 rounded-lg flex items-center justify-center">
                    <Network className="w-5 h-5 text-[#ff0086]" />
                  </div>
                  <span className="text-gray-700 font-medium">Elite Network</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#ff0086]/10 rounded-lg flex items-center justify-center">
                    <Crown className="w-5 h-5 text-[#ff0086]" />
                  </div>
                  <span className="text-gray-700 font-medium">Premium Campaigns</span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  size="lg" 
                  className="bg-[#ff0086] hover:bg-[#e6007a] text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Tham gia Elite Program
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-[#ff0086] text-[#ff0086] hover:bg-[#ff0086] hover:text-white px-8 py-4 rounded-xl transition-all duration-300"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Xem demo tính năng
                </Button>
              </div>
            </div>
            
            {/* Right Visual - Elite Dashboard Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl">
                {/* Elite Status Card */}
                <div className="bg-[#ff0086] rounded-2xl p-6 text-white mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Crown className="w-8 h-8" />
                      <div>
                        <div className="font-bold text-lg">Diamond KOC</div>
                        <div className="text-sm opacity-90">Elite Status</div>
                      </div>
                    </div>
                    <Badge className="bg-white/20 text-white">Top 1%</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold">8.5M</div>
                      <div className="text-sm opacity-90">Monthly Reach</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">4.9</div>
                      <div className="text-sm opacity-90">AI Score</div>
                    </div>
                  </div>
                </div>
                
                {/* Analytics Preview */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Performance Analytics</h4>
                    <Badge className="bg-green-100 text-green-700">Live</Badge>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Engagement Rate</span>
                        <span className="font-semibold text-green-600">+15%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Content Quality</span>
                        <span className="font-semibold text-blue-600">Excellent</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                  </div>
                </div>
                
                {/* AI Suggestions */}
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">AI Content Suggestions</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                      <div className="font-medium text-gray-900">"Beauty trend prediction"</div>
                      <div className="text-gray-600">Optimal posting: 7-9 PM</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                      <div className="font-medium text-gray-900">"Collab opportunity"</div>
                      <div className="text-gray-600">Match: 95% compatibility</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#ff0086] rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-gray-50" data-section="metrics">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <Card key={index} className="text-center border border-gray-100 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-[#ff0086] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <metric.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
                  <Badge className="bg-green-100 text-green-700">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {metric.growth}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20" data-section="features">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tính năng <span className="text-[#ff0086]">độc quyền</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Công cụ chuyên nghiệp giúp KOC Elite tối ưu hiệu suất và tăng thu nhập
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className={`group border border-gray-100 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-[#ff0086]' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* KOC Academy */}
      <section className="py-20 bg-gray-50" data-section="academy">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-[#ff0086]">KOC Academy</span> - Nâng cao kỹ năng
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chương trình đào tạo chuyên sâu với certificate được công nhận
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <Card key={index} className="border border-gray-100 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{path.level}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{path.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{path.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-gray-500">Thời gian</div>
                      <div className="font-semibold">{path.duration}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Modules</div>
                      <div className="font-semibold">{path.modules} bài học</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-500 mb-2">Topics chính:</div>
                    <div className="flex flex-wrap gap-2">
                      {path.topics.map((topic, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500">
                      {path.students.toLocaleString()} students
                    </div>
                    <Button size="sm" className="bg-[#ff0086] hover:bg-[#e6007a]">
                      Tham gia ngay
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Elite KOC Showcase */}
      <section className="py-20" data-section="elite-kocs">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Gặp gỡ <span className="text-[#ff0086]">Elite KOC</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Những KOC hàng đầu đang tạo ra thành công vượt trội với IKK Platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {eliteKOCs.map((koc, index) => (
              <Card key={index} className="border border-gray-100 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-8">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-[#ff0086] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{koc.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{koc.name}</h4>
                      <p className="text-sm text-gray-600">{koc.role}</p>
                      <Badge className={`text-xs mt-1 ${
                        koc.tier === 'Diamond' ? 'bg-purple-100 text-purple-700' :
                        koc.tier === 'Platinum' ? 'bg-gray-100 text-gray-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {koc.tier} Tier
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center bg-gray-50 rounded-lg p-3">
                      <div className="font-bold text-lg text-[#ff0086]">{koc.followers}</div>
                      <div className="text-xs text-gray-600">Total Followers</div>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-3">
                      <div className="font-bold text-lg text-green-600">{koc.earnings}</div>
                      <div className="text-xs text-gray-600">Monthly Income</div>
                    </div>
                  </div>
                  
                  {/* Specialties */}
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-900 mb-2">Specialties:</div>
                    <div className="flex flex-wrap gap-2">
                      {koc.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-2">Achievements:</div>
                    <div className="space-y-2">
                      {koc.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Trophy className="w-4 h-4 text-[#ff0086]" />
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-50" data-section="events">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sự kiện <span className="text-[#ff0086]">sắp tới</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tham gia các sự kiện độc quyền để networking và nâng cao kỹ năng
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border border-gray-100 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-[#ff0086]/10 text-[#ff0086]">
                      {event.type}
                    </Badge>
                    <div className="text-sm text-gray-500">{event.attendees}</div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-[#ff0086]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-[#ff0086]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-[#ff0086] hover:bg-[#e6007a]">
                    Đăng ký tham gia
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden" data-section="cta">
        {/* Background */}
        <div className="absolute inset-0 bg-[#ff0086]"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="mb-8">
            <h2 className="text-5xl font-bold mb-6">
              Sẵn sàng trở thành Elite KOC?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Gia nhập cộng đồng KOC Elite và khai phá tiềm năng thu nhập không giới hạn với công nghệ AI tiên tiến
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-[#ff0086] hover:bg-gray-100 font-semibold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Ứng tuyển Elite Program
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-[#ff0086] px-12 py-4 rounded-xl transition-all duration-300"
            >
              Tư vấn cá nhân hóa
              <PhoneCall className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-lg opacity-90 mb-4">
              Yêu cầu tối thiểu: 10K+ followers, 6 tháng kinh nghiệm KOC
            </p>
            <div className="flex justify-center items-center gap-4">
              <Badge className="bg-white/20 text-white">
                <Shield className="w-4 h-4 mr-2" />
                Được xét duyệt kỹ lưỡng
              </Badge>
              <Badge className="bg-white/20 text-white">
                <Users className="w-4 h-4 mr-2" />
                Chỉ 100 slot/tháng
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - sử dụng design tương tự trang home */}
      <footer className="relative overflow-hidden" data-section="footer">
        {/* Background */}
        <div className="absolute inset-0 bg-white"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#ff0086]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-[#ff0086] rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">IKK</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#ff0086]">
                    KOC Elite
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">Professional KOC Platform</p>
                </div>
              </div>
              
              <p className="text-gray-700 text-base mb-6 max-w-lg leading-relaxed">
                Nền tảng KOC Elite với công nghệ AI tiên tiến. Nâng tầm sự nghiệp content creator 
                và kết nối với các thương hiệu hàng đầu thế giới.
              </p>
              
              {/* Social Media */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Theo dõi chúng tôi:</h4>
                <div className="flex items-center space-x-4">
                  <a href="#" className="group w-11 h-11 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-[#ff0086] hover:border-[#ff0086] transition-all duration-300 shadow-sm hover:shadow-md">
                    <FaFacebookF className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </a>
                  <a href="#" className="group w-11 h-11 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-[#ff0086] hover:border-[#ff0086] transition-all duration-300 shadow-sm hover:shadow-md">
                    <FaInstagram className="w-5 h-5 text-pink-600 group-hover:text-white transition-colors" />
                  </a>
                  <a href="#" className="group w-11 h-11 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-[#ff0086] hover:border-[#ff0086] transition-all duration-300 shadow-sm hover:shadow-md">
                    <FaYoutube className="w-5 h-5 text-red-600 group-hover:text-white transition-colors" />
                  </a>
                  <a href="#" className="group w-11 h-11 bg-white border border-gray-200 rounded-xl flex items-center justify-center hover:bg-[#ff0086] hover:border-[#ff0086] transition-all duration-300 shadow-sm hover:shadow-md">
                    <FaTiktok className="w-5 h-5 text-gray-900 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Elite Program */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Elite Program</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="group flex items-center text-gray-600 hover:text-[#ff0086] transition-colors">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-3 group-hover:bg-[#ff0086] transition-colors"></div>
                    Ứng tuyển Elite
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex items-center text-gray-600 hover:text-[#ff0086] transition-colors">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-3 group-hover:bg-[#ff0086] transition-colors"></div>
                    KOC Academy
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex items-center text-gray-600 hover:text-[#ff0086] transition-colors">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-3 group-hover:bg-[#ff0086] transition-colors"></div>
                    AI Tools
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex items-center text-gray-600 hover:text-[#ff0086] transition-colors">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-3 group-hover:bg-[#ff0086] transition-colors"></div>
                    Premium Campaigns
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">Community</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="group flex items-center text-gray-600 hover:text-[#ff0086] transition-colors">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-3 group-hover:bg-[#ff0086] transition-colors"></div>
                    Elite Network
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex items-center text-gray-600 hover:text-[#ff0086] transition-colors">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-3 group-hover:bg-[#ff0086] transition-colors"></div>
                    Events & Workshops
                  </a>
                </li>
                <li>
                  <a href="/koc" className="group flex items-center text-gray-600 hover:text-[#ff0086] transition-colors">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-3 group-hover:bg-[#ff0086] transition-colors"></div>
                    KOC Landing
                  </a>
                </li>
                <li>
                  <a href="/koc-app" className="group flex items-center text-gray-600 hover:text-[#ff0086] transition-colors">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-3 group-hover:bg-[#ff0086] transition-colors"></div>
                    KOC Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200/60 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-sm text-gray-500">
                © 2025 <span className="font-semibold text-[#ff0086]">IKK Elite Platform</span>. All rights reserved.
              </div>
              <div className="text-sm text-gray-500 flex items-center space-x-2">
                <Crown className="w-4 h-4 text-[#ff0086]" />
                <span>Powered by AI • Designed for Elite KOC</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}