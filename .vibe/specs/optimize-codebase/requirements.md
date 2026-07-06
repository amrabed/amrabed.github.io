In a new PR, optimize the codebase by performing the following tasks, one commit each:

- Find and Remove all unused imports or import aliases
- Add test files for any component missing tests
- Fix overly permissive CORS headers
- Optimize inefficient code. Examples in attached screenshots
- Address: Rate Limit Bypass via Client-Controlled Headers @file:ratelimit.ts (line 4)
- Address: The ChatWidgetClient component is over 200 lines long and handles multiple concerns
