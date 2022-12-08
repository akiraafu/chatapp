const form = document.querySelector(".typing-area "),
  inputField = form.querySelector(".input-field"),
  sendBtn = form.querySelector("button"),
  chatBox = document.querySelector(".chat-box");

form.onsubmit = (e) => {
  e.preventDefault(); //preventing form from submitting
};

sendBtn.onclick = () => {
  //Ajax
  let xhr = new XMLHttpRequest(); //to create XML object
  xhr.open("POST", "./php/insert-chat.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        inputField.value = ""; //once message into database then leave blank in the input field
        scrollToBottom();
      }
    }
  };

  //Heve to send the form data through ajax to php
  let formData = new FormData(form); //to create new formData object
  xhr.send(formData); //to send the form data to php
};

chatBox.onmouseenter = () => {
  chatBox.classList.add("active");
};
chatBox.onmouseleave = () => {
  chatBox.classList.remove("active");
};

setInterval(() => {
  //Ajax
  let xhr = new XMLHttpRequest(); //to create XML object
  xhr.open("POST", "./php/get-chat.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let data = xhr.response;
        chatBox.innerHTML = data;
        if (!chatBox.classList.contains("active")) {
          //if chatbox doesn't contain active class then scroll to bottom
          scrollToBottom();
        }
      }
    }
  };
  //Heve to send the form data through ajax to php
  let formData = new FormData(form); //to create new formData object
  xhr.send(formData); //to send the form data to php
}, 500); //this function will run frequently after 500ms

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}
