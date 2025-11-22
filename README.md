# Assignment

This repository conatins code for [my](https://harsh-vansjaliya.vercel.app/) assignment for WealthUp.

## Task 1

### `/upload` Route

- Accepts .txt files only
- Validates file type + size
- Processes multipart form-data using Multer
- Stores the uploaded file securely in **AWS S3**
- Returns **public file URL**

### Deployment

- Backend deployed on **AWS EC2 (Ubuntu)**
- Reverse-proxied using **NGINX**
- Application process managed with **PM2**
