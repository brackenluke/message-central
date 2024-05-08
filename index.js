/*importing libraries needed */
import express from 'express' // importing express
import { Server } from "socket.io" // importing server package from socket.io
import path from 'path' // importing path to join files or folders to our server
import { fileURLToPath } from 'url'
//specifying filename and dirname packages from path to find files on the app directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//connect server to port assigned
const PORT = 3500;
//specifying admin for chatApp
const ADMINISTRATOR = "Admin";
//calling express to implementing it in our application
const app = express();
//defining our middleware between server and client
app.use(express.static(path.join(__dirname, "public")));
// calling server thorugh port 3500
const serverApp = app.listen(PORT, function(){
    console.log("listening on port:"+ PORT)
});

// tracking users accessing the application
const UserState = {
    users: [],
    setUsers: function (newUsersArray) {
        this.users = newUsersArray
    }
};
//allowing users to get acces to the server and prevent them to being blocked by CORS
const cors = {
    origin:["http://localhost:5500","http://127.0.0.1:5500"]
};
if(process.env.NODE_ENV === "production"){
    cors.origin = false;
};
const io = new Server(serverApp,{cors:cors});
//connecting with socket
io.on('connection', socket => {
    console.log('The User '+ socket.id + ' is now connected');

    // display message from administrator to welcome user to the chat application
    socket.emit('message', Message(ADMINISTRATOR, "Welcome to Chat App!"))

    socket.on('enterRoom', ({ name, room }) => {

        // exit room previously used 
        const previousRoom = userID(socket.id)?.room

        if (previousRoom) {
            socket.leave(previousRoom)
            io.to(previousRoom).emit('message', Message(ADMINISTRATOR, name +' has left the room'))
        }

        const user = Activation(socket.id, name, room)

        // Cannot update previous room users list until after the state update in activate user 
        if (previousRoom) {
            io.to(previousRoom).emit('userList', {
                users: UsersRoom(previousRoom)
            })
        }

        // join room 
        socket.join(user.room)

        // keep track of specific user joining the room
        socket.emit('message', Message(ADMINISTRATOR, 'You have joined the ' + user.room + ' chat room'))

        // users notified when one user get access
        socket.broadcast.to(user.room).emit('message', Message(ADMINISTRATOR, user.name + ' has joined the room'))

        // Updating users when joining
        io.to(user.room).emit('userList', {
            users: UsersRoom(user.room)
        })

        // Users are being updated when entering and exiting the room
        io.emit('roomList', {
            rooms: ActivateRooms()
        })
    })

    // When user disconnects from room
    socket.on('disconnect', () => {
        const user = userID(socket.id)
        LeaveApp(socket.id)

        if (user) {
            io.to(user.room).emit('message', Message(ADMINISTRATOR, user.name +' has left the room'))

            io.to(user.room).emit('userList', {
                users: UsersRoom(user.room)
            })

            io.emit('roomList', {
                rooms: ActivateRooms()
            })
        }

        console.log(' The User ' + socket.id + ' disconnected from room')
    })

    // check if a message is transmitted
    socket.on('message', ({ name, text }) => {
        const room = userID(socket.id)?.room
        if (room) {
            io.to(room).emit('message', Message(name, text))
        }
    })

    // check if there is any activity of any user connected
    socket.on('activity', (name) => {
        const room = userID(socket.id)?.room
        if (room) {
            socket.broadcast.to(room).emit('activity', name)
        }
    })
})
//building the structure of the message before being displayed
function Message(name, text) {
    return {
        name,
        text,
        time: new Intl.DateTimeFormat('default', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(new Date())
    }
}

// User functions 
function Activation(id, name, room) {
    const user = { id, name, room }
    UserState.setUsers([...UserState.users.filter(user => user.id !== id),user])
    return user;
}
// when user decides to leave chat application
function LeaveApp(id) {
    UserState.setUsers(
        UserState.users.filter(user => user.id !== id)
    )
}
// find users by ID
function userID(id) {
    return UserState.users.find(user => user.id === id)
}
// put users in a room
function UsersRoom(room) {
    return UserState.users.filter(user => user.room === room)
}
// activate the rooms with users being able to communicate each other
function ActivateRooms() {
    return Array.from(new Set(UserState.users.map(user => user.room)))
}