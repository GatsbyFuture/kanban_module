export interface IBoard {
    id: number;
    name: string;
    desc: string;
    made_by: number;
    is_private: boolean;
    is_active: boolean;
    updated_at: Date;
    created_at: Date;
}