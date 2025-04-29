import { SideBar, Friend, MakeNotification, NewNotification } from "./Component.js";
SideBar();

let isLogIn = localStorage.getItem("currentUser") !== null;

if (!isLogIn) 
    window.location.href = "http://127.0.0.1:5500/signIn.html";

if (localStorage.getItem("recently"))
{
    MakeNotification("Success", "User registered successfully!");
    localStorage.removeItem("recently")
}

const overlay = document.getElementById("overlay");
const findFriendBtn = document.getElementById('findFriendBtn');
const closeBtn = document.getElementById('closeBtn');

findFriendBtn.addEventListener('click', () => overlay.classList.remove("hidden"));
closeBtn.addEventListener('click', () => overlay.classList.add("hidden"));

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const users = JSON.parse(localStorage.getItem("users"));

const friends = currentUser.friend;
const friendList = document.getElementById("friendList");
let currentFriend = friends.length > 0 ? friends[0] : null;
friendList.innerHTML = "";
ShowChat();
document.getElementById("closeChat").addEventListener("click", () => closeChat())

friends.forEach((friend) => 
{
    const friendItem = document.createElement("div");
    const friendElement = users.find(user => user.email === friend.email);
    friendItem.innerHTML = Friend(friendElement.username, friendElement.profilePicture || "");
    const btn = friendItem.querySelector("#btn");

    btn.addEventListener("click", () => openChat({email: friendElement.email}))
    friendList.appendChild(friendItem);
});

function openChat(friend) {
    currentFriend = friend;
    ShowChat();

    const bar = document.getElementById("FullSideBar");
    if (window.innerWidth <= 600)
    {
        bar.classList.add("SlideOut")
        setTimeout(()=>
        {
            bar.classList.add("hidden");
            bar.classList.remove("SlideOut");
        }, 500)
    }
}
function closeChat() 
{ 
    const bar = document.getElementById("FullSideBar");
    bar.classList.add("SlideIn");
    bar.classList.remove("hidden");
    setTimeout(()=>
    {
        bar.classList.remove("SlideIn");
    }, 500);
}

function ShowChat(){
    if (currentFriend === null)
        return;

    const chatElement = document.getElementById("chat");
    chatElement.innerHTML = ""

    const chats = currentUser.Notifications.filter(
        n => n.type === "chat" && 
        ((n.from === currentUser.email && n.to === currentFriend.email) ||
        (n.from === currentFriend.email && n.to === currentUser.email))
    );

    chats.sort((a, b) => new Date(a.time) - new Date(b.time));

    chats.forEach(notification => {
        const from = users.find(user => user.email === notification.from);

        const element = document.createElement("div");
        element.innerHTML = NewNotification(from.profilePicture, notification.message, from.username);

        chatElement.appendChild(element);
    });
}

document.getElementById("Text").addEventListener("keypress", (e) => 
{
    if (e.key === "Enter")
    {
        if (currentFriend == null)
        {
            MakeNotification("Error", "You dont have any friends!!")
            return;
        }

        const chat = e.target.value;

        if (chat.value === "")
        {
            MakeNotification("Error", "Type something!!")
            return;
        }

        const now = new Date();
        const Notification = {
            from: currentUser.email,
            message: chat,
            type: "chat",
            to: currentFriend.email,
            time: now
        }

        currentUser.Notifications.push(Notification);
        const userIndex = users.findIndex(user => user.email === currentFriend.email);
        if (userIndex !== -1)
            users[userIndex].Notifications.push(Notification);
        
        const currentUserIndex = users.findIndex(user => user.email === currentUser.email)
        if (userIndex !== -1)
            users[currentUserIndex].Notifications = currentUser.Notifications;
        
        updateStorage();
        ShowChat();
        document.getElementById("Text").value = "";
    }
});

const friendInput = document.getElementById("friendInput");
const friendListSearch = document.getElementById("friendListSearch");

friendInput.addEventListener("input", e => 
{
    const value = e.target.value;

    friendListSearch.innerHTML = "";

    if (value === "")
        return;

    const allUsers = users.filter(user => user.username.toLowerCase().includes(value.toLowerCase()) && user.username !== currentUser.username);

    allUsers.forEach(element => 
    {
        const newElement = document.createElement('div');
        newElement.innerHTML = `
            <div class="flex items-start justify-start bg-[#a5a5a5] rounded-full">
                <img class="w-13 rounded-full mr-5" src="${element.profilePicture || "./Src/defaultProfile.png"}" alt="">
                <p class="w-full font-bold sm:text-2xl text-lg">${element.username}</p>
                <div class="flex items-end justify-end w-[61px]">
                    <button id="addFriendBtn" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-full">Add</button>
                </div>
            </div>
        `;

        const btn = newElement.querySelector("#addFriendBtn");
        btn.addEventListener("click", () => AddFriend(element.email))

        friendListSearch.appendChild(newElement);
    });
});

function AddFriend(friendUsername) {
    const isThere = currentUser.friend.some((friend) => friend.email === friendUsername);
    
    if (isThere){
        MakeNotification("Error", `You have ${friendUsername} friend already!!`);
        return;
    }

    let userFound = false;
    users.forEach(user => 
    {
        if (user.email === friendUsername && user.email !== currentUser.email && !currentUser.friend.some(friend => friend.email === user.email)) 
        {
            user.Notifications.push({
                from: currentUser.email,
                message: `${currentUser.username} has sent you a friend request.`,
                type: "friend request"
            });
            userFound = true;
        }
    });

    if (userFound) 
    {
        MakeNotification("Success", `Friend request sent to ${friendUsername}.`)
        updateStorage();
    } 
    else 
    {
        MakeNotification("Error", `User not found.`)
    }
}

function updateStorage(){
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
}