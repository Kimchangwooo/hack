import { ResumeData } from '../types/resume';

// Fallback PDF 생성 함수 (jsPDF 로드 실패 시)
function generateFallbackPDF(resumeData: ResumeData): void {
  const content = `
=== ${resumeData.personal.firstName} ${resumeData.personal.lastName}의 이력서 ===

직책: ${resumeData.personal.jobTitle}
이메일: ${resumeData.personal.email}
전화: ${resumeData.personal.phone}
주소: ${resumeData.personal.address}

=== 자기소개 ===
${resumeData.summary}

=== 경력 사항 ===
${resumeData.employment.map(exp => `
${exp.position} - ${exp.company}
기간: ${exp.startDate} - ${exp.isCurrentJob ? '현재' : exp.endDate}
위치: ${exp.location}
설명: ${exp.description}
성과: ${exp.achievements.join(', ')}
`).join('\n')}

=== 학력 사항 ===
${resumeData.education.map(edu => `
${edu.degree} - ${edu.school}
전공: ${edu.field}
기간: ${edu.startDate} - ${edu.endDate === 'present' ? '재학중' : edu.endDate}
${edu.gpa ? `학점: ${edu.gpa}` : ''}
${edu.description}
`).join('\n')}

=== 기술 및 스킬 ===
${resumeData.skills.map(skill => `${skill.name} (${skill.category}) - 숙련도: ${skill.level}/5`).join('\n')}
  `.trim();

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${resumeData.personal.firstName}_${resumeData.personal.lastName}_Resume.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function generateResumePDF(resumeData: ResumeData): Promise<void> {
  // jsPDF가 설치되지 않았으므로 fallback 함수 사용
  generateFallbackPDF(resumeData);
}