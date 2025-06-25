import { useState, useCallback } from 'react';
import { applyRecruitment } from '../utils/api';

export function useApplyRecruitment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const apply = useCallback(async (recruitmentId: number, userId: number) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await applyRecruitment(recruitmentId, userId);
      if (res.success && res.data) {
        setResult(res.data);
        return res.data;
      } else {
        setError(res.error || '지원 실패');
        throw new Error(res.error || '지원 실패');
      }
    } catch (e: any) {
      setError(e.message || '알 수 없는 오류');
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { apply, loading, error, result };
} 