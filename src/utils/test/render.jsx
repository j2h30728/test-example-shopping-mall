import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// userEvent : 클릭, 키보드 이벤트 등 다양한 이벤트를 실제 브라우저의 동작과 유사하게 시뮬레이션 할 수 있는 라이브러리

export default async component => {
  const user = userEvent.setup();
  // userEvent.setup() : userEvent를 사용하기 전에 설정해줘야 함
  //  - setup 함수를 호출하여 반환된 인스턴스를 통해 api 사용

  return {
    user,
    ...render(component),
  };
};
