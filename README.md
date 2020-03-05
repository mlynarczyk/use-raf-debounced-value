# useRafDebouncedValue react hook

A react hook that provides value debouncing using requestAnimationFrame.

# Installation

Yarn:

```
yarn add use-raf-debounced-value
```

Npm:

```
npm i use-raf-debounced-value --save
```

# Usage

```tsx
import { useRafDebouncedValue } from 'use-raf-debounced-value';
import { useExampleHook } from 'example';

export const useDebouncedExampleHook = () => {
  const value = useExampleHook();
  const [debouncedValue] = useRafDebouncedValue(value);

  return debouncedValue;
};
```
