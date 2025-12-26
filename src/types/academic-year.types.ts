/**
 * Academic Year Types
 */

export interface AcademicYear {
  id: string;
  uuid?: string;
  yearName: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  schoolId?: string;
}

export interface CreateAcademicYearRequest {
  yearName: string;
  startDate: string; // ISO 8601 format: YYYY-MM-DD
  endDate: string; // ISO 8601 format: YYYY-MM-DD
  isCurrent?: boolean;
  schoolId?: string; // Will be added from header
}

export interface AcademicYearsResponse {
  academicYears: AcademicYear[];
  total?: number;
}

