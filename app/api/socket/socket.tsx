import { Server } from "socket.io";
import { SocketUser, SocketMessage } from '@/common.types';

let users: SocketUser[] = [];

const addUser = (userId: string, socketId: string) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
  return users.find((user) => user.userId === userId);
};

const SocketConnection = (req: any, res: any) => {
    if (res.socket.server.io) {
        console.log("Already set up");
        res.end();
        return;
    };

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket: any) => {
        console.log("a user connected.");

        socket.on("addUser", (userId: string) => {
            addUser(userId, socket.id);
            io.emit("getUsers", users);
        });

        socket.on("sendMessage", ( smio: SocketMessage ) => {
            const user = getUser(smio.receiverId);
            const socketId = user?.socketId
            const senderId = smio.senderId;
            const text = smio.text
            
            io.to(socketId).emit("getMessage", {
              senderId,
              text,
            });
        });
    });
};

export default SocketConnection;