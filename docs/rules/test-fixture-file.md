# bruno/test-fixture-file

> Enforce fixture file location and naming conventions.

## Rule Details

This rule enforces that files with the `.fixture.ts` suffix are located within a `__fixtures__` directory, and that files inside a `__fixtures__` directory have the correct suffix.

### Incorrect

```javascript
// In src/my-fixture.fixture.ts

// In src/__fixtures__/my-file.ts
```

### Correct

```javascript
// In src/__fixtures__/my-fixture.fixture.ts
```
