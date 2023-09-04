module.exports = {
  images: {
    dangerouslyAllowSVG: true,
  },
  publicRuntimeConfig: {
    // General settings
    serverName: process.env.SERVER_NAME,
    siteUrl: process.env.SITE_URL,
    siteTitle: process.env.SITE_TITLE,
    siteDescription: process.env.SITE_DESCRIPTION,
    siteFooter: process.env.SITE_FOOTER,
    logoPath: process.env.LOGO_PATH,
    // Theme settings
    theme: {
      foreground: process.env.THEME_FOREGROUND,
      backgroundLight: process.env.THEME_BACKGROUND_LIGHT,
      backgroundDark: process.env.THEME_BACKGROUND_DARK,
    },
    
    // Toast notifications settings
    toastDuration: parseInt(process.env.TOAST_DURATION) || 8,
    
    // Database settings
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,
    
    // Password settings
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY, // 32 characters, generated with `openssl rand -hex 16`
    PROHIBITED_CHARACTERS: process.env.PROHIBITED_CHARACTERS?.split(",") || [" ","#","&","%",".","!","^","_","-"].split(","),
    MIN_PASSWORD_LENGTH: parseInt(process.env.MIN_PASSWORD_LENGTH),
    MAX_PASSWORD_LENGTH: parseInt(process.env.MAX_PASSWORD_LENGTH),
    
    // Discord settings
    DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  }
}
