import fs from 'fs'

export default class LogError {
    public write_error(message: any) {
        try {
            fs.writeFileSync('../mmc-err.log', String(message))
        } catch (error) {
            fs.writeFileSync('../mmc-err.log', String(message))
        }
    }
}
