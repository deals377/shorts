import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:3000/api';

interface VideoResponse {
  status: string;
  data: {
    images: string[];
    captions: string[];
    videoUrl: string;
  };
}

export async function generateVideo(prompt: string): Promise<VideoResponse> {
  try {
    const response = await axios.post<VideoResponse>(`${API_URL}/video/generate`, { prompt });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || 'Failed to generate video';
      throw new Error(message);
    }
    throw new Error('An unexpected error occurred');
  }
}

export async function uploadAssets(files: File[]) {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('assets', file);
  });

  try {
    const response = await axios.post(`${API_URL}/assets/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || 'Failed to upload assets';
      throw new Error(message);
    }
    throw new Error('An unexpected error occurred while uploading assets');
  }
}