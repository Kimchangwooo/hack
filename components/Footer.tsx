export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Career AI</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>(주)CareerAI, 대표이사 최규원</p>
              <p>서울특별시 광진구 군자동 98 세종대학교 광개토관 202호</p>
              <p>통신판매업 : 010-1234-5678</p>
              <p>사업자등록번호 : 000-11-22222</p>
              <p>통신판매업신고 : 제2025-서울광진-1004호</p>
              <p>유료직업소개사업등록번호 : (국내) 제2025-1234567-89-1-00001호</p>
            </div>
          </div>

          {/* 서비스 링크 */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">서비스</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">채용</a></li>
              <li><a href="#" className="hover:text-gray-900">AI 합격예측</a></li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">공지사항</a></li>
              <li><a href="#" className="hover:text-gray-900">자주 묻는 질문</a></li>
              <li><a href="#" className="hover:text-gray-900">이용약관</a></li>
              <li><a href="#" className="hover:text-gray-900">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-gray-900">채용문의</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 CareerAI Inc. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.017 0C8.396 0 8.025.015 6.624.072 5.22.132 4.297.333 3.45.63c-.875.368-1.78.823-2.592 1.635C.232 2.677-.213 3.582-.581 4.457c-.297.846-.498 1.769-.558 3.173C-.072 8.025-.087 8.396-.087 12.017c0 3.624.015 3.993.072 5.395.06 1.404.261 2.327.558 3.174.368.875.823 1.78 1.635 2.591.812.812 1.717 1.267 2.592 1.635.847.297 1.769.499 3.174.558 1.4.058 1.771.072 5.395.072 3.624 0 3.993-.015 5.394-.072 1.403-.06 2.327-.261 3.174-.558.875-.368 1.78-.823 2.591-1.635.812-.812 1.267-1.716 1.635-2.591.297-.847.499-1.771.558-3.174.058-1.402.072-1.771.072-5.395 0-3.624-.015-3.993-.072-5.394-.06-1.404-.261-2.327-.558-3.174-.368-.875-.823-1.78-1.635-2.592C19.777.232 18.872-.213 17.997-.581c-.847-.297-1.77-.499-3.174-.558C13.993-.072 13.624-.087 12.017-.087zm0 2.178c3.556 0 3.978.015 5.38.072 1.297.059 2.004.274 2.472.456.622.242 1.066.532 1.532.998.466.466.756.91.998 1.532.182.468.397 1.175.456 2.472.057 1.403.072 1.824.072 5.38 0 3.556-.015 3.978-.072 5.38-.059 1.297-.274 2.004-.456 2.472-.242.622-.532 1.066-.998 1.532-.466.466-.91.756-1.532.998-.468.182-1.175.397-2.472.456-1.403.057-1.824.072-5.38.072-3.556 0-3.978-.015-5.38-.072-1.297-.059-2.004-.274-2.472-.456-.622-.242-1.066-.532-1.532-.998-.466-.466-.756-.91-.998-1.532-.182-.468-.397-1.175-.456-2.472C2.193 15.995 2.178 15.574 2.178 12.017c0-3.556.015-3.978.072-5.38.059-1.297.274-2.004.456-2.472.242-.622.532-1.066.998-1.532.466-.466.91-.756 1.532-.998.468-.182 1.175-.397 2.472-.456 1.403-.057 1.824-.072 5.38-.072z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}