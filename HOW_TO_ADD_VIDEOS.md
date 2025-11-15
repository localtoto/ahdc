# How to Add Videos to Properties

## Step-by-Step Guide

### 1. Prepare Your Video File

- **Supported formats**: `.mp4`, `.webm`, `.mov`
- **Recommended**: MP4 format with H.264 codec for best compatibility
- **Resolution**: 1920x1080 (Full HD) or higher
- **File size**: Keep under 50MB for optimal performance

### 2. Add Video to Property Folder

Navigate to the property's videos folder:
```
src/properties/property-{id}/videos/
```

For example, for property-1:
```
src/properties/property-1/videos/
```

### 3. Place Your Video File

Simply copy your video file into the videos folder:
```bash
# Example
cp your-video.mp4 src/properties/property-1/videos/property-tour.mp4
```

### 4. Video Will Automatically Load

- The system **automatically discovers** all videos in the folder
- No code changes or configuration needed
- Videos appear in the **Gallery carousel** on the property detail page

## How Videos Are Displayed

1. **Gallery Carousel**: Videos appear alongside images in the gallery
2. **Video Controls**: Built-in browser controls (play, pause, volume, fullscreen)
3. **Responsive**: Videos adapt to screen size
4. **Order**: Videos appear after images in the carousel

## Example File Structure

```
src/properties/property-1/
├── data.json
├── images/
│   ├── image1.jpg
│   └── ...
├── videos/              ← Add videos here
│   ├── property-tour.mp4
│   ├── interior-tour.webm
│   └── ...
└── documents/
    └── ...
```

## Multiple Videos

You can add **multiple videos** to a property:
- All videos will be automatically loaded
- They'll appear in the gallery carousel
- Users can navigate through them using carousel controls

## Testing

1. Add a video file to `src/properties/property-1/videos/`
2. Visit the property detail page: `/property/1`
3. Scroll to the Gallery section
4. Navigate through the carousel to find your video
5. Click play to watch the video

## Troubleshooting

**Video not showing?**
- Check file format is `.mp4`, `.webm`, or `.mov`
- Ensure file is in the correct `videos/` folder
- Refresh the page (hard refresh: Ctrl+F5 or Cmd+Shift+R)
- Check browser console for errors

**Video not playing?**
- Check video codec compatibility (H.264 recommended)
- Try converting to MP4 format
- Check file size (very large files may load slowly)

## Video Best Practices

- **Keep it short**: 1-5 minutes is ideal for property tours
- **Optimize file size**: Compress videos to reduce load time
- **Good quality**: Use at least 1080p resolution
- **Clear audio**: Ensure good audio quality for voiceovers
- **Stable footage**: Use tripod or stabilization for smooth viewing

