const WebSocket = require("ws");
const fs = require("fs");
const username = require('username');

const clients = [];
const locJson = "./db/prueba.json";

const wsConnection = (server) => {
    const wss = new WebSocket.Server({server});
    const messages = JSON.parse(fs.readFileSync(locJson));
    wss.on("connection", (ws) => {
        clients.push(ws);
        sendMessages();
        var d = new Date();
        var n = d.getTime();
        ws.on("message", (message) => {
          username().then(username => {
            messageJson = {
              "username": username,
              "mensaje": message,
              "ts": new Date().getTime()
            }
            messages.push(messageJson);

            fs.writeFile(locJson, JSON.stringify(messages), () => {
            })
            sendMessages();
          });        
        });
    });
    const sendMessages = () => {
        let mensajesEnv = []
        for(let men of messages){
          mensajesEnv.push(men["username"] + ":"  + men["mensaje"] + "  |" + men["ts"]);
        }
        clients.forEach((client) => client.send(JSON.stringify(mensajesEnv)));
    }
};
exports.wsConnection = wsConnection;