import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import http from 'http'
import dotenv from 'dotenv'
import ConnectDB from './connectdb.js'
// import { login } from './services.js'
import auth from './auth.js'
import multer from 'multer'
import { createPost,getPosts,gethomepost,addComment,addLike } from './services.js'
import os from 'os'

console.log(os.cpus().length)

dotenv.config();
ConnectDB()

const app = express()

app.use(helmet())
app.use(express.json({limit:'10mb'}))
app.use(cookieParser())


app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [
        'http://localhost:5174',
        'http://localhost:5173',
        'https://buzzzy.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.get('/', (req, res) => {
    res.send('Hello this is PostManagment server!');
});

const upload = multer({ storage: multer.memoryStorage() });

// app.post('/api/auth/login',login)
app.post('/api/posts/create', auth, upload.single('file'), createPost);
app.get('/api/posts/getpost/:userId', getPosts);
app.get('/api/posts/getHome/:page/:limit',auth,gethomepost)
app.post('/api/posts/addlike',auth,addLike)
app.post('/api/posts/addcomment',auth,addComment)


const PORT = process.env.PORT || 3002;
const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
