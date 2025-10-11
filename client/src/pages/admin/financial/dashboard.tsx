import IKKAdminLayout from "@/components/ikk-admin-layout";

export default function AdminFinancialDashboardPage() {
  return (
    <IKKAdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Tài chính</h1>
            <p className="text-gray-600 mb-6">Dashboard quản lý tài chính sẽ được phát triển trong phiên bản tiếp theo.</p>
            <div className="inline-flex items-center px-4 py-2 bg-[#ff0086] text-white rounded-lg text-sm font-medium">
              🚧 Đang phát triển
            </div>
          </div>
        </div>
      </div>
    </IKKAdminLayout>
  );
}