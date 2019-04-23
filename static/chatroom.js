document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded.")
    
    // auto scroll chatroom messages to bottom when first loaded
    room = document.querySelector("#scroll");
    room.scrollTop = 9999999;

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {
        console.log("socket connected.")
    // Each button should emit a "submit vote" event
    console.log(document.querySelector("#sendmessage").innerHTML);
    b = function() {
            console.log("Button clicked.");
            const channel = document.querySelector('#current_channel').innerHTML;
            const user = document.querySelector('#current_user').innerHTML;
            const message = document.getElementById('message').value;
            console.log(channel);
            console.log(user);
            console.log(message);
            socket.emit('submit message', {'channel': channel, 'message': message, 'user': user});
            console.log("message sent!");
              };
    document.querySelector("#sendmessage").addEventListener("click", b);
      });

      // When a new vote is announced, add to the unordered list
      socket.on('announce message', data => {
            console.log("announce received.")
            const li = document.createElement('li');
            channel = data.channel;
            console.log(data.channel);
            console.log(data.user);
            console.log(data.message);
            if (channel === document.querySelector('#current_channel').innerHTML) {
                li.innerHTML = `${data.message}`;
                messages = document.querySelector("#chatroom");
                messages.append(li);
                // auto scroll chatroom messages to bottom when new message is displayed
                room = document.querySelector("#scroll");
                room.scrollTop = 9999999;}
            else {
                li.innerHTML = `${channel}`;
                channels = document.querySelector("#channelslist")
                channels.append(li);
            };
          } 
      );
  });