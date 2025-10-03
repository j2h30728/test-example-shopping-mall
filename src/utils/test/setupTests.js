// 테스트가 구동될 때 필요한 설정
// - 라이브러리
// - 테스트 코드 실행 전후 작업
import '@testing-library/jest-dom';
// vitest에는 dom에 대한 매처함수가 존재하지 않기 때문에 편리하게 사용하기위해  testing-library/jest-dom을 사용하여 dom에 대한 매처함수를 추가해줌
// - toBeInTheDocument 매처함수를 사용하여 해당 요소가 문서에 존재하는지 확인할 수 있음
// - toHaveClass 매처함수를 사용하여 해당 요소가 주어진 class를 가지고 있는지 확인할 수 있음

// setup : beforeAll, beforeEach
beforeAll(() => {});
// 실행 순서 1
// - 테스트 실행 전에 호출
// - 파일 또는 스코프 내에 실행 전 단 한번만 호출

beforeEach(() => {});
// 실행 순서 2
// - 파일 또는 스코프 내 모든 테스트가 실행되기 전에 호출
// - 사용 예시) 특정 컴포넌트를 반복된 패턴으로 렌더링, 매 테스트마다 모킹
// - describe 블록 내부에 작성한다면, decreabie 블록 내의 테스트 실행 전에만 호출

// teardown : afterAll, afterEach
afterAll(() => {
  vi.resetAllMocks();
});
// 실행 순서 마지막

afterEach(() => {
  vi.clearAllMocks();
  // 테스트 실행이 끝났을 때 모킹한 모듈의 히스토리를 초기화하여 다른 테스트에 영향을 끼치지 않도록 설정
  // - 히스토리 초기화 => 테스트의 독립성 보장 가능
});
// - 테스트에 의해 생성된 상태를 초기화 하는 경우에 사용하면 유용(여러 테스트에 공유되는 상태값 변경 건)

// 테스트 환경이 Node.js 이기 때문에 전역에서 모킹이 필요한 경우
// matchMedia는 JS DOM 환경에 존재하지 않아 테스트 실행 시 에러가 발생
// - 테스트 실행을 위해 사전에 matchMedia 에 모키해두어 테스트 실행에 문제 없도록 함
// https://github.com/vitest-dev/vitest/issues/821
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
