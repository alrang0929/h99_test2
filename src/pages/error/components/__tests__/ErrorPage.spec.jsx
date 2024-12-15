import { screen } from '@testing-library/react';
import { expect, vi } from 'vitest';

import render from '@/utils/test/render';
import { ErrorPage } from '../ErrorPage';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { describe } from 'node:test';

// 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행 (react-router-dom의 useNavigate 모킹)
vi.mock('react-router-dom', () => ({
  ...vi.actual('react-router-dom'),
  useNavigate: vi.fn(),
}));

describe('ErrorPage', () => {
  it('"뒤로 이동" 버튼 클릭시 뒤로 이동하는 navigate(-1) 함수가 호출된다', async () => {
    const mockUseNavigate = vi.fn();
    useNavigate.mockReturnValue(mockUseNavigate);
    // Arrange: ErrorPage 컴포넌트를 렌더링
    const { user } = await render(
      <>
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
      </>
    );

    // Act: "뒤로 이동" 버튼을 클릭
    const backbutton = screen.getByRole('button', { name: '뒤로 이동' });
    await user.click(backbutton);
    // Assert: navigate 함수가 -1 인자로 호출되었는지 확인
    expect(mockUseNavigate).toHaveBeenLastCalledWith(-1);
  });
});
