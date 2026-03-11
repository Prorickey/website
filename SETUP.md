# Deployment Setup

## GitHub Repository Secrets

Go to **Settings > Secrets and variables > Actions** in the GitHub repo and add:

| Secret              | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `SERVER_HOST`       | IP address or hostname of the deployment server         |
| `SERVER_USER`       | SSH username on the server                              |
| `SSH_PRIVATE_KEY`   | Private SSH key for authentication (the full PEM block) |
| `REGISTRY_PASSWORD` | Password for `tbedson-deploy` on `docker.bedson.tech`   |

## Server Setup

### 1. Create a deploy user

The deploy user only needs Docker access and ownership of the deployment directory — no root or sudo required.

```bash
# On the server, as root:
useradd -m -s /bin/bash deploy
usermod -aG docker deploy
chown deploy:deploy /opt/deployments/portfolio
```

Generate an SSH key pair for the deploy user:

```bash
# On the server, as root:
sudo -u deploy ssh-keygen -t ed25519 -C "github-actions-deploy" -f /home/deploy/.ssh/id_ed25519 -N ""
sudo -u deploy bash -c 'cat /home/deploy/.ssh/id_ed25519.pub >> /home/deploy/.ssh/authorized_keys'
chmod 600 /home/deploy/.ssh/authorized_keys
```

Print the private key and copy it for the GitHub secret:

```bash
cat /home/deploy/.ssh/id_ed25519
```

Paste the full output (including the `-----BEGIN/END-----` lines) as the `SSH_PRIVATE_KEY` secret in GitHub, and set `SERVER_USER` to `deploy`.

### 2. Authenticate Docker with the registry

On the server, log in to `docker.bedson.tech` so `docker compose pull` can fetch the image:

```bash
docker login docker.bedson.tech -u tbedson-deploy
```

Docker stores the credential in `~/.docker/config.json` so this only needs to be done once.

### 3. Create the deployment directory and compose file

```bash
sudo mkdir -p /opt/deployments/portfolio
sudo chown deploy:deploy /opt/deployments/portfolio
```

Create `/opt/deployments/portfolio/docker-compose.yml`:

```yaml
services:
  app:
    image: docker.bedson.tech/tbedson/portfolio:latest
    ports:
      - '3000:3000'
    restart: unless-stopped
```

### 4. Verify

After the first push to `main`, confirm the container is running:

```bash
docker compose -f /opt/deployments/portfolio/docker-compose.yml ps
```
