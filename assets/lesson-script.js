// Cursor AI Master Class - Lesson JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeOSTabs();
    initializeCodeCopy();
    initializeSidebar();
    initializeProgress();
    initializeInteractiveElements();
});

// OS Tab Switching
function initializeOSTabs() {
    const osTabs = document.querySelectorAll('.os-tab');
    const osContents = document.querySelectorAll('.os-content');
    
    osTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetOS = tab.getAttribute('data-os');
            
            // Update active states
            osTabs.forEach(t => t.classList.remove('active'));
            osContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const targetContent = document.getElementById(targetOS);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Code Copy Functionality
function initializeCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        // Create copy button
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.setAttribute('title', 'Copy code');
        
        // Add button to code block
        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        // Copy functionality
        button.addEventListener('click', async () => {
            const code = block.textContent;
            
            try {
                await navigator.clipboard.writeText(code);
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

// Sidebar Toggle for Mobile
function initializeSidebar() {
    // Create sidebar toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'sidebar-toggle';
    toggleButton.innerHTML = '<i class="fas fa-info-circle"></i>';
    toggleButton.setAttribute('title', 'Toggle sidebar');
    
    document.body.appendChild(toggleButton);
    
    const sidebar = document.querySelector('.sidebar');
    
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        toggleButton.classList.toggle('active');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && !toggleButton.contains(e.target)) {
            sidebar.classList.remove('active');
            toggleButton.classList.remove('active');
        }
    });
}

// Progress Tracking
function initializeProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    
    if (progressBar && progressText) {
        // Get current lesson number from URL or page
        const currentLesson = getCurrentLessonNumber();
        const totalLessons = 30;
        
        const percentage = (currentLesson / totalLessons) * 100;
        progressBar.style.setProperty('--progress', `${percentage}%`);
        progressText.textContent = `${currentLesson}/${totalLessons} 완료`;
        
        // Save progress to localStorage
        saveProgress(currentLesson);
    }
}

function getCurrentLessonNumber() {
    // Extract lesson number from URL or page content
    const urlMatch = window.location.pathname.match(/lesson(\d+)\.html/);
    if (urlMatch) {
        return parseInt(urlMatch[1]);
    }
    return 1;
}

function saveProgress(lessonNumber) {
    const progress = JSON.parse(localStorage.getItem('cursorAIProgress') || '{}');
    progress.lastLesson = lessonNumber;
    progress.lastAccessed = new Date().toISOString();
    localStorage.setItem('cursorAIProgress', JSON.stringify(progress));
}

// Interactive Elements
function initializeInteractiveElements() {
    // Animate code typing
    animateCodeTyping();
    
    // Interactive command demos
    initializeCommandDemos();
    
    // Chat simulations
    initializeChatSimulations();
}

function animateCodeTyping() {
    const aiGeneratedCode = document.querySelectorAll('.ai-generated code');
    
    aiGeneratedCode.forEach(codeBlock => {
        if (codeBlock.dataset.animated) return;
        
        const originalText = codeBlock.textContent;
        const lines = originalText.split('\n');
        codeBlock.textContent = '';
        codeBlock.dataset.animated = 'true';
        
        let lineIndex = 0;
        let charIndex = 0;
        
        function typeNextChar() {
            if (lineIndex >= lines.length) return;
            
            const currentLine = lines[lineIndex];
            
            if (charIndex < currentLine.length) {
                codeBlock.textContent += currentLine[charIndex];
                charIndex++;
                setTimeout(typeNextChar, 30);
            } else {
                if (lineIndex < lines.length - 1) {
                    codeBlock.textContent += '\n';
                }
                lineIndex++;
                charIndex = 0;
                setTimeout(typeNextChar, 100);
            }
        }
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeNextChar();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(codeBlock);
    });
}

