#!/bin/bash
set +x

envFilename='.env.production'

# Set permissions
chown -R nextjs:nodejs /app
chown nextjs:nodejs $envFilename

# Replace values in .env.production with environment variables
tempFile=$(mktemp)
while IFS= read -r line || [ -n "$line" ]; do
    # Skip comments or empty lines
    if [[ "${line:0:1}" == "#" ]] || [[ -z "$line" ]]; then
        continue
    fi

    # Split the line into name and default value
    configName="$(cut -d'=' -f1 <<<"$line")"
    defaultValue="$(cut -d'=' -f2 <<<"$line")"

    # Get the environment variable value
    envValue=$(printenv "$configName")

    # If the environment variable is set, replace the default value in .env.production
    if [[ -n "$envValue" ]]; then
        echo "Replace: $defaultValue with: $envValue in $envFilename"
        printf "%s\n" "$line" | sed "s#^$configName=$defaultValue#$configName=$(printf '%s' "$envValue" | sed 's/[\/&]/\\&/g')#" >> "$tempFile"
    else
        printf "%s\n" "$line" >> "$tempFile"
    fi
done < $envFilename

# Replace the contents of .env.production with the modified temp file
cat "$tempFile" > "$envFilename"
rm "$tempFile"

# Build the site as the nextjs user
su -s /bin/sh -c "npm run build" nextjs

# Start the Next.js app as nextjs user
su -s /bin/sh -c "exec node_modules/.bin/next start" nextjs
