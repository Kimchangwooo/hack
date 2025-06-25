interface HeroBannerProps {
  onJobsClick?: () => void;
  onResumeStartClick?: () => void;
}

export function HeroBanner({ onJobsClick, onResumeStartClick }: HeroBannerProps) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          실제 선배들의 데이터로 찾는<br />
          나만의 취업 성공 공식
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          추상적인 조언은 그만, 이제는 데이터로 말하는 시대입니다.<br />
          수많은 실제 졸업생 데이터가 당신의 취업 전략을 설계하고,<br />
          구체적인 성공 확률을 알려드립니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onResumeStartClick}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors transform hover:scale-105 duration-200"
          >
            이력서 작성하기
          </button>
          <button 
            onClick={onJobsClick}
            className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors transform hover:scale-105 duration-200"
          >
            채용공고 보기
          </button>
        </div>
      </div>
    </section>
  );
}