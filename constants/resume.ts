import { Step, StepType } from '../types/resume';

export const STEP_ORDER: StepType[] = ['personal', 'employment', 'education', 'skills', 'summary'];

export const STEPS: Step[] = [
  { id: 'personal', title: '개인 정보', completed: false },
  { id: 'employment', title: '경력', completed: false },
  { id: 'education', title: '학력', completed: false },
  { id: 'skills', title: '기술', completed: false },
  { id: 'summary', title: '요약', completed: false }
];

export const NEXT_STEP_TITLES = ['경력 사항', '학력 사항', '기술', '요약', '완료'];

export const CITIES = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'incheon', label: '인천' },
  { value: 'gwangju', label: '광주' },
  { value: 'daejeon', label: '대전' },
  { value: 'ulsan', label: '울산' }
];

export const COUNTRIES = [
  { value: 'korea', label: '대한민국' },
  { value: 'usa', label: '미국' },
  { value: 'japan', label: '일본' },
  { value: 'china', label: '중국' }
];