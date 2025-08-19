export interface UpdateColumnDto {
    readonly title: string;
    readonly position: number;
    readonly wip_limit: number;
    readonly is_backlog: boolean;
    readonly is_done: boolean;
    readonly meta: object;
    readonly is_active: boolean;
}