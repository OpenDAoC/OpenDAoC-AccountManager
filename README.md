# OpenDAoC Account Manager

OpenDAoC Account Manager allows you to link your OpenDAoC account to your Discord for easy password recovery.

## Configuration

To set up the OpenDAoC Account Manager, copy `.env.example` to `.env` and adjust the options:

- **General Settings**:
  - `SERVER_NAME`: Name of your server (e.g., "OpenDAoC").
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
  - `MIN_PASSWORD_LENGTH`: Minimum password length.
  - `MAX_PASSWORD_LENGTH`: Maximum password length.

- **Discord Settings**:
  - `DISCORD_CLIENT_ID`: Discord client ID.
  - `DISCORD_CLIENT_SECRET`: Discord client secret.

- **Next Auth Settings**
  - `NEXTAUTH_SECRET`: Used for encryption. Ensure it's random.  Generated with `openssl rand -hex 16`
  - `NEXTAUTH_URL`: : URL of your site (e.g., "https://account.opendaoc.com").

Make sure to replace the example values with your actual configurations.

## Getting Started

### Prerequisites

Apart from the obvious like Node.js and access to the server database, you will need to create a Discord application and enable the OAuth2 API.

### Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.
2. Go to the OAuth2 tab and add a redirect URL. This should be the URL of your site with `/api/auth/callback/discord` appended to it (e.g., `https://account.opendaoc.com/api/auth/callback/discord`).
3. In the OAuth2 tab, copy the `client ID` and `client secret` and add them to your `.env` file.

### Local Development

1. Clone the repository or download the [latest release](https://github.com/OpenDAoC/opendaoc-accountmanager/releases/latest)
2. Install dependencies with `npm install` or `yarn install` or `pnpm install`
3. Copy `.env.example` to `.env.local` and adjust the values
4. Run the development server with `npm run dev` or `yarn dev` or `pnpm dev`

Open `http://localhost:3000` with your browser to see the result.

### Docker

A Docker image is available at on the [GitHub Registry](https://github.com/OpenDAoC/opendaoc-accountmanager/pkgs/container/opendaoc-accountmanager) and can be pulled with:

```bash
docker pull ghcr.io/opendaoc/opendaoc-accountmanager:latest
```

Alternatively, can build the image yourself with the provided `Dockerfile`.  

An example `docker-compose.yml` is available in the repository.  
Remember to reverse proxy the container with a web server like Nginx or Caddy.

#### Environment Variables in Docker
To inject env vars to Next.js applications we need to replace them using the `entrypoint.sh` script.  
If your not using the provided `docker-compose.yml`, make sure to set the environment variables. 

## Learn More
For more details on Next.js, the framework used in this project:

[Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.  
[Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.