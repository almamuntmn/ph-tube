// 1. fetch categories on html load
console.log('Fetching categories on page load');
// create load categories function
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((response) => response.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.error('Error fetching categories:', error));
}

function getTimeAgo(time) {
    const hours = parseInt((time % 86400) / 3600);
    const minutes = parseInt((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds ago`;
}

const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then((response) => response.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log('Error fetching videos:', error));
}

const loadCategoryVideos = (categoryId) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${categoryId}`)
        .then((response) => response.json())
        .then((data) => {
            // Clear previous active button
            const previousActiveButton = document.querySelector('.category-btn.active');
            if (previousActiveButton) {
                previousActiveButton.classList.remove('active');
            }
            // Set the clicked button as active
            const activeButton = document.getElementById(`btn${categoryId}`);
            activeButton.classList.add('active');
            displayVideos(data.category);
        })
        .catch((error) => console.log('Error fetching category videos:', error));
}

// const cardDemo = {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// };

const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = ''; // Clear previous cards

    if (videos.length === 0) {
        videosContainer.classList.remove('grid');
        videosContainer.innerHTML = `
        <div class="min-h-screen flex flex-col items-center justify-center">
            <img src="assets/Icon.png" alt="Oops!! Sorry, There is no Content here" class="w-48 h-48 mb-4">
        <p class="text-3xl text-center text-gray-500">Oops!! Sorry, There is no Content here</p>
        </div>`;
        return;
    }
        else {
        videosContainer.classList.add('grid');
    }

    videos.forEach((video) => {
        const videoCard = document.createElement('div');
        videoCard.className = 'card w-full bg-base-100 shadow-sm'; // Important fix

        videoCard.innerHTML = `
            <figure class="h-[200px] relative">
                <img src="${video.thumbnail}" class="w-full h-full object-cover" alt="${video.title}" />
                ${
                    video.others.posted_date?.length === 0
                        ? ''
                        : `<span class="absolute text-[10px] right-2 bottom-2 bg-black text-white px-2 py-1 rounded">${getTimeAgo(video.others.posted_date)}</span>`
                }
            </figure>
            <div class="card-body">
                <div class="flex gap-4">
                    <img class="w-12 h-12 rounded-full object-cover" src="${video.authors[0].profile_picture}" alt="author" />
                    <div>
                        <h2 class="font-bold text-base">${video.title}</h2>
                        <div class="flex items-center gap-2">
                            <p class="text-sm text-gray-500">${video.authors[0].profile_name}</p>
                            ${
                                video.authors[0].verified
                                    ? `<img class="w-4 h-4" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt="verified" />`
                                    : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;

        videosContainer.appendChild(videoCard);
    });
};

// create Display Categories function
const displayCategories = (data) => {
    const categoriesContainer = document.getElementById('categories');
    data.forEach((item) => {
const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id="btn${item.category_id}" onclick="loadCategoryVideos('${item.category_id}')" class="btn category-btn">
                ${item.category}
            </button>
        `;
        categoriesContainer.append(buttonContainer);

    });
};

loadCategories();
loadVideos();