export type CardProps = {
    update   ?: number;
    onUpdate ?: () => void;
    onAction ?: Action;
}

export type Action = <T extends keyof ActionModals>(
    type    : T,
    payload : ActionModals[T]
) => void;

export type ActionData<T extends keyof ActionModals = keyof ActionModals> = {
    type : T;
    payload : ActionModals[T];
}

export type ActionModals = {
    confirm: Partial<Omit<ConfimProps, 'show' | 'onHide'>>;
    prompt:  Partial<Omit<PromptProps, 'show' | 'onHide'>>;
};

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