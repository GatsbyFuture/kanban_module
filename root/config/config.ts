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
                TB_KANBANS: string;
                TB_BOARDS: string;
                TB_TASKS: string;
                TB_TASK_USERS: string;
                TB_TASK_MESSAGES: string;
                TB_FLOW_SOURCES: string;
                TB_FLOW_SETTINGS: string;
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
                TB_KANBANS: 'tb_kanbans',
                TB_BOARDS: 'tb_boards',
                TB_TASKS: 'tb_tasks',
                TB_TASK_USERS: 'tb_task_users',
                TB_TASK_MESSAGES: 'tb_task_messages',
                TB_FLOW_SOURCES: 'tb_flow_source',
                TB_FLOW_SETTINGS: 'tb_flow_settings',
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