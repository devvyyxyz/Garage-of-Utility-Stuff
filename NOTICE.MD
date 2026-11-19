# Third-Party Notices

## Garage of Utility Stuff (GUS)

GUS itself is licensed under the GNU Affero General Public License version 3 or
later (AGPL-3.0-or-later). See `LICENSE.MD` for the full text.

## Third-Party Dependencies

The GUS application is not yet implemented in this repository. When the app is
built, this section will list all third-party dependencies, their licenses, and
any required attributions.

Common categories of dependencies for the planned tech stack include:

| Category | Examples (not yet final) |
|----------|--------------------------|
| Frontend framework | SvelteKit, Svelte |
| Language / runtime | TypeScript, Node.js |
| Database / ORM | SQLite (node:sqlite / better-sqlite3), Drizzle ORM |
| Styling | Tailwind CSS |
| UI primitives | shadcn-svelte (bits-ui), lucide-svelte |
| Auth | Better Auth |
| Forms / validation | Zod, sveltekit-superforms |
| Tooling | pnpm, Vite, Turborepo |

All third-party licenses will be included in the distributed application
artifacts and published in this file at that time.

## How to update this file

When adding or upgrading a dependency, add an entry in this file with:

- Package name and version
- License identifier (SPDX)
- Link to upstream license text
- Any required notices (copyright, attribution, etc.)

Automated tooling (e.g., `license-checker` or `pnpm licenses`) should be
configured in the CI pipeline to validate completeness.