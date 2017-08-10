let net = require('net');
let config = require("../configuration.json");
let markers = require("../markers.json");

let tcpServer = net.createServer((socket) => {
    socket.on('error', function(err) {
        //console.log("[TCP SERVER]", err) 
    });
});

tcpServer.listen(config, () => {
    console.info("[ TCP SERVER ONLINE ]");
    console.info("[ CONFIG ]");
    console.info(`- HOST: ${config.host} \n- PORT: ${config.port}\n`);
});

let randomRiderCoord = (rider) => {
    rider.Latitude  = parseFloat(rider.Latitude) - Math.random();
    rider.Longitude = parseFloat(rider.Longitude) - Math.random();
    return rider;
}

let parseTCPData = (data) => {
    return JSON.stringify(data);
}

let unparseTCPData = (data) => {
    return JSON.parse(data.toString());
}

let getRandomRiders = () => {
    let newRiders = {
        Riders: []
    };
    markers.Riders.forEach((rider) => {
        newRiders.Riders.push(randomRiderCoord(rider));
    });
    return newRiders;
}

// TCP SERVER
tcpServer.on('connection', (clientSocket) => {
    console.log("[TCP SERVER]", "NEW CLIENT")
    let inerInterva1l = setInterval(() => {
        clientSocket.write(parseTCPData(getRandomRiders()));
    }, config.interval);
});

tcpServer.on('error', (err) => {
    console.log("[TCP SERVER]", err) 
    tcpServer.close();
});
