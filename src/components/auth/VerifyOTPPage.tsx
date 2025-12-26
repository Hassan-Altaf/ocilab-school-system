import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TwoFactorAuth } from './TwoFactorAuth';
import { tokenStorage, userStorage } from '../../utils/storage';
import { toast } from 'sonner';

export function VerifyOTPPage() {
  const navigate = useNavigate();

  // Get email and session info from storage
  const email = sessionStorage.getItem('auth_email') || '';
  const sessionId = sessionStorage.getItem('auth_session_id') || undefined;
  const userId = sessionStorage.getItem('auth_user_id') || undefined;
  const rememberMe = sessionStorage.getItem('auth_remember_me') === 'true';

  useEffect(() => {
    // Check if required info is available
    if (!email || !sessionId || !userId) {
      toast.error('Session expired. Please login again.');
      navigate('/admin/login');
    }
  }, [email, sessionId, userId, navigate]);

  const handleVerified = () => {
    // Token is already stored by verify2FA service
    // Just verify it's there and redirect
    const token = tokenStorage.getAccessToken();
    if (token) {
      console.log('OTP verified, token stored successfully');
      toast.success('Verification successful! Redirecting...');
      
      // Clear session storage
      sessionStorage.removeItem('auth_session_id');
      sessionStorage.removeItem('auth_user_id');
      sessionStorage.removeItem('auth_email');
      sessionStorage.removeItem('auth_remember_me');
      
      // Redirect to school login page
      setTimeout(() => {
        navigate('/admin/school-login');
      }, 500);
    } else {
      toast.error('Token not found. Please try again.');
      navigate('/admin/login');
    }
  };

  const handleBack = () => {
    // Clear session storage and go back to login
    sessionStorage.removeItem('auth_session_id');
    sessionStorage.removeItem('auth_user_id');
    sessionStorage.removeItem('auth_email');
    sessionStorage.removeItem('auth_remember_me');
    navigate('/admin/login');
  };

  if (!email || !sessionId || !userId) {
    return null; // Will redirect in useEffect
  }

  return (
    <TwoFactorAuth
      email={email}
      sessionId={sessionId}
      userId={userId}
      onVerified={handleVerified}
      onBack={handleBack}
    />
  );
}

