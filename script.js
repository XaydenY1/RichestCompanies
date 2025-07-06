// Top 10 Richest Companies Data (as of 2024)
const companies = [
    {
        name: "Visa Inc.",
        value: "$467 Billion",
        description: "Global payments technology company enabling digital payments worldwide.",
        logo3d: "visa-logo-3d",
        rank: 10,
        color: "#1A1F71"
    },
    {
        name: "Taiwan Semiconductor",
        value: "$503 Billion", 
        description: "World's largest dedicated semiconductor foundry manufacturing chips for global tech companies.",
        logo3d: "tsmc-logo-3d",
        rank: 9,
        color: "#FF6B35"
    },
    {
        name: "NVIDIA Corporation",
        value: "$1.73 Trillion",
        description: "Leading designer of graphics processing units and AI computing technology.",
        logo3d: "nvidia-logo-3d", 
        rank: 8,
        color: "#76B900"
    },
    {
        name: "Berkshire Hathaway",
        value: "$884 Billion",
        description: "Multinational conglomerate holding company led by Warren Buffett.",
        logo3d: "berkshire-logo-3d",
        rank: 7,
        color: "#1E3A8A"
    },
    {
        name: "Meta Platforms",
        value: "$1.25 Trillion",
        description: "Social media and virtual reality company owning Facebook, Instagram, and WhatsApp.",
        logo3d: "meta-logo-3d",
        rank: 6,
        color: "#1877F2"
    },
    {
        name: "Tesla Inc.",
        value: "$1.29 Trillion",
        description: "Electric vehicle and clean energy company revolutionizing transportation.",
        logo3d: "tesla-logo-3d",
        rank: 5,
        color: "#CC0000"
    },
    {
        name: "Amazon.com Inc.",
        value: "$1.56 Trillion",
        description: "Global e-commerce and cloud computing giant providing diverse digital services.",
        logo3d: "amazon-logo-3d",
        rank: 4,
        color: "#FF9900"
    },
    {
        name: "Alphabet Inc.",
        value: "$2.08 Trillion",
        description: "Parent company of Google, leading in search, advertising, and cloud services.",
        logo3d: "alphabet-logo-3d",
        rank: 3,
        color: "#4285F4"
    },
    {
        name: "Microsoft Corporation", 
        value: "$3.18 Trillion",
        description: "Technology corporation developing software, cloud services, and productivity tools.",
        logo3d: "microsoft-logo-3d",
        rank: 2,
        color: "#00BCF2"
    },
    {
        name: "Apple Inc.",
        value: "$3.39 Trillion",
        description: "Consumer electronics company known for iPhone, Mac, and innovative technology products.",
        logo3d: "apple-logo-3d",
        rank: 1,
        color: "#007AFF"
    }
];

let currentCompanyIndex = 0;
let isTransitioning = false;

// Wait for A-Frame to be ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeShowcase();
        updateDisplay();
    }, 1000);
});

function initializeShowcase() {
    // Add event listeners for keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight' || event.key === ' ') {
            nextCompany();
        } else if (event.key === 'ArrowLeft') {
            previousCompany();
        }
    });

    // Add click events to 3D logo container for next company
    const logoContainer = document.querySelector('#logo-3d-container');
    if (logoContainer) {
        logoContainer.addEventListener('click', nextCompany);
    }

    console.log('3D Company Showcase initialized');
}

function updateDisplay() {
    if (isTransitioning) return;
    
    const company = companies[currentCompanyIndex];
    
    // Update UI overlay
    document.getElementById('company-name').textContent = company.name;
    document.getElementById('company-value').textContent = company.value;
    document.getElementById('company-description').textContent = company.description;
    document.getElementById('company-position').textContent = `Company ${currentCompanyIndex + 1} of ${companies.length} • Rank #${company.rank}`;
    
    // Update 3D elements
    update3DLogo(company);
    update3DText(company);
    updateLighting(company);
    updatePedestal(company);
}

function update3DLogo(company) {
    const companyDisplay = document.querySelector('#company-display');
    
    if (companyDisplay) {
        // Animate transition
        isTransitioning = true;
        
        // Hide all logo entities first
        const allLogos = [
            'apple-logo-3d', 'microsoft-logo-3d', 'alphabet-logo-3d', 
            'amazon-logo-3d', 'tesla-logo-3d', 'meta-logo-3d', 
            'berkshire-logo-3d', 'nvidia-logo-3d', 'tsmc-logo-3d', 'visa-logo-3d'
        ];
        
        allLogos.forEach(logoId => {
            const logoEntity = document.querySelector(`#${logoId}`);
            if (logoEntity) {
                logoEntity.setAttribute('visible', false);
            }
        });
        
        // Scale down and move out the container
        const logoContainer = document.querySelector('#logo-3d-container');
        if (logoContainer) {
            logoContainer.setAttribute('animation__scaledown', {
                property: 'scale',
                to: '0.1 0.1 0.1',
                dur: 500,
                easing: 'easeInQuad'
            });
        }
        
        // Move display slightly
        companyDisplay.setAttribute('animation__moveout', {
            property: 'position',
            to: '5 6 -12',
            dur: 500,
            easing: 'easeInQuad'
        });
        
        setTimeout(() => {
            // Show the new logo
            const newLogo = document.querySelector(`#${company.logo3d}`);
            if (newLogo) {
                newLogo.setAttribute('visible', true);
            }
            
            // Reset position
            companyDisplay.setAttribute('position', '-5 6 -12');
            
            // Scale up the container
            if (logoContainer) {
                logoContainer.setAttribute('animation__scalein', {
                    property: 'scale',
                    to: '4 4 4',
                    dur: 800,
                    easing: 'easeOutElastic'
                });
            }
            
            // Move display back
            companyDisplay.setAttribute('animation__movein', {
                property: 'position',
                to: '0 6 -12',
                dur: 800,
                easing: 'easeOutElastic'
            });
            
            setTimeout(() => {
                isTransitioning = false;
            }, 800);
            
        }, 500);
    }
}

