
const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})


function showHide(elm) {


  if (elm == "Rejected") {
  //display textbox
    document.getElementById('fb_text').style.display = "block";
  } else {
  //hide textbox
    document.getElementById('fb_text').style.display = "none";
  }

}
const statusOfComp = $("#statusOfComp");







var password = document.getElementById("faculty_password")
  , confirm_password = document.getElementById("faculty_confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

const targetDiv = document.getElementById("target");
const btn = document.getElementById("toggle");
btn.onclick = function () {
  if (targetDiv.style.display !== "none") {
    targetDiv.style.display = "none";
  } else {
    targetDiv.style.display = "block";
  }
};