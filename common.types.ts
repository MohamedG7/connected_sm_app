export type SocketUser = {
    userId: string,
    socketId: any
};

export type SocketMessage = {
    senderId: string,
    receiverId: string,
    text: string
};