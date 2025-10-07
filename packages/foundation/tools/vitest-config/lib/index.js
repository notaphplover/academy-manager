import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * @param {import('vitest/node').VitestEnvironment} environment
 * @param {*} plugins
 * @param {boolean} globals
 * @param {string|Array.<string>|undefined} setupFiles
 * @returns
 */
export function buildConfig(
  environment = undefined,
  plugins = [],
  globals = false,
  setupFiles = undefined,
) {
  return defineConfig({
    plugins: [tsconfigPaths(), ...plugins],
    test: {
      environment,
      globals,
      setupFiles,
      coverage: {
        all: false,
      },
      passWithNoTests: true,
      projects: [
        {
          plugins: [...plugins, tsconfigPaths()],
          test: {
            environment,
            globals,
            setupFiles,
            exclude: ['src/**/*.int.spec.{ts,tsx}'],
            include: ['src/**/*.spec.{ts,tsx}'],
            name: 'Unit',
          },
        },
        {
          plugins: [...plugins, tsconfigPaths()],
          test: {
            environment,
            globals,
            setupFiles,
            include: ['src/**/*.int.spec.{ts,tsx}'],
            name: 'Integration',
          },
        },
        {
          plugins: [...plugins, tsconfigPaths()],
          test: {
            environment,
            globals,
            setupFiles,
            include: ['src/**/*.spec-d.{ts,tsx}'],
            name: 'Type',
          },
        },
      ],
      sequence: {
        hooks: 'parallel',
      },
    },
  });
}

export const defaultConfig = buildConfig('node', [
  swc.vite({
    tsconfigFile: 'tsconfig.esm.json',
  }),
]);

export const strykerConfig = defineConfig({
  plugins: [
    swc.vite({
      tsconfigFile: 'tsconfig.esm.json',
    }),
    tsconfigPaths(),
  ],
  test: {
    exclude: ['src/**/*.int.spec.{ts,tsx}'],
    include: ['src/**/*.spec.{ts,tsx}'],
    coverage: {
      all: false,
    },
    passWithNoTests: true,
    sequence: {
      hooks: 'parallel',
    },
  },
});
