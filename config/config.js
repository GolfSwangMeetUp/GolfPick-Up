// const cloudinary = require("cloudinary").v2;
// const cloudinaryStorage = require("cloudinary-multer");
// const multer = require('multer')

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET,
// });

// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const multer = require("multer");
// module.exports = (folderName) => {
//     cloudinary.config({
//         cloud_name: process.env.CLOUD_NAME,
//         api_key: process.env.API_KEY,
//         api_secret: process.env.API_SECRET,
//     });

//     const storage = new CloudinaryStorage({
//         cloudinary: cloudinary,
//         params: {
//             folder: folderName,
//         }
//     });

//     // module.exports = multer({
//     //     storage: storage,
//     // });

//     // module.exports = multer({ storage });
//     return multer({ storage });
// }

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  // cloudinary: cloudinary,
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png"],
    folder: "Makeup-Collection",
  },
});

module.exports = multer({ storage });
