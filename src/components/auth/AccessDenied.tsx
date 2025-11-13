import { ShieldAlert, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface AccessDeniedProps {
  onBack: () => void;
}

export function AccessDenied({ onBack }: AccessDeniedProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-red-900/20">
      <Card className="w-full max-w-md p-12 bg-white dark:bg-gray-900 shadow-2xl text-center">
        <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-[32px] mb-3 text-red-600 dark:text-red-400">
          Access Denied
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You don't have permission to access this portal
        </p>
        <div className="space-y-3 mb-8">
          <p className="text-sm text-gray-600 dark:text-gray-400">Possible reasons:</p>
          <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <li>• Account not activated</li>
            <li>• Insufficient privileges</li>
            <li>• Session expired</li>
          </ul>
        </div>
        <div className="space-y-3">
          <Button onClick={onBack} className="w-full" variant="default">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Portal Selection
          </Button>
          <Button variant="outline" className="w-full">
            <Mail className="w-4 h-4 mr-2" />
            Contact Administrator
          </Button>
        </div>
      </Card>
    </div>
  );
}
