const http=require("http");
const app=require("./app.js");
const { initializeSocket } = require('./socket');

const server=http.createServer(app);
initializeSocket(server);

const port=process.env.port || 3000;
server.listen(port,()=>{
    console.log(`server listening on port: ${port}`);
});