// const socket = io()

// let textarea = document.querySelector('#textarea');
// let messageArea = document.querySelector('.message_area');

// let name;

// do{
//     name = prompt('Please enter your name:');
// }while(!name)

// textarea.addEventListener('keyup', (e) =>{
//     if(e.key === 'Enter'){
//         sendMessage(e.target.value);

//     }
// })    

// function sendMessage(message){
//     let msg = {
//         user : name,
//         message : message.trim()
//     }

//     appendMessage(msg, 'outgoing')
//         textarea.value = ''
//         scrollToBottom();

//         socket.emit('message', msg)
// }

// function appendMessage(msg, type){
//     let newdiv = document.createElement('div');
//     let className = type;
//     newdiv.classList.add(className, 'message')

//     let textMessage = `
//     <h4>${msg.user}</h4>
//     <p>${msg.message}</p>
//     `
//     newdiv.innerHTML = textMessage;
//     messageArea.appendChild(newdiv)

// }

// socket.on('message', (msg) =>{
//     appendMessage(msg, 'incoming')
//     scrollToBottom();
// })

// function scrollToBottom(){
//     messageArea.scrollTop = messageArea;
//     scrollHeight;
// }

const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message_area')
do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString('en-US',{hour:'2-digit', minute:'2-digit',hour12:true})
    }
       
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

      
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        <span class="timestamp">${msg.timestamp}</span>
        `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



