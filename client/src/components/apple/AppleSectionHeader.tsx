import { AppleButton } from './AppleButton';
import { ButtonVariant } from '@/constants/design-tokens';

interface ActionButton {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
}

interface AppleSectionHeaderProps {
  title: string;
  description?: string;
  actionButtons?: ActionButton[];
}

export function AppleSectionHeader({
  title,
  description,
  actionButtons = [],
}: AppleSectionHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-900" data-testid="text-section-title">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-gray-600" data-testid="text-section-description">
            {description}
          </p>
        )}
      </div>
      {actionButtons.length > 0 && (
        <div className="flex gap-3 ml-6">
          {actionButtons.map((button, index) => (
            <AppleButton
              key={index}
              variant={button.variant || 'primary'}
              onClick={button.onClick}
              data-testid={`button-action-${index}`}
            >
              {button.label}
            </AppleButton>
          ))}
        </div>
      )}
    </div>
  );
}
