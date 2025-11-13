import { useState } from 'react';
import { Plus, Search, Filter, BookOpen, Users, GraduationCap, MoreVertical, Edit, Trash2, Eye, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Checkbox } from '../ui/checkbox';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

interface Subject {
  id: string;
  name: string;
  code: string;
  teacher?: string;
  teacherId?: string;
}

interface Section {
  id: string;
  name: string;
  capacity: number;
  enrolled: number;
  classTeacher?: string;
  classTeacherId?: string;
  room?: string;
}

interface ClassData {
  id: string;
  name: string;
  grade: number;
  sections: Section[];
  subjects: Subject[];
  totalStudents: number;
  totalCapacity: number;
  academicYear: string;
}

const mockClasses: ClassData[] = [
  {
    id: '1',
    name: 'Grade 1',
    grade: 1,
    academicYear: '2024-2025',
    totalStudents: 95,
    totalCapacity: 120,
    sections: [
      { id: 's1', name: 'A', capacity: 40, enrolled: 35, classTeacher: 'Mrs. Anderson', room: '101' },
      { id: 's2', name: 'B', capacity: 40, enrolled: 32, classTeacher: 'Mr. Smith', room: '102' },
      { id: 's3', name: 'C', capacity: 40, enrolled: 28, classTeacher: 'Ms. Johnson', room: '103' },
    ],
    subjects: [
      { id: 'sub1', name: 'English', code: 'ENG101', teacher: 'Ms. Emma Wilson' },
      { id: 'sub2', name: 'Mathematics', code: 'MATH101', teacher: 'Dr. Sarah Mitchell' },
      { id: 'sub3', name: 'Science', code: 'SCI101', teacher: 'Prof. John Davis' },
      { id: 'sub4', name: 'Art', code: 'ART101', teacher: 'Ms. Lisa Brown' },
    ],
  },
  {
    id: '2',
    name: 'Grade 10',
    grade: 10,
    academicYear: '2024-2025',
    totalStudents: 128,
    totalCapacity: 160,
    sections: [
      { id: 's4', name: 'A', capacity: 40, enrolled: 38, classTeacher: 'Dr. Sarah Mitchell', room: '201' },
      { id: 's5', name: 'B', capacity: 40, enrolled: 35, classTeacher: 'Prof. Michael Chen', room: '202' },
      { id: 's6', name: 'C', capacity: 40, enrolled: 30, classTeacher: 'Ms. Emma Wilson', room: '203' },
      { id: 's7', name: 'D', capacity: 40, enrolled: 25, classTeacher: 'Mr. David Brown', room: '204' },
    ],
    subjects: [
      { id: 'sub5', name: 'English Literature', code: 'ENG1001', teacher: 'Ms. Emma Wilson' },
      { id: 'sub6', name: 'Advanced Mathematics', code: 'MATH1001', teacher: 'Dr. Sarah Mitchell' },
      { id: 'sub7', name: 'Physics', code: 'PHY1001', teacher: 'Prof. Michael Chen' },
      { id: 'sub8', name: 'Chemistry', code: 'CHEM1001', teacher: 'Mr. David Brown' },
      { id: 'sub9', name: 'Biology', code: 'BIO1001', teacher: 'Dr. Jane Cooper' },
      { id: 'sub10', name: 'History', code: 'HIST1001', teacher: 'Mr. Robert Lee' },
    ],
  },
  {
    id: '3',
    name: 'Grade 7',
    grade: 7,
    academicYear: '2024-2025',
    totalStudents: 85,
    totalCapacity: 120,
    sections: [
      { id: 's8', name: 'A', capacity: 40, enrolled: 35, classTeacher: 'Ms. Patricia White', room: '301' },
      { id: 's9', name: 'B', capacity: 40, enrolled: 28, classTeacher: 'Mr. James Taylor', room: '302' },
      { id: 's10', name: 'C', capacity: 40, enrolled: 22, classTeacher: 'Mrs. Linda Green', room: '303' },
    ],
    subjects: [
      { id: 'sub11', name: 'English', code: 'ENG701', teacher: 'Ms. Emma Wilson' },
      { id: 'sub12', name: 'Mathematics', code: 'MATH701', teacher: 'Dr. Sarah Mitchell' },
      { id: 'sub13', name: 'Science', code: 'SCI701', teacher: 'Prof. Michael Chen' },
      { id: 'sub14', name: 'Social Studies', code: 'SS701', teacher: 'Mr. Robert Lee' },
      { id: 'sub15', name: 'Physical Education', code: 'PE701', teacher: 'Coach Mark Wilson' },
    ],
  },
];

const availableTeachers = [
  { id: 't1', name: 'Dr. Sarah Mitchell', subject: 'Mathematics' },
  { id: 't2', name: 'Prof. Michael Chen', subject: 'Physics' },
  { id: 't3', name: 'Ms. Emma Wilson', subject: 'English' },
  { id: 't4', name: 'Mr. David Brown', subject: 'Chemistry' },
  { id: 't5', name: 'Dr. Jane Cooper', subject: 'Biology' },
  { id: 't6', name: 'Mr. Robert Lee', subject: 'History' },
];

