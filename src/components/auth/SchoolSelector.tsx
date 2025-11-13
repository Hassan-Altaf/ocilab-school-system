import { ArrowLeft, Search, Building2, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface SchoolSelectorProps {
  onSchoolSelect: (schoolId: string) => void;
  onBack: () => void;
}

const schools = [
  { id: '1', name: 'Green Valley School', location: 'Islamabad', code: 'SCH-2024-001', students: 1234, logo: '🏫' },
  { id: '2', name: 'Sunrise Academy', location: 'Lahore', code: 'SCH-2024-002', students: 856, logo: '🌅' },
  { id: '3', name: 'Oxford High School', location: 'Karachi', code: 'SCH-2024-003', students: 2100, logo: '📚' }
];

export function SchoolSelector({ onSchoolSelect, onBack }: SchoolSelectorProps) {
  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portal Selection
        </Button>

        <div className="text-center mb-8">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h1 className="text-[32px] mb-2 text-gray-900 dark:text-white">
            Select Your School
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Choose the school you want to access
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search schools by name or code..."
              className="h-12 pl-12 bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schools.map((school) => (
            <Card
              key={school.id}
              onClick={() => onSchoolSelect(school.id)}
              className="p-6 cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{school.logo}</div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1 text-gray-900 dark:text-white">
                    {school.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    {school.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {school.code}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {school.students} students
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
