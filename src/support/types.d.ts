export type CardProps = {
    update   ?: number;
    onUpdate ?: () => void;
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