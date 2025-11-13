import { useState } from 'react';
import { Key, Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';

interface SetNewPasswordProps {
  onPasswordSet: () => void;
}

export function SetNewPassword({ onPasswordSet }: SetNewPasswordProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const requirements = [
    { text: 'At least 8 characters', met: newPassword.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/.test(newPassword) },
    { text: 'One lowercase letter', met: /[a-z]/.test(newPassword) },
    { text: 'One number', met: /\d/.test(newPassword) },
    { text: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) }
  ];

  const allRequirementsMet = requirements.every(req => req.met);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;

  const getPasswordStrength = () => {
    const metCount = requirements.filter(req => req.met).length;
    return (metCount / requirements.length) * 100;
  };

  const getStrengthLabel = () => {
    const strength = getPasswordStrength();
    if (strength < 40) return { label: 'Weak', color: 'text-red-600' };
    if (strength < 80) return { label: 'Medium', color: 'text-yellow-600' };
    return { label: 'Strong', color: 'text-green-600' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!allRequirementsMet) {
      toast.error('Please meet all password requirements');
      return;
    }

    if (!passwordsMatch) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Password updated successfully!');
      onPasswordSet();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md p-8 md:p-12 bg-white dark:bg-gray-900 shadow-2xl">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/50">
              <Key className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-[32px] text-center mb-2 text-gray-900 dark:text-white tracking-tight">
            Create New Password
          </h1>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Choose a strong password for your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div>
            <Label htmlFor="newPassword" className="text-sm mb-2 block">
              New Password
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 pr-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Password Strength Meter */}
            {newPassword && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Password strength</span>
                  <span className={`text-xs ${getStrengthLabel().color}`}>
                    {getStrengthLabel().label}
                  </span>
                </div>
                <Progress 
                  value={getPasswordStrength()} 
                  className="h-2"
                />
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="text-sm mb-2 block">
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`h-12 pr-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${
                  confirmPassword && (passwordsMatch ? 'border-green-500' : 'border-red-500')
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {confirmPassword && (
                <div className="absolute right-12 top-1/2 -translate-y-1/2">
                  {passwordsMatch ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Password Requirements */}
          <Card className="p-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h3 className="text-sm mb-3 text-gray-900 dark:text-white">
              Password must contain:
            </h3>
            <div className="space-y-2">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    req.met ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    {req.met && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm ${
                    req.met ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!allRequirementsMet || !passwordsMatch || isLoading}
            className="w-full h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-base shadow-lg shadow-green-500/30 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Setting password...
              </div>
            ) : (
              'Set Password & Continue'
            )}
          </Button>

          {/* Security Notice */}
          <div className="text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            <Key className="w-4 h-4" />
            Your password is encrypted and cannot be recovered
          </div>
        </form>
      </Card>
    </div>
  );
}
