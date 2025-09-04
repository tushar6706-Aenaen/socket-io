import express from "express"
import { Server } from "socket.io";
import { createServer } from "http"
import cors from "cors"
const PORT = 3000
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET,POST"],
        credentials: true,

    }
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET,POST"],
    credentials: true,
}))
app.get("/", (req, res) => {
    res.send("hello world!");
})


io.on("connection", (socket) => {
    console.log("User Connected",socket.id);
    
    socket.emit("welcome",`welcome to the server : `)
    // socket.broadcast.emit("welcome",` : ${socket.id} joined the server`)

    socket.on("disconnect",()=>{
        console.log("User Disconnected ", socket.id)
    })


})
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})