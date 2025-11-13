import { LucideIcon } from 'lucide-react';
import { cn } from '../ui/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  gradient?: string;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  gradient = 'from-[#0A66C2] to-blue-600'
}: StatCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-2xl p-5",
      "bg-gradient-to-br",
      gradient,
      "shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    )}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-white/5"></div>
      
      <div className="relative">
        <p className="text-white/90 text-sm mb-2 font-medium">
          {title}
        </p>
        <h3 className="text-white text-3xl mb-1 tracking-tight">
          {value}
        </h3>
        {change && (
          <p className="text-white/80 text-sm font-medium">
            {change}
          </p>
        )}
      </div>
    </div>
  );
}
