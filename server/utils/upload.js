import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb://${USERNAME}:${PASSWORD}@ac-n2dcwv3-shard-00-00.kem3hg1.mongodb.net:27017,ac-n2dcwv3-shard-00-01.kem3hg1.mongodb.net:27017,ac-n2dcwv3-shard-00-02.kem3hg1.mongodb.net:27017/?ssl=true&replicaSet=atlas-a0vgfr-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const validImageTypes = ["image/png", "image/jpeg"];

        if (validImageTypes.includes(file.mimetype)) {
            // Valid image file type, store in "photos" bucket
            return {
                bucketName: "photos",
                filename: `${Date.now()}-blog-${file.originalname}`
            };
        } 
        else {
            // Invalid file type (not an image), handle accordingly
            return `${Date.now()}-blog-${file.originalname}`;
            // For example, you can log an error or respond to the client
            // console.log(`Invalid file type: ${file.mimetype}`);
            // throw new Error("Invalid file type");
        }
    }
});

export default multer({ storage });
