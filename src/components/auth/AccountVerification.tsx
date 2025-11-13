import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface AccountVerificationProps {
  onComplete: () => void;
}

export function AccountVerification({ onComplete }: AccountVerificationProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md p-12 bg-white dark:bg-gray-900 shadow-2xl text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl mb-3 text-gray-900 dark:text-white">
          Account Verification
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Complete your profile setup
        </p>
        <Button onClick={onComplete} className="w-full">
          Complete Setup
        </Button>
      </Card>
    </div>
  );
}
