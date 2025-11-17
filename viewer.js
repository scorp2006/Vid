// ===============================================
// Viewer Page - Audience Logic
// Handles VDO.Ninja stream viewing and chat
// ===============================================

let roomId = '';
let viewerName = '';
let chatMessages = [];
let isAudioMuted = false;

// VDO.Ninja configuration
const VDO_NINJA_BASE = 'https://vdo.ninja';

/**
 * Initialize viewer page
 */
function initializeViewer() {
    // Get room ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    roomId = urlParams.get('room');

    if (!roomId) {
        showNotification('No room ID provided. Redirecting...', 'error');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }

    // Display room ID
    document.getElementById('roomIdDisplay').textContent = roomId;
    document.getElementById('sessionRoomId').textContent = roomId;

    // Load viewer name from storage
    loadViewerName();

    // Setup VDO.Ninja viewer
    setupVDONinjaViewer();

    // Store session data
    storeSessionData();

    // Simulate viewer count
    simulateViewerCount();

    // Initialize chat
    initializeChat();

    console.log('Viewer initialized for room:', roomId);
}

/**
 * Setup VDO.Ninja viewer iframe
 */
function setupVDONinjaViewer() {
    // VDO.Ninja URL - VIEW mode (exactly like the working test)
    // This is what worked in your manual test!
    const vdoNinjaUrl = `${VDO_NINJA_BASE}/?view=${roomId}`;

    console.log('=== VIEWER DEBUG ===');
    console.log('Room ID:', roomId);
    console.log('VDO.Ninja viewer URL (solo link - clean view):', vdoNinjaUrl);
    console.log('Expected host URL:', `${VDO_NINJA_BASE}/?room=${roomId}&push=${roomId}`);

    // Load iframe after short delay to show loading state
    setTimeout(() => {
        const iframe = document.getElementById('vdoNinjaFrame');
        console.log('Loading VDO.Ninja iframe...', iframe);
        iframe.src = vdoNinjaUrl;
        iframe.style.display = 'block';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';

        // Hide placeholder after iframe loads
        iframe.onload = () => {
            setTimeout(() => {
                document.getElementById('streamPlaceholder').style.display = 'none';
                updateStreamStatus('live');
            }, 1000);
        };
    }, 1500);

    console.log('VDO.Ninja viewer URL:', vdoNinjaUrl);
}

/**
 * Update stream status
 */
function updateStreamStatus(status) {
    const statusElement = document.getElementById('streamStatus');
    const statusText = document.getElementById('statusText');

    if (status === 'live') {
        statusElement.innerHTML = '<span class="status-dot live"></span><span>Live</span>';
        statusElement.classList.add('active');
    } else if (status === 'connecting') {
        statusElement.innerHTML = '<span class="status-dot"></span><span>Connecting...</span>';
        statusElement.classList.remove('active');
    } else {
        statusElement.innerHTML = '<span class="status-dot offline"></span><span>Offline</span>';
        statusElement.classList.remove('active');
    }
}

/**
 * Toggle audio mute/unmute
 */
function toggleAudio() {
    isAudioMuted = !isAudioMuted;
    const btn = document.getElementById('toggleAudio');

    if (isAudioMuted) {
        btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="1" y1="1" x2="23" y2="23"/>
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
            </svg>
            <span>Sound Off</span>
        `;
        btn.classList.add('active');
    } else {
        btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
            <span>Sound On</span>
        `;
        btn.classList.remove('active');
    }

    // Send mute command to iframe
    const iframe = document.getElementById('vdoNinjaFrame');
    if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({
            action: 'mute',
            muted: isAudioMuted
        }, '*');
    }

    showNotification(isAudioMuted ? 'Sound muted' : 'Sound enabled', 'info');
}

/**
 * Toggle fullscreen mode
 */
function toggleFullscreen() {
    const container = document.getElementById('streamContainer');

    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            showNotification('Fullscreen not supported', 'error');
        });
    } else {
        document.exitFullscreen();
    }
}

/**
 * Toggle quality settings
 */
function toggleQuality() {
    const btn = document.getElementById('qualityBtn');
    const currentQuality = btn.querySelector('span').textContent;

    const qualities = ['Auto', 'HD', 'SD'];
    const currentIndex = qualities.indexOf(currentQuality);
    const nextQuality = qualities[(currentIndex + 1) % qualities.length];

    btn.querySelector('span').textContent = nextQuality;
    document.getElementById('qualityDisplay').textContent = nextQuality;

    showNotification(`Quality set to ${nextQuality}`, 'info');
}

/**
 * Initialize chat functionality
 */
