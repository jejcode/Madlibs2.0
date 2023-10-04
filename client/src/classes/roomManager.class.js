import { generateRoomCode } from "../../../server/utils/roomFunctions";

class RoomManager {
    constructor() {
        this.rooms = {};
        this.maxUsersPerRoom = 6; 
    }

    createRoom() { // Returns a room code
        const roomCode = generateRoomCode(Object.keys(this.rooms));
        this.rooms[roomCode] = [];
        return roomCode;
    }

    joinRoom(roomCode, userID) {
        if (this.rooms.hasOwnProperty(roomCode)) {
            if (!this.rooms[roomCode].includes(userID)) {
                if (this.rooms[roomCode].length < this.maxUsersPerRoom) {
                    this.rooms[roomCode].push(userID);
                } else {
                    throw new Error("Room is full.");
                }
            } else {
                throw new Error("User is already in room.");
            }
        } else {
            throw new Error("Room does not exist.");
        }
    }

    leaveRoom(roomCode, userID) {
        if (this.rooms.hasOwnProperty(roomCode)) {
            const index = this.rooms[roomCode].indexOf(userID);
            if (index !== -1) { 
                this.rooms[roomCode].splice(index, 1);
                if (this.rooms[roomCode].length === 0) {
                    delete this.rooms[roomCode];
                }
            }
        }
    }

    randomRoom() {
        const roomCodes = Object.keys(this.rooms);
        return roomCodes[Math.floor(Math.random() * roomCodes.length)];
    }

    removeRoom(roomCode) {
        if (this.rooms.hasOwnProperty(roomCode)) {
            delete this.rooms[roomCode];
        }
    }

    getRooms() {
        return this.rooms;
    }

    getRoomCount() {
        return Object.keys(this.rooms).length;
    }

    getRoom(roomCode) {
        return this.rooms[roomCode] || null;
    }

    getUsersInRoom(roomCode) {
        return this.rooms[roomCode] || [];
    }

    isUserInAnyRoom(userID) {
        for (let room in this.rooms) {
            if (this.rooms[room].includes(userID)) {
                return true;
            }
        }
        return false;
    }
}

export default RoomManager;
