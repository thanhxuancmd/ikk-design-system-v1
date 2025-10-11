import { CampaignCard, CommissionBadge, LiveStatusBadge, AppleSectionHeader, AppleContainer } from '@/components/apple';

export default function IKKComponentsDemo() {
  return (
    <AppleContainer>
      <div className="py-8 space-y-12">
        <div>
          <AppleSectionHeader
            title="IKK Domain Components"
            description="Apple HIG compliant components for IKK Platform"
          />
        </div>

        {/* Campaign Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Campaign Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CampaignCard
              id="1"
              title="Review sản phẩm skincare mới nhất"
              brandName="Beauty Co."
              brandLogo="https://via.placeholder.com/48"
              category="Làm đẹp"
              type="review"
              reward={500000}
              kocNeeded={50}
              kocApplied={35}
              deadline="2025-10-20"
              status="recruiting"
              onClick={() => console.log('Campaign clicked')}
            />
            <CampaignCard
              id="2"
              title="Check-in tại cửa hàng flagship"
              brandName="Fashion Brand"
              category="Thời trang"
              type="checkin"
              reward={200000}
              kocNeeded={100}
              kocApplied={95}
              deadline="2025-10-15"
              status="in-progress"
            />
            <CampaignCard
              id="3"
              title="Seeding app mới trên social media"
              brandName="Tech Startup"
              brandLogo="https://via.placeholder.com/48"
              category="Công nghệ"
              type="seeding"
              reward={1000000}
              kocNeeded={30}
              kocApplied={30}
              deadline="2025-09-30"
              status="completed"
            />
          </div>
        </section>

        {/* Commission Badges */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Commission Badges</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Percentage Commission</h3>
              <div className="flex flex-wrap gap-4">
                <CommissionBadge rate={5} type="percentage" size="sm" />
                <CommissionBadge rate={12} type="percentage" size="md" />
                <CommissionBadge rate={25} type="percentage" size="lg" />
                <CommissionBadge rate={8} type="percentage" />
                <CommissionBadge rate={18} type="percentage" />
                <CommissionBadge rate={30} type="percentage" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Fixed Amount Commission</h3>
              <div className="flex flex-wrap gap-4">
                <CommissionBadge rate={0} type="fixed" amount={50000} size="sm" />
                <CommissionBadge rate={0} type="fixed" amount={150000} size="md" />
                <CommissionBadge rate={0} type="fixed" amount={500000} size="lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Live Status Badges */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Live Status Badges</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Live Status</h3>
              <div className="flex flex-wrap gap-4">
                <LiveStatusBadge status="live" size="sm" />
                <LiveStatusBadge status="live" size="md" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Offline Status</h3>
              <div className="flex flex-wrap gap-4">
                <LiveStatusBadge status="offline" size="sm" />
                <LiveStatusBadge status="offline" size="md" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Scheduled Status</h3>
              <div className="flex flex-wrap gap-4">
                <LiveStatusBadge status="scheduled" scheduledTime="2025-10-11T14:00:00" size="sm" />
                <LiveStatusBadge status="scheduled" scheduledTime="2025-10-11T20:30:00" size="md" />
              </div>
            </div>
          </div>
        </section>

        {/* Combined Examples */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Combined Examples</h2>
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Campaign with high commission:</span>
              <CommissionBadge rate={28} type="percentage" />
              <LiveStatusBadge status="live" />
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">Scheduled livestream:</span>
              <LiveStatusBadge status="scheduled" scheduledTime="2025-10-12T19:00:00" />
              <CommissionBadge rate={15} type="percentage" />
            </div>
            <div className="flex items-center gap-4">
              <span className="font-medium">Fixed commission campaign:</span>
              <CommissionBadge rate={0} type="fixed" amount={250000} />
              <LiveStatusBadge status="offline" size="sm" />
            </div>
          </div>
        </section>
      </div>
    </AppleContainer>
  );
}
