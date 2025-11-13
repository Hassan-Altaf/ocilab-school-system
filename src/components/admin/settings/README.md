# School Settings & Branding Module

A comprehensive white-label settings page for the EduManage SaaS-based School Management CRM. This module allows each school (tenant) to customize their branding, contact details, domain configuration, and system preferences.

## 📋 Overview

The Settings module provides a clean, modern interface for school administrators to customize:
- **Basic Information**: School name, tagline, contact details, and address
- **Branding**: Logo, favicon, color scheme, and typography
- **Domain & Platform**: Custom domain setup and email template configuration
- **Admin Preferences**: Timezone, currency, language, and academic year settings

## 📦 Components

### Main Component
- **Settings.tsx** - Main container with tab navigation and state management

### Section Components
1. **BasicInformation.tsx** - School contact details and basic info
2. **BrandingSection.tsx** - Visual identity customization
3. **DomainPlatform.tsx** - Domain configuration and platform features
4. **AdminPreferences.tsx** - System-wide preferences and defaults
5. **BrandingPreview.tsx** - Live preview of branding changes

## 🎨 Design System

### Layout
- **Responsive grid**: 2/3 width for settings form, 1/3 for sidebar actions
- **Tab navigation**: Horizontal tabs for different setting categories
- **Card-based design**: Each section contained in clean cards
- **8px grid system**: Consistent spacing throughout

