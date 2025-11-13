import { useState } from 'react';
import { ArrowLeft, Key, Mail, Phone, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { UserRole } from './AuthSystem';

interface ForgotPasswordProps {
  onBack: () => void;
  onSubmit: () => void;
  userRole: UserRole | null;
}

export function ForgotPassword({ onBack, onSubmit, userRole }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>(userRole || 'admin');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      toast.success('Password reset link sent!');
    }, 1500);
  };

  const getRoleColor = () => {
    switch (selectedRole) {
      case 'admin': return { gradient: 'from-blue-600 to-blue-700', bg: 'bg-blue-50 dark:bg-blue-900/20' };
      case 'teacher': return { gradient: 'from-purple-600 to-purple-700', bg: 'bg-purple-50 dark:bg-purple-900/20' };
      default: return { gradient: 'from-green-600 to-teal-600', bg: 'bg-green-50 dark:bg-green-900/20' };
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="w-full max-w-md p-8 md:p-12 bg-white dark:bg-gray-900 shadow-2xl">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl mb-3 text-gray-900 dark:text-white">
              Check Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We've sent password reset instructions to:
            </p>
            <p className="text-lg text-gray-900 dark:text-white mb-8">
              {email}
            </p>

            <Card className={`p-6 mb-6 ${getRoleColor().bg}`}>
              <h3 className="text-sm mb-3 text-gray-900 dark:text-white">What happens next?</h3>
              <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                  <span>Check your email inbox (and spam folder)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
                  <span>Click the secure reset link (valid for 1 hour)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
                  <span>Create a new strong password</span>
                </li>
              </ol>
            </Card>

            <Button onClick={onBack} variant="outline" className="w-full">
              Back to Login
            </Button>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Didn't receive the email?{' '}
              <button className="text-blue-600 hover:underline" onClick={() => setEmailSent(false)}>
                Try again
              </button>
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md p-8 md:p-12 bg-white dark:bg-gray-900 shadow-2xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-6 -ml-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>

          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/50">
              <Key className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-[32px] text-center mb-2 text-gray-900 dark:text-white tracking-tight">
            Reset Password
          </h1>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Enter your email to receive reset instructions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Type Selector */}
          {!userRole && (
            <div>
              <Label htmlFor="userType" className="text-sm mb-2 block">
                I am a
              </Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                This helps us identify your account
              </p>
            </div>
          )}

          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="text-sm mb-2 block">
              Registered Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 pl-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className={`w-full h-14 bg-gradient-to-r ${getRoleColor().gradient} text-white text-base shadow-lg transition-all duration-200 hover:scale-[1.02]`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending reset link...
              </div>
            ) : (
              'Send Reset Link'
            )}
          </Button>

          {/* Alternative Options */}
          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <Phone className="w-4 h-4" />
              Or reset via SMS
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Administrator
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
