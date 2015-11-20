function greeter(person: string) {
    return "Hello, " + person;
}

var user;

if (Math.random() > 0.5) {
	user = "Pollock";
} else {
	user = [123]
}

document.body.innerHTML = greeter(user);
