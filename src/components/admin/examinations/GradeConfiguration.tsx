import { ArrowLeft } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';

interface GradeConfigurationProps {
  onBack: () => void;
}

export function GradeConfiguration({ onBack }: GradeConfigurationProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-[32px] text-gray-900 dark:text-white tracking-tight">
          Grade Configuration
        </h1>
      </div>
      <Card className="p-12 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl text-center">
        <p className="text-gray-500 dark:text-gray-400">Grade configuration interface</p>
      </Card>
    </div>
  );
}
