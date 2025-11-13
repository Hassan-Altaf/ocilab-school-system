import { Calendar, FileText, DollarSign, TrendingUp, BookOpen, Award } from 'lucide-react';
import { StatCard } from '../dashboard/StatCard';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

const upcomingClasses = [
  { id: 1, subject: 'Mathematics', teacher: 'Dr. Sarah Mitchell', time: '09:00 AM', room: 'Room 201' },
  { id: 2, subject: 'Physics', teacher: 'Prof. Michael Chen', time: '10:00 AM', room: 'Lab 2' },
  { id: 3, subject: 'English', teacher: 'Ms. Emma Wilson', time: '11:00 AM', room: 'Room 105' },
];

const pendingAssignments = [
  { id: 1, title: 'Quadratic Equations Worksheet', subject: 'Mathematics', dueDate: 'Nov 08', priority: 'High' },
  { id: 2, title: 'Physics Lab Report', subject: 'Physics', dueDate: 'Nov 10', priority: 'Medium' },
  { id: 3, title: 'Essay on Shakespeare', subject: 'English', dueDate: 'Nov 12', priority: 'Low' },
];

const recentGrades = [
  { subject: 'Mathematics', score: 92, maxScore: 100, grade: 'A' },
  { subject: 'Physics', score: 88, maxScore: 100, grade: 'B+' },
  { subject: 'Chemistry', score: 95, maxScore: 100, grade: 'A' },
  { subject: 'English', score: 90, maxScore: 100, grade: 'A-' },
];

const announcements = [
  { id: 1, title: 'Mid-term Exams Schedule Released', date: '2 hours ago', type: 'exam' },
  { id: 2, title: 'Parent-Teacher Meeting on Nov 15', date: '5 hours ago', type: 'meeting' },
  { id: 3, title: 'Library Books Due Tomorrow', date: '1 day ago', type: 'reminder' },
];

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 dark:text-white mb-2">Welcome back, Emily!</h1>
        <p className="text-gray-600 dark:text-gray-400">Here's your academic overview for today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Attendance"
          value="95%"
          change="+2% from last month"
          changeType="positive"
          icon={Calendar}
          iconColor="text-[#0A66C2]"
          iconBg="bg-[#E8F0FE]"
        />
        <StatCard
          title="Current GPA"
          value="8.5"
          change="Top 5% of class"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          title="Pending Assignments"
          value="3"
          change="2 due this week"
          changeType="neutral"
          icon={FileText}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatCard
          title="Fee Due"
          value="$600"
          change="Due by Nov 15"
          changeType="neutral"
          icon={DollarSign}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#0052A3] flex items-center justify-center text-white flex-shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h4 className="text-sm text-gray-900 dark:text-white">{classItem.subject}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{classItem.teacher}</p>
                    </div>
                    <Badge variant="outline" className="bg-[#E8F0FE] text-[#0A66C2] border-[#0A66C2]">
                      {classItem.time}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{classItem.room}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Announcements</h3>
          <div className="space-y-3">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="pb-3 border-b border-gray-200 dark:border-gray-800 last:border-0">
                <p className="text-sm text-gray-900 dark:text-white mb-1">{announcement.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{announcement.date}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">View All</Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Pending Assignments</h3>
          <div className="space-y-3">
            {pendingAssignments.map((assignment) => (
              <div key={assignment.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm text-gray-900 dark:text-white mb-1">{assignment.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{assignment.subject}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      assignment.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                      assignment.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    {assignment.priority}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Due: {assignment.dueDate}</span>
                  <Button size="sm" variant="ghost">Submit</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-900 dark:text-white">Recent Grades</h3>
            <Award className="w-5 h-5 text-[#0A66C2]" />
          </div>
          <div className="space-y-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{grade.subject}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900 dark:text-white">{grade.score}/{grade.maxScore}</span>
                    <Badge 
                      variant="outline" 
                      className={`${
                        grade.grade.startsWith('A') ? 'bg-green-50 text-green-700 border-green-200' :
                        grade.grade.startsWith('B') ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }`}
                    >
                      {grade.grade}
                    </Badge>
                  </div>
                </div>
                <Progress value={(grade.score / grade.maxScore) * 100} className="h-2" />
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">View All Grades</Button>
        </Card>
      </div>
    </div>
  );
}
