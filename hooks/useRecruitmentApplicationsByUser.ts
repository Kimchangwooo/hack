import { useState, useCallback } from 'react';
import { getRecruitmentApplicationsByUser, Recruitment } from '../utils/api';

export function useRecruitmentApplicationsByUser(userId: number) {
  const [data, setData] = useState<Recruitment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getRecruitmentApplicationsByUser(userId);
      if (res.success && res.data) setData(res.data);
      else setError(res.error || '조회 실패');
    } catch (e: any) {
      setError(e.message || '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  return { data, loading, error, fetch };
} 