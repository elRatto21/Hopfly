<div align="center">
    <img src="resources/icon.png" alt="Logo" width="150" height="150">
</div>

# Hopfly

Hopfly is a Beer-Tracker app which you can use to track your own consumption and see useful stats!

## Content

1. [Installation & Setup](#-installation--setup)

## 🚀 Installation & Setup

### Prerequisites

- Node.js
- Ionic CLI
  ```bash
  npm install -g @ionic/cli
  ```
- Android Studio
- Supabase

### Installation

1. Clone repo:
   ```bash
   git clone https://github.com/elratto21/hopfly.git
   ```

2. Go to project directory
   ```bash
   cd hopfly
   ```

3. Install packages
   ```bash
   npm install
   ```

4. Start development server (Open in web)
   ```bash
   ionic serve
   ```

### Build android APK

```bash
ionic build
npx cap add android
npx cap sync
npx cap open android
```

Now go to "Build", "Generate Signed App Bundle / APK", choose APK and generate a new release APK with your keystore. The APK can then be installed on android devices or in an emulator.
