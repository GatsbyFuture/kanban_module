export interface ITaskUser {
    id: number;
    task_id: number;
    user_id: number;
    role_id: number;
    meta: object;
    assigned_at: Date;
}