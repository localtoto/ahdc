# Property Template

## How to Add a New Property

1. Copy this entire `_template` directory
2. Rename it to your property ID (e.g., `property-13`)
3. Update `data.json` with your property details
4. Add images to the `images/` folder
5. (Optional) Add videos to the `videos/` folder
6. (Optional) Add PDF documents to the `documents/` folder
7. Update the `images` array in `data.json` to reference your image files

## File Structure

```
property-id/
├── data.json          # Property metadata
├── images/            # Property images
│   ├── image1.jpg
│   ├── image2.jpg
│   └── ...
├── videos/            # Property videos (optional)
│   └── video1.mp4
└── documents/         # Property PDF documents (optional)
    ├── property-brochure.pdf
    ├── floor-plan.pdf
    └── ...
```

## Notes

- Property ID should be unique (e.g., `property-13`, `villa-mumbai-1`)
- Images should be placed in the `images/` folder
- Videos should be placed in the `videos/` folder (supports .mp4, .webm, .mov)
- PDF documents should be placed in the `documents/` folder (supports .pdf)
- Update the `images` array in `data.json` to match your actual image filenames
- Videos and PDFs are automatically discovered - just add them to their respective folders
- The property will automatically appear on the frontend after adding the directory

## Video and PDF Support

- **Videos**: Place video files (.mp4, .webm, .mov) in the `videos/` folder. They will automatically appear in the gallery carousel.
- **PDFs**: Place PDF files (.pdf) in the `documents/` folder. They will automatically appear in the "Property Documents" section with view and download options.

