import path from 'path';

import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({ exclude: ['/virtual:/**', 'node_modules/**'] })],
  test: {
    globals: true, // vitest에서 제공하는 함수들을 별도의 import 없이 사용할 수 있게 해줌
    environment: 'jsdom', // node.js는 브라우저와 달리 돔이 없기때문에 jsdom을 사용하여 브라우저 환경을 모킹. 순수 자바스크립트로 만든 라이브러리
    setupFiles: './src/utils/test/setupTests.js', // 테스트 환경 설정 파일
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }], // @ 심볼릭 링크를 src 디렉토리로 설정
  },
});
