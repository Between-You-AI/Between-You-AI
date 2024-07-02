wsl --set-default-version 2

Get-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V

ssh-keygen -t ed25519 -C "your_email@example.com"

docker compose -f docker-compose.local.yml up


Install Docker

for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
