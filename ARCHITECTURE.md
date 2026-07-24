# Architecture

Client
  |
Express API
  |
Validation -> Rate Limit -> Request ID
  |
Audit Service
  |---- Cache
  |---- HTTP Fetch
  |
Response

Scaling:
- Stateless API
- Redis cache
- Load balancer
- Horizontal replicas
