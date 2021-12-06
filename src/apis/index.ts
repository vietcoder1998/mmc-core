import express from 'express'
import BlockChain from '../entities/block-chain'
import BlockRouter from './block'
import NodeRouter from './node'
import TxRouter from './tx'
import WalletRouter from './wallet'

export class Application {
    mmcChain = new BlockChain()
    app = express()
    port = 8092

    // ROUTER
    blockRouter: BlockRouter = new BlockRouter()
    txRouter: TxRouter = new TxRouter()
    nodeRouter: NodeRouter = new NodeRouter()
    walletRouter: WalletRouter = new WalletRouter()

    constructor(port?: number) {
        this.port = port
        this.blockRouter.mmcChain = this.mmcChain
        this.txRouter.mmcChain = this.mmcChain
        this.nodeRouter.mmcChain = this.mmcChain
        this.walletRouter.mmcChain = this.mmcChain
    }

    logErrors(
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        console.error(err.stack)
        next(err)
    }

    clientErrorHandler(
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        if (req.xhr) {
            res.status(500).send(err.message)
        } else next(err)
    }

    errorHandler(
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        res.status(500)
        res.render('error', { error: err })
    }

    // RUN
    start() {
        // MMC CHAIN
        this.app.get('/', async (req, res) => {
            res.send(this.mmcChain.get_total_block())
        })

        // BLOCK API
        this.app.use('/block', this.blockRouter.router)

        // TXS API
        this.app.use('/tx', this.txRouter.router)

        // NODE API
        this.app.use('/wallet', this.nodeRouter.router)

        // NODE API
        this.app.use('/node', this.nodeRouter.router)

        // CATCH ERROR
        this.app.use(this.logErrors)
        this.app.use(this.errorHandler)
        this.app.use(this.clientErrorHandler)
        this.app.listen(this.port, () => {
            console.log('server running, ', `http://localhost:${this.port}`)
        })
    }
}
