import { useState } from 'react';
import { ArrowLeft, GraduationCap, CreditCard, Calendar, Phone, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { toast } from 'sonner@2.0.3';

interface StudentParentLoginProps {
  onBack: () => void;
  onForgotPassword: (email: string) => void;
  onLogin: (email: string, password: string, needs2FA: boolean) => void;
}

export function StudentParentLogin({ onBack, onForgotPassword, onLogin }: StudentParentLoginProps) {
  const [activeTab, setActiveTab] = useState('student');
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [parentLoginMethod, setParentLoginMethod] = useState('otp');
  const [isLoading, setIsLoading] = useState(false);

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!admissionNumber || !dateOfBirth) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Login successful');
      onLogin(admissionNumber, dateOfBirth, false);
    }, 1500);
  };

  const handleParentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mobileNumber) {
      toast.error('Please enter your mobile number');
      return;
    }

    if (parentLoginMethod === 'password' && !password) {
      toast.error('Please enter your password');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      if (parentLoginMethod === 'otp') {
        toast.success('OTP sent to your mobile');
      } else {
        toast.success('Login successful');
        onLogin(mobileNumber, password, false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-green-900/20 dark:to-teal-900/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>

            <h1 className="text-[32px] text-center mb-2 text-gray-900 dark:text-white tracking-tight">
              Student & Parent Login
            </h1>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Access your learning dashboard
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="student" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Student Login
              </TabsTrigger>
              <TabsTrigger value="parent" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                Parent Login
              </TabsTrigger>
            </TabsList>

            {/* Student Tab */}
            <TabsContent value="student">
              <form onSubmit={handleStudentSubmit} className="space-y-6">
                {/* Admission Number */}
                <div>
                  <Label htmlFor="admission" className="text-sm mb-2 block">
                    Admission Number
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="admission"
                      type="text"
                      placeholder="STU-2024-XXXX"
                      value={admissionNumber}
                      onChange={(e) => setAdmissionNumber(e.target.value)}
                      className="h-12 pl-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div>
                  <Label htmlFor="dob" className="text-sm mb-2 block">
                    Date of Birth
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="dob"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="h-12 pl-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Format: DD/MM/YYYY
                  </p>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white text-base shadow-lg shadow-green-500/30 transition-all duration-200 hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign In to Dashboard'
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Parent Tab */}
            <TabsContent value="parent">
              <form onSubmit={handleParentSubmit} className="space-y-6">
                {/* Mobile Number */}
                <div>
                  <Label htmlFor="mobile" className="text-sm mb-2 block">
                    Registered Mobile Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <div className="flex">
                      <select className="h-12 px-4 bg-gray-50 dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-700 rounded-l-lg focus:outline-none">
                        <option>+92</option>
                        <option>+1</option>
                        <option>+44</option>
                      </select>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="3XX-XXX-XXXX"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="h-12 pl-4 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 rounded-l-none focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Login Method */}
                <RadioGroup value={parentLoginMethod} onValueChange={setParentLoginMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="otp" id="otp" />
                    <Label htmlFor="otp" className="text-sm cursor-pointer">
                      Login with OTP
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="password" id="password-method" />
                    <Label htmlFor="password-method" className="text-sm cursor-pointer">
                      Login with Password
                    </Label>
                  </div>
                </RadioGroup>

                {/* Password Field (conditional) */}
                {parentLoginMethod === 'password' && (
                  <div>
                    <Label htmlFor="parent-password" className="text-sm mb-2 block">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="parent-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 pl-12 pr-12 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-green-500 focus:ring-green-500"
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
                )}

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white text-base shadow-lg shadow-green-500/30 transition-all duration-200 hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {parentLoginMethod === 'otp' ? 'Sending OTP...' : 'Signing in...'}
                    </div>
                  ) : (
                    parentLoginMethod === 'otp' ? 'Send OTP' : 'Access Parent Portal'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Help Section */}
          <Card className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Don't have login credentials?
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 border-green-300 dark:border-green-700">
                Contact School Office
              </Button>
              <Button variant="link" size="sm" className="text-green-600 hover:text-green-700 dark:text-green-400">
                Request Access →
              </Button>
            </div>
          </Card>

          {/* Safety Notice */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-blue-700 dark:text-blue-300">
                <strong>Safety Notice:</strong> For student safety, all sessions are monitored and logged. Parents can view login activity in their dashboard.
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
