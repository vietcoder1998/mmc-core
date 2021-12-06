import { BlockChain } from '../entities'
import express from 'express'

export default abstract class BaseRouter {
    mmcChain: BlockChain
    router = express.Router()

    constructor() {
        this.listen()
    }

    abstract listen(): void
}
