import {IBoardSetting} from "./board.setting.interface";
import {IBoardUser} from "./board.user.interface";

export interface IBoard {
    id: number;
    name: string;
    desc: string;
    made_by: number;
    is_private: boolean;
    is_active: boolean;
    board_settings?: IBoardSetting;
    board_users?: IBoardUser[];
    updated_at: Date;
    created_at: Date;
}