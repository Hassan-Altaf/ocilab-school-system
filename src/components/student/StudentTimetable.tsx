import { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface ClassPeriod {
  id: number;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  color: string;
}

interface DaySchedule {
  day: string;
  date: string;
  periods: ClassPeriod[];
}

const weekSchedule: DaySchedule[] = [
  {
    day: 'Monday',
    date: '2024-11-04',
    periods: [
      { id: 1, subject: 'Mathematics', teacher: 'Dr. Sarah Mitchell', room: 'Room 201', startTime: '09:00', endTime: '10:00', color: 'blue' },
      { id: 2, subject: 'Physics', teacher: 'Prof. Michael Chen', room: 'Lab 2', startTime: '10:00', endTime: '11:00', color: 'green' },
      { id: 3, subject: 'English', teacher: 'Ms. Emma Wilson', room: 'Room 105', startTime: '14:00', endTime: '15:00', color: 'purple' },
    ]
  },
  {
    day: 'Tuesday',
    date: '2024-11-05',
    periods: [
      { id: 4, subject: 'Chemistry', teacher: 'Dr. Robert Lee', room: 'Lab 3', startTime: '09:00', endTime: '10:00', color: 'orange' },
      { id: 5, subject: 'History', teacher: 'Ms. Jennifer Brown', room: 'Room 102', startTime: '11:00', endTime: '12:00', color: 'pink' },
      { id: 6, subject: 'Mathematics', teacher: 'Dr. Sarah Mitchell', room: 'Room 201', startTime: '14:00', endTime: '15:00', color: 'blue' },
    ]
  },
  {
    day: 'Wednesday',
    date: '2024-11-06',
    periods: [
      { id: 7, subject: 'Biology', teacher: 'Dr. Lisa Wang', room: 'Lab 1', startTime: '09:00', endTime: '10:00', color: 'teal' },
      { id: 8, subject: 'Computer Science', teacher: 'Mr. David Kumar', room: 'Computer Lab', startTime: '10:00', endTime: '11:00', color: 'indigo' },
      { id: 9, subject: 'Physical Education', teacher: 'Coach Mark Taylor', room: 'Sports Ground', startTime: '15:00', endTime: '16:00', color: 'red' },
    ]
  },
  {
    day: 'Thursday',
    date: '2024-11-07',
    periods: [
      { id: 10, subject: 'English', teacher: 'Ms. Emma Wilson', room: 'Room 105', startTime: '09:00', endTime: '10:00', color: 'purple' },
      { id: 11, subject: 'Physics', teacher: 'Prof. Michael Chen', room: 'Lab 2', startTime: '11:00', endTime: '12:00', color: 'green' },
      { id: 12, subject: 'Art', teacher: 'Ms. Sophie Anderson', room: 'Art Studio', startTime: '14:00', endTime: '15:00', color: 'yellow' },
    ]
  },
  {
    day: 'Friday',
    date: '2024-11-08',
    periods: [
      { id: 13, subject: 'Mathematics', teacher: 'Dr. Sarah Mitchell', room: 'Room 201', startTime: '09:00', endTime: '10:00', color: 'blue' },
      { id: 14, subject: 'Chemistry', teacher: 'Dr. Robert Lee', room: 'Lab 3', startTime: '10:00', endTime: '11:00', color: 'orange' },
      { id: 15, subject: 'History', teacher: 'Ms. Jennifer Brown', room: 'Room 102', startTime: '13:00', endTime: '14:00', color: 'pink' },
    ]
  },
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
];

export function StudentTimetable() {
  const [currentWeek, setCurrentWeek] = useState(0);

  const totalClasses = weekSchedule.reduce((sum, day) => sum + day.periods.length, 0);
  const uniqueSubjects = new Set(weekSchedule.flatMap(day => day.periods.map(p => p.subject))).size;

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 border-blue-300 text-blue-900 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-200',
      green: 'bg-green-100 border-green-300 text-green-900 dark:bg-green-900/20 dark:border-green-700 dark:text-green-200',
      purple: 'bg-purple-100 border-purple-300 text-purple-900 dark:bg-purple-900/20 dark:border-purple-700 dark:text-purple-200',
      orange: 'bg-orange-100 border-orange-300 text-orange-900 dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-200',
      pink: 'bg-pink-100 border-pink-300 text-pink-900 dark:bg-pink-900/20 dark:border-pink-700 dark:text-pink-200',
      teal: 'bg-teal-100 border-teal-300 text-teal-900 dark:bg-teal-900/20 dark:border-teal-700 dark:text-teal-200',
      indigo: 'bg-indigo-100 border-indigo-300 text-indigo-900 dark:bg-indigo-900/20 dark:border-indigo-700 dark:text-indigo-200',
      red: 'bg-red-100 border-red-300 text-red-900 dark:bg-red-900/20 dark:border-red-700 dark:text-red-200',
      yellow: 'bg-yellow-100 border-yellow-300 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-200',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">My Timetable</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View your weekly class schedule
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>

      {/* Week Navigation */}
      <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="text-center">
              <p className="text-lg text-gray-900 dark:text-white">Week of Nov 4 - Nov 8, 2024</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Week</p>
            </div>
            <Button variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            Today
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">Classes This Week</p>
              <p className="text-3xl text-blue-900 dark:text-blue-100">{totalClasses}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 dark:text-green-300 mb-1">Total Subjects</p>
              <p className="text-3xl text-green-900 dark:text-green-100">{uniqueSubjects}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-1">Today's Classes</p>
              <p className="text-3xl text-purple-900 dark:text-purple-100">
                {weekSchedule.find(d => d.day === 'Wednesday')?.periods.length || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Timetable Grid */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl text-gray-900 dark:text-white mb-4">Weekly Schedule</h2>

          {/* Desktop View - Grid */}
          <div className="hidden lg:block overflow-x-auto">
            <div className="grid grid-cols-6 gap-4 min-w-max">
              {/* Header */}
              <div className="col-span-1">
                <div className="h-16 flex items-center justify-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Time</span>
                </div>
              </div>
              {weekSchedule.map((day) => (
                <div key={day.day} className="col-span-1">
                  <div className="h-16 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <span className="text-sm text-gray-900 dark:text-white">{day.day}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Time Slots */}
              {timeSlots.map((time) => (
                <div key={time} className="col-span-6 grid grid-cols-6 gap-4">
                  <div className="col-span-1 flex items-center justify-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{time}</span>
                  </div>
                  {weekSchedule.map((day) => {
                    const period = day.periods.find(p => p.startTime === time);
                    return (
                      <div key={`${day.day}-${time}`} className="col-span-1">
                        {period ? (
                          <Card className={`p-3 border-2 ${getColorClasses(period.color)} h-full`}>
                            <div className="space-y-1">
                              <p className="text-sm">{period.subject}</p>
                              <p className="text-xs opacity-80">{period.teacher}</p>
                              <div className="flex items-center gap-1 text-xs opacity-80">
                                <MapPin className="w-3 h-3" />
                                {period.room}
                              </div>
                            </div>
                          </Card>
                        ) : (
                          <div className="h-full bg-gray-50 dark:bg-gray-900/30 rounded border border-dashed border-gray-200 dark:border-gray-700 min-h-[80px]"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View - List */}
          <div className="lg:hidden space-y-4">
            {weekSchedule.map((day) => (
              <div key={day.day}>
                <div className="mb-3">
                  <h3 className="text-lg text-gray-900 dark:text-white">{day.day}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div className="space-y-2">
                  {day.periods.length > 0 ? (
                    day.periods.map((period) => (
                      <Card key={period.id} className={`p-4 border-2 ${getColorClasses(period.color)}`}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm mb-1">{period.subject}</p>
                            <p className="text-xs opacity-80">{period.teacher}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {period.startTime} - {period.endTime}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs opacity-80">
                          <MapPin className="w-3 h-3" />
                          {period.room}
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-4 bg-gray-50 dark:bg-gray-900/30 border-dashed">
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">No classes scheduled</p>
                    </Card>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
