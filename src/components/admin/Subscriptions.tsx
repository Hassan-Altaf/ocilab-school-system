import { Building2, Users, TrendingUp, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

const schools = [
  { 
    id: 1, 
    name: 'Greenwood High School', 
    location: 'New York, USA', 
    plan: 'Premium', 
    students: 1248, 
    maxStudents: 1500, 
    teachers: 87, 
    revenue: 15600, 
    status: 'Active',
    joinDate: '2022-03-15',
    renewalDate: '2025-03-15'
  },
  { 
    id: 2, 
    name: 'Riverside Academy', 
    location: 'Los Angeles, USA', 
    plan: 'Standard', 
    students: 856, 
    maxStudents: 1000, 
    teachers: 62, 
    revenue: 9800, 
    status: 'Active',
    joinDate: '2023-01-20',
    renewalDate: '2025-01-20'
  },
  { 
    id: 3, 
    name: 'Oakwood International', 
    location: 'Chicago, USA', 
    plan: 'Premium', 
    students: 1520, 
    maxStudents: 2000, 
    teachers: 112, 
    revenue: 18900, 
    status: 'Active',
    joinDate: '2021-09-10',
    renewalDate: '2024-09-10'
  },
  { 
    id: 4, 
    name: 'Maple Leaf School', 
    location: 'Toronto, Canada', 
    plan: 'Basic', 
    students: 420, 
    maxStudents: 500, 
    teachers: 35, 
    revenue: 5200, 
    status: 'Expiring Soon',
    joinDate: '2023-06-05',
    renewalDate: '2024-12-05'
  },
];

const planFeatures = {
  Basic: { price: '$499/mo', students: 500, features: ['Basic Dashboard', 'Student Management', 'Attendance Tracking'] },
  Standard: { price: '$999/mo', students: 1000, features: ['All Basic Features', 'Fee Management', 'Communication Module', 'Exam Management'] },
  Premium: { price: '$1,599/mo', students: 2000, features: ['All Standard Features', 'Analytics & Reports', 'Transport Management', 'Hostel Management', 'Library Management', 'Priority Support'] },
};

export function Subscriptions() {
  const totalSchools = schools.length;
  const activeSchools = schools.filter(s => s.status === 'Active').length;
  const totalRevenue = schools.reduce((sum, school) => sum + school.revenue, 0);
  const totalStudents = schools.reduce((sum, school) => sum + school.students, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 dark:text-white mb-2">Subscription Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage multi-school subscriptions and usage</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Schools</p>
              <h3 className="text-2xl text-gray-900 dark:text-white mb-2">{totalSchools}</h3>
              <p className="text-sm text-green-600">{activeSchools} active</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[#E8F0FE] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#0A66C2]" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Students</p>
              <h3 className="text-2xl text-gray-900 dark:text-white mb-2">{totalStudents.toLocaleString()}</h3>
              <p className="text-sm text-gray-600">Across all schools</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Revenue</p>
              <h3 className="text-2xl text-gray-900 dark:text-white mb-2">${totalRevenue.toLocaleString()}</h3>
              <p className="text-sm text-green-600">+8% from last month</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Expiring Soon</p>
              <h3 className="text-2xl text-gray-900 dark:text-white mb-2">{schools.filter(s => s.status === 'Expiring Soon').length}</h3>
              <p className="text-sm text-orange-600">Requires attention</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(planFeatures).map(([planName, plan]) => (
          <Card key={planName} className={`p-6 ${planName === 'Premium' ? 'border-2 border-[#0A66C2] relative' : ''}`}>
            {planName === 'Premium' && (
              <Badge className="absolute -top-3 left-6 bg-[#0A66C2]">Most Popular</Badge>
            )}
            <h3 className="text-lg text-gray-900 dark:text-white mb-2">{planName} Plan</h3>
            <p className="text-3xl text-gray-900 dark:text-white mb-1">{plan.price}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Up to {plan.students} students</p>
            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
            <Button 
              className={`w-full ${planName === 'Premium' ? 'bg-[#0A66C2] hover:bg-[#0052A3]' : ''}`}
              variant={planName === 'Premium' ? 'default' : 'outline'}
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg text-gray-900 dark:text-white mb-4">All Schools</h3>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                <TableHead>School Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schools.map((school) => (
                <TableRow key={school.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{school.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{school.teachers} teachers</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">{school.location}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        school.plan === 'Premium' ? 'bg-[#E8F0FE] text-[#0A66C2] border-[#0A66C2]' :
                        school.plan === 'Standard' ? 'bg-green-50 text-green-700 border-green-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }
                    >
                      {school.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {school.students} / {school.maxStudents}
                        </span>
                      </div>
                      <Progress 
                        value={(school.students / school.maxStudents) * 100} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-white">
                    ${school.revenue.toLocaleString()}/mo
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">{school.renewalDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        school.status === 'Active' 
                          ? 'bg-green-100 text-green-700 border-green-200' 
                          : 'bg-orange-100 text-orange-700 border-orange-200'
                      }
                    >
                      {school.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Manage</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
