# company-page
```mermaid
sequenceDiagram
	actor Client
	participant Server
	participant DB

	Client->>Server: POST / sign in with username and password
	Server->>DB: Authenticates username and password
	DB->>Server: Returns requested data
	Server->>Server: If authenticated, creates JWT
	Note right of Server: JWT contains necessary user and token information, encrypted with secret key, only known by server.
	Server->>Client: Sends back encrypted JWT
	Note left of Client: Stores JWT<br>in browser.
	Client->>Server: GET / requests resource with JWT in header
	Server->>Server: Authorizes using JWT
	Note right of Server: Checks if header and payload matches signature of recieved JWT when encrypted with secret key.
	Server->>Client: If authorized, sends back requested resource
```

## Test