### Colors
- **Primary**: Blue (#2563EB) - Headers and primary actions
- **Secondary**: Purple (#7C3AED) - Highlights
- **Accent**: Green (#10B981) - Success states and CTAs
- **Background**: Gray-50 (#F9FAFB)
- **Borders**: Gray-200 (#E5E7EB)

### Typography
- **Font**: Inter (customizable)
- **Headings**: 
  - H1: 24px (3xl)
  - H2: 20px (xl)
  - H3: 18px (lg)
- **Body**: 14px (sm) for labels, 16px (base) for content
- **Border Radius**: 8px (lg) for cards, 6px (md) for inputs

## 🔧 Features

### 1. Basic Information Section

**Fields:**
- School Name* (required)
- School Tagline
- School Email*
- School Phone*
- School Address* (multiline)

**Features:**
- Icon prefixes for visual clarity
- Tooltips with helpful information
- Input validation
- Responsive 2-column grid for email/phone

### 2. Branding Section

**Logo & Favicon:**
- Drag & drop file upload
- Live preview of uploaded images
- File type validation (PNG, SVG, JPG)
- Size recommendations displayed

**Color Customization:**
- Primary Color picker
- Secondary Color picker
- Accent/Button Color picker
- Hex code input for precise values
- Visual color preview

**Typography:**
- Font family dropdown with 7 popular options:
  - Inter
  - Poppins
  - Roboto
  - Open Sans
  - Lato
  - Montserrat
  - Nunito

**Preview:**
- "Preview Color Combination" button
- Modal dialog showing color application
- Sample UI elements with selected colors
- Real-time font rendering

### 3. Domain & Platform Section

**Domain Configuration:**
- Custom domain input
- Subdomain status indicator (Active/Pending/Inactive)
- Color-coded status cards
- DNS setup guide with instructions

**Email Templates:**
- Checkbox to enable custom email templates
- School logo integration
- Detailed description of feature

**Platform Features:**
- Enable Parent Portal
- Enable Mobile App Access
- Enable SMS Notifications
- Each with descriptive tooltips

### 4. Admin Preferences Section

**Regional Settings:**
- **Timezone**: Dropdown with major timezones
  - Shows current time in selected zone
- **Currency**: 7 major currencies with symbols
  - PKR, USD, EUR, GBP, AED, INR, BDT
- **Language**: Default system language
  - English, Urdu, Arabic, Spanish, French, Chinese, Hindi

**Academic Year:**
- Start date picker
- End date picker
- Info card explaining usage

**System Defaults:**
- Date format selection (DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD)
- Time format (12-hour, 24-hour)
- Week start day (Sunday, Monday, Saturday)

## 🎯 User Interface Components

### Live Preview Card
- Shows real-time branding changes
- Mock dashboard header with:
  - School logo
  - School name
  - Primary color application
  - Sample stats cards
  - Action buttons with accent color
- Color swatches display
- Font family indicator

### Actions Sidebar
**Save Actions Card:**
- "Save Changes" button (disabled when no changes)
- "Reset to Defaults" button
- Unsaved changes warning badge

**Help Card:**
- Link to documentation
- Gradient blue background
- Call-to-action button

**System Status Card:**
- Domain status badge
- Last updated timestamp
- System version number

## 💾 State Management

### Settings Data Interface
```typescript
interface SettingsData {
  // Basic Information
  schoolName: string;
  schoolTagline: string;
  schoolEmail: string;
  schoolPhone: string;
  schoolAddress: string;
  
  // Branding
  schoolLogo: string | null;
  favicon: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  
  // Domain & Platform
  customDomain: string;
  subdomainStatus: 'active' | 'pending' | 'inactive';
  enableCustomEmailTemplates: boolean;
  
  // Admin Preferences
  timezone: string;
  currency: string;
  defaultLanguage: string;
  academicYearStart: string;
  academicYearEnd: string;
}
```

### Change Tracking
- `hasChanges` flag to track unsaved modifications
- Warning displayed when navigating away with unsaved changes
- Save button disabled when no changes detected

## 🔔 Notifications

### Toast Messages
- **Success**: "Settings saved successfully!"
- **Info**: "Settings reset to defaults"
- **Warning**: Confirmation dialogs for destructive actions
- **Error**: Validation errors

## 📱 Responsive Design

### Desktop (1440px+)
- Full 3-column layout (2/3 + 1/3)
- Horizontal tab navigation
- Side-by-side previews

### Tablet (768px - 1439px)
- Stacked columns
- Maintained tab navigation
- Adjusted spacing

### Mobile (< 768px)
- Single column layout
- Full-width inputs
- Stacked form elements
- Touch-friendly controls

## 🎭 Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels on all inputs
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Screen reader friendly
- ✅ Color contrast compliance (WCAG AA)
- ✅ Tooltips for technical fields
- ✅ Clear field labels

## 🚀 Usage

### Basic Integration
```tsx
import { Settings } from './components/admin/Settings';

function AdminPanel() {
  return <Settings />;
}
```

### Accessing Settings Data
```tsx
const [settings, setSettings] = useState<SettingsData>(defaultSettings);

// Save settings to backend
const handleSave = async () => {
  await api.post('/settings', settings);
};
```

### Custom Default Values
```tsx
const customDefaults: SettingsData = {
  schoolName: 'My School',
  // ... other settings
};
```

## 🔒 Security Considerations

### File Uploads
- Validate file types (images only)
- Size limits (2MB max recommended)
- Sanitize file names
- Scan for malware (backend)

### Domain Configuration
- Validate domain format
- Check DNS availability
- Prevent subdomain conflicts
- SSL certificate validation

### Data Validation
- Required field checking
- Email format validation
- Phone number format
- Date range validation
- Color hex code validation

## 🎨 Customization

### Adding New Settings
1. Add field to `SettingsData` interface
2. Update default settings object
3. Create input in appropriate section component
4. Handle change in parent component

### Adding New Tab
1. Add new tab trigger to TabsList
2. Create TabsContent with value
3. Build section component
4. Import and include in Settings.tsx

### Styling Customization
- All colors defined in settings state
- Font family dynamically applied
- Tailwind classes for consistency
- CSS variables for theming

## 📊 Performance

### Optimization Techniques
- Image preview with FileReader API
- Debounced color picker updates
- Lazy loading for preview modal
- Memoized preview components
- Efficient state updates

### File Size
- Compress uploaded images
- Optimize logo files
- Use SVG when possible
- Cache preview renders

## 🐛 Known Limitations

1. **File Upload**: Currently uses base64 encoding (should use proper upload endpoint in production)
2. **DNS Validation**: Mock validation (needs backend integration)
3. **Email Templates**: Toggle only (actual template editor separate)
4. **Multi-language**: UI labels not yet translated

## 🔮 Future Enhancements

- [ ] Advanced theme builder with more options
- [ ] Import/export settings as JSON
- [ ] Settings version history
- [ ] Rollback to previous settings
- [ ] A/B testing for branding
- [ ] Advanced email template editor
- [ ] Multiple logo variants (dark mode logo)
- [ ] Custom CSS injection
- [ ] White-label mobile app branding
- [ ] Branding compliance checker
- [ ] Multi-campus settings inheritance

## 📚 Related Documentation

- [Authentication System](../../auth/README.md)
- [Dashboard Components](../../dashboard/README.md)
- [UI Component Library](../../ui/README.md)

## 🤝 Contributing

When adding new settings:
1. Follow existing patterns
2. Add tooltips for complex fields
3. Update TypeScript interfaces
4. Include in preview if visual
5. Add validation
6. Update this README

## 📄 License

Part of the EduManage School Management CRM system.

---

**Last Updated**: November 2024
**Version**: 2.1.0
**Maintainer**: EduManage Development Team
