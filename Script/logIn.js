import { MakeNotification } from "./Component.js";

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
    
    const form = e.target.elements;
    const email = form.email.value;
    const password = form.password.value;

    if (users.length > 0)
    {
        const existingUser = users.find(user => user.password === password && user.email === email);
        if (existingUser) {
            localStorage.setItem("currentUser", JSON.stringify(existingUser));
            localStorage.setItem("recently", true);
            window.location.href = "index.html";
        }
        else {
            MakeNotification("Error", "Email or password are incorrent!");
        }
    }
});