// Storybook App JavaScript
class Storybook {
    constructor() {
        this.currentPage = 0; // 0 for cover, 1-10 for story pages
        this.totalPages = 10;
        this.pages = document.querySelectorAll('.page');
        this.pageCounter = document.getElementById('pageCounter');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.buttonAudio = null; // For custom sound
        
        this.init();
    }
    
    init() {
        this.showPage(0); // Start with cover page
        this.updateNavigation();
        this.setupKeyboardControls();
        this.setupImageClickHandlers();
    }
    
    showPage(pageIndex) {
        // Hide all pages
        this.pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the target page
        if (pageIndex === 0) {
            document.getElementById('cover').classList.add('active');
        } else {
            document.getElementById(`page-${pageIndex}`).classList.add('active');
        }
        
        this.currentPage = pageIndex;
        this.updateNavigation();
        this.updatePageCounter();
        
        // Add entrance animation
        const activePage = document.querySelector('.page.active');
        activePage.style.animation = 'none';
        setTimeout(() => {
            activePage.style.animation = 'slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        }, 10);
    }
    
    updateNavigation() {
        const navigationControls = document.querySelector('.navigation-controls');
        
        if (this.currentPage === 0) {
            // Hide navigation on cover page
            navigationControls.style.display = 'none';
        } else {
            navigationControls.style.display = 'flex';
            
            // Update previous button
            this.prevBtn.disabled = this.currentPage === 1;
            
            // Update next button
            this.nextBtn.disabled = this.currentPage === this.totalPages;
        }
    }
    
    updatePageCounter() {
        if (this.currentPage > 0) {
            this.pageCounter.textContent = `Page ${this.currentPage} of ${this.totalPages}`;
        }
    }
    
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.showPage(this.currentPage + 1);
            this.playButtonSound();
        }
    }
    
    previousPage() {
        if (this.currentPage > 1) {
            this.showPage(this.currentPage - 1);
            this.playButtonSound();
        }
    }
    
    startStory() {
        this.showPage(1);
        this.playButtonSound();
    }
    
    restartStory() {
        this.showPage(0);
        this.playButtonSound();
    }
    
    playButtonSound() {
        if (!this.buttonAudio) {
            // Change 'click.mp3' to your custom sound file
            this.buttonAudio = new Audio('clip.mp3');
        }
        this.buttonAudio.currentTime = 0; // Rewind to start
        this.buttonAudio.play();
    }
    
    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case ' ': // Spacebar
                    e.preventDefault();
                    if (this.currentPage === 0) {
                        this.startStory();
                    } else {
                        this.nextPage();
                    }
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousPage();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.restartStory();
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (this.currentPage === 0) {
                        this.startStory();
                    }
                    break;
            }
        });
    }
    
    setupImageClickHandlers() {
        // Add click handlers to story images for next page
        document.querySelectorAll('.story-image').forEach(img => {
            img.addEventListener('click', () => {
                if (this.currentPage < this.totalPages) {
                    this.nextPage();
                }
            });
            
            // Add cursor pointer style
            img.style.cursor = 'pointer';
        });
    }
}

// Initialize the storybook when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.storybook = new Storybook();
});

// Global functions for HTML onclick handlers
function startStory() {
    window.storybook.startStory();
}

function nextPage() {
    window.storybook.nextPage();
}

function previousPage() {
    window.storybook.previousPage();
}

function restartStory() {
    window.storybook.restartStory();
}

// Touch/swipe gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - next page
            if (window.storybook.currentPage === 0) {
                window.storybook.startStory();
            } else {
                window.storybook.nextPage();
            }
        } else {
            // Swiped right - previous page
            window.storybook.previousPage();
        }
    }
}

// Preload images for smooth transitions
function preloadImages() {
    const imageUrls = [
        'https://pplx-res.cloudinary.com/image/upload/v1750392894/gpt4o_images/psi9vhsamwtzimrnfoz1.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750392956/gpt4o_images/rtfqevinrg8lovxemlzc.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750393039/gpt4o_images/twlfy5wc5wkzxbyfswes.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750393106/gpt4o_images/vmzhcdudxvbfbbgnbjdq.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750393160/gpt4o_images/hvjwontcckjxobpybv58.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750393222/gpt4o_images/a6mfrdsbae28v4rvjuon.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750393284/gpt4o_images/lkio6kvcgsv0mgjxiqey.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750393385/gpt4o_images/rah8kdlk3tvsnmtgatge.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750393446/gpt4o_images/efko2lcqfshitfwpid8s.png',
        'https://pplx-res.cloudinary.com/image/upload/v1750393492/gpt4o_images/jajsbqys1slw6esztpje.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Start preloading images
preloadImages();

// Add some fun easter eggs
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 10) {
        // Show a fun message after 10 clicks
        const funMessage = document.createElement('div');
        funMessage.innerHTML = '🎉 You found the secret! Great reading! 🦕';
        funMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #FFD54F, #FF8A65);
            color: #134252;
            padding: 20px;
            border-radius: 15px;
            font-family: 'Comic Neue', cursive;
            font-size: 1.5rem;
            font-weight: bold;
            z-index: 1000;
            border: 3px solid #AB47BC;
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            animation: bounce 1s ease-in-out;
        `;
        
        document.body.appendChild(funMessage);
        
        setTimeout(() => {
            funMessage.remove();
        }, 3000);
        
        clickCount = 0; // Reset counter
    }
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('using-keyboard');
});

// Add focus styles for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .using-keyboard *:focus {
        outline: 3px solid #29B6F6 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);