// DOM Elements
const coursesContainer = document.getElementById('courses-container');
const noResultsElement = document.getElementById('no-results');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryFilter = document.getElementById('category-filter');
const timeFilter = document.getElementById('time-filter');
const sortFilter = document.getElementById('sort-filter');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const modal = document.getElementById('course-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const paginationContainer = document.getElementById('pagination');
const backToTopBtn = document.getElementById('back-to-top');
const fabMain = document.querySelector('.fab-main');
const fabOptions = document.querySelector('.fab-options');
const fabOptionBtns = document.querySelectorAll('.fab-option');
const newsletterForm = document.getElementById('newsletter-form');

// State
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let filteredCourses = [];
let currentPage = 1;
const coursesPerPage = 20; // Show all 20 courses on a single page
const currentFilters = {
    search: '',
    category: '',
    time: '',
    sort: 'default'
};

// Initialize theme
function initTheme() {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDarkMode = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkMode', isDarkMode);
        themeToggleBtn.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// Filter courses based on current filters
function filterCourses() {
    const { search, category, time, sort, featured, level } = currentFilters;
    
    filteredCourses = coursesData.filter(course => {
        // Search filter
        if (search && !course.title.toLowerCase().includes(search.toLowerCase()) && 
            !course.description.toLowerCase().includes(search.toLowerCase()) &&
            !course.instructor.toLowerCase().includes(search.toLowerCase())) {
            return false;
        }
        
        // Category filter
        if (category && course.category !== category) {
            return false;
        }
        
        // Time filter
        if (time) {
            const timeFilters = time.split(',');
            let timeMatch = false;
            
            for (const filter of timeFilters) {
                if (filter === 'short' && course.duration <= 5) timeMatch = true;
                if (filter === 'medium' && course.duration > 5 && course.duration <= 10) timeMatch = true;
                if (filter === 'long' && course.duration > 10 && course.duration <= 20) timeMatch = true;
                if (filter === 'extended' && course.duration > 20) timeMatch = true;
            }
            
            if (!timeMatch) return false;
        }
        
        // Level filter
        if (level) {
            const levelFilters = level.split(',');
            if (!levelFilters.includes(course.level)) return false;
        }
        
        // Featured filters
        if (featured === 'popular' && !course.popular) return false;
        if (featured === 'newest' && !course.newest) return false;
        if (featured === 'trending' && !course.trending) return false;
        
        return true;
    });
    
    // Sort courses
    if (sort === 'title-asc') {
        filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'title-desc') {
        filteredCourses.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sort === 'time-asc') {
        filteredCourses.sort((a, b) => a.duration - b.duration);
    } else if (sort === 'time-desc') {
        filteredCourses.sort((a, b) => b.duration - a.duration);
    } else if (sort === 'rating-desc') {
        filteredCourses.sort((a, b) => b.rating - a.rating);
    }
    
    // Update courses count
    updateCoursesCount();
    
    renderCourses();
    renderPagination();
}

// Render courses to the DOM
function renderCourses() {
    if (!coursesContainer) {
        console.error('Courses container not found');
        return;
    }
    
    if (filteredCourses.length === 0) {
        coursesContainer.innerHTML = '<div class="no-courses-message"><p>No courses match your search criteria. Try adjusting your filters.</p></div>';
        if (paginationContainer) {
            paginationContainer.innerHTML = '';
        }
        return;
    }
    
    coursesContainer.innerHTML = '';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = Math.min(startIndex + coursesPerPage, filteredCourses.length);
    const coursesToShow = filteredCourses.slice(startIndex, endIndex);
    
    coursesContainer.innerHTML = '';
    console.log('Rendering courses:', coursesToShow.length);
    
    coursesToShow.forEach(course => {
        const isFavorite = favorites.includes(course.id);
        
        // Create course card
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        
        // Handle missing properties with defaults
        const duration = course.duration || course.timeDisplay || '1 hour';
        const students = course.students || Math.floor(Math.random() * 10000) + 500;
        const rating = course.rating || 4.5;
        const price = course.price || 29.99;
        const categoryDisplay = course.categoryDisplay || course.category.replace('-', ' ');
        
        courseCard.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
                <span class="course-category">${categoryDisplay}</span>
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${course.id}" aria-label="Add to favorites">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="course-content">
                <div class="course-rating">
                    ${generateStars(rating)}
                    <span>${rating.toFixed(1)}</span>
                </div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${truncateText(course.description, 100)}</p>
                <div class="course-meta">
                    <span><i class="far fa-clock"></i> ${duration}</span>
                    <span><i class="far fa-user"></i> ${students} students</span>
                </div>
                <div class="course-footer">
                    <span class="course-price">$${price.toFixed(2)}</span>
                    <button class="view-details-btn" data-id="${course.id}">View Details</button>
                </div>
            </div>
        `;
        
        coursesContainer.appendChild(courseCard);
        
        // Add event listeners to the newly created elements
        const favoriteBtn = courseCard.querySelector('.favorite-btn');
        favoriteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite(course.id);
            favoriteBtn.classList.toggle('active');
        });
        
        const viewDetailsBtn = courseCard.querySelector('.view-details-btn');
        viewDetailsBtn.addEventListener('click', () => {
            showCourseDetails(course);
        });
    });
    
    renderPagination();
}

// Generate star ratings
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Truncate text to a specific length
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Toggle favorite status
function toggleFavorite(courseId) {
    const index = favorites.indexOf(courseId);
    if (index === -1) {
        favorites.push(courseId);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Show course details in modal
function showCourseDetails(course) {
    const isFavorite = favorites.includes(course.id);
    
    modalBody.innerHTML = `
        <div class="modal-course">
            <div class="modal-header">
                <div class="modal-image">
                    <img src="${course.image}" alt="${course.title}">
                    <span class="course-category">${course.category.replace('-', ' ')}</span>
                </div>
                <div class="modal-info">
                    <h2>${course.title}</h2>
                    <div class="course-rating">
                        ${generateStars(course.rating)}
                        <span>${course.rating.toFixed(1)} (${course.reviews} reviews)</span>
                    </div>
                    <div class="instructor">
                        <img src="${course.instructor.avatar}" alt="${course.instructor.name}">
                        <span>${course.instructor.name}</span>
                    </div>
                    <div class="course-meta">
                        <span><i class="far fa-clock"></i> ${course.duration} hours</span>
                        <span><i class="far fa-user"></i> ${course.students} students</span>
                        <span><i class="far fa-calendar-alt"></i> Last updated ${course.lastUpdated}</span>
                    </div>
                </div>
            </div>
            <div class="modal-body-content">
                <h3>About This Course</h3>
                <p>${course.description}</p>
                
                <h3>What You'll Learn</h3>
                <ul class="course-features">
                    ${course.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
                
                <h3>Course Content</h3>
                <div class="course-content-list">
                    ${course.content.map((section, index) => `
                        <div class="content-section">
                            <div class="section-header">
                                <h4>Section ${index + 1}: ${section.title}</h4>
                                <span>${section.lectures} lectures • ${section.duration} min</span>
                            </div>
                            <ul class="lectures-list">
                                ${section.lectures > 0 ? 
                                    Array(Math.min(section.lectures, 3)).fill().map((_, i) => 
                                        `<li><i class="fas fa-play-circle"></i> Lecture ${i + 1} <span>${Math.floor(Math.random() * 15) + 5} min</span></li>`
                                    ).join('') : ''
                                }
                                ${section.lectures > 3 ? `<li class="more-lectures">+ ${section.lectures - 3} more lectures</li>` : ''}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="modal-footer">
                <div class="price-container">
                    <span class="course-price">$${course.price.toFixed(2)}</span>
                    ${course.originalPrice ? `<span class="original-price">$${course.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="action-buttons">
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${course.id}">
                        <i class="fas fa-heart"></i> ${isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
                    </button>
                    <button class="enroll-btn">Enroll Now</button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners to modal elements
    const modalFavoriteBtn = modalBody.querySelector('.favorite-btn');
    modalFavoriteBtn.addEventListener('click', () => {
        toggleFavorite(course.id);
        modalFavoriteBtn.classList.toggle('active');
        if (modalFavoriteBtn.classList.contains('active')) {
            modalFavoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Saved to Favorites';
        } else {
            modalFavoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
        }
        
        // Update the card favorite button as well
        const cardFavoriteBtn = document.querySelector(`.favorite-btn[data-id="${course.id}"]`);
        if (cardFavoriteBtn) {
            cardFavoriteBtn.classList.toggle('active');
        }
    });
    
    const enrollBtn = modalBody.querySelector('.enroll-btn');
    enrollBtn.addEventListener('click', () => {
        alert(`You have successfully enrolled in "${course.title}"!`);
        modal.style.display = 'none';
    });
    
    modal.style.display = 'block';
}

// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `<button class="pagination-btn prev-page ${currentPage === 1 ? 'disabled' : ''}" ${currentPage === 1 ? 'disabled' : ''}>
        <i class="fas fa-chevron-left"></i>
    </button>`;
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
        paginationHTML += `<button class="pagination-btn page-number" data-page="1">1</button>`;
        if (startPage > 2) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `<button class="pagination-btn page-number ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }
        paginationHTML += `<button class="pagination-btn page-number" data-page="${totalPages}">${totalPages}</button>`;
    }
    
    // Next button
    paginationHTML += `<button class="pagination-btn next-page ${currentPage === totalPages ? 'disabled' : ''}" ${currentPage === totalPages ? 'disabled' : ''}>
        <i class="fas fa-chevron-right"></i>
    </button>`;
    
    paginationContainer.innerHTML = paginationHTML;
    
    // Add event listeners to pagination buttons
    const pageButtons = paginationContainer.querySelectorAll('.page-number');
    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentPage = parseInt(button.getAttribute('data-page'));
            renderCourses();
            window.scrollTo({
                top: document.querySelector('.courses-section').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    const prevPageBtn = paginationContainer.querySelector('.prev-page');
    if (prevPageBtn && !prevPageBtn.disabled) {
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderCourses();
                window.scrollTo({
                    top: document.querySelector('.courses-section').offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    const nextPageBtn = paginationContainer.querySelector('.next-page');
    if (nextPageBtn && !nextPageBtn.disabled) {
        nextPageBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderCourses();
                window.scrollTo({
                    top: document.querySelector('.courses-section').offsetTop - 100,
                    behavior: 'smooth'
                });
            }
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
        currentFilters.search = savedFilters.search || '';
        currentFilters.category = savedFilters.category || '';
        currentFilters.time = savedFilters.time || '';
        currentFilters.sort = savedFilters.sort || 'default';
        
        // Update UI to reflect saved filters
        searchInput.value = currentFilters.search;
        categoryFilter.value = currentFilters.category;
        timeFilter.value = currentFilters.time;
        sortFilter.value = currentFilters.sort;
    }
}

// Initialize floating action button
function initFloatingActionButton() {
    fabMain.addEventListener('click', () => {
        fabMain.classList.toggle('active');
        fabOptions.classList.toggle('show');
    });
    
    // Handle clicks outside to close the menu
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.floating-action-menu') && fabOptions.classList.contains('show')) {
            fabMain.classList.remove('active');
            fabOptions.classList.remove('show');
        }
    });
    
    // Handle fab option clicks
    fabOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            
            switch(action) {
                case 'search':
                    searchInput.focus();
                    document.querySelector('.search-filter-container').scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'favorites':
                    showFavoritesOnly();
                    break;
                case 'categories':
                    categoryFilter.focus();
                    break;
                case 'contact':
                    document.querySelector('.footer-section:nth-child(4)').scrollIntoView({ behavior: 'smooth' });
                    break;
            }
            
            // Close the menu after action
            fabMain.classList.remove('active');
            fabOptions.classList.remove('show');
        });
    });
}

// Show only favorited courses
function showFavoritesOnly() {
    if (favorites.length === 0) {
        alert('You have no favorite courses yet. Click the heart icon on any course to add it to your favorites.');
        return;
    }
    
    filteredCourses = coursesData.filter(course => favorites.includes(course.id));
    currentPage = 1;
    renderCourses();
    renderPagination();
}

// Initialize back to top button
function initBackToTop() {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Handle newsletter form submission
function initNewsletterForm() {
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            
            // Simulate form submission
            const submitBtn = newsletterForm.querySelector('button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
                newsletterForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    init();
    
    // Load all courses
    filteredCourses = [...coursesData];
    renderCourses();
    renderPagination();
    updateCoursesCount();
    console.log('Loaded courses:', filteredCourses.length);
    
    // Search input
    searchInput.addEventListener('input', () => {
        currentFilters.search = searchInput.value;
        currentPage = 1;
        filterCourses();
    });
    
    searchBtn.addEventListener('click', () => {
        currentFilters.search = searchInput.value;
        currentPage = 1;
        filterCourses();
    });
    
    // Trending searches
    const trendingSearches = document.querySelectorAll('.trending-searches a');
    trendingSearches.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const searchTerm = link.getAttribute('data-search');
            searchInput.value = searchTerm;
            currentFilters.search = searchTerm;
            currentPage = 1;
            filterCourses();
        });
    });
    
    // Category Cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            currentFilters.category = category;
            currentPage = 1;
            filterCourses();
            
            // Scroll to filter bar
            document.querySelector('.filter-bar').scrollIntoView({ behavior: 'smooth' });
            
            // Update active tab
            document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelector('.filter-tab[data-filter="all"]').classList.add('active');
        });
    });
    
    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Apply filter logic
            if (filter === 'all') {
                currentFilters.featured = '';
            } else if (filter === 'popular') {
                currentFilters.featured = 'popular';
            } else if (filter === 'newest') {
                currentFilters.featured = 'newest';
            } else if (filter === 'trending') {
                currentFilters.featured = 'trending';
            }
            
            currentPage = 1;
            filterCourses();
        });
    });
    
    // Sort filter
    sortFilter.addEventListener('change', () => {
        currentFilters.sort = sortFilter.value;
        currentPage = 1;
        filterCourses();
    });
    
    // View Options
    const viewOptions = document.querySelectorAll('.view-option');
    viewOptions.forEach(option => {
        option.addEventListener('click', () => {
            const view = option.getAttribute('data-view');
            viewOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const coursesGrid = document.getElementById('courses-container');
            if (view === 'list') {
                coursesGrid.classList.add('list-view');
            } else {
                coursesGrid.classList.remove('list-view');
            }
        });
    });
    
    // Reset search button
    const resetSearchBtn = document.querySelector('.reset-search-btn');
    if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentFilters = {
                search: '',
                category: '',
                time: '',
                sort: 'default',
                featured: ''
            };
            currentPage = 1;
            filterCourses();
            
            // Reset UI
            document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
            document.querySelector('.filter-tab[data-filter="all"]').classList.add('active');
            sortFilter.value = 'default';
        });
    }
    
    // Apply filters button
    const applyFiltersBtn = document.querySelector('.apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', () => {
            // Get all checked duration checkboxes
            const durationCheckboxes = document.querySelectorAll('.filter-group:nth-child(1) input[type="checkbox"]:checked');
            let timeFilter = '';
            if (durationCheckboxes.length > 0) {
                timeFilter = Array.from(durationCheckboxes).map(cb => cb.value).join(',');
            }
            currentFilters.time = timeFilter;
            
            // Get all checked level checkboxes
            const levelCheckboxes = document.querySelectorAll('.filter-group:nth-child(2) input[type="checkbox"]:checked');
            let levelFilter = '';
            if (levelCheckboxes.length > 0) {
                levelFilter = Array.from(levelCheckboxes).map(cb => cb.value).join(',');
            }
            currentFilters.level = levelFilter;
            
            currentPage = 1;
            filterCourses();
        });
    }
    
    // Reset filters button
    const resetFiltersBtn = document.querySelector('.reset-filters');
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', () => {
            // Uncheck all checkboxes
            document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
            
            currentFilters.time = '';
            currentFilters.level = '';
            currentPage = 1;
            filterCourses();
        });
    };
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
});

