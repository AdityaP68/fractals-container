interface RuntimeConfig {
    API_URL?: string;
    FEATURE_FLAG?: string;
    SAMPLE?: string;
    // Add other environment variables as needed
  }
  
  declare global {
    interface Window {
      __RUNTIME_CONFIG__?: RuntimeConfig;
    }
  }
  
  export const getRuntimeConfig = (): RuntimeConfig => {
    if (typeof window === 'undefined') {
      throw new Error('Runtime config is only available in browser environment');
    }
    return window.__RUNTIME_CONFIG__ || {};
  };
  
  export const getEnv = (key: keyof RuntimeConfig): string | undefined => {
    const config = getRuntimeConfig();
    return config[key];
  };