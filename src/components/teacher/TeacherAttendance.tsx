import { useState } from 'react';
import { Calendar, Users, Check, X, Search, Filter, Download, Save } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner@2.0.3';

interface Student {
  id: number;
  rollNo: string;
  name: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  avatarUrl?: string;
}

const mockStudents: Student[] = [
  { id: 1, rollNo: '001', name: 'Ahmed Hassan', status: 'present' },
  { id: 2, rollNo: '002', name: 'Fatima Khan', status: 'present' },
  { id: 3, rollNo: '003', name: 'Ali Raza', status: 'present' },
  { id: 4, rollNo: '004', name: 'Ayesha Malik', status: 'absent' },
  { id: 5, rollNo: '005', name: 'Usman Tariq', status: 'present' },
  { id: 6, rollNo: '006', name: 'Zainab Shahid', status: 'late' },
  { id: 7, rollNo: '007', name: 'Hassan Ali', status: 'present' },
  { id: 8, rollNo: '008', name: 'Sana Ahmed', status: 'present' },
  { id: 9, rollNo: '009', name: 'Bilal Khan', status: 'present' },
  { id: 10, rollNo: '010', name: 'Mariam Siddiqui', status: 'leave' },
];

const classes = [
  { id: 1, name: 'Grade 10A - Mathematics', students: 32 },
  { id: 2, name: 'Grade 9B - Mathematics', students: 30 },
  { id: 3, name: 'Grade 11A - Mathematics', students: 28 },
  { id: 4, name: 'Grade 8A - Mathematics', students: 35 },
];

export function TeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState('1');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.includes(searchQuery)
  );

  const stats = {
    total: students.length,
    present: students.filter(s => s.status === 'present').length,
    absent: students.filter(s => s.status === 'absent').length,
    late: students.filter(s => s.status === 'late').length,
    leave: students.filter(s => s.status === 'leave').length,
  };

  const handleStatusChange = (studentId: number, status: Student['status']) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status } : s));
    setHasChanges(true);
  };

  const handleMarkAll = (status: Student['status']) => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
    setHasChanges(true);
    toast.info(`Marked all students as ${status}`);
  };

  const handleSaveAttendance = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setHasChanges(false);
      toast.success('Attendance saved successfully!', {
        description: `Attendance for ${classes.find(c => c.id.toString() === selectedClass)?.name} has been recorded.`
      });
    }, 1500);
  };

  const handleExport = () => {
    toast.success('Exporting attendance report...', {
      description: 'Your report will be downloaded shortly.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Attendance Management</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Mark and manage student attendance for your classes
        </p>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Select Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="h-11 bg-gray-50 dark:bg-gray-900">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {classes.map(cls => (
                  <SelectItem key={cls.id} value={cls.id.toString()}>
                    {cls.name} ({cls.students} students)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Date</label>
            <Input
              type="date"
              value={attendanceDate}
              onChange={(e) => setAttendanceDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="h-11 bg-gray-50 dark:bg-gray-900"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Search Student</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name or Roll No..."
                className="h-11 pl-10 bg-gray-50 dark:bg-gray-900"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Present</p>
              <p className="text-2xl text-green-600 dark:text-green-400">{stats.present}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <X className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Absent</p>
              <p className="text-2xl text-red-600 dark:text-red-400">{stats.absent}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Late</p>
              <p className="text-2xl text-orange-600 dark:text-orange-400">{stats.late}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Leave</p>
              <p className="text-2xl text-purple-600 dark:text-purple-400">{stats.leave}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">Quick Mark:</p>
          <Button size="sm" variant="outline" onClick={() => handleMarkAll('present')} className="border-green-300">
            <Check className="w-4 h-4 mr-2" />
            All Present
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleMarkAll('absent')} className="border-red-300">
            <X className="w-4 h-4 mr-2" />
            All Absent
          </Button>
          <div className="ml-auto flex gap-2">
            <Button size="sm" variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              size="sm" 
              onClick={handleSaveAttendance}
              disabled={!hasChanges || isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Attendance
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Student List */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Roll No
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Student Name
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Present
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Absent
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Late
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Leave
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">{student.rollNo}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm">
                        {student.name.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <Checkbox
                        checked={student.status === 'present'}
                        onCheckedChange={() => handleStatusChange(student.id, 'present')}
                        className="border-green-400 data-[state=checked]:bg-green-600"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <Checkbox
                        checked={student.status === 'absent'}
                        onCheckedChange={() => handleStatusChange(student.id, 'absent')}
                        className="border-red-400 data-[state=checked]:bg-red-600"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <Checkbox
                        checked={student.status === 'late'}
                        onCheckedChange={() => handleStatusChange(student.id, 'late')}
                        className="border-orange-400 data-[state=checked]:bg-orange-600"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <Checkbox
                        checked={student.status === 'leave'}
                        onCheckedChange={() => handleStatusChange(student.id, 'leave')}
                        className="border-purple-400 data-[state=checked]:bg-purple-600"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={`
                        ${student.status === 'present' ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-400' : ''}
                        ${student.status === 'absent' ? 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/20 dark:text-red-400' : ''}
                        ${student.status === 'late' ? 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/20 dark:text-orange-400' : ''}
                        ${student.status === 'leave' ? 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/20 dark:text-purple-400' : ''}
                      `}
                    >
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {hasChanges && (
        <div className="fixed bottom-6 right-6 bg-amber-100 dark:bg-amber-900/20 border-2 border-amber-400 dark:border-amber-700 rounded-lg p-4 shadow-lg">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            ⚠️ You have unsaved changes. Remember to save attendance!
          </p>
        </div>
      )}
    </div>
  );
}
