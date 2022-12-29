export type UpdateProps = {
    update   ?: number;
    onUpdate ?: () => void;
}

export type Data = {
    t: string;  // time
    v: number;  // value
};

export type History = {
    dayweek: number;
    dataset: Data[]
}
