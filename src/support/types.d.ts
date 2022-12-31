export type CardProps = {
    update   ?: number;
    onUpdate ?: () => void;
    onAction ?: Action;
}

export type Action = (
    type : 'confirm' | 'prompt',
    payload : Pick<ModalProps, 'content' | 'onConfirm'>
) => void;

export type ModalProps = {
    show      : boolean;
    title     : string;
    content   : string;
    onHide    : () => void;
    onConfirm : (...args : any) => void;
}

export type Settings = {
    goal  : number;
    water : number;
}

export type DataSet = Day[];

export type Day = {
    date: DateString;
    data: Array<Insertion>
}

export type DateString = `${ number }-${ number }-${ number }`

export type Insertion = {
    t: string;  // time
    v: number;  // value
}