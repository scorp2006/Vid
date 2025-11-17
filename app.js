// ===============================================
// Landing Page - Main Application Logic
// Handles role selection and room management
// ===============================================

/**
 * Generate a unique room ID for the webinar session
 * Uses simple format without hyphens (like the working test)
 */
function generateRoomId() {
    const randomStr = Math.random().toString(36).substring(2, 10);
    const roomId = `stream${randomStr}`;

    document.getElementById('roomId').value = roomId;

    // Show visual feedback
    showNotification('Room ID generated!', 'success');
}

/**
 * Join webinar session with selected role
 * @param {string} role - The role to join as (host, viewer, or control)
 */
function joinAs(role) {
    const roomIdInput = document.getElementById('roomId');
    let roomId = roomIdInput.value.trim();

    // Generate room ID if not provided and role is host or control
    if (!roomId && (role === 'host' || role === 'control')) {
        roomId = generateNewRoomId();
        roomIdInput.value = roomId;
    }

    // Validate room ID for viewer
    if (role === 'viewer' && !roomId) {
        showNotification('Please enter a Room ID to join as viewer', 'error');
        roomIdInput.focus();
        return;
    }

    // Store session data
    const sessionData = {
        roomId: roomId,
        role: role,
        joinedAt: new Date().toISOString(),
        userName: `${role.charAt(0).toUpperCase() + role.slice(1)}-${Math.random().toString(36).substring(2, 6)}`
    };

    localStorage.setItem('webinarSession', JSON.stringify(sessionData));

    // Navigate to appropriate page
    navigateToPage(role, roomId);
}

/**
 * Generate a new room ID without displaying
 * @returns {string} The generated room ID
 */
function generateNewRoomId() {
    const randomStr = Math.random().toString(36).substring(2, 10);
    return `stream${randomStr}`;
}

/**
 * Navigate to the appropriate page based on role
 * @param {string} role - The user's role
 * @param {string} roomId - The room ID to join
 */
function navigateToPage(role, roomId) {
    const pageMap = {
        host: 'host.html',
        viewer: 'viewer.html',
        control: 'control.html'
    };

    const targetPage = pageMap[role];
    if (targetPage) {
        // Add smooth transition
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
            window.location.href = `${targetPage}?room=${encodeURIComponent(roomId)}`;
        }, 300);
    } else {
        showNotification('Invalid role selected', 'error');
    }
}

/**
 * Show notification message to user
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
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

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Add CSS animations for notifications
 */
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Handle keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
    // Enter key in room ID input
    if (e.key === 'Enter' && document.activeElement.id === 'roomId') {
        const roomId = document.getElementById('roomId').value.trim();
        if (roomId) {
            joinAs('viewer');
        }
    }
});

/**
 * Load session data if returning user
 */
function loadSessionData() {
    const sessionData = localStorage.getItem('webinarSession');
    if (sessionData) {
        try {
            const session = JSON.parse(sessionData);
            const roomIdInput = document.getElementById('roomId');

            // Show last used room ID as placeholder
            if (session.roomId && roomIdInput) {
                roomIdInput.placeholder = `Last used: ${session.roomId}`;
            }
        } catch (error) {
            console.error('Error loading session data:', error);
        }
    }
}

/**
 * Check browser compatibility
 */
function checkBrowserCompatibility() {
    const isCompatible = !!(
        navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia &&
        window.RTCPeerConnection
    );

    if (!isCompatible) {
        showNotification('Your browser may not support all features. Please use a modern browser.', 'error');
    }
}

/**
 * Add entrance animation
 */
function addEntranceAnimation() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// ===============================================
// Initialize on page load
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    addNotificationStyles();
    loadSessionData();
    checkBrowserCompatibility();
    addEntranceAnimation();

    console.log('Webinar Platform Initialized');
    console.log('VDO.Ninja Integration Ready');
});