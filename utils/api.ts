// API 기본 설정
export const API_BASE_URL = 'http://172.16.88.105:8080';

// API 응답 타입 정의
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// HTTP 메서드 타입
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API 요청 옵션
interface ApiRequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

// 기본 헤더 설정
const getDefaultHeaders = (): Record<string, string> => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
});

// API 요청 함수
export async function apiRequest<T = any>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    headers = {},
    body,
    timeout = 10000
  } = options;

  const url = `${API_BASE_URL}${endpoint}`;
  const requestHeaders = { ...getDefaultHeaders(), ...headers };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// 편의 함수들
export const api = {
  get: <T = any>(endpoint: string, options?: Omit<ApiRequestOptions, 'method'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(endpoint: string, body?: any, options?: Omit<ApiRequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T = any>(endpoint: string, body?: any, options?: Omit<ApiRequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'PUT', body }),

  delete: <T = any>(endpoint: string, options?: Omit<ApiRequestOptions, 'method'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),

  patch: <T = any>(endpoint: string, body?: any, options?: Omit<ApiRequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'PATCH', body }),
};

// 이력서 관련 API 타입 정의
export interface ResumeAnalysisRequest {
  resumeData: any;
  fileName?: string;
}

export interface ResumeAnalysisResponse {
  analysisId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  results?: {
    recommendations: string[];
    score: number;
    improvements: string[];
  };
}

export interface JobRecommendation {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  description: string;
}

// 이력서 분석 API 함수들
export const resumeApi = {
  // 이력서 분석 요청
  analyzeResume: (data: ResumeAnalysisRequest) =>
    api.post<ResumeAnalysisResponse>('/resume/analyze', data),

  // 분석 결과 조회
  getAnalysisResult: (analysisId: string) =>
    api.get<ResumeAnalysisResponse>(`/resume/analysis/${analysisId}`),

  // 직업 추천 조회
  getJobRecommendations: (resumeId: string) =>
    api.get<JobRecommendation[]>(`/resume/${resumeId}/recommendations`),

  // 이력서 저장
  saveResume: (resumeData: any) =>
    api.post('/resume/save', resumeData),

  // 이력서 목록 조회
  getResumeList: () =>
    api.get('/resume/list'),

  // 이력서 조회
  getResume: (resumeId: string) =>
    api.get(`/resume/${resumeId}`),

  // 이력서 삭제
  deleteResume: (resumeId: string) =>
    api.delete(`/resume/${resumeId}`),
};

// 사용자 관련 API 타입 정의
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

// 사용자 API 함수들
export const userApi = {
  // 프로필 조회
  getProfile: () =>
    api.get<UserProfile>('/user/profile'),

  // 프로필 업데이트
  updateProfile: (profile: Partial<UserProfile>) =>
    api.put<UserProfile>('/user/profile', profile),

  // 로그인
  login: (credentials: { email: string; password: string }) =>
    api.post<{ token: string; user: UserProfile }>('/auth/login', credentials),

  // 회원가입
  register: (userData: { name: string; email: string; password: string }) =>
    api.post<{ token: string; user: UserProfile }>('/auth/register', userData),
};

// 채용 정보 관련 API 타입 정의
export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  deadline: string;
  category: string;
  isSejongSpecial?: boolean;
  specialBenefit?: string;
}

// 채용 정보 API 함수들
export const jobsApi = {
  // 채용 정보 목록 조회
  getJobList: (filters?: { category?: string; location?: string; type?: string }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.type) params.append('type', filters.type);
    
    const queryString = params.toString();
    return api.get<JobPosting[]>(`/jobs${queryString ? `?${queryString}` : ''}`);
  },

  // 채용 정보 상세 조회
  getJobDetail: (jobId: string) =>
    api.get<JobPosting>(`/jobs/${jobId}`),

  // 세종대 특별 채용 정보 조회
  getSejongSpecialJobs: () =>
    api.get<JobPosting[]>('/jobs/sejong-special'),

  // 채용 정보 검색
  searchJobs: (query: string) =>
    api.get<JobPosting[]>(`/jobs/search?q=${encodeURIComponent(query)}`),
};

// 채용 정보(Recruitment) 타입 정의
export interface Skill {
  name: string;
  level: string;
  category: string;
  experience: string;
}

export interface Award {
  organization: string;
  grade: string;
  title: string;
  date: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  score: string;
}

export interface Language {
  name: string;
  test: string;
  score: string;
  date: string;
}

export interface Link {
  type: string;
  url: string;
  description: string;
}

