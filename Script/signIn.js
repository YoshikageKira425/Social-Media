document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    
    const form = e.target.elements;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
    const passwordConfirm = form.passwordConfirm.value;

    if (password !== passwordConfirm) {
        alert("Passwords do not match!");
        return;
    }

    if (users.length > 0)
    {
        const existingUser = users.find(user => user.username === username || user.email === email);
        if (existingUser) {
            alert("Username or email already exists!");
            return;
        }
    }
    
    const newUser = {
        username: username,
        email: email,
        password: password,
        profilePicture: "",
        friend: [],
        Notifications: [],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("User registered successfully!");

    localStorage.setItem("currentUser", JSON.stringify(newUser));
    window.location.href = "index.html";
});