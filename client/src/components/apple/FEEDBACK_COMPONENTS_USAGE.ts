/**
 * Apple HIG Feedback Components Usage Guide
 * 
 * This file demonstrates how to use the 6 feedback components built for the Apple HIG Design System.
 * All components follow Apple Human Interface Guidelines and include full TypeScript support.
 * 
 * Demo page: /apple-hig-feedback
 */

/**
 * 1. TOAST NOTIFICATIONS
 * 
 * Setup: Wrap your app with AppleToastProvider and add AppleToastContainer
 * 
 * import { AppleToastProvider, AppleToastContainer } from '@/components/apple';
 * 
 * function App() {
 *   return (
 *     <AppleToastProvider>
 *       <AppleToastContainer />
 *       <YourApp />
 *     </AppleToastProvider>
 *   );
 * }
 * 
 * Usage in components:
 * 
 * import { useAppleToast } from '@/hooks/useAppleToast';
 * 
 * function MyComponent() {
 *   const toast = useAppleToast();
 *   
 *   return (
 *     <button onClick={() => toast.success('Success!')}>
 *       Show Toast
 *     </button>
 *   );
 * }
 * 
 * Available methods:
 * - toast.success(message, duration?)
 * - toast.error(message, duration?)
 * - toast.warning(message, duration?)
 * - toast.info(message, duration?)
 * - toast.toast({ message, type, duration })
 */

/**
 * 2. ALERT COMPONENT
 * 
 * import { AppleAlert } from '@/components/apple';
 * 
 * <AppleAlert severity="success" title="Success!">
 *   Your changes have been saved.
 * </AppleAlert>
 * 
 * <AppleAlert severity="error" onClose={() => console.log('closed')}>
 *   An error occurred.
 * </AppleAlert>
 * 
 * Props:
 * - severity: 'success' | 'error' | 'warning' | 'info'
 * - title?: string
 * - children: ReactNode
 * - onClose?: () => void
 * - icon?: ReactNode (custom icon override)
 */

/**
 * 3. MODAL COMPONENT
 * 
 * import { AppleModal, AppleButton } from '@/components/apple';
 * 
 * function MyComponent() {
 *   const [open, setOpen] = useState(false);
 *   
 *   return (
 *     <>
 *       <AppleButton onClick={() => setOpen(true)}>
 *         Open Modal
 *       </AppleButton>
 *       
 *       <AppleModal
 *         open={open}
 *         onClose={() => setOpen(false)}
 *         title="Modal Title"
 *         size="md"
 *         footer={
 *           <AppleButton onClick={() => setOpen(false)}>
 *             Close
 *           </AppleButton>
 *         }
 *       >
 *         <p>Modal content here</p>
 *       </AppleModal>
 *     </>
 *   );
 * }
 * 
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - title?: string
 * - children: ReactNode
 * - footer?: ReactNode
 * - size?: 'sm' | 'md' | 'lg' | 'xl'
 * - closeOnBackdrop?: boolean (default: true)
 * - closeOnEscape?: boolean (default: true)
 */

/**
 * 4. DIALOG COMPONENT
 * 
 * import { AppleDialog } from '@/components/apple';
 * 
 * function MyComponent() {
 *   const [open, setOpen] = useState(false);
 *   
 *   return (
 *     <AppleDialog
 *       open={open}
 *       onClose={() => setOpen(false)}
 *       title="Confirm Action"
 *       description="Are you sure?"
 *       onConfirm={() => {
 *         // handle confirm
 *         setOpen(false);
 *       }}
 *       variant="default"
 *     />
 *   );
 * }
 * 
 * Danger variant (destructive actions):
 * 
 * <AppleDialog
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Delete Item"
 *   description="This cannot be undone"
 *   confirmText="Delete"
 *   variant="danger"
 *   onConfirm={handleDelete}
 * />
 * 
 * Props:
 * - open: boolean
 * - onClose: () => void
 * - title: string
 * - description?: string
 * - confirmText?: string (default: "Confirm")
 * - cancelText?: string (default: "Cancel")
 * - onConfirm: () => void
 * - onCancel?: () => void
 * - variant?: 'default' | 'danger'
 */

/**
 * 5. LOADING COMPONENT
 * 
 * import { AppleLoading } from '@/components/apple';
 * 
 * Basic usage:
 * <AppleLoading />
 * 
 * With custom size and text:
 * <AppleLoading size="lg" text="Loading..." />
 * 
 * Fullscreen overlay:
 * <AppleLoading fullScreen text="Please wait..." />
 * 
 * Custom color:
 * <AppleLoading color="#0066cc" />
 * 
 * Props:
 * - size?: 'sm' | 'md' | 'lg' (default: 'md')
 * - color?: string (default: '#ff0086')
 * - text?: string
 * - fullScreen?: boolean (default: false)
 */

/**
 * 6. SKELETON COMPONENT
 * 
 * import { AppleSkeleton } from '@/components/apple';
 * 
 * Text lines:
 * <AppleSkeleton variant="text" width="100%" />
 * <AppleSkeleton variant="text" width="80%" />
 * 
 * Avatar:
 * <AppleSkeleton variant="circular" width={50} height={50} />
 * 
 * Card:
 * <AppleSkeleton variant="rectangular" height={200} />
 * 
 * With wave animation:
 * <AppleSkeleton variant="rectangular" animation="wave" height={150} />
 * 
 * Props:
 * - variant?: 'text' | 'circular' | 'rectangular' (default: 'text')
 * - width?: string | number
 * - height?: string | number
 * - className?: string
 * - animation?: 'pulse' | 'wave' (default: 'pulse')
 */

/**
 * DESIGN TOKENS USED
 * 
 * All components use tokens from @/constants/design-tokens:
 * - designTokens.colors.semantic (success, error, warning, info)
 * - designTokens.shadows.xl (modals)
 * - designTokens.transitions.base/fast (animations)
 * - designTokens.zIndex.modal/toast (layering)
 * - designTokens.borderRadius.md (rounded corners)
 */

/**
 * ACCESSIBILITY FEATURES
 * 
 * All components include:
 * - Proper ARIA roles and attributes
 * - Keyboard navigation support
 * - Focus management (modals trap focus)
 * - Screen reader announcements
 * - Test IDs for automated testing
 * 
 * Test IDs follow the pattern:
 * - toast-{id}, toast-{id}-close
 * - alert-{severity}, alert-{severity}-close
 * - modal-backdrop, modal-content, modal-close
 * - dialog-confirm, dialog-cancel
 * - loading-spinner, loading-fullscreen
 * - skeleton-{variant}
 */

export {};
