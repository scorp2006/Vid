// ===============================================
// Host Page - Broadcaster Logic
// Handles VDO.Ninja integration for streaming
// ===============================================

let roomId = '';
let isLive = false;
let startTime = null;
let durationInterval = null;
let vdoNinjaUrl = '';

// VDO.Ninja configuration
const VDO_NINJA_BASE = 'https://vdo.ninja';

/**
 * Initialize host page
 */
function initializeHost() {
    // Get room ID from URL or session
    const urlParams = new URLSearchParams(window.location.search);
    roomId = urlParams.get('room') || getStoredRoomId();

    if (!roomId) {
        showNotification('No room ID found. Redirecting...', 'error');
        setTimeout(() => window.location.href = 'index.html', 2000);
        return;
    }

    // Display room ID
    document.getElementById('roomIdDisplay').textContent = roomId;

    // Store session data
    storeSessionData();

    // Setup VDO.Ninja URL but don't load yet
    setupVDONinjaURL();

    console.log('Host initialized for room:', roomId);
}

/**
 * Setup VDO.Ninja URL with parameters
 */
function setupVDONinjaURL() {
    const bitrate = document.getElementById('bitrateSelect').value;
    const codec = document.getElementById('codecSelect').value;

    // VDO.Ninja URL - PUSH mode (exactly like the working test)
    vdoNinjaUrl = `${VDO_NINJA_BASE}/?push=${roomId}`;

    console.log('=== HOST DEBUG ===');
    console.log('Room ID:', roomId);
    console.log('VDO.Ninja host URL:', vdoNinjaUrl);
    console.log('Viewers should use:', `${VDO_NINJA_BASE}/?room=${roomId}&view=${roomId}&solo`);
}

/**
 * Go live - start broadcasting
 */
function goLive() {
    if (isLive) return;

    // Load VDO.Ninja iframe
    const iframe = document.getElementById('vdoNinjaFrame');
    const placeholder = document.getElementById('previewPlaceholder');

    iframe.src = vdoNinjaUrl;
    iframe.style.display = 'block';
    placeholder.style.display = 'none';

    // Update UI
    isLive = true;
    document.getElementById('goLiveBtn').style.display = 'none';
    document.getElementById('endSessionBtn').style.display = 'inline-flex';

    // Enable controls
    document.getElementById('toggleVideo').disabled = false;
    document.getElementById('toggleAudio').disabled = false;
    document.getElementById('shareScreen').disabled = false;

    // Update status
    const statusBadge = document.getElementById('streamStatus');
    statusBadge.innerHTML = '<span class="status-dot live"></span><span>Live</span>';
    statusBadge.classList.add('active');

    // Start duration counter
    startTime = Date.now();
    durationInterval = setInterval(updateDuration, 1000);

    // Simulate viewer count (in real app, this would come from VDO.Ninja or backend)
    simulateViewerCount();

    showNotification('You are now live!', 'success');
    console.log('Started broadcasting to room:', roomId);
}

/**
 * End broadcast session
 */
function endSession() {
    if (!confirm('Are you sure you want to end this session?')) return;

    // Stop iframe
    const iframe = document.getElementById('vdoNinjaFrame');
    iframe.src = '';
    iframe.style.display = 'none';

    const placeholder = document.getElementById('previewPlaceholder');
    placeholder.style.display = 'flex';

    // Update UI
    isLive = false;
    document.getElementById('goLiveBtn').style.display = 'inline-flex';
    document.getElementById('endSessionBtn').style.display = 'none';

    // Disable controls
    document.getElementById('toggleVideo').disabled = true;
    document.getElementById('toggleAudio').disabled = true;
    document.getElementById('shareScreen').disabled = true;

    // Update status
    const statusBadge = document.getElementById('streamStatus');
    statusBadge.innerHTML = '<span class="status-dot offline"></span><span>Offline</span>';
    statusBadge.classList.remove('active');

    // Stop duration counter
    if (durationInterval) {
        clearInterval(durationInterval);
        durationInterval = null;
    }

    showNotification('Session ended', 'info');
    console.log('Ended session');
}

