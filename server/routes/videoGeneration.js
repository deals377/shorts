import express from 'express';
import { OpenAI } from 'openai';
import { generateVideo } from '../services/videoService.js';
import { generateImages } from '../services/imageService.js';
import { generateCaptions } from '../services/captionService.js';

const router = express.Router();
const openai = new OpenAI(process.env.OPENAI_API_KEY);

router.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    // 1. Generate images using DALL-E
    const images = await generateImages(openai, prompt);

    // 2. Generate captions based on the prompt
    const captions = await generateCaptions(openai, prompt);

    // 3. Create video from images and captions
    const videoUrl = await generateVideo(images, captions);

    res.json({
      status: 'success',
      data: {
        images,
        captions,
        videoUrl
      }
    });
  } catch (error) {
    console.error('Video generation error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate video'
    });
  }
});

export { router as videoGenerationRouter };