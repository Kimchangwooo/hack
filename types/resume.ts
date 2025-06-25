export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1-5 숙련도 레벨
}

export interface PersonalInfo {
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  employment: WorkExperience[];
  education: Education[];
  skills: Skill[];
  summary: string;
}

export type StepType = 'personal' | 'employment' | 'education' | 'skills' | 'summary';

export interface Step {
  id: StepType;
  title: string;
  completed: boolean;
}