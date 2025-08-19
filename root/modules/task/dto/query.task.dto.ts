export interface QueryTaskDto {
    readonly id: string;
    readonly board_id: number;
    readonly column_id: number;
    readonly title: string;
    readonly priority_id: number;
}