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
    videos.forEach((video) => {
        console.log(video);
        const videoCard = document.createElement('div');
        videoCard.classList = 'card';
        videoCard.innerHTML = `
          <figure class="h-[200px] relative">
    <img
      src="${video.thumbnail}"
      class="w-full h-full object-cover"
      alt="${video.title}" />
      ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute text-[10px] right-8 bottom-2 bg-black text-white text-right">${getTimeAgo(video.others.posted_date)}</span>`
            }
  </figure>
  <div class="px-0 py-8 flex gap-4">
<div> <img class="w-12 h-12 rounded-full object-cover" src="${video.authors[0].profile_picture}" /></div>
<div>
  <h2 class="font-bold">${video.title}</h2>
  <div class="flex items-center gap-2">
  <p class="text-sm text-gray-500">${video.authors[0].profile_name}</p>
    ${video.authors[0].verified === true ? `<img class="w-4 h-4" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />` : ''}
`
        videosContainer.append(videoCard);
    });
};

// create Display Categories function
const displayCategories = (data) => {
    const categoriesContainer = document.getElementById('categories');
    data.forEach((category) => {
        console.log(category);
        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = category.category;
        categoriesContainer.append(button);

    });
};

loadCategories();
loadVideos();