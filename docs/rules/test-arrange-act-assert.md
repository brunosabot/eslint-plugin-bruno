# bruno/test-arrange-act-assert

> Enforce Arrange/Act/Assert pattern in test files.

## Rule Details

This rule ensures that tests written with `it` or `test` follow the Arrange/Act/Assert pattern by requiring `// Arrange`, `// Act`, and `// Assert` comments.

### Incorrect

```javascript
it('should do something', () => {
  const result = 1 + 1;
  expect(result).toBe(2);
});
```

### Correct

```javascript
it('should do something', () => {
  // Arrange
  const a = 1;
  const b = 1;

  // Act
  const result = a + b;

  // Assert
  expect(result).toBe(2);
});
```
