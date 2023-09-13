const formOp = (e, method) => {
	e.preventDefault();
	let form = e.target;
	if (method === "sign") {
		let firstName = form.firstName.value;
		let lastName = form.lastName.value;
		let email = form.Email.value;
		let password = form.inputPassword.value;
		const data = {
			firstName,
			lastName,
			email,
			password,
		};
		storeData(data);
	} else {
		console.log("login");
		let mail = form.Email.value;
		let password = form.inputPassword.value;
		checkUser(mail, password);
	}
};
const validator = (params) => {
	let par = document.getElementById(params);
	let value = par.value;
	let text = par.previousElementSibling.innerHTML;
	let regEx = /^[a-zA-Z0-9!@#$%^&*]{8}$/;
	let numEx = /\d/;
	let errorSpan = document.getElementById(
		"error" + params
	);
	if (value === "")
		errorSpan.innerText =
			text + " cannot be empty";

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
		var re =
			/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
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
		)
			errorSpan.innerHTML = "Enter a valid email";
	}
};
const userData =
	localStorage.getItem("users") || [];
const parsedData = JSON.parse(userData);
const storeData = (data) => {
	parsedData.push(data);

	const user = JSON.stringify(parsedData);
	localStorage.setItem("users", user);
};
const checkUser = (email, password) => {
	let nameDiv = document.getElementById("name");

	let emailDiv = document.getElementById("mail");

	let userDetail =
		document.getElementById("userDetail");

	let errorSpan =
		document.getElementById("error");
	if (parsedData.find((e) => e.email === email)) {
		const user = parsedData.filter(
			(e) => e.email === email
		)[0];
		if (user.password === password) {
			userDetail.classList.remove("d-none");
			errorSpan.innerText = "Logged IN!";
			nameDiv.innerHTML = `<p>Name: ${user.firstName} ${user.lastName}</p>`;
			emailDiv.innerHTML = `<p>Email: ${user.email}</p>`;
		} else {
			errorSpan.innerText = "WRONG PASS!";
			userDetail.classList.add("d-none");
		}
	} else {
		errorSpan.innerText = "WRONG EMAIl!";
		userDetail.classList.add("d-none");
	}
};
