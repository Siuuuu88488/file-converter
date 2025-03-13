// script.js
document.addEventListener('DOMContentLoaded', () => {
    // File Upload Handling
    const fileInput = document.getElementById('fileInput');
    const progress = document.querySelector('.progress');
    
    fileInput.addEventListener('change', handleFiles);

    function handleFiles(e) {
        const files = e.target.files;
        simulateCompression(files);
    }

    function simulateCompression(files) {
        let progressWidth = 0;
        const interval = setInterval(() => {
            progressWidth += Math.random() * 10;
            progress.style.width = `${progressWidth}%`;
            
            if(progressWidth >= 100) {
                clearInterval(interval);
                showCompletion();
            }
        }, 200);
    }

    function showCompletion() {
        // Add completion animation/UI
    }

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Intersection Observer for animations
    const cards = document.querySelectorAll('.animate-card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    });

    cards.forEach(card => observer.observe(card));
});