export interface Career {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Resume {
  id: number;
  userId: number;
  phoneNumber: string;
  email: string;
  selfIntroduction: string;
  skills: {
    name: string;
    level: string;
    category: string;
    experience: string;
  }[];
  careers: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  awards: {
    organization: string;
    grade: string;
    title: string;
    date: string;
  }[];
  certificates: {
    name: string;
    issuer: string;
    date: string;
    score: string;
  }[];
  languages: {
    name: string;
    test: string;
    score: string;
    date: string;
  }[];
  links: {
    type: string;
    url: string;
    description: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  createdAt: string;
  updatedAt: string;
  id: number;
  userId: number;
  projectName: string;
  role: string;
  startDate: string;
  endDate: string;
  techStacks: {
    name: string;
    version: string;
    proficiency: string;
    category: string;
  }[];
  description: string;
  githubLink: string;
  deployLink: string;
}

export interface User {
  createdAt: string;
  updatedAt: string;
  id: number;
  jobCategory: string;
  name: string;
  address: string;
  phoneNumber: string;
  joinDate: string;
  resumeCount: number;
  appliedCompanyCount: number;
  finalPassCount: number;
  ongoingInterviewCount: number;
  resumes: Resume[];
  projects: Project[];
  applications: string[];
}

export interface Application {
  createdAt: string;
  updatedAt: string;
  id: number;
  user: User;
  recruitment: string;
  appliedAt: string;
  status: string;
  passProbability: number;
}

// --- Recruitment 타입 확장 ---
export interface Recruitment {
  id: number;
  companyName: string;
  companyLocation: string;
  expectedSalary: string;
  employmentType: string;
  description: string;
  deadline: string;
  jobCategory: string;
  isAdditional: boolean;
  requiredSkills: Skill[];
  createdAt: string;
  updatedAt: string;
  applications: Application[];
}

// 모든 채용 정보 조회 API
export const getRecruitments = () =>
  api.get<Recruitment[]>('/api/recruitment');

// 채용 정보 추가 API
export const addRecruitment = (recruitment: Omit<Recruitment, 'id' | 'createdAt' | 'updatedAt' | 'applications'>) =>
  api.post<string>('/api/recruitment', recruitment);

// 채용 지원 API
export const applyRecruitment = (recruitmentId: number, userId: number) =>
  api.post<string>(`/api/recruitment/${recruitmentId}/apply/${userId}`);

// 특정 채용 정보 조회 API
export const getRecruitmentById = (recruitmentId: number) =>
  api.get<Recruitment>(`/api/recruitment/${recruitmentId}`);

// 직군별 채용 정보 조회 API
export const getRecruitmentsByCategory = (jobCategory: string) =>
  api.get<Recruitment[]>(`/api/recruitment/category/${jobCategory}`);

// 사용자 지원 내역 조회 API
export const getRecruitmentApplicationsByUser = (userId: number) =>
  api.get<Recruitment[]>(`/api/recruitment/applications/${userId}`);

// 채용 지원 취소 API
export const cancelRecruitment = (recruitmentId: number, userId: number) =>
  api.delete<string>(`/api/recruitment/${recruitmentId}/cancel/${userId}`);

// 이력서 목록 조회 API
export const getResumesByUserId = (userId: number) =>
  api.get<Resume[]>(`/api/resume/${userId}`);

// 사용자 정보 조회 API
export const getUserById = (userId: number) =>
  api.get<User>(`/api/user/${userId}`);

// 사용자 정보 수정 API
export const updateUserById = (userId: number, user: Partial<User>) =>
  api.put<string>(`/api/user/${userId}`, user);

// 사용자 삭제 API
export const deleteUserById = (userId: number) =>
  api.delete<string>(`/api/user/${userId}`);

// 모든 사용자 목록 조회 API
export const getAllUsers = () =>
  api.get<User[]>(`/api/user`);

// 사용자 생성 API
export const createUser = (user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'resumeCount' | 'appliedCompanyCount' | 'finalPassCount' | 'ongoingInterviewCount'>) =>
  api.post<string>(`/api/user`, user);

// 이력서 PDF 업로드 및 AI 분석 API
export const uploadResumePdf = async (userId: number, pdfFile: File) => {
  const formData = new FormData();
  formData.append('pdfFile', pdfFile);
  // userId는 쿼리 파라미터로 전달
  const response = await fetch(`${API_BASE_URL}/api/user/upload-resume?userId=${userId}`, {
    method: 'POST',
    body: formData,
  });
  const text = await response.text();
  if (response.ok) {
    return { success: true, data: text };
  } else {
    return { success: false, error: text };
  }
};

// 이력서 추가 API
export const addResume = (userId: number, resume: Omit<Resume, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) =>
  api.post<string>(`/api/resume/${userId}`, resume);

// 개별 이력서 삭제 API
export const deleteResumeById = (resumeId: number) =>
  api.delete<string>(`/api/resume/${resumeId}`);

// 사용자의 모든 이력서 전체 삭제 API
export const deleteAllResumesByUserId = (userId: number) =>
  api.delete<string>(`/api/resume/user/${userId}`); 