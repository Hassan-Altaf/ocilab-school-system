/**
 * School Types
 * TypeScript types for school-related API requests and responses
 */

/**
 * School Type Enum
 */
export type SchoolType = 'school' | 'college' | 'academy';

/**
 * School Address
 */
export interface SchoolAddress {
  street?: string;
  city: string;
  stateProvince: string;
  postalCode?: string;
  country?: string;
}

/**
 * Create School Request
 */
export interface CreateSchoolRequest {
  name: string;
  contactPhone: string;
  contactEmail: string;
  schoolPassword: string;
  schoolType: SchoolType;
  address: SchoolAddress;
  tagline?: string;
  websiteUrl?: string;
  logo?: string;
  favicon?: string;
}

/**
 * School Response
 */
export interface School {
  id: string;
  name: string;
  contactPhone: string;
  contactEmail: string;
  schoolType: SchoolType;
  address: SchoolAddress;
  tagline?: string;
  websiteUrl?: string;
  logo?: string;
  favicon?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Create School Response
 */
export interface CreateSchoolResponse {
  school: School;
  message?: string;
}

