export interface UpdateSettingDto {
    readonly color: string;
    readonly allow_swimlanes: boolean;
    readonly clm_limits: number;
    readonly auto_archive_done: boolean;
    readonly auto_archive_days: number;
    readonly meta: object;
}