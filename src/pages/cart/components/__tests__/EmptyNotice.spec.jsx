import { screen } from '@testing-library/react';

import customRender from '@/utils/test/render';
import { navigateFn } from '@/utils/test/setupTests';
import { EmptyNotice } from '../EmptyNotice';
import { useNavigate } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});
describe('EmptyNotice', () => {
  it('"홈으로 가기" 링크를 클릭할 경우 "/" 경로로 navigate 함수가 호출된다', async () => {
    const mockUseNavigate = vi.fn();
    useNavigate.mockReturnValue(mockUseNavigate);

    // Arrange: EmptyNotice 컴포넌트를 렌더링
    const { user } = await customRender(<EmptyNotice />);

    // Act: "홈으로 가기" 텍스트를 가진 요소를 클릭
    const gohomeButton = screen.getByRole('button',{name:'홈으로 가기'});
    await user.click(gohomeButton);

    // Assert: navigate 함수가 '/' 경로로 호출되었는지 확인
    expect(mockUseNavigate).toHaveBeenCalledWith('/');
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    
  });
});