// Update category pills based on selected category
function updateCategoryPills(category) {
    const pills = document.querySelectorAll('.category-pill');
    pills.forEach(pill => {
        if (pill.getAttribute('data-category') === category) {
            pill.classList.add('active');
        } else {
            pill.classList.remove('active');
        }
    });
}

// Initialize the application
function init() {
    initTheme();
    loadFilterPreferences();
    // Add featured properties to courses for filtering
    addFeaturedProperties();
    filterCourses();
    renderPagination();
    initFloatingActionButton();
    initBackToTop();
    initNewsletterForm();
    updateCourseCountsByCategory();
}

// Add featured properties to courses
function addFeaturedProperties() {
    // Mark some courses as popular (high rating)
    coursesData.forEach(course => {
        // Popular courses (rating >= 4.5)
        course.popular = course.rating >= 4.5;
        
        // Newest courses (random selection of 5 courses)
        course.newest = false;
        
        // Trending courses (random selection of 5 different courses)
        course.trending = false;
        
        // Add level property if not exists
        if (!course.level) {
            const levels = ['beginner', 'intermediate', 'advanced'];
            course.level = levels[Math.floor(Math.random() * levels.length)];
        }
    });
    
    // Mark 5 random courses as newest
    const randomNewest = getRandomItems(coursesData, 5);
    randomNewest.forEach(course => course.newest = true);
    
    // Mark 5 different random courses as trending
    const remainingCourses = coursesData.filter(course => !course.newest);
    const randomTrending = getRandomItems(remainingCourses, 5);
    randomTrending.forEach(course => course.trending = true);
}

