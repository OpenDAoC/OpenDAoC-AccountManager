module.exports = {
    serverName: "OpenDAoC", // Name of your server
    siteTitle: "OpenDAoC | Account Manager", // Title of your site
    siteDescription: "OpenDAoC Account Manager allows you to link your OpenDAoC account to your Discord for easy password recovery.", // Description of your site
    logoPath: "/logo.svg", // Path to your logo file (relative to the public directory).
    DATABASE_HOST: 'localhost', // Database host
    DATABASE_USER: 'root', // Database user
    DATABASE_PASSWORD: 'password', // Database password
    DATABASE_NAME: 'your_database_name', // Database name
    ENCRYPTION_KEY: 'd1be0e5e95a815be6b9af21fc88984aa', // Used for encryption, make sure it's a random. You can use `openssl rand -hex 16` to generate one
    PROHIBITED_CHARACTERS: [" ", "#", "&", "%", ".", "!", "^", "_", "-"], // Prohibited characters for passwords
  };