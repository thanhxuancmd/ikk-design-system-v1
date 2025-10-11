import { useState } from 'react';
import { AppleToastProvider } from '@/contexts/AppleToastContext';
import { useAppleToast } from '@/hooks/useAppleToast';
import {
  AppleToastContainer,
  AppleAlert,
  AppleModal,
  AppleDialog,
  AppleLoading,
  AppleSkeleton,
  AppleButton,
  AppleSectionHeader,
} from '@/components/apple';

function FeedbackDemo() {
  const toast = useAppleToast();
  const [showModal, setShowModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showDangerDialog, setShowDangerDialog] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Apple HIG Feedback Components</h1>
          <p className="text-gray-600">Comprehensive feedback component library following Apple Human Interface Guidelines</p>
        </div>

        {/* Toast Section */}
        <section>
          <AppleSectionHeader
            title="Toast Notifications"
            description="Temporary messages that slide in from the top-right"
          />
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex flex-wrap gap-3">
              <AppleButton
                onClick={() => toast.success('Operation completed successfully!')}
                variant="primary"
                data-testid="button-toast-success"
              >
                Show Success Toast
              </AppleButton>
              <AppleButton
                onClick={() => toast.error('An error occurred!')}
                variant="secondary"
                data-testid="button-toast-error"
              >
                Show Error Toast
              </AppleButton>
              <AppleButton
                onClick={() => toast.warning('Please review your input')}
                variant="secondary"
                data-testid="button-toast-warning"
              >
                Show Warning Toast
              </AppleButton>
              <AppleButton
                onClick={() => toast.info('Here is some information')}
                variant="secondary"
                data-testid="button-toast-info"
              >
                Show Info Toast
              </AppleButton>
            </div>
          </div>
        </section>

        {/* Alert Section */}
        <section>
          <AppleSectionHeader
            title="Alerts"
            description="Inline contextual messages with optional close button"
          />
          <div className="space-y-4">
            <AppleAlert severity="success" title="Success!">
              Your changes have been saved successfully.
            </AppleAlert>
            
            <AppleAlert severity="error" title="Error" onClose={() => console.log('Alert closed')}>
              There was a problem processing your request.
            </AppleAlert>
            
            <AppleAlert severity="warning">
              Your session will expire in 5 minutes. Please save your work.
            </AppleAlert>
            
            <AppleAlert severity="info" title="Information">
              You have 3 pending notifications to review.
            </AppleAlert>
          </div>
        </section>

        {/* Modal Section */}
        <section>
          <AppleSectionHeader
            title="Modal"
            description="Overlay dialog with backdrop and configurable sizes"
          />
          <div className="bg-white rounded-lg p-6">
            <AppleButton onClick={() => setShowModal(true)} data-testid="button-open-modal">
              Open Modal
            </AppleButton>
          </div>
        </section>

        {/* Dialog Section */}
        <section>
          <AppleSectionHeader
            title="Dialog"
            description="Confirmation dialogs for user actions"
          />
          <div className="bg-white rounded-lg p-6 flex gap-3">
            <AppleButton onClick={() => setShowDialog(true)} data-testid="button-open-dialog">
              Open Confirmation Dialog
            </AppleButton>
            <AppleButton onClick={() => setShowDangerDialog(true)} variant="secondary" data-testid="button-open-danger-dialog">
              Open Danger Dialog
            </AppleButton>
          </div>
        </section>

        {/* Loading Section */}
        <section>
          <AppleSectionHeader
            title="Loading Spinner"
            description="Loading indicators with optional fullscreen mode"
          />
          <div className="bg-white rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <AppleLoading size="sm" />
                <p className="text-sm text-gray-500 mt-2">Small</p>
              </div>
              <div className="text-center">
                <AppleLoading size="md" />
                <p className="text-sm text-gray-500 mt-2">Medium</p>
              </div>
              <div className="text-center">
                <AppleLoading size="lg" />
                <p className="text-sm text-gray-500 mt-2">Large</p>
              </div>
              <div className="text-center">
                <AppleLoading size="md" text="Loading..." />
                <p className="text-sm text-gray-500 mt-2">With Text</p>
              </div>
            </div>
            <AppleButton onClick={() => setShowLoading(!showLoading)} data-testid="button-toggle-fullscreen-loading">
              Toggle Fullscreen Loading
            </AppleButton>
          </div>
        </section>

        {/* Skeleton Section */}
        <section>
          <AppleSectionHeader
            title="Skeleton Loaders"
            description="Placeholder UI for loading content"
          />
          <div className="bg-white rounded-lg p-6 space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Text Variants</h4>
              <div className="space-y-2">
                <AppleSkeleton variant="text" width="100%" />
                <AppleSkeleton variant="text" width="80%" />
                <AppleSkeleton variant="text" width="60%" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Circular (Avatar)</h4>
              <div className="flex gap-3">
                <AppleSkeleton variant="circular" width={40} height={40} />
                <AppleSkeleton variant="circular" width={60} height={60} />
                <AppleSkeleton variant="circular" width={80} height={80} />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Rectangular (Cards)</h4>
              <div className="grid grid-cols-3 gap-4">
                <AppleSkeleton variant="rectangular" height={200} />
                <AppleSkeleton variant="rectangular" height={200} animation="wave" />
                <AppleSkeleton variant="rectangular" height={200} />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Card with Content</h4>
              <div className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <AppleSkeleton variant="circular" width={50} height={50} />
                  <div className="flex-1 space-y-2">
                    <AppleSkeleton variant="text" width="60%" />
                    <AppleSkeleton variant="text" width="40%" />
                  </div>
                </div>
                <AppleSkeleton variant="rectangular" height={150} />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal */}
      <AppleModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Example Modal"
        size="md"
        footer={
          <div className="flex justify-end gap-3">
            <AppleButton variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </AppleButton>
            <AppleButton variant="primary" onClick={() => setShowModal(false)}>
              Confirm
            </AppleButton>
          </div>
        }
      >
        <p className="text-gray-600">
          This is a modal dialog with a backdrop, animations, and focus trap. 
          Press Escape or click outside to close.
        </p>
      </AppleModal>

      {/* Dialog */}
      <AppleDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        title="Confirm Action"
        description="Are you sure you want to proceed with this action?"
        onConfirm={() => {
          toast.success('Action confirmed!');
        }}
      />

      {/* Danger Dialog */}
      <AppleDialog
        open={showDangerDialog}
        onClose={() => setShowDangerDialog(false)}
        title="Delete Item"
        description="This action cannot be undone. Are you sure you want to delete this item?"
        confirmText="Delete"
        variant="danger"
        onConfirm={() => {
          toast.success('Item deleted!');
        }}
      />

      {/* Fullscreen Loading */}
      {showLoading && (
        <AppleLoading fullScreen text="Loading, please wait..." />
      )}
    </div>
  );
}

export default function AppleHIGFeedbackPage() {
  return (
    <AppleToastProvider>
      <AppleToastContainer />
      <FeedbackDemo />
    </AppleToastProvider>
  );
}
