import { Globe, CheckCircle, Clock, XCircle, Mail, HelpCircle } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { Badge } from '../../ui/badge';
import { Card } from '../../ui/card';
import { SettingsData } from '../Settings';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';

interface DomainPlatformProps {
  settings: SettingsData;
  onChange: (field: keyof SettingsData, value: any) => void;
}

export function DomainPlatform({ settings, onChange }: DomainPlatformProps) {
  const getStatusIcon = () => {
    switch (settings.subdomainStatus) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = () => {
    switch (settings.subdomainStatus) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300';
      default:
        return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl mb-1 text-gray-900 dark:text-white">Domain & Platform Settings</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Configure your custom domain and platform-specific preferences
        </p>
      </div>

      {/* Custom Domain */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="customDomain" className="text-sm">Custom Domain</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  Enter your preferred subdomain (e.g., schoolname.edumanage.com) or configure a custom domain
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="customDomain"
            value={settings.customDomain}
            onChange={(e) => onChange('customDomain', e.target.value)}
            placeholder="schoolname.edumanage.com"
            className="pl-10 h-11 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700"
          />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Your school will be accessible at this URL
        </p>
      </div>

      {/* Subdomain Status */}
      <div className="space-y-2">
        <Label className="text-sm">Subdomain Status</Label>
        <Card className={`p-4 ${getStatusColor()} border-transparent`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <div>
                <p className="text-sm capitalize">
                  {settings.subdomainStatus}
                </p>
                <p className="text-xs opacity-80 mt-0.5">
                  {settings.subdomainStatus === 'active' && 'Your domain is live and accessible'}
                  {settings.subdomainStatus === 'pending' && 'DNS propagation in progress (up to 48 hours)'}
                  {settings.subdomainStatus === 'inactive' && 'Domain configuration required'}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="capitalize border-current">
              {settings.subdomainStatus}
            </Badge>
          </div>
        </Card>
      </div>

      {/* Domain Configuration Help */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h4 className="text-sm mb-2 text-blue-900 dark:text-blue-100">Custom Domain Setup</h4>
        <div className="text-xs text-blue-800 dark:text-blue-200 space-y-2">
          <p>To use your own domain (e.g., www.yourschool.com), configure these DNS records:</p>
          <div className="bg-white/50 dark:bg-black/20 p-3 rounded font-mono space-y-1">
            <div>Type: <span className="text-blue-600 dark:text-blue-400">CNAME</span></div>
            <div>Host: <span className="text-blue-600 dark:text-blue-400">www</span></div>
            <div>Value: <span className="text-blue-600 dark:text-blue-400">edumanage.com</span></div>
          </div>
          <p className="pt-2">
            <a href="#" className="underline hover:no-underline">View detailed setup guide →</a>
          </p>
        </div>
      </Card>

      {/* Email Templates */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm text-gray-900 dark:text-white">Email Configuration</h3>
        </div>

        <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <Checkbox
            id="customEmailTemplates"
            checked={settings.enableCustomEmailTemplates}
            onCheckedChange={(checked) => onChange('enableCustomEmailTemplates', checked as boolean)}
            className="mt-1"
          />
          <div className="flex-1">
            <label
              htmlFor="customEmailTemplates"
              className="text-sm text-gray-900 dark:text-white cursor-pointer"
            >
              Enable Custom Email Templates with School Logo
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Include your school logo, colors, and branding in all automated emails sent to students, parents, and staff. This includes fee reminders, report cards, and notifications.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Platform Settings */}
      <Card className="p-4 border-gray-200 dark:border-gray-700">
        <h4 className="text-sm mb-3 text-gray-900 dark:text-white">Platform Features</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Checkbox id="parentPortal" defaultChecked />
            <div className="flex-1">
              <label htmlFor="parentPortal" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                Enable Parent Portal
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Allow parents to access student information and communicate with teachers
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox id="mobileApp" defaultChecked />
            <div className="flex-1">
              <label htmlFor="mobileApp" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                Enable Mobile App Access
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Students and parents can access the system via mobile applications
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox id="smsNotifications" />
            <div className="flex-1">
              <label htmlFor="smsNotifications" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                Enable SMS Notifications
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Send important updates via SMS (additional charges may apply)
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Warning */}
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
        <p className="text-xs text-amber-800 dark:text-amber-200">
          <strong>Important:</strong> Changes to domain settings may take up to 48 hours to propagate globally. We recommend making these changes during off-peak hours.
        </p>
      </div>
    </div>
  );
}
