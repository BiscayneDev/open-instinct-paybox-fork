// Compile-only CI validation. These nonusable values must never be deployed.
// Uses build:app directly, never build:vercel/db:migrate or deployment tasks.
import { spawnSync } from "node:child_process";

const result = spawnSync("pnpm", ["build:app"], {
  stdio: "inherit",
  env: {
    // oxlint-disable-next-line turbo/no-undeclared-env-vars -- Build wrapper forwards CI tool PATH, never app secrets.
    ...process.env,
    BETTER_AUTH_SECRET: "fictional-ci-build-auth-secret-not-for-production",
    BETTER_AUTH_URL: "http://127.0.0.1:9",
    DATABASE_URL: "postgresql://fictional:fictional@127.0.0.1:9/fictional",
    KERNEL_API_KEY: "fictional-ci-build-only",
    SECRET_ENCRYPTION_KEY: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
    NEXT_TELEMETRY_DISABLED: "1",
  },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
