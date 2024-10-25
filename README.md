
# Node-GK Application

This is a React (Frontend) and Node.js (Backend) application using Redis and MongoDB, deployed with Docker Swarm to provide load balancing and high availability.

## Requirements

- Docker and Docker Compose installed
- Docker Swarm initialized

## Running Instructions

### Step 1: Clone the Repository (if not already present)

If you haven't cloned the repository yet, you can do so by running:

```bash
git clone git@github.com:cuonglamphu/Docker-Orchestration-Practice.git
cd Docker-Orchestration-Practice
```

### Step 2: Initialize Docker Swarm

If Docker Swarm is not yet initialized, start it on the main node (your machine) by running:

```bash
docker swarm init
```

### Step 3: Build Docker Images

Docker Swarm does not directly support the `build` option in `docker-compose.yml`, so you need to build the images locally before deployment.

```bash
docker-compose build
```

### Step 4: Deploy the Stack with Docker Swarm

Use Docker Swarm to deploy services with the following command:

```bash
docker stack deploy -c docker-compose.yml onlineshop
```

- This command deploys services based on the configuration in `docker-compose.yml`.
- `onlineshop` is the stack name, which you can modify as desired.

### Step 5: Check Service Status

To view the status of services running in the stack, use:

```bash
docker stack services onlineshop
```

This command displays the replica count of each service and their current status.

### Step 6: Check Service Logs

To view logs of a particular service, use:

```bash
docker service logs onlineshop_backend
docker service logs onlineshop_frontend
```

Replace `onlineshop_backend` and `onlineshop_frontend` with the name of the service you want to inspect.

## Accessing the Application

- **Frontend (React)**: Access `http://localhost:8080` in your browser.
- **Backend (Node.js)**: The API is served at `http://localhost:3000`.

## Persistent Storage

- **MongoDB**: Data is stored in the `mongo-data` volume to ensure data persistence.
- **Redis**: Used to manage sessions and cache data.

## Stopping the Application

To stop and remove the stack, use the following command:

```bash
docker stack rm onlineshop
```

This command removes all services in the `onlineshop` stack.

---

With these steps, you can easily start and manage your Node-GK application on Docker Swarm.
# Docker-Orchestration-Practice
# Docker-Orchestration-Practice
