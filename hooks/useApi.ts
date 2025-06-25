import { useState, useCallback } from 'react';
import { api, ApiResponse } from '../utils/api';

// API 상태 타입
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// API 훅 반환 타입
interface UseApiReturn<T> extends ApiState<T> {
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

// 기본 API 훅
export function useApi<T = any>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>,
  immediate = false
): UseApiReturn<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const response = await apiFunction(...args);
        
        if (response.success) {
          setState({
            data: response.data,
            loading: false,
            error: null,
          });
        } else {
          setState({
            data: null,
            loading: false,
            error: response.error || 'API 요청 실패',
          });
        }
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : '알 수 없는 오류',
        });
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// 이력서 분석 훅
export function useResumeAnalysis() {
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'completed' | 'failed'>('idle');

  const startAnalysis = useCallback(async (resumeData: any, fileName?: string) => {
    setStatus('analyzing');
    
    try {
      const response = await api.post('/resume/analyze', { resumeData, fileName });
      
      if (response.success && response.data) {
        setAnalysisId(response.data.analysisId);
        return response.data;
      } else {
        setStatus('failed');
        throw new Error(response.error || '분석 요청 실패');
      }
    } catch (error) {
      setStatus('failed');
      throw error;
    }
  }, []);

  const getAnalysisResult = useCallback(async (analysisId: string) => {
    try {
      const response = await api.get(`/resume/analysis/${analysisId}`);
      
      if (response.success && response.data) {
        if (response.data.status === 'completed') {
          setStatus('completed');
        }
        return response.data;
      } else {
        throw new Error(response.error || '분석 결과 조회 실패');
      }
    } catch (error) {
      setStatus('failed');
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setAnalysisId(null);
    setStatus('idle');
  }, []);

  return {
    analysisId,
    status,
    startAnalysis,
    getAnalysisResult,
    reset,
  };
}

// 이력서 저장/조회 훅
export function useResumeStorage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadResumes = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/resume/list');
      
      if (response.success) {
        setResumes(response.data || []);
      } else {
        setError(response.error || '이력서 목록 조회 실패');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveResume = useCallback(async (resumeData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/resume/save', resumeData);
      
      if (response.success) {
        // 저장 후 목록 새로고침
        await loadResumes();
        return response.data;
      } else {
        setError(response.error || '이력서 저장 실패');
        throw new Error(response.error || '이력서 저장 실패');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [loadResumes]);

  const deleteResume = useCallback(async (resumeId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.delete(`/resume/${resumeId}`);
      
      if (response.success) {
        // 삭제 후 목록 새로고침
        await loadResumes();
      } else {
        setError(response.error || '이력서 삭제 실패');
        throw new Error(response.error || '이력서 삭제 실패');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [loadResumes]);

  return {
    resumes,
    loading,
    error,
    loadResumes,
    saveResume,
    deleteResume,
  };
}

// 채용 정보 훅
export function useJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadJobs = useCallback(async (filters?: { category?: string; location?: string; type?: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      if (filters?.category) params.append('category', filters.category);
      if (filters?.location) params.append('location', filters.location);
      if (filters?.type) params.append('type', filters.type);
      
      const queryString = params.toString();
      const response = await api.get(`/jobs${queryString ? `?${queryString}` : ''}`);
      
      if (response.success) {
        setJobs(response.data || []);
      } else {
        setError(response.error || '채용 정보 조회 실패');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  }, []);

  const searchJobs = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/jobs/search?q=${encodeURIComponent(query)}`);
      
      if (response.success) {
        setJobs(response.data || []);
      } else {
        setError(response.error || '채용 정보 검색 실패');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSejongSpecialJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/jobs/sejong-special');
      
      if (response.success) {
        setJobs(response.data || []);
      } else {
        setError(response.error || '세종대 특별 채용 정보 조회 실패');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    jobs,
    loading,
    error,
    loadJobs,
    searchJobs,
    loadSejongSpecialJobs,
  };
}

// 사용자 프로필 훅
export function useUserProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/user/profile');
      
      if (response.success) {
        setProfile(response.data);
      } else {
        setError(response.error || '프로필 조회 실패');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (profileData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.put('/user/profile', profileData);
      
      if (response.success) {
        setProfile(response.data);
        return response.data;
      } else {
        setError(response.error || '프로필 업데이트 실패');
        throw new Error(response.error || '프로필 업데이트 실패');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : '알 수 없는 오류');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    profile,
    loading,
    error,
    loadProfile,
    updateProfile,
  };
} 