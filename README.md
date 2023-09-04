# OpenDAoC Account Manager

OpenDAoC Account Manager allows you to link your OpenDAoC account to your Discord for easy password recovery.

## Configuration

To set up the OpenDAoC Account Manager, copy `.env.example` to `.env` and adjust the options:

- **General Settings**:
  - `SERVER_NAME`: Name of your server (e.g., "OpenDAoC").
  - `SITE_URL`: URL of your site (e.g., "https://account.opendaoc.com").
  - `SITE_TITLE`: Title of your site.
  - `SITE_DESCRIPTION`: Description of your site.
  - `SITE_FOOTER`: Footer of your site.
  - `LOGO_PATH`: Path to your logo file (relative to the public directory).

- **Theme Settings**:
  - `THEME_FOREGROUND`: Foreground color in RGB format.
  - `THEME_BACKGROUND_LIGHT`: Light background color in RGB format for the top of the gradient.
  - `THEME_BACKGROUND_DARK`: Dark background color in RGB format for the bottom of the gradient.

- **Toast Notifications Settings**:
  - `TOAST_DURATION`: Duration of the toast notification in seconds.

- **Database Settings**:
  - `DATABASE_HOST`: Database host.
  - `DATABASE_USER`: Database user.
  - `DATABASE_PASSWORD`: Database password.
  - `DATABASE_NAME`: Database name.

- **Password Settings**:
  - `ENCRYPTION_KEY`: Used for encryption. Ensure it's random.
  - `PROHIBITED_CHARACTERS`: Prohibited characters for passwords.
  - `MIN_PASSWORD_LENGTH`: Minimum password length.
  - `MAX_PASSWORD_LENGTH`: Maximum password length.

- **Discord Settings**:
  - `DISCORD_CLIENT_ID`: Discord client ID.
  - `DISCORD_CLIENT_SECRET`: Discord client secret.

Make sure to replace the example values with your actual configurations.

## Getting Started

### Local Development

1. Clone the repository
2. Install dependencies with `npm install` or `yarn install` or `pnpm install`
3. Copy `.env.example` to `.env` and adjust the options
4. Run the development server with `npm run dev` or `yarn dev` or `pnpm dev`

Open `http://localhost:3000` with your browser to see the result.

### Docker

<!-- A Docker image is available at [Docker Hub](https://hub.docker.com/r/opendaoc/account-manager).   -->

You can build the image yourself with the provided `Dockerfile`.  
An example `docker-compose.yml` is available in the repository.


## Learn More
For more details on Next.js, the framework used in this project:

[Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
[Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.