import { SideBar, MakeNotification, NewNotification } from "./Component.js";
SideBar();

let isLogIn = localStorage.getItem("currentUser") !== null;

if (!isLogIn) {
    window.location.href = "http://127.0.0.1:5500/signIn.html";
}

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const users = JSON.parse(localStorage.getItem("users"));

function displayNotifications() {
    const notificationList = document.getElementById("notificationList");
    notificationList.innerHTML = ''; 

    if (!currentUser.Notifications || currentUser.Notifications.length === 0) {
        notificationList.innerHTML = `
            <div class="text-center text-gray-500 dark:text-gray-400 mt-4">
                No notifications available
            </div>
        `;
        return;
    }

    currentUser.Notifications.forEach(notification => {
        if (notification.type !== "friend request")
            return;

        const user = users.find(user => user.email === notification.from);
        if (!user) return;

        const notificationItem = document.createElement("div");
        notificationItem.innerHTML = NewNotification(user.profilePicture, notification.message, user.username, 
            `<button class="accept-btn sm:text-lg text-sm sm:px-6 px-3 sm:py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500">Accept</button>`,
            `<button class="reject-btn sm:text-lg text-sm sm:px-6 px-3 sm:py-2 ml-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500">Reject</button>`
        );

        const acceptBtn = notificationItem.querySelector(".accept-btn");
        const rejectBtn = notificationItem.querySelector(".reject-btn");

        acceptBtn.addEventListener("click", () => acceptFriendRequest(notification.from));
        rejectBtn.addEventListener("click", () => rejectFriendRequest(notification.from));

        notificationList.appendChild(notificationItem);
    });
}

function acceptFriendRequest(username) {
    const user = users.find(user => user.email === username);

    const friendInfo = {
        email: user.email
    };

    if (!currentUser.friend) currentUser.friend = [];
        currentUser.friend.push(friendInfo);

    const userIndex = users.findIndex(u => u.email === username);
    if (userIndex !== -1) {
        if (!users[userIndex].friend) 
            users[userIndex].friend = [];

        users[userIndex].friend.push({
            email: currentUser.email
        });
    }

    const currentUserIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        if (!users[currentUserIndex].friend) 
            users[currentUserIndex].friend = [];

            users[currentUserIndex].friend.push({
            email: users[userIndex].email
        });
    }

    removeNotification(username);

    MakeNotification("Success", `You are now friends with ${users[userIndex].username}!`);

    updateStorage();
    displayNotifications();
}

function rejectFriendRequest(username) {
    removeNotification(username);
    MakeNotification("Info", `Friend request from ${username} rejected`);
    displayNotifications();
    updateStorage();
}

function removeNotification(username) {
    let notificationIndex = currentUser.Notifications.findIndex(notification => notification.from === username);
    if (notificationIndex !== -1) {
        currentUser.Notifications.splice(notificationIndex, 1);

        const userIndex = users.findIndex(user => user.email === currentUser.email)
        if (userIndex !== -1)
            users[userIndex].Notifications = currentUser.Notifications || [];
    }
}

function updateStorage() {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("users", JSON.stringify(users));
}

displayNotifications();