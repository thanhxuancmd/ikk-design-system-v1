"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"
import type { Campaign, Application, Brand } from "@shared/schema"

// KOC interface for the frontend
export interface KOC {
  id: string
  name: string
  email: string
  avatar: string
  followers: {
    facebook?: number
    instagram?: number
    tiktok?: number
    youtube?: number
  }
  categories: string[]
  location: string
  rating: number
  completedCampaigns: number
  totalPoints: number
  level: "Nano" | "Micro" | "Macro" | "Celebrity"
  joinedDate: string
  isVerified: boolean
}

interface IKKPlatformContextType {
  // KOC Data
  currentKOC: KOC | null
  setCurrentKOC: (koc: KOC | null) => void

  // Campaigns
  campaigns: Campaign[]
  availableCampaigns: Campaign[]
  myCampaigns: Campaign[]
  loadCampaigns: () => void
  createCampaign: (campaign: Omit<Campaign, "id" | "createdAt">) => void
  updateCampaign: (id: string, updates: Partial<Campaign>) => void

  // Applications
  applications: Application[]
  applyToCampaign: (campaignId: string, message: string) => void
  submitContent: (applicationId: string, content: Application["submittedContent"]) => void

  // Brand Functions
  currentBrand: Brand | null
  setCurrentBrand: (brand: Brand | null) => void
  brands: Brand[]
  brandCampaigns: Campaign[]

  // Analytics
  getKOCAnalytics: (kocId: string) => any
  getCampaignAnalytics: (campaignId: string) => any

  // Notifications
  notifications: any[]
  markNotificationRead: (id: string) => void
}

const IKKPlatformContext = createContext<IKKPlatformContextType | undefined>(undefined)

export function IKKPlatformProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast()

  // State
  const [currentKOC, setCurrentKOC] = useState<KOC | null>(null)
  const [currentBrand, setCurrentBrand] = useState<Brand | null>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [notifications, setNotifications] = useState<any[]>([])

  // Load data on mount
  useEffect(() => {
    loadCampaigns()
    loadBrands()
    loadNotifications()
  }, [])

  // Load campaigns from API
  const loadCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns')
      const data = await response.json()
      if (response.ok) {
        setCampaigns(data.campaigns || [])
      }
    } catch (error) {
      console.error('Failed to load campaigns:', error)
    }
  }

  // Load brands from API
  const loadBrands = async () => {
    try {
      const response = await fetch('/api/brands')
      const data = await response.json()
      if (response.ok) {
        setBrands(data.brands || [])
      }
    } catch (error) {
      console.error('Failed to load brands:', error)
    }
  }

  // Load notifications from API
  const loadNotifications = async () => {
    try {
      const response = await fetch('/api/notifications')
      const data = await response.json()
      if (response.ok) {
        setNotifications(data.notifications || [])
      }
    } catch (error) {
      console.error('Failed to load notifications:', error)
    }
  }

  // Computed values
  const availableCampaigns = campaigns.filter(
    (c) =>
      c.status === "recruiting" &&
      (!currentKOC || !applications.some((a) => a.campaignId === c.id && a.kocId === currentKOC.id)),
  )

  const myCampaigns = campaigns.filter(
    (c) => currentKOC && applications.some((a) => a.campaignId === c.id && a.kocId === currentKOC.id),
  )

  const brandCampaigns = campaigns.filter((c) => currentBrand && c.brandId === currentBrand.id)

  // Functions
  const createCampaign = async (campaignData: Omit<Campaign, "id" | "createdAt">) => {
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaignData)
      })
      
      if (response.ok) {
        const newCampaign = await response.json()
        setCampaigns(prev => [...prev, newCampaign])
        toast({
          title: "Chiến dịch đã được tạo",
          description: `Chiến dịch "${newCampaign.title}" đã được tạo thành công`,
        })
      }
    } catch (error) {
      console.error('Failed to create campaign:', error)
      toast({
        title: "Lỗi",
        description: "Không thể tạo chiến dịch",
        variant: "destructive"
      })
    }
  }

  const updateCampaign = async (id: string, updates: Partial<Campaign>) => {
    try {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      
      if (response.ok) {
        const updatedCampaign = await response.json()
        setCampaigns(prev => prev.map(c => c.id === id ? updatedCampaign : c))
      }
    } catch (error) {
      console.error('Failed to update campaign:', error)
    }
  }

  const applyToCampaign = async (campaignId: string, message: string) => {
    if (!currentKOC) return

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId,
          kocId: currentKOC.id,
          message
        })
      })
      
      if (response.ok) {
        const newApplication = await response.json()
        setApplications(prev => [...prev, newApplication])
        
        // Reload campaigns to get updated applied count
        loadCampaigns()
        
        toast({
          title: "Ứng tuyển thành công",
          description: "Bạn đã ứng tuyển chiến dịch thành công. Chờ thương hiệu phê duyệt.",
        })
      }
    } catch (error) {
      console.error('Failed to apply to campaign:', error)
      toast({
        title: "Lỗi",
        description: "Không thể ứng tuyển chiến dịch",
        variant: "destructive"
      })
    }
  }

  const submitContent = async (applicationId: string, content: Application["submittedContent"]) => {
    // Update application with content submission
    setApplications(prev => prev.map(a => a.id === applicationId ? { ...a, submittedContent: content } : a))

    toast({
      title: "Nội dung đã được gửi",
      description: "Nội dung của bạn đã được gửi để kiểm duyệt",
    })
  }

  const getKOCAnalytics = (kocId: string) => {
    // Mock analytics data
    return {
      totalCampaigns: 12,
      completedCampaigns: 10,
      totalPoints: 8500,
      averageRating: 4.8,
      totalReach: 250000,
      totalEngagement: 15000,
    }
  }

  const getCampaignAnalytics = (campaignId: string) => {
    // Mock campaign analytics
    return {
      totalReach: 450000,
      totalEngagement: 22000,
      totalClicks: 3500,
      conversionRate: 2.5,
      topPerformingContent: [],
      kocPerformance: [],
    }
  }

  const markNotificationRead = async (id: string) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' })
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  const value: IKKPlatformContextType = {
    currentKOC,
    setCurrentKOC,
    currentBrand,
    setCurrentBrand,
    campaigns,
    brands,
    availableCampaigns,
    myCampaigns,
    brandCampaigns,
    loadCampaigns,
    createCampaign,
    updateCampaign,
    applications,
    applyToCampaign,
    submitContent,
    getKOCAnalytics,
    getCampaignAnalytics,
    notifications,
    markNotificationRead,
  }

  return <IKKPlatformContext.Provider value={value}>{children}</IKKPlatformContext.Provider>
}

export function useIKKPlatform() {
  const context = useContext(IKKPlatformContext)
  if (context === undefined) {
    throw new Error("useIKKPlatform must be used within an IKKPlatformProvider")
  }
  return context
}