export async function generateImages(openai, prompt) {
  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Create a high-quality image for a YouTube Short: ${prompt}`,
      n: 3,
      size: "1024x1792", // Vertical format for Shorts
      quality: "hd",
      style: "vivid"
    });

    return response.data.map(image => image.url);
  } catch (error) {
    console.error('Image generation error:', error);
    throw new Error('Failed to generate images');
  }
}