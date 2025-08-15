export interface CreateSettingDto {
    readonly color: string;
    readonly allow_swimlanes: boolean;
    readonly clm_limits: number;
    readonly auto_archive_done: boolean;
    readonly auto_archive_days: boolean;
    readonly meta: object;
}