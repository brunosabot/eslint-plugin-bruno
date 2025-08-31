# Enforce that every page.tsx has a corresponding loading.tsx (bruno/next-page-has-loading)

This rule ensures that for every `page.tsx` file inside the `app/` directory, a corresponding `loading.tsx` file exists in the same directory. This is a convention in Next.js to show a loading UI while the page content is loading.

## Rule Details

Examples of **incorrect** code for this rule:

```tsx
// app/some-route/page.tsx
// Missing file: app/some-route/loading.tsx

export default function Page() {
  return <h1>My Page</h1>;
}
```

Examples of **correct** code for this rule:

```tsx
// app/some-route/page.tsx

export default function Page() {
  return <h1>My Page</h1>;
}
```

```tsx
// app/some-route/loading.tsx

export default function Loading() {
  return <p>Loading...</p>;
}
```

## When Not To Use It

If you are not using Next.js with the `app` directory structure or if you have a different convention for handling loading states, you can disable this rule.
