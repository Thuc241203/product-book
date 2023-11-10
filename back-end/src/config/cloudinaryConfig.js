import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary"
cloudinary.config({
    cloud_name: "dksgvucji",
    api_key: "373737813996372",
    api_secret: "YTYcW5HSrggVjsTj7XM4hSLS2Cg",
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
   params: {
    folder: 'duantotnghiep'
   }
})

const uploadCloud = multer({storage})
export default uploadCloud;
