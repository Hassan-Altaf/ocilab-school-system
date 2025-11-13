import { Users, GraduationCap, DollarSign, CalendarCheck, TrendingUp, TrendingDown, Activity, Award } from 'lucide-react';
import { StatCard } from '../dashboard/StatCard';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { month: 'Jan', attendance: 92 },
  { month: 'Feb', attendance: 88 },
  { month: 'Mar', attendance: 94 },
  { month: 'Apr', attendance: 91 },
  { month: 'May', attendance: 89 },
  { month: 'Jun', attendance: 93 },
];

const revenueData = [
  { month: 'Jan', revenue: 45000, expenses: 28000 },
  { month: 'Feb', revenue: 52000, expenses: 30000 },
  { month: 'Mar', revenue: 48000, expenses: 29000 },
  { month: 'Apr', revenue: 61000, expenses: 32000 },
  { month: 'May', revenue: 55000, expenses: 31000 },
  { month: 'Jun', revenue: 67000, expenses: 33000 },
];

const classDistribution = [
  { name: 'Grade 1-3', value: 320, color: '#0A66C2' },
  { name: 'Grade 4-6', value: 280, color: '#4A90E2' },
  { name: 'Grade 7-9', value: 240, color: '#7FB3F5' },
  { name: 'Grade 10-12', value: 200, color: '#B3D4FC' },
];

const recentActivities = [
  { id: 1, action: 'New student enrollment', user: 'Sarah Johnson', time: '5 min ago', type: 'student' },
  { id: 2, action: 'Fee payment received', user: 'Michael Chen', time: '12 min ago', type: 'payment' },
  { id: 3, action: 'Teacher assigned to Grade 5A', user: 'Emma Wilson', time: '1 hour ago', type: 'teacher' },
  { id: 4, action: 'Exam results published', user: 'Admin', time: '2 hours ago', type: 'exam' },
  { id: 5, action: 'Parent meeting scheduled', user: 'David Brown', time: '3 hours ago', type: 'meeting' },
];

const topPerformers = [
  { id: 1, name: 'Emily Rodriguez', class: 'Grade 10A', score: 98.5, avatar: 'ER' },
  { id: 2, name: 'James Wilson', class: 'Grade 9B', score: 97.8, avatar: 'JW' },
  { id: 3, name: 'Sophia Lee', class: 'Grade 11A', score: 96.9, avatar: 'SL' },
  { id: 4, name: 'Oliver Thompson', class: 'Grade 8C', score: 96.2, avatar: 'OT' },
  { id: 5, name: 'Ava Martinez', class: 'Grade 12A', score: 95.8, avatar: 'AM' },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A66C2]/10 to-blue-500/10 rounded-3xl blur-3xl -z-10"></div>
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      {/* Stats Grid - Compact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value="1,248"
          change="+0.13%"
          changeType="positive"
          gradient="from-purple-600 to-purple-700"
        />
        <StatCard
          title="Total Teachers"
          value="87"
          change="+2.86%"
          changeType="positive"
          gradient="from-blue-600 to-blue-700"
        />
        <StatCard
          title="Fees Collected"
          value="PKR 8.4M"
          change="+3.53%"
          changeType="positive"
          gradient="from-cyan-500 to-cyan-600"
        />
        <StatCard
          title="Avg Attendance"
          value="92.5%"
          change="-5.60%"
          changeType="negative"
          gradient="from-green-500 to-green-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart - Enhanced 3D Card */}
        <div className="lg:col-span-2 group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-1 opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-0.5 opacity-50"></div>
          
          <Card className="relative rounded-3xl p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 rounded-3xl pointer-events-none"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl text-gray-900 dark:text-white mb-1 tracking-tight">Revenue vs Expenses</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Monthly financial overview</p>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-600 dark:text-green-500 font-medium">+24%</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" opacity={0.5} />
                  <XAxis 
                    dataKey="month" 
                    className="text-sm" 
                    stroke="#9CA3AF"
                    tick={{ fill: '#6B7280' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF"
                    tick={{ fill: '#6B7280' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                  />
                  <Bar dataKey="revenue" fill="url(#revenueGradient)" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="expenses" fill="url(#expensesGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0A66C2" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#0A66C2" stopOpacity={0.6}/>
                    </linearGradient>
                    <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E8F0FE" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#E8F0FE" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Class Distribution - Enhanced 3D Card */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-1 opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-0.5 opacity-50"></div>
          
          <Card className="relative rounded-3xl p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 rounded-3xl pointer-events-none"></div>
            <div className="relative">
              <div className="mb-6">
                <h3 className="text-xl text-gray-900 dark:text-white mb-1 tracking-tight">Class Distribution</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Student enrollment by grade</p>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={classDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {classDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: 'none', 
                      borderRadius: '12px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {classDistribution.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full shadow-sm" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{item.name}</p>
                      <p className="text-sm text-gray-900 dark:text-white font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers - Enhanced 3D Card */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-1 opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-0.5 opacity-50"></div>
          
          <Card className="relative rounded-3xl p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 rounded-3xl pointer-events-none"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 dark:text-white tracking-tight">Top Performers</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Highest achieving students</p>
                </div>
              </div>
              <div className="space-y-4">
                {topPerformers.map((student, index) => (
                  <div 
                    key={student.id}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 border border-gray-100 dark:border-gray-800"
                  >
                    <div className="relative">
                      <Avatar className="w-12 h-12 ring-2 ring-white dark:ring-gray-800 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-br from-[#0A66C2] to-blue-600 text-white text-sm">
                          {student.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                          <span className="text-xs">🏆</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white font-medium">{student.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{student.class}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-md">
                        {student.score}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity - Enhanced 3D Card */}
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-1 opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-0.5 opacity-50"></div>
          
          <Card className="relative rounded-3xl p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 rounded-3xl pointer-events-none"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 dark:text-white tracking-tight">Recent Activity</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Latest system updates</p>
                </div>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 border border-gray-100 dark:border-gray-800"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 shadow-md ${
                      activity.type === 'student' ? 'bg-blue-500' :
                      activity.type === 'payment' ? 'bg-green-500' :
                      activity.type === 'teacher' ? 'bg-purple-500' :
                      activity.type === 'exam' ? 'bg-orange-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white mb-1">{activity.action}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Attendance Trend - Full Width Enhanced Card */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-1 opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-0.5 opacity-50"></div>
        
        <Card className="relative rounded-3xl p-8 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 rounded-3xl pointer-events-none"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl text-gray-900 dark:text-white mb-1 tracking-tight">Attendance Trend</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">6-month attendance overview</p>
              </div>
              <Badge className="bg-gradient-to-r from-[#0A66C2] to-blue-500 text-white border-0 shadow-md px-4 py-2">
                Avg: 91.2%
              </Badge>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" opacity={0.5} />
                <XAxis 
                  dataKey="month" 
                  className="text-sm" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#6B7280' }}
                />
                <YAxis 
                  stroke="#9CA3AF"
                  tick={{ fill: '#6B7280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="url(#attendanceGradient)" 
                  strokeWidth={3}
                  dot={{ fill: '#0A66C2', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, strokeWidth: 2 }}
                />
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0A66C2" />
                    <stop offset="100%" stopColor="#4A90E2" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
