export interface IBoardSetting {
    id: number;
    board_id: number;
    color: string;
    allow_swimlanes: boolean;
    clm_limits: number | null;
    auto_archive_done: boolean;
    auto_archive_days: boolean;
    meta: object;
    updated_at: Date;
    created_at: Date;
}