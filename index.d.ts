import React from 'react';
export declare type AlertAction =
    | {
          readonly title: string;
          readonly block?: () => void;
      }
    | string
    | (() => void);
export interface ModalProps {
    /** dismiss callback */
    readonly onhide?: () => void;
    /** present callback */
    readonly onshow?: () => void;
}
export interface AlertProps extends ModalProps {
    /** alert title */
    readonly title?: string;
    /** cancel action */
    readonly cancel?: AlertAction;
    /** cancel action */
    readonly confirm?: AlertAction;
    /** alert message */
    readonly message?: string;
}
export interface WaitProps extends ModalProps {
    /** waiting timeout @default 20s */
    readonly timeout: number;
    /** waiting message */
    readonly message?: string;
}
export interface RemindProps extends ModalProps {
    /** remind title */
    readonly title?: string;
    /** remind message */
    readonly message?: string;
    /** keep duration */
    readonly duration: number;
}
export interface ModalType<P extends ModalProps = ModalProps, S = React.ComponentState> extends React.ComponentClass<P, S> {
    new (props: P, context?: any): Modal<P, S>;
    /** mask can be tap or not */
    readonly masktap: boolean;
    /** only one or not */
    readonly onlyone: boolean;
    /** dimming rate */
    readonly dimming: number;
    /** fade-out mode */
    readonly fademode: 'all' | 'mask';
}
/**
 * @description base abstract for all Poper Modal
 * @notice subclass can overwride some settings
 */
export declare abstract class Modal<P extends ModalProps = ModalProps, S = React.ComponentState> extends React.Component<P, S> {
    /** allow mask tap or not @default true */
    protected static readonly masktap: boolean;
    /** only one can be show whit same kind or not @default true  */
    protected static readonly onlyone: boolean;
    /** dimming rate of this kind modal @default -1 */
    protected static readonly dimming: number;
    /** fade-out mode of this kind modal when dismiss @param all fade-out all content @param mask fade-out only mask @default all */
    protected static readonly fademode: 'all' | 'mask';
    /** dismiss modal itself @param finish animation finished */
    public readonly dismiss: (finish?: () => void) => void;
    /** trigger when present animation begin */
    protected modalWillShow(): void;
    /** trigger when dismiss animation begin */
    protected modalWillHide(): void;
    /** trigger when present animation finished */
    protected modalDidShow(): void;
    /** trigger when dismiss animation finished */
    protected modalDidHide(): void;
    /** trigger when mask have been taped */
    protected modalTapMask(): void;
}
export interface PoperConfig {
    /** implements Component for this.wait() @default undefined */
    readonly Wait?: ModalType<WaitProps>;
    /** implements Component for this.alert() @default undefined */
    readonly Alert?: ModalType<AlertProps>;
    /** implements Component for this.remind() @default undefined */
    readonly Remind?: ModalType<RemindProps>;
    /** defalut error message for unknown Error @default 'System Error' */
    readonly errmsg?: string;
    /** dimming rate for all Modal @default 0.4 */
    readonly dimming?: number;
}
/**
 * @description poper handler
 * @example
 * ```
 * import React from 'react';
 * import { Modal, Poper, AlertProps, RemindProps, WaitProps } from 'react-poper';
 * class Alert extends Modal<AlertProps> {}
 * class Remind extends Modal<RemindProps> {}
 * class Wait extends Modal<WaitProps> {}
 * export const pop = new Poper({
 *    errmsg: 'System Error',
 *    Alert: Alert,
 *    Remind: Remind,
 *    Wait: Wait,
 *    dimming: 0.4,
 * });
 * ```
 */
export declare class Poper {
    /**
     * @description show a Modal Component
     * @param meta Modal Component class for modal
     * @param props Modal Component props
     */
    public readonly present: (meta: ModalType, props?: ModalProps) => void;
    /**
     * @description dismiss some presented modal
     * @param indexOrMeta the index in modal stack or  Modal Component class
     * @param finish callback when animation finished
     */
    public readonly dismiss: (indexOrMeta?: number | ModalType | undefined, finish?: (() => void) | undefined) => void;
    /**
     * @description present an Remind Modal
     * @param msg message of RemindProps
     * @param title title of RemindProps
     * @param duration keep duration orf RemindProps @default 1s
     */
    public readonly remind: (msg: string, title?: string | undefined, duration?: number | undefined) => void;
    /**
     * @description present an Alert Modal
     * @param msgOrProps message of AlertProps or AlertProps
     */
    public readonly alert: (msgOrProps: string | AlertProps) => void;
    /** @description remind error */
    public readonly error: (error?: any) => void;
    /**
     * @description presnet Wait Modal
     * @param msg message of WaitProps
     * @param timeout timeout of WaitProps @default 20s
     */
    public readonly wait: (msg?: string | undefined, timeout?: number) => void;
    /** dismiss Wait modal */
    public readonly idle: () => void;
    /** designed constructor */
    constructor(config?: PoperConfig);
}
