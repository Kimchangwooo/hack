import { Button } from '../ui/button';
import { ResumeData } from '../../types/resume';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export function ResumePreview({ resumeData }: ResumePreviewProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">미리보기</h3>
        <Button variant="outline" size="sm" className="text-blue-600">
          템플릿 변경
        </Button>
      </div>
      
      {/* 이력서 미리보기 */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-sm">
        <div className="text-center mb-4">
          <h2 className="font-semibold text-lg text-gray-900">
            {resumeData.personal.firstName} {resumeData.personal.lastName}
          </h2>
          <p className="text-gray-600">{resumeData.personal.jobTitle}</p>
        </div>
        
        <div className="space-y-2 text-xs text-gray-600">
          <div><strong>이메일:</strong> {resumeData.personal.email}</div>
          <div><strong>전화:</strong> {resumeData.personal.phone}</div>
          <div><strong>주소:</strong> {resumeData.personal.address}</div>
          
          {/* 요약 미리보기 */}
          {resumeData.summary && (
            <div className="mt-4">
              <strong className="block mb-2">요약:</strong>
              <div className="text-xs text-gray-600 leading-relaxed">
                {resumeData.summary.length > 100 
                  ? `${resumeData.summary.substring(0, 100)}...` 
                  : resumeData.summary
                }
              </div>
            </div>
          )}
          
          {/* 경력 미리보기 */}
          {resumeData.employment.length > 0 && (
            <div className="mt-4">
              <strong className="block mb-2">경력:</strong>
              {resumeData.employment.map((exp, index) => (
                <div key={exp.id} className="mb-2">
                  <div className="font-medium">{exp.position}</div>
                  <div className="text-gray-500">{exp.company}</div>
                  <div className="text-gray-400">
                    {exp.startDate} - {exp.isCurrentJob ? '현재' : exp.endDate}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* 학력 미리보기 */}
          {resumeData.education.length > 0 && (
            <div className="mt-4">
              <strong className="block mb-2">학력:</strong>
              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="mb-2">
                  <div className="font-medium">{edu.degree}</div>
                  <div className="text-gray-500">{edu.school}</div>
                  <div className="text-gray-500">{edu.field}</div>
                  <div className="text-gray-400">
                    {edu.startDate} - {edu.endDate === 'present' ? '재학중' : edu.endDate}
                  </div>
                  {edu.gpa && (
                    <div className="text-gray-400">학점: {edu.gpa}</div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* 스킬 미리보기 */}
          {resumeData.skills.length > 0 && (
            <div className="mt-4">
              <strong className="block mb-2">기술:</strong>
              <div className="space-y-2">
                {resumeData.skills.slice(0, 6).map((skill, index) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-xs">{skill.name}</span>
                      <span className="text-gray-400 text-xs ml-1">({skill.category})</span>
                    </div>
                    <div className="flex">
                      {Array.from({ length: skill.level }, (_, i) => (
                        <span key={i} className="text-yellow-400 text-xs">★</span>
                      ))}
                      {Array.from({ length: 5 - skill.level }, (_, i) => (
                        <span key={i} className="text-gray-300 text-xs">★</span>
                      ))}
                    </div>
                  </div>
                ))}
                {resumeData.skills.length > 6 && (
                  <div className="text-gray-400 text-xs">
                    +{resumeData.skills.length - 6}개 더
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}