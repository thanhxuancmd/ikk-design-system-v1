import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IKKPlatformProvider } from "./contexts/ikk-platform-context";
import { NotificationProvider } from "./contexts/notification-context";
import QuickNavigation from "@/components/quick-navigation";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import DashboardRestoredPage from "@/pages/dashboard-restored";
import ReportsPage from "@/pages/reports";
import PaymentsPage from "@/pages/payments";
import ToolsPage from "@/pages/tools";
import AdvertiserPage from "@/pages/advertiser";
import KOCAppPage from "@/pages/koc-app";
import BrandDashboardPage from "@/pages/brand-dashboard";
import AdminPageRestored from "@/pages/ikk-admin-restored"
import AdminBrandsPage from "@/pages/admin/brands"
import AdminCategoriesPage from "@/pages/admin/brands/categories"
import AdminKOCPage from "@/pages/admin/koc"
import KOCRankingPage from "@/pages/admin/koc/ranking"
import AdminAnalyticsPage from "@/pages/admin/analytics"
import AdminFinancialPage from "@/pages/admin/financial"
import AdminUsersPage from "@/pages/admin/users"
import AdminUsersAllPage from "@/pages/admin/users/all"
import AdminUsersPermissionsPage from "@/pages/admin/users/permissions"
import AdminFinancialDashboardPage from "@/pages/admin/financial/dashboard"
import AdminSettingsPage from "@/pages/admin/settings"
import AdminCampaignsPage from "@/pages/admin/campaigns"
import NewCampaignPage from "@/pages/admin/campaigns/new"
import TikTokCampaignsPage from "@/pages/admin/campaigns/tiktok"
import AdminContentPage from "@/pages/admin/content"
import AdminContentFacebookPage from "@/pages/admin/content/facebook"
import AdminContentTikTokPage from "@/pages/admin/content/tiktok"
import AdminContentInstagramPage from "@/pages/admin/content/instagram"
import ExplorePage from "@/pages/explore"
import DesignSystem from "@/pages/design-system"
import KOCLandingPage from "@/pages/koc-landing"
import KOCAdvancedPage from "@/pages/koc-advanced"
import BrandPage from "@/pages/brand"
import CampaignsPage from "@/pages/campaigns"
import CampaignDetailPage from "@/pages/campaigns/[id]"
import CampaignApplyPage from "@/pages/campaigns/static-1/apply"
import CampaignsRewardsPage from "@/pages/campaigns/rewards"
import AdminDesignSystem from "@/pages/design-system/admin"
import AppleHIGShowcase from "@/pages/apple-hig"
import AppleHIGFeedbackPage from "@/pages/apple-hig-feedback"


function Router() {
  return (
    <div className="min-h-screen bg-background">
      <QuickNavigation />
      <Switch>
        {/* Main IKK Affiliate App Routes */}
        <Route path="/" component={AdminPageRestored} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/dashboard" component={DashboardRestoredPage} />
        <Route path="/dashboard/campaigns" component={CampaignsPage} />
        <Route path="/campaigns/:id" component={CampaignDetailPage} />
        <Route path="/campaigns/:id/apply" component={CampaignApplyPage} />
        <Route path="/dashboard/campaigns/rewards" component={CampaignsRewardsPage} />
        <Route path="/dashboard/reports" component={ReportsPage} />
        <Route path="/dashboard/payments" component={PaymentsPage} />
        <Route path="/dashboard/tools" component={ToolsPage} />
        <Route path="/advertiser" component={AdvertiserPage} />
        <Route path="/koc" component={KOCLandingPage} />
        <Route path="/koc-2" component={KOCAdvancedPage} />
        <Route path="/koc-app" component={KOCAppPage} />
        <Route path="/brand" component={BrandPage} />
        <Route path="/brand-dashboard" component={BrandDashboardPage} />
        <Route path="/explore" component={ExplorePage} />
        
        {/* IKK Admin Routes */}
        <Route path="/admin" component={AdminPageRestored} />
        <Route path="/admin/campaigns" component={AdminCampaignsPage} />
        <Route path="/admin/campaigns/new" component={NewCampaignPage} />
        <Route path="/admin/campaigns/tiktok" component={TikTokCampaignsPage} />
        <Route path="/admin/content" component={AdminContentPage} />
        <Route path="/admin/content/facebook" component={AdminContentFacebookPage} />
        <Route path="/admin/content/tiktok" component={AdminContentTikTokPage} />
        <Route path="/admin/content/instagram" component={AdminContentInstagramPage} />
        <Route path="/admin/brands" component={AdminBrandsPage} />
        <Route path="/admin/brands/categories" component={AdminCategoriesPage} />
        <Route path="/admin/koc" component={AdminKOCPage} />
        <Route path="/admin/koc/ranking" component={KOCRankingPage} />
        <Route path="/admin/analytics" component={AdminAnalyticsPage} />
        <Route path="/admin/financial" component={AdminFinancialPage} />
        <Route path="/admin/financial/dashboard" component={AdminFinancialDashboardPage} />
        <Route path="/admin/users" component={AdminUsersPage} />
        <Route path="/admin/users/all" component={AdminUsersAllPage} />
        <Route path="/admin/users/permissions" component={AdminUsersPermissionsPage} />
        <Route path="/admin/settings" component={AdminSettingsPage} />
        
        {/* Design System Routes */}
        <Route path="/design-system" component={DesignSystem} />
        <Route path="/design-system/admin" component={AdminDesignSystem} />
        <Route path="/apple-hig" component={AppleHIGShowcase} />
        <Route path="/apple-hig-feedback" component={AppleHIGFeedbackPage} />
        
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <IKKPlatformProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </IKKPlatformProvider>
      </NotificationProvider>
    </QueryClientProvider>
  );
}

export default App;