// Helper function to get random items from array
function getRandomItems(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Update course counts by category
function updateCourseCountsByCategory() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const count = coursesData.filter(course => course.category === category).length;
        const countElement = card.querySelector('.course-count');
        if (countElement) {
            countElement.textContent = `${count} Course${count !== 1 ? 's' : ''}`;
        }
    });
}

// Update the total courses count display
function updateCoursesCount() {
    const coursesCountElement = document.getElementById('courses-count');
    if (coursesCountElement) {
        coursesCountElement.textContent = filteredCourses.length;
    }
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Truncate text to a specific length
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

// Toggle favorite status of a course
function toggleFavorite(courseId) {
    const index = favorites.indexOf(courseId);
    if (index === -1) {
        favorites.push(courseId);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Show course details in modal
function showCourseDetails(course) {
    if (!modal || !modalBody) return;
    
    // Handle missing properties with defaults
    const duration = course.duration || course.timeDisplay || '1 hour';
    const students = course.students || Math.floor(Math.random() * 10000) + 500;
    const rating = course.rating || 4.5;
    const price = course.price || 29.99;
    const categoryDisplay = course.categoryDisplay || course.category.replace('-', ' ');
    const topics = course.topics || [
        'Introduction to the subject',
        'Core concepts and principles',
        'Practical applications',
        'Advanced techniques',
        'Final project'
    ];
    const prerequisites = course.prerequisites || 'No specific prerequisites required.';
    
    modalBody.innerHTML = `
        <div class="modal-course-header">
            <img src="${course.image}" alt="${course.title}">
            <div class="modal-course-overlay">
                <span class="modal-course-category">${categoryDisplay}</span>
            </div>
        </div>
        <div class="modal-course-content">
            <h2>${course.title}</h2>
            <div class="modal-course-meta">
                <div class="modal-course-rating">
                    ${generateStars(rating)}
                    <span>${rating.toFixed(1)} (${Math.floor(students/10)} reviews)</span>
                </div>
                <div class="modal-course-stats">
                    <span><i class="far fa-clock"></i> ${duration}</span>
                    <span><i class="far fa-user"></i> ${students} students</span>
                    <span><i class="far fa-calendar-alt"></i> Last updated 1 month ago</span>
                </div>
                <div class="modal-course-instructor">
                    <img src="https://randomuser.me/api/portraits/men/${course.id % 100}.jpg" alt="${course.instructor}">
                    <span>${course.instructor}</span>
                </div>
            </div>
            <div class="modal-course-description">
                <h3>About This Course</h3>
                <p>${course.detailedDescription || course.description}</p>
            </div>
            <div class="modal-course-topics">
                <h3>What You'll Learn</h3>
                <ul>
                    ${topics.map(topic => `<li><i class="fas fa-check"></i> ${topic}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-course-prerequisites">
                <h3>Prerequisites</h3>
                <p>${prerequisites}</p>
            </div>
            <div class="modal-course-actions">
                <span class="modal-course-price">$${price.toFixed(2)}</span>
                <button class="enroll-btn">Enroll Now</button>
                <button class="add-to-cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Add event listeners for modal buttons
    const enrollBtn = modalBody.querySelector('.enroll-btn');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', () => {
            alert(`You have enrolled in "${course.title}"!`);
            modal.style.display = 'none';
        });
    }
    
    const addToCartBtn = modalBody.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            alert(`"${course.title}" has been added to your cart!`);
        });
    }
}
