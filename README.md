# Subnet Calculator

This project is a Subnet Calculator application that provides a REST API for calculating subnet details for IPv4 addresses. It includes a Node.js backend, an Nginx reverse proxy, and deployment automation using Ansible.

## Features

- Calculate subnet details for IPv4 addresses.
- REST API built with Hono and Zod for schema validation.
- Reverse proxy setup using Nginx.
- Deployment automation with Ansible.
- Dockerized environment for easy deployment.

## Node.js API

The Node.js backend provides a REST API for calculating subnet details for IPv4 addresses.

### Features

- Built with Hono for lightweight and fast API development.
- Schema validation using Zod.
- Comprehensive logging with Winston.
- API documentation using OpenAPI, implemented with the `@hono/zod-openapi` library for schema definitions and `@scalar/hono-api-reference` for serving the documentation.

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. Run tests:
   ```bash
   npm test
   ```

### API Endpoints

- `POST /api/calculate`: Calculate subnet details for a given IPv4 CIDR address.
- `GET /docs`: Access the API documentation.

## Nginx Reverse Proxy

The Nginx reverse proxy is used for load balancing and forwarding client information.

### Features

- Load balancing between multiple Node.js API instances.
- Proxy headers for forwarding client information.

### Setup

1. Build the Nginx Docker image:
   ```bash
   docker build -t webserver .
   ```
2. Run the container:
   ```bash
   docker run -p 80:80 webserver
   ```

### Configuration

- `nginx.conf`: Main configuration file for the Nginx server.

## Ansible Deployment

Ansible playbooks and roles are used for deploying the Subnet Calculator application.

### Features

- Setup Docker and required dependencies on the target server.
- Deploy Node.js API and Nginx reverse proxy using Docker Compose.

### Setup

1. Install Ansible:
   ```bash
   pip install ansible
   ```
2. Run the setup playbook to configure the server:
   ```bash
   ansible-playbook -i inventory.ini setup.yaml
   ```
3. Deploy the application:
   ```bash
   ansible-playbook -i inventory.ini deploy.yaml
   ```
4. Alternatively, you can use the `main.yaml` file to both set up and deploy the application in a single step:
   ```bash
   ansible-playbook -i inventory.ini main.yaml
   ```

### Directory Structure

- `roles/setup`: Configures the server with Docker and required users.
- `roles/deploy`: Deploys the application using Docker Compose.

## Docker

The project is fully containerized using Docker. Use the `compose.yaml` file to set up and run the entire application stack with Docker Compose.
