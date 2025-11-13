import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock,
  Download,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
  MoreVertical
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Checkbox } from '../ui/checkbox';
import { cn } from '../ui/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';

interface Student {
  id: string;
  name: string;
  rollNo: string;
  status: 'present' | 'absent' | 'late' | 'excused' | null;
  avatar?: string;
}

interface AttendanceRecord {
  date: string;
  class: string;
  section: string;
  present: number;
  absent: number;
  late: number;
  excused: number;
  total: number;
}

const classes = [
  { id: '1', name: 'Grade 1', sections: ['A', 'B', 'C'] },
  { id: '2', name: 'Grade 7', sections: ['A', 'B', 'C'] },
  { id: '3', name: 'Grade 10', sections: ['A', 'B', 'C', 'D'] },
  { id: '4', name: 'Grade 11', sections: ['A', 'B'] },
  { id: '5', name: 'Grade 12', sections: ['A', 'B'] },
];

const mockStudents: Student[] = [
  { id: '1', name: 'Emily Rodriguez', rollNo: 'ST001', status: null },
  { id: '2', name: 'James Wilson', rollNo: 'ST002', status: null },
  { id: '3', name: 'Sophia Lee', rollNo: 'ST003', status: null },
  { id: '4', name: 'Oliver Thompson', rollNo: 'ST004', status: null },
  { id: '5', name: 'Ava Martinez', rollNo: 'ST005', status: null },
  { id: '6', name: 'Noah Garcia', rollNo: 'ST006', status: null },
  { id: '7', name: 'Isabella Brown', rollNo: 'ST007', status: null },
  { id: '8', name: 'Lucas Davis', rollNo: 'ST008', status: null },
  { id: '9', name: 'Mia Anderson', rollNo: 'ST009', status: null },
  { id: '10', name: 'Ethan White', rollNo: 'ST010', status: null },
];

const mockAttendanceHistory: AttendanceRecord[] = [
  { date: '2024-11-06', class: 'Grade 10', section: 'A', present: 35, absent: 2, late: 1, excused: 0, total: 38 },
  { date: '2024-11-05', class: 'Grade 10', section: 'A', present: 36, absent: 1, late: 1, excused: 0, total: 38 },
  { date: '2024-11-04', class: 'Grade 10', section: 'A', present: 34, absent: 3, late: 1, excused: 0, total: 38 },
  { date: '2024-11-01', class: 'Grade 10', section: 'A', present: 37, absent: 1, late: 0, excused: 0, total: 38 },
  { date: '2024-10-31', class: 'Grade 10', section: 'A', present: 35, absent: 2, late: 1, excused: 0, total: 38 },
];

