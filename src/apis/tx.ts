import BlockChain from '../entities/block-chain'
import BaseRouter from './base'

export default class TxRouter extends BaseRouter {
    listen(): void {
        // ROUTER GET TX
        this.router.get('/', async (req, res) => {
            const {
                query: { page, size },
            } = req

            res.send(
                await this.mmcChain.get_list_txs(Number(page), Number(size))
            )
        })

        // GET TX PRICE
        this.router.get('/price', async (req, res) => {
            const {
                headers: { address },
            } = req

            res.send(await this.mmcChain.get_price_of_account(String(address)))
        })
    }
}
