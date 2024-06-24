import multer from 'multer';
export const getStorage = (destination) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, destination);
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    });
};