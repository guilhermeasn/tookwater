export type CardProps = {
    update   ?: number;
    onUpdate ?: () => void;
    onAction ?: Action;
}

export type Action = <T extends 'confirm' | 'prompt'>(
    type    : T,
    payload : T extends 'confirm'
        ? Partial<Omit<ConfimProps, 'show' | 'onHide'>>
        : Partial<Omit<PromptProps, 'show' | 'onHide'>>
) => void;

export type ConfimProps = {
    show      : boolean;
    title     : string;
    content   : string;
    onHide    : () => void;
    onConfirm : () => void;
}

export type PromptProps = {
    show        : boolean;
    title       : string;
    content     : string;
    value       : string;
    placeholder : string ;
    onHide      : () => void;
    onConfirm   : (value : string) => void;
    onChange    : (value : string) => string;
}

export type Settings = {
    goal  : number;
    water : number;
    chart : number;
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