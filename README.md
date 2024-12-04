# AI Image & Video Editor

A powerful online editor leveraging AI capabilities for image and video manipulation, built with Next.js, Shadcn UI, and Cloudinary API.

## ✨ Features

### Image Editing Tools

- **Generate & Remove** - AI-powered object generation and removal
- **Background Removal** - Clean background removal from images
- **AI Background Replace** - Smart background replacement with AI
- **Generative Fill** - Context-aware image completion
- **Part Extraction** - Intelligent object extraction from images
- **AI Recolor** - Smart recoloring using AI

### Video Editing Tools

- **Video Transcription** - Convert video speech to text
- **Smart Crop** - Intelligent video cropping and resizing

## 🚀 Tech Stack

- **Frontend Framework:** Next.js
- **UI Components:** Shadcn UI
- **Animations:** Framer Motion
- **Image/Video Processing:** Cloudinary API
- **Server-Side:** Next.js Server Actions

## 🛠️ Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/HardikRathod123/editorai
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables
    - Copy `.env.example` to `.env.local`
    - Fill in the required credentials:

```env
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_URL=
CLOUDINARY_UPLOAD_PRESET=
```

4. Start the development server

```bash
npm run dev
```

## 📚 Learning Guide

This project is structured with learning in mind. To get the most out of it:

1. Install the "Git Graph" extension in VS Code
2. Follow the commit history step-by-step
3. Each commit represents a specific feature implementation or concept
4. The commits are organized to provide a logical learning progression

## 🔄 Step-by-Step Learning Path

To follow the development process:

1. Open Git Graph extension (`Ctrl/Cmd + Shift + P` → "Git Graph: View Git Graph")
2. Start from the initial commit
3. Follow each commit chronologically
4. Each commit message explains the implementation details

## 🎯 Future Roadmap

- [ ] Additional AI features implementation
- [ ] Enhanced error handling with Cloudinary integration
- [ ] Rate limiting implementation for API calls
- [ ] Custom Cloudinary API key support for users

## ⚠️ Known Limitations

- Currently relies on default error handling from Cloudinary
- No rate limiting implemented (demo project)
- Uses shared Cloudinary credentials

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Submit a pull request

## 🙏 Acknowledgments

- Thanks to the Next.js team
- Shadcn UI for the component library
- Cloudinary for their API
- Framer Motion for animations

---

Built with ❤️ by [Hardik Rathod](https://x.com/HardikR68342506)
