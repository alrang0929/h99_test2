import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import render from '@/utils/test/render';
import { ErrorPage } from '../ErrorPage';

// 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행 (react-router-dom의 useNavigate 모킹)
// moking: 테스트를 위한 가짜 버전을 만드는 것
// (path: string, factory?: MockOptions | ((importOriginal: () => unknown) => unknown)) => void
// path: string,: 모킹할 모듈의 경로
// factory?: MockOptions | <= 생략가능
// vi.fn(): 스파이 함수, 호출 기록을 추적
/***************************** 
 useNavigate:vi.fn() // 객체 리터럴로 불러오는 이유
 useNavigat  = react-router-DOM 모듈의 속성, expand로 불러와짐
  react-router0DOM 을 console.log를 찍어보면 객체 속성으로 존재하는 메서드들을 볼 수 있음.

  따라서 

  useNavigate: vi.fn() 으로 추적 함수로 속성을 변경함으로써
  테스트 추적이 가능한 것

[나머지 속성을 유지하고 특정 속성만 변경하는 방법]
  vi.mock('react-router-dom', () => {
  const originalModule = vi.importActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: vi.fn(), // useNavigate만 모킹
  };
});



*****************************/
vi.mock('react-router-dom', () => ({ 
  
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn() }));
// 모킹을 해라, 라우터 돔에서 꺼내와라 useNevigete를, 그리고 추적해라)
it('"뒤로 이동" 버튼 클릭시 뒤로 이동하는 navigate(-1) 함수가 호출된다', async () => {
  // Arrange: ErrorPage 컴포넌트를 렌더링
  const mockNavigate = vi.fn();
  vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  const { user } = await render(<ErrorPage />);

  // Act: "뒤로 이동" 버튼을 클릭
  // "뒤로 이동" 버튼 요소 찾기
  const backButton = screen.getByRole('button', { name: /뒤로 이동/i });
  await user.click(backButton);

  // Assert: navigate 함수가 -1 인자로 호출되었는지 확인
  // expect(buySpy).toHaveBeenCalledWith('apples'(생략가능), 10)
  expect(mockNavigate).toHaveBeenCalledWith(-1);
  expect(mockNavigate).toHaveBeenCalledTimes(1);
});
