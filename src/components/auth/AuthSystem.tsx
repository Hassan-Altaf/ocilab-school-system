import { useState } from 'react';
import { PortalSelection } from './PortalSelection';
import { AdminLogin } from './AdminLogin';
import { TeacherLogin } from './TeacherLogin';
import { StudentParentLogin } from './StudentParentLogin';
import { ForgotPassword } from './ForgotPassword';
import { TwoFactorAuth } from './TwoFactorAuth';
import { SetNewPassword } from './SetNewPassword';
import { AccountVerification } from './AccountVerification';
import { SessionManagement } from './SessionManagement';
import { AccessDenied } from './AccessDenied';
import { SchoolSelector } from './SchoolSelector';
import { LoginSuccess } from './LoginSuccess';

export type AuthScreen = 
  | 'portal-selection'
  | 'admin-login'
  | 'teacher-login'
  | 'student-login'
  | 'forgot-password'
  | '2fa'
  | 'set-password'
  | 'account-verification'
  | 'session-management'
  | 'access-denied'
  | 'school-selector'
  | 'login-success';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

interface AuthSystemProps {
  onLoginSuccess?: (role: UserRole) => void;
}

export function AuthSystem({ onLoginSuccess }: AuthSystemProps) {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('portal-selection');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  const handlePortalSelect = (role: UserRole) => {
    setSelectedRole(role);
    // For multi-tenant, show school selector first
    // setCurrentScreen('school-selector');
    
    // Direct to login
    switch (role) {
      case 'admin':
        setCurrentScreen('admin-login');
        break;
      case 'teacher':
        setCurrentScreen('teacher-login');
        break;
      case 'student':
      case 'parent':
        setCurrentScreen('student-login');
        break;
    }
  };

  const handleBackToPortal = () => {
    setCurrentScreen('portal-selection');
    setSelectedRole(null);
  };

  const handleForgotPassword = (email: string) => {
    setUserEmail(email);
    setCurrentScreen('forgot-password');
  };

  const handleLoginAttempt = (email: string, password: string, needs2FA: boolean) => {
    setUserEmail(email);
    if (needs2FA) {
      setCurrentScreen('2fa');
    } else {
      setCurrentScreen('login-success');
    }
  };

  const handle2FAVerified = () => {
    setCurrentScreen('login-success');
  };

  const handlePasswordResetRequest = () => {
    setCurrentScreen('set-password');
  };

  const handlePasswordSet = () => {
    setCurrentScreen('login-success');
  };

  const handleLoginSuccess = () => {
    if (onLoginSuccess && selectedRole) {
      setTimeout(() => {
        onLoginSuccess(selectedRole);
      }, 2000);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'portal-selection':
        return <PortalSelection onSelectPortal={handlePortalSelect} />;
      
      case 'admin-login':
        return (
          <AdminLogin
            onBack={handleBackToPortal}
            onForgotPassword={handleForgotPassword}
            onLogin={handleLoginAttempt}
          />
        );
      
      case 'teacher-login':
        return (
          <TeacherLogin
            onBack={handleBackToPortal}
            onForgotPassword={handleForgotPassword}
            onLogin={handleLoginAttempt}
          />
        );
      
      case 'student-login':
        return (
          <StudentParentLogin
            onBack={handleBackToPortal}
            onForgotPassword={handleForgotPassword}
            onLogin={handleLoginAttempt}
          />
        );
      
      case 'forgot-password':
        return (
          <ForgotPassword
            onBack={() => setCurrentScreen(selectedRole === 'admin' ? 'admin-login' : selectedRole === 'teacher' ? 'teacher-login' : 'student-login')}
            onSubmit={handlePasswordResetRequest}
            userRole={selectedRole}
          />
        );
      
      case '2fa':
        return (
          <TwoFactorAuth
            email={userEmail}
            onVerified={handle2FAVerified}
            onBack={() => setCurrentScreen(selectedRole === 'admin' ? 'admin-login' : selectedRole === 'teacher' ? 'teacher-login' : 'student-login')}
          />
        );
      
      case 'set-password':
        return (
          <SetNewPassword
            onPasswordSet={handlePasswordSet}
          />
        );
      
      case 'account-verification':
        return (
          <AccountVerification
            onComplete={() => setCurrentScreen('login-success')}
          />
        );
      
      case 'session-management':
        return (
          <SessionManagement
            onBack={handleBackToPortal}
          />
        );
      
      case 'access-denied':
        return (
          <AccessDenied
            onBack={handleBackToPortal}
          />
        );
      
      case 'school-selector':
        return (
          <SchoolSelector
            onSchoolSelect={(schoolId) => {
              setSelectedSchool(schoolId);
              if (selectedRole === 'admin') setCurrentScreen('admin-login');
              else if (selectedRole === 'teacher') setCurrentScreen('teacher-login');
              else setCurrentScreen('student-login');
            }}
            onBack={handleBackToPortal}
          />
        );
      
      case 'login-success':
        return (
          <LoginSuccess
            userName="Admin User"
            userRole={selectedRole || 'admin'}
            onComplete={handleLoginSuccess}
          />
        );
      
      default:
        return <PortalSelection onSelectPortal={handlePortalSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {renderScreen()}
    </div>
  );
}
