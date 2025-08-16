import type {FastifyInstance} from 'fastify';
import {BoardModel} from "./models/board.model";
import {IBoard} from "./interfaces/board.interface";

import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";

import {CreateBoardDto} from "./dto/create.board.dto";
import {QueryBoardDto} from "./dto/query.board.dto";

export class BoardService {
    private boardModel: BoardModel;

    constructor(protected fastify: FastifyInstance) {
        this.boardModel = new BoardModel(fastify);
    }

    async create(createBoardDto: CreateBoardDto, made_by: string): Promise<IBoard> {
        try {
            const board = await this.boardModel.readOne({name: createBoardDto.name});

            if (board) {
                throw new HttpException(ErrorCodes.BOARD_ALREADY_EXIST);
            }

            const id: number = made_by ? +made_by : 0;

            const board_data = {...createBoardDto, made_by: id};

            return this.boardModel.create(board_data);
        } catch (e) {
            throw e;
        }
    }

    async getOne(query: QueryBoardDto): Promise<IBoard> {
        try {
            const board = await this.boardModel.readOne(query);

            if (!board) {
                throw new HttpException(ErrorCodes.BOARD_NOT_FOUND);
            }

            return board;
        } catch (e) {
            throw e;
        }
    }

    async getAll(query: QueryBoardDto): Promise<IBoard[]> {
        try {
            return this.boardModel.readAll(query);
        } catch (e) {
            throw e;
        }
    }
}