import { useState } from 'react';
import { Search, Filter, Plus, Download, MoreVertical, Eye, Edit, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const teachers = [
  { id: 1, name: 'Dr. Sarah Mitchell', employeeId: 'T001', subject: 'Mathematics', qualification: 'PhD', experience: '12 years', email: 'sarah.m@school.com', phone: '+1234567890', classes: 5, performance: 94 },
  { id: 2, name: 'Prof. Michael Chen', employeeId: 'T002', subject: 'Physics', qualification: 'MSc', experience: '8 years', email: 'michael.c@school.com', phone: '+1234567891', classes: 4, performance: 91 },
  { id: 3, name: 'Ms. Emma Wilson', employeeId: 'T003', subject: 'English', qualification: 'MA', experience: '6 years', email: 'emma.w@school.com', phone: '+1234567892', classes: 6, performance: 96 },
  { id: 4, name: 'Mr. David Brown', employeeId: 'T004', subject: 'Chemistry', qualification: 'MSc', experience: '10 years', email: 'david.b@school.com', phone: '+1234567893', classes: 5, performance: 89 },
];

const timetable = [
  {
    day: 'Monday', periods: [
      { time: '08:00-09:00', class: 'Grade 10A', subject: 'Mathematics', teacher: 'Dr. Sarah Mitchell' },
      { time: '09:00-10:00', class: 'Grade 9B', subject: 'Physics', teacher: 'Prof. Michael Chen' },
      { time: '10:00-11:00', class: 'Grade 11A', subject: 'English', teacher: 'Ms. Emma Wilson' },
      { time: '11:00-12:00', class: 'Grade 12A', subject: 'Chemistry', teacher: 'Mr. David Brown' },
    ]
  },
  {
    day: 'Tuesday', periods: [
      { time: '08:00-09:00', class: 'Grade 9A', subject: 'Mathematics', teacher: 'Dr. Sarah Mitchell' },
      { time: '09:00-10:00', class: 'Grade 10B', subject: 'Physics', teacher: 'Prof. Michael Chen' },
      { time: '10:00-11:00', class: 'Grade 8A', subject: 'English', teacher: 'Ms. Emma Wilson' },
      { time: '11:00-12:00', class: 'Grade 11B', subject: 'Chemistry', teacher: 'Mr. David Brown' },
    ]
  },
];

export function Teachers() {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 dark:text-white mb-2">Teacher Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage teachers, schedules, and performance</p>
        </div>
        <Button className="bg-[#0A66C2] hover:bg-[#0052A3]">
          <Plus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">Teacher List</TabsTrigger>
          <TabsTrigger value="timetable">Timetable</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input placeholder="Search by name, employee ID, or subject..." className="pl-10" />
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
                    <TableHead>Teacher</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((teacher) => (
                    <TableRow key={teacher.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-br from-[#0A66C2] to-[#0052A3] text-white">
                              {teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm text-gray-900 dark:text-white">{teacher.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{teacher.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">{teacher.employeeId}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{teacher.subject}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">{teacher.qualification}</TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">{teacher.experience}</TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">{teacher.classes}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden max-w-[60px]">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${teacher.performance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{teacher.performance}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="w-4 h-4 mr-2" />
                              View Schedule
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="timetable" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg text-gray-900 dark:text-white mb-4">Weekly Timetable</h3>
            <div className="space-y-4">
              {timetable.map((day) => (
                <div key={day.day} className="border rounded-lg p-4">
                  <h4 className="text-gray-900 dark:text-white mb-3">{day.day}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {day.periods.map((period, index) => (
                      <Card key={index} className="p-3 bg-gradient-to-br from-[#E8F0FE] to-white dark:from-gray-800 dark:to-gray-900">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{period.time}</p>
                        <p className="text-sm text-gray-900 dark:text-white mb-1">{period.class}</p>
                        <p className="text-xs text-[#0A66C2]">{period.subject}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{period.teacher}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher) => (
              <Card key={teacher.id} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-[#0A66C2] to-[#0052A3] text-white">
                      {teacher.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">{teacher.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{teacher.subject}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Performance</span>
                      <span className="text-gray-900 dark:text-white">{teacher.performance}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${teacher.performance}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Classes</span>
                    <span className="text-gray-900 dark:text-white">{teacher.classes}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Experience</span>
                    <span className="text-gray-900 dark:text-white">{teacher.experience}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
