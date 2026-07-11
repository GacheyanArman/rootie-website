# rootie — Landing Website

## Overview

rootie is a lightweight, multilingual Next.js landing site designed to showcase a product catalog, gallery, and contact information.

## Tech stack

- Next.js (App Router)
- TypeScript
- PostCSS
- npm

## Quick start

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Project structure

- `app/` — application routes, pages and global styles
- `components/` — reusable UI components (header, footer, hero, gallery, etc.)
- `components/icons/` — small icon components
- `components/ui/` — primitive UI elements (buttons, inputs)
- `lib/` — utilities and business logic (`i18n`, `catalog`, `links`, `utils`)
- `public/images/` — static images and assets

## Localization

The project includes basic internationalization support. See `lib/i18n.ts`, `language-provider`, and `language-switcher` components to add or edit translations.

## Development notes

- Follow linting and style rules defined in `eslint.config.mjs` and `postcss.config.mjs`.
- To add a new component, create the file inside `components/`, export it, and import it into the appropriate page under `app/`.

## Contributing

Contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Open a pull request with a clear description of your changes

Use Issues to report bugs or request enhancements.

## License

Include a `LICENSE` file in the repository (e.g. MIT) if you plan to open-source the project.

## Contact

If you have questions or need help, open an Issue or contact the repository maintainer.
