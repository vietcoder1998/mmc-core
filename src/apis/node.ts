import { Node } from '../entities'
import BlockChain from '../entities/block-chain'
import BaseRouter from './base'

export default class NodeRouter extends BaseRouter {
    listen(): void {
        // REGISTER NODE
        this.router.post('/register', async (req, res) => {
            const {
                body: { port, host, name },
            } = req

            if (!port || !host || !name) {
                res.send('body error')
            } else {
                const node = new Node(
                    1,
                    String(host),
                    Number(port),
                    String(name)
                )

                res.send(await this.mmcChain.register_node(node._info))
            }
        })

        // RESOLVE
        this.router.post('/resolve', async (req, res) => {
            const {
                body,
                query: { address },
            } = req

            if (!String(address) || String(body)) {
                res.send('address are error')
            } else {
                res.send(
                    await this.mmcChain.resolve_block(
                        JSON.parse(body),
                        String(address)
                    )
                )
            }
        })
    }
}
