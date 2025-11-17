# Testing Guide - VDO.Ninja Webinar POC

## Quick Test Instructions

### Step 1: Start Local Server

```bash
# Choose one:
python -m http.server 8000
# OR
npx http-server -p 8000
```

### Step 2: Test the Complete Flow

1. **Open Landing Page**
   - Navigate to: `http://localhost:8000`
   - Click "Join as Host"
   - Note the Room ID displayed

2. **Go Live as Host**
   - Click the green "Go Live" button
   - **ALLOW** camera and microphone permissions when prompted
   - Wait for your camera preview to appear (2-3 seconds)
   - You should see yourself in the video preview

3. **Open Viewer in New Window**
   - Open a **new incognito/private window**
   - Navigate to: `http://localhost:8000`
   - Click "Join as Viewer"
   - Enter the **SAME Room ID** from step 1
   - OR use the direct URL: `http://localhost:8000/viewer.html?room=YOUR_ROOM_ID`

4. **Verify Streaming**
   - The viewer should see the host's video within 3-5 seconds
   - Audio should be working
   - Chat should be functional

---

## Common Issues & Solutions

### Issue: Blank Screen on Viewer

**Possible Causes:**

1. **Host hasn't gone live yet**
   - ✅ Solution: Make sure the host clicked "Go Live" and allowed camera permissions

2. **Different Room IDs**
   - ✅ Solution: Verify both host and viewer are using the EXACT same Room ID
   - Check the URL: `?room=XXXXX` should match

3. **Browser Blocks Camera/Mic**
   - ✅ Solution: Click the camera icon in the address bar and allow permissions

4. **Not using localhost or HTTPS**
   - ✅ Solution: Camera/mic require HTTPS or localhost. For production, deploy to Vercel (includes HTTPS)

5. **Browser Compatibility**
   - ✅ Solution: Use latest Chrome, Firefox, Edge, or Safari

### Issue: No Camera/Microphone Prompt

**Solution:**
- Check browser permissions (URL bar icon)
- Try a different browser
- Make sure you're on `http://localhost` or `https://`
- Restart browser if needed

### Issue: Stream Not Loading

**Solution:**
- Refresh both host and viewer pages
- Clear browser cache
- Check browser console (F12) for errors
- Ensure internet connection is stable

### Issue: Audio Not Working

**Solution:**
- Check system sound settings
- Unmute the viewer page (check speaker icon)
- Verify microphone is working on host side
- Check browser tab is not muted

---

## Testing Checklist

Use this checklist to verify all features:

### Host Page
- [ ] Camera preview appears after "Go Live"
- [ ] Microphone is capturing audio
- [ ] Room ID is displayed
- [ ] Session duration timer is running
- [ ] Camera toggle works
- [ ] Microphone toggle works
- [ ] Screen share button is enabled
- [ ] Viewer count updates
- [ ] "Copy Room ID" works
- [ ] "Copy Viewer Link" works
- [ ] "End Session" stops stream

### Viewer Page
- [ ] Video stream appears (3-5 sec delay expected)
- [ ] Audio is playing
- [ ] Room ID is displayed correctly
- [ ] Chat messages can be sent
- [ ] Audio mute/unmute works
- [ ] Fullscreen toggle works
- [ ] Quality toggle works
- [ ] Viewer count is shown
- [ ] "Leave" button works

### Control Panel (Admin)
- [ ] Director mode loads VDO.Ninja interface
- [ ] Participant list is visible
- [ ] Layout controls work
- [ ] Session statistics display

---

## Browser Console Debugging

Press **F12** to open Developer Tools, then check the **Console** tab for messages:

### Expected Console Messages:

**Host:**
```
Host initialized for room: XXXXX
VDO.Ninja URL prepared: https://vdo.ninja/?push=XXXXX&password=XXXXX...
Started broadcasting to room: XXXXX
```

**Viewer:**
```
Viewer initialized for room: XXXXX
VDO.Ninja viewer URL: https://vdo.ninja/?view=XXXXX&password=XXXXX...
```

### Look for Errors:
- Red error messages indicate problems
- "Permission denied" = allow camera/mic
- "CORS error" = use localhost or HTTPS
- "Failed to load" = check internet connection

---

## Network Requirements

- **Bandwidth**: 2-5 Mbps upload for host, 1-2 Mbps download for viewers
- **Ports**: VDO.Ninja uses WebRTC (ports 3478, 19302, random UDP ports)
- **Firewall**: May need to allow WebRTC traffic
- **VPN**: Some VPNs block WebRTC, disable if issues occur

---

## Testing Best Practices

1. **Use Two Different Browsers**
   - Host in Chrome, Viewer in Firefox
   - Prevents session conflicts

2. **Use Incognito/Private Windows**
   - Prevents cache issues
   - Clean session each time

3. **Test on Different Devices**
   - Desktop, laptop, tablet, phone
   - Verify responsive design

4. **Test Different Network Conditions**
   - WiFi, Ethernet, mobile data
   - Simulated slow 3G (Chrome DevTools)

5. **Test Multiple Viewers**
   - Open 3-5 viewer tabs
   - Verify stream quality holds up

---

## Production Testing (After Vercel Deploy)

When deployed to Vercel, test:

1. **HTTPS Works**
   - Camera/mic permissions work on all devices

2. **Mobile Devices**
   - iOS Safari
   - Android Chrome
   - Responsive layout

3. **Share Links**
   - Copy and paste viewer link
   - QR code generation (if added)

4. **Performance**
   - Stream latency (<1 second ideal)
   - Video quality
   - Audio sync

---

## Quick Debug URLs

For quick testing, use these direct URLs:

**Host:**
```
http://localhost:8000/host.html?room=testroom123
```

**Viewer:**
```
http://localhost:8000/viewer.html?room=testroom123
```

**Control:**
```
http://localhost:8000/control.html?room=testroom123
```

---

## Still Having Issues?

1. **Check VDO.Ninja directly**: Visit https://vdo.ninja and test camera/mic there first
2. **Browser Console**: Look for specific error messages (F12)
3. **Network Tab**: Check if VDO.Ninja requests are loading (F12 → Network)
4. **Try Different Browser**: Chrome, Firefox, Edge, Safari
5. **Restart**: Close all tabs, restart browser, try again

---

## Success Indicators

You'll know it's working when:
- ✅ Host sees their own camera feed after clicking "Go Live"
- ✅ Viewer sees host's camera feed with <3 second delay
- ✅ Audio is synchronized with video
- ✅ Chat messages appear in real-time
- ✅ No console errors
- ✅ Smooth video playback (no stuttering)

---

## Client Demo Tips

When demonstrating to the client:

1. **Pre-test**: Test 30 minutes before demo
2. **Good Lighting**: Host should have good lighting
3. **Stable Internet**: Use wired connection if possible
4. **Professional Background**: Clean, professional background
5. **Test Audio**: Verify audio levels before demo
6. **Have Backup**: Have mobile hotspot ready
7. **Screen Recording**: Record demo for reference

---

## Contact & Support

For VDO.Ninja specific issues:
- Documentation: https://docs.vdo.ninja
- GitHub: https://github.com/steveseguin/vdo.ninja
- Discord: VDO.Ninja community server