function update3DText(company) {
    const companyName3D = document.querySelector('#company-name-3d');
    const companyValue3D = document.querySelector('#company-value-3d');
    const companyRank3D = document.querySelector('#company-rank-3d');
    
    if (companyName3D) {
        companyName3D.setAttribute('value', company.name);
        companyName3D.setAttribute('animation__pulse', {
            property: 'scale',
            to: '1.1 1.1 1.1',
            dur: 1000,
            direction: 'alternate',
            loop: 2,
            easing: 'easeInOutQuad'
        });
    }
    
    if (companyValue3D) {
        companyValue3D.setAttribute('value', company.value);
        companyValue3D.setAttribute('color', '#00ff88');
    }
    
    if (companyRank3D) {
        companyRank3D.setAttribute('value', `Rank #${company.rank} • Market Cap`);
        companyRank3D.setAttribute('color', '#ffaa00');
    }
}

function updateLighting(company) {
    const spotlight = document.querySelector('#spotlight');
    
    if (spotlight) {
        spotlight.setAttribute('animation__colorchange', {
            property: 'light.color',
            to: company.color,
            dur: 1000,
            easing: 'easeInOutQuad'
        });
        
        spotlight.setAttribute('animation__intensity', {
            property: 'light.intensity',
            to: 2.5,
            dur: 500,
            direction: 'alternate',
            loop: 2,
            easing: 'easeInOutQuad'
        });
    }
}

function updatePedestal(company) {
    const pedestal = document.querySelector('a-cylinder');
    
    if (pedestal) {
        pedestal.setAttribute('animation__colorchange', {
            property: 'color',
            to: company.color,
            dur: 1000,
            easing: 'easeInOutQuad'
        });
        
        pedestal.setAttribute('animation__glow', {
            property: 'material.emissive',
            to: company.color,
            dur: 1000,
            easing: 'easeInOutQuad'
        });
        
        pedestal.setAttribute('animation__spin', {
            property: 'rotation',
            to: `0 ${360 + Math.random() * 180} 0`,
            dur: 2000,
            easing: 'easeInOutQuad'
        });
    }
}

function nextCompany() {
    if (isTransitioning) return;
    
    currentCompanyIndex = (currentCompanyIndex + 1) % companies.length;
    updateDisplay();
    
    // Add sound effect simulation
    console.log(`Navigating to: ${companies[currentCompanyIndex].name}`);
    
    // Update button states
    updateButtonStates();
}

function previousCompany() {
    if (isTransitioning) return;
    
    currentCompanyIndex = (currentCompanyIndex - 1 + companies.length) % companies.length;
    updateDisplay();
    
    console.log(`Navigating to: ${companies[currentCompanyIndex].name}`);
    
    // Update button states
    updateButtonStates();
}

function updateButtonStates() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // Add visual feedback
    if (nextBtn) {
        nextBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            nextBtn.style.transform = 'scale(1)';
        }, 100);
    }
    
    if (prevBtn) {
        prevBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            prevBtn.style.transform = 'scale(1)';
        }, 100);
    }
}

// Auto-advance functionality (optional)
let autoAdvanceInterval;

function startAutoAdvance(intervalMs = 10000) {
    stopAutoAdvance();
    autoAdvanceInterval = setInterval(() => {
        if (!isTransitioning) {
            nextCompany();
        }
    }, intervalMs);
}

function stopAutoAdvance() {
    if (autoAdvanceInterval) {
        clearInterval(autoAdvanceInterval);
        autoAdvanceInterval = null;
    }
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next company
            nextCompany();
        } else {
            // Swipe right - previous company  
            previousCompany();
        }
    }
}

// Performance optimization
function optimizePerformance() {
    // Disable shadows on mobile for better performance
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        const shadows = document.querySelectorAll('[shadow]');
        shadows.forEach(el => {
            el.removeAttribute('shadow');
        });
        
        console.log('Mobile detected: Shadows disabled for better performance');
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Export functions for global access
window.nextCompany = nextCompany;
window.previousCompany = previousCompany;
window.startAutoAdvance = startAutoAdvance;
window.stopAutoAdvance = stopAutoAdvance;