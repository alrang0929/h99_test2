import { expect } from 'vitest';
import { debounce, pick } from '../common';

describe('pick 유틸리티 단위 테스트', () => {

  it('단일 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };
    const picker = pick(obj, ['a']);
    expect(picker).toEqual({ a: 'A' });
  });

  it('2개 이상의 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };
    
    const picker = pick(obj, 'a', 'b');
    expect(picker).toEqual({
      a: 'A',
      b: { c: 'C' },
    });
  });
  ;

  it('propNames를 지정하지 않을 경우 빈 객체가 반환된다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    const picker = pick(obj);
    expect(picker).toEqual({});
  });


  it('존재하지 않는 키를 선택하면 에러가 발생한다', () => {
    const obj = {
      a: 'A',
      b: 'B',
    };

    expect(() => pick(obj, ['c'])).toThrow();
  });
});

describe('debounce 유틸리티 단위 테스트', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('특정 시간이 지난 후 함수가 호출된다.', () => {
    const spy = vi.fn();
    const debouncedFn = debounce(spy, 300);

    debouncedFn();
    vi.advanceTimersByTime(300);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('연이어 호출해도 마지막 호출 기준으로 지정된 타이머 시간이 지난 경우에만 함수가 호출된다.', () => {
    const spy = vi.fn();
    const debouncedFn = debounce(spy, 300);

    debouncedFn();
    vi.advanceTimersByTime(100);
    debouncedFn();
    vi.advanceTimersByTime(100);
    debouncedFn();
    vi.advanceTimersByTime(100);
    debouncedFn();
    vi.advanceTimersByTime(300);

    expect(spy).toHaveBeenCalledTimes(1); 
  });

  it('지정된 시간 전에 함수가 호출되지 않는다.', () => {
    const spy = vi.fn();
    const debouncedFn = debounce(spy, 300);

    debouncedFn();
    vi.advanceTimersByTime(200);

    expect(spy).not.toHaveBeenCalled();
  });
});
