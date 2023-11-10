import { v2 as cloudinary } from "cloudinary";


export const uploadImage = async (req, res ) => {
    try {
        const fileData = req.file;
        return res.status(200).json(fileData);
    } catch (error) {
        return console.log(error);
    }
};

export const deleteImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.destroy(req.body.filename);
        res.status(200).json({ message: "Xóa ảnh thành công", result });
    } catch (error) {
        res.status(500).json({ error: "Error deleting image" });
    }
};
