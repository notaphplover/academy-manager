import { KnipConfig } from "knip";

type RecordValues<T> = T extends Record<any, infer U> ? U : never;

type WorkspaceProjectConfig = RecordValues<Required<KnipConfig["workspaces"]>>;

const defaultWorkspaceProjectConfig: WorkspaceProjectConfig & {
  entry: string[];
  ignoreDependencies: string[];
  project: string[];
} = {
  entry: [
    "{index,cli,main}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
    "src/{index,cli,main}.{js,cjs,mjs,jsx,ts,cts,mts,tsx}",
    "**/?(*.)+(spec|spec-d).[jt]s?(x)",
  ],
  ignoreDependencies: ["ts-loader", "tslib"],
  project: [
    "**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}!",
    "!vitest.config.stryker.mjs",
    "!**/__mocks__",
  ],
  rollup: {
    entry: "*rollup.config.mjs",
  },
};

export default {
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join("\n"),
  },
  commitlint: {
    config: "config/commitlint/commitlint.config.js",
  },
  workspaces: {
    ".": {
      entry: [],
      ignoreDependencies: defaultWorkspaceProjectConfig.ignoreDependencies,
      ignoreBinaries: ["trap"],
      project: [],
    },
    "packages/backend/apps/auth/*": defaultWorkspaceProjectConfig,
    "packages/backend/apps/auth/http-service": {
      ...defaultWorkspaceProjectConfig,
      entry: [
        ...defaultWorkspaceProjectConfig.entry,
        "src/app/scripts/generateBetterAuthSchema.mts",
      ],
      ignoreDependencies: [
        ...defaultWorkspaceProjectConfig.ignoreDependencies,
        "@better-auth/cli",
      ],
    },
    "packages/backend/apps/auth/prisma-adapter": {
      ...defaultWorkspaceProjectConfig,
      ignoreDependencies: [
        ...defaultWorkspaceProjectConfig.ignoreDependencies,
        "@prisma/client",
      ],
      prisma: {
        config: ["prisma.config.mjs"],
      },
    },
    "packages/backend/apps/mail/*": defaultWorkspaceProjectConfig,
    "packages/backend/libraries/*": defaultWorkspaceProjectConfig,
    "packages/foundation/tools/*": defaultWorkspaceProjectConfig,
    "packages/foundation/tools/prettier-config": {
      entry: ["{cjs,esm}/index.{js,d.ts}"],
      ignoreDependencies: defaultWorkspaceProjectConfig.ignoreDependencies,
      project: defaultWorkspaceProjectConfig.project,
    },
    "packages/frontend/services/ui": {
      ...defaultWorkspaceProjectConfig,
      entry: [...defaultWorkspaceProjectConfig.entry, "src/components/ui/*"],
      ignoreDependencies: [
        ...defaultWorkspaceProjectConfig.ignoreDependencies,
        "@emotion/react",
        "@emotion/styled",
      ],
      next: {
        config: ["next.config.{js,ts,cjs,mjs}"],
        entry: [
          "{instrumentation,instrumentation-client,middleware}.{js,ts}",
          "app/global-error.{js,jsx,ts,tsx}",
          "app/**/{error,layout,loading,not-found,page,template,default}.{js,jsx,ts,tsx}",
          "app/**/route.{js,jsx,ts,tsx}",
          "app/{manifest,sitemap,robots}.{js,ts}",
          "app/**/{icon,apple-icon}.{js,jsx,ts,tsx}",
          "app/**/{opengraph,twitter}-image.{js,jsx,ts,tsx}",
          "mdx-components.{js,jsx,ts,tsx}",
          "pages/**/*.{js,jsx,ts,tsx}",
          "src/{instrumentation,instrumentation-client,middleware}.{js,ts}",
          "src/app/global-error.{js,jsx,ts,tsx}",
          "src/app/**/{error,layout,loading,not-found,page,template,default}.{js,jsx,ts,tsx}",
          "src/app/**/route.{js,jsx,ts,tsx}",
          "src/app/{manifest,sitemap,robots}.{js,ts}",
          "src/app/globals.css",
          "src/app/**/{icon,apple-icon}.{js,jsx,ts,tsx}",
          "src/app/**/{opengraph,twitter}-image.{js,jsx,ts,tsx}",
          "src/mdx-components.{js,jsx,ts,tsx}",
          "src/pages/**/*.{js,jsx,ts,tsx}",
        ],
      },
    },
  },
} satisfies KnipConfig;
