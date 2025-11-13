import { useState } from 'react';
import { BookOpen, TrendingUp, TrendingDown, Award, Filter, Download, Eye } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';

interface StudentGrade {
  id: number;
  rollNo: string;
  name: string;
  assignments: number[];
  quizzes: number[];
  midterm: number;
  final: number;
  attendance: number;
  total: number;
  grade: string;
  trend: 'up' | 'down' | 'stable';
}

const mockGrades: StudentGrade[] = [
  {
    id: 1,
    rollNo: '001',
    name: 'Ahmed Hassan',
    assignments: [18, 16, 19, 17],
    quizzes: [8, 9, 7],
    midterm: 38,
    final: 0,
    attendance: 92,
    total: 78,
    grade: 'B',
    trend: 'up'
  },
  {
    id: 2,
    rollNo: '002',
    name: 'Fatima Khan',
    assignments: [20, 19, 20, 18],
    quizzes: [10, 9, 10],
    midterm: 42,
    final: 0,
    attendance: 95,
    total: 85,
    grade: 'A',
    trend: 'up'
  },
  {
    id: 3,
    rollNo: '003',
    name: 'Ali Raza',
    assignments: [15, 14, 16, 15],
    quizzes: [6, 7, 6],
    midterm: 32,
    final: 0,
    attendance: 85,
    total: 68,
    grade: 'C+',
    trend: 'stable'
  },
  {
    id: 4,
    rollNo: '004',
    name: 'Ayesha Malik',
    assignments: [19, 18, 19, 20],
    quizzes: [9, 10, 9],
    midterm: 40,
    final: 0,
    attendance: 90,
    total: 82,
    grade: 'A-',
    trend: 'up'
  },
  {
    id: 5,
    rollNo: '005',
    name: 'Usman Tariq',
    assignments: [12, 13, 11, 14],
    quizzes: [5, 6, 5],
    midterm: 28,
    final: 0,
    attendance: 78,
    total: 58,
    grade: 'D+',
    trend: 'down'
  },
];

export function TeacherGradebook() {
  const [selectedClass, setSelectedClass] = useState('1');
  const [selectedTerm, setSelectedTerm] = useState('current');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGrades = mockGrades.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.rollNo.includes(searchQuery)
  );

  const classStats = {
    avgTotal: Math.round(mockGrades.reduce((sum, s) => sum + s.total, 0) / mockGrades.length),
    avgAttendance: Math.round(mockGrades.reduce((sum, s) => sum + s.attendance, 0) / mockGrades.length),
    aGrades: mockGrades.filter(s => s.grade.startsWith('A')).length,
    failing: mockGrades.filter(s => s.total < 50).length,
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
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Gradebook</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage student grades and performance
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Grades
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Select Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Grade 10A - Mathematics</SelectItem>
                <SelectItem value="2">Grade 9B - Mathematics</SelectItem>
                <SelectItem value="3">Grade 11A - Mathematics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Term</label>
            <Select value={selectedTerm} onValueChange={setSelectedTerm}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Term</SelectItem>
                <SelectItem value="term1">Term 1</SelectItem>
                <SelectItem value="term2">Term 2</SelectItem>
                <SelectItem value="final">Final</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-700 dark:text-gray-300">Search Student</label>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Name or Roll No..."
              className="h-11"
            />
          </div>
        </div>
      </Card>

      {/* Class Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Class Average</p>
              <p className="text-3xl text-gray-900 dark:text-white">{classStats.avgTotal}%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Attendance</p>
              <p className="text-3xl text-green-600 dark:text-green-400">{classStats.avgAttendance}%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">A Grades</p>
              <p className="text-3xl text-purple-600 dark:text-purple-400">{classStats.aGrades}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">At Risk</p>
              <p className="text-3xl text-red-600 dark:text-red-400">{classStats.failing}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Gradebook Table */}
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
              {filteredGrades.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">{student.rollNo}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm">
                        {student.name.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-900 dark:text-white">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {Math.round(student.assignments.reduce((a, b) => a + b, 0) / student.assignments.length)}/20
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {Math.round(student.quizzes.reduce((a, b) => a + b, 0) / student.quizzes.length)}/10
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-900 dark:text-white">{student.midterm}/50</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Progress value={student.attendance} className="flex-1 max-w-[80px]" />
                      <span className="text-sm text-gray-900 dark:text-white">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-900 dark:text-white">{student.total}%</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant="outline" className={getGradeColor(student.grade)}>
                      {student.grade}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {student.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600 mx-auto" />}
                    {student.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600 mx-auto" />}
                    {student.trend === 'stable' && <div className="w-5 h-0.5 bg-gray-400 mx-auto" />}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Grade Distribution */}
      <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h3 className="text-lg text-gray-900 dark:text-white mb-4">Grade Distribution</h3>
        <div className="grid grid-cols-5 gap-4">
          {['A', 'B', 'C', 'D', 'F'].map((grade) => {
            const count = mockGrades.filter(s => s.grade.startsWith(grade)).length;
            const percentage = Math.round((count / mockGrades.length) * 100);
            return (
              <div key={grade} className="text-center">
                <div className="mb-2">
                  <Badge variant="outline" className={`text-lg px-4 py-2 ${getGradeColor(grade)}`}>
                    {grade}
                  </Badge>
                </div>
                <p className="text-2xl text-gray-900 dark:text-white mb-1">{count}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</p>
                <Progress value={percentage} className="mt-2" />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
