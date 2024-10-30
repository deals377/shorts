export async function generateCaptions(openai, prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Generate 3 short, engaging captions for a YouTube Short video. Each caption should be concise and impactful."
        },
        {
          role: "user",
          content: `Create captions for a video about: ${prompt}`
        }
      ],
      max_tokens: 150
    });

    const captions = response.choices[0].message.content
      .split('\n')
      .filter(caption => caption.trim())
      .slice(0, 3);

    return captions;
  } catch (error) {
    console.error('Caption generation error:', error);
    throw new Error('Failed to generate captions');
  }
}