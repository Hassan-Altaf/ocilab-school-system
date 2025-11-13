import { useState } from 'react';
import { Calendar, Clock, CheckCircle, Users, Book, Filter, ChevronLeft, ChevronRight, Plus, MoreVertical, Eye, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Exam } from '../Examinations';

interface ExaminationDashboardProps {
  onCreateExam: () => void;
  onViewExam: (exam: Exam) => void;
  onViewList: () => void;
  onViewAnalytics: () => void;
}

const upcomingExams: Exam[] = [
  {
    id: '1',
    name: 'Mid-Term Examination',
    type: 'Mid-Term',
    academicYear: '2024-2025',
    startDate: '2025-11-15',
    endDate: '2025-11-20',
    classes: ['10-A', '10-B'],
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    status: 'Scheduled',
    totalStudents: 234,
    marksEntryProgress: 0,
    resultsPublished: 0
  },
  {
    id: '2',
    name: 'Mathematics Unit Test',
    type: 'Unit Test',
    academicYear: '2024-2025',
    startDate: '2025-11-12',
    endDate: '2025-11-12',
    classes: ['11-A'],
    subjects: ['Mathematics'],
    status: 'Scheduled',
    totalStudents: 45,
    marksEntryProgress: 0,
    resultsPublished: 0
  },
  {
    id: '3',
    name: 'Science Monthly Test',
    type: 'Monthly Test',
    academicYear: '2024-2025',
    startDate: '2025-11-18',
    endDate: '2025-11-19',
    classes: ['9-A', '9-B', '9-C'],
    subjects: ['Physics', 'Chemistry', 'Biology'],
    status: 'Scheduled',
    totalStudents: 156,
    marksEntryProgress: 0,
    resultsPublished: 0
  },
  {
    id: '4',
    name: 'English Literature Exam',
    type: 'Unit Test',
    academicYear: '2024-2025',
    startDate: '2025-11-25',
    endDate: '2025-11-25',
    classes: ['12-A', '12-B'],
    subjects: ['English'],
    status: 'Scheduled',
    totalStudents: 89,
    marksEntryProgress: 0,
    resultsPublished: 0
  }
];

const calendarEvents = [
  { date: 8, title: 'Physics Exam - 10-A', type: 'ongoing' },
  { date: 12, title: 'Math Unit Test - 11-A', type: 'upcoming' },
  { date: 15, title: 'Mid-Term Starts', type: 'upcoming' },
  { date: 18, title: 'Science Test - 9th', type: 'upcoming' },
  { date: 25, title: 'English Exam - 12th', type: 'upcoming' }
];

const recentActivities = [
  {
    id: 1,
    title: 'Mathematics Exam created for Class 10-A',
    time: '2 hours ago',
    icon: Book,
    color: 'text-blue-600'
  },
  {
    id: 2,
    title: 'Physics results published for Class 12-B',
    time: '5 hours ago',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    id: 3,
    title: 'Chemistry marks entry completed - Class 11-A',
    time: '1 day ago',
    icon: AlertCircle,
    color: 'text-amber-600'
  },
  {
    id: 4,
    title: 'Final Term exam scheduled for all classes',
    time: '2 days ago',
    icon: Calendar,
    color: 'text-purple-600'
  }
];

export function ExaminationDashboard({ onCreateExam, onViewExam, onViewList, onViewAnalytics }: ExaminationDashboardProps) {
  const [currentMonth] = useState(10); // November (0-indexed)
  const [currentYear] = useState(2025);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  const hasEvent = (day: number) => {
    return calendarEvents.find(e => e.date === day);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-[32px] text-gray-900 dark:text-white tracking-tight">
              Examination Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Dashboard &gt; Examinations
            </p>
          </div>
          <Button 
            onClick={onCreateExam}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-sm"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Create New Exam
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium uppercase tracking-wide">
                Upcoming Exams
              </p>
              <h3 className="text-3xl text-gray-900 dark:text-white tracking-tight">
                12
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#2563EB]" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium uppercase tracking-wide">
                Ongoing Exams
              </p>
              <h3 className="text-3xl text-gray-900 dark:text-white tracking-tight">
                3
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#10B981]" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium uppercase tracking-wide">
                Completed Exams
              </p>
              <h3 className="text-3xl text-gray-900 dark:text-white tracking-tight">
                45
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium uppercase tracking-wide">
                Total Students
              </p>
              <h3 className="text-3xl text-gray-900 dark:text-white tracking-tight">
                1,234
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Calendar */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-gray-900 dark:text-white tracking-tight">
                Exam Schedule
              </h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h4 className="text-lg text-gray-900 dark:text-white">
                {monthName} {currentYear}
              </h4>
              <Button variant="ghost" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Weekday Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center py-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {day}
                  </span>
                </div>
              ))}

              {/* Empty cells for first week */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Calendar days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const event = hasEvent(day);
                const isToday = day === 8; // Simulating today as 8th

                return (
                  <div
                    key={day}
                    className={`
                      aspect-square rounded-lg flex flex-col items-center justify-center text-sm cursor-pointer
                      transition-all duration-200
                      ${isToday ? 'bg-[#2563EB] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                      ${event && !isToday ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : ''}
                    `}
                  >
                    <span className={isToday ? 'text-white' : 'text-gray-900 dark:text-white'}>
                      {day}
                    </span>
                    {event && (
                      <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                        event.type === 'ongoing' ? 'bg-green-500' :
                        event.type === 'upcoming' ? 'bg-blue-500' : 'bg-gray-400'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="flex items-center gap-4 mt-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">Upcoming</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-600 dark:text-gray-400">Ongoing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Completed</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Upcoming Exams List */}
        <div>
          <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
            <h3 className="text-xl text-gray-900 dark:text-white mb-4 tracking-tight">
              Upcoming Exams
            </h3>

            <div className="space-y-3">
              {upcomingExams.slice(0, 5).map((exam, index) => (
                <div
                  key={exam.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                    index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900'
                  }`}
                  onClick={() => onViewExam(exam)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Book className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-gray-900 dark:text-white mb-1">
                        {exam.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {exam.classes.join(', ')}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(exam.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                      {exam.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              variant="ghost" 
              className="w-full mt-4 text-[#2563EB] hover:text-[#1d4ed8] hover:bg-blue-50"
              onClick={onViewList}
            >
              View All
            </Button>
          </Card>
        </div>
      </div>

      {/* Recent Activities */}
      <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
        <h3 className="text-xl text-gray-900 dark:text-white mb-6 tracking-tight">
          Recent Activities
        </h3>

        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={activity.id} className="flex items-start gap-4 relative">
              {/* Timeline connector */}
              {index < recentActivities.length - 1 && (
                <div className="absolute left-5 top-10 w-0.5 h-full bg-gray-200 dark:bg-gray-800" />
              )}
              
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                activity.color.includes('blue') ? 'bg-blue-100 dark:bg-blue-900/20' :
                activity.color.includes('green') ? 'bg-green-100 dark:bg-green-900/20' :
                activity.color.includes('amber') ? 'bg-amber-100 dark:bg-amber-900/20' :
                'bg-purple-100 dark:bg-purple-900/20'
              }`}>
                <activity.icon className={`w-5 h-5 ${activity.color}`} />
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white mb-1">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
