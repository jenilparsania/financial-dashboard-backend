# Financial Dashboard Backend

## Watchlist API

The watchlist API allows users to manage their stock watchlists by adding and removing symbols.

### Authentication

All watchlist endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### GET /api/watchlist
Get the current user's watchlist.

**Response:**
```json
{
  "success": true,
  "data": {
    "userId": "user123",
    "symbols": ["AAPL", "GOOGL", "MSFT"]
  }
}
```

#### POST /api/watchlist
Add a single symbol to the watchlist.

**Request Body:**
```json
{
  "symbol": "AAPL"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Symbol AAPL added to watchlist",
  "data": {
    "userId": "user123",
    "symbols": ["AAPL", "GOOGL", "MSFT"]
  }
}
```

#### POST /api/watchlist/multiple
Add multiple symbols to the watchlist at once.

**Request Body:**
```json
{
  "symbols": ["AAPL", "GOOGL", "MSFT", "TSLA"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "4 symbols added to watchlist",
  "data": {
    "userId": "user123",
    "symbols": ["AAPL", "GOOGL", "MSFT", "TSLA"]
  }
}
```

#### DELETE /api/watchlist/:symbol
Remove a specific symbol from the watchlist.

**URL Parameters:**
- `symbol`: The stock symbol to remove (e.g., "AAPL")

**Response:**
```json
{
  "success": true,
  "message": "Symbol AAPL removed from watchlist",
  "data": {
    "userId": "user123",
    "symbols": ["GOOGL", "MSFT"]
  }
}
```

#### DELETE /api/watchlist
Clear the entire watchlist.

**Response:**
```json
{
  "success": true,
  "message": "Watchlist cleared successfully",
  "data": {
    "userId": "user123",
    "symbols": []
  }
}
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common error codes:
- `400`: Bad Request (missing required fields, duplicate symbols)
- `401`: Unauthorized (missing or invalid JWT token)
- `404`: Not Found (symbol not in watchlist, watchlist not found)
- `500`: Internal Server Error

### Features

- **Automatic watchlist creation**: If a user doesn't have a watchlist, one is created automatically
- **Case normalization**: All symbols are converted to uppercase for consistency
- **Duplicate prevention**: Cannot add the same symbol twice
- **Bulk operations**: Add multiple symbols at once
- **Flexible removal**: Remove individual symbols or clear entire watchlist

### Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/financial-app
JWT_SECRET=your-super-secret-jwt-key-here
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000` by default.
