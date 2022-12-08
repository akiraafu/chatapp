const form = document.querySelector(".login form");
const continueBtn = form.querySelector(".button input"),
  errorText = form.querySelector(".error-text");

form.onsubmit = (e) => {
  e.preventDefault(); //preventing form from submitting
};

continueBtn.onclick = () => {
  //Ajax
  let xhr = new XMLHttpRequest(); //to create XML object
  xhr.open("POST", "./php/login.php", true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let data = xhr.response;
        console.log(data);
        if (data == "success") {
          location.href = "users.php";
        } else {
          errorText.textContent = data;
          errorText.style.display = "block";
        }
      }
    }
  };

  //Heve to send the form data through ajax to php
  let formData = new FormData(form); //to create new formData object
  xhr.send(formData); //to send the form data to php
};