const allSubjects = [
  { id: 'sub1', name: 'English', code: 'ENG' },
  { id: 'sub2', name: 'Mathematics', code: 'MATH' },
  { id: 'sub3', name: 'Science', code: 'SCI' },
  { id: 'sub4', name: 'Physics', code: 'PHY' },
  { id: 'sub5', name: 'Chemistry', code: 'CHEM' },
  { id: 'sub6', name: 'Biology', code: 'BIO' },
  { id: 'sub7', name: 'History', code: 'HIST' },
  { id: 'sub8', name: 'Geography', code: 'GEO' },
  { id: 'sub9', name: 'Computer Science', code: 'CS' },
  { id: 'sub10', name: 'Art', code: 'ART' },
  { id: 'sub11', name: 'Music', code: 'MUS' },
  { id: 'sub12', name: 'Physical Education', code: 'PE' },
];

export function Classes() {
  const [classes, setClasses] = useState<ClassData[]>(mockClasses);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Form states
  const [className, setClassName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [sections, setSections] = useState<Section[]>([
    { id: '1', name: 'A', capacity: 40, enrolled: 0, room: '' }
  ]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const totalClasses = classes.length;
  const totalSections = classes.reduce((sum, cls) => sum + cls.sections.length, 0);
  const totalStudents = classes.reduce((sum, cls) => sum + cls.totalStudents, 0);
  const totalCapacity = classes.reduce((sum, cls) => sum + cls.totalCapacity, 0);

  const handleAddSection = () => {
    const newSection: Section = {
      id: `${sections.length + 1}`,
      name: String.fromCharCode(65 + sections.length), // A, B, C, etc.
      capacity: 40,
      enrolled: 0,
      room: '',
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const handleUpdateSection = (id: string, field: keyof Section, value: any) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleViewDetails = (classData: ClassData) => {
    setSelectedClass(classData);
    setShowDetailDialog(true);
  };

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleSubmitClass = () => {
    // In real app, this would call an API
    const newClass: ClassData = {
      id: `${classes.length + 1}`,
      name: className,
      grade: parseInt(gradeLevel),
      academicYear: '2024-2025',
      sections: sections,
      subjects: allSubjects
        .filter(sub => selectedSubjects.includes(sub.id))
        .map(sub => ({ ...sub, teacher: '' })),
      totalStudents: sections.reduce((sum, s) => sum + s.enrolled, 0),
      totalCapacity: sections.reduce((sum, s) => sum + s.capacity, 0),
    };

    setClasses([...classes, newClass]);
    setShowAddDialog(false);

    // Reset form
    setClassName('');
    setGradeLevel('');
    setSections([{ id: '1', name: 'A', capacity: 40, enrolled: 0, room: '' }]);
    setSelectedSubjects([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 dark:text-white mb-2">Classes & Sections</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage class structure and subject mapping</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-[#0A66C2] hover:bg-[#0052A3]">
          <Plus className="w-4 h-4 mr-2" />
          Add Class
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Classes</p>
              <h3 className="text-2xl text-gray-900 dark:text-white mb-2">{totalClasses}</h3>
              <p className="text-sm text-gray-600">Active this year</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[#E8F0FE] flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#0A66C2]" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Sections</p>
              <h3 className="text-2xl text-gray-900 dark:text-white mb-2">{totalSections}</h3>
              <p className="text-sm text-gray-600">Across all grades</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Students</p>
              <h3 className="text-2xl text-gray-900 dark:text-white mb-2">{totalStudents}</h3>
              <p className="text-sm text-gray-600">Enrolled students</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Capacity</p>
              <h3 className="text-2xl text-gray-900 dark:text-white mb-2">{totalCapacity}</h3>
              <p className="text-sm text-green-600">{totalCapacity - totalStudents} seats available</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Classes Table */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search classes..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                <TableHead>Class</TableHead>
                <TableHead>Sections</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((classData) => {
                const occupancy = (classData.totalStudents / classData.totalCapacity) * 100;
                return (
                  <TableRow key={classData.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell>
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">{classData.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Academic Year: {classData.academicYear}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {classData.sections.map(section => (
                          <Badge key={section.id} variant="outline" className="text-xs">
                            {section.name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-900 dark:text-white">
                      {classData.totalStudents}
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">
                      {classData.totalCapacity}
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">
                      {classData.subjects.length} subjects
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden max-w-[80px]">
                          <div
                            className={`h-full ${occupancy > 90 ? 'bg-red-500' :
                                occupancy > 75 ? 'bg-orange-500' :
                                  'bg-green-500'
                              }`}
                            style={{ width: `${occupancy}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {occupancy.toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(classData)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Add Class Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Add New Class</DialogTitle>
            <DialogDescription>Create a new class with sections and subjects</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Basic Info</TabsTrigger>
              <TabsTrigger value="sections">Sections</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 pr-4">
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="className">Class Name</Label>
                    <Input
                      id="className"
                      placeholder="e.g., Grade 10"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade Level</Label>
                    <Select value={gradeLevel} onValueChange={setGradeLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                          <SelectItem key={grade} value={grade.toString()}>
                            Grade {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Input id="academicYear" value="2024-2025" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="classType">Class Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="honors">Honors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sections" className="space-y-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Configure sections for this class
                  </p>
                  <Button onClick={handleAddSection} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </div>

                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <Card key={section.id} className="p-4">
                      <div className="grid grid-cols-5 gap-3">
                        <div className="space-y-2">
                          <Label>Section Name</Label>
                          <Input
                            value={section.name}
                            onChange={(e) => handleUpdateSection(section.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Capacity</Label>
                          <Input
                            type="number"
                            value={section.capacity}
                            onChange={(e) => handleUpdateSection(section.id, 'capacity', parseInt(e.target.value))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Room Number</Label>
                          <Input
                            placeholder="e.g., 201"
                            value={section.room}
                            onChange={(e) => handleUpdateSection(section.id, 'room', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2 col-span-2">
                          <Label>Class Teacher</Label>
                          <div className="flex gap-2">
                            <Select onValueChange={(value) => handleUpdateSection(section.id, 'classTeacher', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Assign teacher" />
                              </SelectTrigger>
                              <SelectContent>
                                {availableTeachers.map(teacher => (
                                  <SelectItem key={teacher.id} value={teacher.name}>
                                    {teacher.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {sections.length > 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveSection(section.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="subjects" className="space-y-4 mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Select subjects to be taught in this class
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {allSubjects.map(subject => (
                    <Card
                      key={subject.id}
                      className={`p-4 cursor-pointer transition-all ${selectedSubjects.includes(subject.id)
                          ? 'border-[#0A66C2] bg-[#E8F0FE] dark:bg-[#0A66C2]/10'
                          : ''
                        }`}
                      onClick={() => handleSubjectToggle(subject.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedSubjects.includes(subject.id)}
                          onCheckedChange={() => handleSubjectToggle(subject.id)}
                        />
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white mb-1">
                            {subject.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Code: {subject.code}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>

          <Separator className="my-4" />

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            {activeTab === 'subjects' ? (
              <Button
                className="bg-[#0A66C2] hover:bg-[#0052A3]"
                onClick={handleSubmitClass}
              >
                Create Class
              </Button>
            ) : (
              <Button
                className="bg-[#0A66C2] hover:bg-[#0052A3]"
                onClick={() => {
                  if (activeTab === 'overview') setActiveTab('sections');
                  else if (activeTab === 'sections') setActiveTab('subjects');
                }}
              >
                Next Step
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Class Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{selectedClass?.name} - Details</DialogTitle>
            <DialogDescription>Complete overview of class structure and subjects</DialogDescription>
          </DialogHeader>

          {selectedClass && (
            <ScrollArea className="flex-1">
              <div className="space-y-6 pr-4">
                {/* Overview Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <Card className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sections</p>
                    <p className="text-2xl text-gray-900 dark:text-white">
                      {selectedClass.sections.length}
                    </p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Students</p>
                    <p className="text-2xl text-gray-900 dark:text-white">
                      {selectedClass.totalStudents}
                    </p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Subjects</p>
                    <p className="text-2xl text-gray-900 dark:text-white">
                      {selectedClass.subjects.length}
                    </p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Occupancy</p>
                    <p className="text-2xl text-gray-900 dark:text-white">
                      {((selectedClass.totalStudents / selectedClass.totalCapacity) * 100).toFixed(0)}%
                    </p>
                  </Card>
                </div>

                {/* Sections Detail */}
                <div>
                  <h3 className="text-lg text-gray-900 dark:text-white mb-3">Sections</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedClass.sections.map(section => (
                      <Card key={section.id} className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-gray-900 dark:text-white mb-1">
                              Section {section.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Room: {section.room || 'Not assigned'}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {section.enrolled}/{section.capacity}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Class Teacher</span>
                            <span className="text-gray-900 dark:text-white">
                              {section.classTeacher || 'Not assigned'}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#0A66C2]"
                              style={{ width: `${(section.enrolled / section.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Subjects Detail */}
                <div>
                  <h3 className="text-lg text-gray-900 dark:text-white mb-3">Subject Mapping</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50 dark:bg-gray-800">
                          <TableHead>Subject</TableHead>
                          <TableHead>Code</TableHead>
                          <TableHead>Assigned Teacher</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedClass.subjects.map(subject => (
                          <TableRow key={subject.id}>
                            <TableCell className="text-gray-900 dark:text-white">
                              {subject.name}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{subject.code}</Badge>
                            </TableCell>
                            <TableCell className="text-gray-700 dark:text-gray-300">
                              {subject.teacher || 'Not assigned'}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Assign Teacher
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
