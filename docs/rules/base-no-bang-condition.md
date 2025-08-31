# bruno/base-no-bang-condition

> Disallow the use of bang operators in conditions.

## Rule Details

This rule aims to prevent the use of `!` (bang) operators in conditional statements, promoting more explicit and readable comparisons.

### Incorrect

```javascript
if (!myVariable) {
  // ...
}
```

### Correct

```javascript
if (myVariable === false) {
  // ...
}
```
