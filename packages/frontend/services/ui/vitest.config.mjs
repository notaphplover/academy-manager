import { buildConfig } from '@academyjs/foundation-vitest-config';
import react from '@vitejs/plugin-react';

export default buildConfig('jsdom', [react()], true, ['./src/test-setup.ts']);
