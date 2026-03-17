Online application:
https://your-app.onrender.com

Exercise 3.13-3.14 backend setup:

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` for the Express backend.
3. Keep `MONGODB_URI_TEMPLATE` for the `mongo.js` CLI exercise script.
4. Start the backend with `npm run dev`.
5. The phonebook frontend dev server proxies `/api` requests to `http://localhost:3001`.

Exercise 3.12 CLI setup:

1. Copy `.env.example` to `.env`.
2. Replace the template with your own MongoDB Atlas connection string and keep the `<PASSWORD>` placeholder in the URI.
3. List all entries with `node mongo.js yourpassword`.
4. Add an entry with `node mongo.js yourpassword "Ada Lovelace" 040-1231236`.
