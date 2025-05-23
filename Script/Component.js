export function SideBar(alt="none"){
    const sideBar = document.createElement('div');
    sideBar.className = 'flex flex-col items-center w-16 h-screen py-8 space-y-8 bg-white dark:bg-gray-900 dark:border-gray-700';
    sideBar.innerHTML = `
        <img class="w-auto h-9" src="./Src/whatsapp.png" alt="">
        
        <a href="index.html" class="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
        </a>
    
        <a href="notifications.html" class="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
        </a>
    
        <a href="settings.html" class="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </a>

        <button id="logOut" class="p-1.5 text-gray-500 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-400 dark:hover:bg-gray-800 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"></path>
            </svg>
        </button>
    `;

    sideBar.querySelector('#logOut').addEventListener('click', logOut);

    document.getElementById('aside').appendChild(sideBar);
}

export function Friend(username, src, f) {
    return `
        <button id="btn" class="flex items-center w-full px-5 py-2 transition-colors duration-200 hover:bg-gray-800 gap-x-2 focus:outline-none">
            <img class="object-cover w-8 h-8 rounded-full" src="${src || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAtAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQQFBgMCB//EADQQAQACAQMABgcGBwAAAAAAAAABAgMEBREhMUFRYXESFSIyQlKSEzRygaHBJDNigpHR8P/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/RAG2QAAAAAAOnnv8lrT7fqM8RatYrWe2xqqpy1q7NE+/mnnwhNtlr8OaerthNGRyLeo23PgjnovH9Kp/wBwugAIAAAAAAAAAAAAAAAt7Zgrn1PFo5rXpnkVc2rQRWv2+Xpm3VHc1SISwqAAGduWhjLX7XDEReOuO9okxzAjkxc3XBGn1HsRxW/UptgAIAAAAAAAAAAAAS2djx+jgveeu08QxZdBs/3GvHfKVV4QllRCQAAGdvVJtpYtHHs262I6Dc450WXns4c8qADSAAAAAAAAAAAAIlu7LeLaP0Y+G0xLDaGzZ4x55x26rx0eaVW6ISyoAACJBR3e8U0don4piGDDS3vNF71xR8PTLMaiJAVAAAAAAAAAAAABNZmtotWeJjtQFV0Wg1ddTi56r196JW3K4c+TDki+O0xMdne2tPuuDJERkn0Ld0sK0B81yUtHNbRMeElsla+9aI85B9Sq67VV0uGbTPtz7sd7yzbpp6RMUmbz4QxtRnvqMnp5J6eyOyFkHnktOTJa8zzMzygGkABAAAAAAAAAAAExE2nikTNuyIFQL2n2vNliJyexH6r1NowR71rzPnwmmMPhEw6D1Vpfkt9UnqrS/Jb6pTVYHpWjqmY/NMzMx0zM/m3vVWk+S31SeqtL8lvqk0c/E9ieG/6q0vyW+qSdq0vZW0f3LqYwBtX2bDPu5MkefEq2XaM9f5Vq3j/EmmM4fWXFlxWiuWk0nxfKgAIAAAAAAA9dPhtnyxSnXPX4Cp02nvqcnoUjzmeqG9pNHj01I4rE37bd770+CmCkUpHHj3vZnRHUkEUAAAAAAQkB55cVMtJpkrFqz3sPX6C2mmb0mbYv1h0D5tWJrNZjmJ7JWUcoLW4aWdLm4j+Xbpr/AKVWkABAAAAUbez6b7LFOa8e1fqjuhkafFObNTHHxTES6isRWsRHVEcM0SAigAAAAAAAAAAAK2vwRqNNakR7UdNfNzfn1usczrqfZ6vLX+pYleIDSAAAALu0V51tfCJl0DD2OP4u891P3huM1oAQAAAAAAAAAAAAHPbvHGuv4xDoWBvMfxs+NYWJVEBpAAAAGjsf3q/4P3huAzWgBAAAAAAAAAAAAAYO8/fo/BCRYM8BpAAR/9k="}" alt="">
            
            <div class="text-left rtl:text-right">
                <h1 class="text-sm font-mediu capitalize text-white">${username}</h1>
            </div>
        </button>
    `;
}

export function MakeNotification(type, message) {
    const element = document.createElement("div");
    const container = document.getElementById("Notification");
    let color = "emerald-500";
    let icon = `<svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                </svg>`;
    if (type === "Error"){
        color = "red-500";
        icon = `<svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                </svg>`
    }
    else if (type === "Info") {
        color = "blue-500";
        icon = `<svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
                </svg>`
    }

    element.innerHTML = `
        <div class="flex w-full max-w-sm overflow-hidden rounded-lg shadow-md bg-gray-800">
            <div class="flex items-center justify-center w-12 bg-${color}">
                ${icon}
            </div>

            <div class="px-4 py-2 -mx-3">
                <div class="mx-3">
                    <span class="font-semibold text-${color}">${type}</span>
                    <p class="text-sm text-gray-200">${message}</p>
                </div>
            </div>
        </div>
    `;

    container.appendChild(element);
    element.classList.add("FadeIn");

    setTimeout(() => {
        element.classList.remove("FadeIn");
        element.classList.add("FadeOut");

        setTimeout(() => {
            element.remove();
        }, 410);

    }, 2500);
}

export function NewNotification(profilePicture, message, username, ...other)
{
    return `
        <div class="w-full mt-14 mb-16 px-3 py-4 rounded-lg shadow-lg bg-gray-800">
            <div class="flex -mt-16 justify-end">
                <img class="object-cover w-20 h-20 border-2 rounded-full border-blue-400" 
                    alt="Profile avatar" 
                    src="${profilePicture || "./Src/defaultProfile.png"}">
            </div>
                
            <p class="mt-2 mb-2 text-sm text-gray-200">${message}</p>
            <div class="flex justify-end">
                ${other.map(element => element).join("")}

                <span class="pl-3 py-2 text-lg font-medium text-blue-300">From ${username}</span>
            </div>
        </div>
    `
}

export function PasswordValidation(password)
{
    const hasLowercase = /[a-z]/;
    const hasUppercase = /[A-Z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < 6){
        MakeNotification("Error", "Password must be at least 6 characters long!")
        return false;
    }
    if (!hasLowercase.test(password)) {
        MakeNotification("Error", "Password must contain at least one lowercase letter!");
        return false;
    }
    if (!hasUppercase.test(password)) {
        MakeNotification("Error", "Password must contain at least one uppercase letter!");
        return false;
    }
    if (!hasNumber.test(password)) {
        MakeNotification("Error", "Password must contain at least one number!");
        return false;
    }
    if (!hasSpecialChar.test(password)) {
        MakeNotification("Error", "Password must contain at least one special character!");
        return false;
    }
    
    return true;
}

function logOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "http://127.0.0.1:5500/signIn.html";
}