const net = require("net");
const client = new net.Socket();
const config = require("../configuration.json");

const parseTCPData = (data) => {
	return JSON.parse(data);
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
