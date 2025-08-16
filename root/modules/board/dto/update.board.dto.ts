export interface UpdateBoardDto {
    readonly name: string;
    readonly desc: string;
    readonly is_private: boolean;
    readonly meta: object;
    readonly is_active: boolean;
}