function initializeCommandDemos() {
    const commandDemos = document.querySelectorAll('.command-demo');
    
    commandDemos.forEach(demo => {
        const commandElement = demo.querySelector('.command');
        if (!commandElement) return;
        
        commandElement.addEventListener('click', () => {
            commandElement.classList.add('executing');
            
            // Simulate command execution
            setTimeout(() => {
                commandElement.classList.remove('executing');
                commandElement.classList.add('completed');
                
                // Show result if available
                const result = demo.querySelector('.command-result');
                if (result) {
                    result.classList.add('show');
                }
            }, 1500);
        });
    });
}

function initializeChatSimulations() {
    const chatInputs = document.querySelectorAll('.chat-input');
    
    chatInputs.forEach(input => {
        input.addEventListener('click', () => {
            const chatDemo = input.closest('.chat-demo');
            const response = chatDemo.querySelector('.chat-response');
            
            if (response) {
                input.classList.add('sent');
                
                setTimeout(() => {
                    response.classList.add('typing');
                    
                    setTimeout(() => {
                        response.classList.remove('typing');
                        response.classList.add('show');
                    }, 1500);
                }, 500);
            }
        });
    });
}

// Add CSS for interactive elements
const interactiveStyles = document.createElement('style');
interactiveStyles.textContent = `
    /* Copy Button */
    .copy-button {
        position: absolute;
        top: 8px;
        right: 8px;
        background: var(--bg-hover);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        padding: 6px 10px;
        color: var(--text-secondary);
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
    }
    
    pre:hover .copy-button {
        opacity: 1;
    }
    
    .copy-button:hover {
        background: var(--primary);
        color: white;
    }
    
    .copy-button.copied {
        background: var(--success);
        color: white;
    }
    
    /* Sidebar Toggle */
    .sidebar-toggle {
        display: none;
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        transition: all 0.3s ease;
    }
    
    @media (max-width: 1399px) {
        .sidebar-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    
    .sidebar-toggle:hover {
        transform: scale(1.1);
    }
    
    .sidebar-toggle.active {
        background: var(--accent);
    }
    
    .sidebar.active {
        transform: translateX(0);
    }
    
    /* Progress Bar Animation */
    .progress-bar::after {
        width: var(--progress, 0);
    }
    
    /* Command Demo Animations */
    .command-demo .command {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .command-demo .command:hover {
        color: var(--primary);
    }
    
    .command-demo .command.executing {
        opacity: 0.5;
    }
    
    .command-demo .command.executing::after {
        content: '...';
        animation: dots 1s infinite;
    }
    
    @keyframes dots {
        0%, 20% { content: '.'; }
        40% { content: '..'; }
        60%, 100% { content: '...'; }
    }
    
    .command-demo .command.completed {
        color: var(--success);
    }
    
    .command-result {
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    }
    
    .command-result.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Chat Simulation */
    .chat-input {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .chat-input:hover {
        background: var(--bg-hover);
    }
    
    .chat-input.sent {
        opacity: 0.7;
    }
    
    .chat-response {
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
    }
    
    .chat-response.typing::before {
        content: '...';
        display: inline-block;
        animation: typing 1s infinite;
    }
    
    @keyframes typing {
        0% { opacity: 0.3; }
        50% { opacity: 1; }
        100% { opacity: 0.3; }
    }
    
    .chat-response.show {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(interactiveStyles);

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Navigate between lessons with arrow keys
    if (e.key === 'ArrowLeft' && e.altKey) {
        const prevLink = document.querySelector('.nav-link.prev');
        if (prevLink) prevLink.click();
    } else if (e.key === 'ArrowRight' && e.altKey) {
        const nextLink = document.querySelector('.nav-link.next');
        if (nextLink) nextLink.click();
    }
    
    // Toggle sidebar with 'i' key
    if (e.key === 'i' && e.ctrlKey) {
        const sidebar = document.querySelector('.sidebar');
        const toggle = document.querySelector('.sidebar-toggle');
        if (sidebar && toggle) {
            sidebar.classList.toggle('active');
            toggle.classList.toggle('active');
        }
    }
});

// Page Load Analytics (optional)
window.addEventListener('load', () => {
    // Track lesson view
    const lessonNumber = getCurrentLessonNumber();
    console.log(`Lesson ${lessonNumber} viewed`);
    
    // You can add analytics tracking here
});