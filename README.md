# Page Pulse

Production-grade URL Audit Service.

## Features
- URL validation
- Request timeout
- In-memory caching
- Rate limiting
- Request IDs
- Structured logging
- Health endpoint
- Jest tests
- GitHub Actions CI

## API
POST /api/audit

Request:
```json
{"url":"https://example.com"}
```

Response:
```json
{"success":true,"data":{"title":"Example"}}
```
