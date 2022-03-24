import { projectStorage } from '../firebase/config';
import loadImage from 'blueimp-load-image';

const getPhotoUrls = async (
  photosList: Array<File>,
  uid: string,
): Promise<string[]> => {
  const promises = photosList.map(async (file): Promise<string> => {
    const data = await loadImage(file, {
      maxWidth: 500,
      canvas: true,
    });
    return new Promise((resolve, reject) => {
      (data.image as HTMLCanvasElement).toBlob(
        async (blob) => {
          if (!blob) return reject('error');
          const uploadPath = `photos/${uid}/${file.name}`;
          const img = await projectStorage.ref(uploadPath).put(blob);
          const imgUrl = await img.ref.getDownloadURL();
          resolve(imgUrl);
        },
        file.type,
        0.7,
      );
    });
  });

  const result = await Promise.all(promises);
  return result;
};

export { getPhotoUrls };
