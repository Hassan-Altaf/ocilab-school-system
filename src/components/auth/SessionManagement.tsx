import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface SessionManagementProps {
  onBack: () => void;
}

export function SessionManagement({ onBack }: SessionManagementProps) {
  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Card className="p-12 text-center">
          <h1 className="text-2xl mb-4">Session Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your active sessions</p>
        </Card>
      </div>
    </div>
  );
}
