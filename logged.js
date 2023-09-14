let nameDiv = document.getElementById("name");

let emailDiv = document.getElementById("mail");

let box = document.getElementById("userDetail");

let user = localStorage.getItem("user");

let logoutDiv = document.getElementById("logout");

if (user === null) {
	box.innerHTML = `<h5 class="fw-bold">User not logged in redirecting you to sign up page...</h5>`;

	setTimeout(() => {
		location.href = "/";
	}, 3000);
} else {
	let userData = JSON.parse(user);

	logoutDiv.innerHTML = ` <button class="btn btn-primary rounded-pill py-3 px-2 fw-bold col-12" onclick="logout()">Logout</button> `;

	nameDiv.innerHTML = `<p class="display-6 fw-semibold">Name: ${userData.firstName} ${userData.lastName}</p>`;

	emailDiv.innerHTML = `<p class="h4 fw-semibold">Email: ${userData.email}</p>`;
}
const logout = () => {
	localStorage.removeItem("user");

	location.href = "/"; 	
};
