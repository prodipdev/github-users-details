// get api data
const loadUser = async (username) => {
    const url = `https://api.github.com/users/${username}`
    console.log(url)
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayUser(data);
    }
    catch (error) {
        console.log(error);
    }
}
// search field event listener
document.getElementById('search-btn').addEventListener('click', () => {
    const inputField = document.getElementById('input-field');
    loadUser(inputField.value);
    inputField.value = '';
})
// display api data
const displayUser = user => {
    console.log(user);
    const userContainer = document.getElementById("user-container");
    // check api data
    if (user.message === "Not Found") {
        userContainer.innerHTML = `
        <h1 class="text-center"><i class="fa-solid fa-triangle-exclamation mr-2"></i>search valid username</h1>
        `
        return;
    } else if (user.message) {
        userContainer.innerHTML = `
        <h1 class="text-center"><i class="fa-solid fa-triangle-exclamation mr-2"></i>API rate limit exceeded</h1>
        `
        return;
    }
    // set api data in html layout
    userContainer.innerHTML = `
    <div class="mx-auto">
        <img src="${user.avatar_url}" class="rounded-full ring-4 w-40">
    </div>
    <div>
        <div class="sm:flex justify-between gap-5 text-center">
            <div>
                <h3 class="text-2xl font-bold text-white">${user.name}</h3>
                <a href="${user.html_url}" class="text-base text-purple-500">${user.login}</a>
                <p>${user.bio ? user.bio : ''}</p>
            </div>
            <p>${user.created_at}</p>
        </div>
        <div class="flex gap-5 justify-between mt-5">
            <div>
                <p>Repos</p>
                <h3 class="text-2xl text-center font-semibold text-white">${user.public_repos}</h3>
            </div>
            <div>
                <p>Followers</p>
                <h3 class="text-2xl text-center font-semibold text-white">${user.followers}</h3>
            </div>
            <div>
                <p>Following</p>
                <h3 class="text-2xl text-center font-semibold text-white">${user.following}</h3>
            </div>
        </div>
        <div class="flex gap-5 justify-between mt-5">
            <div>
                <div class="flex gap-2 items-center">
                    <i class="fa-solid fa-location-dot text-white"></i>
                    <p>${user.location ? user.location : 'not found'}</p>
                </div>
                <div class="flex gap-2 mt-3 items-center">
                    <i class="fa-solid fa-link text-white"></i>
                    <p>${user.blog ? user.blog : 'not found'}</p>
                </div>
            </div>
            <div>
                <div class="flex gap-2 items-center">
                    <i class="fa-brands fa-twitter text-white"></i>
                    <p>${user.twitter_username ? user.twitter_username : 'not found'}</p>
                </div>
                <div class="flex gap-2 mt-3 items-center">
                    <i class="fa-solid fa-industry text-white"></i>
                    <p>${user.company ? user.company : 'not found'}</p>
                </div>
            </div>
        </div>
    </div>
    `
}

loadUser("github");