export interface IColumn {
    id: number;
    board_id: number;
    title: string;
    position: number;
    wip_limit: number;
    is_backlog: boolean;
    is_done: boolean;
    meta: object;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}