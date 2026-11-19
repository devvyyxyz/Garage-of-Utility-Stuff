# Garage of Utility Stuff (GUS)

A self-hosted utility web-app for tasks like file conversions, decrypting, and organizing files - all from one panel.

## Features

- File conversions between formats
- Decryption utilities
- File organization tools (e.g., sorting .txt files)
- First-run setup wizard
- Dark/light themes with smooth animations
- Runs locally on your own hardware

## Quick Start

### Docker (recommended)

```bash
docker compose up -d
```

### Running from command line

Clone the repo and run with Node.js:

```bash
pnpm install
pnpm build
node apps/web/build
```

## Tech Stack

- **Frontend & Backend:** SvelteKit 2, Svelte 5
- **Language:** TypeScript
- **Database:** SQLite with Drizzle ORM
- **Styling:** Tailwind CSS v4
- **Runtime:** Node.js 22 LTS

## License

GUS is primarily licensed under the [GNU Affero General Public License, Version 3.0 or later](LICENSE.MD).

- [LICENSE.MD](LICENSE.MD) — the AGPL-3.0-or-later license text.
- [EXCEPTIONS.MD](EXCEPTIONS.MD) — the plugin exception.
- [CLA.MD](CLA.MD) — the Contributor License Agreement.
- [COMMERCIAL.MD](COMMERCIAL.MD) — commercial licensing terms.
- [NOTICE.MD](NOTICE.MD) — third-party notices.
- [TRADEMARK.MD](TRADEMARK.MD) — trademark and branding.

See [LICENSE.MD](LICENSE.MD).