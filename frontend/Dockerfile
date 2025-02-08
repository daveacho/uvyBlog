# Use Node.js Alpine for a lightweight image
FROM node:23-alpine

# Set the working directory
WORKDIR /usr/app

# Copy project files
COPY ./frontend_files /usr/app

# Install dependencies
RUN npm install

# Expose the frontend development port
EXPOSE 5173

# Set environment variables
ENV VITE_API_URL='http://18.170.225.180:8000'

# Start the React development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]