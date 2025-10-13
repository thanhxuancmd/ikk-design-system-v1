import { Trophy, Star, Award } from 'lucide-react';
import { designTokens } from '@/constants/design-tokens';

interface RankingBadgeTierLabels {
  nanoLabel?: string;
  microLabel?: string;
  macroLabel?: string;
  celebrityLabel?: string;
}

interface RankingBadgeProps {
  rank: number;
  level: 'Nano' | 'Micro' | 'Macro' | 'Celebrity';
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  tierLabels?: Partial<RankingBadgeTierLabels>;
}

const defaultTierLabels: RankingBadgeTierLabels = {
  nanoLabel: 'Nano',
  microLabel: 'Micro',
  macroLabel: 'Macro',
  celebrityLabel: 'Celebrity',
};

export function RankingBadge({
  rank,
  level,
  showIcon = true,
  size = 'md',
  className = '',
  tierLabels: customTierLabels,
}: RankingBadgeProps) {
  const tierLabels = { ...defaultTierLabels, ...customTierLabels };
  
  const levelColors = {
    Nano: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-300',
    },
    Micro: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-300',
    },
    Macro: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      border: 'border-purple-300',
    },
    Celebrity: {
      bg: 'bg-gradient-to-r from-yellow-400 to-amber-500',
      text: 'text-white',
      border: 'border-amber-400',
    },
  };

  const sizeClasses = {
    sm: {
      container: 'px-2 py-1 text-xs gap-1',
      icon: 'w-3 h-3',
      rank: 'text-xs',
    },
    md: {
      container: 'px-3 py-1.5 text-sm gap-1.5',
      icon: 'w-4 h-4',
      rank: 'text-sm',
    },
    lg: {
      container: 'px-4 py-2 text-base gap-2',
      icon: 'w-5 h-5',
      rank: 'text-base',
    },
  };

  const getLevelLabel = (level: 'Nano' | 'Micro' | 'Macro' | 'Celebrity'): string => {
    const labelMap = {
      Nano: tierLabels.nanoLabel,
      Micro: tierLabels.microLabel,
      Macro: tierLabels.macroLabel,
      Celebrity: tierLabels.celebrityLabel,
    };
    return labelMap[level] || level;
  };

  const getRankIcon = () => {
    if (!showIcon) return null;

    const iconClass = sizeClasses[size].icon;

    if (rank === 1) {
      return <Trophy className={iconClass} data-testid={`rank-icon-${rank}`} />;
    } else if (rank === 2) {
      return <Award className={iconClass} data-testid={`rank-icon-${rank}`} />;
    } else if (rank === 3) {
      return <Star className={iconClass} data-testid={`rank-icon-${rank}`} />;
    }

    return null;
  };

  const colors = levelColors[level];
  const sizes = sizeClasses[size];

  return (
    <div
      data-testid={`ranking-badge-${rank}-${level}`}
      className={`
        inline-flex items-center
        ${sizes.container}
        ${colors.bg}
        ${colors.text}
        border ${colors.border}
        ${designTokens.borderRadius.md}
        font-semibold
        ${designTokens.transitions.base}
        ${className}
      `}
    >
      {getRankIcon()}
      <span data-testid={`rank-number-${rank}`} className={sizes.rank}>
        #{rank}
      </span>
      <span data-testid={`rank-level-${level}`} className={sizes.rank}>
        {getLevelLabel(level)}
      </span>
    </div>
  );
}
