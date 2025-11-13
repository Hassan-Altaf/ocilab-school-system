import { useState } from 'react';
import { ArrowLeft, Calendar, Users, Book, GraduationCap, Edit, Clipboard, Send, Download, Bell, Archive, Trash2, MoreVertical, Clock, MapPin, User } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Progress } from '../../ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';
import { Exam } from '../Examinations';

interface ExamDetailsProps {
  exam: Exam | null;
  onBack: () => void;
  onEnterMarks: (exam: Exam) => void;
  onPublishResults: (exam: Exam) => void;
  onViewReport: (exam: Exam) => void;
}

const timetableData = [
  { id: 1, date: '2024-11-15', time: '09:00 AM - 11:00 AM', subject: 'Mathematics', class: '10-A', room: 'Room 101', invigilator: 'Dr. Smith' },
  { id: 2, date: '2024-11-15', time: '09:00 AM - 11:00 AM', subject: 'Mathematics', class: '10-B', room: 'Room 102', invigilator: 'Prof. Johnson' },
  { id: 3, date: '2024-11-16', time: '09:00 AM - 11:00 AM', subject: 'Physics', class: '10-A', room: 'Lab 201', invigilator: 'Dr. Williams' },
  { id: 4, date: '2024-11-16', time: '09:00 AM - 11:00 AM', subject: 'Physics', class: '10-B', room: 'Lab 202', invigilator: 'Dr. Brown' },
  { id: 5, date: '2024-11-17', time: '09:00 AM - 11:00 AM', subject: 'Chemistry', class: '10-A', room: 'Lab 301', invigilator: 'Prof. Davis' },
  { id: 6, date: '2024-11-17', time: '09:00 AM - 11:00 AM', subject: 'Chemistry', class: '10-B', room: 'Lab 302', invigilator: 'Dr. Wilson' }
];

export function ExamDetails({ exam, onBack, onEnterMarks, onPublishResults, onViewReport }: ExamDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!exam) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 dark:text-gray-400">No exam selected</p>
      </div>
    );
  }

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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-[32px] text-gray-900 dark:text-white tracking-tight">
                {exam.name}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Dashboard &gt; Examinations &gt; {exam.name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={getStatusColor(exam.status)}>
              {exam.status}
            </Badge>
            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Exam
            </Button>
            <Button 
              className="bg-[#2563EB] hover:bg-[#1d4ed8] gap-2"
              onClick={() => onEnterMarks(exam)}
            >
              <Clipboard className="w-4 h-4" />
              Enter Marks
            </Button>
            <Button 
              className="bg-[#10B981] hover:bg-[#059669] gap-2"
              onClick={() => onPublishResults(exam)}
            >
              <Send className="w-4 h-4" />
              Publish Results
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onViewReport(exam)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="w-4 h-4 mr-2" />
                  Send Notification
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive className="w-4 h-4 mr-2" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Info Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Duration</p>
              <p className="text-sm text-gray-900 dark:text-white">
                {new Date(exam.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                {' - '}
                {new Date(exam.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Classes</p>
              <p className="text-sm text-gray-900 dark:text-white">{exam.classes.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Book className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Subjects</p>
              <p className="text-sm text-gray-900 dark:text-white">{exam.subjects.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Students</p>
              <p className="text-sm text-gray-900 dark:text-white">{exam.totalStudents}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white dark:bg-gray-900 p-1 shadow-sm rounded-xl border border-gray-200 dark:border-gray-800">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white rounded-lg"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="timetable" 
            className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white rounded-lg"
          >
            Timetable
          </TabsTrigger>
          <TabsTrigger 
            value="marks" 
            className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white rounded-lg"
          >
            Marks Entry
          </TabsTrigger>
          <TabsTrigger 
            value="results" 
            className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white rounded-lg"
          >
            Results
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-[#2563EB] data-[state=active]:text-white rounded-lg"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Exam Information */}
              <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
                <h3 className="text-xl text-gray-900 dark:text-white mb-4 tracking-tight">
                  Exam Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Exam Type</span>
                    <span className="text-sm text-gray-900 dark:text-white">{exam.type}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Academic Year</span>
                    <span className="text-sm text-gray-900 dark:text-white">{exam.academicYear}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Date Range</span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {new Date(exam.startDate).toLocaleDateString()} - {new Date(exam.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  {exam.description && (
                    <div className="py-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">Description</span>
                      <p className="text-sm text-gray-900 dark:text-white">{exam.description}</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Classes & Sections */}
              <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
                <h3 className="text-xl text-gray-900 dark:text-white mb-4 tracking-tight">
                  Classes & Sections
                </h3>
                <div className="space-y-4">
                  {exam.classes.map((cls) => (
                    <div key={cls} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm text-gray-900 dark:text-white">
                          Class {cls}
                        </h4>
                        <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                          {Math.floor(exam.totalStudents / exam.classes.length)} students
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exam.subjects.slice(0, 3).map((subject) => (
                          <Badge key={subject} variant="outline" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {exam.subjects.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{exam.subjects.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Exam Status */}
              <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
                <h3 className="text-xl text-gray-900 dark:text-white mb-4 tracking-tight">
                  Exam Status
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Timetable</span>
                      <span className="text-sm text-gray-900 dark:text-white">100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Marks Entry</span>
                      <span className="text-sm text-gray-900 dark:text-white">{exam.marksEntryProgress}%</span>
                    </div>
                    <Progress value={exam.marksEntryProgress} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Results Published</span>
                      <span className="text-sm text-gray-900 dark:text-white">{exam.resultsPublished}%</span>
                    </div>
                    <Progress value={exam.resultsPublished} className="h-2" />
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
                <h3 className="text-xl text-gray-900 dark:text-white mb-4 tracking-tight">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => onEnterMarks(exam)}
                  >
                    <Clipboard className="w-4 h-4" />
                    Enter Marks
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => onViewReport(exam)}
                  >
                    <Download className="w-4 h-4" />
                    Download Reports
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => onPublishResults(exam)}
                  >
                    <Send className="w-4 h-4" />
                    Publish Results
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Bell className="w-4 h-4" />
                    Send Notifications
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Timetable Tab */}
        <TabsContent value="timetable" className="mt-6">
          <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-gray-900 dark:text-white tracking-tight">
                Examination Timetable
              </h3>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Print Timetable
              </Button>
            </div>

            <div className="space-y-4">
              {timetableData.map((slot) => (
                <div key={slot.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-sm text-gray-900 dark:text-white">
                          {slot.subject}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          Class {slot.class}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {slot.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {slot.room}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {slot.invigilator}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Other tabs placeholders */}
        <TabsContent value="marks" className="mt-6">
          <Card className="p-12 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Marks entry interface
            </p>
            <Button 
              onClick={() => onEnterMarks(exam)}
              className="bg-[#2563EB] hover:bg-[#1d4ed8]"
            >
              Go to Marks Entry
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          <Card className="p-12 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl text-center">
            <p className="text-gray-500 dark:text-gray-400">Results management interface</p>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card className="p-12 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl text-center">
            <p className="text-gray-500 dark:text-gray-400">Analytics and reports interface</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
