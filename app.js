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
const featuredCarousel = document.getElementById('featured-carousel');
const carouselIndicators = document.getElementById('carousel-indicators');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const paginationContainer = document.getElementById('pagination');
const categoryCards = document.querySelectorAll('.category-card');
// const scrollIndicator = document.querySelector('.scroll-indicator'); // Removed
const exploreCourseBtn = document.querySelector('.primary-btn');
const mainContent = document.querySelector('.main-content');
const fabMain = document.querySelector('.fab-main');
const fabOptions = document.querySelector('.fab-options');
const fabOptionBtns = document.querySelectorAll('.fab-option');
const backToTopBtn = document.getElementById('back-to-top');
const newsletterForm = document.getElementById('newsletter-form');

// State
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let filteredCourses = [...coursesData];
let currentFilters = {
    search: '',
    category: 'all',
    time: 'all',
    sort: 'default'
};
let currentPage = 1;
const coursesPerPage = 6;
let carouselPosition = 0;
let featuredCourses = [];
const visibleSlides = window.innerWidth < 768 ? 1 : 3;

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

// Show course details in modal
function showCourseDetails(course) {
    // Create modal content
    modalBody.innerHTML = `
        <div class="course-detail-header">
            <div class="course-detail-image">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="course-detail-info">
                <h2>${course.title}</h2>
                <div class="course-detail-meta">
                    <span><i class="fas fa-tag"></i> ${course.categoryDisplay}</span>
                    <span><i class="far fa-clock"></i> ${course.timeDisplay}</span>
                    <span><i class="fas fa-user"></i> ${course.instructor}</span>
                </div>
                <button class="favorite-btn ${favorites.includes(course.id) ? 'active' : ''}" data-id="${course.id}">
                    <i class="fas fa-heart"></i> ${favorites.includes(course.id) ? 'Favorited' : 'Add to Favorites'}
                </button>
            </div>
        </div>
        <div class="course-detail-description">
            <p>${course.detailedDescription}</p>
        </div>
        <div class="course-detail-content">
            <h3>What You'll Learn</h3>
            <ul>
                ${course.topics.map(topic => `<li><i class="fas fa-check-circle"></i> ${topic}</li>`).join('')}
            </ul>
            <h3>Prerequisites</h3>
            <p>${course.prerequisites}</p>
            <button class="enroll-btn">Enroll in Course</button>
        </div>
    `;
    
    // Add event listener to the favorite button in the modal
    const modalFavoriteBtn = modalBody.querySelector('.favorite-btn');
    modalFavoriteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleFavorite(course.id);
        if (favorites.includes(course.id)) {
            modalFavoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Favorited';
            modalFavoriteBtn.classList.add('active');
        } else {
            modalFavoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
            modalFavoriteBtn.classList.remove('active');
        }
    });
    
    // Add event listener to the enroll button
    const enrollBtn = modalBody.querySelector('.enroll-btn');
    enrollBtn.addEventListener('click', () => {
        alert(`You have successfully enrolled in ${course.title}!`);
    });
    
    // Show the modal with animation
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Initialize featured courses
function initFeaturedCourses() {
    // Select 5 courses for the featured carousel
    featuredCourses = [...coursesData]
        .sort(() => 0.5 - Math.random()) // Shuffle array
        .slice(0, 5); // Take first 5 items
    
    renderCarousel();
}

