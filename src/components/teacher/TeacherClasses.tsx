import { useState } from 'react';
import { BookOpen, Users, Calendar, Clock, Award, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';

interface ClassData {
  id: number;
  name: string;
  grade: string;
  subject: string;
  students: number;
  schedule: string[];
  room: string;
  avgAttendance: number;
  avgGrade: number;
  completedTopics: number;
  totalTopics: number;
}

const mockClasses: ClassData[] = [
  {
    id: 1,
    name: 'Grade 10A',
    grade: '10',
    subject: 'Mathematics',
    students: 32,
    schedule: ['Mon 9:00 AM', 'Wed 10:00 AM', 'Fri 11:00 AM'],
    room: 'Room 201',
    avgAttendance: 87,
    avgGrade: 78,
    completedTopics: 12,
    totalTopics: 20
  },
  {
    id: 2,
    name: 'Grade 9B',
    grade: '9',
    subject: 'Mathematics',
    students: 30,
    schedule: ['Tue 11:00 AM', 'Thu 9:00 AM'],
    room: 'Room 203',
    avgAttendance: 92,
    avgGrade: 82,
    completedTopics: 15,
    totalTopics: 22
  },
  {
    id: 3,
    name: 'Grade 11A',
    grade: '11',
    subject: 'Mathematics',
    students: 28,
    schedule: ['Mon 2:00 PM', 'Wed 1:00 PM', 'Thu 3:00 PM'],
    room: 'Room 201',
    avgAttendance: 85,
    avgGrade: 75,
    completedTopics: 8,
    totalTopics: 18
  },
  {
    id: 4,
    name: 'Grade 8A',
    grade: '8',
    subject: 'Mathematics',
    students: 35,
    schedule: ['Tue 2:00 PM', 'Fri 9:00 AM'],
    room: 'Room 205',
    avgAttendance: 90,
    avgGrade: 80,
    completedTopics: 18,
    totalTopics: 25
  },
];

const upcomingTopics = [
  { class: 'Grade 10A', topic: 'Quadratic Equations - Advanced Problems', date: 'Nov 8' },
  { class: 'Grade 9B', topic: 'Trigonometric Ratios', date: 'Nov 9' },
  { class: 'Grade 11A', topic: 'Calculus - Derivatives', date: 'Nov 10' },
];

export function TeacherClasses() {
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);

  const totalStudents = mockClasses.reduce((sum, cls) => sum + cls.students, 0);
  const avgAttendance = Math.round(mockClasses.reduce((sum, cls) => sum + cls.avgAttendance, 0) / mockClasses.length);
  const avgGrade = Math.round(mockClasses.reduce((sum, cls) => sum + cls.avgGrade, 0) / mockClasses.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 dark:text-white mb-2">My Classes</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and monitor all your assigned classes
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">Total Classes</p>
              <p className="text-3xl text-blue-900 dark:text-blue-100">{mockClasses.length}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 dark:text-green-300 mb-1">Total Students</p>
              <p className="text-3xl text-green-900 dark:text-green-100">{totalStudents}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-1">Avg Attendance</p>
              <p className="text-3xl text-orange-900 dark:text-orange-100">{avgAttendance}%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-1">Avg Grade</p>
              <p className="text-3xl text-purple-900 dark:text-purple-100">{avgGrade}%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class List */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h2 className="text-xl text-gray-900 dark:text-white mb-4">All Classes</h2>
            <div className="space-y-3">
              {mockClasses.map((classData) => (
                <Card
                  key={classData.id}
                  className="p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer transition-all"
                  onClick={() => setSelectedClass(classData)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                        <BookOpen className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg text-gray-900 dark:text-white mb-1">
                          {classData.name} - {classData.subject}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {classData.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {classData.room}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Attendance</p>
                      <div className="flex items-center gap-2">
                        <Progress value={classData.avgAttendance} className="h-2" />
                        <span className="text-sm text-gray-900 dark:text-white">{classData.avgAttendance}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Grade</p>
                      <div className="flex items-center gap-2">
                        <Progress value={classData.avgGrade} className="h-2" />
                        <span className="text-sm text-gray-900 dark:text-white">{classData.avgGrade}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Progress</p>
                      <div className="flex items-center gap-2">
                        <Progress value={(classData.completedTopics / classData.totalTopics) * 100} className="h-2" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {classData.completedTopics}/{classData.totalTopics}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {classData.schedule.map((time, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {time}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Upcoming Topics */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h3 className="text-lg text-gray-900 dark:text-white mb-4">Upcoming Topics</h3>
            <div className="space-y-3">
              {upcomingTopics.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                  <Badge variant="outline" className="text-xs mb-2">{item.class}</Badge>
                  <p className="text-sm text-gray-900 dark:text-white mb-1">{item.topic}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <h3 className="text-sm text-blue-900 dark:text-blue-100 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                Mark Attendance
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                Create Assignment
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                Schedule Exam
              </Button>
            </div>
          </Card>

          {/* Performance Summary */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <h3 className="text-sm text-gray-900 dark:text-white mb-3">This Week</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Classes Held</span>
                <span className="text-gray-900 dark:text-white">12/14</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Assignments Given</span>
                <span className="text-gray-900 dark:text-white">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tests Conducted</span>
                <span className="text-gray-900 dark:text-white">1</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
