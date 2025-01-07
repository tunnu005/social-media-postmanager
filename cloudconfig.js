import { v2 as cloudinary } from 'cloudinary';



cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        // secure: process.env.NODE_ENV === 'production',
        // url: process.env.CLOUDINARY_URL,
        // upload_preset: process.env.CLOUDINARY_PRESET,
        // proxy: true, // If you're behind a proxy server, uncomment this line.
    }
)

export default cloudinary;
