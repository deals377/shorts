import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

export async function generateVideo(images, captions) {
  try {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    // Download images and write them to FFmpeg's virtual filesystem
    for (let i = 0; i < images.length; i++) {
      const imageResponse = await fetch(images[i]);
      const imageData = await imageResponse.arrayBuffer();
      ffmpeg.FS('writeFile', `image${i}.jpg`, new Uint8Array(imageData));
    }

    // Create video from images with transitions
    await ffmpeg.run(
      '-framerate', '1/2',
      '-i', 'image%d.jpg',
      '-vf', 'scale=1080:1920,zoompan=z=\'min(zoom+0.002,1.2)\':d=125',
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      'output.mp4'
    );

    // Read the output video
    const data = ffmpeg.FS('readFile', 'output.mp4');

    // Clean up files
    images.forEach((_, i) => {
      ffmpeg.FS('unlink', `image${i}.jpg`);
    });
    ffmpeg.FS('unlink', 'output.mp4');

    // Create a blob URL for the video
    const blob = new Blob([data.buffer], { type: 'video/mp4' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Video creation error:', error);
    throw new Error('Failed to generate video');
  }
}