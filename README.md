# react-poper

## description

-   A simple React Component modal popup solution.

## usage

```shell
    yarn add react-poper
```

pop.ts

```ts
import React from 'react';
import { Modal, Poper, AlertProps, RemindProps, WaitProps } from 'react-poper';
class Alert extends Modal<AlertProps> {}
class Remind extends Modal<RemindProps> {}
class Wait extends Modal<WaitProps> {}
export const pop = new Poper({
    errmsg: 'System Error',
    Alert: Alert,
    Remind: Remind,
    Wait: Wait,
    dimming: 0.4,
});
```

page.tsx

```tsx
import pop from './pop';
export default () => {
    const showAlert = () => {
        pop.alert('hellow alert');
    };
    return <div onClick={showAlert}>show alert</div>;
};
```
