const switchers = [...document.querySelectorAll(".switcher")];

switchers.forEach((item) => {
  item.addEventListener("click", function () {
    switchers.forEach((item) =>
      item.parentElement.classList.remove("is-active")
    );
    this.parentElement.classList.add("is-active");
  });
});

function validateSignUp() {
  var email = $("#emailSignUp").val();
  var number = $("#numberSignUp").val();
  var password = $("#passwordSignUp").val();

  var emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  var passw = /^[A-Za-z]\w{7,14}$/;

  if (
    email.match(emailRegex) &&
    number.length === 10 &&
    password.match(passw)
  ) {
    return true;
  } else {
    if (!email.match(emailRegex)) alert("Please enter valid mail");
    else if (number.length != 10) alert("Please enter valid phone number.");
    else
      alert(
        "Please enter a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
      );

    return false;
  }
}

function ValidateEmail(input) {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.value.match(validRegex)) {
    return true;
  } else {
    alert("Invalid email address!");
	return false;
  }
}
