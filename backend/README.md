# Backend (shared server code)

This folder holds server-side logic that is imported by Next.js API routes in `app/api/*`.
- Do **not** hardcode secrets. Read them from environment variables.
- Only files inside `app/api/*` are executed as serverless functions on Vercel.
- Put reusable logic in `backend/services`, `backend/utils`, and schemas/types in `backend/schemas`.

