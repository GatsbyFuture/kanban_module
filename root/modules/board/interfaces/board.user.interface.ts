export interface IBoardUser {
    id: number;
    board_id: number;
    user_id: number;
    role_id: number;
    meta: object;
    updated_at: Date;
    created_at: Date;
}