export interface IBoardRole {
    id: number;
    code: string;
    name: string;
    weight: number;
    meta: object;
    updated_at: Date;
    created_at: Date;
}

export interface ITaskRole {
    id: number;
    code: string;
    name: string;
    weight: number;
    meta: object;
    updated_at: Date;
    created_at: Date;
}

export interface ITaskPrio {
    id: number;
    code: string;
    name: string;
    weight: number;
    meta: object;
    updated_at: Date;
    created_at: Date;
}