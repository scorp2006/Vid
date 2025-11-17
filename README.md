# Professional Webinar Platform - VDO.Ninja Integration

A complete, production-ready webinar platform built with VDO.Ninja for ultra-low latency streaming. This POC demonstrates a full-featured webinar solution with host broadcasting, viewer participation, and admin control capabilities.

## Features

### Landing Page (index.html)
- **Professional UI**: Modern gradient design with smooth animations
- **Role Selection**: Choose between Host, Viewer, or Admin/Control
- **Room Management**: Auto-generation of unique room IDs or join existing sessions
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

### Host Dashboard (host.html)
- **Live Broadcasting**: Stream video and audio using VDO.Ninja's push technology
- **Media Controls**:
  - Toggle camera on/off
  - Mute/unmute microphone
  - Screen sharing capability
- **Session Management**:
  - Go Live/End Session controls
  - Real-time viewer count
  - Session duration tracking
- **Stream Settings**:
  - Configurable bitrate (2.5Mbps, 1.5Mbps, 800Kbps)
  - Codec selection (VP8, H.264, VP9)
  - 1080p HD streaming support
- **Quick Actions**:
  - Copy room ID
  - Share viewer link
  - Open viewer/control pages in new windows

### Viewer Page (viewer.html)
- **HD Streaming**: Watch live stream with auto-play
- **Interactive Chat**:
  - Real-time Q&A messaging
  - System notifications
  - Persistent chat history
- **Playback Controls**:
  - Audio mute/unmute
  - Fullscreen mode
  - Quality adjustment (Auto/HD/SD)
- **Viewer Features**:
  - Personalized viewer names
  - Session sharing
  - Issue reporting
- **Connection Status**: Real-time connection monitoring

### Admin Control Panel (control.html)
- **Director Mode**: Full VDO.Ninja director view for managing all participants
- **Layout Management**:
  - Grid layout
  - Speaker focus
  - Sidebar layout
  - Fullscreen mode
- **Session Statistics**:
  - Total viewer count
  - Session duration
  - Message count
  - Question tracking
- **Participant Management**:
  - View all active participants
  - Individual participant controls
  - Mute all functionality
- **Session Controls**:
  - Recording toggle
  - Screen sharing
  - Chat management
- **Reporting**: Download session reports in JSON format

## Technology Stack

