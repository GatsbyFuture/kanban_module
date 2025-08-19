export interface ITask {
    id: number;

    board_id: number;
    column_id: number;

    title: string;
    desc: string;

    priority_id: number;

    start_date: Date;
    due_date: Date;
    completed_at: Date;

    order_rank: number;

    external_refs: object;
    contact: object;
    has_lead: boolean;
    lead_id: number;

    labels: string[];
    attachments: object;
    checklist: object;

    made_by: number;
    updated_by: object;

    meta: object;

    is_active: boolean;
    updated_at: Date;
    created_at: Date;
}