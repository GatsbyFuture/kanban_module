export interface ITaskMsg {
    id: number;
    task_id: number;
    user_id: number;
    message: string;
    attachments: object;
    meta: object;
    is_active: boolean;
    updated_at: Date;
    created_at: Date;
}