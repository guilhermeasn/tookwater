export type UpdateProps = {
    update   ?: number;
    onUpdate ?: () => void;
}

export type Week = {
    t: string;  // time
    v: number;  // value
};

export type History = {
    dayweek: number;
    dataset: Week[]
}

export type Month = {
    [day : number] : number
}
