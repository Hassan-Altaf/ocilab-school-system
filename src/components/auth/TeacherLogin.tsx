import { useState } from 'react';
import { ArrowLeft, BookOpen, Mail, Lock, Eye, EyeOff, User, HelpCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Card } from '../ui/card';
import { toast } from 'sonner@2.0.3';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

interface TeacherLoginProps {
  onBack: () => void;
  onForgotPassword: (email: string) => void;
  onLogin: (email: string, password: string, needs2FA: boolean) => void;
}

export function TeacherLogin({ onBack, onForgotPassword, onLogin }: TeacherLoginProps) {
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailOrId || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login successful');
      onLogin(emailOrId, password, false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="mb-6 -ml-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Portal Selection
            </Button>

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-[32px] text-center mb-2 text-gray-900 dark:text-white tracking-tight">
              Teacher Login
            </h1>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Access your classroom dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email or Employee ID Field */}
            <div>
              <Label htmlFor="emailOrId" className="text-sm mb-2 block">
                Email or Employee ID
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="emailOrId"
                  type="text"
                  placeholder="teacher@schoolhub.com or TCH-2024-001"
                  value={emailOrId}
                  onChange={(e) => setEmailOrId(e.target.value)}
                  className="h-12 pl-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="text-sm mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-12 pr-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Device & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberDevice}
                  onCheckedChange={(checked) => setRememberDevice(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  Remember device
                </label>
              </div>
              <button
                type="button"
                onClick={() => onForgotPassword(emailOrId)}
                className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-base shadow-lg shadow-purple-500/30 transition-all duration-200 hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In to Teacher Portal'
              )}
            </Button>
          </form>

          {/* Quick Access Help */}
          <Collapsible open={showHelp} onOpenChange={setShowHelp} className="mt-6">
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  First time logging in?
                </span>
                <span className="text-xs">
                  {showHelp ? 'Hide' : 'Show'}
                </span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Getting Started:</strong>
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 list-disc list-inside">
                  <li>Use your employee ID (e.g., TCH-2024-001)</li>
                  <li>Default password is your date of birth (DDMMYYYY)</li>
                  <li>You'll be asked to change your password on first login</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-700">
                  <Button
                    variant="link"
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 p-0 h-auto"
                  >
                    View login guide →
                  </Button>
                  <span className="mx-2 text-gray-400">•</span>
                  <Button
                    variant="link"
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 p-0 h-auto"
                  >
                    Contact IT support
                  </Button>
                </div>
              </Card>
            </CollapsibleContent>
          </Collapsible>

          {/* School ID */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              School ID: <span className="font-mono">SCH-2024-001</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