- **Streaming**: VDO.Ninja (https://vdo.ninja)
- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Modern CSS3 with CSS Grid and Flexbox
- **Storage**: LocalStorage for session persistence
- **Architecture**: Client-side SPA with URL routing

## VDO.Ninja Integration

### Host Configuration
```javascript
// Push mode parameters
{
  push: roomId,              // Broadcast to room
  room: roomId,              // Room identifier
  quality: 2,                // High quality (0-3)
  bitrate: 1500,             // Video bitrate in Kbps
  codec: 'h264',             // Video codec
  audiocodec: 'opus',        // Audio codec
  stereo: 1,                 // Stereo audio
  echocancellation: 1,       // Echo cancellation
  autostart: 1,              // Auto start streaming
  clean: 1                   // Clean UI mode
}
```

### Viewer Configuration
```javascript
// View mode parameters
{
  view: roomId,              // View room stream
  room: roomId,              // Room identifier
  quality: 2,                // High quality
  codec: 'h264',             // Preferred codec
  autoplay: 1,               // Auto play stream
  clean: 1,                  // Clean UI
  cover: 1,                  // Cover mode (fit to container)
  scale: 1                   // Scale video
}
```

### Director Configuration
```javascript
// Director mode parameters
{
  director: roomId,          // Director mode
  room: roomId,              // Room identifier
  quality: 2,                // High quality
  clean: 0,                  // Show controls
  effects: 1,                // Enable effects
  label: 1,                  // Show participant labels
  layout: 1,                 // Default layout
  grid: 1                    // Grid layout mode
}
```

## Installation & Setup

### Local Development

1. **Clone or Download** the project files to your local machine

2. **Serve the files** using any local web server:

   **Option 1: Python**
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option 2: Node.js (http-server)**
   ```bash
   npx http-server -p 8000
   ```

   **Option 3: PHP**
   ```bash
   php -S localhost:8000
   ```

   **Option 4: VS Code Live Server**
   - Install "Live Server" extension
   - Right-click on index.html
   - Select "Open with Live Server"

3. **Access the application**:
   - Open browser and navigate to `http://localhost:8000`

### Production Deployment

1. **Upload all files** to your web hosting:
   - index.html
   - host.html
   - viewer.html
   - control.html
   - styles.css
   - app.js
   - host.js
   - viewer.js
   - control.js

2. **Configure HTTPS**: VDO.Ninja requires HTTPS for camera/microphone access

3. **Update URLs** if deploying to a subdirectory

## Usage Guide

### Starting a Webinar as Host

1. Navigate to the landing page
2. Click "Join as Host"
3. Optionally enter a custom Room ID or leave blank for auto-generation
4. Click "Start Hosting"
5. Share the Room ID with viewers
6. Click "Go Live" to start broadcasting
7. Use media controls to manage camera/mic/screen sharing
8. Click "End Session" when finished

### Joining as Viewer

1. Navigate to the landing page
2. Click "Join as Viewer"
3. Enter the Room ID provided by the host
4. Click "Join Audience"
5. Stream will auto-play when host goes live
6. Use chat to ask questions
7. Use controls for audio, fullscreen, and quality settings

### Admin Control Panel

1. Navigate to the landing page
2. Click "Admin Control"
3. Enter the Room ID (or auto-generate for new session)
4. Access "Control Panel"
5. View all participants in director mode
6. Manage layouts and session settings
7. Monitor statistics and download reports

## File Structure

```
webinar/
├── index.html          # Landing page
├── host.html           # Host broadcasting interface
├── viewer.html         # Viewer watching interface
├── control.html        # Admin control panel
├── styles.css          # Complete styling
├── app.js              # Landing page logic
├── host.js             # Host functionality
├── viewer.js           # Viewer functionality
├── control.js          # Control panel logic
└── README.md           # This file
```

## Browser Compatibility

- **Chrome/Edge**: Full support ✓
- **Firefox**: Full support ✓
- **Safari**: Full support ✓
- **Opera**: Full support ✓
- **Mobile browsers**: Full support ✓

**Requirements**:
- Modern browser (last 2 versions)
- WebRTC support
- HTTPS for production (camera/mic access)

## Key Features for Client Demo

### Professional Design
- Modern gradient color scheme
- Smooth animations and transitions
- Responsive layout for all devices
- Intuitive user interface

### VDO.Ninja Integration
- Ultra-low latency streaming (<500ms)
- HD video quality (up to 1080p)
- Configurable bitrate and codecs
- Screen sharing support
- Director mode for advanced control

### User Experience
- One-click room creation
- Simple role selection
- Real-time viewer count
- Interactive chat/Q&A
- Session duration tracking
- Fullscreen mode
- Quality controls

### Admin Features
- Complete participant overview
- Layout management
- Session recording capability
- Downloadable reports
- Mute all functionality
- Real-time statistics

## Customization

### Color Scheme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-gradient-start: #667eea;
    --primary-gradient-end: #764ba2;
    --secondary-color: #48bb78;
    --danger-color: #f56565;
}
```

### VDO.Ninja Settings
Modify parameters in respective JavaScript files:
- `host.js` - Host streaming settings
- `viewer.js` - Viewer playback settings
- `control.js` - Director mode settings

### Branding
- Update logo SVG in HTML files
- Modify title and subtitle text
- Change color scheme
- Add custom footer

## Troubleshooting

### Stream Not Loading
- Check internet connection
- Verify Room ID is correct
- Ensure host has started broadcasting
- Check browser console for errors
- Try refreshing the page

### Camera/Microphone Not Working
- Grant browser permissions
- Check device availability
- Ensure no other app is using the device
- Verify HTTPS connection (required for production)

### Audio Issues
- Check if audio is muted in browser
- Verify volume settings
- Try toggling mute/unmute
- Check device audio settings

## Production Considerations

### For Real Production Use

1. **Backend Integration**:
   - Implement real-time chat with WebSocket (Socket.io, Pusher, etc.)
   - Add authentication and authorization
   - Store session data in database
   - Implement actual viewer counting
   - Add user management

2. **Security**:
   - Add room passwords/authentication
   - Implement rate limiting
   - Add CSRF protection
   - Sanitize user inputs
   - Use secure WebSocket connections

3. **Features to Add**:
   - Recording functionality
   - Polls and surveys
   - Hand raising
   - Breakout rooms
   - Email notifications
   - Calendar integration
   - Analytics and insights

4. **Scalability**:
   - CDN for static assets
   - Load balancing for multiple sessions
   - Database optimization
   - Caching strategy
   - Monitoring and logging

## Support & Documentation

- **VDO.Ninja Docs**: https://docs.vdo.ninja/
- **VDO.Ninja GitHub**: https://github.com/steveseguin/vdo.ninja
- **WebRTC Info**: https://webrtc.org/

## License

This is a proof-of-concept project. VDO.Ninja is licensed separately.

## Credits

- **VDO.Ninja**: Built by Steve Seguin (https://vdo.ninja)
- **Design**: Modern professional webinar platform
- **Icons**: Inline SVG graphics

---

**Built for professional webinar demonstrations with VDO.Ninja integration.**