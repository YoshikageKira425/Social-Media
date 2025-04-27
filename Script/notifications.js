import { SideBar } from "./Component.js";
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
        notificationItem.innerHTML = `
            <div class="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <div class="flex justify-center -mt-16 md:justify-end">
                    <img class="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" 
                         alt="Profile avatar" 
                         src="${user.profilePicture || "./Src/defaultProfile.png"}">
                </div>
                
                <p class="mt-2 text-sm text-gray-600 dark:text-gray-200">${notification.message}</p>
                
                <div class="flex justify-end mt-4">
                    <button class="accept-btn px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500">Accept</button>
                    <button class="reject-btn ml-2 px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500">Reject</button>
                    <span class="pl-3 py-2 text-lg font-medium text-blue-600 dark:text-blue-300">${user.username}</span>
                </div>
            </div>
        `;

        const acceptBtn = notificationItem.querySelector(".accept-btn");
        const rejectBtn = notificationItem.querySelector(".reject-btn");

        acceptBtn.addEventListener("click", () => acceptFriendRequest(notification.from));
        rejectBtn.addEventListener("click", () => rejectFriendRequest(notification.from));

        notificationList.appendChild(notificationItem);
    });
}

function acceptFriendRequest(username) {
    try {
        const user = users.find(user => user.email === username);
        if (!user) throw new Error("User not found");

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

        showToast(`You are now friends with ${users[userIndex].username}!`, 'success');

        updateStorage();
        displayNotifications();
    } catch (error) {
        console.error('Error accepting friend request:', error);
        showToast('Failed to accept friend request', 'error');
    }
}

function rejectFriendRequest(username) {
    try {
        removeNotification(username);
        showToast(`Friend request from ${username} rejected`, 'info');
        displayNotifications();
        updateStorage();
    } catch (error) {
        console.error('Error rejecting friend request:', error);
        showToast('Failed to reject friend request', 'error');
    }
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

function showToast(message, type = 'info') {
    alert(message);
}

displayNotifications();