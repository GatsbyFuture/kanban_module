import type {FastifyInstance} from 'fastify';
import {config} from "../../../config/config";

import {IBoard} from "../interfaces/board.interface";
import {IBoardSetting} from "../interfaces/board.setting.interface";

import {CreateBoardDto} from "../dto/create.board.dto";
import {QueryBoardDto} from "../dto/query.board.dto";
import {UpdateBoardDto} from "../dto/update.board.dto";
import {UpdateSettingDto} from "../dto/update.setting.dto";
import {QuerySettingDto} from "../dto/query.setting.dto";
import {CreateUserDto} from "../dto/create.user.dto";
import {IBoardUser} from "../interfaces/board.user.interface";
import {QueryUserDto} from "../dto/query.user.dto";

const {
    DB_DATA: {
        PGSQL: {
            TABLES: {TB_BOARDS, TB_BOARDS_SETTINGS, TB_BOARDS_USERS}
        }
    }
} = config;

export class BoardModel {
    constructor(protected fastify: FastifyInstance) {
    }

    async create(createBoardDto: CreateBoardDto): Promise<IBoard> {
        const transaction = await this.fastify.pgsql.transaction();
        try {
            const {settings, users, ...board_data} = createBoardDto;

            const new_board = await transaction(TB_BOARDS).insert(board_data)
                .returning('*')
                .then((rows) => rows[0]);

            const board_setting = await transaction(TB_BOARDS_SETTINGS).insert({
                board_id: new_board.id,
                ...settings
            }).returning('*').then((rows) => rows[0]);

            const modify_users = users.map(user => {
                return {
                    board_id: new_board.id,
                    ...user,
                }
            });

            const board_users = await transaction(TB_BOARDS_USERS).insert(modify_users)
                .returning('*');

            await transaction.commit();

            return {
                ...new_board,
                board_settings: board_setting,
                board_users: board_users
            };
        } catch (e) {
            await transaction.rollback();
            throw e;
        }
    }

    async readOne(query: object): Promise<IBoard | undefined> {
        return this.fastify.pgsql(`${TB_BOARDS} as b`)
            .select([
                'b.id',
                'b.name',
                'b.desc',
                'b.made_by',
                'b.is_private',
                'b.meta',
                'b.is_active',
                this.fastify.pgsql.raw(`
                    json_build_object(
                        'color', bs.color,
                        'allow_swimlanes', bs.allow_swimlanes,
                        'clm_limits', bs.clm_limits, 
                        'auto_archive_done', bs.auto_archive_done,
                        'auto_archive_days', bs.auto_archive_days,
                        'meta', bs.meta
                    ) as board_settings
                `),
                this.fastify.pgsql.raw(`
                 COALESCE(
                      json_agg(
                        jsonb_build_object(
                          'id', bu.id,
                          'user_id', bu.user_id,
                          'role_id', bu.role_id,
                          'meta', bu.meta
                        )
                      ) FILTER (WHERE bu.id IS NOT NULL),
                      '[]'
                    ) as board_users
                `)
            ])
            .leftJoin(`${TB_BOARDS_SETTINGS} as bs`, 'b.id', 'bs.board_id')
            .leftJoin(`${TB_BOARDS_USERS} as bu`, 'b.id', 'bu.board_id')
            .modify((builder) => {
                Object.entries(query).forEach(([key, value]) => {
                    builder.where(`b.${key}`, value);
                })
            }).groupBy([
                'b.id', 'b.name', 'b.desc', 'b.made_by', 'b.is_private', 'b.meta', 'b.is_active',
                'bs.color', 'bs.allow_swimlanes', 'bs.clm_limits', 'bs.auto_archive_done', 'bs.auto_archive_days', 'bs.meta'
            ])
            .first();
    }

    async readAll(query: object): Promise<IBoard[]> {
        return this.fastify.pgsql(`${TB_BOARDS} as b`)
            .select([
                'b.id',
                'b.name',
                'b.desc',
                'b.made_by',
                'b.is_private',
                'b.meta',
                'b.is_active',
                this.fastify.pgsql.raw(`
                    json_build_object(
                        'color', bs.color,
                        'allow_swimlanes', bs.allow_swimlanes,
                        'clm_limits', bs.clm_limits, 
                        'auto_archive_done', bs.auto_archive_done,
                        'auto_archive_days', bs.auto_archive_days,
                        'meta', bs.meta
                    ) as board_settings
                `),
                this.fastify.pgsql.raw(`
                 COALESCE(
                      json_agg(
                        jsonb_build_object(
                          'id', bu.id,
                          'user_id', bu.user_id,
                          'role_id', bu.role_id,
                          'meta', bu.meta
                        )
                      ) FILTER (WHERE bu.id IS NOT NULL),
                      '[]'
                    ) as board_users
                `)
            ])
            .leftJoin(`${TB_BOARDS_SETTINGS} as bs`, 'b.id', 'bs.board_id')
            .leftJoin(`${TB_BOARDS_USERS} as bu`, 'b.id', 'bu.board_id')
            .modify((builder) => {
                Object.entries(query).forEach(([key, value]) => {
                    builder.where(`b.${key}`, value);
                })
            }).groupBy([
                'b.id', 'b.name', 'b.desc', 'b.made_by', 'b.is_private', 'b.meta', 'b.is_active',
                'bs.color', 'bs.allow_swimlanes', 'bs.clm_limits', 'bs.auto_archive_done', 'bs.auto_archive_days', 'bs.meta'
            ])
    }

    async updateBoard(query: Partial<QueryBoardDto>, patch: Partial<UpdateBoardDto>): Promise<IBoard[]> {
        return this.fastify.pgsql(TB_BOARDS)
            .modify((qb) => {
                Object.entries(query).forEach(([k, v]) => qb.where(k, v));
            })
            .update(patch)
            .returning('*');
    }

    async updateSetting(query: QuerySettingDto, patch: Partial<UpdateSettingDto>): Promise<IBoardSetting> {
        return this.fastify.pgsql(TB_BOARDS_SETTINGS)
            .modify((qb) => {
                Object.entries(query).forEach(([k, v]) => qb.where(k, v));
            })
            .update(patch)
            .returning('*')
            .then(rows => rows[0]);
    }

    async createUsers(createUserDto: CreateUserDto[]): Promise<IBoardUser[]> {
        return this.fastify.pgsql(TB_BOARDS_USERS)
            .insert(createUserDto)
            .onConflict(['board_id', 'user_id'])
            .merge({
                role_id: this.fastify.pgsql.raw('EXCLUDED.role_id'),
                meta: this.fastify.pgsql.raw('EXCLUDED.meta'),
                updated_at: this.fastify.pgsql.fn.now(),
            })
            .returning(['id', 'user_id', 'role_id', 'meta'])
    }

    async readAllUsers(query: QueryUserDto): Promise<IBoardUser[]> {
        return this.fastify.pgsql(TB_BOARDS_USERS).select('*').where(query);
    }
}