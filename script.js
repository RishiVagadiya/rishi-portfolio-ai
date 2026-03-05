// Portfolio JavaScript - Interactive Features

// Clear any existing theme preference to force light mode on first load
if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light-mode');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...'); // Debug log
    
    // Initialize all interactive elements
    initializeButtons();
    initializeNavigation();
    initializeAnimations();
    initializeParticles();
    initializeTheme();
    
    // Ensure all sections are visible for proper scrolling
    const allSections = ['home', 'about', 'projects', 'skills', 'contact'];
    allSections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.style.display = 'block';
        }
    });
    
    // Ensure home section uses flex for centering
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.style.display = 'flex';
    }
    
    // Test theme toggle functionality
    setTimeout(() => {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            console.log('Theme toggle button found and ready!'); // Debug log
        } else {
            console.error('Theme toggle button not found after initialization!'); // Debug log
        }
    }, 1000);
});

// Button functionality
function initializeButtons() {
    // Logo click handler
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            // Navigate to home section
            navigateToSection('home');
        });
    }

    // Menu button functionality
    const menuBtn = document.querySelector('.menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            toggleMenu();
        });
    }

    // Project button functionality
    const projectBtns = document.querySelectorAll('.project-btn');
    projectBtns.forEach(btn => {
        if (btn.dataset.url) {
            btn.addEventListener('click', function() {
                addLoadingEffect(this, () => {
                    window.open(this.dataset.url, '_blank');
                });
            });
        }
    });

    // Play Game button functionality
    const playGameBtns = document.querySelectorAll('.play-game-btn');
    playGameBtns.forEach(btn => {
        if (btn.dataset.url && !btn.classList.contains('disabled')) {
            btn.addEventListener('click', function() {
                addLoadingEffect(this, () => {
                    window.open(this.dataset.url, '_blank');
                });
            });
        }
    });

    // Contact button functionality
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            addLoadingEffect(this, () => {
                showContact();
            });
        });
    }

    // Skills button functionality
    const skillsBtn = document.getElementById('skills-btn');
    if (skillsBtn) {
        skillsBtn.addEventListener('click', function() {
            addLoadingEffect(this, () => {
                showSkills();
            });
        });
    }

    // Add click effects to all buttons
    const allButtons = document.querySelectorAll('button, .logo');
    allButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation
    const sections = document.querySelectorAll('section');
    
    // Add scroll-based animations
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.main');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
        
        // Animate sections on scroll
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrolled >= (sectionTop - window.innerHeight / 2)) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });
}

// Menu toggle functionality
function toggleMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const header = document.querySelector('header');
    
    if (menuBtn.innerHTML === 'Menu') {
        menuBtn.innerHTML = 'Close';
        header.style.background = 'rgba(0, 0, 0, 0.8)';
        
        // Create menu overlay
        createMenuOverlay();
    } else {
        menuBtn.innerHTML = 'Menu';
        header.style.background = 'rgba(0, 0, 0, 0.4)';
        
        // Remove menu overlay
        removeMenuOverlay();
    }
}

// Create menu overlay
function createMenuOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'menu-overlay';
    overlay.innerHTML = `
        <div class="menu-content">
            <h3>Navigation</h3>
            <ul>
                <li><a href="#home" onclick="navigateToSection('home')">Home</a></li>
                <li><a href="#about" onclick="navigateToSection('about')">About</a></li>
                <li><a href="#projects" onclick="navigateToSection('projects')">Projects</a></li>
                <li><a href="#contact" onclick="navigateToSection('contact')">Contact</a></li>
            </ul>
        </div>
    `;
    
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 998;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    // Add click to close
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            toggleMenu();
        }
    });
}

// Remove menu overlay
function removeMenuOverlay() {
    const overlay = document.getElementById('menu-overlay');
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }
}

