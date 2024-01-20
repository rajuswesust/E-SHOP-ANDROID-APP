const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
};

let uploadOptions;

try {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            const isValid = FILE_TYPE_MAP[file.mimetype];

            let uploadError = new Error('invalid image type');

            if (isValid) {
                uploadError = null;
            }
            else {
                uploadError = "invalid image type"
            }
            cb(uploadError, 'public/uploads');
        },
        filename: function (req, file, cb) {
            const fileName = file.originalname.split(' ').join('-');
            const extension = FILE_TYPE_MAP[file.mimetype];
            cb(null, `${fileName}-${Date.now()}.${extension}`);
        },
    });
    uploadOptions = multer({ storage: storage });
} catch (error) {
    console.log(error);
}

let uploadSingleImage = uploadOptions.single('image');
let uploadMultipleImages = uploadOptions.array('images', 10);

module.exports = { uploadSingleImage, uploadMultipleImages };
