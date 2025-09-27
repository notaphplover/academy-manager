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
  },
} satisfies KnipConfig;
