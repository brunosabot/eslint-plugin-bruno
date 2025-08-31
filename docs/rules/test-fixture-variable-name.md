# bruno/test-fixture-variable-name

> Enforce naming conventions for fixture variables.

## Rule Details

This rule enforces that exported variables in `.fixture.ts` files follow a consistent naming convention. The variable name must:

1.  Be a named export (no default exports).
2.  End with the `Fixture` suffix.
3.  Be in `camelCase`.
4.  Contain the base name of the file.

### Incorrect

```typescript
// user-profile.fixture.ts
export const userProfile = {}; // Missing 'Fixture' suffix
export const UserProfileFixture = {}; // Not camelCase
export default {}; // Default export
```

### Correct

```typescript
// user-profile.fixture.ts
export const userProfileFixture = {};
```
