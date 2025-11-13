import { useState } from 'react';
import { Search, Filter, Download, Plus, ArrowLeft, Eye, Pencil, Clipboard, Send, Trash2, MoreVertical, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { Progress } from '../../ui/progress';
import { Exam } from '../Examinations';

interface ExamListProps {
  onViewExam: (exam: Exam) => void;
  onCreateExam: () => void;
  onBack: () => void;
}

const exams: Exam[] = [
  {
    id: '1',
    name: 'Mid-Term Examination 2024',
    type: 'Mid-Term',
    academicYear: '2024-2025',
    startDate: '2024-11-15',
    endDate: '2024-11-20',
    classes: ['10-A', '10-B', '11-A'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
    status: 'Scheduled',
    totalStudents: 234,
    marksEntryProgress: 0,
    resultsPublished: 0
  },
  {
    id: '2',
    name: 'Physics Unit Test',
    type: 'Unit Test',
    academicYear: '2024-2025',
    startDate: '2024-11-08',
    endDate: '2024-11-08',
    classes: ['12-A', '12-B'],
    subjects: ['Physics'],
    status: 'Ongoing',
    totalStudents: 78,
    marksEntryProgress: 45,
    resultsPublished: 0
  },
  {
    id: '3',
    name: 'Final Examination 2023',
    type: 'Final',
    academicYear: '2023-2024',
    startDate: '2024-03-20',
    endDate: '2024-03-30',
    classes: ['10-A', '10-B', '11-A', '11-B', '12-A', '12-B'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History'],
    status: 'Completed',
    totalStudents: 456,
    marksEntryProgress: 100,
    resultsPublished: 100
  },
  {
    id: '4',
    name: 'Mathematics Monthly Test',
    type: 'Monthly Test',
    academicYear: '2024-2025',
    startDate: '2024-10-15',
    endDate: '2024-10-15',
    classes: ['9-A', '9-B', '9-C'],
    subjects: ['Mathematics'],
    status: 'Completed',
    totalStudents: 142,
    marksEntryProgress: 100,
    resultsPublished: 67
  },
  {
    id: '5',
    name: 'English Literature Test',
    type: 'Unit Test',
    academicYear: '2024-2025',
    startDate: '2024-11-25',
    endDate: '2024-11-25',
    classes: ['11-A', '11-B'],
    subjects: ['English'],
    status: 'Scheduled',
    totalStudents: 89,
    marksEntryProgress: 0,
    resultsPublished: 0
  },
  {
    id: '6',
    name: 'Chemistry Practical Exam',
    type: 'Practical',
    academicYear: '2024-2025',
    startDate: '2024-10-28',
    endDate: '2024-10-30',
    classes: ['12-A', '12-B'],
    subjects: ['Chemistry'],
    status: 'Completed',
    totalStudents: 72,
    marksEntryProgress: 100,
    resultsPublished: 100
  },
  {
    id: '7',
    name: 'Biology Mid-Term',
    type: 'Mid-Term',
    academicYear: '2024-2025',
    startDate: '2024-11-18',
    endDate: '2024-11-19',
    classes: ['11-A', '11-B', '12-A'],
    subjects: ['Biology'],
    status: 'Scheduled',
    totalStudents: 156,
    marksEntryProgress: 0,
    resultsPublished: 0
  }
];

export function ExamList({ onViewExam, onCreateExam, onBack }: ExamListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const itemsPerPage = 15;

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || exam.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredExams.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExams = filteredExams.slice(startIndex, startIndex + itemsPerPage);

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Ongoing':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Completed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Mid-Term':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Final':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'Unit Test':
        return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      default:
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-[32px] text-gray-900 dark:text-white tracking-tight">
              All Examinations
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Dashboard &gt; Examinations &gt; All Exams
            </p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search examinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 dark:bg-gray-800"
            />
          </div>

          {/* Filter Dropdown */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full lg:w-48 bg-gray-50 dark:bg-gray-800">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Exams</SelectItem>
              <SelectItem value="scheduled">Upcoming</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Range */}
          <div className="flex gap-2">
            <Input type="date" className="bg-gray-50 dark:bg-gray-800" />
            <Input type="date" className="bg-gray-50 dark:bg-gray-800" />
          </div>

          {/* Export */}
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>

          {/* Create */}
          <Button onClick={onCreateExam} className="bg-[#2563EB] hover:bg-[#1d4ed8] gap-2">
            <Plus className="w-4 h-4" />
            Create Exam
          </Button>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 mt-4">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="outline" className="gap-2">
                {filter}
                <button onClick={() => removeFilter(filter)}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            <Button variant="link" size="sm" onClick={() => setActiveFilters([])}>
              Clear All
            </Button>
          </div>
        )}
      </Card>

      {/* Data Table */}
      <Card className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
              <TableHead className="text-gray-700 dark:text-gray-300">Exam Name</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Type</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Classes</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Date Range</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Subjects</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
              <TableHead className="text-gray-700 dark:text-gray-300">Completion</TableHead>
              <TableHead className="text-right text-gray-700 dark:text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedExams.map((exam, index) => (
              <TableRow 
                key={exam.id} 
                className={`hover:bg-blue-50/50 dark:hover:bg-blue-900/10 cursor-pointer ${
                  index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'
                }`}
                onClick={() => onViewExam(exam)}
              >
                <TableCell>
                  <div className="text-sm text-gray-900 dark:text-white hover:text-[#2563EB]">
                    {exam.name}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getTypeColor(exam.type)}>
                    {exam.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {exam.classes.slice(0, 2).map(cls => (
                      <Badge key={cls} variant="outline" className="text-xs bg-gray-100 text-gray-700 border-gray-200">
                        {cls}
                      </Badge>
                    ))}
                    {exam.classes.length > 2 && (
                      <Badge variant="outline" className="text-xs bg-gray-100 text-gray-700 border-gray-200">
                        +{exam.classes.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {new Date(exam.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    {' - '}
                    {new Date(exam.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-900 dark:text-white">
                    {exam.subjects.length}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusColor(exam.status)}>
                    {exam.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="w-32">
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Results</span>
                      <span>{exam.resultsPublished}%</span>
                    </div>
                    <Progress value={exam.resultsPublished} className="h-2" />
                  </div>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewExam(exam)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit Exam
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clipboard className="w-4 h-4 mr-2" />
                        Enter Marks
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="w-4 h-4 mr-2" />
                        Publish Results
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download Report
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredExams.length)} of {filteredExams.length} exams
        </p>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? 'bg-[#2563EB] hover:bg-[#1d4ed8]' : ''}
            >
              {page}
            </Button>
          ))}
          
          {totalPages > 5 && <span className="text-gray-400">...</span>}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Select defaultValue="15">
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
