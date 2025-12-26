import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, Users, Book, Filter, ChevronLeft, ChevronRight, Plus, MoreVertical, Eye, AlertCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Exam } from '../Examinations';
import { adminService } from '../../../services';
import { Examination } from '../../../types/examination.types';
import { toast } from 'sonner';

interface ExaminationDashboardProps {
  onCreateExam: () => void;
  onViewExam: (exam: Exam) => void;
  onViewList: () => void;
  onViewAnalytics: () => void;
}

// Helper function to convert Examination to Exam
function convertExaminationToExam(examination: Examination): Exam {
  return {
    id: examination.id,
    name: examination.examName,
    type: examination.examType,
    academicYear: examination.academicYearName || examination.academicYearId,
    startDate: examination.startDate || '',
    endDate: examination.endDate || '',
    classes: examination.examClasses?.map(ec => ec.className || ec.classId) || [],
    subjects: examination.examSubjects?.map(es => es.subjectName || es.subjectId) || [],
    status: examination.status === 'SCHEDULED' ? 'Scheduled' : 
            examination.status === 'ONGOING' ? 'Ongoing' :
            examination.status === 'COMPLETED' ? 'Completed' : 'Archived',
    totalStudents: 0, // This would need to be calculated from examClasses
    marksEntryProgress: 0, // This would need to be fetched separately
    resultsPublished: 0, // This would need to be fetched separately
  };
}

