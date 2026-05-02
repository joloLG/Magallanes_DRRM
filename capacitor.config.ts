import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.incidentSystem.mdrrmo',
  appName: 'M.E.A.',
  webDir: 'public',
  server: { url: 'https://magallanes-drrm-app.vercel.app/', cleartext: false },
  plugins: {
    StatusBar: {
      style: 'default',
      backgroundColor: '#ffffff',
      overlaysWebView: false
    },
    Keyboard: {
      resize: 'native'
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
    useLegacyBridge: true,
    backgroundColor: '#ffffff'
  },
  ios: {
    backgroundColor: '#ffffff',
    scrollEnabled: true
  },
  loggingBehavior: 'production'
};

export default config;
