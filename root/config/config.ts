import dotenv from 'dotenv';

dotenv.config();

interface Config {
    DB_DATA: {
        PGSQL: {
            CONNECTION: {
                PG_HOST: string,
                PG_PORT: number,
                PG_USER: string,
                PG_PASS: string,
                PG_NAME: string
            },
            TABLES: {
                TB_BOARDS: string,
                TB_BOARDS_ROLES: string,
                TB_BOARDS_USERS: string,
                TB_BOARDS_SETTINGS: string,

                TB_BOARDS_COLUMNS: string,
                TB_COLUMNS_TASKS: string,

                TB_TASKS_ROLES: string,
                TB_TASKS_PRIORITIES: string,
                TB_TASKS_USERS: string,
                TB_TASKS_MESSAGES: string,

                TB_FLOW_PLATFORMS: string,
                TB_FLOW_SOURCES: string,
                TB_FLOW_SETTINGS: string,
            },
            SEED_DATA: {
                BOARD_ROLES_PATH: string,
                TASK_ROLES_PATH: string,
                TASK_PRIORITIES_PATH: string,
                FLOW_PLATFORMS_PATH: string,
            }
        }
    },
    DB_SESS: {
        CONNECTION: {
            DB_HOST: string;
            DB_PORT: number;
        }
    },
    EXTRA_DATA: {}
}

export const config: Config = {
    DB_DATA: {
        PGSQL: {
            CONNECTION: {
                PG_HOST: getConfigEnv('DB_HOST', '127.0.0.1'),
                PG_PORT: Number(getConfigEnv('DB_PORT', '5432')),
                PG_USER: getConfigEnv('DB_USER', 'super'),
                PG_PASS: getConfigEnv('DB_PASS', 'jop13$'),
                PG_NAME: getConfigEnv('DB_NAME', 'db_call_center_x')
            },
            TABLES: {
                TB_BOARDS: 'tb_boards',
                TB_BOARDS_ROLES: 'tb_boards_roles',
                TB_BOARDS_USERS: 'tb_boards_users',
                TB_BOARDS_SETTINGS: 'tb_boards_settings',

                TB_BOARDS_COLUMNS: 'tb_boards_columns',
                TB_COLUMNS_TASKS: 'tb_columns_tasks',

                TB_TASKS_ROLES: 'tb_tasks_roles',
                TB_TASKS_PRIORITIES: 'tb_tasks_priorities',
                TB_TASKS_USERS: 'tb_tasks_users',
                TB_TASKS_MESSAGES: 'tb_tasks_messages',

                TB_FLOW_PLATFORMS: 'tb_flow_platforms',
                TB_FLOW_SOURCES: 'tb_flow_sources',
                TB_FLOW_SETTINGS: 'tb_flow_settings',
            },
            SEED_DATA: {
                BOARD_ROLES_PATH: '../../pgsql/json/default.board.roles.json',
                TASK_ROLES_PATH: '../../pgsql/json/default.task.roles.json',
                TASK_PRIORITIES_PATH: '../../pgsql/json/default.task.priorities.json',
                FLOW_PLATFORMS_PATH: '../../pgsql/json/default.flow.platforms.json',
            }
        }
    },
    DB_SESS: {
        CONNECTION: {
            DB_HOST: getConfigEnv('REDIS_HOST', '127.0.0.1'),
            DB_PORT: Number(getConfigEnv('REDIS_HOST', '6379')),
        }
    },
    EXTRA_DATA: {}
}

function getConfigEnv(name: string, initial = ''): string {
    return process.env[name] || initial;
}