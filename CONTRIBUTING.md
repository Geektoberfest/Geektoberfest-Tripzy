# Contributing to Tripzy

Thanks for helping out! Tripzy is an AI-powered travel planner (React + Express + FastAPI ML service). See [README.md](README.md) for architecture and setup.

## Getting started

1. Fork the repo and clone your fork.
2. Follow **Getting Started** in the README (`Client/`, `Backend/server/`, `Backend/ml-microservice/`).
3. Copy the example env files and fill in your own keys. **Never commit secrets.**

## Workflow

1. Pick an issue and comment to claim it. Wait for assignment before starting.
2. Branch from `main`: `git checkout -b feat/short-description` (or `fix/`, `docs/`, `chore/`).
3. Make focused changes; one concern per PR.
4. Run checks before pushing:
   - Client: `npm run lint && npm run build`
   - Server: `npx tsc --noEmit` (plus tests if you add any)
5. Open a PR against `main`, link the issue (`Closes #123`), and describe what changed and how you tested it. Add screenshots for UI changes.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/): `feat: ...`, `fix: ...`, `docs: ...`, `refactor: ...`, `test: ...`, `chore: ...`.

## Code style

- TypeScript on the server, match surrounding code style and naming.
- Keep components small; reuse existing helpers before adding new ones.
- No new dependency for something a few lines can do.
- Validate input at API boundaries; don't leak internal errors to clients.

## Architecture notes

Significant design decisions live in `knowledge/decisions/`. If your change introduces one, add a short ADR.

## Reporting bugs / proposing features

Open an issue with steps to reproduce (bugs) or the problem and proposed solution (features).

## License

By contributing, you agree your contributions are licensed under the [MIT License](LICENSE).
