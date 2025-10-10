import { Sidebar } from "@/components/dashboard/sidebar"
import ReportsOverview from "@/components/reports/reports-overview"
import { Badge } from "@/components/ui/badge"
import { Link } from "wouter"
import { BarChart3, ArrowLeft } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* IKK Style Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-[#ff0086] transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Quay lại Dashboard</span>
                  </button>
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#ff0086] rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Báo cáo & Phân tích</h1>
                    <Badge className="bg-[#ff0086]/10 text-[#ff0086] border-[#ff0086]/20 text-xs">Analytics & Reports</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Xin chào, <span className="font-medium text-gray-900">dev@ikk.vn</span></span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content with IKK Container Pattern */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <ReportsOverview />
          </div>
        </main>
      </div>
    </div>
  )
}