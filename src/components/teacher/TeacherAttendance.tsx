import { useState, useEffect } from 'react';
import { Calendar, Users, Check, X, Search, Filter, Download, Save } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { teacherService } from '../../services';
import type { AttendanceStudent, AttendanceRecord } from '../../services/teacher.service';
import { ApiException, getUserFriendlyError } from '../../utils/errors';

interface StudentAttendance {
  id: string;
  rollNumber: string;
  firstName: string;
  lastName: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY' | 'EXCUSED';
}

export function TeacherAttendance() {
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState('');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<StudentAttendance[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      loadStudents();
    }
  }, [selectedClassId, selectedSectionId]);

  const loadClasses = async () => {
    try {
      const response = await teacherService.getAssignedClasses();
      setClasses(response.data?.classes || []);
      if (response.data?.classes?.length > 0) {
        setSelectedClassId(response.data.classes[0].classId);
      }
    } catch (error: any) {
      console.error('Failed to load classes:', error);
      toast.error('Failed to load classes');
    }
  };

  const loadStudents = async () => {
    try {
      setIsLoading(true);
      const response = await teacherService.getAttendanceStudents(selectedClassId, selectedSectionId);
      const studentsData = response.data?.students || [];
      setStudents(studentsData.map((s: AttendanceStudent) => ({
        id: s.id,
        rollNumber: s.rollNumber,
        firstName: s.firstName,
        lastName: s.lastName,
        status: s.defaultStatus,
      })));
    } catch (error: any) {
      console.error('Failed to load students:', error);
      toast.error('Failed to load students');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNumber.includes(searchQuery)
  );

  const stats = {
    total: students.length,
    present: students.filter(s => s.status === 'PRESENT').length,
    absent: students.filter(s => s.status === 'ABSENT').length,
    late: students.filter(s => s.status === 'LATE').length,
    leave: students.filter(s => s.status === 'EXCUSED').length,
  };

  const handleStatusChange = (studentId: string, status: StudentAttendance['status']) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status } : s));
    setHasChanges(true);
  };

  const handleMarkAll = (status: StudentAttendance['status']) => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
    setHasChanges(true);
    toast.info(`Marked all students as ${status}`);
  };

  const handleSaveAttendance = async () => {
    if (!selectedClassId) {
      toast.error('Please select a class');
      return;
    }

    try {
      setIsSaving(true);
      await teacherService.markAttendance({
        classId: selectedClassId,
        sectionId: selectedSectionId || undefined,
        attendanceDate,
        entries: students.map(s => ({
          studentId: s.id,
          status: s.status,
        })),
      });
      setHasChanges(false);
      toast.success('Attendance saved successfully!');
    } catch (error: any) {
      console.error('Failed to save attendance:', error);
      toast.error(error instanceof ApiException ? getUserFriendlyError(error) : 'Failed to save attendance');
    } finally {
      setIsSaving(false);
    }
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
            <Select value={selectedClassId} onValueChange={(value) => {
              setSelectedClassId(value);
              setSelectedSectionId('');
            }}>
              <SelectTrigger className="h-11 bg-gray-50 dark:bg-gray-900">
                <SelectValue placeholder="Choose a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map(cls => (
                  <SelectItem key={cls.classId} value={cls.classId}>
                    {cls.className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {classes.find(c => c.classId === selectedClassId)?.sections?.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm text-gray-700 dark:text-gray-300">Select Section (Optional)</label>
              <Select value={selectedSectionId} onValueChange={setSelectedSectionId}>
                <SelectTrigger className="h-11 bg-gray-50 dark:bg-gray-900">
                  <SelectValue placeholder="All sections" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All sections</SelectItem>
                  {classes.find(c => c.classId === selectedClassId)?.sections?.map((sec: any) => (
                    <SelectItem key={sec.sectionId} value={sec.sectionId}>
                      {sec.sectionName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

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
          <Button size="sm" variant="outline" onClick={() => handleMarkAll('PRESENT')} className="border-green-300">
            <Check className="w-4 h-4 mr-2" />
            All Present
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleMarkAll('ABSENT')} className="border-red-300">
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
                    <span className="text-sm text-gray-900 dark:text-white">{student.rollNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm">
                        {student.firstName.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">{student.firstName} {student.lastName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <Checkbox
                        checked={student.status === 'PRESENT'}
                        onCheckedChange={() => handleStatusChange(student.id, 'PRESENT')}
                        className="border-green-400 data-[state=checked]:bg-green-600"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <Checkbox
                        checked={student.status === 'ABSENT'}
                        onCheckedChange={() => handleStatusChange(student.id, 'ABSENT')}
                        className="border-red-400 data-[state=checked]:bg-red-600"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <Checkbox
                        checked={student.status === 'LATE'}
                        onCheckedChange={() => handleStatusChange(student.id, 'LATE')}
                        className="border-orange-400 data-[state=checked]:bg-orange-600"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <Checkbox
                        checked={student.status === 'EXCUSED'}
                        onCheckedChange={() => handleStatusChange(student.id, 'EXCUSED')}
                        className="border-purple-400 data-[state=checked]:bg-purple-600"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={`
                        ${student.status === 'PRESENT' ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-400' : ''}
                        ${student.status === 'ABSENT' ? 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/20 dark:text-red-400' : ''}
                        ${student.status === 'LATE' ? 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/20 dark:text-orange-400' : ''}
                        ${student.status === 'EXCUSED' ? 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/20 dark:text-purple-400' : ''}
                      `}
                    >
                      {student.status.charAt(0) + student.status.slice(1).toLowerCase()}
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
