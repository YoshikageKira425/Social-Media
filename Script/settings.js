import { SideBar } from "./Component.js";
SideBar();

let isLogIn = localStorage.getItem("currentUser") !== null;

if (!isLogIn) 
    window.location.href = "http://127.0.0.1:5500/signIn.html";

const users = JSON.parse(localStorage.getItem("users"));
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

updateUi();

document.getElementById("EditUsername").addEventListener("click", () => 
{
    if (document.getElementById("usernameInput").classList.contains("hidden")) 
        document.getElementById("usernameInput").classList.remove("hidden");
    else 
        document.getElementById("usernameInput").classList.add("hidden");
});
document.getElementById("usernameInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const newUsername = e.target.value.trim();
        
        if (!newUsername) {
            alert("Username cannot be empty!");
            return;
        }

        if (users.some(user => user.username === newUsername && user.username !== currentUser.username)) {
            alert("Username already taken!");
            return;
        }

        const userIndex = users.findIndex(user => user.username === currentUser.username);
        if (userIndex !== -1) {
            users[userIndex].username = newUsername;
        }

        currentUser.username = newUsername;

        updateData();
        updateUi();

        alert("Username updated successfully!");
        e.target.value = "";
        e.target.classList.add("hidden");
    }
});

document.getElementById("EditProfile").addEventListener("click", () => 
{
    if (document.getElementById("profileInput").classList.contains("hidden")) 
        document.getElementById("profileInput").classList.remove("hidden");
    else 
        document.getElementById("profileInput").classList.add("hidden");
});
document.getElementById("profileInput").addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            currentUser.profilePicture = imageUrl;
            const userIndex = users.findIndex(user => user.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex].profilePicture = imageUrl;
            }

            document.getElementById("profileImage").src = imageUrl;

            updateData();
            alert("Profile picture updated successfully!");
        };
        
        reader.readAsDataURL(file); 
    }
});
const oldPassword = document.getElementById("oldPassword")
const newPassword = document.getElementById("newPassword");
document.getElementById("EditPassword").addEventListener("click", e =>
{
    document.getElementById("overlay").classList.remove("hidden")
    if (oldPassword.classList.contains("hidden"))
        oldPassword.classList.remove("hidden");
    if (!newPassword.classList.contains("hidden"))
        newPassword.classList.add("hidden");
});
document.getElementById("closeBtn").addEventListener("click", e => document.getElementById("overlay").classList.add("hidden"));
oldPassword.addEventListener("keyup", e => 
{
    const value = e.target.value;
    if (e.key === "Enter"){
        if (value === "")
        {
            alert("Type a password!!");
            return;
        }
    
        if (value !== currentUser.password)
        {
            alert("You type the wrong password!!!")
            return;
        }
    
        oldPassword.classList.add("hidden");
        newPassword.classList.remove("hidden");
        alert("Now type the new password!!!")
    }
})
newPassword.addEventListener("keyup", e => 
{
    const value = e.target.value;
    if (e.key === "Enter")
    {
        if (value === "")
        {
            alert("Type a password!!");
            return;
        }
        
        currentUser.password = value;
        const userIndex = users.findIndex(user => user.email === currentUser.email);
        if (userIndex !== -1)
            users[userIndex].password = value;
        
        updateData();
        
        alert("You updated your password!!");
        document.getElementById("overlay").classList.add("hidden");
    }
})

function updateData()
{
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("users", JSON.stringify(users));
}
function updateUi()
{
    document.getElementById("profileImage").src = currentUser.profilePicture || "./Src/defaultProfile.png";
    document.getElementById("profileName").innerText = currentUser.username;
}