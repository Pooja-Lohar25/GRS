const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})

var flag = false;
$("#br").prop("disabled",true);

$(document).click(function(){
	if($("#bTech").prop("checked"))
		$("#br").prop("disabled",false);
	else{
		$("#br").prop("disabled",true);
	}

})

var password = document.getElementById("student_password")
  , confirm_password = document.getElementById("student_confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;





