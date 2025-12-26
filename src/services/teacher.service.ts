/**
 * Teacher Service
 * Handles all teacher-related API calls
 */

import { apiClient } from './api.client';
import { API_ENDPOINTS, getApiUrl } from '../config/api.config';
import { ApiResponse } from '../types/api.types';
import { tokenStorage } from '../utils/storage';

// ==================== Types ====================

export interface TeacherProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  teacher: {
    employeeId: string;
    employmentStatus: string;
    experienceYears: number;
    qualification: string;
    specialization: string;
  };
  preferredLocale?: string;
  timezone?: string;
  dateOfBirth?: string;
}

export interface UpdateTeacherProfileRequest {
  address?: string;
  phone?: string;
  preferredLocale?: string;
  timezone?: string;
  experienceYears?: number;
  specialization?: string;
  dateOfBirth?: string;
}

export interface TeacherDashboard {
  performance: {
    totalClasses?: number;
    totalStudents?: number;
    avgAttendance?: number;
    avgGrade?: number;
  };
  workload: {
    pendingAssignments?: number;
    pendingGrading?: number;
    upcomingExams?: number;
  };
  upcomingSchedule: Array<{
    id: string;
    subject: string;
    className: string;
    sectionName?: string;
    startTime: string;
    endTime: string;
    room?: string;
  }>;
  upcomingExams: Array<{
    id: string;
    name: string;
    subject: string;
    date: string;
    className: string;
  }>;
}

export interface WeeklySchedule {
  schedule: Array<{
    dayOfWeek: number;
    periods: Array<{
      id: string;
      subject: string;
      className: string;
      sectionName?: string;
      startTime: string;
      endTime: string;
      room?: string;
    }>;
  }>;
  weekStart: string;
  weekEnd: string;
}

export interface Assignment {
  id: string;
  title: string;
  description?: string;
  classId: string;
  className?: string;
  sectionId?: string;
  sectionName?: string;
  subjectId: string;
  subjectName?: string;
  dueDate: string;
  totalMarks: number;
  createdAt: string;
  submissions?: AssignmentSubmission[];
  submittedCount?: number;
  totalStudents?: number;
  gradedCount?: number;
}

export interface AssignmentSubmission {
  id: string;
  studentId: string;
  studentName?: string;
  rollNumber?: string;
  submittedAt?: string;
  marksObtained?: number;
  status: 'SUBMITTED' | 'GRADED' | 'LATE';
  feedback?: string;
}

