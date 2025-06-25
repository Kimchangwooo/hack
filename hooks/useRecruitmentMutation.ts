import { useState, useCallback } from 'react';
import { addRecruitment, Recruitment } from '../utils/api';

export function useRecruitmentMutation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const submit = useCallback(async (recruitment: Omit<Recruitment, 'id' | 'createdAt' | 'updatedAt' | 'applications'>) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await addRecruitment(recruitment);
      if (res.success && res.data) {
        setResult(res.data);
        return res.data;
      } else {
        setError(res.error || '추가 실패');
        throw new Error(res.error || '추가 실패');
      }
    } catch (e: any) {
      setError(e.message || '알 수 없는 오류');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { submit, loading, error, result };
} 