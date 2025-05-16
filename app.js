// DOM Elements
const coursesContainer = document.getElementById('courses-container');
const noResultsElement = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryFilter = document.getElementById('category-filter');
const timeFilter = document.getElementById('time-filter');
const themeToggleBtn = document.getElementById('theme-toggle-btn');

// State
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let filteredCourses = [...coursesData];
let currentFilters = {
    search: '',
    category: 'all',
    time: 'all'
};

// Check for saved theme preference or use system preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
    }
}

// Toggle between light and dark theme
function toggleTheme() {
    if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
    } else {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
    }
}

// Create course card element
function createCourseCard(course) {
    const isFavorite = favorites.includes(course.id);
    
    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.setAttribute('data-id', course.id);
    courseCard.setAttribute('data-category', course.category);
    courseCard.setAttribute('data-time', course.timeToComplete);
    
    courseCard.innerHTML = `
        <div class="course-image">
            <img src="${course.image}" alt="${course.title}">
        </div>
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${course.id}">
            <i class="fas ${isFavorite ? 'fa-heart' : 'fa-heart'}"></i>
        </button>
        <div class="course-content">
            <h3 class="course-title">${course.title}</h3>
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                <span class="course-category">${course.categoryDisplay}</span>
                <span class="course-time"><i class="far fa-clock"></i> ${course.timeDisplay}</span>
            </div>
        </div>
    `;
    
    // Add event listener to favorite button
    const favoriteBtn = courseCard.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(course.id);
    });
    
    // Make the entire card clickable to show more details
    courseCard.addEventListener('click', () => {
        showCourseDetails(course);
    });
    
    return courseCard;
}

// Toggle favorite status
function toggleFavorite(courseId) {
    const index = favorites.indexOf(courseId);
    
    if (index === -1) {
        favorites.push(courseId);
    } else {
        favorites.splice(index, 1);
    }
    
    // Save to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Update UI
    const btn = document.querySelector(`.favorite-btn[data-id="${courseId}"]`);
    btn.classList.toggle('active');
}

// Show course details (could be expanded to show a modal with more info)
function showCourseDetails(course) {
    console.log('Showing details for:', course.title);
    // This could be expanded to show a modal with more course details
    // For now, we'll just toggle a 'selected' class
    
    const cards = document.querySelectorAll('.course-card');
    cards.forEach(card => card.classList.remove('selected'));
    
    const selectedCard = document.querySelector(`.course-card[data-id="${course.id}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
}

// Filter courses based on current filters
function filterCourses() {
    filteredCourses = coursesData.filter(course => {
        // Filter by search term
        const searchMatch = course.title.toLowerCase().includes(currentFilters.search.toLowerCase()) || 
                           course.description.toLowerCase().includes(currentFilters.search.toLowerCase());
        
        // Filter by category
        const categoryMatch = currentFilters.category === 'all' || course.category === currentFilters.category;
        
        // Filter by time
        const timeMatch = currentFilters.time === 'all' || course.timeToComplete === currentFilters.time;
        
        return searchMatch && categoryMatch && timeMatch;
    });
    
    renderCourses();
}

// Render courses to the DOM
function renderCourses() {
    // Clear the container
    coursesContainer.innerHTML = '';
    
    // Show no results message if no courses match filters
    if (filteredCourses.length === 0) {
        noResultsElement.style.display = 'block';
    } else {
        noResultsElement.style.display = 'none';
        
        // Add animation class to container
        coursesContainer.classList.add('fade-in');
        
        // Create and append course cards with staggered animation
        filteredCourses.forEach((course, index) => {
            const courseCard = createCourseCard(course);
            courseCard.style.animationDelay = `${index * 0.05}s`;
            coursesContainer.appendChild(courseCard);
        });
    }
}

// Save filter preferences to localStorage
function saveFilterPreferences() {
    localStorage.setItem('filterPreferences', JSON.stringify(currentFilters));
}

// Load filter preferences from localStorage
function loadFilterPreferences() {
    const savedFilters = JSON.parse(localStorage.getItem('filterPreferences'));
    
    if (savedFilters) {
        currentFilters = savedFilters;
        
        // Update UI to reflect saved filters
        searchInput.value = currentFilters.search;
        categoryFilter.value = currentFilters.category;
        timeFilter.value = currentFilters.time;
    }
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    currentFilters.search = e.target.value;
    filterCourses();
    saveFilterPreferences();
});

searchBtn.addEventListener('click', () => {
    filterCourses();
});

categoryFilter.addEventListener('change', (e) => {
    currentFilters.category = e.target.value;
    filterCourses();
    saveFilterPreferences();
});

timeFilter.addEventListener('change', (e) => {
    currentFilters.time = e.target.value;
    filterCourses();
    saveFilterPreferences();
});

themeToggleBtn.addEventListener('click', toggleTheme);

// Initialize the application
function init() {
    initTheme();
    loadFilterPreferences();
    filterCourses();
}

// Start the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
