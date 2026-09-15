## Development

Next.js on the App Router. Start the dev server in background mode:

```
npm run dev
```

Manage it with the usual Next commands; the build is `npm run build`.

## Project notes

- All site copy lives in `content/site.ts`. Do not hardcode text in components.
- Design tokens (palette, font, radii, easings) live in the `@theme` block
  in `app/globals.css`.
- Images are referenced by file name through `content/images.ts`.
  A typo there fails the build with the list of available names.
- Source artwork from the client is in `_source/`. Regenerate the processed
  assets with `python scripts/prepare-assets.py`.

## Documentation

- [Next.js App Router](https://nextjs.org/docs/app)
- [next/image](https://nextjs.org/docs/app/api-reference/components/image)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
