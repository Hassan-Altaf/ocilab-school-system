import { Calendar, Users, FileText, CheckCircle, Clock } from 'lucide-react';
import { StatCard } from '../dashboard/StatCard';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const upcomingClasses = [
  { id: 1, subject: 'Mathematics', class: 'Grade 10A', time: '09:00 AM', duration: '1 hour', room: 'Room 201' },
  { id: 2, subject: 'Mathematics', class: 'Grade 9B', time: '11:00 AM', duration: '1 hour', room: 'Room 203' },
  { id: 3, subject: 'Mathematics', class: 'Grade 11A', time: '02:00 PM', duration: '1 hour', room: 'Room 201' },
];

const recentAssignments = [
  { id: 1, title: 'Quadratic Equations Worksheet', class: 'Grade 10A', submitted: 28, total: 32, dueDate: '2024-11-08' },
  { id: 2, title: 'Trigonometry Practice', class: 'Grade 9B', submitted: 25, total: 30, dueDate: '2024-11-10' },
  { id: 3, title: 'Calculus Problem Set', class: 'Grade 11A', submitted: 22, total: 28, dueDate: '2024-11-12' },
];

const todayAttendance = [
  { class: 'Grade 10A', present: 28, absent: 4, total: 32, time: '09:00 AM' },
  { class: 'Grade 9B', present: 26, absent: 4, total: 30, time: '11:00 AM' },
];

const pendingTasks = [
  { id: 1, task: 'Grade mid-term exams for Grade 10A', priority: 'High', dueDate: 'Tomorrow' },
  { id: 2, task: 'Prepare lesson plan for next week', priority: 'Medium', dueDate: 'Nov 10' },
  { id: 3, task: 'Update student progress reports', priority: 'High', dueDate: 'Nov 08' },
  { id: 4, task: 'Review assignment submissions', priority: 'Low', dueDate: 'Nov 12' },
];

export function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl text-gray-900 dark:text-white mb-2">Welcome back, Dr. Sarah!</h1>
        <p className="text-gray-600 dark:text-gray-400">Here's your teaching schedule and updates for today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Classes Today"
          value="3"
          change="Next at 9:00 AM"
          changeType="neutral"
          icon={Calendar}
          iconColor="text-[#0A66C2]"
          iconBg="bg-[#E8F0FE]"
        />
        <StatCard
          title="Total Students"
          value="92"
          change="Across 5 classes"
          changeType="neutral"
          icon={Users}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          title="Pending Assignments"
          value="12"
          change="To be graded"
          changeType="neutral"
          icon={FileText}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatCard
          title="Avg Attendance"
          value="87%"
          change="This week"
          changeType="positive"
          icon={CheckCircle}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#0052A3] flex items-center justify-center text-white flex-shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h4 className="text-sm text-gray-900 dark:text-white">{classItem.subject}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{classItem.class} • {classItem.room}</p>
                    </div>
                    <Badge variant="outline" className="bg-[#E8F0FE] text-[#0A66C2] border-[#0A66C2]">
                      {classItem.time}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{classItem.duration}</p>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4" variant="outline">View Full Schedule</Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Today's Attendance</h3>
          <div className="space-y-4">
            {todayAttendance.map((attendance, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white">{attendance.class}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{attendance.time}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {attendance.present}/{attendance.total}
                  </p>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${(attendance.present / attendance.total) * 100}%` }}
                  ></div>
                </div>
                <div className="flex gap-4 text-xs">
                  <span className="text-green-600">Present: {attendance.present}</span>
                  <span className="text-red-600">Absent: {attendance.absent}</span>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 bg-[#0A66C2] hover:bg-[#0052A3]">Mark Attendance</Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Recent Assignments</h3>
          <div className="space-y-3">
            {recentAssignments.map((assignment) => (
              <div key={assignment.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm text-gray-900 dark:text-white mb-1">{assignment.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{assignment.class}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Due: {assignment.dueDate}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0A66C2]"
                      style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {assignment.submitted}/{assignment.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Pending Tasks</h3>
          <div className="space-y-2">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 flex-shrink-0 mt-0.5"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white mb-1">{task.task}</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${task.priority === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                          task.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-gray-50 text-gray-700 border-gray-200'
                        }`}
                    >
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.dueDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