function initializeChat() {
    // Add welcome message
    addSystemMessage('Welcome to the webinar! Feel free to ask questions.');

    // Simulate some activity
    setTimeout(() => {
        addSystemMessage('The session is now live. Enjoy!');
    }, 3000);
}

/**
 * Handle chat key press
 */
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

/**
 * Send chat message
 */
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message) return;

    const messageData = {
        author: viewerName || 'Anonymous Viewer',
        content: message,
        timestamp: new Date(),
        isOwn: true
    };

    addChatMessage(messageData);
    input.value = '';

    // In production, send to backend/websocket
    console.log('Sending message:', messageData);

    // Simulate host response for demo
    simulateHostResponse(message);
}

/**
 * Add chat message to display
 */
function addChatMessage(messageData) {
    const messagesContainer = document.getElementById('chatMessages');

    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message';

    const authorElement = document.createElement('div');
    authorElement.className = 'message-author';
    authorElement.textContent = messageData.author;

    const contentElement = document.createElement('div');
    contentElement.className = 'message-content';
    contentElement.textContent = messageData.content;

    const timeElement = document.createElement('div');
    timeElement.className = 'message-time';
    timeElement.textContent = formatTime(messageData.timestamp);

    messageElement.appendChild(authorElement);
    messageElement.appendChild(contentElement);
    messageElement.appendChild(timeElement);

    messagesContainer.appendChild(messageElement);

    // Auto scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    chatMessages.push(messageData);
}

/**
 * Add system message
 */
function addSystemMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');

    const messageElement = document.createElement('div');
    messageElement.className = 'system-message';
    messageElement.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
        <span>${message}</span>
    `;

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Simulate host response (for demo)
 */
function simulateHostResponse(userMessage) {
    setTimeout(() => {
        const responses = [
            "Thanks for your question!",
            "Great question! Let me address that.",
            "I'll cover this in the next section.",
            "Excellent point!",
            "Thank you for participating!"
        ];

        const response = responses[Math.floor(Math.random() * responses.length)];

        addChatMessage({
            author: 'Host',
            content: response,
            timestamp: new Date(),
            isOwn: false
        });
    }, 2000 + Math.random() * 3000);
}

/**
 * Format timestamp
 */
function formatTime(date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

/**
 * Toggle chat visibility
 */
function toggleChat() {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'flex' : 'none';
}

/**
 * Save viewer name
 */
function saveViewerName() {
    const nameInput = document.getElementById('viewerName');
    const name = nameInput.value.trim();

    if (name) {
        viewerName = name;
        localStorage.setItem('viewerName', name);
        showNotification('Name saved successfully!', 'success');
    } else {
        showNotification('Please enter a name', 'error');
    }
}

/**
 * Load viewer name from storage
 */
function loadViewerName() {
    const savedName = localStorage.getItem('viewerName');
    if (savedName) {
        viewerName = savedName;
        document.getElementById('viewerName').value = savedName;
    }
}

/**
 * Report issue
 */
function reportIssue() {
    const issue = prompt('Please describe the issue you\'re experiencing:');
    if (issue) {
        console.log('Issue reported:', issue);
        showNotification('Thank you for reporting the issue!', 'success');
        // In production, send to backend
    }
}

/**
 * Share session
 */
function shareSession() {
    const shareUrl = `${window.location.origin}/viewer.html?room=${encodeURIComponent(roomId)}`;

    if (navigator.share) {
        navigator.share({
            title: 'Join Webinar',
            text: 'Join this live webinar session',
            url: shareUrl
        }).catch(() => {
            copyToClipboard(shareUrl);
        });
    } else {
        copyToClipboard(shareUrl);
    }
}

/**
 * Copy to clipboard
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Link copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy link', 'error');
    });
}

/**
 * Leave session
 */
function leaveSession() {
    if (confirm('Are you sure you want to leave this session?')) {
        window.location.href = 'index.html';
    }
}

/**
 * Simulate viewer count
 */
function simulateViewerCount() {
    let count = Math.floor(Math.random() * 20) + 10;

    const updateCount = () => {
        const change = Math.random() > 0.5 ? 1 : -1;
        count = Math.max(5, Math.min(count + change, 200));
        document.getElementById('viewerCount').textContent = count;
    };

    document.getElementById('viewerCount').textContent = count;
    setInterval(updateCount, 5000);
}

/**
 * Store session data
 */
function storeSessionData() {
    const sessionData = {
        roomId: roomId,
        role: 'viewer',
        joinedAt: new Date().toISOString(),
        viewerName: viewerName
    };
    localStorage.setItem('webinarSession', JSON.stringify(sessionData));
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeViewer);