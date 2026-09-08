import multer from 'multer';
import path from 'path';

// Define where to store images and how to name them
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Saves files inside a folder named 'uploads'
  },
  filename(req, file, cb) {
    // Generates a unique filename: fieldname-timestamp.extension
    cb(
      null, 
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// Validate file types (Only allow images)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only! (jpg, jpeg, png, webp)'));
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

export default upload;
