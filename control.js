// ===============================================
// Control Panel - Admin Logic
// Handles VDO.Ninja director mode and management
// ===============================================

let roomId = '';
let sessionStartTime = null;
let durationInterval = null;
let participants = [];

// VDO.Ninja configuration
const VDO_NINJA_BASE = 'https://vdo.ninja';

/**
 * Initialize control panel
 */
function initializeControl() {
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
    document.getElementById('directorRoomId').textContent = roomId;

    // Setup VDO.Ninja director view
    setupDirectorView();

    // Start session timer
    startSessionTimer();

    // Initialize statistics
    initializeStats();

    // Store session data
    storeSessionData();

    console.log('Control panel initialized for room:', roomId);
}

/**
 * Setup VDO.Ninja director view
 */
function setupDirectorView() {
    // VDO.Ninja director mode parameters
    const params = new URLSearchParams({
        director: roomId,                // Director mode for this room
        room: roomId,                    // Room ID
        quality: '2',                    // High quality
        codec: 'h264',                   // Prefer H.264
        clean: '0',                      // Show controls
        effects: '1',                    // Enable effects
        label: '1',                      // Show labels
        layout: '1',                     // Default layout
        grid: '1',                       // Grid layout
        betatest: '1'                    // Enable beta features
    });

    const directorUrl = `${VDO_NINJA_BASE}/?${params.toString()}`;

    // Load director iframe
    setTimeout(() => {
        const iframe = document.getElementById('vdoNinjaDirector');
        iframe.src = directorUrl;

        iframe.onload = () => {
            document.getElementById('directorPlaceholder').style.display = 'none';
            iframe.style.display = 'block';
            showNotification('Director view loaded', 'success');
        };
    }, 1000);

    console.log('VDO.Ninja director URL:', directorUrl);
}

/**
 * Change layout
 */
function changeLayout() {
    const layout = document.getElementById('layoutSelect').value;

    // Send layout change to VDO.Ninja iframe
    const iframe = document.getElementById('vdoNinjaDirector');
    if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({
            action: 'changeLayout',
            layout: layout
        }, '*');
    }

    showNotification(`Layout changed to ${layout}`, 'info');
}

/**
 * Toggle recording
 */
function toggleRecording() {
    const btn = event.currentTarget;
    const isRecording = btn.classList.toggle('active');

    if (isRecording) {
        btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="6" width="12" height="12"/>
            </svg>
            <span>Stop Recording</span>
        `;
        btn.style.background = 'var(--danger-color)';
        btn.style.color = 'white';
        showNotification('Recording started', 'success');
    } else {
        btn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
            </svg>
            <span>Start Recording</span>
        `;
        btn.style.background = '';
        btn.style.color = '';
        showNotification('Recording stopped', 'info');
    }
}

/**
 * Toggle screen share
 */
function toggleScreenShare() {
    const iframe = document.getElementById('vdoNinjaDirector');
    if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({
            action: 'shareScreen'
        }, '*');
    }

    showNotification('Screen share toggled', 'info');
}

/**
 * Toggle chat
 */
function toggleChat() {
    const iframe = document.getElementById('vdoNinjaDirector');
    if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({
            action: 'toggleChat'
        }, '*');
    }

    showNotification('Chat toggled', 'info');
}

/**
 * Mute all participants
 */
function muteAll() {
    if (!confirm('Mute all participants?')) return;

    const iframe = document.getElementById('vdoNinjaDirector');
    if (iframe.contentWindow) {
        iframe.contentWindow.postMessage({
            action: 'muteAll'
        }, '*');
    }

    showNotification('All participants muted', 'success');
}

/**
 * Refresh session
 */
function refreshSession() {
    const iframe = document.getElementById('vdoNinjaDirector');
    iframe.src = iframe.src;
    showNotification('Refreshing session...', 'info');
}

/**
 * Start session timer
 */
