import BlockChain from '../entities/block-chain'
import BaseRouter from './base'

export default class WalletRouter extends BaseRouter {
    listen(): void {
        // GET WALLET WITH ADDRESS
        this.router.post('/:address', async (req, res) => {
            const {
                headers: { private_key },
                params: { address },
            } = req
            const wallet = await this.mmcChain.get_wallet_detail(
                address,
                String(private_key)
            )

            res.send(wallet)
        })

        // REGISTER WALLET
        this.router.post('/register', async (req, res) => {
            const {
                body: { password, name },
            } = req

            const wallet = await this.mmcChain.register_wallet(password, name)
            res.send(wallet)
        })
    }
}
