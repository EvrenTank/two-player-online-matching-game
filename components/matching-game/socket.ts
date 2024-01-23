
import { io,Socket } from "socket.io-client";

const socket:Socket = io("http://localhost:3001"); // Socket.io sunucu adresinize uygun şekilde değiştirin

export default socket;