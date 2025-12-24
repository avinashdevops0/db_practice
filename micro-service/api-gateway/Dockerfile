http {
  server {
    listen 80;

    # Service A
    location /service-a/ {
      proxy_pass http://service-a-container:3000/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }

    # Service B
    location /service-b/ {
      proxy_pass http://service-b-container:4000/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
    }

    # Health check
    location /health {
      return 200 'API Gateway UP';
    }
  }
}
