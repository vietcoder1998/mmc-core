import BlockChain from '../entities/block-chain'
import BaseRouter from './base'

export default class BlockRouter extends BaseRouter {
    listen() {
        // GET LIST OF BLOCKS
        this.router.get('/', async (req, res) => {
            const { page, size } = req.query
            const p = page ? Number(page) : 0
            const s = size ? Number(size) : 10
            res.send(await this.mmcChain.get_list_block(p, s))
        })

        //  GET BLOCK WITH HEIGHT
        this.router.get('/:height', async (req, res) => {
            const {
                params: { height },
            } = req

            res.send(await this.mmcChain.get_block_detail(Number(height)))
        })
    }
}