function startSessionTimer() {
    sessionStartTime = Date.now();

    durationInterval = setInterval(() => {
        const elapsed = Date.now() - sessionStartTime;
        const seconds = Math.floor(elapsed / 1000);
        const minutes = Math.floor(seconds / 60);

        const display = `${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
        document.getElementById('sessionDuration').textContent = display;
    }, 1000);
}

/**
 * Initialize statistics
 */
function initializeStats() {
    // Simulate viewer count
    let viewerCount = Math.floor(Math.random() * 15) + 5;
    document.getElementById('totalViewers').textContent = viewerCount;

    setInterval(() => {
        const change = Math.random() > 0.5 ? 1 : -1;
        viewerCount = Math.max(0, Math.min(viewerCount + change, 200));
        document.getElementById('totalViewers').textContent = viewerCount;
    }, 5000);

    // Simulate message count
    let messageCount = 0;
    setInterval(() => {
        if (Math.random() > 0.7) {
            messageCount++;
            document.getElementById('messageCount').textContent = messageCount;
        }
    }, 8000);

    // Simulate question count
    let questionCount = 0;
    setInterval(() => {
        if (Math.random() > 0.85) {
            questionCount++;
            document.getElementById('questionCount').textContent = questionCount;
        }
    }, 12000);

    // Add sample participants
    addSampleParticipants();
}

/**
 * Add sample participants for demo
 */
function addSampleParticipants() {
    const sampleNames = [
        'Host - John Doe',
        'Viewer - Sarah Smith',
        'Viewer - Mike Johnson',
        'Viewer - Emily Brown'
    ];

    setTimeout(() => {
        participants = sampleNames.map((name, index) => ({
            id: `participant-${index}`,
            name: name,
            role: name.includes('Host') ? 'host' : 'viewer',
            joinedAt: new Date(),
            isActive: true
        }));

        updateParticipantsList();
    }, 2000);
}

/**
 * Update participants list
 */
function updateParticipantsList() {
    const participantsList = document.getElementById('participantsList');
    document.getElementById('participantBadge').textContent = participants.length;

    if (participants.length === 0) {
        participantsList.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <p>No participants yet</p>
            </div>
        `;
        return;
    }

    participantsList.innerHTML = participants.map(participant => `
        <div class="participant-item">
            <div class="participant-info">
                <div class="participant-avatar">
                    ${participant.name.charAt(0).toUpperCase()}
                </div>
                <div class="participant-details">
                    <div class="participant-name">${participant.name}</div>
                    <div class="participant-status">${participant.role} • Active</div>
                </div>
            </div>
            <button class="btn-icon-small" onclick="manageParticipant('${participant.id}')" title="Manage">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="19" cy="12" r="1"/>
                    <circle cx="5" cy="12" r="1"/>
                </svg>
            </button>
        </div>
    `).join('');
}

/**
 * Manage participant
 */
function manageParticipant(participantId) {
    const participant = participants.find(p => p.id === participantId);
    if (!participant) return;

    const action = confirm(`Manage ${participant.name}?\n\nOK = Mute\nCancel = Close`);
    if (action) {
        showNotification(`${participant.name} has been muted`, 'info');
    }
}

/**
 * Copy room ID
 */
function copyRoomId() {
    navigator.clipboard.writeText(roomId).then(() => {
        showNotification('Room ID copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy Room ID', 'error');
    });
}

/**
 * Open host page
 */
function openHostPage() {
    window.open(`host.html?room=${encodeURIComponent(roomId)}`, '_blank');
}

/**
 * Open viewer page
 */
function openViewerPage() {
    window.open(`viewer.html?room=${encodeURIComponent(roomId)}`, '_blank');
}

/**
 * Download report
 */
function downloadReport() {
    const report = {
        roomId: roomId,
        sessionDuration: document.getElementById('sessionDuration').textContent,
        totalViewers: document.getElementById('totalViewers').textContent,
        messageCount: document.getElementById('messageCount').textContent,
        questionCount: document.getElementById('questionCount').textContent,
        participants: participants,
        generatedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(report, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `webinar-report-${roomId}-${Date.now()}.json`;
    link.click();

    URL.revokeObjectURL(url);
    showNotification('Report downloaded', 'success');
}

/**
 * End session
 */
function endSession() {
    if (!confirm('Are you sure you want to end this session? This will disconnect all participants.')) {
        return;
    }

    // Stop iframe
    const iframe = document.getElementById('vdoNinjaDirector');
    iframe.src = '';

    // Stop timer
    if (durationInterval) {
        clearInterval(durationInterval);
    }

    showNotification('Session ended', 'info');

    // Redirect after 2 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

/**
 * Store session data
 */
function storeSessionData() {
    const sessionData = {
        roomId: roomId,
        role: 'control',
        joinedAt: new Date().toISOString()
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

/**
 * Handle page unload
 */
window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = 'Are you sure you want to leave the control panel?';
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeControl);