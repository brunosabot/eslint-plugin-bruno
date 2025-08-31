# bruno/test-given-when-then

> Enforce Given/When/Then structure in test files.

## Rule Details

This rule enforces a BDD-style Given/When/Then structure for tests using `describe` and `it` blocks.

- Top-level `describe` must start with `Given`.
- Nested `describe` under a `Given` block must start with `When`.
- `it` blocks inside a `When` block must start with `Then`.

### Incorrect

```javascript
describe('My test', () => {
  it('should work', () => {});
});
```

### Correct

```javascript
describe('Given a condition', () => {
  describe('When an action occurs', () => {
    it('Then it should have an outcome', () => {});
  });
});
```
