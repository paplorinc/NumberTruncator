import * as Hapi from 'hapi'
import {truncate} from './truncator'

const port = process.env.port || 8000
const server = new Hapi.Server()

server.connection({
    host: 'localhost',
    port: port
})
server.route({
    method: 'GET',
    path: '/truncate/{num}',
    handler: (req, resp) => resp(truncate(req.params.num))
})
server.start(err => {
    if (err) throw err
    else console.log('Server running at:', server.info.uri)
})

export default server