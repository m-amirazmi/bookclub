## Prerequisite
1. Node v22
2. Docker CLI
3. Docker Compose CLI

## How to start
### Database
1. Make sure Docker is running
2. Run `docker compose up -d`
### Backend
1. Go to `/backend` 
2. Run `npm install`
3. Create `.env` file
4. Copy content from `.env.example` or below to `.env`
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/bookclub?schema=public"
```
5. Run `npm db:generate`
6. Run `npm db:migrate`
7. Run `npm run dev`

### Frontend
1. Go to `/frontend`
2. Run `npm install`
3. Create `.env` file
4. Copy content from `.env.example` or below to `.env`
```bash
VITE_API_URL=http://localhost:3000/api
```
5. Run `npm run dev`