// Animation initialization
function initializeAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideInFromBottom {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .section {
            opacity: 0;
            transform: translateY(50px);
            transition: all 0.8s ease;
        }
        
        .menu-content {
            text-align: center;
            color: white;
        }
        
        .menu-content h3 {
            font-size: 2em;
            margin-bottom: 30px;
            color: #d400ff;
        }
        
        .menu-content ul {
            list-style: none;
            padding: 0;
        }
        
        .menu-content li {
            margin: 15px 0;
        }
        
        .menu-content a {
            color: white;
            text-decoration: none;
            font-size: 1.2em;
            transition: color 0.3s;
        }
        
        .menu-content a:hover {
            color: #d400ff;
        }
    `;
    document.head.appendChild(style);
    
    // Animate main section on load
    const mainSection = document.querySelector('.main');
    if (mainSection) {
        setTimeout(() => {
            mainSection.style.animation = 'slideInFromBottom 1s ease';
        }, 500);
    }
}

// Enhanced particles configuration
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: { value: '#d400ff' },
                shape: { 
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: { 
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: { 
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#d400ff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 4,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { 
                        enable: true, 
                        mode: 'repulse' 
                    },
                    onclick: { 
                        enable: true, 
                        mode: 'push' 
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: { 
                        distance: 100,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const menuBtn = document.querySelector('.menu-btn');
        if (menuBtn && menuBtn.innerHTML === 'Close') {
            toggleMenu();
        }
    }
});

// Add touch support for mobile devices
document.addEventListener('touchstart', function() {}, {passive: true});
document.addEventListener('touchmove', function() {}, {passive: true});

// Main navigation function
function navigateToSection(sectionId) {
    // Close menu first
    toggleMenu();
    
    // Special handling for home section
    if (sectionId === 'home') {
        // For home section, just scroll to top and ensure proper display
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Show all sections for proper scrolling
        const allSections = ['home', 'about', 'projects', 'skills', 'contact'];
        allSections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                element.style.display = 'block';
            }
        });
        
        // Ensure home section uses flex for centering
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.style.display = 'flex';
        }
        return;
    }
    
    // For other sections, show all sections for proper scrolling
    const allSections = ['home', 'about', 'projects', 'skills', 'contact'];
    allSections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.style.display = 'block';
        }
    });
    
    // Ensure home section uses flex for centering
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.style.display = 'flex';
    }
    
    // Scroll to the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Animate progress bars if it's the skills section
        if (sectionId === 'skills') {
            setTimeout(() => {
                animateProgressBars();
            }, 500);
        }
    }
}

// Section navigation functions
function showSkills() {
    // Show skills section and scroll to it
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsSection.style.display = 'block';
        skillsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Animate progress bars
        setTimeout(() => {
            animateProgressBars();
        }, 500);
    }
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

function hideSkills() {
    // Scroll back to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function showContact() {
    // Show contact section and scroll to it
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.style.display = 'block';
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function hideContact() {
    // Scroll back to projects section
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function openResume() {
    // Path to your resume PDF file
    const resumePath = './Rishi vagadiya_resume .PDF';
    console.log('Resume button clicked!'); // Debug log
    
    // Add loading animation
    const buttons = document.querySelectorAll('.project-btn');
    buttons.forEach(btn => {
        if (btn.innerHTML === 'Resume') {
            console.log('Found Resume button, adding loading effect...'); // Debug log
            addLoadingEffect(btn, () => {
                // Open PDF in new tab
                console.log('Opening resume PDF...'); // Debug log
                window.open(resumePath, '_blank');
            });
        }
    });
}

// Universal loading effect function
function addLoadingEffect(button, callback) {
    const originalText = button.innerHTML;
    const originalOpacity = button.style.opacity;
    const originalTransform = button.style.transform;
    const originalBackground = button.style.background;
    
    // Store original styles
    const originalBorder = button.style.border;
    const originalColor = button.style.color;
    
    // Add loading state with enhanced visual effects
    button.disabled = true;
    button.style.transform = 'scale(0.95)';
    button.style.opacity = '0.8';
    
   
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    
   
    button.style.background = 'linear-gradient(45deg, #d400ff, #00d4ff, #d400ff)';
    button.style.backgroundSize = '200% 200%';
    button.style.animation = 'gradientShift 1.5s ease infinite';
    
    // Create loading content with spinner
    button.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
            <div class="loading-spinner" style="
                width: 16px; 
                height: 16px; 
                border: 2px solid rgba(255,255,255,0.3); 
                border-top: 2px solid white; 
                border-radius: 50%; 
                animation: spin 1s linear infinite;
            "></div>
            <span style="color: white; font-weight: 500;">Loading</span>
            <span class="loading-dots" style="color: white;">...</span>
        </div>
    `;
    
    // Add CSS animations if not already present
    if (!document.getElementById('loading-animations')) {
        const style = document.createElement('style');
        style.id = 'loading-animations';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-3px); }
                60% { transform: translateY(-1px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create enhanced dots animation
    const dots = button.querySelector('.loading-dots');
    if (dots) {
        let dotCount = 0;
        const dotInterval = setInterval(() => {
            dotCount = (dotCount + 1) % 4;
            dots.textContent = '.'.repeat(dotCount);
            dots.style.animation = 'pulse 0.5s ease-in-out';
        }, 300);
        
        // Add success animation before executing callback
        setTimeout(() => {
            clearInterval(dotInterval);
            
            // Success animation
            button.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px; animation: bounce 0.6s ease;">
                    <span style="color: white; font-weight: 600;">✓</span>
                    <span style="color: white; font-weight: 500;">Ready!</span>
                </div>
            `;
            
            // Execute callback after success animation
            setTimeout(() => {
                callback();
                
                // Restore original state with smooth transition
                button.style.transition = 'all 1.1s ease';
                button.innerHTML = originalText;
                button.style.background = originalBackground || '';
                button.style.opacity = originalOpacity || '1';
                button.style.transform = originalTransform || 'scale(1)';
                button.style.border = originalBorder || '';
                button.style.color = originalColor || '';
                button.style.animation = '';
                button.disabled = false;
                
                                 // Remove transition after restoration
                 setTimeout(() => {
                     button.style.transition = '';
                 }, 300);
             }, 400);
         }, 1000);
     }
 }

// Theme functionality
function initializeTheme() {
    // Force light mode on first load, or use saved preference
    const savedTheme = localStorage.getItem('theme');
    const themeToSet = savedTheme || 'light-mode';
    
    console.log('Initializing theme...'); // Debug log
    console.log('Saved theme:', savedTheme); // Debug log
    console.log('Theme to set:', themeToSet); // Debug log
    
    // If no saved theme, ensure we start in light mode
    if (!savedTheme) {
        localStorage.setItem('theme', 'light-mode');
        console.log('No saved theme found, setting to light-mode'); // Debug log
    }
    
    setTheme(themeToSet);
    
    // Add theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Remove any existing event listeners
        const newThemeToggle = themeToggle.cloneNode(true);
        themeToggle.parentNode.replaceChild(newThemeToggle, themeToggle);
        
        // Add new event listener
        newThemeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Theme toggle clicked!'); // Debug log
            
            // Add visual feedback
            this.classList.add('pressed');
            setTimeout(() => {
                this.classList.remove('pressed');
            }, 200);
            
            toggleTheme();
        });
        
        // Also add mousedown and touchstart for better responsiveness
        newThemeToggle.addEventListener('mousedown', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.add('pressed');
        });
        
        newThemeToggle.addEventListener('mouseup', function(e) {
            e.preventDefault();
            e.stopPropagation();
            setTimeout(() => {
                this.classList.remove('pressed');
            }, 200);
        });
        
        newThemeToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.add('pressed');
        });
        
        newThemeToggle.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            setTimeout(() => {
                this.classList.remove('pressed');
            }, 200);
        });
        
        console.log('Theme toggle button initialized successfully!'); // Debug log
    } else {
        console.error('Theme toggle button not found!'); // Debug log
    }
}

function setTheme(theme) {
    console.log('setTheme called with:', theme); // Debug log
    
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) {
        console.error('Theme toggle button not found!');
        return;
    }
    
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    if (!themeIcon) {
        console.error('Theme icon not found!');
        return;
    }
    
    console.log('Removing existing theme classes...'); // Debug log
    // Remove existing theme classes
    body.classList.remove('dark-mode', 'light-mode');
    
    console.log('Adding theme class:', theme); // Debug log
    // Add new theme class
    body.classList.add(theme);
    
    // Update theme icon
    if (theme === 'dark-mode') {
        themeIcon.textContent = '🌙';
        themeIcon.style.transform = 'rotate(0deg)';
    } else {
        themeIcon.textContent = '☀️';
        themeIcon.style.transform = 'rotate(180deg)';
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    console.log('Theme set to:', theme); // Debug log
    
    // Update particles color based on theme
    updateParticlesTheme(theme);
}

function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
    
    console.log('Toggling theme from', currentTheme, 'to', newTheme); // Debug log
    setTheme(newTheme);
}

function updateParticlesTheme(theme) {
    if (typeof particlesJS !== 'undefined' && window.pJSDom && window.pJSDom[0]) {
        const particles = window.pJSDom[0].pJS;
        
        if (theme === 'dark-mode') {
            particles.pJS.particles.color.value = '#ffffff';
            particles.pJS.particles.line_linked.color = '#ffffff';
        } else {
            particles.pJS.particles.color.value = '#333333';
            particles.pJS.particles.line_linked.color = '#333333';
        }
        
        // Refresh particles
        particles.pJS.fn.particlesRefresh();
    }
}

// Test function for debugging theme toggle
function testThemeToggle() {
    console.log('Testing theme toggle...');
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        console.log('Theme toggle button found, simulating click...');
        themeToggle.click();
    } else {
        console.error('Theme toggle button not found!');
    }
}
// ================= AI CHATBOT =================

const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {

    const msg = document.createElement("div");

    if (sender === "user") {
        msg.className = "user-message";
    } else {
        msg.className = "bot-message";
    }

    msg.innerText = text;

    chatMessages.appendChild(msg);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {

    const userMessage = chatInput.value.trim();

    if (!userMessage) return;

    addMessage(userMessage, "user");

    chatInput.value = "";

    try {

        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: userMessage
            })
        });

        const data = await response.json();

        console.log("AI RESPONSE:", data);   // Debug

        // 👇 IMPORTANT
        const reply = data.reply || "AI error";

        addMessage(data.reply, "bot");

    } catch (error) {

        console.error(error);
        addMessage("Server error", "bot");

    }
}

if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
}

if (chatInput) {
    chatInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            sendMessage();
        }
    });
}