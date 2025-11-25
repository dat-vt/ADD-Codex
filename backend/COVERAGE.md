# Backend test coverage

**Command:** `npm run test:coverage`

Latest run (Node.js experimental test coverage):
- Lines: 92.36%
- Branches: 92.59%
- Functions: 67.86%

Notes:
- Coverage focuses on the Express application surface; the standalone `src/server.ts` bootstrap remains intentionally untouched because tests spin up isolated app instances instead of binding a long-running listener.
- Database access is exercised through mocked pools to keep the suite hermetic while still validating query execution and fallbacks.
