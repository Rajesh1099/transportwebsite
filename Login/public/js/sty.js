const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});




function validate() {
	var name = document.getElementById("name").value;
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var confirmPassword = document.getElementById("confirmPassword").value;
	var email = document.getElementById("email").value;
	var phone = document.getElementById("phone").value;

	if (name.match(/^[A-Za-z ]{3,}$/) && username.match(/^[A-Za-z0-9_]{3,}$/) && password.match(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-z]).{8,}$/) && password === confirmPassword && phone.match(/^[0-9]{10}$/) && email.match(/^.+@.+\..+$/)) {
		alert("Registration successful");
	} else {
		//alert("Registration failed. Please check the form and try again.");
		return false;
	}
}

