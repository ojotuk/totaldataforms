// export const host = "http://localhost:7000";
// export const host = "https://mongo-db-backend.herokuapp.com"

export const host = process.env.NODE_ENV==="development" ?'http://localhost:5000': 'https://total-data-feeds.herokuapp.com'