export function ExaminationDashboard({ onCreateExam, onViewExam, onViewList, onViewAnalytics }: ExaminationDashboardProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [upcomingExams, setUpcomingExams] = useState<Exam[]>([]);
  const [ongoingExams, setOngoingExams] = useState<Exam[]>([]);
  const [completedExams, setCompletedExams] = useState<Exam[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<Array<{ date: number; title: string; type: string }>>([]);
  const [recentActivities, setRecentActivities] = useState<Array<{ id: number; title: string; time: string; icon: any; color: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [currentMonth, currentYear]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch upcoming, ongoing, and completed exams
      const [upcoming, ongoing, completed, calendar, activities] = await Promise.all([
        adminService.getUpcomingExams(),
        adminService.getOngoingExams(),
        adminService.getCompletedExams(),
        adminService.getExamCalendar(currentMonth + 1, currentYear),
        adminService.getExamActivities(4),
      ]);

      setUpcomingExams(upcoming.examinations.map(convertExaminationToExam));
      setOngoingExams(ongoing.examinations.map(convertExaminationToExam));
      setCompletedExams(completed.examinations.map(convertExaminationToExam));

      // Process calendar events
      if (calendar && Array.isArray(calendar.events)) {
        const events = calendar.events.map((event: any) => ({
          date: new Date(event.date).getDate(),
          title: event.title || event.examName || '',
          type: event.type || 'upcoming',
        }));
        setCalendarEvents(events);
      }

      // Process activities
      if (activities && Array.isArray(activities)) {
        const mappedActivities = activities.map((activity: any, index: number) => ({
          id: index + 1,
          title: activity.description || activity.title || 'Exam activity',
          time: activity.createdAt ? formatTimeAgo(activity.createdAt) : 'Recently',
          icon: Book,
          color: 'text-blue-600',
        }));
        setRecentActivities(mappedActivities);
      }
    } catch (error: any) {
      console.error('Error fetching examination dashboard data:', error);
      toast.error('Failed to load examination data');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  const hasEvent = (day: number) => {
    return calendarEvents.find(e => e.date === day);
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const today = new Date();
  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-[32px] text-gray-900 dark:text-white tracking-tight">
              Examination Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Dashboard &gt; Examinations
            </p>
          </div>
          <Button 
            onClick={onCreateExam}
            className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-sm"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Create New Exam
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium uppercase tracking-wide">
                Upcoming Exams
              </p>
              <h3 className="text-3xl text-gray-900 dark:text-white tracking-tight">
                {isLoading ? '...' : upcomingExams.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#2563EB]" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium uppercase tracking-wide">
                Ongoing Exams
              </p>
              <h3 className="text-3xl text-gray-900 dark:text-white tracking-tight">
                {isLoading ? '...' : ongoingExams.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#10B981]" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium uppercase tracking-wide">
                Completed Exams
              </p>
              <h3 className="text-3xl text-gray-900 dark:text-white tracking-tight">
                {isLoading ? '...' : completedExams.length}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 font-medium uppercase tracking-wide">
                Total Students
              </p>
              <h3 className="text-3xl text-gray-900 dark:text-white tracking-tight">
                1,234
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content - Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Calendar */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl text-gray-900 dark:text-white tracking-tight">
                Exam Schedule
              </h3>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            {/* Calendar Navigation */}
            <div className="flex items-center justify-between mb-6">
              <Button variant="ghost" size="sm" onClick={handlePreviousMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h4 className="text-lg text-gray-900 dark:text-white">
                {monthName} {currentYear}
              </h4>
              <Button variant="ghost" size="sm" onClick={handleNextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Weekday Headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center py-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {day}
                  </span>
                </div>
              ))}

              {/* Empty cells for first week */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Calendar days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const event = hasEvent(day);
                const isTodayDate = isToday(day);

                return (
                  <div
                    key={day}
                    className={`
                      aspect-square rounded-lg flex flex-col items-center justify-center text-sm cursor-pointer
                      transition-all duration-200
                      ${isTodayDate ? 'bg-[#2563EB] text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                      ${event && !isTodayDate ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' : ''}
                    `}
                  >
                    <span className={isTodayDate ? 'text-white' : 'text-gray-900 dark:text-white'}>
                      {day}
                    </span>
                    {event && (
                      <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                        event.type === 'ongoing' ? 'bg-green-500' :
                        event.type === 'upcoming' ? 'bg-blue-500' : 'bg-gray-400'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="flex items-center gap-4 mt-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-gray-600 dark:text-gray-400">Upcoming</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-600 dark:text-gray-400">Ongoing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">Completed</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Upcoming Exams List */}
        <div>
          <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
            <h3 className="text-xl text-gray-900 dark:text-white mb-4 tracking-tight">
              Upcoming Exams
            </h3>

            <div className="space-y-3">
              {isLoading ? (
                <div className="text-center py-8 text-gray-500">Loading...</div>
              ) : upcomingExams.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No upcoming exams</div>
              ) : (
                upcomingExams.slice(0, 5).map((exam, index) => (
                <div
                  key={exam.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                    index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900'
                  }`}
                  onClick={() => onViewExam(exam)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Book className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm text-gray-900 dark:text-white mb-1">
                        {exam.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {exam.classes.join(', ')}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(exam.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">
                      {exam.status}
                    </Badge>
                  </div>
                </div>
                ))
              )}
            </div>

            <Button 
              variant="ghost" 
              className="w-full mt-4 text-[#2563EB] hover:text-[#1d4ed8] hover:bg-blue-50"
              onClick={onViewList}
            >
              View All
            </Button>
          </Card>
        </div>
      </div>

      {/* Recent Activities */}
      <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
        <h3 className="text-xl text-gray-900 dark:text-white mb-6 tracking-tight">
          Recent Activities
        </h3>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading activities...</div>
          ) : recentActivities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No recent activities</div>
          ) : (
            recentActivities.map((activity, index) => (
            <div key={activity.id} className="flex items-start gap-4 relative">
              {/* Timeline connector */}
              {index < recentActivities.length - 1 && (
                <div className="absolute left-5 top-10 w-0.5 h-full bg-gray-200 dark:bg-gray-800" />
              )}
              
              <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                activity.color.includes('blue') ? 'bg-blue-100 dark:bg-blue-900/20' :
                activity.color.includes('green') ? 'bg-green-100 dark:bg-green-900/20' :
                activity.color.includes('amber') ? 'bg-amber-100 dark:bg-amber-900/20' :
                'bg-purple-100 dark:bg-purple-900/20'
              }`}>
                <activity.icon className={`w-5 h-5 ${activity.color}`} />
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white mb-1">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
