import { useEffect, useState } from 'react';
import { getRecruitments, Recruitment } from '../utils/api';

export function useRecruitments() {
  const [data, setData] = useState<Recruitment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getRecruitments()
      .then(res => {
        if (res.success && res.data) setData(res.data);
        else setError(res.error || '불러오기 실패');
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
} 