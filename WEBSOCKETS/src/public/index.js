let socket = io.connect("http://localhost:8080",{forceNew: true})
socket.on("message", (data) =>{console.log(data);
}
)