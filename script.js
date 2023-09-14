const log = () => {
	console.log("ss");
};
let inValidSpan = document.getElementById('inValid')
const formOp = (e, method) => {
	e.preventDefault();
	let form = e.target;
	if (method === "sign") {
		let firstName = form.firstName.value;
		let lastName = form.lastName.value;
		let email = form.Email.value;
		let password = form.inputPassword.value;
		if(firstName===''||lastName===''||email===''||password===''||form.confirmPassword.value===''){
			inValidSpan.innerText = 'Form details not filled correctly'
			return
		}
		const data = {
			firstName,
			lastName,
			email,
			password,
		};

		storeData(data);
	} else if (method === "login") {
		let mail = form.Email.value;
		checkUser(mail);
	} else {
		let password = form.inputPassword.value;
		checkPassword(password);
	}
	form.reset();
	inValidSpan.innerText=''
};
const validator = (params) => {
	let par = document.getElementById(params);

	let value = par.value;

	let text = par.previousElementSibling.innerHTML;

	let re =
		/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

	let numEx = /\d/;

	let errorSpan = document.getElementById(
		"error" + params
	);
	if (value === "") {
		errorSpan.innerText =
			text + " cannot be empty";
		
	}

	if (value !== "") errorSpan.innerText = "";

	if (
		params === "firstName" ||
		params === "lastName"
	) {
		if (numEx.test(value))
			errorSpan.innerText =
				"Name cannot contain numbers";
		
	}

	if (params === "confirmPassword") {
		let password = document.getElementById(
			"inputPassword"
		).value;

		if (password !== value) {
			errorSpan.innerText =
				"Both password should match";
			
		} else {
			errorSpan.innerText = "";
		}
	}
	if (params === "inputPassword") {
		if (!re.test(value)) {
			errorSpan.innerHTML =
			"Password should match the criteria and should have 8 chars";
		}
	}
	if (params === "Email") {
		if (
			!(
				value.includes("@") && value.includes(".")
				)
				) {
					errorSpan.innerHTML = "Enter a valid email";
				}
	}
};
let user;
const userData =
	localStorage.getItem("users") || [];

const parsedData = JSON.parse(userData);

const storeData = (data) => {
	parsedData.push(data);

	const user = JSON.stringify(parsedData);

	localStorage.setItem("users", user);
};
const checkUser = (email) => {
	let errorSpan =
		document.getElementById("error");

	if (parsedData.find((e) => e.email === email)) {
		document.getElementById("box").innerHTML =
			passwordBox;

		user = parsedData.filter(
			(e) => e.email === email
		)[0];
	} else {
		errorSpan.innerText = "ENTER CORRECT EMAIL!";
	}
};

const checkPassword = (password) => {
	let errorSpan =
		document.getElementById("error");

	if (user.password === password) {
		location.href = "/logged.html";

		localStorage.setItem(
			"user",
			JSON.stringify(user)
		);
	} else {
		errorSpan.innerText =
			"ENTER CORRECT PASSWORD!";
	}
};

var passwordBox = ` <form id="form" onsubmit="formOp(event,'password')">
<div class="col-11 ">
<label for="inputPassword" class="col-sm-5 col-form-label fw-semibold">Password</label>
<input
type="password"
class="form-control rounded-4 py-3"
id="inputPassword"
placeholder="Enter Password"
minlength="8"
required
>
<span class="small text-danger fw-semibold" id="error"></span>
</div>


<div class="col-11 justify-content-between d-flex my-4 px-4">
<a class="btn btn-secondary fw-bold col-5 my-3  py-3 rounded-pill px-2" href="/">Change Method</a>
<button class="btn btn-primary col-5 my-3 rounded-pill py-3 px-2 fw-bold" type="submit" id="signup">Next</button>
</div>
</form>`;
