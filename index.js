const net = require('net')
const server = net.createServer();

server.on('connection', (socket) => {


    socket.on('data', (buffer) => {
        console.log(Uint8Array.from(buffer))

        var myBuffer = [];
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
        socket.write(buf)
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