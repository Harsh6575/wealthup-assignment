# WealthUp Assignment — File Upload Service (Node.js + Express + S3 + EC2)

This repository contains [my](https://harsh-vansjaliya.vercel.app/) solution for the WealthUp backend assignment.
The project implements a **file upload API** using Express.js, deployed on **AWS EC2**, and uploads .txt files to **Amazon S3**.

---

## Features

- Upload `.txt` files via POST `/upload`
- File stored in AWS S3 bucket
- Returns a public S3 URL
- Deployed on EC2 with NGINX reverse proxy + PM2 process manager
- Secure environment variable loading using `.env` & systemd/pm2 ecosystem
- Structured logging (Winston + Morgan)
- Production-ready folder structure

---

## Tech Stack

| Component       | Technology          |
| --------------- | ------------------- |
| Backend         | Node.js, Express.js |
| File Upload     | Multer              |
| Cloud Storage   | AWS S3              |
| Deployment      | AWS EC2             |
| Reverse Proxy   | NGINX               |
| Process Manager | PM2                 |
| Logging         | Winston + Morgan    |

---

## Environment Variables

create `.env` or change in `.env.example`

```env
PORT=3000
AWS_REGION=your-region
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-access-key
S3_BUCKET_NAME=s3-bucket-name

# NODE_ENV="production"
```

---

## API Documentation

### POST `/upload`

#### Request

`Content-Type: multipart/form-data`
Field name: `file`

#### Example using curl

```bash
curl -X POST http://3.109.122.130/api/upload \
  -F "file=@./sample.txt"
```

#### Sucess Response

```json
{
  "message": "File upload successfull",
  "data": {
    "url": "https://wealthup-assignment-1.s3.ap-south-1.amazonaws.com/files/1763801806822-sample.txt"
  }
}
```

---

## Local Development Setup

### 1. Clone the repo

```bash
git clone https://github.com/harsh6575/wealthup-assignment.git
cd wealthup-assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start server

```bash
npm run dev
```

### 4. Test upload

```bash
curl -X POST http://localhost:3000/api/upload -F "file=@./sample.txt"
```

---

## Deployment on AWS EC2 — Complete Guide

This is the detailed deployment guide.

### 1. Launch EC2 Instance

- Ubuntu 22.04
- Allow inbound rules:
  - `22` SSH
  - `80` HTTP
  - `443` HTTPS

### 2. Update `apt` and Install `Node` and `NPM`

```bash
sudo apt update
sudo apt install nodejs -y
sudo apt install npm -y
```

### 3. Clone Project

```bash
git clone https://github.com/harsh6575/wealthup-assignment.git
cd wealthup-assignment
npm ci
```

### 4. Set environment variables

On EC2, create .env:

```bash
nano .env
```

Paste AWS settings.

### 5. Run with PM2

```bash
sudo npm i -g pm2
pm2 start src/server.js --name "wealthup-assignment"
pm2 startup systemd
pm2 save
```

---

## Configure NGINX Reverse Proxy

### 1. Install `nginx`

```bash
sudo apt install nginx -y
```

### 2. Remove default config

```bash
sudo rm /etc/nginx/sites-enabled/default
```

### 3. Create new config

```bash
sudo nano /etc/nginx/sites-available/backend.conf
```

### 4. Paste the content in that file

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_PUBLIC_IP;

    location / {
        proxy_pass http://127.0.0.1:3000;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        client_max_body_size 50M;
    }
}
```

### 5. Enable custome config

```bash
sudo ln -s /etc/nginx/sites-available/backend.conf /etc/nginx/sites-enabled/
```

### 6. Test

```bash
sudo nginx -t
```

### 7. Restart

```bash
sudo systemctl restart nginx
```

✔️ Now `http://ec2-public-ip` should show backend response.

✔️ Now your API is live at: `http://ec2-public-ip/api/upload`

---

## Final Notes

This assignment demonstrates:

- ✔ AWS S3 integration
- ✔ EC2 deployment
- ✔ Logging, error handling, structured design
- ✔ Production-level Express application

---

## Author

Harsh Vansjaliya

[Github](https://github.com/harsh6575)
[Portfolio](https://harsh-vansjaliya.vercel.app/)
