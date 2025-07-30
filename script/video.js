// 1. fetch categories on html load
console.log('Fetching categories on page load');
// create load categories function
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then((response) => response.json())
.then((data) => displayCategories(data.categories))
.catch((error) => console.error('Error fetching categories:', error));
}

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