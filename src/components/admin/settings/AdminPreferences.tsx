import { Clock, DollarSign, Globe, Calendar, HelpCircle } from 'lucide-react';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { Card } from '../../ui/card';
import { SettingsData } from '../Settings';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';

interface AdminPreferencesProps {
  settings: SettingsData;
  onChange: (field: keyof SettingsData, value: any) => void;
}

const timezones = [
  'Asia/Karachi',
  'Asia/Dubai',
  'Asia/Kolkata',
  'Asia/Dhaka',
  'Europe/London',
  'America/New_York',
  'America/Los_Angeles',
  'Australia/Sydney'
];

const currencies = [
  { code: 'PKR', name: 'Pakistani Rupee (₨)' },
  { code: 'USD', name: 'US Dollar ($)' },
  { code: 'EUR', name: 'Euro (€)' },
  { code: 'GBP', name: 'British Pound (£)' },
  { code: 'AED', name: 'UAE Dirham (د.إ)' },
  { code: 'INR', name: 'Indian Rupee (₹)' },
  { code: 'BDT', name: 'Bangladeshi Taka (৳)' }
];

const languages = [
  'English',
  'Urdu',
  'Arabic',
  'Spanish',
  'French',
  'Chinese',
  'Hindi'
];

export function AdminPreferences({ settings, onChange }: AdminPreferencesProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl mb-1 text-gray-900 dark:text-white">Admin Preferences</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Configure system-wide settings and regional preferences
        </p>
      </div>

      {/* Time Zone */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <Label htmlFor="timezone" className="text-sm">Time Zone</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">All timestamps will be displayed in this timezone</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select value={settings.timezone} onValueChange={(value) => onChange('timezone', value)}>
          <SelectTrigger className="h-11 bg-gray-50 dark:bg-gray-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timezones.map((tz) => (
              <SelectItem key={tz} value={tz}>
                {tz.replace(/_/g, ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Current time: {new Date().toLocaleString('en-US', { timeZone: settings.timezone })}
        </p>
      </div>

      {/* Currency */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <Label htmlFor="currency" className="text-sm">Currency</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Default currency for fee management and financial reports</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select value={settings.currency} onValueChange={(value) => onChange('currency', value)}>
          <SelectTrigger className="h-11 bg-gray-50 dark:bg-gray-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                {currency.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Default Language */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <Label htmlFor="language" className="text-sm">Default Language</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Primary language for system interface and communications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select value={settings.defaultLanguage} onValueChange={(value) => onChange('defaultLanguage', value)}>
          <SelectTrigger className="h-11 bg-gray-50 dark:bg-gray-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Users can override this in their personal settings
        </p>
      </div>

      {/* Academic Year */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm text-gray-900 dark:text-white">Academic Year</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Define the start and end dates for the current academic year</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="academicYearStart" className="text-sm">Start Date</Label>
            <Input
              id="academicYearStart"
              type="date"
              value={settings.academicYearStart}
              onChange={(e) => onChange('academicYearStart', e.target.value)}
              className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="academicYearEnd" className="text-sm">End Date</Label>
            <Input
              id="academicYearEnd"
              type="date"
              value={settings.academicYearEnd}
              onChange={(e) => onChange('academicYearEnd', e.target.value)}
              className="h-11 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            />
          </div>
        </div>

        <Card className="p-3 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            Academic year dates are used for report generation, fee cycles, and enrollment periods
          </p>
        </Card>
      </div>

      {/* Additional Settings */}
      <Card className="p-4 border-gray-200 dark:border-gray-700">
        <h4 className="text-sm mb-3 text-gray-900 dark:text-white">System Defaults</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">Date Format</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">DD/MM/YYYY</p>
            </div>
            <Select defaultValue="DD/MM/YYYY">
              <SelectTrigger className="w-40 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">Time Format</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">12-hour with AM/PM</p>
            </div>
            <Select defaultValue="12">
              <SelectTrigger className="w-40 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12-hour</SelectItem>
                <SelectItem value="24">24-hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">Week Starts On</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">For calendars and schedules</p>
            </div>
            <Select defaultValue="monday">
              <SelectTrigger className="w-40 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Info */}
      <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <strong>Note:</strong> These preferences affect the entire system. Individual users can override some settings in their personal preferences.
        </p>
      </div>
    </div>
  );
}
