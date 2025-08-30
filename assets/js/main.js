// Enhanced Navigation Functionality
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.isMenuOpen = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffect();
        this.setupDropdowns();
    }

    setupEventListeners() {
        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
    }

    setupScrollEffect() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class for styling
            if (currentScrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }

    setupDropdowns() {
        // Mobile dropdown handling
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const dropdown = item.querySelector('.dropdown');
            
            if (dropdown) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        this.toggleDropdown(dropdown);
                    }
                });
            }
        });
    }

    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.navMenu.classList.toggle('active', this.isMenuOpen);
        
        // Update hamburger icon
        const icon = this.hamburger.querySelector('i');
        icon.className = this.isMenuOpen ? 'fas fa-times' : 'fas fa-bars';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.navMenu.classList.remove('active');
        
        // Reset hamburger icon
        const icon = this.hamburger.querySelector('i');
        icon.className = 'fas fa-bars';
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Close all dropdowns
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => dropdown.classList.remove('show'));
    }

    toggleDropdown(dropdown) {
        const isOpen = dropdown.classList.contains('show');
        
        // Close all other dropdowns
        const allDropdowns = document.querySelectorAll('.dropdown');
        allDropdowns.forEach(d => d.classList.remove('show'));
        
        // Toggle current dropdown
        dropdown.classList.toggle('show', !isOpen);
    }
}

// Enhanced Search Functionality
class SearchHandler {
    constructor() {
        this.searchBox = document.querySelector('.search-box');
        this.init();
    }

    init() {
        if (this.searchBox) {
            this.searchBox.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });

            // Add search suggestions (placeholder for future enhancement)
            this.searchBox.addEventListener('input', (e) => {
                this.handleSearchInput(e.target.value);
            });
        }
    }

    performSearch(query) {
        if (query.trim()) {
            console.log('Searching for:', query);
            // Implement actual search functionality here
            // For now, just show an alert
            alert(`Searching for: "${query}"\n\nThis feature will be implemented soon!`);
        }
    }

    handleSearchInput(value) {
        // Placeholder for search suggestions
        // This could show a dropdown with suggestions as user types
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new SearchHandler();
});