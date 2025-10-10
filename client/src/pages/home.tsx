import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { 
 
  HiOutlineSparkles, 
  HiOutlinePlusCircle,
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineEye,
  HiOutlineMapPin,
  HiOutlineBookmark,
  HiOutlineShoppingBag,
  HiUserPlus,
  HiOutlineVideoCamera,
  HiOutlineRocketLaunch,
  HiOutlineUsers,
  HiOutlineHeart,
  HiOutlineShare,
  HiOutlineDevicePhoneMobile,
  HiOutlineSquares2X2,
  HiOutlineTrophy,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
  HiOutlineChevronDown,
  HiOutlineMagnifyingGlass,
  HiOutlineBell,
  HiOutlineGlobeAlt,
  HiOutlineBolt,
  HiOutlineClipboardDocumentList,
  HiOutlineCurrencyDollar,
  HiOutlineCheckCircle,
  HiOutlineFunnel,
  HiOutlineArrowTrendingUp,
  HiOutlinePlay,
  HiOutlineBuildingStorefront
} from 'react-icons/hi2';
import { FaTiktok, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import MainNavigation from "@/components/MainNavigation";
import * as Avatar from '@radix-ui/react-avatar';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Separator from '@radix-ui/react-separator';
import * as Dialog from '@radix-ui/react-dialog';
import * as Collapsible from '@radix-ui/react-collapsible';
import * as Progress from '@radix-ui/react-progress';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { categories } from '@shared/categories';

export default function Home() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [megaMenuTimeout, setMegaMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [location, navigate] = useLocation();
  
  // Keyboard navigation state
  const [focusedMenuItemIndex, setFocusedMenuItemIndex] = useState<number>(-1);
  const [focusedColumnIndex, setFocusedColumnIndex] = useState<number>(0);
  const [kocDropdownOpen, setKocDropdownOpen] = useState(false);
  const [focusedKocItemIndex, setFocusedKocItemIndex] = useState<number>(-1);
  const [focusedMobileItemIndex, setFocusedMobileItemIndex] = useState<number>(-1);
  
  // Carousel state management
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Megamenu categories
  const serviceCategories = categories.filter(c => c.type === 'SERVICE' && c.category_id !== 'S001');
  const productCategories = categories.filter(c => c.type === 'PRODUCT' && c.category_id !== 'P001' && !c.parent_id);
  const productColumn1 = productCategories.slice(0, 9);
  const productColumn2 = productCategories.slice(9, 16);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number>(0);
  const [touchEndX, setTouchEndX] = useState<number>(0);
  
  // Menu item counts for navigation
  const megaMenuColumns = [
    serviceCategories.length, // DỊCH VỤ column
    productColumn1.length, // SẢN PHẨM column 1
    productColumn2.length + 1  // SẢN PHẨM column 2 (including "Xem tất cả")
  ];
  const kocMenuItems = 3; // KOC dropdown items
  const mobileMenuItems = 8; // Mobile menu items (6 main + 2 auth buttons)
  
  // Carousel configuration
  const bannerData = [
    {
      title: "Lễ hội Beauty IKK",
      subtitle: "28/8 (Thứ 5) 2:00 PM",
      description: "Đại tiệc influencer làm đẹp",
      tag: "TRỰC TIẾP",
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Thử thách Review Công nghệ", 
      subtitle: "28/8 (Thứ 5) 7:00 PM",
      description: "Cuộc thi đánh giá công nghệ mới nhất",
      tag: "Báo trước",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Chương trình Ẩm thực & Du lịch",
      subtitle: "29/8 (Thứ 6) 12:00 PM",
      description: "Talk show du lịch ẩm thực hấp dẫn",
      tag: "Báo trước", 
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Tuần lễ Thời trang 2025",
      subtitle: "30/8 (Thứ 7) ~ 1/9 (Thứ 2)",
      description: "Phân tích xu hướng thời trang",
      tag: "Sự kiện",
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Câu chuyện thành công KOC",
      subtitle: "Tuyển dụng thường xuyên",
      description: "Những câu chuyện của KOC thành công",
      tag: "Đặc biệt",
      color: "from-orange-500 to-amber-500"
    }
  ];
  const totalSlides = bannerData.length;

  // Enhanced keyboard navigation support
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      // Close menus and return focus to triggers
      if (megaMenuOpen) {
        setMegaMenuOpen(false);
        setFocusedMenuItemIndex(-1);
        setFocusedColumnIndex(0);
        document.getElementById('nav-category')?.focus();
      }
      if (kocDropdownOpen) {
        setKocDropdownOpen(false);
        setFocusedKocItemIndex(-1);
        document.getElementById('nav-koc-dropdown')?.focus();
      }
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        setFocusedMobileItemIndex(-1);
        document.getElementById('button-mobile-menu')?.focus();
      }
    }
  };
  
  // Megamenu keyboard navigation
  const handleMegaMenuKeyDown = (event: React.KeyboardEvent) => {
    if (!megaMenuOpen) return;
    
    const totalItemsInColumn = megaMenuColumns[focusedColumnIndex];
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedMenuItemIndex(prev => {
          const newIndex = prev < totalItemsInColumn - 1 ? prev + 1 : 0; // Wrap to top
          focusMenuItemByIndex(focusedColumnIndex, newIndex);
          return newIndex;
        });
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        setFocusedMenuItemIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : totalItemsInColumn - 1; // Wrap to bottom
          focusMenuItemByIndex(focusedColumnIndex, newIndex);
          return newIndex;
        });
        break;
        
      case 'ArrowRight':
        event.preventDefault();
        setFocusedColumnIndex(prev => {
          const newColumnIndex = prev < megaMenuColumns.length - 1 ? prev + 1 : 0; // Wrap to first column
          const newItemIndex = Math.min(focusedMenuItemIndex, megaMenuColumns[newColumnIndex] - 1);
          setFocusedMenuItemIndex(newItemIndex);
          focusMenuItemByIndex(newColumnIndex, newItemIndex);
          return newColumnIndex;
        });
        break;
        
      case 'ArrowLeft':
        event.preventDefault();
        setFocusedColumnIndex(prev => {
          const newColumnIndex = prev > 0 ? prev - 1 : megaMenuColumns.length - 1; // Wrap to last column
          const newItemIndex = Math.min(focusedMenuItemIndex, megaMenuColumns[newColumnIndex] - 1);
          setFocusedMenuItemIndex(newItemIndex);
          focusMenuItemByIndex(newColumnIndex, newItemIndex);
          return newColumnIndex;
        });
        break;
        
      case 'Home':
        event.preventDefault();
        setFocusedMenuItemIndex(0);
        focusMenuItemByIndex(focusedColumnIndex, 0);
        break;
        
      case 'End':
        event.preventDefault();
        const lastIndex = totalItemsInColumn - 1;
        setFocusedMenuItemIndex(lastIndex);
        focusMenuItemByIndex(focusedColumnIndex, lastIndex);
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        const focusedElement = document.activeElement as HTMLElement;
        focusedElement?.click();
        break;
    }
  };
  
  // KOC dropdown keyboard navigation
  const handleKocDropdownKeyDown = (event: React.KeyboardEvent) => {
    if (!kocDropdownOpen) return;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedKocItemIndex(prev => {
          const newIndex = prev < kocMenuItems - 1 ? prev + 1 : 0; // Wrap to top
          focusKocItemByIndex(newIndex);
          return newIndex;
        });
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        setFocusedKocItemIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : kocMenuItems - 1; // Wrap to bottom
          focusKocItemByIndex(newIndex);
          return newIndex;
        });
        break;
        
      case 'Home':
        event.preventDefault();
        setFocusedKocItemIndex(0);
        focusKocItemByIndex(0);
        break;
        
      case 'End':
        event.preventDefault();
        setFocusedKocItemIndex(kocMenuItems - 1);
        focusKocItemByIndex(kocMenuItems - 1);
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        const focusedElement = document.activeElement as HTMLElement;
        focusedElement?.click();
        break;
    }
  };
  
  // Mobile menu keyboard navigation
  const handleMobileMenuKeyDown = (event: React.KeyboardEvent) => {
    if (!mobileMenuOpen) return;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedMobileItemIndex(prev => {
          const newIndex = prev < mobileMenuItems - 1 ? prev + 1 : 0; // Wrap to top
          focusMobileItemByIndex(newIndex);
          return newIndex;
        });
        break;
        
      case 'ArrowUp':
        event.preventDefault();
        setFocusedMobileItemIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : mobileMenuItems - 1; // Wrap to bottom
          focusMobileItemByIndex(newIndex);
          return newIndex;
        });
        break;
        
      case 'Home':
        event.preventDefault();
        setFocusedMobileItemIndex(0);
        focusMobileItemByIndex(0);
        break;
        
      case 'End':
        event.preventDefault();
        setFocusedMobileItemIndex(mobileMenuItems - 1);
        focusMobileItemByIndex(mobileMenuItems - 1);
        break;
        
      case 'Enter':
      case ' ':
        event.preventDefault();
        const focusedElement = document.activeElement as HTMLElement;
        focusedElement?.click();
        break;
    }
  };
  
  // Helper functions to focus menu items by index
  const focusMenuItemByIndex = (columnIndex: number, itemIndex: number) => {
    const columnTestIds = [
      serviceCategories.map(c => `link-category-${c.slug}`),
      productColumn1.map(c => `link-category-${c.slug}`),
      [...productColumn2.map(c => `link-category-${c.slug}`), 'link-categories-all']
    ];
    
    if (columnTestIds[columnIndex] && columnTestIds[columnIndex][itemIndex]) {
      const element = document.querySelector(`[data-testid="${columnTestIds[columnIndex][itemIndex]}"]`) as HTMLElement;
      element?.focus();
    }
  };
  
  const getFocusedMegaMenuItem = () => {
    const columnTestIds = [
      serviceCategories.map(c => `link-category-${c.slug}`),
      productColumn1.map(c => `link-category-${c.slug}`),
      [...productColumn2.map(c => `link-category-${c.slug}`), 'link-categories-all']
    ];
    
    if (columnTestIds[focusedColumnIndex] && columnTestIds[focusedColumnIndex][focusedMenuItemIndex]) {
      return document.querySelector(`[data-testid="${columnTestIds[focusedColumnIndex][focusedMenuItemIndex]}"]`) as HTMLElement;
    }
    return null;
  };
  
  const focusKocItemByIndex = (itemIndex: number) => {
    const kocItems = document.querySelectorAll('#nav-koc-dropdown + div [role="menuitem"]') as NodeListOf<HTMLElement>;
    if (kocItems[itemIndex]) {
      kocItems[itemIndex].focus();
    }
  };
  
  const focusMobileItemByIndex = (itemIndex: number) => {
    const mobileItems = document.querySelectorAll('#mobile-menu [role="menuitem"], #mobile-menu button[role="menuitem"]') as NodeListOf<HTMLElement>;
    if (mobileItems[itemIndex]) {
      mobileItems[itemIndex].focus();
    }
  };
  
  // Carousel navigation functions
  const goToSlide = (index: number) => {
    setActiveSlideIndex(index);
  };
  
  const goToNextSlide = () => {
    setActiveSlideIndex(prev => (prev + 1) % totalSlides);
  };
  
  const goToPreviousSlide = () => {
    setActiveSlideIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  };
  
  const goToFirstSlide = () => {
    setActiveSlideIndex(0);
  };
  
  const goToLastSlide = () => {
    setActiveSlideIndex(totalSlides - 1);
  };
  
  const togglePlayPause = () => {
    setIsPaused(prev => !prev);
    setIsPlaying(prev => !prev);
  };
  
  // Touch event handlers for mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      goToNextSlide();
    }
    if (isRightSwipe) {
      goToPreviousSlide();
    }
    
    setTouchStartX(0);
    setTouchEndX(0);
  };
  
  // Carousel keyboard navigation
  const handleCarouselKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        goToPreviousSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        goToNextSlide();
        break;
      case 'Home':
        event.preventDefault();
        goToFirstSlide();
        break;
      case 'End':
        event.preventDefault();
        goToLastSlide();
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        togglePlayPause();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Roving tabindex management for megamenu
  useEffect(() => {
    if (megaMenuOpen) {
      // Set all menu items to tabindex="-1" except the focused one
      const allMenuItems = document.querySelectorAll('#category-megamenu [role="menuitem"]') as NodeListOf<HTMLElement>;
      allMenuItems.forEach((item, index) => {
        item.setAttribute('tabindex', '-1');
      });
      // Set focused item to tabindex="0"
      if (focusedMenuItemIndex >= 0 && focusedColumnIndex >= 0) {
        requestAnimationFrame(() => {
          const focusedItem = getFocusedMegaMenuItem();
          if (focusedItem) {
            focusedItem.setAttribute('tabindex', '0');
          }
        });
      }
    }
  }, [megaMenuOpen, focusedMenuItemIndex, focusedColumnIndex]);
  
  // Roving tabindex management for KOC dropdown
  useEffect(() => {
    if (kocDropdownOpen) {
      const kocItems = document.querySelectorAll('#nav-koc-dropdown + div [role="menuitem"]') as NodeListOf<HTMLElement>;
      kocItems.forEach((item, index) => {
        item.setAttribute('tabindex', index === focusedKocItemIndex ? '0' : '-1');
      });
    }
  }, [kocDropdownOpen, focusedKocItemIndex]);
  
  // Roving tabindex management for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      const mobileItems = document.querySelectorAll('#mobile-menu [role="menuitem"], #mobile-menu button[role="menuitem"]') as NodeListOf<HTMLElement>;
      mobileItems.forEach((item, index) => {
        item.setAttribute('tabindex', index === focusedMobileItemIndex ? '0' : '-1');
      });
    }
  }, [mobileMenuOpen, focusedMobileItemIndex]);
  
  // Focus trap for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      const mobileMenu = document.getElementById('mobile-menu');
      if (!mobileMenu) return;
      
      const focusableElements = mobileMenu.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      const handleTabTrap = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            // Shift + Tab: move to previous element
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            // Tab: move to next element
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };
      
      document.addEventListener('keydown', handleTabTrap);
      
      return () => {
        document.removeEventListener('keydown', handleTabTrap);
      };
    }
  }, [mobileMenuOpen]);

  // Handle smooth scrolling for hash links
  const handleSmoothScroll = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle navigation with optional hash scrolling - using requestAnimationFrame
  const handleNavigation = (path: string, hashSection?: string) => {
    if (hashSection) {
      // If we're already on the current page, just scroll
      if (location === '/home' || location === '/') {
        handleSmoothScroll(hashSection);
      } else {
        // Navigate to home page then scroll
        navigate('/home');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => handleSmoothScroll(hashSection));
        });
      }
    } else {
      navigate(path);
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isPaused) {
      const interval = setInterval(() => {
        goToNextSlide();
      }, 4000); // Change slide every 4 seconds
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, isPaused, activeSlideIndex]);
  
  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (megaMenuTimeout) {
        clearTimeout(megaMenuTimeout);
      }
    };
  }, [megaMenuTimeout]);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <>
            {/* Section 1: HEADER - Thanh điều hướng chính */}
            <header className="bg-white border-b border-gray-200" data-section="header-navigation">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                  {/* Logo */}
                  <Link to="/home">
                    <div className="w-10 h-10 bg-[#ff0086] rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-base">IKK</span>
                    </div>
                  </Link>

                  {/* Desktop Navigation */}
                  <nav className="hidden lg:flex items-center space-x-2">
                    <div 
                      className="relative group"
                      onMouseEnter={() => {
                        if (megaMenuTimeout) {
                          clearTimeout(megaMenuTimeout);
                          setMegaMenuTimeout(null);
                        }
                        setMegaMenuOpen(true);
                      }}
                      onMouseLeave={() => {
                        const timeout = setTimeout(() => setMegaMenuOpen(false), 300);
                        setMegaMenuTimeout(timeout);
                      }}
                    >
                      <button 
                        onClick={() => {
                          const isOpening = !megaMenuOpen;
                          setMegaMenuOpen(isOpening);
                          if (isOpening) {
                            // Focus first menu item when opening
                            setFocusedColumnIndex(0);
                            setFocusedMenuItemIndex(0);
                            requestAnimationFrame(() => focusMenuItemByIndex(0, 0));
                          }
                          handleNavigation('/home', 'category-menu');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            const isOpening = !megaMenuOpen;
                            setMegaMenuOpen(isOpening);
                            if (isOpening) {
                              setFocusedColumnIndex(0);
                              setFocusedMenuItemIndex(0);
                              requestAnimationFrame(() => focusMenuItemByIndex(0, 0));
                            }
                          } else if (e.key === 'ArrowDown' && megaMenuOpen) {
                            e.preventDefault();
                            setFocusedColumnIndex(0);
                            setFocusedMenuItemIndex(0);
                            focusMenuItemByIndex(0, 0);
                          }
                        }}
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium flex items-center space-x-1"
                        data-testid="nav-category"
                        id="nav-category"
                        aria-expanded={megaMenuOpen}
                        aria-controls="category-megamenu"
                        aria-haspopup="menu"
                      >
                        <span>Danh mục</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {/* Redesigned Megamenu */}
                      <div 
                        id="category-megamenu"
                        role="menu"
                        aria-labelledby="nav-category"
                        className={`absolute top-full left-0 w-full lg:w-[850px] bg-white shadow-xl border border-gray-200 rounded-xl mt-2 z-50 transition-all duration-200 ease-out ${megaMenuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
                        onKeyDown={handleMegaMenuKeyDown}
                        onMouseEnter={() => {
                          if (megaMenuTimeout) {
                            clearTimeout(megaMenuTimeout);
                            setMegaMenuTimeout(null);
                          }
                        }}
                        onMouseLeave={() => {
                          const timeout = setTimeout(() => setMegaMenuOpen(false), 150);
                          setMegaMenuTimeout(timeout);
                        }}
                      >
                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                          {/* DỊCH VỤ Column */}
                          <div className="p-4 md:p-5 border-b md:border-b-0 md:border-r border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <HiOutlineClipboardDocumentList className="w-5 h-5 text-gray-700" />
                              </div>
                              <h3 className="font-semibold text-gray-900 text-sm">DỊCH VỤ</h3>
                            </div>
                            <ul className="space-y-1.5" role="none">
                              {serviceCategories.map((cat, index) => (
                                <li key={cat.category_id} role="none">
                                  <Link 
                                    to={`/categories/${cat.slug}`} 
                                    className="block px-2 py-1.5 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors" 
                                    data-testid={`link-category-${cat.slug}`} 
                                    role="menuitem"
                                    tabIndex={index === 0 ? -1 : undefined}
                                  >
                                    {cat.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* SẢN PHẨM Column 1 */}
                          <div className="p-4 md:p-5 border-b md:border-b-0 md:border-r border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <HiOutlineCurrencyDollar className="w-5 h-5 text-gray-700" />
                              </div>
                              <h3 className="font-semibold text-gray-900 text-sm">SẢN PHẨM</h3>
                            </div>
                            <ul className="space-y-1.5" role="none">
                              {productColumn1.map((cat) => (
                                <li key={cat.category_id} role="none">
                                  <Link 
                                    to={`/categories/${cat.slug}`} 
                                    className="block px-2 py-1.5 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors" 
                                    data-testid={`link-category-${cat.slug}`} 
                                    role="menuitem"
                                  >
                                    {cat.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* SẢN PHẨM Column 2 */}
                          <div className="p-4 md:p-5 border-b md:border-b-0 lg:border-r border-gray-100">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <HiOutlineVideoCamera className="w-5 h-5 text-gray-700" />
                              </div>
                              <h3 className="font-semibold text-gray-900 text-sm">SẢN PHẨM</h3>
                            </div>
                            <ul className="space-y-1.5" role="none">
                              {productColumn2.map((cat) => (
                                <li key={cat.category_id} role="none">
                                  <Link 
                                    to={`/categories/${cat.slug}`} 
                                    className="block px-2 py-1.5 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors" 
                                    data-testid={`link-category-${cat.slug}`} 
                                    role="menuitem"
                                  >
                                    {cat.name}
                                  </Link>
                                </li>
                              ))}
                              <li className="pt-2" role="none">
                                <Link to="/admin/brands/categories" className="flex items-center gap-1 text-sm text-[#ff0086] font-medium hover:text-[#e6007a] transition-colors" data-testid="link-categories-all" role="menuitem">
                                  Xem tất cả
                                  <HiOutlineChevronRight className="w-3 h-3" />
                                </Link>
                              </li>
                            </ul>
                          </div>

                        </div>

                        {/* Bottom Action Bar */}
                        <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="flex items-center gap-4">
                              <Link to="/guide/koc-guide" className="text-sm text-gray-600 hover:text-gray-700 transition-colors" data-testid="link-koc-guide">
                                Hướng dẫn KOC mới
                              </Link>
                              <Link to="/support/policies" className="text-sm text-gray-600 hover:text-gray-700 transition-colors" data-testid="link-support-policies">
                                Chính sách hỗ trợ
                              </Link>
                            </div>
                            <Link to="/register">
                              <button className="px-4 py-2 bg-[#ff0086] text-white text-sm font-medium rounded-lg hover:bg-[#e6007a] transition-colors" data-testid="button-register-megamenu">
                                Đăng ký ngay
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="relative group"
                      onMouseEnter={() => setKocDropdownOpen(true)}
                      onMouseLeave={() => setKocDropdownOpen(false)}
                    >
                      <button 
                        id="nav-koc-dropdown"
                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium flex items-center gap-1"
                        aria-haspopup="menu"
                        aria-expanded={kocDropdownOpen}
                        data-testid="nav-koc-dropdown"
                        onClick={() => {
                          const isOpening = !kocDropdownOpen;
                          setKocDropdownOpen(isOpening);
                          if (isOpening) {
                            setFocusedKocItemIndex(0);
                            requestAnimationFrame(() => focusKocItemByIndex(0));
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            const isOpening = !kocDropdownOpen;
                            setKocDropdownOpen(isOpening);
                            if (isOpening) {
                              setFocusedKocItemIndex(0);
                              requestAnimationFrame(() => focusKocItemByIndex(0));
                            }
                          } else if (e.key === 'ArrowDown' && kocDropdownOpen) {
                            e.preventDefault();
                            setFocusedKocItemIndex(0);
                            focusKocItemByIndex(0);
                          }
                        }}
                      >
                        Dành cho KOC
                        <HiOutlineChevronDown className="w-4 h-4" />
                        <span className="sr-only">Xem các tùy chọn dành cho KOC</span>
                      </button>
                      <div 
                        className={`absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200 z-50 min-w-[180px] ${kocDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                        role="menu"
                        aria-labelledby="nav-koc-dropdown"
                        onKeyDown={handleKocDropdownKeyDown}
                      >
                        <Link to="/koc" className="block px-4 py-3 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-colors" role="menuitem">
                          KOC Landing
                        </Link>
                        <Link to="/koc-2" className="block px-4 py-3 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-colors" role="menuitem">
                          KOC Elite Program
                        </Link>
                        <Link to="/koc-app" className="block px-4 py-3 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 transition-colors" role="menuitem">
                          KOC Dashboard
                        </Link>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleNavigation('/home', 'brands-section')}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                      data-testid="nav-brands"
                    >
                      Dành cho thương hiệu
                    </button>
                    <Link to="/explore" className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium">
                      Khám phá
                    </Link>
                  </nav>

                  {/* Right Actions */}
                  <div className="flex items-center space-x-3">
                    {/* Search Icon */}
                    <button 
                      className="hidden lg:block p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      aria-label="Search"
                      data-testid="button-search"
                    >
                      <HiOutlineMagnifyingGlass className="w-5 h-5 text-gray-500" />
                    </button>

                    {/* Notification */}
                    <button 
                      className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      aria-label="Notifications"
                      data-testid="button-notifications"
                    >
                      <HiOutlineBell className="w-5 h-5 text-gray-500" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true"></span>
                      <span className="sr-only">You have new notifications</span>
                    </button>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden lg:flex items-center space-x-3">
                      <Link to="/login">
                        <button className="text-gray-600 hover:text-gray-900 text-sm font-medium" data-testid="button-login-desktop">
                          Đăng nhập
                        </button>
                      </Link>
                      <Link to="/register">
                        <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors" data-testid="button-register-desktop">
                          Đăng ký
                        </button>
                      </Link>
                    </div>

                    {/* Mobile Menu */}
                    <button 
                      id="button-mobile-menu"
                      className="lg:hidden p-2"
                      onClick={() => {
                        const isOpening = !mobileMenuOpen;
                        setMobileMenuOpen(isOpening);
                        if (isOpening) {
                          setFocusedMobileItemIndex(0);
                          requestAnimationFrame(() => focusMobileItemByIndex(0));
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          const isOpening = !mobileMenuOpen;
                          setMobileMenuOpen(isOpening);
                          if (isOpening) {
                            setFocusedMobileItemIndex(0);
                            requestAnimationFrame(() => focusMobileItemByIndex(0));
                          }
                        }
                      }}
                      aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                      aria-expanded={mobileMenuOpen}
                      aria-controls="mobile-menu"
                      data-testid="button-mobile-menu"
                    >
                      {mobileMenuOpen ? (
                        <HiOutlineXMark className="w-5 h-5 text-gray-600" />
                      ) : (
                        <HiOutlineBars3 className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div 
                  id="mobile-menu"
                  className="lg:hidden bg-white border-t border-gray-100"
                  role="menu"
                  aria-labelledby="button-mobile-menu"
                  onKeyDown={handleMobileMenuKeyDown}
                >
                  <div className="px-4 py-4 space-y-2">
                    <button 
                      onClick={() => {
                        handleNavigation('/home', 'category-menu');
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
                      data-testid="mobile-nav-category"
                      role="menuitem"
                    >
                      Danh mục
                    </button>
                    <Link to="/koc" className="block px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors" data-testid="mobile-nav-koc" role="menuitem">
                      KOC Landing
                    </Link>
                    <Link to="/koc-2" className="block px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors" data-testid="mobile-nav-koc-elite" role="menuitem">
                      KOC Elite Program
                    </Link>
                    <Link to="/koc-app" className="block px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors" data-testid="mobile-nav-koc-app" role="menuitem">
                      KOC Dashboard
                    </Link>
                    <button 
                      onClick={() => {
                        handleNavigation('/home', 'brands-section');
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors"
                      data-testid="mobile-nav-brands"
                      role="menuitem"
                    >
                      Dành cho thương hiệu
                    </button>
                    <Link to="/explore" className="block px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors" data-testid="mobile-nav-explore" role="menuitem">
                      Khám phá
                    </Link>
                    
                    <div className="pt-3 border-t border-gray-100 space-y-2" role="none">
                      <Link to="/login">
                        <button className="w-full text-gray-600 hover:bg-gray-50 py-2 rounded-lg text-sm font-medium transition-colors" data-testid="button-login-mobile" role="menuitem">
                          Đăng nhập
                        </button>
                      </Link>
                      <Link to="/register">
                        <button className="w-full bg-[#ff0086] hover:bg-[#e6007a] text-white py-2 rounded-lg text-sm font-medium transition-colors" data-testid="button-register-mobile" role="menuitem">
                          Đăng ký
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </header>
            <div className="min-h-screen bg-white">
            {/* Section 2: BANNER SỰ KIỆN - Interactive Carousel */}
            <section className="max-w-7xl mx-auto px-4 pt-8 pb-6" data-section="event-banners">
              <div 
                className="relative"
                role="region"
                aria-roledescription="carousel"
                aria-label="Event banners carousel"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onKeyDown={handleCarouselKeyDown}
                tabIndex={0}
              >
                {/* Previous Button */}
                <button
                  onClick={goToPreviousSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  aria-label="Previous slide"
                  aria-controls="carousel-slides"
                  data-testid="button-carousel-previous"
                >
                  <HiOutlineChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors" />
                </button>

                {/* Next Button */}
                <button
                  onClick={goToNextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  aria-label="Next slide"
                  aria-controls="carousel-slides"
                  data-testid="button-carousel-next"
                >
                  <HiOutlineChevronRight className="w-5 h-5 text-gray-700 group-hover:text-pink-600 transition-colors" />
                </button>

                {/* Carousel Container */}
                <div 
                  id="carousel-slides"
                  className="overflow-hidden rounded-xl"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  aria-live="polite"
                >
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${activeSlideIndex * 100}%)` }}
                  >
                    {bannerData.map((banner, index) => (
                      <div 
                        key={index} 
                        className="w-full flex-shrink-0 h-48 relative group cursor-pointer"
                        aria-hidden={index !== activeSlideIndex}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${banner.color}`}></div>
                        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-medium bg-white bg-opacity-20 px-2 py-1 rounded">
                                {banner.tag}
                              </span>
                              <div className="text-xs opacity-80">{index + 1} / {totalSlides}</div>
                            </div>
                            <h3 className="text-lg font-bold mb-2">{banner.subtitle}</h3>
                            <h4 className="text-xl font-bold mb-2">{banner.title}</h4>
                          </div>
                          <p className="text-sm opacity-90">{banner.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center mt-4 space-x-2" role="group" aria-label="Carousel navigation">
                  {bannerData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                        index === activeSlideIndex 
                          ? 'bg-pink-500 scale-110' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={index === activeSlideIndex ? 'true' : 'false'}
                      data-testid={`indicator-${index}`}
                    />
                  ))}
                </div>

                {/* Play/Pause Button */}
                <button
                  onClick={togglePlayPause}
                  className="absolute bottom-4 right-4 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
                  data-testid="button-carousel-playpause"
                >
                  {isPlaying ? (
                    <div className="w-2 h-2 bg-gray-700 group-hover:bg-pink-600 transition-colors" />
                  ) : (
                    <HiOutlinePlay className="w-4 h-4 text-gray-700 group-hover:text-pink-600 transition-colors ml-0.5" />
                  )}
                </button>
              </div>
            </section>

            {/* Section 3: DANH MỤC - Menu icon danh mục sản phẩm/dịch vụ */}
            <section className="max-w-7xl mx-auto px-4 py-8" data-section="category-menu">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Danh mục</h2>
                <Link to="/admin/brands/categories">
                  <button className="text-sm text-[#ff0086] hover:text-[#e6007a] transition-colors font-medium" data-testid="button-view-all-categories">
                    Xem tất cả
                  </button>
                </Link>
              </div>

              {/* Category Grid - Optimized Spacing */}
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {[
                  { name: 'Làm đẹp', icon: 'sparkles', bgGradient: 'from-pink-100 to-rose-100 group-hover:from-pink-200 group-hover:to-rose-200', iconColor: 'text-pink-600' },
                  { name: 'Công nghệ', icon: 'device-phone', bgGradient: 'from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200', iconColor: 'text-blue-600' },
                  { name: 'Ẩm thực', icon: 'shopping-bag', bgGradient: 'from-orange-100 to-amber-100 group-hover:from-orange-200 group-hover:to-amber-200', iconColor: 'text-orange-600' },
                  { name: 'Du lịch', icon: 'map-pin', bgGradient: 'from-green-100 to-emerald-100 group-hover:from-green-200 group-hover:to-emerald-200', iconColor: 'text-green-600' },
                  { name: 'Thời trang', icon: 'squares-2x2', bgGradient: 'from-rose-100 to-pink-100 group-hover:from-rose-200 group-hover:to-pink-200', iconColor: 'text-rose-600' },
                  { name: 'Lối sống', icon: 'heart', bgGradient: 'from-purple-100 to-violet-100 group-hover:from-purple-200 group-hover:to-violet-200', iconColor: 'text-purple-600' },
                  { name: 'Giải trí', icon: 'video-camera', bgGradient: 'from-yellow-100 to-amber-100 group-hover:from-yellow-200 group-hover:to-amber-200', iconColor: 'text-yellow-600' },
                  { name: 'Nhà hàng, cà phê', icon: 'coffee', bgGradient: 'from-amber-100 to-orange-100 group-hover:from-amber-200 group-hover:to-orange-200', iconColor: 'text-amber-600' }
                ].map((category, idx) => (
                  <div key={idx} className="flex flex-col items-center group cursor-pointer">
                    <div className={`w-14 h-14 bg-gradient-to-br ${category.bgGradient} rounded-xl flex items-center justify-center mb-2 transition-all duration-300 shadow-sm group-hover:shadow-md`}>
                      {category.icon === 'sparkles' && <HiOutlineSparkles className={`w-7 h-7 ${category.iconColor}`} />}
                      {category.icon === 'device-phone' && <HiOutlineDevicePhoneMobile className={`w-7 h-7 ${category.iconColor}`} />}
                      {category.icon === 'shopping-bag' && <HiOutlineShoppingBag className={`w-7 h-7 ${category.iconColor}`} />}
                      {category.icon === 'map-pin' && <HiOutlineMapPin className={`w-7 h-7 ${category.iconColor}`} />}
                      {category.icon === 'squares-2x2' && <HiOutlineSquares2X2 className={`w-7 h-7 ${category.iconColor}`} />}
                      {category.icon === 'heart' && <HiOutlineHeart className={`w-7 h-7 ${category.iconColor}`} />}
                      {category.icon === 'video-camera' && <HiOutlineVideoCamera className={`w-7 h-7 ${category.iconColor}`} />}
                      {category.icon === 'coffee' && <HiOutlineBuildingStorefront className={`w-7 h-7 ${category.iconColor}`} />}
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center group-hover:text-[#ff0086] transition-colors">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: CHỦ ĐỀ NỔI BẬT - Danh sách KOC/Streamer nổi bật */}
            <section className="max-w-7xl mx-auto px-4 mb-12" data-section="popular-streamers">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Chủ đề nổi bật</h2>
                  <p className="text-gray-600">Khám phá những chủ đề và streamer được quan tâm nhất hiện tại</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors" data-testid="button-filter-topics">
                    <span className="flex items-center space-x-2">
                      <HiOutlineFunnel className="w-4 h-4" />
                      <span>Bộ lọc</span>
                    </span>
                  </button>
                  <Link to="/topics">
                    <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors" data-testid="button-view-all-topics">
                      Xem tất cả
                    </button>
                  </Link>
                </div>
              </div>
              
              {/* Popular Streamers Horizontal Scroll - SOOP Style */}
              <div className="flex space-x-6 overflow-x-auto pb-4 mb-8">
                {[
                  { name: "IKKBeauty", game: "Làm đẹp/Mỹ phẩm", viewers: "10,754", rank: 1 },
                  { name: "TechGuruVN", game: "Đánh giá công nghệ", viewers: "7,535", rank: 2 },
                  { name: "FoodieLife", game: "Ẩm thực/Nấu ăn", viewers: "4,523", rank: 3 },
                  { name: "TravelMore", game: "Du lịch/Vlog", viewers: "3,793", rank: 4 },
                  { name: "DailyTalk", game: "Trò chuyện/Cam", viewers: "2,554", rank: 5 },
                ].map((streamer, index) => (
                  <Link key={index} to="/explore" className="flex-shrink-0 group" data-testid={`link-streamer-${index + 1}`}>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors min-w-[200px]">
                      {/* Profile Image */}
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{streamer.name.substring(0, 2)}</span>
                        </div>
                        {/* Live indicator */}
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Stream Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-bold text-sm text-gray-900 truncate">{streamer.name}</span>
                        </div>
                        <div className="text-xs text-gray-500 mb-1 truncate">{streamer.game}</div>
                        <div className="text-xs text-gray-400 flex items-center">
                          <span className="text-pink-500 font-medium">{streamer.viewers}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Section 4.5: KOC NỔI BẬT - Follows design standard pattern */}
            <section className="max-w-7xl mx-auto px-4 mb-12" data-section="featured-kocs">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">KOC nổi bật</h2>
                  <p className="text-gray-600">Những KOC uy tín và có ảnh hưởng lớn trong cộng đồng</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors" data-testid="button-filter-kocs">
                    <span className="flex items-center space-x-2">
                      <span>Bộ lọc</span>
                    </span>
                  </button>
                  <Link to="/kocs">
                    <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors" data-testid="button-view-all-kocs">
                      Xem tất cả
                    </button>
                  </Link>
                </div>
              </div>
              
              {/* Featured KOCs Horizontal Scroll - Consistent with Popular Streamers Style */}
              <div className="flex space-x-6 overflow-x-auto pb-4 mb-8">
                {[
                  { 
                    name: "Nguyễn Hồng Nhung", 
                    category: "Beauty & Skincare", 
                    followers: "2.8M", 
                    rank: 1,
                    verified: true,
                    rating: 4.9
                  },
                  { 
                    name: "Trần Minh Quân", 
                    category: "Tech Reviews", 
                    followers: "1.9M", 
                    rank: 2,
                    verified: true,
                    rating: 4.8
                  },
                  { 
                    name: "Lê Thị Mai Anh", 
                    category: "Food & Restaurant", 
                    followers: "1.4M", 
                    rank: 3,
                    verified: true,
                    rating: 4.9
                  },
                  { 
                    name: "Võ Thanh Tâm", 
                    category: "Travel & Adventure", 
                    followers: "1.6M", 
                    rank: 4,
                    verified: true,
                    rating: 4.8
                  },
                  { 
                    name: "Đặng Quốc Việt", 
                    category: "Trò chơi & Thể thao điện tử", 
                    followers: "2.1M", 
                    rank: 5,
                    verified: true,
                    rating: 4.6
                  },
                  { 
                    name: "Bùi Minh Châu", 
                    category: "Fitness & Wellness", 
                    followers: "720K", 
                    rank: 6,
                    verified: true,
                    rating: 4.9
                  }
                ].map((koc, index) => (
                  <Link key={index} to={`/koc/${koc.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex-shrink-0 group" data-testid={`link-koc-${index + 1}`}>
                    <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors min-w-[240px]">
                      {/* Profile Image */}
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{koc.name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2)}</span>
                        </div>
                        {/* Verified indicator */}
                        {koc.verified && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <HiOutlineCheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* KOC Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-bold text-sm text-gray-900 truncate" data-testid={`text-koc-name-${index + 1}`}>{koc.name}</span>
                          <div className="flex items-center space-x-1">
                            <HiOutlineStar className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-xs text-gray-600">{koc.rating}</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mb-1 truncate">{koc.category}</div>
                        <div className="text-xs text-gray-400 flex items-center">
                          <span className="text-[#ff0086] font-medium">{koc.followers} followers</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>




            {/* Section 5: CHIẾN DỊCH KOC - Danh sách chiến dịch KOC đặc sắc */}
            <section className="max-w-7xl mx-auto px-4 mb-12" data-section="koc-campaigns">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <HiOutlineRocketLaunch className="w-6 h-6 text-[#ff0086]" />
                    Chiến dịch KOC đặc sắc
                  </h2>
                  <p className="text-gray-600">Khám phá những cơ hội hợp tác thú vị với các thương hiệu hàng đầu</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    <span className="flex items-center space-x-2">
                      <span>Bộ lọc</span>
                    </span>
                  </button>
                  <Link to="/campaigns">
                    <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors">
                      Xem tất cả
                    </button>
                  </Link>
                </div>
              </div>

              {/* Featured Campaign Banner */}
              <div className="mb-8">
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
                      <h3 className="text-3xl md:text-4xl font-bold mb-3">
                        Beauty Festival 2025
                      </h3>
                      <p className="text-lg mb-4 opacity-90">
                        Lễ hội làm đẹp lớn nhất năm với tổng giải thưởng lên đến 500 triệu đồng
                      </p>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <HiOutlineUsers className="w-4 h-4" />
                          <span>1,200+ KOC tham gia</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <HiOutlineClock className="w-4 h-4" />
                          <span>Còn 15 ngày</span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                      <button className="bg-white text-[#ff0086] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                        Tham gia ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Categories */}
              <div className="flex space-x-3 mb-8 overflow-x-auto pb-2">
                {[
                  { name: "Tất cả", count: "127", active: true },
                  { name: "Beauty & Fashion", count: "45", active: false },
                  { name: "Technology", count: "28", active: false },
                  { name: "Food & Lifestyle", count: "32", active: false },
                  { name: "Travel", count: "15", active: false },
                  { name: "Health & Fitness", count: "7", active: false }
                ].map((category, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      category.active 
                        ? "bg-[#ff0086] text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* Enhanced Campaign Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  {
                    id: "campaign-1",
                    title: "Maybelline Superstay Matte Ink - Review Thật & Trải Nghiệm",
                    brand: "Maybelline Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/FF69B4/FFFFFF?text=M",
                    reward: "2,000,000 VNĐ",
                    participants: "67/100",
                    deadline: "15/09/2025",
                    status: "đang tuyển KOC",
                    statusColor: "bg-blue-500",
                    daysLeft: 15,
                    category: "Beauty & Fashion",
                    description: "Review chi tiết dòng son lì lâu trôi với nhiều màu sắc mới",
                    requirements: ["Beauty Content", "Authentic Review", "Photography"],
                    engagement: "12.5K",
                    image: "https://picsum.photos/300/200?random=101",
                    countdown: "Còn 5 ngày",
                    timeCommitment: "3-5 ngày",
                    campaignType: "Review",
                    platforms: ["instagram", "tiktok", "youtube"],
                    location: "Hồ Chí Minh",
                    isUrgent: true
                  },
                  {
                    id: "campaign-2", 
                    title: "Samsung Galaxy S25 Ultra - Camera Test & Review",
                    brand: "Samsung Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/007BFF/FFFFFF?text=S",
                    reward: "5,000,000 VNĐ",
                    participants: "34/50",
                    deadline: "20/09/2025",
                    status: "đang tuyển KOC",
                    statusColor: "bg-blue-500",
                    daysLeft: 20,
                    category: "Technology",
                    description: "Unboxing và đánh giá camera system mới nhất",
                    requirements: ["Tech Review", "Video Content", "Photography"],
                    engagement: "8.9K",
                    image: "https://picsum.photos/300/200?random=102",
                    countdown: "Còn 12 ngày",
                    timeCommitment: "5-7 ngày",
                    campaignType: "Unboxing",
                    platforms: ["youtube", "tiktok", "facebook"],
                    location: "Hà Nội",
                    isUrgent: false
                  },
                  {
                    id: "campaign-3",
                    title: "Food Tour Vietnam - Khám Phá Ẩm Thực Địa Phương",
                    brand: "Grab Food",
                    brandLogo: "https://via.placeholder.com/64x64/00C851/FFFFFF?text=G",
                    reward: "1,500,000 VNĐ",
                    participants: "89/150",
                    deadline: "25/09/2025",
                    status: "đang hoạt động",
                    statusColor: "bg-green-500",
                    daysLeft: 25,
                    category: "Food & Travel",
                    description: "Khám phá và review các món ăn đặc sản từ khắp các tỉnh thành",
                    requirements: ["Food Content", "Travel", "Local Knowledge"],
                    engagement: "6.7K",
                    image: "https://picsum.photos/300/200?random=103",
                    countdown: "Còn 8 ngày",
                    timeCommitment: "7-10 ngày",
                    campaignType: "Check-in",
                    platforms: ["instagram", "facebook", "tiktok"],
                    location: "Toàn quốc",
                    isUrgent: false
                  },
                  {
                    id: "campaign-4",
                    title: "Uniqlo Fashion Styling - Thu Đông 2025",
                    brand: "Uniqlo Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/FF4500/FFFFFF?text=U",
                    reward: "1,000,000 VNĐ",
                    participants: "156/300",
                    deadline: "30/09/2025",
                    status: "đang hoạt động",
                    statusColor: "bg-green-500",
                    daysLeft: 30,
                    category: "Fashion & Lifestyle",
                    description: "Sáng tạo outfit styling với sản phẩm mùa thu đông",
                    requirements: ["Fashion Content", "Styling", "Creative"],
                    engagement: "4.2K",
                    image: "https://picsum.photos/300/200?random=104",
                    countdown: "Còn 15 ngày",
                    timeCommitment: "3-5 ngày",
                    campaignType: "Styling",
                    platforms: ["instagram", "tiktok"],
                    location: "Đà Nẵng",
                    isUrgent: false
                  },
                  {
                    id: "campaign-5",
                    title: "Meta Quest 3 VR Experience - Future Tech Review",
                    brand: "Meta Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/4267B2/FFFFFF?text=M",
                    reward: "8,000,000 VNĐ",
                    participants: "12/30",
                    deadline: "10/10/2025",
                    status: "đang tuyển KOC",
                    statusColor: "bg-blue-500",
                    daysLeft: 40,
                    category: "VR/AR Technology",
                    description: "Trải nghiệm và review công nghệ VR/AR tiên tiến với Meta Quest 3",
                    requirements: ["VR Content", "Tech Review", "Innovation"],
                    engagement: "18.3K",
                    image: "https://picsum.photos/300/200?random=105",
                    countdown: "Còn 22 ngày",
                    timeCommitment: "7-10 ngày",
                    campaignType: "VR Demo",
                    platforms: ["youtube", "tiktok", "instagram"],
                    location: "Hồ Chí Minh",
                    isUrgent: false
                  },
                  {
                    id: "campaign-6",
                    title: "Zero Waste Lifestyle Challenge - Eco Living",
                    brand: "EcoLife Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/4CAF50/FFFFFF?text=E",
                    reward: "3,500,000 VNĐ",
                    participants: "78/120",
                    deadline: "05/10/2025",
                    status: "đang hoạt động",
                    statusColor: "bg-green-500",
                    daysLeft: 35,
                    category: "Sustainability",
                    description: "Thử thách lối sống không rác thải và bảo vệ môi trường",
                    requirements: ["Eco Content", "Lifestyle", "Environment"],
                    engagement: "14.7K",
                    image: "https://picsum.photos/300/200?random=106",
                    countdown: "Còn 18 ngày",
                    timeCommitment: "14 ngày",
                    campaignType: "Challenge",
                    platforms: ["instagram", "tiktok", "facebook"],
                    location: "Toàn quốc",
                    isUrgent: false
                  },
                  {
                    id: "campaign-7",
                    title: "PUBG Mobile Championship - Esports Elite",
                    brand: "Garena Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/FF6F00/FFFFFF?text=G",
                    reward: "15,000,000 VNĐ",
                    participants: "45/64",
                    deadline: "12/10/2025",
                    status: "đang hoạt động",
                    statusColor: "bg-green-500",
                    daysLeft: 42,
                    category: "Gaming/Esports",
                    description: "Tham gia giải đấu PUBG Mobile với đội hình chuyên nghiệp",
                    requirements: ["Gaming Content", "Esports", "Tournament"],
                    engagement: "45.7K",
                    image: "https://picsum.photos/300/200?random=107",
                    countdown: "Còn 25 ngày",
                    timeCommitment: "Thời gian thực",
                    campaignType: "Tournament",
                    platforms: ["youtube", "twitch", "facebook"],
                    location: "Online",
                    isUrgent: true
                  },
                  {
                    id: "campaign-8",
                    title: "Rolex Timepiece Collection - Luxury Elite",
                    brand: "Rolex Switzerland",
                    brandLogo: "https://via.placeholder.com/64x64/FFD700/000000?text=R",
                    reward: "50,000,000 VNĐ",
                    participants: "3/10",
                    deadline: "15/10/2025",
                    status: "đang tuyển KOC",
                    statusColor: "bg-blue-500",
                    daysLeft: 45,
                    category: "Luxury/Premium",
                    description: "Trải nghiệm bộ sưu tập đồng hồ cao cấp Rolex độc quyền",
                    requirements: ["Luxury Content", "Premium", "Exclusive"],
                    engagement: "8.9K",
                    image: "https://picsum.photos/300/200?random=108",
                    countdown: "Còn 28 ngày",
                    timeCommitment: "10-14 ngày",
                    campaignType: "Luxury",
                    platforms: ["instagram", "youtube"],
                    location: "Hà Nội",
                    isUrgent: false
                  },
                  {
                    id: "campaign-9",
                    title: "Tết Trung Thu Festival - Cultural Heritage",
                    brand: "Vietnam Culture Ministry",
                    brandLogo: "https://via.placeholder.com/64x64/DC143C/FFFFFF?text=V",
                    reward: "6,500,000 VNĐ",
                    participants: "89/200",
                    deadline: "20/09/2025",
                    status: "kết thúc",
                    statusColor: "bg-gray-500",
                    daysLeft: 20,
                    category: "Culture/Events",
                    description: "Quảng bá văn hóa truyền thống Việt Nam qua lễ hội Trung Thu",
                    requirements: ["Cultural Content", "Traditional", "Festival"],
                    engagement: "22.1K",
                    image: "https://picsum.photos/300/200?random=109",
                    countdown: "Còn 3 ngày",
                    timeCommitment: "5-7 ngày",
                    campaignType: "Cultural",
                    platforms: ["instagram", "tiktok", "facebook"],
                    location: "Toàn quốc",
                    isUrgent: false
                  }
                ].map((campaign, index) => {
                  const getPlatformIcon = (platform: string) => {
                    switch(platform) {
                      case 'tiktok': return <FaTiktok className="w-4 h-4 text-black" />;
                      case 'instagram': return <FaInstagram className="w-4 h-4 text-pink-500" />;
                      case 'youtube': return <FaYoutube className="w-4 h-4 text-red-500" />;
                      case 'facebook': return <FaFacebookF className="w-4 h-4 text-blue-600" />;
                      default: return null;
                    }
                  };

                  const getCampaignTypeIcon = (type: string) => {
                    switch(type) {
                      case 'Review': return <HiOutlineStar className="w-4 h-4 text-amber-500" />;
                      case 'Unboxing': return <HiOutlineShoppingBag className="w-4 h-4 text-blue-500" />;
                      case 'Check-in': return <HiOutlineMapPin className="w-4 h-4 text-green-500" />;
                      case 'Styling': return <HiOutlineShoppingBag className="w-4 h-4 text-purple-500" />;
                      default: return <HiOutlineCheckCircle className="w-4 h-4 text-gray-500" />;
                    }
                  };

                  return (
                    <Link key={campaign.id} to="/campaigns/static-1/apply">
                      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden">
                        {/* Campaign Image */}
                        <div className="relative overflow-hidden">
                          <div className="w-full h-40 bg-gray-50 flex items-center justify-center">
                            <img 
                              src={campaign.image || "/placeholder.jpg"} 
                              alt={campaign.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder.jpg";
                              }}
                            />
                          </div>
                          
                          {/* Status Badge & Platforms */}
                          <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {/* Compact Status Badge */}
                              <div className={`px-2 py-0.5 rounded-md text-[10px] font-medium text-white shadow-sm ${campaign.statusColor}`}>
                                <span>{campaign.status}</span>
                              </div>
                              {/* Days Left Indicator */}
                              {campaign.daysLeft <= 7 && (
                                <div className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-yellow-400 text-gray-900 shadow-sm">
                                  {campaign.daysLeft} ngày
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              {campaign.platforms?.slice(0, 2).map((platform, idx) => (
                                <div key={idx} className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                                  {getPlatformIcon(platform)}
                                </div>
                              ))}
                              {campaign.platforms?.length > 2 && (
                                <div className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                                  <span className="text-xs font-bold text-gray-600">+{campaign.platforms.length - 2}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          {/* Brand with Logo and Campaign Type */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {/* Brand Logo */}
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                <img 
                                  src={campaign.brandLogo} 
                                  alt={campaign.brand}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    if (target.nextSibling) {
                                      (target.nextSibling as HTMLElement).style.display = 'flex';
                                    }
                                  }}
                                />
                                {/* Fallback for missing logo */}
                                <div className="w-full h-full bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ display: 'none' }}>
                                  {campaign.brand.charAt(0)}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-900">{campaign.brand}</span>
                                <span className="text-xs text-gray-500">{campaign.category}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              {getCampaignTypeIcon(campaign.campaignType)}
                              <span className="text-xs font-medium text-gray-600">{campaign.campaignType}</span>
                            </div>
                          </div>
                          
                          {/* Title */}
                          <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#ff0086] transition-colors">
                            {campaign.title}
                          </h3>
                          
                          {/* Reward Info - Premium Style (moved up like Affiliate) */}
                          <div className="bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 rounded-lg p-3 mb-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-lg font-bold text-[#ff0086]">{campaign.reward}</div>
                                <div className="text-xs text-gray-600">Phần thưởng chiến dịch</div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-gray-500">KOC tham gia</div>
                                <div className="text-sm font-semibold text-gray-900">{campaign.participants}</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Campaign Meta Info */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <div className="flex items-center space-x-3">
                                <div className={`flex items-center space-x-1 ${campaign.daysLeft <= 7 ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                                  <HiOutlineClock className="w-3 h-3" />
                                  <span>
                                    {campaign.daysLeft <= 7 
                                      ? `Còn ${campaign.daysLeft} ngày` 
                                      : campaign.deadline
                                    }
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <button 
                                    aria-label="Add to favorites"
                                    className="p-0 bg-transparent border-none cursor-pointer"
                                    data-testid={`button-favorite-${campaign.id}`}
                                  >
                                    <HiOutlineHeart className="w-3 h-3 text-red-500" />
                                  </button>
                                  <span>{campaign.engagement}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1 text-xs font-medium text-[#ff0086]">
                                <HiOutlineClock className="w-3 h-3" />
                                <span>{campaign.countdown}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Location */}
                          <div className="flex items-center space-x-1 mb-3 text-xs text-gray-600">
                            <HiOutlineMapPin className="w-3 h-3 text-blue-500" />
                            <span>{campaign.location}</span>
                          </div>
                          
                          {/* Action Buttons - Premium Style (3 buttons in one row like Affiliate) */}
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1">
                              <HiOutlinePlusCircle className="w-4 h-4" />
                              <span>Ứng tuyển</span>
                            </button>
                            <button 
                              className="p-2 border border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors group"
                              aria-label="Bookmark campaign"
                              data-testid={`button-bookmark-${campaign.id}`}
                            >
                              <HiOutlineBookmark className="w-4 h-4 text-gray-600 group-hover:text-[#ff0086]" />
                            </button>
                            <button 
                              className="p-2 border border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors group"
                              aria-label="Share campaign"
                              data-testid={`button-share-${campaign.id}`}
                            >
                              <HiOutlineShare className="w-4 h-4 text-gray-600 group-hover:text-[#ff0086]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Enhanced Statistics & CTA Section */}
              <div className="mt-8">
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                        <HiOutlineFunnel className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">127</div>
                      <div className="text-xs text-gray-600">Chiến dịch</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                        <HiOutlineUsers className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">15.2K</div>
                      <div className="text-xs text-gray-600">KOC</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                        <HiOutlineCurrencyDollar className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">45B+</div>
                      <div className="text-xs text-gray-600">Giải thưởng</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#ff0086] rounded-xl flex items-center justify-center mx-auto mb-2">
                        <HiOutlineArrowTrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">850M</div>
                      <div className="text-xs text-gray-600">Lượt tiếp cận</div>
                    </div>
                  </div>
                  
                  <div className="text-center border-t border-gray-100 pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sẵn sàng trở thành KOC?</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      Tham gia cộng đồng KOC IKK với các thương hiệu hàng đầu
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                      <Link to="/register">
                        <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                          <HiOutlinePlusCircle className="w-4 h-4" />
                          <span>Đăng ký KOC</span>
                        </button>
                      </Link>
                      <Link to="/campaigns">
                        <button className="bg-white border border-gray-300 hover:border-[#ff0086] text-gray-700 hover:text-[#ff0086] px-6 py-3 rounded-lg font-semibold transition-colors">
                          Khám phá chiến dịch
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>



            {/* Premium Campaign Collection - Compact Version */}
            <section className="max-w-7xl mx-auto px-4 py-12" data-section="brands-section">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Premium Campaign Collection</h2>
                  <p className="text-gray-600">Khám phá những chiến dịch cao cấp với thương hiệu hàng đầu và phần thưởng hấp dẫn</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    <span className="flex items-center space-x-2">
                      <span>Bộ lọc</span>
                    </span>
                  </button>
                  <Link to="/campaigns/premium">
                    <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors" data-testid="button-view-all-premium-campaigns">
                      Xem tất cả
                    </button>
                  </Link>
                </div>
              </div>

              {/* Premium Campaign Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  {
                    id: "premium-1",
                    title: "iPhone 16 Pro Max - Elite Tech Review",
                    brand: "Apple Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/000000/FFFFFF?text=",
                    reward: "8,000,000 VNĐ",
                    bonusReward: "iPhone 16 Pro",
                    participants: "15/30",
                    deadline: "15/10/2025",
                    status: "đang hoạt động",
                    statusColor: "bg-gradient-to-r from-green-600 to-emerald-600",
                    daysLeft: 15,
                    category: "Technology/Premium",
                    description: "Trải nghiệm và đánh giá chi tiết camera AI, performance của iPhone 16 Pro Max mới nhất",
                    requirements: ["Tech Review", "Video Content", "100K+ Reach"],
                    engagement: "250K",
                    image: "https://picsum.photos/300/200?random=201",
                    difficulty: "Expert",
                    timeCommitment: "7-10 ngày",
                    campaignType: "Premium Review",
                    platforms: ["instagram", "youtube", "tiktok"],
                    location: "Hồ Chí Minh",
                    isUrgent: true,
                    rating: 4.9
                  },
                  {
                    id: "premium-2",
                    title: "Louis Vuitton Holiday Collection 2025",
                    brand: "Louis Vuitton",
                    brandLogo: "https://via.placeholder.com/64x64/8B4513/FFFFFF?text=LV",
                    reward: "12,000,000 VNĐ",
                    bonusReward: "MacBook Pro M4",
                    participants: "5/10",
                    deadline: "20/10/2025",
                    status: "đang tuyển KOC",
                    statusColor: "bg-gradient-to-r from-blue-600 to-indigo-700",
                    daysLeft: 20,
                    category: "Fashion/Luxury",
                    description: "Showcase bộ sưu tập holiday sang trọng với styling chuyên nghiệp và aesthetic cao cấp",
                    requirements: ["Fashion Content", "Luxury Styling", "200K+ Reach"],
                    engagement: "180K",
                    image: "https://picsum.photos/300/200?random=202",
                    difficulty: "Expert",
                    timeCommitment: "14-21 ngày",
                    campaignType: "Luxury Fashion",
                    platforms: ["instagram", "youtube"],
                    location: "Hà Nội",
                    isUrgent: false,
                    rating: 4.8
                  },
                  {
                    id: "premium-3",
                    title: "Tesla Model S Plaid - Automotive Excellence",
                    brand: "Tesla Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/DC143C/FFFFFF?text=T",
                    reward: "15,000,000 VNĐ",
                    bonusReward: "MacBook Pro + iPhone",
                    participants: "3/8",
                    deadline: "25/10/2025",
                    status: "đang tuyển KOC",
                    statusColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
                    daysLeft: 25,
                    category: "Automotive/Tech",
                    description: "Test drive và review chi tiết về performance, autonomous driving của Tesla Model S Plaid",
                    requirements: ["Automotive Content", "Tech Review", "Premium Audience"],
                    engagement: "320K",
                    image: "https://picsum.photos/300/200?random=203",
                    difficulty: "Expert",
                    timeCommitment: "10-14 ngày",
                    campaignType: "Automotive Review",
                    platforms: ["youtube", "instagram", "tiktok"],
                    location: "Đà Nẵng",
                    isUrgent: true,
                    rating: 4.9
                  },
                  {
                    id: "premium-4",
                    title: "Rolex GMT-Master II - Timepiece Heritage",
                    brand: "Rolex Switzerland",
                    brandLogo: "https://via.placeholder.com/64x64/DAA520/000000?text=R",
                    reward: "25,000,000 VNĐ",
                    bonusReward: "Luxury Watch Collection",
                    participants: "2/5",
                    deadline: "30/10/2025",
                    status: "đang tuyển KOC",
                    statusColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
                    daysLeft: 30,
                    category: "Luxury/Premium",
                    description: "Trải nghiệm đẳng cấp với bộ sưu tập GMT-Master II, kể câu chuyện thương hiệu heritage",
                    requirements: ["Luxury Content", "Watch Knowledge", "High-end Audience"],
                    engagement: "95K",
                    image: "https://picsum.photos/300/200?random=204",
                    difficulty: "Master",
                    timeCommitment: "21-30 ngày",
                    campaignType: "Luxury Heritage",
                    platforms: ["instagram", "youtube"],
                    location: "Hà Nội",
                    isUrgent: false,
                    rating: 5.0
                  },
                  {
                    id: "premium-5",
                    title: "Zero Waste Lifestyle - Eco Premium",
                    brand: "EcoLife Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/228B22/FFFFFF?text=E",
                    reward: "4,500,000 VNĐ",
                    bonusReward: "Eco Product Package",
                    participants: "42/50",
                    deadline: "05/11/2025",
                    status: "đang hoạt động",
                    statusColor: "bg-gradient-to-r from-emerald-600 to-teal-700",
                    daysLeft: 35,
                    category: "Sustainability/Lifestyle",
                    description: "30-day challenge về lối sống bền vững, chia sẻ hành trình zero waste và bảo vệ môi trường",
                    requirements: ["Lifestyle Content", "Eco Awareness", "Authentic Journey"],
                    engagement: "85K",
                    image: "https://picsum.photos/300/200?random=205",
                    difficulty: "Trung bình",
                    timeCommitment: "30 ngày",
                    campaignType: "Challenge",
                    platforms: ["instagram", "tiktok", "facebook"],
                    location: "Toàn quốc",
                    isUrgent: false,
                    rating: 4.7
                  },
                  {
                    id: "premium-6",
                    title: "Gaming Elite Championship - Esports",
                    brand: "Garena Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/FF4500/FFFFFF?text=G",
                    reward: "18,000,000 VNĐ",
                    bonusReward: "Gaming Setup",
                    participants: "24/32",
                    deadline: "12/11/2025",
                    status: "đang hoạt động",
                    statusColor: "bg-gradient-to-r from-indigo-600 to-purple-700",
                    daysLeft: 42,
                    category: "Gaming/Esports",
                    description: "Tham gia tournament PUBG Mobile Elite, streaming live và tạo highlight content",
                    requirements: ["Gaming Content", "Live Streaming", "Tournament Skills"],
                    engagement: "450K",
                    image: "https://picsum.photos/300/200?random=206",
                    difficulty: "Expert",
                    timeCommitment: "Tournament duration",
                    campaignType: "Tournament",
                    platforms: ["youtube", "twitch", "facebook"],
                    location: "Online",
                    isUrgent: true,
                    rating: 4.8
                  }
                ].map((campaign, index) => {
                  const getPlatformIcon = (platform: string) => {
                    switch(platform) {
                      case 'tiktok': return <FaTiktok className="w-4 h-4 text-black" />;
                      case 'instagram': return <FaInstagram className="w-4 h-4 text-pink-500" />;
                      case 'youtube': return <FaYoutube className="w-4 h-4 text-red-500" />;
                      case 'facebook': return <FaFacebookF className="w-4 h-4 text-blue-600" />;
                      case 'twitch': return <HiOutlineVideoCamera className="w-4 h-4 text-purple-500" />;
                      default: return null;
                    }
                  };

                  return (
                    <div key={campaign.id} className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden">
                      {/* Premium Campaign Image */}
                      <div className="relative overflow-hidden">
                        <div className="w-full h-40 bg-gray-50 flex items-center justify-center">
                          <img 
                            src={campaign.image || "/placeholder.jpg"} 
                            alt={campaign.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.jpg";
                            }}
                          />
                        </div>
                        
                        {/* Premium Status Badge & Platforms */}
                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {/* Compact Premium Status Badge */}
                            <div className={`px-2 py-0.5 rounded-md text-[10px] font-medium text-white shadow-sm ${campaign.statusColor} flex items-center space-x-1`}>
                              <HiOutlineTrophy className="w-3 h-3" />
                              <span>{campaign.status}</span>
                            </div>
                            {/* Days Left Indicator */}
                            {campaign.daysLeft <= 30 && (
                              <div className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-yellow-400 text-gray-900 shadow-sm">
                                {campaign.daysLeft} ngày
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            {campaign.platforms?.slice(0, 2).map((platform, idx) => (
                              <div key={idx} className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                                {getPlatformIcon(platform)}
                              </div>
                            ))}
                            {campaign.platforms?.length > 2 && (
                              <div className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                                <span className="text-xs font-bold text-gray-600">+{campaign.platforms.length - 2}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        {/* Brand with Logo and Rating */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {/* Brand Logo */}
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                              <img 
                                src={campaign.brandLogo} 
                                alt={campaign.brand}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  if (target.nextSibling) {
                                    (target.nextSibling as HTMLElement).style.display = 'flex';
                                  }
                                }}
                              />
                              {/* Fallback for missing logo */}
                              <div className="w-full h-full bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ display: 'none' }}>
                                {campaign.brand.charAt(0)}
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-600 font-medium">{campaign.brand}</span>
                              <span className="text-xs text-gray-500">{campaign.category}</span>
                            </div>
                          </div>
                          {/* Rating */}
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <HiOutlineStar className="w-4 h-4 fill-current" />
                            <span className="text-xs font-bold text-gray-900">{campaign.rating}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#ff0086] transition-colors">
                          {campaign.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {campaign.description}
                        </p>

                        {/* Reward Info */}
                        <div className="bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 rounded-lg p-3 mb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-lg font-bold text-[#ff0086]">{campaign.reward}</div>
                              <div className="text-xs text-gray-600">+ {campaign.bonusReward}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-500">KOC tham gia</div>
                              <div className="text-sm font-semibold text-gray-900">{campaign.participants}</div>
                            </div>
                          </div>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <HiOutlineClock className="w-3 h-3" />
                              <span>{campaign.timeCommitment}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <HiOutlineEye className="w-3 h-3" />
                              <span>{campaign.engagement}</span>
                            </div>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center space-x-1 mb-3 text-xs text-gray-600">
                          <HiOutlineMapPin className="w-3 h-3 text-blue-500" />
                          <span>{campaign.location}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1">
                            <HiOutlinePlusCircle className="w-4 h-4" />
                            <span>Ứng tuyển</span>
                          </button>
                          <button className="p-2 border border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors">
                            <HiOutlineBookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Call-to-Action Section */}
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 rounded-2xl border border-[#ff0086]/20 p-6">
                  <div className="inline-flex items-center space-x-2 bg-[#ff0086] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <HiOutlineTrophy className="w-4 h-4" />
                    <span>PREMIUM OPPORTUNITIES</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Trở thành KOC Premium
                  </h3>
                  <p className="text-gray-600 max-w-xl mx-auto mb-6">
                    Tham gia các chiến dịch cao cấp với thương hiệu danh tiếng và nhận phần thưởng hấp dẫn
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                      <HiOutlinePlusCircle className="w-4 h-4" />
                      <span>Đăng ký KOC</span>
                    </button>
                    <button className="border border-[#ff0086] text-[#ff0086] hover:bg-[#ff0086]/5 px-6 py-3 rounded-lg font-semibold transition-colors">
                      Xem tất cả chiến dịch
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: CHIẾN DỊCH KOC SHOPEE - Shopee KOC campaigns */}
            <section className="max-w-7xl mx-auto px-4 mb-12" data-section="shopee-koc-campaigns">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Chiến dịch KOC Shopee</h2>
                  <p className="text-gray-600">Cơ hội kiếm tiền cùng Shopee - Review sản phẩm, chia sẻ deal hot và nhận hoa hồng hấp dẫn</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                    data-testid="filter-shopee-campaigns"
                  >
                    <span className="flex items-center space-x-2">
                      <HiOutlineFunnel className="w-4 h-4" />
                      <span>Bộ lọc</span>
                    </span>
                  </button>
                  <button 
                    className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors"
                    data-testid="view-all-shopee-campaigns"
                  >
                    Xem tất cả
                  </button>
                </div>
              </div>

              {/* Shopee Campaign Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  {
                    id: "shopee-1",
                    title: "Review Điện thoại Xiaomi 14 Ultra",
                    brand: "Xiaomi Official Store",
                    brandLogo: "https://via.placeholder.com/64x64/FF6900/FFFFFF?text=MI",
                    reward: "2,500,000 VNĐ",
                    commission: "8%",
                    participants: "12/25",
                    deadline: "20/10/2025",
                    status: "đang bán chạy",
                    statusColor: "bg-gradient-to-r from-green-600 to-emerald-600",
                    daysLeft: 8,
                    category: "Điện tử",
                    description: "Review chi tiết camera Leica, hiệu năng gaming và so sánh với các flagship khác",
                    requirements: ["Unboxing Video", "Camera Test", "Gaming Review"],
                    shopeeRating: "4.8⭐",
                    sold: "1.2K+",
                    originalPrice: "25,990,000",
                    salePrice: "22,990,000",
                    discount: "12%",
                    image: "https://picsum.photos/320/160?random=1",
                    difficulty: "Trung bình",
                    timeCommitment: "5-7 ngày",
                    campaignType: "Product Review",
                    location: "Toàn quốc",
                    isUrgent: true,
                    shopeeVerified: true,
                    platforms: ["tiktok", "instagram", "youtube"],
                    rating: 4.8
                  },
                  {
                    id: "shopee-2", 
                    title: "Thử thách Makeup với 3CE Vietnam",
                    brand: "3CE Official Store",
                    brandLogo: "https://via.placeholder.com/64x64/FF1744/FFFFFF?text=3CE",
                    reward: "1,800,000 VNĐ",
                    commission: "15%",
                    participants: "28/40",
                    deadline: "25/10/2025",
                    status: "trending",
                    statusColor: "bg-gradient-to-r from-red-600 to-pink-600",
                    daysLeft: 13,
                    category: "Làm đẹp",
                    description: "Thử và review bộ sưu tập mới của 3CE, tạo look hoàn chỉnh và chia sẻ tips makeup",
                    requirements: ["Makeup Tutorial", "Before/After", "Tips & Tricks"],
                    shopeeRating: "4.9⭐",
                    sold: "856",
                    originalPrice: "899,000",
                    salePrice: "699,000",
                    discount: "22%",
                    image: "https://picsum.photos/320/160?random=2",
                    difficulty: "Dễ",
                    timeCommitment: "3-4 ngày",
                    campaignType: "Beauty Challenge",
                    location: "Hồ Chí Minh, Hà Nội",
                    isUrgent: false,
                    shopeeVerified: true,
                    platforms: ["instagram", "tiktok"],
                    rating: 4.9
                  },
                  {
                    id: "shopee-3",
                    title: "Đánh giá Áo hoodie Uniqlo U",
                    brand: "UNIQLO Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/DC143C/FFFFFF?text=UQ", 
                    reward: "1,200,000 VNĐ",
                    commission: "12%",
                    participants: "45/60",
                    deadline: "30/10/2025",
                    status: "bán chạy",
                    statusColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
                    daysLeft: 18,
                    category: "Thời trang",
                    description: "Review chất liệu, form dáng, cách phối đồ với hoodie Uniqlo U mùa đông 2025",
                    requirements: ["Outfit Styling", "Quality Test", "Size Guide"],
                    shopeeRating: "4.7⭐",
                    sold: "2.3K+",
                    originalPrice: "790,000",
                    salePrice: "590,000",
                    discount: "25%",
                    image: "https://picsum.photos/320/160?random=3",
                    difficulty: "Dễ",
                    timeCommitment: "2-3 ngày",
                    campaignType: "Fashion Review",
                    location: "Toàn quốc",
                    isUrgent: false,
                    shopeeVerified: true,
                    platforms: ["youtube", "instagram"],
                    rating: 4.7
                  },
                  {
                    id: "shopee-4",
                    title: "Review Máy pha cà phê Delonghi",
                    brand: "Delonghi Official",
                    brandLogo: "https://via.placeholder.com/64x64/2196F3/FFFFFF?text=DL",
                    reward: "3,200,000 VNĐ",
                    commission: "10%",
                    participants: "8/15",
                    deadline: "15/10/2025",
                    status: "cao cấp",
                    statusColor: "bg-gradient-to-r from-purple-600 to-violet-700",
                    daysLeft: 3,
                    category: "Gia dụng",
                    description: "Test và đánh giá máy pha cà phê tự động, hướng dẫn sử dụng và các công thức pha chế",
                    requirements: ["Product Demo", "Recipe Tutorial", "Taste Test"],
                    shopeeRating: "4.6⭐",
                    sold: "234",
                    originalPrice: "12,990,000",
                    salePrice: "9,990,000",
                    discount: "23%",
                    image: "https://picsum.photos/320/160?random=4",
                    difficulty: "Trung bình",
                    timeCommitment: "7-10 ngày",
                    campaignType: "Product Demo",
                    location: "Hồ Chí Minh",
                    isUrgent: true,
                    shopeeVerified: true,
                    platforms: ["youtube", "tiktok", "instagram"],
                    rating: 4.6
                  }
                ].map((campaign, index) => {
                  const getPlatformIcon = (platform: string) => {
                    switch(platform) {
                      case 'tiktok': return <FaTiktok className="w-4 h-4 text-black" />;
                      case 'instagram': return <FaInstagram className="w-4 h-4 text-pink-500" />;
                      case 'youtube': return <FaYoutube className="w-4 h-4 text-red-500" />;
                      case 'facebook': return <FaFacebookF className="w-4 h-4 text-blue-600" />;
                      case 'twitch': return <HiOutlineVideoCamera className="w-4 h-4 text-purple-500" />;
                      default: return null;
                    }
                  };

                  return (
                  <div key={campaign.id} className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden">
                    {/* Campaign Image */}
                    <div className="relative overflow-hidden">
                      <div className="w-full h-40 bg-gray-50 flex items-center justify-center">
                        <img 
                          src={campaign.image || "/placeholder.jpg"} 
                          alt={campaign.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder.jpg";
                          }}
                        />
                      </div>
                      
                      {/* Premium Status Badge & Platforms */}
                      <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {/* Compact Premium Status Badge */}
                          <div className={`px-2 py-0.5 rounded-md text-[10px] font-medium text-white shadow-sm ${campaign.statusColor} flex items-center space-x-1`}>
                            <HiOutlineSparkles className="w-3 h-3" />
                            <span>{campaign.status}</span>
                          </div>
                          {/* Days Left Indicator */}
                          {campaign.daysLeft <= 30 && (
                            <div className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-yellow-400 text-gray-900 shadow-sm">
                              {campaign.daysLeft} ngày
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {campaign.platforms?.slice(0, 2).map((platform, idx) => (
                            <div key={idx} className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                              {getPlatformIcon(platform)}
                            </div>
                          ))}
                          {campaign.platforms?.length > 2 && (
                            <div className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                              <span className="text-xs font-bold text-gray-600">+{campaign.platforms.length - 2}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Shopee Price Info */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-xs text-gray-500 line-through">₫{campaign.originalPrice}</div>
                              <div className="text-sm font-bold text-[#ff0086]">₫{campaign.salePrice}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs bg-[#ff0086] text-white px-1.5 py-0.5 rounded">-{campaign.discount}</div>
                              <div className="text-xs text-gray-600 mt-1">{campaign.sold} đã bán</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Campaign Content */}
                    <div className="p-4">
                      {/* Brand with Logo and Rating */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {/* Brand Logo */}
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            <img 
                              src={campaign.brandLogo} 
                              alt={campaign.brand}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                if (target.nextSibling) {
                                  (target.nextSibling as HTMLElement).style.display = 'flex';
                                }
                              }}
                            />
                            {/* Fallback for missing logo */}
                            <div className="w-full h-full bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ display: 'none' }}>
                              {campaign.brand.charAt(0)}
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-600 font-medium">{campaign.brand}</span>
                            <span className="text-xs text-gray-500">{campaign.category}</span>
                          </div>
                        </div>
                        {/* Rating */}
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <HiOutlineStar className="w-4 h-4 fill-current" />
                          <span className="text-xs font-bold text-gray-900">{campaign.rating}</span>
                        </div>
                      </div>

                      {/* Campaign Title */}
                      <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#ff0086] transition-colors">
                        {campaign.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {campaign.description}
                      </p>

                      {/* Requirements */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {campaign.requirements.slice(0, 2).map((req, reqIndex) => (
                          <span key={reqIndex} className="inline-flex items-center px-2 py-1 bg-[#ff0086]/10 text-[#ff0086] text-xs rounded-full">
                            {req}
                          </span>
                        ))}
                        {campaign.requirements.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{campaign.requirements.length - 2}
                          </span>
                        )}
                      </div>

                      {/* Reward Info */}
                      <div className="bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-bold text-[#ff0086]">{campaign.reward}</div>
                            <div className="text-xs text-gray-600">+ {campaign.commission} hoa hồng</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">KOC tham gia</div>
                            <div className="text-sm font-semibold text-gray-900">{campaign.participants}</div>
                          </div>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <HiOutlineClock className="w-3 h-3" />
                            <span>{campaign.timeCommitment}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <HiOutlineEye className="w-3 h-3" />
                            <span>{campaign.sold} đã bán</span>
                          </div>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center space-x-1 mb-3 text-xs text-gray-600">
                        <HiOutlineMapPin className="w-3 h-3 text-blue-500" />
                        <span>{campaign.location}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button 
                          className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1"
                          data-testid={`apply-shopee-campaign-${campaign.id}`}
                        >
                          <HiOutlinePlusCircle className="w-4 h-4" />
                          <span>Ứng tuyển</span>
                        </button>
                        <button 
                          className="p-2 border border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors"
                          data-testid={`bookmark-shopee-campaign-${campaign.id}`}
                        >
                          <HiOutlineBookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>

              {/* Call-to-Action Section */}
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 rounded-2xl border border-[#ff0086]/20 p-6">
                  <div className="inline-flex items-center space-x-2 bg-[#ff0086] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <HiOutlineShoppingBag className="w-4 h-4" />
                    <span>SHOPEE KOC PROGRAM</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Trở thành KOC Shopee chính thức
                  </h3>
                  <p className="text-gray-600 max-w-xl mx-auto mb-6">
                    Tham gia chương trình KOC Shopee để nhận hoa hồng từ mỗi đơn hàng và các ưu đãi độc quyền
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <button 
                      className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
                      data-testid="register-shopee-koc"
                    >
                      <HiUserPlus className="w-4 h-4" />
                      <span>Đăng ký KOC Shopee</span>
                    </button>
                    <button 
                      className="border border-[#ff0086] text-[#ff0086] hover:bg-[#ff0086]/5 px-6 py-3 rounded-lg font-semibold transition-colors"
                      data-testid="learn-more-shopee"
                    >
                      Tìm hiểu thêm
                    </button>
                  </div>
                </div>
              </div>
            </section>


            {/* Section 7: NỘI DUNG KOC - Content do KOC tạo ra */}
            <section className="max-w-7xl mx-auto px-4 mb-12" data-section="koc-content">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Nội dung do KOC tạo ra</h2>
                  <p className="text-gray-600">Khám phá những content chất lượng từ cộng đồng KOC tài năng</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors" data-testid="button-filter-koc-content">
                    <span className="flex items-center space-x-2">
                      <HiOutlineFunnel className="w-4 h-4" />
                      <span>Bộ lọc</span>
                    </span>
                  </button>
                  <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors">
                    Xem tất cả
                  </button>
                </div>
              </div>

              {/* KOC Content Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  {
                    id: "koc-content-1",
                    title: "Review serum Vitamin C từ The Ordinary",
                    description: "Muốn cả nhà có độ ướng lành mạnh, không chất bảo quản, mà còn hỗ trợ các vấn đề về da dầy, tiêu hóa cả nhà nên...",
                    creator: {
                      name: "Hồ_Cầm_Tú_586",
                      avatar: "https://picsum.photos/60/60?random=11",
                      followers: "125K",
                      verified: true
                    },
                    metrics: {
                      views: "101,900",
                      likes: "1,567", 
                      comments: "53",
                      shares: "89"
                    },
                    platform: "tiktok",
                    duration: "1:45",
                    thumbnail: "https://picsum.photos/300/200?random=21",
                    category: "Beauty & Skincare",
                    location: "Hồ Chí Minh",
                    postedDate: "2 ngày trước"
                  },
                  {
                    id: "koc-content-2", 
                    title: "Unboxing iPhone 16 Pro Max - First Impression",
                    description: "Cùng mình unboxing và trải nghiệm nhanh iPhone 16 Pro Max mới nhất! Màu Titan tự nhiên quả là đẹp không tưởng...",
                    creator: {
                      name: "TechReview_Minh",
                      avatar: "https://picsum.photos/60/60?random=12",
                      followers: "89.2K",
                      verified: true
                    },
                    metrics: {
                      views: "245,680",
                      likes: "3,456",
                      comments: "127",
                      shares: "234"
                    },
                    platform: "youtube",
                    duration: "8:32",
                    thumbnail: "https://picsum.photos/300/200?random=22",
                    category: "Technology",
                    location: "Hà Nội",
                    postedDate: "1 ngày trước"
                  },
                  {
                    id: "koc-content-3",
                    title: "Outfit của ngày hôm nay - Korean Style",
                    description: "Hôm nay mình mix outfit theo phong cách Hàn Quốc super cute! Ai thích style này thì save lại nhé các bạn ơi...",
                    creator: {
                      name: "Fashion_Linh_Official",
                      avatar: "https://picsum.photos/60/60?random=13", 
                      followers: "156K",
                      verified: true
                    },
                    metrics: {
                      views: "78,432",
                      likes: "2,890",
                      comments: "89",
                      shares: "156"
                    },
                    platform: "instagram",
                    duration: "0:30",
                    thumbnail: "https://picsum.photos/300/200?random=23",
                    category: "Fashion & Style",
                    location: "Đà Nẵng",
                    postedDate: "3 ngày trước"
                  },
                  {
                    id: "koc-content-4",
                    title: "Cách làm bánh flan caramel siêu đơn giản",
                    description: "Hướng dẫn làm bánh flan caramel mềm mịn, thơm ngon tại nhà chỉ với 5 nguyên liệu đơn giản mà ai cũng có...",
                    creator: {
                      name: "BepNha_AnAn",
                      avatar: "https://picsum.photos/60/60?random=14",
                      followers: "203K",
                      verified: true
                    },
                    metrics: {
                      views: "189,567",
                      likes: "4,123",
                      comments: "267",
                      shares: "445"
                    },
                    platform: "tiktok",
                    duration: "2:15",
                    thumbnail: "https://picsum.photos/300/200?random=24",
                    category: "Food & Cooking",
                    location: "Cần Thơ",
                    postedDate: "1 ngày trước"
                  },
                  {
                    id: "koc-content-5",
                    title: "Trải nghiệm Tesla Model 3 - Xe điện tương lai",
                    description: "Lần đầu lái thử Tesla Model 3! Cảm giác lái êm ái, tính năng autopilot thật sự ấn tượng. Xe điện là tương lai...",
                    creator: {
                      name: "AutoReview_Duc", 
                      avatar: "https://picsum.photos/60/60?random=15",
                      followers: "67.8K",
                      verified: false
                    },
                    metrics: {
                      views: "134,829",
                      likes: "1,890",
                      comments: "156",
                      shares: "203"
                    },
                    platform: "youtube",
                    duration: "12:45",
                    thumbnail: "https://picsum.photos/300/200?random=25",
                    category: "Automotive",
                    location: "Hồ Chí Minh",
                    postedDate: "4 ngày trước"
                  },
                  {
                    id: "koc-content-6",
                    title: "Workout tại nhà hiệu quả trong 15 phút",
                    description: "Bài tập workout tại nhà siêu hiệu quả chỉ 15 phút! Không cần dụng cụ, phù hợp cho người bận rộn. Cùng tập nào!",
                    creator: {
                      name: "FitnessViet_Trainer",
                      avatar: "https://picsum.photos/60/60?random=16",
                      followers: "94.5K", 
                      verified: true
                    },
                    metrics: {
                      views: "98,765",
                      likes: "3,234",
                      comments: "198",
                      shares: "567"
                    },
                    platform: "instagram",
                    duration: "15:00",
                    thumbnail: "https://picsum.photos/300/200?random=26",
                    category: "Health & Fitness",
                    location: "Hà Nội",
                    postedDate: "2 ngày trước"
                  },
                  {
                    id: "koc-content-7",
                    title: "Du lịch Đà Lạt 3N2Đ với budget 2 triệu",
                    description: "Chia sẻ lịch trình du lịch Đà Lạt 3 ngày 2 đêm chỉ với 2 triệu đồng! Gồm ăn ở, vé máy bay và vui chơi...",
                    creator: {
                      name: "Travel_VanAnh",
                      avatar: "https://via.placeholder.com/60x60/FF69B4/FFFFFF?text=V", 
                      followers: "178K",
                      verified: true
                    },
                    metrics: {
                      views: "267,890",
                      likes: "5,678",
                      comments: "445",
                      shares: "890"
                    },
                    platform: "tiktok",
                    duration: "3:20",
                    thumbnail: "https://picsum.photos/300/200?random=301",
                    category: "Travel & Lifestyle",
                    location: "Đà Lạt",
                    postedDate: "3 ngày trước"
                  },
                  {
                    id: "koc-content-8",
                    title: "Đánh giá AirPods Pro 2 sau 6 tháng sử dụng",
                    description: "Review chi tiết AirPods Pro 2 sau 6 tháng sử dụng thực tế. Pin có còn tốt? Chống ồn có hiệu quả? Cùng xem nhé!",
                    creator: {
                      name: "GadgetReview_Nam",
                      avatar: "https://via.placeholder.com/60x60/4267B2/FFFFFF?text=N",
                      followers: "112K",
                      verified: true  
                    },
                    metrics: {
                      views: "156,432",
                      likes: "2,789",
                      comments: "234",
                      shares: "345"
                    },
                    platform: "youtube",
                    duration: "7:18",
                    thumbnail: "https://picsum.photos/300/200?random=302",
                    category: "Technology",
                    location: "Hồ Chí Minh",
                    postedDate: "1 ngày trước"
                  }
                ].map((content, index) => {
                  const getPlatformIcon = (platform: string) => {
                    switch(platform) {
                      case 'tiktok': return <FaTiktok className="w-4 h-4 text-white" />;
                      case 'instagram': return <FaInstagram className="w-4 h-4 text-white" />;
                      case 'youtube': return <FaYoutube className="w-4 h-4 text-white" />;
                      case 'facebook': return <FaFacebookF className="w-4 h-4 text-white" />;
                      default: return null;
                    }
                  };

                  const formatNumber = (num: string) => {
                    return num.replace(/,/g, ',');
                  };

                  return (
                    <div key={content.id} className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden">
                      {/* Content Thumbnail with HiOutlinePlay Button & Metrics */}
                      <div className="relative overflow-hidden">
                        <div className="w-full h-48 bg-gray-50 flex items-center justify-center relative">
                          <img 
                            src={content.thumbnail || "/placeholder.jpg"} 
                            alt={content.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder.jpg";
                            }}
                          />
                          
                          {/* HiOutlineVideoCamera HiOutlinePlay Button Overlay */}
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <div className="w-0 h-0 border-l-[12px] border-l-[#ff0086] border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                            </div>
                          </div>

                          {/* Duration Badge */}
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md">
                            {content.duration}
                          </div>

                          {/* Platform Icon */}
                          <div className="absolute top-2 right-2 w-8 h-8 bg-black/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            {getPlatformIcon(content.platform)}
                          </div>

                          {/* Metrics Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <div className="grid grid-cols-3 gap-4 text-white text-sm">
                              <div>
                                <div className="font-bold">View</div>
                                <div className="text-xs">{formatNumber(content.metrics.views)}</div>
                              </div>
                              <div>
                                <div className="font-bold">Like</div>
                                <div className="text-xs">{formatNumber(content.metrics.likes)}</div>
                              </div>
                              <div>
                                <div className="font-bold">Comment</div>
                                <div className="text-xs">{formatNumber(content.metrics.comments)}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-4">
                        {/* Creator Info */}
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                            <img 
                              src={content.creator.avatar} 
                              alt={content.creator.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                if (target.nextSibling) {
                                  (target.nextSibling as HTMLElement).style.display = 'flex';
                                }
                              }}
                            />
                            {/* Fallback Avatar */}
                            <div className="w-full h-full bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ display: 'none' }}>
                              {content.creator.name.charAt(0)}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-semibold text-gray-900">{content.creator.name}</span>
                              {content.creator.verified && (
                                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                  <HiOutlineCheckCircle className="w-3 h-3 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">{content.creator.followers} followers</div>
                          </div>
                          <div className="text-xs text-gray-400">{content.postedDate}</div>
                        </div>

                        {/* Content Description */}
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3 leading-relaxed">
                          {content.description}
                        </p>

                        {/* Category & Tags */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-[#ff0086] font-medium bg-[#ff0086]/10 px-2 py-1 rounded-md">
                            {content.category}
                          </span>
                          <div className="flex items-center space-x-1 text-gray-400">
                            <HiOutlineEye className="w-3 h-3" />
                            <span className="text-xs">{content.metrics.views}</span>
                          </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center space-x-1 mb-3 text-xs text-gray-600">
                          <HiOutlineMapPin className="w-3 h-3 text-blue-500" />
                          <span>{content.location}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <button className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1">
                            <HiOutlineVideoCamera className="w-4 h-4" />
                            <span>Xem ngay</span>
                          </button>
                          <button className="p-2 border border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors">
                            <HiOutlineHeart className="w-4 h-4" />
                          </button>
                          <button className="p-2 border border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors">
                            <HiOutlineShare className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View More Section */}
              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 rounded-2xl border border-[#ff0086]/20 p-6">
                  <div className="inline-flex items-center space-x-2 bg-[#ff0086] text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <HiOutlineVideoCamera className="w-4 h-4" />
                    <span>KOC CONTENT HUB</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Khám phá thêm nội dung từ KOC
                  </h3>
                  <p className="text-gray-600 max-w-xl mx-auto mb-6">
                    Xem thêm hàng ngàn video, hình ảnh và nội dung chất lượng từ cộng đồng KOC tài năng
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                      <HiOutlineVideoCamera className="w-4 h-4" />
                      <span>Xem tất cả content</span>
                    </button>
                    <button className="border border-[#ff0086] text-[#ff0086] hover:bg-[#ff0086]/5 px-6 py-3 rounded-lg font-semibold transition-colors">
                      Trở thành creator
                    </button>
                  </div>
                </div>
              </div>
            </section>



            {/* Section 7: AFFILIATE - Chương trình Affiliate Marketing */}
            <section className="max-w-7xl mx-auto px-4 mb-12" data-section="affiliate-programs">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Chiến dịch Affiliate Marketing</h2>
                  <p className="text-gray-600">Khám phá cơ hội affiliate với hoa hồng hấp dẫn và sản phẩm chất lượng cao</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    <span className="flex items-center space-x-2">
                      <span>Bộ lọc</span>
                    </span>
                  </button>
                  <Link to="/affiliate">
                    <button className="px-4 py-2 bg-[#ff0086] hover:bg-[#e6007a] text-white rounded-lg text-sm font-medium transition-colors">
                      Xem tất cả
                    </button>
                  </Link>
                </div>
              </div>

              {/* Featured Affiliate Banner */}
              <div className="mb-8">
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl overflow-hidden h-48 md:h-64">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="relative z-10 h-full flex items-center justify-between p-8">
                    <div className="text-white max-w-2xl">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                          Affiliate Elite
                        </span>
                        <span className="bg-green-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                          HỤE HỒNG ĐẾN 35%
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold mb-3">
                        Tech Affiliate Program 2025
                      </h3>
                      <p className="text-lg mb-4 opacity-90">
                        Chương trình affiliate công nghệ với hoa hồng lên đến 35% từ các thương hiệu hàng đầu
                      </p>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-1">
                          <HiOutlineUsers className="w-4 h-4" />
                          <span>5,800+ Affiliate tham gia</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <HiOutlineCurrencyDollar className="w-4 h-4" />
                          <span>Hoa hồng: 15-35%</span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                      <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                        Tham gia ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Affiliate Categories */}
              <div className="flex space-x-3 mb-8 overflow-x-auto pb-2">
                {[
                  { name: "Tất cả", count: "89", active: true },
                  { name: "Technology", count: "32", active: false },
                  { name: "Fashion & Beauty", count: "28", active: false },
                  { name: "Health & Fitness", count: "15", active: false },
                  { name: "Home & Living", count: "12", active: false },
                  { name: "Food & Beverage", count: "8", active: false }
                ].map((category, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      category.active 
                        ? "bg-[#ff0086] text-white" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* Enhanced Affiliate Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  {
                    id: "affiliate-1",
                    title: "MacBook Pro M4 Max - Premium Tech Affiliate",
                    brand: "Apple Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/000000/FFFFFF?text=",
                    commission: "25%",
                    commissionAmount: "15,000,000 VNĐ",
                    productPrice: "59,999,000 VNĐ",
                    status: "đang tuyển KOC",
                    statusColor: "bg-blue-500",
                    category: "Technology/Premium",
                    description: "Affiliate program cho MacBook Pro M4 Max với hoa hồng cao và support training",
                    requirements: ["Tech Knowledge", "Audience 50K+", "Content Creation"],
                    sales: "234 bán",
                    conversionRate: "8.5%",
                    image: "https://picsum.photos/300/200?random=401",
                    countdown: "Còn 7 ngày",
                    avgOrderValue: "59.9M VNĐ",
                    affiliateType: "Tech Premium",
                    platforms: ["website", "social", "youtube"],
                    bonusStructure: "Tier-based",
                    isUrgent: true,
                    rating: 4.9,
                    cookieDuration: "90 ngày"
                  },
                  {
                    id: "affiliate-2", 
                    title: "Nike Air Max 270 - Sneaker Collection",
                    brand: "Nike Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/FF7518/FFFFFF?text=N",
                    commission: "18%",
                    commissionAmount: "720,000 VNĐ",
                    productPrice: "4,000,000 VNĐ",
                    status: "đang tuyển KOC",
                    statusColor: "bg-blue-500",
                    category: "Fashion/Sports",
                    description: "Chương trình affiliate giày thể thao Nike với bộ sưu tập Air Max mới nhất",
                    requirements: ["Fashion Content", "Sports Lifestyle", "Active Community"],
                    sales: "156 bán",
                    conversionRate: "12.3%",
                    image: "https://picsum.photos/300/200?random=402",
                    countdown: "Còn 14 ngày",
                    avgOrderValue: "4M VNĐ",
                    affiliateType: "Fashion Sports",
                    platforms: ["instagram", "tiktok", "youtube"],
                    bonusStructure: "Volume-based",
                    isUrgent: false,
                    rating: 4.7,
                    cookieDuration: "60 ngày"
                  },
                  {
                    id: "affiliate-3",
                    title: "Dyson V15 Detect - Smart Home Appliance",
                    brand: "Dyson Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/702963/FFFFFF?text=D",
                    commission: "22%",
                    commissionAmount: "3,300,000 VNĐ",
                    productPrice: "15,000,000 VNĐ",
                    status: "đang hoạt động",
                    statusColor: "bg-green-500",
                    category: "Home & Living",
                    description: "Affiliate máy hút bụi Dyson V15 với công nghệ AI detect và hoa hồng cao",
                    requirements: ["Home Content", "Product Demo", "Review Skills"],
                    sales: "89 bán",
                    conversionRate: "6.8%",
                    image: "https://picsum.photos/300/200?random=403",
                    countdown: "Còn 21 ngày",
                    avgOrderValue: "15M VNĐ",
                    affiliateType: "Home Tech",
                    platforms: ["youtube", "website", "review"],
                    bonusStructure: "Performance-based",
                    isUrgent: false,
                    rating: 4.8,
                    cookieDuration: "45 ngày"
                  },
                  {
                    id: "affiliate-4",
                    title: "Whey Protein Optimum Nutrition - Fitness",
                    brand: "Optimum Nutrition",
                    brandLogo: "https://via.placeholder.com/64x64/FFD700/000000?text=ON",
                    commission: "30%",
                    commissionAmount: "450,000 VNĐ",
                    productPrice: "1,500,000 VNĐ",
                    status: "đang hoạt động",
                    statusColor: "bg-green-500",
                    category: "Health & Fitness",
                    description: "Chương trình affiliate thực phẩm bổ sung với hoa hồng 30% và bonus structure",
                    requirements: ["Fitness Content", "Health Knowledge", "Active Lifestyle"],
                    sales: "312 bán",
                    conversionRate: "15.2%",
                    image: "https://picsum.photos/300/200?random=404",
                    countdown: "Còn 10 ngày",
                    avgOrderValue: "1.5M VNĐ",
                    affiliateType: "Health Supplement",
                    platforms: ["instagram", "fitness", "youtube"],
                    bonusStructure: "Monthly bonus",
                    isUrgent: false,
                    rating: 4.6,
                    cookieDuration: "30 ngày"
                  },
                  {
                    id: "affiliate-5",
                    title: "Samsung Galaxy S25 Ultra - Flagship Mobile",
                    brand: "Samsung Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/1428A0/FFFFFF?text=S",
                    commission: "20%",
                    commissionAmount: "6,000,000 VNĐ",
                    productPrice: "30,000,000 VNĐ",
                    status: "đang hoạt động",
                    statusColor: "bg-green-500",
                    category: "Technology/Mobile",
                    description: "Affiliate Galaxy S25 Ultra với AI camera và S Pen, program độc quyền",
                    requirements: ["Tech Review", "Mobile Content", "Audience Quality"],
                    sales: "78 bán",
                    conversionRate: "5.4%",
                    image: "https://picsum.photos/300/200?random=405",
                    countdown: "Còn 30 ngày",
                    avgOrderValue: "30M VNĐ",
                    affiliateType: "Premium Mobile",
                    platforms: ["youtube", "tech", "review"],
                    bonusStructure: "Tier + Bonus",
                    isUrgent: true,
                    rating: 4.9,
                    cookieDuration: "120 ngày"
                  },
                  {
                    id: "affiliate-6",
                    title: "La Roche-Posay Skincare - Beauty Essential",
                    brand: "L'Oréal Vietnam",
                    brandLogo: "https://via.placeholder.com/64x64/00A86B/FFFFFF?text=LR",
                    commission: "28%",
                    commissionAmount: "840,000 VNĐ",
                    productPrice: "3,000,000 VNĐ",
                    status: "kết thúc",
                    statusColor: "bg-gray-500",
                    category: "Beauty & Skincare",
                    description: "Affiliate skincare routine cho da nhạy cảm với dòng sản phẩm dermatology",
                    requirements: ["Beauty Content", "Skincare Knowledge", "Authentic Review"],
                    sales: "445 bán",
                    conversionRate: "18.7%",
                    image: "https://picsum.photos/300/200?random=406",
                    countdown: "Còn 6 ngày",
                    avgOrderValue: "3M VNĐ",
                    affiliateType: "Beauty Care",
                    platforms: ["instagram", "tiktok", "beauty"],
                    bonusStructure: "Volume tiers",
                    isUrgent: false,
                    rating: 4.8,
                    cookieDuration: "60 ngày"
                  }
                ].map((affiliate, index) => {
                  const getPlatformIcon = (platform: string) => {
                    switch(platform) {
                      case 'instagram': return <FaInstagram className="w-4 h-4 text-pink-500" />;
                      case 'youtube': return <FaYoutube className="w-4 h-4 text-red-500" />;
                      case 'tiktok': return <FaTiktok className="w-4 h-4 text-black" />;
                      case 'website': return <HiOutlineGlobeAlt className="w-4 h-4 text-blue-500" />;
                      case 'social': return <HiOutlineShare className="w-4 h-4 text-green-500" />;
                      case 'tech': return <HiOutlineDevicePhoneMobile className="w-4 h-4 text-indigo-500" />;
                      case 'review': return <HiOutlineStar className="w-4 h-4 text-yellow-500" />;
                      case 'fitness': return <HiOutlineTrophy className="w-4 h-4 text-orange-500" />;
                      case 'beauty': return <HiOutlineSparkles className="w-4 h-4 text-pink-400" />;
                      default: return null;
                    }
                  };

                  const getAffiliateTypeIcon = (type: string) => {
                    switch(type) {
                      case 'Tech Premium': return <HiOutlineDevicePhoneMobile className="w-4 h-4 text-blue-500" />;
                      case 'Fashion Sports': return <HiOutlineTrophy className="w-4 h-4 text-green-500" />;
                      case 'Home Tech': return <HiOutlineBolt className="w-4 h-4 text-orange-500" />;
                      case 'Health Supplement': return <HiOutlineHeart className="w-4 h-4 text-red-500" />;
                      case 'Premium Mobile': return <HiOutlineStar className="w-4 h-4 text-purple-500" />;
                      case 'Beauty Care': return <HiOutlineSparkles className="w-4 h-4 text-pink-500" />;
                      default: return <HiOutlineCheckCircle className="w-4 h-4 text-gray-500" />;
                    }
                  };

                  return (
                    <Link key={affiliate.id} to="/affiliate/static-1/join">
                      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group cursor-pointer overflow-hidden">
                        {/* Affiliate Image */}
                        <div className="relative overflow-hidden">
                          <div className="w-full h-40 bg-gray-50 flex items-center justify-center">
                            <img 
                              src={affiliate.image || "/placeholder.jpg"} 
                              alt={affiliate.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder.jpg";
                              }}
                            />
                          </div>
                          
                          {/* Status Badge & Platforms */}
                          <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {/* Compact Status Badge */}
                              <div className={`px-2 py-0.5 rounded-md text-[10px] font-medium text-white shadow-sm ${affiliate.statusColor}`}>
                                <span>{affiliate.status}</span>
                              </div>
                              {/* Commission Badge */}
                              <div className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-green-400 text-gray-900 shadow-sm">
                                {affiliate.commission}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              {affiliate.platforms?.slice(0, 2).map((platform, idx) => (
                                <div key={idx} className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                                  {getPlatformIcon(platform)}
                                </div>
                              ))}
                              {affiliate.platforms?.length > 2 && (
                                <div className="w-6 h-6 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm">
                                  <span className="text-xs font-bold text-gray-600">+{affiliate.platforms.length - 2}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          {/* Brand with Logo and Affiliate Type */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              {/* Brand Logo */}
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                <img 
                                  src={affiliate.brandLogo} 
                                  alt={affiliate.brand}
                                  className="w-full h-full object-contain"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    if (target.nextSibling) {
                                      (target.nextSibling as HTMLElement).style.display = 'flex';
                                    }
                                  }}
                                />
                                {/* Fallback for missing logo */}
                                <div className="w-full h-full bg-gradient-to-br from-[#ff0086] to-pink-600 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ display: 'none' }}>
                                  {affiliate.brand.charAt(0)}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-gray-900">{affiliate.brand}</span>
                                <span className="text-xs text-gray-500">{affiliate.category}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              {getAffiliateTypeIcon(affiliate.affiliateType)}
                              <span className="text-xs font-medium text-gray-600">{affiliate.affiliateType}</span>
                            </div>
                          </div>
                          
                          {/* Title */}
                          <h3 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-[#ff0086] transition-colors">
                            {affiliate.title}
                          </h3>
                          
                          {/* Commission Reward Info - Premium Style */}
                          <div className="bg-gradient-to-r from-[#ff0086]/5 to-pink-500/5 rounded-lg p-3 mb-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-lg font-bold text-[#ff0086]">{affiliate.commission}</div>
                                <div className="text-xs text-gray-600">+ {affiliate.commissionAmount}</div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-gray-500">Đã bán</div>
                                <div className="text-sm font-semibold text-gray-900">{affiliate.sales}</div>
                              </div>
                            </div>
                          </div>

                          {/* Affiliate Performance & Stats */}
                          <div className="mb-3">
                            {/* Performance Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-blue-500 h-1.5 rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${Math.min(parseFloat(affiliate.conversionRate), 20) * 5}%` 
                                }}
                              ></div>
                            </div>
                            
                            {/* Meta Info */}
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <HiOutlineFunnel className="w-3 h-3 text-green-500" />
                                  <span>{affiliate.conversionRate}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <HiOutlineCurrencyDollar className="w-3 h-3" />
                                  <span>{affiliate.avgOrderValue}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1 text-xs font-medium text-[#ff0086]">
                                <HiOutlineClock className="w-3 h-3" />
                                <span>{affiliate.countdown}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Requirements - simplified */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {affiliate.requirements?.slice(0, 2).map((req, reqIndex) => (
                              <span key={reqIndex} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
                                {req}
                              </span>
                            ))}
                            {affiliate.requirements?.length > 2 && (
                              <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-md">
                                +{affiliate.requirements.length - 2}
                              </span>
                            )}
                          </div>
                          
                          {/* Action Buttons - Premium Style */}
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-[#ff0086] hover:bg-[#e6007a] text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1">
                              <HiOutlinePlusCircle className="w-4 h-4" />
                              <span>Ứng tuyển</span>
                            </button>
                            <button 
                              className="p-2 border border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors group"
                              aria-label="Bookmark affiliate program"
                              data-testid={`button-bookmark-affiliate-${affiliate.id}`}
                            >
                              <HiOutlineBookmark className="w-4 h-4 text-gray-600 group-hover:text-[#ff0086]" />
                            </button>
                            <button 
                              className="p-2 border border-gray-300 hover:border-[#ff0086] rounded-lg transition-colors group"
                              aria-label="Share affiliate program"
                              data-testid={`button-share-affiliate-${affiliate.id}`}
                            >
                              <HiOutlineShare className="w-4 h-4 text-gray-600 group-hover:text-[#ff0086]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Enhanced Statistics & CTA Section */}
              <div className="mt-8">
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <HiOutlineFunnel className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">89</div>
                      <div className="text-xs text-gray-600">Chương trình</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <HiOutlineUsers className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">8.4K</div>
                      <div className="text-xs text-gray-600">Affiliate</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <HiOutlineCurrencyDollar className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">15-35%</div>
                      <div className="text-xs text-gray-600">Hoa hồng</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                        <HiOutlineArrowTrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">12.8%</div>
                      <div className="text-xs text-gray-600">Conversion</div>
                    </div>
                  </div>
                  
                  <div className="text-center border-t border-gray-100 pt-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Tham gia mạng lưới Affiliate IKK</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      Kết nối với các thương hiệu uy tín và nhận hoa hồng cao từ mỗi giao dịch thành công
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                      <Link to="/register">
                        <button className="bg-[#ff0086] hover:bg-[#e6007a] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
                          <HiOutlinePlusCircle className="w-4 h-4" />
                          <span>Đăng ký ngay</span>
                        </button>
                      </Link>
                      <Link to="/affiliate">
                        <button className="bg-white border border-gray-300 hover:border-[#ff0086] text-gray-700 hover:text-[#ff0086] px-6 py-3 rounded-lg font-semibold transition-colors">
                          Tìm hiểu thêm
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8: LIVE STREAM - Danh sách các luồng phát trực tiếp */}
            <section className="max-w-7xl mx-auto px-4 mb-12" data-section="live-streams">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">LIVE Nổi bật</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[
                  { 
                    streamer: "IKK Beauty Expert",
                    title: "Review son môi mới nhất từ Maybelline - Honest Review",
                    category: "Beauty/Fashion",
                    viewers: "838",
                    location: "Hồ Chí Minh"
                  },
                  { 
                    streamer: "Tech Guru VN", 
                    title: "HiOutlineDevicePhoneMobile flagship 2024 - Unboxing & Performance Test",
                    category: "Technology", 
                    viewers: "1,099",
                    location: "Hà Nội"
                  },
                  { 
                    streamer: "Food Explorer",
                    title: "Khám phá món ăn đường phố Hà Nội - Street Food Tour",
                    category: "Food/Cooking",
                    viewers: "572",
                    location: "Hà Nội"
                  },
                  { 
                    streamer: "Daily Lifestyle",
                    title: "Morning Routine & Product Recommendations for Busy Life",
                    category: "Lifestyle",
                    viewers: "403",
                    location: "Đà Nẵng"
                  },
                  { 
                    streamer: "Travel Vietnam",
                    title: "Hoi An Ancient Town - Historical Places & Local Culture",
                    category: "Travel",
                    viewers: "767",
                    location: "Hội An"
                  },
                  { 
                    streamer: "Fashion Trends",
                    title: "Fall Fashion 2024 - Styling Tips & Outfit Ideas",
                    category: "Fashion",
                    viewers: "495",
                    location: "Hồ Chí Minh"
                  }
                ].map((stream, index) => (
                  <div key={index} className="group cursor-pointer">
                    {/* Thumbnail */}
                    <div className="relative mb-3 rounded-lg overflow-hidden">
                      <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <HiOutlinePlay className="w-12 h-12 text-gray-400" />
                      </div>
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                        LIVE_{stream.viewers}
                      </div>
                      <div className="absolute top-2 right-2 text-white text-xs bg-black/50 px-1 py-0.5 rounded">
                        Xem sau
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">{stream.streamer.charAt(0)}</span>
                          </div>
                          <span className="text-white text-xs font-medium">{stream.streamer}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                        {stream.title}
                      </h3>
                      <div className="flex items-center space-x-1 mb-2 text-xs text-gray-600">
                        <HiOutlineMapPin className="w-3 h-3 text-blue-500" />
                        <span>{stream.location}</span>
                      </div>
                      <p className="text-xs text-gray-400">{stream.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            </div>
          </>
        );
      default: 
        return (
          <div className="min-h-screen bg-background text-foreground">
            <MainNavigation 
              onSectionChange={setActiveSection}
              activeSection={activeSection}
            />
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-foreground mb-4">Component không tìm thấy</h3>
              <p className="text-muted-foreground">Vui lòng chọn một section khác từ menu.</p>
            </div>
          </div>
        );
    }
  };

  // For non-overview sections, use the standard layout
  if (activeSection !== 'overview') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <MainNavigation 
          onSectionChange={setActiveSection}
          activeSection={activeSection}
        />
        
        <div className="max-w-7xl mx-auto px-6 py-8">
          {renderSection()}
        </div>
      </div>
    );
  }

  // For overview, use the SOOP Live style
  return renderSection();
}