/**
 * Toggle video on/off
 */
function toggleVideo() {
    const btn = document.getElementById('toggleVideo');
    const isActive = btn.classList.toggle('active');

    // Send message to VDO.Ninja iframe to toggle video
    const iframe = document.getElementById('vdoNinjaFrame');
    if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({
            action: 'toggleVideo',
            enabled: isActive
        }, '*');
    }

    showNotification(isActive ? 'Camera enabled' : 'Camera disabled', 'info');
}

/**
 * Toggle audio on/off
 */
function toggleAudio() {
    const btn = document.getElementById('toggleAudio');
    const isActive = btn.classList.toggle('active');

    // Send message to VDO.Ninja iframe to toggle audio
    const iframe = document.getElementById('vdoNinjaFrame');
    if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({
            action: 'toggleAudio',
            enabled: isActive
        }, '*');
    }

    showNotification(isActive ? 'Microphone enabled' : 'Microphone muted', 'info');
}

/**
 * Share screen
 */
function shareScreen() {
    // VDO.Ninja handles screen sharing internally
    // We just need to send a message to trigger it
    const iframe = document.getElementById('vdoNinjaFrame');
    if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({
            action: 'shareScreen'
        }, '*');
    }

    showNotification('Screen sharing initiated', 'info');
}

/**
 * Update session duration display
 */
function updateDuration() {
    if (!startTime) return;

    const elapsed = Date.now() - startTime;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const display = [
        hours.toString().padStart(2, '0'),
        (minutes % 60).toString().padStart(2, '0'),
        (seconds % 60).toString().padStart(2, '0')
    ].join(':');

    document.getElementById('duration').textContent = display;
}

/**
 * Simulate viewer count (for demo purposes)
 * In production, this would come from actual viewer tracking
 */
function simulateViewerCount() {
    let count = 0;
    const updateCount = () => {
        if (!isLive) return;

        // Random increase/decrease
        const change = Math.random() > 0.5 ? 1 : -1;
        count = Math.max(0, Math.min(count + change, 150));

        document.getElementById('viewerCount').textContent = count;
    };

    // Initial viewers
    setTimeout(() => {
        count = Math.floor(Math.random() * 10) + 5;
        document.getElementById('viewerCount').textContent = count;
    }, 2000);

    // Update periodically
    setInterval(updateCount, 5000);
}

/**
 * Copy room ID to clipboard
 */
function copyRoomId() {
    navigator.clipboard.writeText(roomId).then(() => {
        showNotification('Room ID copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy Room ID', 'error');
    });
}

/**
 * Copy viewer link to clipboard
 */
function copyViewerLink() {
    const viewerUrl = `${window.location.origin}/viewer.html?room=${encodeURIComponent(roomId)}`;
    navigator.clipboard.writeText(viewerUrl).then(() => {
        showNotification('Viewer link copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy viewer link', 'error');
    });
}

/**
 * Open viewer page in new window
 */
function openViewerPage() {
    window.open(`viewer.html?room=${encodeURIComponent(roomId)}`, '_blank');
}

/**
 * Open control page in new window
 */
function openControlPage() {
    window.open(`control.html?room=${encodeURIComponent(roomId)}`, '_blank');
}

/**
 * Store session data
 */
function storeSessionData() {
    const sessionData = {
        roomId: roomId,
        role: 'host',
        joinedAt: new Date().toISOString()
    };
    localStorage.setItem('webinarSession', JSON.stringify(sessionData));
}

/**
 * Get stored room ID
 */
function getStoredRoomId() {
    try {
        const session = JSON.parse(localStorage.getItem('webinarSession'));
        return session?.roomId || null;
    } catch {
        return null;
    }
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

/**
 * Update stream settings
 */
document.getElementById('bitrateSelect')?.addEventListener('change', setupVDONinjaURL);
document.getElementById('codecSelect')?.addEventListener('change', setupVDONinjaURL);

/**
 * Handle page unload
 */
window.addEventListener('beforeunload', (e) => {
    if (isLive) {
        e.preventDefault();
        e.returnValue = 'You are currently live. Are you sure you want to leave?';
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeHost);