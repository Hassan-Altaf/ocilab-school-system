import { Building2, Mail, Phone, MapPin, Tag } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { SettingsData } from '../Settings';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface BasicInformationProps {
  settings: SettingsData;
  onChange: (field: keyof SettingsData, value: any) => void;
}

export function BasicInformation({ settings, onChange }: BasicInformationProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl mb-1 text-gray-900 dark:text-white">Basic Information</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Update your school's contact details and basic information
        </p>
      </div>

      {/* School Name */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="schoolName" className="text-sm">
            School Name *
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">This will appear on all official documents and communications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="schoolName"
            value={settings.schoolName}
            onChange={(e) => onChange('schoolName', e.target.value)}
            placeholder="Enter school name"
            className="pl-10 h-11 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700"
          />
        </div>
      </div>

      {/* School Tagline */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="schoolTagline" className="text-sm">
            School Tagline
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">A brief motto or mission statement</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="schoolTagline"
            value={settings.schoolTagline}
            onChange={(e) => onChange('schoolTagline', e.target.value)}
            placeholder="e.g., Empowering Education Through Technology"
            className="pl-10 h-11 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700"
          />
        </div>
      </div>

      {/* Email and Phone in a row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* School Email */}
        <div className="space-y-2">
          <Label htmlFor="schoolEmail" className="text-sm">
            School Email *
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="schoolEmail"
              type="email"
              value={settings.schoolEmail}
              onChange={(e) => onChange('schoolEmail', e.target.value)}
              placeholder="info@school.edu"
              className="pl-10 h-11 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            />
          </div>
        </div>

        {/* School Phone */}
        <div className="space-y-2">
          <Label htmlFor="schoolPhone" className="text-sm">
            School Phone *
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="schoolPhone"
              type="tel"
              value={settings.schoolPhone}
              onChange={(e) => onChange('schoolPhone', e.target.value)}
              placeholder="+92 300-1234567"
              className="pl-10 h-11 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700"
            />
          </div>
        </div>
      </div>

      {/* School Address */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="schoolAddress" className="text-sm">
            School Address *
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Full postal address including city and country</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Textarea
            id="schoolAddress"
            value={settings.schoolAddress}
            onChange={(e) => onChange('schoolAddress', e.target.value)}
            placeholder="Enter complete school address&#10;Include street, city, and country"
            rows={4}
            className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 resize-none"
          />
        </div>
      </div>

      {/* Info Box */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> Fields marked with * are required. This information will be displayed on reports, certificates, and official communications.
        </p>
      </div>
    </div>
  );
}
