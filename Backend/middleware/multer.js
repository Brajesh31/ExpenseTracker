const fs = require("fs");
const multer = require("multer");

const dir = './public/uploads'; // Use a sub-directory for better organization

// Automatically create folder if it doesn't exist
if (!fs.existsSync(dir)) {
    // The 'recursive: true' option creates parent directories if they don't exist
    fs.mkdirSync(dir, { recursive: true });
}

// Configure how files are stored
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Files will be saved in the './public/uploads' directory
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        // To avoid name collisions, append a timestamp to the original filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    },
});

// Create the Multer upload instance with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
