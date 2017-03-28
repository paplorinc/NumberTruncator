import * as Hapi from 'hapi'
import {truncate} from "./truncator"


export function init() {
    const port = process.env.port || 8000
    const server = new Hapi.Server()

    server.connection({
        host: 'localhost',
        port: port,
    })
    server.route({
        method: 'GET',
        path: '/truncate/{number}',
        handler: (req, resp) => resp(truncate(req.params.number))
    })
    server.start(err => {
        if (err) throw err
        else console.log('Server running at:', server.info.uri)
    })

    return server
}