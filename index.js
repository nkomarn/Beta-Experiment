const net = require('net')
const serialize = require('node-serialize');
const server = net.createServer();

function stringToByteArray(input) {
    let newbuffer = [];
    var buffer = new Buffer(input, 'utf16le');
    for (var i = 0; i < buffer.length; i++) {
        newbuffer.push(buffer[i]);
    }
    return newbuffer;
}

function intToByteArray(x) {
    let y = x/2**32;
    return [y,(y<<8),(y<<16),(y<<24), x,(x<<8),(x<<16),(x<<24)].map(z=> z>>>24)
}

server.on('connection', (socket) => {

    // Keep-Alive Packet
    setInterval(() => {
        var packetInfo = [0x00, 0]
        var id = intToByteArray(957759560)
        var buff = Buffer.from([].concat.apply([], [packetInfo, id]))
        console.log(`Bytes: ${buff.byteLength}`)
        socket.write(buff)
    }, 1000);

    socket.on('data', (buffer) => {
        let packetID = buffer.readUInt8(0);
        console.log(`Packet ID: ${packetID}`)

        switch (packetID) {
            case 0:
                // Legacy Server List Ping
                var packetInfo = [0x00, 0]
                var json = {
                    "version": {
                        "name": "1.8.7",
                        "protocol": 47
                    },
                    "players": {
                        "max": 100,
                        "online": 5,
                        "sample": [
                            {
                                "name": "thinkofdeath",
                                "id": "4566e69f-c907-48ee-8d71-d7ba5aa00d20"
                            }
                        ]
                    },	
                    "description": {
                        "text": "Hello world"
                    },
                    "favicon": "data:image/png;base64,<data>"
                }
                var buff = Buffer.from([].concat.apply([], [packetInfo, stringToByteArray(JSON.stringify(json))]))
                console.log(`Bytes: ${buff.byteLength}`)
                socket.write(buff)

            case 1: 
                // Login Request
                // Log some info about the request
                let protocol = buffer.readUIntBE(2, 3)
                let playername = buffer.slice(7, buffer.length).toString()
                console.log(`Player name: ${playername}`)
                console.log(`Client protocol version: ${protocol}`)

                // Send login confirmation packet
                var packetInfo = [0x01, 0]
                var entityID = intToByteArray(1298)
                var seed = intToByteArray(971768181197178410)
                var mode = [0]
                var dimension = [0]
                var difficulty = [1]
                var height = [128]
                var maxPlayers = [8]
                var buff = Buffer.from([].concat.apply([], [packetInfo, entityID, seed, mode, dimension, difficulty, height, maxPlayers]))
                console.log(`Bytes: ${buff.byteLength}`)
                socket.write(buff)

                // Disconnect/Kick Packet
                var buffr = stringToByteArray("§eYou've been kicked, mwahahahah!")
                var packetbugger = [0xFF, 0, buffr.length / 2, 0]
                var finalbuffr = Buffer.from([].concat.apply([], [packetbugger, buffr]))
                //socket.write(finalbuffr)

                // Spawn Position packet
                /*var spawnPosPacket = [0x06, 0]
                var x = intToByteArray(117)
                var y = intToByteArray(70)
                var z = intToByteArray(-46)
                var buffr = Buffer.from([].concat.apply([], [spawnPosPacket, x, y, z]))
                console.log(`Bytes: ${buffr.byteLength}`)
                socket.write(buffr)*/
                
            case 2: 
                // Handshake
                // Sends a "-"
                console.log(serialize.unserialize(buffer).Username);
                socket.write(Buffer.from([0x02, 0, 1, 0, 0x2d]))
        }
    })
})

server.listen("25565", "localhost")

// ThreadLoginVerifier
function verifyLogin() {
    /*
    String s = (new BigInteger(MinecraftEncryption.a(PendingConnection.a(this.pendingConnection), PendingConnection.b(this.pendingConnection).F().getPublic(), PendingConnection.c(this.pendingConnection)))).toString(16);
    URL url = new URL("http://session.minecraft.net/game/checkserver.jsp?user=" + URLEncoder.encode(PendingConnection.d(this.pendingConnection), "UTF-8") + "&serverId=" + URLEncoder.encode(s, "UTF-8"));
    BufferedReader bufferedreader = new BufferedReader(new InputStreamReader(url.openStream()));
    */
    let url = "http://session.minecraft.net/game/checkserver.jsp?user="
}