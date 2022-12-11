# README

Install dependencies:
```
yarn install
```

Update db schema:
```
yarn rw prisma migrate dev
```

Generate SESSION_SECRET:
```
yarn rw g secret
```

Configure .env file fields:
> SESSION_SECRET='\<replace with session_secret from above step\>'<br>
> CLIENT_ID='\<replace with Google Cloud project credential\>'<br>
> CLIENT_SECRET='\<replace with Google Cloud project credential\>'<br>
> SEND_IN_BLUE_KEY='\<replace with Send in Blue SMTP key\>'<br>
> REDIRECT_URL='http://localhost:8910/authcallback'

Run:
```
yarn rw dev
```