// Render carousel
function renderCarousel() {
    featuredCarousel.innerHTML = '';
    carouselIndicators.innerHTML = '';
    
    featuredCourses.forEach((course, index) => {
        // Create carousel item
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        carouselItem.innerHTML = `
            <div class="course-image">
                <img src="${course.image}" alt="${course.title}">
            </div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description.substring(0, 100)}...</p>
                <div class="course-meta">
                    <span class="course-category">${course.categoryDisplay}</span>
                    <span class="course-time"><i class="far fa-clock"></i> ${course.timeDisplay}</span>
                </div>
            </div>
        `;
        
        // Add event listener to show course details
        carouselItem.addEventListener('click', () => {
            showCourseDetails(course);
        });
        
        featuredCarousel.appendChild(carouselItem);
        
        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === carouselPosition ? 'active' : ''}`;
        indicator.addEventListener('click', () => {
            moveToSlide(index);
        });
        
        carouselIndicators.appendChild(indicator);
    });
    
    updateCarouselPosition();
}

// Move carousel to previous slide
function prevSlide() {
    carouselPosition = (carouselPosition - 1 + featuredCourses.length) % featuredCourses.length;
    updateCarouselPosition();
}

// Move carousel to next slide
function nextSlide() {
    carouselPosition = (carouselPosition + 1) % featuredCourses.length;
    updateCarouselPosition();
}

// Move to specific slide
function moveToSlide(position) {
    carouselPosition = position;
    updateCarouselPosition();
}

// Update carousel position
function updateCarouselPosition() {
    const slideWidth = featuredCarousel.querySelector('.carousel-item').offsetWidth + 20; // 20px for gap
    featuredCarousel.style.transform = `translateX(-${carouselPosition * slideWidth}px)`;
    
    // Update indicators
    const indicators = carouselIndicators.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === carouselPosition);
    });
}

// Auto-advance carousel - disabled as per user request
function startCarouselAutoplay() {
    // Function kept for compatibility but does nothing now
    return null;
}

// Filter and sort courses based on current filters
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
    
    // Sort courses based on selected sort option
    sortCourses();
    
    // Reset to first page when filters change
    currentPage = 1;
    
    renderCourses();
    renderPagination();
}

// Sort courses based on current sort filter
function sortCourses() {
    switch(currentFilters.sort) {
        case 'title-asc':
            filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            filteredCourses.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'time-asc':
            const timeOrder = { 'short': 1, 'medium': 2, 'long': 3, 'extended': 4 };
            filteredCourses.sort((a, b) => timeOrder[a.timeToComplete] - timeOrder[b.timeToComplete]);
            break;
        case 'time-desc':
            const timeOrderDesc = { 'short': 1, 'medium': 2, 'long': 3, 'extended': 4 };
            filteredCourses.sort((a, b) => timeOrderDesc[b.timeToComplete] - timeOrderDesc[a.timeToComplete]);
            break;
        default:
            // Default sorting (by ID)
            filteredCourses.sort((a, b) => a.id - b.id);
    }
}

// Render courses based on current filters and pagination
function renderCourses() {
    if (coursesContainer) {
        coursesContainer.innerHTML = '';
        
        if (filteredCourses.length === 0) {
            if (noResultsElement) {
                noResultsElement.style.display = 'block';
            }
            return;
        }
        
        if (noResultsElement) {
            noResultsElement.style.display = 'none';
        }
        
        // Calculate pagination
        const startIndex = (currentPage - 1) * coursesPerPage;
        const endIndex = Math.min(startIndex + coursesPerPage, filteredCourses.length);
        const coursesToShow = filteredCourses.slice(startIndex, endIndex);
        
        coursesToShow.forEach(course => {
            const courseCard = createCourseCard(course);
            coursesContainer.appendChild(courseCard);
        });
    }
}

// Render pagination controls
function renderPagination() {
    if (paginationContainer) {
        paginationContainer.innerHTML = '';
        
        const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
        
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }
        
        paginationContainer.style.display = 'flex';
        
        // Previous button
        const prevButton = document.createElement('button');
        prevButton.classList.add('pagination-btn');
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderCourses();
                renderPagination();
                window.scrollTo({ top: coursesContainer.offsetTop - 100, behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(prevButton);
        
        // Page numbers
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.classList.add('pagination-btn');
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderCourses();
                renderPagination();
                window.scrollTo({ top: coursesContainer.offsetTop - 100, behavior: 'smooth' });
            });
            paginationContainer.appendChild(pageButton);
        }
        
        // Next button
        const nextButton = document.createElement('button');
        nextButton.classList.add('pagination-btn');
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderCourses();
                renderPagination();
                window.scrollTo({ top: coursesContainer.offsetTop - 100, behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(nextButton);
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

// Close modal
function closeModalFunc() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Toggle mobile menu
function toggleMobileMenu() {
    navLinks.classList.toggle('show');
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

sortFilter.addEventListener('change', (e) => {
    currentFilters.sort = e.target.value;
    filterCourses();
    saveFilterPreferences();
});

// Carousel event listeners
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

themeToggleBtn.addEventListener('click', toggleTheme);

// Modal event listeners
closeModal.addEventListener('click', closeModalFunc);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Escape key closes modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModalFunc();
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('show') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.mobile-menu-btn')) {
        navLinks.classList.remove('show');
    }
});

// Close mobile menu when window is resized to desktop size
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
    }
});

// Handle category card click
function handleCategoryCardClick() {
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            categoryFilter.value = category;
            currentFilters.category = category;
            filterCourses();
            saveFilterPreferences();
            
            // Scroll to courses section
            document.querySelector('.courses-section').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Handle scroll indicator click
function handleScrollIndicatorClick() {
    // Removed
}

// Add animation on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.stat-item, .category-card, .testimonial');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
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
                    document.querySelector('.categories-section').scrollIntoView({ behavior: 'smooth' });
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
    document.querySelector('.courses-section').scrollIntoView({ behavior: 'smooth' });
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

// Initialize the application
function init() {
    initTheme();
    loadFilterPreferences();
    initFeaturedCourses();
    filterCourses();
    renderPagination();
    handleCategoryCardClick();
    // handleScrollIndicatorClick(); // Removed
    initScrollAnimations();
    initFloatingActionButton();
    initBackToTop();
    initNewsletterForm();
    
    // No carousel autoplay - only manual navigation
    
    // Handle window resize for carousel
    window.addEventListener('resize', () => {
        updateCarouselPosition();
    });
}

// Start the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
