import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    cb(null, `${uniqueId}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/upload', upload.array('assets'), (req, res) => {
  try {
    const files = req.files.map(file => ({
      filename: file.filename,
      path: file.path,
      type: file.mimetype
    }));

    res.json({
      status: 'success',
      data: files
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload files'
    });
  }
});

export { router as assetsRouter };