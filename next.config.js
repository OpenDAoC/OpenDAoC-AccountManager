module.exports = {
  publicRuntimeConfig: {
    // General settings
    serverName: process.env.SERVER_NAME || "OpenDAoC",
    siteUrl: process.env.SITE_URL || "http://localhost:3000",
    siteTitle: process.env.SITE_TITLE || "OpenDAoC | Account Manager",
    siteDescription: process.env.SITE_DESCRIPTION || "OpenDAoC Account Manager allows you to link your OpenDAoC account to your Discord for easy password recovery.",
    siteFooter: process.env.SITE_FOOTER || "OpenDAoC Account Manager",
    logoPath: process.env.LOGO_PATH || "/logo.svg",
    // Theme settings
    theme: {
      foreground: process.env.THEME_FOREGROUND || '0, 0, 0',
      backgroundLight: process.env.THEME_BACKGROUND_LIGHT || '8, 38, 80',
      backgroundDark: process.env.THEME_BACKGROUND_DARK || '2, 7, 19',
    },
    
    // Toast notifications settings
    toastDuration: parseInt(process.env.TOAST_DURATION) || 8,
    
    // Database settings
    DATABASE_HOST: process.env.DATABASE_HOST || 'database-host',
    DATABASE_USER: process.env.DATABASE_USER || 'database-user',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || 'database-password',
    DATABASE_NAME: process.env.DATABASE_NAME || 'database-name',
    
    // Password settings
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'encryption-key', // 32 characters, generated with `openssl rand -hex 16`
    PROHIBITED_CHARACTERS: process.env.PROHIBITED_CHARACTERS?.split(",") || [" ", "#", "&", "%", ".", "!", "^", "_", "-"],
    MIN_PASSWORD_LENGTH: parseInt(process.env.MIN_PASSWORD_LENGTH) || 6,
    MAX_PASSWORD_LENGTH: parseInt(process.env.MAX_PASSWORD_LENGTH) || 12,
    
    // Discord settings
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || 'my-discord-client-id',
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET || 'my-discord-client-secret',
  }
}