export interface GetAssignmentsRequest {
  classId?: string;
  sectionId?: string;
  subjectId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface AssignmentsResponse {
  assignments: Assignment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface AssignmentStatistics {
  totalAssignments: number;
  pendingGrading: number;
  graded: number;
  totalSubmissions: number;
}

export interface CreateAssignmentRequest {
  classId: string;
  sectionId?: string;
  subjectId: string;
  title: string;
  description?: string;
  dueDate?: string;
  totalMarks: number;
}

export interface UpdateAssignmentRequest {
  classId?: string;
  sectionId?: string;
  subjectId?: string;
  title?: string;
  description?: string;
  dueDate?: string;
  totalMarks?: number;
}

export interface GradeAssignmentRequest {
  entries: Array<{
    studentId: string;
    marksObtained: number;
    status: 'SUBMITTED' | 'GRADED' | 'LATE';
    submittedAt?: string;
    feedback?: string;
  }>;
}

export interface GradeAssignmentResponse {
  message: string;
  gradedCount: number;
}

export interface TeacherClass {
  classId: string;
  className: string;
  sections: Array<{
    sectionId: string;
    sectionName: string;
  }>;
  subjects: Array<{
    subjectId: string;
    subjectName: string;
  }>;
}

export interface TeacherClassesResponse {
  classes: TeacherClass[];
}

export interface ClassStudent {
  id: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  guardians?: Array<{
    id: string;
    name: string;
    relationship: string;
    phone?: string;
    email?: string;
  }>;
}

export interface ClassRosterResponse {
  students: ClassStudent[];
}

export interface Timetable {
  timetable: Array<{
    dayOfWeek: number;
    periods: Array<{
      id: string;
      subject: string;
      className: string;
      sectionName?: string;
      startTime: string;
      endTime: string;
      room?: string;
    }>;
  }>;
}

export interface AuxiliarySnapshot {
  transport: {
    totalStudents?: number;
    routes?: number;
  };
  hostel: {
    totalStudents?: number;
    rooms?: number;
  };
  fees: {
    totalStudents?: number;
    pendingFees?: number;
  };
}

export interface ExamSchedule {
  exams: Array<{
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    subjects: Array<{
      subjectId: string;
      subjectName: string;
      examDate?: string;
      startTime?: string;
      endTime?: string;
    }>;
  }>;
}

export interface ExamStudentsResponse {
  students: Array<{
    id: string;
    firstName: string;
    lastName: string;
    rollNumber: string;
  }>;
}

export interface ExamMarks {
  examId: string;
  subjectId: string;
  marks: Array<{
    studentId: string;
    obtainedMarks: number;
    totalMarks: number;
    percentage: number;
  }>;
}

export interface SubmitExamMarksRequest {
  entries: Array<{
    studentId: string;
    obtainedMarks: number;
    totalMarks?: number;
    percentage?: number;
    status?: 'PASSED' | 'FAILED' | 'ABSENT' | 'PENDING';
  }>;
}

export interface SubmitExamMarksResponse {
  message: string;
  submittedCount: number;
}

export interface Message {
  id: string;
  subject?: string;
  content: string;
  sender?: {
    id: string;
    name: string;
    type: string;
  };
  recipient?: {
    id: string;
    name: string;
    type: string;
  };
  status: 'READ' | 'UNREAD';
  createdAt: string;
  readAt?: string;
  attachments?: Array<{
    id: string;
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
  }>;
}

export interface MessagesResponse {
  messages: Message[];
}

export interface SendMessageRequest {
  recipientUserId: string;
  subject?: string;
  content: string;
  priority?: 'HIGH' | 'NORMAL' | 'LOW';
  attachments?: Array<{
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
  }>;
}

export interface CreateAnnouncementRequest {
  title: string;
  content: string;
  category: 'GENERAL' | 'EXAM' | 'FEE' | 'HOLIDAY' | 'EVENT' | 'OTHER';
  priority?: 'HIGH' | 'NORMAL' | 'LOW';
  targetAudience: 'STUDENTS' | 'PARENTS' | 'STUDENTS_AND_PARENTS' | 'ALL';
  status?: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED';
  scheduledAt?: string;
  targets?: Array<{
    classId: string;
    sectionId?: string;
  }>;
}

export interface AnnouncementResponse {
  id: string;
  title: string;
  message: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName?: string;
  rollNumber?: string;
  attendanceDate: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY' | 'EXCUSED';
  remarks?: string;
}

export interface GetAttendanceRequest {
  classId: string;
  sectionId: string;
  attendanceDate?: string;
  studentId?: string;
}

export interface AttendanceResponse {
  attendance: AttendanceRecord[];
}

export interface AttendanceStudent {
  id: string;
  firstName: string;
  lastName: string;
  rollNumber: string;
  defaultStatus: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY' | 'EXCUSED';
}

export interface AttendanceStudentsResponse {
  students: AttendanceStudent[];
  defaultDate: string;
}

export interface MarkAttendanceRequest {
  classId: string;
  sectionId?: string;
  attendanceDate?: string;
  allowOverride?: boolean;
  entries: Array<{
    studentId: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY' | 'EXCUSED';
    remarks?: string;
  }>;
}

export interface MarkAttendanceResponse {
  message: string;
  markedCount: number;
  attendanceDate: string;
}

export interface UpdateAttendanceRequest {
  status?: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY' | 'EXCUSED';
  attendanceDate?: string;
  remarks?: string;
}

// ==================== Service ====================

class TeacherService {
  // ==================== Profile & Dashboard ====================

  /**
   * Get teacher profile
   */
  async getProfile(): Promise<ApiResponse<TeacherProfile>> {
    return apiClient.get<TeacherProfile>(API_ENDPOINTS.teacher.profile);
  }

  /**
   * Update teacher profile
   */
  async updateProfile(data: UpdateTeacherProfileRequest): Promise<ApiResponse<TeacherProfile>> {
    return apiClient.patch<TeacherProfile>(API_ENDPOINTS.teacher.profile, data);
  }

  /**
   * Get teacher dashboard
   */
  async getDashboard(): Promise<ApiResponse<TeacherDashboard>> {
    return apiClient.get<TeacherDashboard>(API_ENDPOINTS.teacher.dashboard);
  }

  /**
   * Get weekly schedule
   */
  async getWeeklySchedule(): Promise<ApiResponse<WeeklySchedule>> {
    return apiClient.get<WeeklySchedule>(API_ENDPOINTS.teacher.schedule.weekly);
  }

  // ==================== Assignments ====================

  /**
   * List assignments with filters
   */
  async getAssignments(params?: GetAssignmentsRequest): Promise<ApiResponse<AssignmentsResponse>> {
    const queryParams = new URLSearchParams();
    if (params?.classId) queryParams.append('classId', params.classId);
    if (params?.sectionId) queryParams.append('sectionId', params.sectionId);
    if (params?.subjectId) queryParams.append('subjectId', params.subjectId);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const endpoint = `${API_ENDPOINTS.teacher.assignments.base}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiClient.get<AssignmentsResponse>(endpoint);
  }

  /**
   * Get assignment statistics
   */
  async getAssignmentStatistics(): Promise<ApiResponse<AssignmentStatistics>> {
    return apiClient.get<AssignmentStatistics>(API_ENDPOINTS.teacher.assignments.statistics);
  }

  /**
   * Create assignment
   */
  async createAssignment(data: CreateAssignmentRequest): Promise<ApiResponse<Assignment>> {
    return apiClient.post<Assignment>(API_ENDPOINTS.teacher.assignments.base, data);
  }

  /**
   * Get assignment details
   */
  async getAssignmentDetails(id: string): Promise<ApiResponse<Assignment>> {
    return apiClient.get<Assignment>(API_ENDPOINTS.teacher.assignments.getById(id));
  }

  /**
   * Update assignment
   */
  async updateAssignment(id: string, data: UpdateAssignmentRequest): Promise<ApiResponse<Assignment>> {
    return apiClient.patch<Assignment>(API_ENDPOINTS.teacher.assignments.getById(id), data);
  }

  /**
   * Grade assignment submissions
   */
  async gradeAssignment(id: string, data: GradeAssignmentRequest): Promise<ApiResponse<GradeAssignmentResponse>> {
    return apiClient.post<GradeAssignmentResponse>(API_ENDPOINTS.teacher.assignments.grade(id), data);
  }

  /**
   * Download all submissions for an assignment
   */
  async downloadAllSubmissions(id: string): Promise<Blob> {
    const url = getApiUrl(API_ENDPOINTS.teacher.assignments.downloadAll(id));
    const token = tokenStorage.getAccessToken();
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    if (!response.ok) throw new Error('Failed to download submissions');
    return response.blob();
  }

  /**
   * Download student submission
   */
  async downloadStudentSubmission(assignmentId: string, studentId: string): Promise<Blob> {
    const url = getApiUrl(API_ENDPOINTS.teacher.assignments.downloadStudent(assignmentId, studentId));
    const token = tokenStorage.getAccessToken();
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });
    if (!response.ok) throw new Error('Failed to download submission');
    return response.blob();
  }

  // ==================== Classroom ====================

  /**
   * Get assigned classes
   */
  async getAssignedClasses(): Promise<ApiResponse<TeacherClassesResponse>> {
    return apiClient.get<TeacherClassesResponse>(API_ENDPOINTS.teacher.classes.base);
  }

  /**
   * Get class roster
   */
  async getClassRoster(classId: string, sectionId?: string): Promise<ApiResponse<ClassRosterResponse>> {
    const queryParams = sectionId ? `?sectionId=${sectionId}` : '';
    return apiClient.get<ClassRosterResponse>(`${API_ENDPOINTS.teacher.classes.getRoster(classId)}${queryParams}`);
  }

  /**
   * Get timetable
   */
  async getTimetable(dayOfWeek?: number): Promise<ApiResponse<Timetable>> {
    const queryParams = dayOfWeek !== undefined ? `?dayOfWeek=${dayOfWeek}` : '';
    return apiClient.get<Timetable>(`${API_ENDPOINTS.teacher.timetable}${queryParams}`);
  }

  /**
   * Get auxiliary snapshot
   */
  async getAuxiliarySnapshot(classId: string, sectionId?: string): Promise<ApiResponse<AuxiliarySnapshot>> {
    const queryParams = sectionId ? `?sectionId=${sectionId}` : '';
    return apiClient.get<AuxiliarySnapshot>(`${API_ENDPOINTS.teacher.classes.getAuxiliary(classId)}${queryParams}`);
  }

  // ==================== Exams ====================

  /**
   * Get exam schedule
   */
  async getExamSchedule(): Promise<ApiResponse<ExamSchedule>> {
    return apiClient.get<ExamSchedule>(API_ENDPOINTS.teacher.exams.schedule);
  }

  /**
   * Get students for marks entry
   */
  async getExamStudents(classId: string, subjectId: string, sectionId?: string, examId?: string): Promise<ApiResponse<ExamStudentsResponse>> {
    const queryParams = new URLSearchParams();
    queryParams.append('classId', classId);
    queryParams.append('subjectId', subjectId);
    if (sectionId) queryParams.append('sectionId', sectionId);
    if (examId) queryParams.append('examId', examId);

    return apiClient.get<ExamStudentsResponse>(`${API_ENDPOINTS.teacher.exams.students}?${queryParams.toString()}`);
  }

  /**
   * View exam marks
   */
  async viewExamMarks(examId: string, subjectId: string, classId?: string, sectionId?: string): Promise<ApiResponse<ExamMarks>> {
    const queryParams = new URLSearchParams();
    if (classId) queryParams.append('classId', classId);
    if (sectionId) queryParams.append('sectionId', sectionId);

    const endpoint = `${API_ENDPOINTS.teacher.exams.getMarks(examId, subjectId)}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiClient.get<ExamMarks>(endpoint);
  }

  /**
   * Submit exam marks
   */
  async submitExamMarks(examId: string, subjectId: string, data: SubmitExamMarksRequest): Promise<ApiResponse<SubmitExamMarksResponse>> {
    return apiClient.post<SubmitExamMarksResponse>(API_ENDPOINTS.teacher.exams.submitMarks(examId, subjectId), data);
  }

  // ==================== Communication ====================

  /**
   * List messages
   */
  async getMessages(): Promise<ApiResponse<MessagesResponse>> {
    return apiClient.get<MessagesResponse>(API_ENDPOINTS.teacher.communication.messages.base);
  }

  /**
   * Get message details
   */
  async getMessage(id: string): Promise<ApiResponse<Message>> {
    return apiClient.get<Message>(API_ENDPOINTS.teacher.communication.messages.getById(id));
  }

  /**
   * Send message
   */
  async sendMessage(data: SendMessageRequest): Promise<ApiResponse<Message>> {
    return apiClient.post<Message>(API_ENDPOINTS.teacher.communication.messages.base, data);
  }

  /**
   * Create announcement
   */
  async createAnnouncement(data: CreateAnnouncementRequest): Promise<ApiResponse<AnnouncementResponse>> {
    return apiClient.post<AnnouncementResponse>(API_ENDPOINTS.teacher.communication.announcements.base, data);
  }

  // ==================== Attendance ====================

  /**
   * List attendance records
   */
  async getAttendance(params: GetAttendanceRequest): Promise<ApiResponse<AttendanceResponse>> {
    const queryParams = new URLSearchParams();
    queryParams.append('classId', params.classId);
    queryParams.append('sectionId', params.sectionId);
    if (params.attendanceDate) queryParams.append('attendanceDate', params.attendanceDate);
    if (params.studentId) queryParams.append('studentId', params.studentId);

    return apiClient.get<AttendanceResponse>(`${API_ENDPOINTS.teacher.attendance.base}?${queryParams.toString()}`);
  }

  /**
   * Get students for attendance
   */
  async getAttendanceStudents(classId: string, sectionId?: string): Promise<ApiResponse<AttendanceStudentsResponse>> {
    const queryParams = new URLSearchParams();
    queryParams.append('classId', classId);
    if (sectionId) queryParams.append('sectionId', sectionId);

    return apiClient.get<AttendanceStudentsResponse>(`${API_ENDPOINTS.teacher.attendance.students}?${queryParams.toString()}`);
  }

  /**
   * Mark attendance
   */
  async markAttendance(data: MarkAttendanceRequest): Promise<ApiResponse<MarkAttendanceResponse>> {
    return apiClient.post<MarkAttendanceResponse>(API_ENDPOINTS.teacher.attendance.base, data);
  }

  /**
   * Update attendance
   */
  async updateAttendance(id: string, data: UpdateAttendanceRequest): Promise<ApiResponse<AttendanceRecord>> {
    return apiClient.patch<AttendanceRecord>(API_ENDPOINTS.teacher.attendance.getById(id), data);
  }
}

// Export singleton instance
export const teacherService = new TeacherService();

