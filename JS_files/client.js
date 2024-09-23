const socket = io('http://localhost:5000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio=new Audio('ting.mp3');


const nameModal = document.getElementById('nameModal');
const nameInput = document.getElementById('nameInput');
const joinBtn = document.getElementById('joinBtn');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement)
    if(position=='left') audio.play();
}

// const name = prompt("Enter your name to join");
joinBtn.addEventListener('click',()=>{
    const name= nameInput.value.trim()
    if(name){
        nameModal.style.display='none';
        socket.emit('new-user-joined', name);
    }
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message=messageInput.value
    if(message!=''){
        append(`You: ${message}`,'right')
        socket.emit('send',message);
        messageInput.value=''
    }
})

socket.on('user-joined',name=>{
    if(name!=null) append(`${name} joined the chat`, 'left');
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
})


socket.on('left',name=>{
    if(name!=null) append(`${name}: left the chat`, 'left');
})
