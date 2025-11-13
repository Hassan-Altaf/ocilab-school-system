import { useEffect } from 'react';
import { CheckCircle, TrendingUp, Users, Calendar } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { UserRole } from './AuthSystem';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface LoginSuccessProps {
  userName: string;
  userRole: UserRole;
  onComplete: () => void;
}

export function LoginSuccess({ userName, userRole, onComplete }: LoginSuccessProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  const getRoleColor = () => {
    switch (userRole) {
      case 'admin': return 'from-blue-600 to-blue-700';
      case 'teacher': return 'from-purple-600 to-purple-700';
      default: return 'from-green-600 to-teal-600';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-lg p-12 bg-white dark:bg-gray-900 shadow-2xl">
        <div className="text-center">
          {/* Animated Checkmark */}
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto animate-scale-in">
              <CheckCircle className="w-12 h-12 text-green-600 animate-check" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-[32px] mb-3 text-green-600 dark:text-green-400">
            Login Successful!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Redirecting to your dashboard...
          </p>

          {/* User Info */}
          <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className={`bg-gradient-to-br ${getRoleColor()} text-white text-xl`}>
                  {userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <h3 className="text-lg text-gray-900 dark:text-white">
                  Welcome back, {userName}!
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {userRole}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats Preview */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
              <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl text-blue-600">
                24
              </div>
              <div className="text-xs text-blue-600/70">Active</div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
              <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl text-purple-600">
                156
              </div>
              <div className="text-xs text-purple-600/70">Users</div>
            </Card>
            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
              <Calendar className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl text-green-600">
                12
              </div>
              <div className="text-xs text-green-600/70">Events</div>
            </Card>
          </div>

          {/* Loading Spinner */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>

          {/* Skip Button */}
          <Button
            variant="link"
            onClick={onComplete}
            className="mt-4 text-gray-500 hover:text-gray-700"
          >
            Skip
          </Button>
        </div>
      </Card>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        @keyframes check {
          0% {
            transform: scale(0) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
          }
        }
        .animate-check {
          animation: check 0.6s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
}
