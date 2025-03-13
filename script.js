// script.js (Complete Updated Version)
document.addEventListener('DOMContentLoaded', () => {
    // File Compression Elements
    const fileInput = document.getElementById('fileInput');
    const progress = document.getElementById('progressBar');
    const downloadSection = document.getElementById('downloadSection');
    const downloadBtn = document.getElementById('downloadBtn');
    const uploadLabel = document.getElementById('uploadLabel');
    const btnText = document.getElementById('btnText');

    // Navigation Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Initialize Intersection Observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Initialize Application
    function init() {
        setupEventListeners();
        observeAnimatedElements();
    }

    function setupEventListeners() {
        // File Handling
        fileInput.addEventListener('change', handleFiles);
        downloadBtn.addEventListener('click', downloadZip);

        // Navigation
        hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu on click outside
        document.addEventListener('click', closeMobileMenu);
    }

    async function handleFiles(e) {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        try {
            showLoadingState(true);
            const { zip, content } = await compressFiles(files);
            handleCompressionSuccess(content);
        } catch (error) {
            showError(error);
        } finally {
            showLoadingState(false);
            resetFileInput();
        }
    }

    async function compressFiles(files) {
        const zip = new JSZip();
        let processedFiles = 0;

        // Add files to ZIP with progress tracking
        for (const file of files) {
            zip.file(file.name, file);
            processedFiles++;
            updateProgress((processedFiles / files.length) * 100);
        }

        // Generate ZIP content
        const content = await zip.generateAsync({ type: 'blob' }, metadata => {
            updateProgress(metadata.percent);
        });

        return { zip, content };
    }

    function handleCompressionSuccess(content) {
        const url = URL.createObjectURL(content);
        downloadBtn.dataset.downloadUrl = url;
        downloadSection.classList.remove('hidden');
        
        updateFileSizeDisplay(content.size);
        addDownloadCleanup(url);
    }

    function downloadZip() {
        const url = downloadBtn.dataset.downloadUrl;
        if (!url) return;

        const link = document.createElement('a');
        link.href = url;
        link.download = `compressed-${Date.now()}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // UI Helpers
    function showLoadingState(show) {
        uploadLabel.classList.toggle('loading', show);
        btnText.textContent = show ? 'Compressing...' : 'Choose Files';
    }

    function updateProgress(percent) {
        progress.style.width = `${Math.min(percent, 100)}%`;
    }

    function updateFileSizeDisplay(bytes) {
        document.getElementById('fileSize').textContent = 
            `Compressed size: ${formatBytes(bytes)}`;
    }

    function addDownloadCleanup(url) {
        window.addEventListener('focus', () => {
            URL.revokeObjectURL(url);
            downloadSection.classList.add('hidden');
            progress.style.width = '0%';
        }, { once: true });
    }

    // Navigation Functions
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    }

    function closeMobileMenu(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        }
    }

    // Helper Functions
    function formatBytes(bytes) {
        const units = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Byte';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
    }

    function resetFileInput() {
        fileInput.value = '';
    }

    function observeAnimatedElements() {
        document.querySelectorAll('.animate-card').forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            observer.observe(card);
        });
    }

    function showError(error) {
        console.error('Compression Error:', error);
        alert(`Error: ${error.message}`);
        progress.style.width = '0%';
    }

    // Start Application
    init();
});
