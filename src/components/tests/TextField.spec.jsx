import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

describe('className prop', () => {
  it('className prop으로 설정한 css class가 설정된다.', async () => {
    await render(<TextField className="test-class" />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    screen.debug(); // 해당 컴포넌트가 js dom에서 어떤 식으로 렌더링 되는지 확인 할 수 있음
    /**
     * dom 구조확인 가능
     * <body>
        <div>
          <input
            class="text-input test-class"
            placeholder="텍스트를 입력해 주세요."
            type="text"
            value=""
          />
        </div>
      </body>
  
     */

    expect(textInput).toHaveClass('test-class');
  });
});

describe('placeholder prop', () => {
  it('placeholder prop이 없다면 기본 "텍스트를 입력해 주세요." 텍스트가 설정된다.', async () => {
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
  });

  it('placeholder prop이 있다면 해당 텍스트가 설정된다.', async () => {
    await render(<TextField placeholder="상품명을 입력해 주세요." />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
  });
});

describe('onChange prop', () => {
  it('텍스트를 입력하면 onChange prop으로 등록한 함수가 호출된다.', async () => {
    const spy = vi.fn();
    // vi.fn() : 함수를 호출하면 해당 함수가 호출된 것처럼 동작하는 함수를 생성

    const { user } = await render(<TextField onChange={spy} />);

    // 요소를 조회하는 방식은 여러가지가 존재
    // - role, lael-text, image-alt-text 등
    // - 쿼리마다 우선순위가 다름. 실제 사용자의 상호작용 방식과 가장 유사한 쿼리가 우선순위가 높다.
    // - test-id 의 경우, 실제 사용자들이 페이지를 탐색할 때 사용하지 않는 속성. DOM 구조가 바뀌면 텍스트 자체도 깨질 수 있다.
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.type(textInput, 'test');
    // typeAPI : 실제 텍스트를 입력하는 것과 유사한 방식으로 텍스트를 입력할 수 있는 API
    // - 내부적으로 킷다운 이벤트를 발생시키고, 킷다운 이벤트 핸들러에서 텍스트를 처리할 수 있다. 실제 텍스트를 입력하는 것과 거의 동일하게 테스트 코드 작성 가능
    // - 텍스트를 입력하면 자동으로 입력한 텍스트를 반환

    expect(spy).toHaveBeenCalledWith('test');
  });
});

describe('onEnter prop', () => {
  it('Enter 키를 입력하면 onEnter prop으로 등록한 함수가 호출된다.', async () => {
    const spy = vi.fn();

    const { user } = await render(<TextField onEnter={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.type(textInput, 'test{Enter}');

    expect(spy).toHaveBeenCalledWith('test');
  });
});

describe('onFocus prop', () => {
  it('포커스가 활성화되면 onFocus prop으로 등록한 함수가 호출된다.', async () => {
    // 포커스 활성화 방법은 여러가지 존재
    // - 탭 키 인풋 요소로 포커스 이동
    // - 인푸 요소를 클릭했을 때
    // - textInput.focus()로 직접 발생
    const spy = vi.fn();

    const { user } = await render(<TextField onFocus={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.click(textInput);
    // 클릭과 동반되는 focus, mouse down, mouse up 등 모든 이벤트가 고려되기 때문에 다양한 시나리오 재현 가능하다.

    expect(spy).toBeCalled();
    // toBeCall :  onFocus 함수는 인자로 넘겨주는 값이 없기 때문에, 단순히 함수가 호출되었는지만 확인해도 된다.
  });

  it('포커스가 활성화되면 border 스타일이 추가된다.', async () => {
    const spy = vi.fn();

    const { user } = await render(<TextField onFocuse={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.click(textInput);

    expect(textInput).toHaveStyle({
      borderWidth: 2,
      borderColor: 'rgb(25, 118, 210)',
    });
  });
});
