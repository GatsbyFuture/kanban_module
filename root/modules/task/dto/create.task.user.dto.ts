export interface CreateTaskUserDto {
    readonly task_id: number;
    readonly user_id: number;
    readonly role_id: number;
    readonly meta: object;
}