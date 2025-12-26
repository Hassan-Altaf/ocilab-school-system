import { useState, useEffect } from 'react';
import { Calendar, Users, FileText, CheckCircle, Clock } from 'lucide-react';
import { StatCard } from '../dashboard/StatCard';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { teacherService } from '../../services';
import { toast } from 'sonner@2.0.3';
import { ApiException, getUserFriendlyError } from '../../utils/errors';
import { useNavigate } from 'react-router-dom';
import { isTeacher } from '../../utils/role-check';

export function TeacherDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>({ performance: {}, workload: {}, upcomingSchedule: [], upcomingExams: [] });
  const [upcomingSchedule, setUpcomingSchedule] = useState<any[]>([]);
  const [recentAssignments, setRecentAssignments] = useState<any[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if user is a teacher before loading data
    const checkAndLoad = async () => {
      const teacherCheck = isTeacher();
      if (!teacherCheck) {
        toast.error('Access denied: Teacher role required. Please login as a teacher.');
        // Don't redirect immediately - let user see the error
        // Just set loading to false so UI renders
        setLoading(false);
        setHasError(true);
        const schoolId = sessionStorage.getItem('school_uuid');
        // Redirect after a delay
        setTimeout(() => {
          if (schoolId) {
            navigate(`/admin/school/${schoolId}/dashboard`);
          } else {
            navigate('/admin/login');
          }
        }, 2000);
        return;
      }
      await loadDashboardData();
    };
    
    checkAndLoad();
  }, [navigate]);

  const loadDashboardData = async () => {
    let timeoutId: NodeJS.Timeout | null = null;
    try {
      setLoading(true);
      setHasError(false);
      
      // Set a timeout to ensure loading doesn't get stuck
      timeoutId = setTimeout(() => {
        console.warn('Dashboard loading timeout - showing UI anyway');
        setLoading(false);
        setHasError(true);
      }, 10000); // 10 second timeout

      const [dashboardRes, scheduleRes, assignmentsRes] = await Promise.allSettled([
        teacherService.getDashboard(),
        teacherService.getWeeklySchedule(),
        teacherService.getAssignments({ page: 1, limit: 3 })
      ]);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Handle dashboard response
      if (dashboardRes.status === 'fulfilled') {
        setDashboardData(dashboardRes.value.data || { performance: {}, workload: {}, upcomingSchedule: [], upcomingExams: [] });
        setUpcomingSchedule(dashboardRes.value.data?.upcomingSchedule || []);
        setHasError(false);
      } else {
        console.error('Dashboard API failed:', dashboardRes.reason);
        // Keep existing data or set empty data
        setDashboardData(prev => prev || { performance: {}, workload: {}, upcomingSchedule: [], upcomingExams: [] });
        setHasError(true);
      }

      // Handle schedule response
      if (scheduleRes.status === 'fulfilled') {
        const scheduleData = scheduleRes.value.data?.schedule || [];
        if (scheduleData.length > 0 && scheduleData[0]?.periods) {
          setUpcomingSchedule(prev => [...prev, ...scheduleData[0].periods]);
        }
      } else {
        console.error('Schedule API failed:', scheduleRes.reason);
      }

      // Handle assignments response
      if (assignmentsRes.status === 'fulfilled') {
        setRecentAssignments(assignmentsRes.value.data?.assignments || []);
      } else {
        console.error('Assignments API failed:', assignmentsRes.reason);
        setRecentAssignments([]);
      }

      // Show error only if all APIs failed
      const allFailed = dashboardRes.status === 'rejected' && scheduleRes.status === 'rejected' && assignmentsRes.status === 'rejected';
      if (allFailed) {
        const firstError = dashboardRes.status === 'rejected' ? dashboardRes.reason : 
                          scheduleRes.status === 'rejected' ? scheduleRes.reason : 
                          assignmentsRes.reason;
        
        if (firstError instanceof ApiException && firstError.statusCode === 403) {
          const errorMessage = getUserFriendlyError(firstError);
          toast.error(errorMessage, {
            description: 'Please logout and login again as a teacher to access this page.',
            duration: 5000,
          });
          
          if (errorMessage.toLowerCase().includes('teacher') || errorMessage.toLowerCase().includes('role')) {
            setTimeout(() => {
              navigate('/admin/login');
            }, 3000);
          }
        } else {
          toast.error('Unable to load dashboard data. Some features may not be available.');
        }
      }
    } catch (error: any) {
      console.error('Unexpected error loading dashboard:', error);
      // Ensure we always have data to render
      setDashboardData(prev => prev || { performance: {}, workload: {}, upcomingSchedule: [], upcomingExams: [] });
      setHasError(true);
      toast.error('Failed to load dashboard data. Showing cached or empty data.');
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setLoading(false);
    }
  };

  // Ensure we always have data to render
  const safeDashboardData = dashboardData || { performance: {}, workload: {}, upcomingSchedule: [], upcomingExams: [] };
  const performance = safeDashboardData?.performance || {};
  const workload = safeDashboardData?.workload || {};

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // Show access denied message if not a teacher
  if (!isTeacher() && hasError) {
    return (
      <div className="space-y-6 p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h2 className="text-xl text-red-900 dark:text-red-200 mb-2">Access Denied</h2>
          <p className="text-red-700 dark:text-red-300">
            Teacher role required. Please login as a teacher to access this dashboard.
          </p>
          <Button 
            onClick={() => navigate('/admin/login')} 
            className="mt-4 bg-red-600 hover:bg-red-700 text-white"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const nextClass = upcomingSchedule[0];
  const nextClassTime = nextClass ? new Date(`2000-01-01T${nextClass.startTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : 'N/A';

  return (
    <div className="space-y-6">
      {hasError && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ Some data could not be loaded. Please check your connection or try refreshing the page.
          </p>
        </div>
      )}
      <div>
        <h1 className="text-2xl text-gray-900 dark:text-white mb-2">Welcome back!</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your teaching schedule and updates for today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Classes Today"
          value={upcomingSchedule.length.toString()}
          change={nextClass ? `Next at ${nextClassTime}` : 'No classes'}
          changeType="neutral"
          icon={Calendar}
          iconColor="text-[#0A66C2]"
          iconBg="bg-[#E8F0FE]"
        />
        <StatCard
          title="Total Students"
          value={performance.totalStudents?.toString() || '0'}
          change={`Across ${performance.totalClasses || 0} classes`}
          changeType="neutral"
          icon={Users}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          title="Pending Assignments"
          value={workload.pendingGrading?.toString() || '0'}
          change="To be graded"
          changeType="neutral"
          icon={FileText}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatCard
          title="Avg Attendance"
          value={`${performance.avgAttendance || 0}%`}
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
            {upcomingSchedule.length > 0 ? (
              upcomingSchedule.slice(0, 3).map((classItem: any) => {
                const startTime = new Date(`2000-01-01T${classItem.startTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                return (
                  <div key={classItem.id} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A66C2] to-[#0052A3] flex items-center justify-center text-white flex-shrink-0">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h4 className="text-sm text-gray-900 dark:text-white">{classItem.subject || 'Subject'}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{classItem.className || classItem.class} {classItem.sectionName ? `• ${classItem.sectionName}` : ''} {classItem.room ? `• ${classItem.room}` : ''}</p>
                        </div>
                        <Badge variant="outline" className="bg-[#E8F0FE] text-[#0A66C2] border-[#0A66C2]">
                          {startTime}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No classes scheduled for today</p>
            )}
          </div>
          <Button className="w-full mt-4" variant="outline">View Full Schedule</Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Recent Assignments</h3>
          <div className="space-y-4">
            {recentAssignments.length > 0 ? (
              recentAssignments.map((assignment: any) => (
                <div key={assignment.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white">{assignment.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{assignment.className || assignment.class}</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {assignment.submittedCount || 0}/{assignment.totalStudents || 0}
                    </p>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${assignment.totalStudents ? ((assignment.submittedCount || 0) / assignment.totalStudents) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No recent assignments</p>
            )}
          </div>
          <Button className="w-full mt-4 bg-[#0A66C2] hover:bg-[#0052A3]">View All Assignments</Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Upcoming Exams</h3>
          <div className="space-y-3">
            {safeDashboardData?.upcomingExams && safeDashboardData.upcomingExams.length > 0 ? (
              safeDashboardData.upcomingExams.slice(0, 3).map((exam: any) => (
                <div key={exam.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm text-gray-900 dark:text-white mb-1">{exam.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{exam.subject} • {exam.className}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {new Date(exam.date).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No upcoming exams</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg text-gray-900 dark:text-white mb-4">Workload Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Pending Grading</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Assignments to be graded</p>
              </div>
              <span className="text-2xl text-orange-600 dark:text-orange-400">{workload.pendingGrading || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <div>
                <p className="text-sm text-gray-900 dark:text-white">Upcoming Exams</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Exams to prepare</p>
              </div>
              <span className="text-2xl text-blue-600 dark:text-blue-400">{workload.upcomingExams || 0}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
