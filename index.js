const net = require('net')
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
    socket.on('data', (buffer) => {
        let packetID = buffer.readUInt8(0);
        console.log(`Packet ID: ${packetID}`)

        switch (packetID) {
            case 1: 
                // Login Request
                // Log some info about the request
                let protocol = buffer.readUIntBE(2, 3)
                let playername = buffer.slice(7, buffer.length).toString()
                console.log(`Player name: ${playername}`)
                console.log(`Client protocol version: ${protocol}`)

                // Send login confirmation packet
                let packetInfo = [0x01, 0]
                let entityID = intToByteArray(1298)
                let seed = intToByteArray(971768181197178410)
                let mode = [0]
                let dimension = [0]
                let difficulty = [1]
                let height = [128]
                let maxPlayers = [8]
                let buff = Buffer.from([].concat.apply([], [packetInfo, entityID, seed, mode, dimension, difficulty, height, maxPlayers]))
                console.log(`Bytes: ${buff.byteLength}`)
                socket.write(buff)
            case 2: 
                // Handshake
                // Sends a "-"
                socket.write(Buffer.from([0x02, 0, 1, 0, 0x2d]))
        }


/*        console.log(Uint8Array.from(buffer))

        let buf = 
        console.log(buffer.readUInt8(0))
        socket.write(buf)*/

        /*var myBuffer = [];
        var str = '§aWooooo';
        var buffer = new Buffer(str, 'utf16le');
        for (var i = 0; i < buffer.length; i++) {
            myBuffer.push(buffer[i]);
        }

        var packetbugger = [0xFF, 0, myBuffer.length / 2, 0]
        var final = packetbugger.concat(myBuffer)
        console.log(myBuffer.toString())
        const buf = new Buffer(final)
        console.log(buf.toString())
        socket.write(buf)*/
    })
    //socket.write("-")
    //socket.write('disconnect', { reason: {
    //    "text": "Bad"
    //}})
    //socket.write("Server is full!")
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