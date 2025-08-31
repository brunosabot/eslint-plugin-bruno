# bruno/test-fixture-literal

> Enforce that fixture files only contain literals.

## Rule Details

This rule ensures that `.fixture.ts` files only contain literal values (strings, numbers, booleans, objects, and arrays of literals). It disallows variables, function calls, and other dynamic expressions to keep fixtures static and predictable.

### Incorrect

```typescript
// user.fixture.ts
const name = 'John';
export default { name };
```

### Correct

```typescript
// user.fixture.ts
export default {
  name: 'John',
};
```
