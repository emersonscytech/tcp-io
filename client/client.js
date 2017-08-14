const net = require("net");
const client = new net.Socket();
const args = process.argv;

const config = {
    host: args[2] || 5.83.10.123,
    port: args[3] || 3030,
    parser: args[4] || "none"
}

const parseTCPData = (data) => {
    if(config.parser !== "none"){
        return JSON.parse(data.toString());
    } else {
        return data.toString();
    }
}

client.connect(config.port, config.host, function() {
    console.log("[TCP CLIENT]", "\nCONNECTED TO: " + config.host + ":" + config.port);
});

client.on("data", function(data) {
    console.info("[ RECEIVING DATA FROM SERVER ]");
    console.log(parseTCPData(data));
});

client.on("close", function() {
    console.log("Connection closed");
});
