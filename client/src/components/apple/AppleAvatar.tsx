import { designTokens } from '@/constants/design-tokens';

interface AppleAvatarProps {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
  onClick?: () => void;
}

const sizeMap = {
  xs: { container: 'w-6 h-6', text: 'text-xs', status: 'w-2 h-2' },
  sm: { container: 'w-8 h-8', text: 'text-sm', status: 'w-2.5 h-2.5' },
  md: { container: 'w-10 h-10', text: 'text-base', status: 'w-3 h-3' },
  lg: { container: 'w-12 h-12', text: 'text-lg', status: 'w-3.5 h-3.5' },
  xl: { container: 'w-16 h-16', text: 'text-xl', status: 'w-4 h-4' },
};

const statusColors = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

function generateColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-emerald-500',
  ];
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

function getInitials(name: string): string {
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return name.slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export function AppleAvatar({
  src,
  name,
  size = 'md',
  status,
  onClick,
}: AppleAvatarProps) {
  const sizeClasses = sizeMap[size];
  const backgroundColor = generateColorFromName(name);
  const initials = getInitials(name);

  return (
    <div className="relative inline-block">
      <div
        data-testid={`avatar-${name}`}
        className={`
          ${sizeClasses.container}
          rounded-full
          flex items-center justify-center
          ${designTokens.transitions.base}
          ${onClick ? 'cursor-pointer hover:opacity-80' : ''}
          ${src ? '' : `${backgroundColor} text-white`}
          overflow-hidden
        `}
        onClick={onClick}
        aria-label={src ? undefined : `${name} avatar with initials ${initials}`}
      >
        {src ? (
          <img src={src} alt={`${name} avatar`} className="w-full h-full object-cover" />
        ) : (
          <span className={`${sizeClasses.text} font-semibold`}>{initials}</span>
        )}
      </div>
      
      {status && (
        <span
          data-testid="avatar-status"
          className={`
            absolute bottom-0 right-0
            ${sizeClasses.status}
            ${statusColors[status]}
            rounded-full
            border-2 border-white
          `}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}
