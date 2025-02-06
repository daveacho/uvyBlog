# Use Python Alpine for a lightweight image
FROM python:3-alpine

# Set the working directory
WORKDIR /usr/app

# Install dependencies first (Optimized for caching)
COPY requirements.txt /usr/app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY ./backend_files /usr/app/

# Expose the Django development server port
EXPOSE 8000

# Start the Django server
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]