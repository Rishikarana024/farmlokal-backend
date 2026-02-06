# FarmLokal Backend Assessment

## Overview

This project implements a high-performance backend system using Node.js, MySQL, Redis, and Docker. It demonstrates scalable API design, caching strategies, external API resilience, and system reliability patterns.

---

## Architecture

* **Node.js + Express** REST API
* **MySQL** for persistent storage
* **Redis** for caching and rate limiting
* **Docker** containerized deployment
* **OAuth2 token lifecycle management**
* **External API integration with retries and circuit breaker**
* **Webhook handling with idempotency**

---

## Features

### Product Listing API

* Cursor-based pagination
* Sorting and filtering
* Indexed MySQL queries
* Redis caching
* Designed for large datasets

Endpoint:

```
GET /api/products
```

---

### Authentication

* OAuth2 client credentials flow
* Redis token caching
* Safe concurrent token refresh

Endpoint:

```
GET /auth/token
```

---

### External API Integration

* Timeout handling
* Exponential retries
* Circuit breaker pattern

Endpoint:

```
GET /external/products
```

---

### Webhook Handling

* Idempotent processing
* Duplicate event protection

Endpoint:

```
POST /webhook/order-update
```

---

## Performance Optimizations

* Connection pooling
* Redis caching
* Rate limiting
* Cursor pagination
* Indexed database queries

Load tested using autocannon.

---

## Setup Instructions

### Run services

```
docker network create farmlokal-net

docker run --network farmlokal-net --name mysql-farmlokal -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=farmlokal -p 3306:3306 -d mysql:8

docker run --network farmlokal-net --name redis-farmlokal -p 6379:6379 -d redis
```

### Run backend

```
docker build -t farmlokal-backend .

docker run --network farmlokal-net -p 3001:3000 farmlokal-backend
```

---

## Load Testing

```
npm run loadtest
```

---

## Trade-offs

* Redis TTL caching chosen for simplicity
* Cursor pagination for scalability
* Docker networking for service isolation

---

## Metrics

```
GET /metrics
```

---

## Author

Rishika Rana
