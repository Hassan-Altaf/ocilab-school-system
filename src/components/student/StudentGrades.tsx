import { useState } from 'react';
import { Award, TrendingUp, TrendingDown, Download, Eye, BookOpen } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface SubjectGrade {
  subject: string;
  assignments: number;
  quizzes: number;
  midterm: number;
  final: number;
  attendance: number;
  total: number;
  grade: string;
  teacher: string;
  trend: 'up' | 'down' | 'stable';
}

const mockGrades: SubjectGrade[] = [
  {
    subject: 'Mathematics',
    assignments: 85,
    quizzes: 88,
    midterm: 82,
    final: 0,
    attendance: 95,
    total: 87,
    grade: 'A-',
    teacher: 'Dr. Sarah Mitchell',
    trend: 'up'
  },
  {
    subject: 'Physics',
    assignments: 78,
    quizzes: 82,
    midterm: 76,
    final: 0,
    attendance: 92,
    total: 80,
    grade: 'B+',
    teacher: 'Prof. Michael Chen',
    trend: 'stable'
  },
  {
    subject: 'Chemistry',
    assignments: 92,
    quizzes: 90,
    midterm: 88,
    final: 0,
    attendance: 98,
    total: 91,
    grade: 'A',
    teacher: 'Dr. Robert Lee',
    trend: 'up'
  },
  {
    subject: 'English',
    assignments: 88,
    quizzes: 85,
    midterm: 90,
    final: 0,
    attendance: 93,
    total: 89,
    grade: 'A',
    teacher: 'Ms. Emma Wilson',
    trend: 'up'
  },
  {
    subject: 'History',
    assignments: 82,
    quizzes: 80,
    midterm: 78,
    final: 0,
    attendance: 90,
    total: 81,
    grade: 'B+',
    teacher: 'Ms. Jennifer Brown',
    trend: 'down'
  },
  {
    subject: 'Biology',
    assignments: 90,
    quizzes: 88,
    midterm: 92,
    final: 0,
    attendance: 96,
    total: 91,
    grade: 'A',
    teacher: 'Dr. Lisa Wang',
    trend: 'up'
  },
];

const termReports = [
  {
    term: 'Term 1 - 2024',
    gpa: 3.7,
    percentage: 88,
    rank: 5,
    totalStudents: 120,
    date: '2024-03-15'
  },
  {
    term: 'Term 2 - 2024',
    gpa: 3.8,
    percentage: 89,
    rank: 4,
    totalStudents: 120,
    date: '2024-07-20'
  },
];

export function StudentGrades() {
  const [selectedTerm, setSelectedTerm] = useState('current');

  const overallStats = {
    gpa: (mockGrades.reduce((sum, g) => sum + g.total, 0) / mockGrades.length / 25).toFixed(2),
    avgPercentage: Math.round(mockGrades.reduce((sum, g) => sum + g.total, 0) / mockGrades.length),
    aGrades: mockGrades.filter(g => g.grade.startsWith('A')).length,
    improving: mockGrades.filter(g => g.trend === 'up').length,
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/20 dark:text-green-400';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/20 dark:text-blue-400';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-400';
    if (grade.startsWith('D')) return 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/20 dark:text-orange-400';
    return 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/20 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">My Grades</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View your academic performance and progress
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedTerm} onValueChange={setSelectedTerm}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Term</SelectItem>
              <SelectItem value="term1">Term 1 - 2024</SelectItem>
              <SelectItem value="term2">Term 2 - 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">Current GPA</p>
              <p className="text-3xl text-blue-900 dark:text-blue-100">{overallStats.gpa}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 dark:text-green-300 mb-1">Average</p>
              <p className="text-3xl text-green-900 dark:text-green-100">{overallStats.avgPercentage}%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-1">A Grades</p>
              <p className="text-3xl text-purple-900 dark:text-purple-100">{overallStats.aGrades}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-1">Improving</p>
              <p className="text-3xl text-orange-900 dark:text-orange-100">{overallStats.improving}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Subject-wise Grades */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl text-gray-900 dark:text-white">Subject-wise Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Subject
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Assignments
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Quizzes
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Midterm
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Attendance
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Total
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Grade
                </th>
                <th className="px-6 py-4 text-center text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Trend
                </th>
                <th className="px-6 py-4 text-right text-xs text-gray-600 dark:text-gray-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockGrades.map((grade) => (
                <tr key={grade.subject} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">{grade.subject}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{grade.teacher}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-900 dark:text-white">{grade.assignments}%</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-900 dark:text-white">{grade.quizzes}%</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-900 dark:text-white">{grade.midterm}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-center">
                      <Progress value={grade.attendance} className="w-16" />
                      <span className="text-sm text-gray-900 dark:text-white">{grade.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-900 dark:text-white">{grade.total}%</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant="outline" className={getGradeColor(grade.grade)}>
                      {grade.grade}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {grade.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600 mx-auto" />}
                    {grade.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600 mx-auto" />}
                    {grade.trend === 'stable' && <div className="w-5 h-0.5 bg-gray-400 mx-auto" />}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Grade Distribution & Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Grade Distribution</h3>
          <div className="space-y-4">
            {['A', 'B', 'C', 'D', 'F'].map((letter) => {
              const count = mockGrades.filter(g => g.grade.startsWith(letter)).length;
              const percentage = (count / mockGrades.length) * 100;
              return (
                <div key={letter} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={`${getGradeColor(letter)} px-3 py-1`}>
                      Grade {letter}
                    </Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {count} subjects ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Previous Term Reports */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-900 dark:text-white">Previous Term Reports</h3>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {termReports.map((report) => (
              <Card key={report.term} className="p-4 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-sm text-gray-900 dark:text-white mb-1">{report.term}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Published: {new Date(report.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/20 dark:text-blue-400">
                    Published
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">GPA</p>
                    <p className="text-lg text-gray-900 dark:text-white">{report.gpa}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Percentage</p>
                    <p className="text-lg text-gray-900 dark:text-white">{report.percentage}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Class Rank</p>
                    <p className="text-lg text-gray-900 dark:text-white">{report.rank}/{report.totalStudents}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report Card
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
