
const url = "ws://localhost:1234"
const socket = new WebSocket(url);

// Connection opened
socket.addEventListener('open', function (event) {
    console.log("connected!");
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});