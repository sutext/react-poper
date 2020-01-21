# react-poper

## description

-   A simple React Component modal popup solution.
-   Class Poper will create A global Component mount point.
-   Usually you may export a global handler like this export const pop = new Poper();

## usage

```shell
    yarn add react-poper
```

pop.tsx

```tsx
import React from 'react';
import { Modal, Poper, AlertProps, RemindProps, WaitProps } from 'react-poper';
class Alert extends Modal<AlertProps> {
    static readonly onlyone = false;
    render() {
        const { title, message } = this.props;
        return (
            <div>
                <div>{title}</div>
                <div>{message}</div>
                <div>
                    <div>确定</div>
                    <div>取消</div>
                </div>
            </div>
        );
    }
}
class Remind extends Modal<RemindProps> {
    static readonly dimming = 0;
    render() {
        const { title, message } = this.props;
        return (
            <div>
                <div>{title}</div>
                <div>{message}</div>
            </div>
        );
    }
}
class Wait extends Modal<WaitProps> {
    static readonly dimming = 0;
    static readonly masktap = true;
    render() {
        const { message } = this.props;
        return (
            <div>
                <div>{message}</div>
            </div>
        );
    }
}
export const pop = new Poper({
    errmsg: 'System Error',
    Alert: Alert,
    Remind: Remind,
    Wait: Wait,
    dimming: 0.4,
    fadedur: 0.3,
});
```

page.tsx

```tsx
import pop from './pop';
export default () => {
    const showAlert = () => {
        pop.alert('hello alert');
    };
    return <div onClick={showAlert}>show alert</div>;
};
```
