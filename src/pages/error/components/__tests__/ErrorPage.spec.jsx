import { screen } from '@testing-library/react';
import { expect, vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import render from '@/utils/test/render';
import { ErrorPage } from '../ErrorPage';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('ErrorPage', () => {
  it('"뒤로 이동" 버튼 클릭 시 navigate(-1)가 호출된다', async () => {
    // useNavigate 모킹 설정
    const mockUseNavigate = vi.fn();
    useNavigate.mockReturnValue(mockUseNavigate);
    const { user } = await render(<ErrorPage />);

    const backButton = screen.getByRole('button', { name: '뒤로 이동' });
    await user.click(backButton);

    // navigate(-1)가 호출되었는지 확인
    expect(mockUseNavigate).toHaveBeenCalledWith(-1);
    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
  });
});1
