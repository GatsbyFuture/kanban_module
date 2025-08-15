import {CreateSettingDto} from "./create.setting.dto";
import {CreateUserDto} from "./create.user.dto";

export interface CreateBoardDto {
    readonly name: string;
    readonly desc: string;
    readonly is_private: boolean;
    readonly is_active: boolean;
    readonly settings: CreateSettingDto;
    readonly users: CreateUserDto[];
}