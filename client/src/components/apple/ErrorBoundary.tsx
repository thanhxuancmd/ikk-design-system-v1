import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertCircle } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';
import { AppleButton } from './AppleButton';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  className?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleGoHome = (): void => {
    window.location.href = '/';
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div 
          className={`min-h-screen flex items-center justify-center bg-gray-50 px-4 ${this.props.className || ''}`}
          data-testid="error-boundary-fallback"
        >
          <div className="max-w-md w-full text-center">
            <div 
              className="flex justify-center mb-6"
              data-testid="error-icon"
            >
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
            </div>

            <h1 
              className={`${designTokens.typography.h2} text-gray-900 mb-3`}
              data-testid="error-title"
            >
              Đã xảy ra lỗi
            </h1>

            <p 
              className={`${designTokens.typography.body} ${designTokens.typography.description} mb-6`}
              data-testid="error-message"
            >
              Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <div 
                className="mb-6 p-4 bg-gray-100 rounded-lg text-left"
                data-testid="error-stack"
              >
                <p className={`${designTokens.typography.small} font-semibold text-gray-700 mb-2`}>
                  Chi tiết lỗi (chỉ hiển thị ở môi trường dev):
                </p>
                <pre className={`${designTokens.typography.small} text-gray-600 overflow-x-auto whitespace-pre-wrap break-words`}>
                  {this.state.error.message}
                  {this.state.error.stack && `\n\n${this.state.error.stack}`}
                </pre>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <AppleButton
                variant="secondary"
                size="md"
                onClick={this.handleReset}
                data-testid="button-retry"
              >
                Thử lại
              </AppleButton>
              <AppleButton
                variant="primary"
                size="md"
                onClick={this.handleGoHome}
                data-testid="button-home"
              >
                Về trang chủ
              </AppleButton>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
