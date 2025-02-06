import axios from 'axios';


const uploadAudioFile = async (file: File) => {
  const config = await fetch('/config.json').then((res) => res.json());

  const baseUrl = config.VITE_PUBLIC_API_AUDIO
  const formData = new FormData();
  formData.append('file', file);

  return axios.post(`${baseUrl}/voice_to_text/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    timeout: 100000, // Thời gian chờ 5 giây (tùy chỉnh)
  });
};

export default uploadAudioFile;

