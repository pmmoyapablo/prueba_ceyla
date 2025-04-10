# Use an official Node.js runtime as a parent image
FROM node:18-alpine as builder

# Set the working directory in the container 
WORKDIR /app

# Copy all files from the current directory to the working directory
COPY api_ceyla/ ./
# Copy package.json and package-lock.json first to leverage Docker cache
#COPY package*.json ./
# Copy the rest of the application code
#COPY . .

# Install app dependencies
RUN npm install

# Compile TypeScript to JavaScript
RUN npm run build

# Development stage
FROM node:18-alpine as development

WORKDIR /app

# Set NODE_ENV to development
ENV NODE_ENV=development

# Copy all necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.sequelizerc ./
COPY --from=builder /app/startup.sh ./

# Make startup.sh executable
RUN chmod +x ./startup.sh

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application(in development)
#ENTRYPOINT [ "./startup.sh" ]
CMD ["npm", "run", "dev"]

# Production stage
FROM builder as production

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy all necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.sequelizerc ./
COPY --from=builder /app/startup.sh ./

# Make startup.sh executable
RUN chmod +x ./startup.sh

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application(in production)
CMD ["npm", "start"]