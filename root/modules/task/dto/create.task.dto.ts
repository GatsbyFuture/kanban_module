export interface CreateTaskDto {
    readonly board_id: number;
    readonly column_id: number;

    readonly title: string;
    readonly desc: string;

    readonly priority_id: number;

    readonly start_date: Date;
    readonly due_date: Date;
    readonly completed_at: Date;

    readonly order_rank: number;

    readonly external_refs: object;
    readonly contact: object;
    readonly has_lead: boolean;
    readonly lead_id: number;

    readonly labels: string[];
    readonly attachments: object;
    readonly checklist: object;

    readonly made_by: number;
    readonly updated_by: object;

    readonly meta: object;
}