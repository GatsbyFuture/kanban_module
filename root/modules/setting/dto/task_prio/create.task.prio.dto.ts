export interface CreateTaskPrioDto {
    readonly code: string;
    readonly name: string;
    readonly weight: number;
    readonly meta: object;
}