export function Attendance() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [activeTab, setActiveTab] = useState('mark');
  const [searchQuery, setSearchQuery] = useState('');

  const currentMonth = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const sections = classes.find(c => c.id === selectedClass)?.sections || [];

  const handleMarkAttendance = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, status } : s
    ));
  };

  const handleMarkAll = (status: 'present' | 'absent') => {
    setStudents(students.map(s => ({ ...s, status })));
    toast.success(`All students marked as ${status}`);
  };

  const handleSubmitAttendance = () => {
    const unmarked = students.filter(s => !s.status).length;
    if (unmarked > 0) {
      toast.error(`Please mark attendance for all ${unmarked} students`);
      return;
    }
    toast.success('Attendance submitted successfully!');
  };

  const getAttendanceStats = () => {
    const present = students.filter(s => s.status === 'present').length;
    const absent = students.filter(s => s.status === 'absent').length;
    const late = students.filter(s => s.status === 'late').length;
    const excused = students.filter(s => s.status === 'excused').length;
    const total = students.length;

    return { present, absent, late, excused, total };
  };

  const stats = getAttendanceStats();

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 dark:text-white mb-2">Attendance Tracking</h1>
          <p className="text-gray-600 dark:text-gray-400">Mark and monitor student attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="reports">Reports & History</TabsTrigger>
        </TabsList>

        {/* Mark Attendance Tab */}
        <TabsContent value="mark" className="space-y-6">
          {/* Selection Controls */}
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-700 dark:text-gray-300">Select Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700 dark:text-gray-300">Select Section</label>
                <Select 
                  value={selectedSection} 
                  onValueChange={setSelectedSection}
                  disabled={!selectedClass}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose section" />
                  </SelectTrigger>
                  <SelectContent>
                    {sections.map(section => (
                      <SelectItem key={section} value={section}>
                        Section {section}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700 dark:text-gray-300">Select Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? selectedDate.toLocaleDateString() : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-700 dark:text-gray-300">Quick Actions</label>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAll('present')}
                    className="flex-1"
                    disabled={!selectedClass || !selectedSection}
                  >
                    <UserCheck className="w-4 h-4 mr-1" />
                    All Present
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleMarkAll('absent')}
                    className="flex-1"
                    disabled={!selectedClass || !selectedSection}
                  >
                    <UserX className="w-4 h-4 mr-1" />
                    All Absent
                  </Button>
                </div>
              </div>
            </div>

            {selectedClass && selectedSection && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Marking for:</span> {classes.find(c => c.id === selectedClass)?.name} - Section {selectedSection} • {formatDate(selectedDate)}
                </p>
              </div>
            )}
          </Card>

          {/* Statistics */}
          {selectedClass && selectedSection && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E8F0FE] flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#0A66C2]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                    <p className="text-xl text-gray-900 dark:text-white">{stats.total}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Present</p>
                    <p className="text-xl text-gray-900 dark:text-white">{stats.present}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Absent</p>
                    <p className="text-xl text-gray-900 dark:text-white">{stats.absent}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Late</p>
                    <p className="text-xl text-gray-900 dark:text-white">{stats.late}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Excused</p>
                    <p className="text-xl text-gray-900 dark:text-white">{stats.excused}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Student List */}
          {selectedClass && selectedSection && (
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="Search students by name or roll number..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                      <TableHead>Roll No</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <TableCell className="text-gray-700 dark:text-gray-300">
                          {student.rollNo}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-br from-[#0A66C2] to-[#0052A3] text-white">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-gray-900 dark:text-white">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {student.status ? (
                            <Badge 
                              variant="outline"
                              className={cn(
                                student.status === 'present' && 'bg-green-100 text-green-700 border-green-200',
                                student.status === 'absent' && 'bg-red-100 text-red-700 border-red-200',
                                student.status === 'late' && 'bg-orange-100 text-orange-700 border-orange-200',
                                student.status === 'excused' && 'bg-blue-100 text-blue-700 border-blue-200'
                              )}
                            >
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-200">
                              Not Marked
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              size="sm"
                              variant={student.status === 'present' ? 'default' : 'outline'}
                              className={cn(
                                "h-8",
                                student.status === 'present' && 'bg-green-600 hover:bg-green-700'
                              )}
                              onClick={() => handleMarkAttendance(student.id, 'present')}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant={student.status === 'absent' ? 'default' : 'outline'}
                              className={cn(
                                "h-8",
                                student.status === 'absent' && 'bg-red-600 hover:bg-red-700'
                              )}
                              onClick={() => handleMarkAttendance(student.id, 'absent')}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="outline" className="h-8">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleMarkAttendance(student.id, 'late')}>
                                  <Clock className="w-4 h-4 mr-2" />
                                  Mark as Late
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleMarkAttendance(student.id, 'excused')}>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as Excused
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end mt-6">
                <Button 
                  className="bg-[#0A66C2] hover:bg-[#0052A3]"
                  onClick={handleSubmitAttendance}
                >
                  Submit Attendance
                </Button>
              </div>
            </Card>
          )}

          {!selectedClass && (
            <Card className="p-12 text-center">
              <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 dark:text-white mb-2">Select Class and Section</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose a class and section to start marking attendance
              </p>
            </Card>
          )}
        </TabsContent>

        {/* Calendar View Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 p-6">
              <h3 className="text-lg text-gray-900 dark:text-white mb-4">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">High Attendance (&gt;90%)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">Medium (75-90%)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">Low (&lt;75%)</span>
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-gray-900 dark:text-white">
                  {currentMonth}
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const day = i - 2; // Adjust for calendar start
                    const isToday = day === new Date().getDate();
                    const hasData = day > 0 && day <= 30;
                    const attendance = hasData ? Math.floor(Math.random() * 30) + 70 : 0;
                    
                    return (
                      <div
                        key={i}
                        className={cn(
                          "aspect-square p-2 rounded-lg border text-center text-sm",
                          hasData && "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800",
                          isToday && "border-[#0A66C2] bg-[#E8F0FE] dark:bg-[#0A66C2]/10",
                          !hasData && "text-gray-300 dark:text-gray-700"
                        )}
                      >
                        {day > 0 && day <= 30 && (
                          <>
                            <div className="text-gray-900 dark:text-white mb-1">{day}</div>
                            {hasData && (
                              <div className={cn(
                                "w-2 h-2 rounded-full mx-auto",
                                attendance > 90 && "bg-green-500",
                                attendance > 75 && attendance <= 90 && "bg-orange-500",
                                attendance <= 75 && "bg-red-500"
                              )}></div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search by class or date..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 dark:bg-gray-800">
                    <TableHead>Date</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Present</TableHead>
                    <TableHead>Absent</TableHead>
                    <TableHead>Late</TableHead>
                    <TableHead>Attendance Rate</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAttendanceHistory.map((record, index) => {
                    const rate = (record.present / record.total) * 100;
                    return (
                      <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <TableCell className="text-gray-900 dark:text-white">
                          {new Date(record.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-300">
                          {record.class}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{record.section}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-green-600">{record.present}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-red-600">{record.absent}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-orange-600">{record.late}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden max-w-[80px]">
                              <div 
                                className={cn(
                                  "h-full",
                                  rate > 90 ? 'bg-green-500' : 
                                  rate > 75 ? 'bg-orange-500' : 
                                  'bg-red-500'
                                )}
                                style={{ width: `${rate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {rate.toFixed(0)}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
