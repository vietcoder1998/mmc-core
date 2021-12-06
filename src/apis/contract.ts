import BaseRouter from './base'

export default class ContractRouter extends BaseRouter {
    listen(): void {
        // DEPLOY CONTRACT
        this.router.post('/deploy', (req, res) => {
            const {
                body: {},
            } = req
        })
    }
}
