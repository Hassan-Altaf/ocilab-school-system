import { useState } from 'react';
import { Upload, Image as ImageIcon, Palette, Type, Eye, HelpCircle } from 'lucide-react';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card } from '../../ui/card';
import { SettingsData } from '../Settings';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../../ui/dialog';

interface BrandingSectionProps {
  settings: SettingsData;
  onChange: (field: keyof SettingsData, value: any) => void;
}

export function BrandingSection({ settings, onChange }: BrandingSectionProps) {
  const [showColorPreview, setShowColorPreview] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange('schoolLogo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange('favicon', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl mb-1 text-gray-900 dark:text-white">Branding & Visual Identity</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Customize your school's visual appearance across the platform
        </p>
      </div>

      {/* Logo Upload */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label className="text-sm">School Logo</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Recommended: PNG or SVG, 500x500px minimum</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-4 items-start">
          {/* Upload Area */}
          <label className="flex-1 cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-gray-50 dark:bg-gray-900">
              <div className="flex flex-col items-center gap-3">
                <Upload className="w-10 h-10 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    SVG, PNG, or JPG (max. 2MB)
                  </p>
                </div>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleLogoUpload}
            />
          </label>

          {/* Preview */}
          {settings.schoolLogo && (
            <div className="w-32 h-32 border-2 border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800 flex items-center justify-center">
              <img
                src={settings.schoolLogo}
                alt="School Logo Preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* Favicon Upload */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label className="text-sm">Favicon</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Small icon that appears in browser tabs (32x32px)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex gap-4 items-center">
          <label className="cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-gray-50 dark:bg-gray-900 w-32">
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="w-6 h-6 text-gray-400" />
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  Upload
                </p>
              </div>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/x-icon,image/png"
              onChange={handleFaviconUpload}
            />
          </label>
          {settings.favicon && (
            <div className="w-16 h-16 border border-gray-200 dark:border-gray-700 rounded p-2 bg-white dark:bg-gray-800 flex items-center justify-center">
              <img
                src={settings.favicon}
                alt="Favicon Preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* Color Pickers */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-sm text-gray-900 dark:text-white">Brand Colors</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Primary Color */}
          <div className="space-y-2">
            <Label htmlFor="primaryColor" className="text-sm">Primary Color</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="primaryColor"
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => onChange('primaryColor', e.target.value)}
                  className="w-full h-11 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                />
              </div>
              <div className="w-24">
                <input
                  type="text"
                  value={settings.primaryColor}
                  onChange={(e) => onChange('primaryColor', e.target.value)}
                  className="w-full h-11 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 font-mono"
                  placeholder="#2563EB"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Main brand color</p>
          </div>

          {/* Secondary Color */}
          <div className="space-y-2">
            <Label htmlFor="secondaryColor" className="text-sm">Secondary Color</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="secondaryColor"
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => onChange('secondaryColor', e.target.value)}
                  className="w-full h-11 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                />
              </div>
              <div className="w-24">
                <input
                  type="text"
                  value={settings.secondaryColor}
                  onChange={(e) => onChange('secondaryColor', e.target.value)}
                  className="w-full h-11 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 font-mono"
                  placeholder="#7C3AED"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Supporting color</p>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <Label htmlFor="accentColor" className="text-sm">Accent / Button Color</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id="accentColor"
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => onChange('accentColor', e.target.value)}
                  className="w-full h-11 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
                />
              </div>
              <div className="w-24">
                <input
                  type="text"
                  value={settings.accentColor}
                  onChange={(e) => onChange('accentColor', e.target.value)}
                  className="w-full h-11 px-3 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 font-mono"
                  placeholder="#10B981"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Buttons & highlights</p>
          </div>
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <Label htmlFor="fontFamily" className="text-sm">Font Family</Label>
        </div>
        <Select value={settings.fontFamily} onValueChange={(value) => onChange('fontFamily', value)}>
          <SelectTrigger className="h-11 bg-gray-50 dark:bg-gray-900">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter">Inter</SelectItem>
            <SelectItem value="Poppins">Poppins</SelectItem>
            <SelectItem value="Roboto">Roboto</SelectItem>
            <SelectItem value="Open Sans">Open Sans</SelectItem>
            <SelectItem value="Lato">Lato</SelectItem>
            <SelectItem value="Montserrat">Montserrat</SelectItem>
            <SelectItem value="Nunito">Nunito</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          This font will be used across all platform interfaces
        </p>
      </div>

      {/* Preview Theme Button */}
      <Dialog open={showColorPreview} onOpenChange={setShowColorPreview}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            Preview Color Combination
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Color Theme Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 p-6">
            {/* Sample UI Elements */}
            <div className="space-y-3">
              <div 
                className="h-16 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: settings.primaryColor, fontFamily: settings.fontFamily }}
              >
                Primary Color - Headers & Navigation
              </div>
              <div 
                className="h-16 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: settings.secondaryColor, fontFamily: settings.fontFamily }}
              >
                Secondary Color - Highlights
              </div>
              <div 
                className="h-16 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: settings.accentColor, fontFamily: settings.fontFamily }}
              >
                Accent Color - Buttons & CTAs
              </div>
            </div>
            
            {/* Sample Buttons */}
            <div className="flex gap-3">
              <button 
                className="px-6 py-3 rounded-lg text-white transition-colors"
                style={{ 
                  backgroundColor: settings.accentColor,
                  fontFamily: settings.fontFamily 
                }}
              >
                Primary Button
              </button>
              <button 
                className="px-6 py-3 rounded-lg border-2 transition-colors"
                style={{ 
                  borderColor: settings.primaryColor,
                  color: settings.primaryColor,
                  fontFamily: settings.fontFamily 
                }}
              >
                Secondary Button
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
