import { Sidebar } from "@/components/dashboard/sidebar"
import ToolsOverview from "@/components/tools/tools-overview"
import { Badge } from "@/components/ui/badge"

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
          <div className="px-6">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">Công cụ</h1>
                <Badge className="bg-[#ff0086] text-white">Link Generation Tools</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Xin chào, dev@ikk.vn</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <ToolsOverview />
        </main>
      </div>
    </div>
  )
}