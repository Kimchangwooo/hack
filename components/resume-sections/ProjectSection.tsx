import { Plus, X, Github, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent } from '../ui/card';

export function ProjectSection() {
  const projects = [
    {
      id: 1,
      title: "E-commerce 웹사이트 개발",
      duration: "2024.03 ~ 2024.06",
      role: "프론트엔드 개발자",
      techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
      description: "온라인 쇼핑몰 웹사이트를 React와 TypeScript로 개발했습니다. 사용자 경험을 개선하기 위해 반응형 디자인을 적용하고, 결제 시스템과 장바구니 기능을 구현했습니다.",
      githubUrl: "https://github.com/username/ecommerce-project",
      liveUrl: "https://ecommerce-demo.vercel.app"
    }
  ];

  const techStackOptions = [
    "React", "Vue.js", "Angular", "TypeScript", "JavaScript",
    "Node.js", "Express", "NestJS", "Python", "Django", "Flask",
    "Java", "Spring Boot", "C#", ".NET", "PHP", "Laravel",
    "MongoDB", "MySQL", "PostgreSQL", "Redis",
    "AWS", "Docker", "Kubernetes", "Git", "Jenkins"
  ];

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">프로젝트</h2>
          <Button 
            variant="outline" 
            size="sm"
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            프로젝트 추가
          </Button>
        </div>

        <div className="space-y-6">
          {/* 기존 프로젝트 카드 */}
          {projects.map((project) => (
            <Card key={project.id} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{project.title}</h3>
                  <Button variant="ghost" size="sm">
                    <X className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">프로젝트명 *</label>
                    <Input defaultValue={project.title} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">역할 *</label>
                    <Input defaultValue={project.role} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">시작일 *</label>
                    <Input type="date" defaultValue="2024-03-01" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">종료일</label>
                    <Input type="date" defaultValue="2024-06-30" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">기술 스택 *</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.techStack.map((tech, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-800"
                      >
                        {tech}
                        <button className="ml-1 text-blue-600 hover:text-blue-800">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="기술 스택 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {techStackOptions.map((tech) => (
                        <SelectItem key={tech} value={tech.toLowerCase()}>
                          {tech}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">프로젝트 설명 *</label>
                  <Textarea
                    placeholder="프로젝트의 목적, 주요 기능, 담당 업무, 성과 등을 상세히 작성해주세요."
                    className="min-h-24 resize-none"
                    defaultValue={project.description}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">GitHub 링크</label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        placeholder="https://github.com/username/project"
                        className="pl-10"
                        defaultValue={project.githubUrl}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">배포 링크</label>
                    <div className="relative">
                      <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        placeholder="https://project-demo.com"
                        className="pl-10"
                        defaultValue={project.liveUrl}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* 새 프로젝트 추가 폼 */}
          <Card className="border-2 border-dashed border-gray-300">
            <CardContent className="p-6">
              <div className="text-center text-gray-500 mb-4">
                <Plus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">새로운 프로젝트를 추가해보세요</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">프로젝트명 *</label>
                  <Input placeholder="예: 날씨 예보 앱 개발" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">역할 *</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="역할 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frontend">프론트엔드 개발자</SelectItem>
                      <SelectItem value="backend">백엔드 개발자</SelectItem>
                      <SelectItem value="fullstack">풀스택 개발자</SelectItem>
                      <SelectItem value="mobile">모바일 개발자</SelectItem>
                      <SelectItem value="devops">DevOps 엔지니어</SelectItem>
                      <SelectItem value="pm">프로젝트 매니저</SelectItem>
                      <SelectItem value="lead">팀 리더</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">시작일 *</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">종료일</label>
                  <Input type="date" />
                  <p className="text-xs text-gray-500 mt-1">진행 중인 경우 비워두세요</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">기술 스택 *</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="사용한 기술을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="font-medium text-gray-700 px-2 py-1 text-xs">프론트엔드</div>
                    {["React", "Vue.js", "Angular", "TypeScript", "JavaScript"].map((tech) => (
                      <SelectItem key={tech} value={tech.toLowerCase()}>{tech}</SelectItem>
                    ))}
                    <div className="font-medium text-gray-700 px-2 py-1 text-xs mt-2">백엔드</div>
                    {["Node.js", "Express", "NestJS", "Python", "Django", "Flask"].map((tech) => (
                      <SelectItem key={tech} value={tech.toLowerCase()}>{tech}</SelectItem>
                    ))}
                    <div className="font-medium text-gray-700 px-2 py-1 text-xs mt-2">데이터베이스</div>
                    {["MongoDB", "MySQL", "PostgreSQL", "Redis"].map((tech) => (
                      <SelectItem key={tech} value={tech.toLowerCase()}>{tech}</SelectItem>
                    ))}
                    <div className="font-medium text-gray-700 px-2 py-1 text-xs mt-2">기타</div>
                    {["AWS", "Docker", "Kubernetes", "Git", "Jenkins"].map((tech) => (
                      <SelectItem key={tech} value={tech.toLowerCase()}>{tech}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">프로젝트 설명 *</label>
                <Textarea
                  placeholder="• 프로젝트의 목적과 배경&#10;• 주요 기능 및 특징&#10;• 본인의 역할과 담당 업무&#10;• 기술적 도전과 해결 방법&#10;• 프로젝트 성과 및 결과"
                  className="min-h-32 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">GitHub 링크</label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="https://github.com/username/project"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">배포 링크</label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input 
                      placeholder="https://project-demo.com"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">취소</Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  프로젝트 추가
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">💡 프로젝트 작성 팁</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 기술적 도전과 해결 과정을 구체적으로 설명하세요.</li>
            <li>• 프로젝트의 성과와 임팩트를 수치로 표현해보세요.</li>
            <li>• 팀 프로젝트의 경우 본인의 역할과 기여도를 명확히 하세요.</li>
            <li>• GitHub 링크와 배포 링크를 포함하면 더욱 효과적입니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}