import { useState } from 'react';
import { ArrowLeft, Save, Send, RotateCcw, TrendingUp, Trophy, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { toast } from 'sonner@2.0.3';
import { Exam } from '../Examinations';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';

interface MarksEntryProps {
  exam: Exam | null;
  onBack: () => void;
}

interface StudentMark {
  id: string;
  rollNo: string;
  name: string;
  theory: string;
  practical: string;
  total: number;
  grade: string;
  status: 'Present' | 'Absent' | 'Medical Leave';
}

const students: StudentMark[] = [
  { id: '1', rollNo: '001', name: 'Alice Johnson', theory: '', practical: '', total: 0, grade: '-', status: 'Present' },
  { id: '2', rollNo: '002', name: 'Bob Smith', theory: '', practical: '', total: 0, grade: '-', status: 'Present' },
  { id: '3', rollNo: '003', name: 'Charlie Brown', theory: '', practical: '', total: 0, grade: '-', status: 'Present' },
  { id: '4', rollNo: '004', name: 'Diana Prince', theory: '', practical: '', total: 0, grade: '-', status: 'Present' },
  { id: '5', rollNo: '005', name: 'Ethan Hunt', theory: '', practical: '', total: 0, grade: '-', status: 'Present' }
];

export function MarksEntry({ exam, onBack }: MarksEntryProps) {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [marksData, setMarksData] = useState<StudentMark[]>(students);
  const [autoSave, setAutoSave] = useState(true);

  const theoryMax = 100;
  const practicalMax = 50;
  const totalMax = theoryMax + practicalMax;

  const calculateGrade = (total: number): string => {
    const percentage = (total / totalMax) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  };

  const updateMarks = (id: string, field: 'theory' | 'practical', value: string) => {
    setMarksData(prev => prev.map(student => {
      if (student.id === id) {
        const updated = { ...student, [field]: value };
        const theory = parseInt(updated.theory) || 0;
        const practical = parseInt(updated.practical) || 0;
        updated.total = theory + practical;
        updated.grade = updated.total > 0 ? calculateGrade(updated.total) : '-';
        return updated;
      }
      return student;
    }));
  };

  const updateStatus = (id: string, status: StudentMark['status']) => {
    setMarksData(prev => prev.map(student =>
      student.id === id ? { ...student, status } : student
    ));
  };

  const classAverage = marksData.reduce((sum, s) => sum + s.total, 0) / marksData.length || 0;
  const highest = Math.max(...marksData.map(s => s.total));
  const lowest = Math.min(...marksData.filter(s => s.total > 0).map(s => s.total)) || 0;
  const passCount = marksData.filter(s => (s.total / totalMax) * 100 >= 40).length;
  const passPercentage = (passCount / marksData.length) * 100;

  const handleSubmit = () => {
    toast.success('Marks submitted successfully!');
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-[32px] text-gray-900 dark:text-white tracking-tight">
              Marks Entry
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Dashboard &gt; Examinations &gt; {exam?.name} &gt; Marks Entry
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {autoSave && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
              Auto-save enabled
            </div>
          )}
          <Button variant="outline" onClick={() => setMarksData(students)}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear All
          </Button>
          <Button variant="outline" onClick={onBack}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button className="bg-[#2563EB] hover:bg-[#1d4ed8]" onClick={handleSubmit}>
            <Send className="w-4 h-4 mr-2" />
            Submit Marks
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Select Class</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="mt-1 bg-gray-50 dark:bg-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10-A">Class 10-A</SelectItem>
                <SelectItem value="10-B">Class 10-B</SelectItem>
                <SelectItem value="11-A">Class 11-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Select Subject</Label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="mt-1 bg-gray-50 dark:bg-gray-800">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Exam Date</Label>
            <Input type="date" className="mt-1 bg-gray-50 dark:bg-gray-800" />
          </div>
        </div>
      </Card>

      {/* Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Class Average</p>
              <p className="text-lg text-gray-900 dark:text-white">{classAverage.toFixed(1)}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Highest Marks</p>
              <p className="text-lg text-gray-900 dark:text-white">{highest}/{totalMax}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Lowest Marks</p>
              <p className="text-lg text-gray-900 dark:text-white">{lowest}/{totalMax}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Pass %</p>
              <p className="text-lg text-gray-900 dark:text-white">{passPercentage.toFixed(0)}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Marks Entry Table */}
      <Card className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableHead className="text-gray-700 dark:text-gray-300">Roll No.</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">Student Name</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">Theory ({theoryMax})</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">Practical ({practicalMax})</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">Total ({totalMax})</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">Grade</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marksData.map((student, index) => (
                <TableRow 
                  key={student.id}
                  className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'}
                >
                  <TableCell className="text-gray-700 dark:text-gray-300">{student.rollNo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-gray-900 dark:text-white">{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      max={theoryMax}
                      value={student.theory}
                      onChange={(e) => updateMarks(student.id, 'theory', e.target.value)}
                      className={`w-24 ${
                        parseInt(student.theory) > theoryMax 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : parseInt(student.theory) > 0 
                          ? 'border-green-500' 
                          : ''
                      }`}
                      disabled={student.status !== 'Present'}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      max={practicalMax}
                      value={student.practical}
                      onChange={(e) => updateMarks(student.id, 'practical', e.target.value)}
                      className={`w-24 ${
                        parseInt(student.practical) > practicalMax 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : parseInt(student.practical) > 0 
                          ? 'border-green-500' 
                          : ''
                      }`}
                      disabled={student.status !== 'Present'}
                    />
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-white">
                    {student.total}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        student.grade === 'A+' || student.grade === 'A' 
                          ? 'bg-green-100 text-green-700 border-green-200'
                          : student.grade === 'F' 
                          ? 'bg-red-100 text-red-700 border-red-200'
                          : 'bg-blue-100 text-blue-700 border-blue-200'
                      }
                    >
                      {student.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Select value={student.status} onValueChange={(value) => updateStatus(student.id, value as StudentMark['status'])}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Present">Present</SelectItem>
                        <SelectItem value="Absent">Absent</SelectItem>
                        <SelectItem value="Medical Leave">Medical</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
