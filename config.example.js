module.exports = {
    // General settings
    serverName: "OpenDAoC", // Name of your server
    siteUrl: "https://account.opendaoc.com", // URL of your site
    siteTitle: "OpenDAoC | Account Manager", // Title of your site
    siteDescription: "OpenDAoC Account Manager allows you to link your OpenDAoC account to your Discord for easy password recovery.", // Description of your site
    siteFooter: "OpenDAoC Account Manager", // Footer of your site
    logoPath: "/logo.svg", // Path to your logo file (relative to the public directory).
    // Database settings
    DATABASE_HOST: 'localhost', // Database host
    DATABASE_USER: 'root', // Database user
    DATABASE_PASSWORD: 'password', // Database password
    DATABASE_NAME: 'your_database_name', // Database name
    // Password settings
    ENCRYPTION_KEY: 'd1be0e5e95a815be6b9af21fc88984aa', // Used for encryption, make sure it's a random. You can use `openssl rand -hex 16` to generate one
    PROHIBITED_CHARACTERS: [" ", "#", "&", "%", ".", "!", "^", "_", "-"], // Prohibited characters for passwords
    // Discord settings
    DISCORD_CLIENT_ID: 'your_discord_client_id', // Discord client ID
    DISCORD_CLIENT_SECRET: 'your_discord_client_secret', // Discord client secret
  };