import type {FastifyInstance} from 'fastify';
import {BoardModel} from "./models/board.model";
import {IBoard} from "./interfaces/board.interface";

import {HttpException} from "../../errors/custom.errors";
import {ErrorCodes} from "../../enums/error.codes";

import {CreateBoardDto} from "./dto/create.board.dto";

export class BoardService {
    private boardModel: BoardModel;

    constructor(protected fastify: FastifyInstance) {
        this.boardModel = new BoardModel(fastify);
    }

    async create(createBoardDto: CreateBoardDto): Promise<IBoard> {
        try {
            const board = await this.boardModel.readOne({name: createBoardDto.name});

            if (board) {
                throw new HttpException(ErrorCodes.BOARD_ALREADY_EXIST);
            }

            return this.boardModel.create(createBoardDto);
        } catch (e) {
            throw e;
        }
    }
}