import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Shield, RefreshCw, Smartphone } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { toast } from 'sonner@2.0.3';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';

interface TwoFactorAuthProps {
  email: string;
  onVerified: () => void;
  onBack: () => void;
}

export function TwoFactorAuth({ email, onVerified, onBack }: TwoFactorAuthProps) {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleVerify = () => {
    if (code.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    
    setTimeout(() => {
      setIsVerifying(false);
      toast.success('Verification successful!');
      onVerified();
    }, 1500);
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setCode('');
    toast.success('New code sent!');
  };

  const maskEmail = (email: string) => {
    const [local, domain] = email.split('@');
    return `${local.slice(0, 2)}***@${domain}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <Card className="w-full max-w-md p-8 md:p-12 bg-white dark:bg-gray-900 shadow-2xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-6 -ml-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/50 animate-pulse">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-[32px] text-center mb-2 text-gray-900 dark:text-white tracking-tight">
            Two-Factor Authentication
          </h1>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Enter the code sent to your device
          </p>
        </div>

        {/* Sent To Display */}
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Code sent to:</p>
          <p className="text-sm text-gray-900 dark:text-white font-mono">
            {maskEmail(email)}
          </p>
        </div>

        {/* OTP Input */}
        <div className="mb-8">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="w-12 h-14 text-xl" />
                <InputOTPSlot index={1} className="w-12 h-14 text-xl" />
                <InputOTPSlot index={2} className="w-12 h-14 text-xl" />
                <InputOTPSlot index={3} className="w-12 h-14 text-xl" />
                <InputOTPSlot index={4} className="w-12 h-14 text-xl" />
                <InputOTPSlot index={5} className="w-12 h-14 text-xl" />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Timer/Resend */}
        <div className="text-center mb-8">
          {canResend ? (
            <Button
              variant="link"
              onClick={handleResend}
              className="text-blue-600 hover:text-blue-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Resend code
            </Button>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Resend code in{' '}
              <span className="font-mono text-blue-600">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </p>
          )}
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerify}
          disabled={code.length !== 6 || isVerifying}
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isVerifying ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Verifying...
            </div>
          ) : (
            'Verify & Continue'
          )}
        </Button>

        {/* Alternative Method */}
        <div className="mt-6">
          <button className="w-full text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Try another method
          </button>
        </div>

        {/* Backup Code */}
        <div className="mt-4 text-center">
          <button className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            Use backup code
          </button>
        </div>
      </Card>
    </div>
  );
}
