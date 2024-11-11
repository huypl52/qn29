import React, { useEffect, useRef, useState } from 'react';
import { Check, RotateCcw, RotateCw, Save, Upload, X } from 'lucide-react';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface IImageEditor {
  onSave?: (blob: Blob, name: string) => void;
  showUpload?: boolean;
  loadedFile?: File;
}

const ImageEditor = ({ onSave, showUpload, loadedFile }: IImageEditor) => {
  const [imageName, setImageName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState('');
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState<Crop>();
  const [isCropping, setIsCropping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const handleImageUpload = (file: File) => {
    // const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImageUrl(result);
        setEditedImageUrl(result);
        setRotation(0);
        setCrop(undefined);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (loadedFile) {
      handleImageUpload(loadedFile);
    }
  }, [loadedFile]);

  const applyRotation = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      // Set proper canvas dimensions for rotation
      if (rotation % 180 === 0) {
        canvas.width = image.width;
        canvas.height = image.height;
      } else {
        canvas.width = image.height;
        canvas.height = image.width;
      }

      ctx?.translate(canvas.width / 2, canvas.height / 2);
      ctx?.rotate((rotation * Math.PI) / 180);
      ctx?.drawImage(image, -image.width / 2, -image.height / 2);

      setEditedImageUrl(canvas.toDataURL());
    };

    image.src = editedImageUrl;
  };

  const handleRotateLeft = () => {
    setRotation((prev) => (prev - 90) % 360);
  };

  const handleRotateRight = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const applyCrop = () => {
    if (!crop || !imageRef.current) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = imageRef.current;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx?.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    setEditedImageUrl(canvas.toDataURL());
    setIsCropping(false);
    setCrop(undefined);
  };

  const cancelCrop = () => {
    setIsCropping(false);
    setCrop(undefined);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);

      // Convert base64 to blob
      const response = await fetch(editedImageUrl);
      const blob = await response.blob();

      // Create form data
      // const formData = new FormData();
      // formData.append('image', blob, imageName);

      onSave?.(blob, imageName);
      // Send to API
      // const result = await fetch('/api/save-image', {
      //   method: 'POST',
      //   body: formData,
      // });
      //
      // if (!result.ok) throw new Error('Failed to save image');
      //
      // // Show success message or handle response
      // alert('Image saved successfully!');
    } catch (error) {
      console.error('Error saving image:', error);
      // alert('Failed to save image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Apply rotation when it changes
  React.useEffect(() => {
    if (rotation !== 0) {
      applyRotation();
    }
  }, [rotation]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* <div className="mb-6"> */}
      {/*   <h2 className="text-2xl font-bold mb-4">Image Editor</h2> */}
      {/* </div> */}

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          {showUpload && (
            <div className="relative">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] &&
                    handleImageUpload(e.target.files?.[0])
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </button>
            </div>
          )}
          <input
            type="text"
            placeholder="Tên ảnh"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {imageUrl &&
            (isCropping ? (
              <div className="relative">
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  aspect={undefined}
                >
                  <img
                    ref={imageRef}
                    src={editedImageUrl}
                    alt="Upload"
                    style={{ maxWidth: '100%' }}
                  />
                </ReactCrop>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={applyCrop}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                    title="Apply crop"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={cancelCrop}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                    title="Cancel crop"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <img
                src={editedImageUrl}
                alt="Preview"
                style={{ maxWidth: '100%' }}
              />
            ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCropping(true)}
            className={`px-4 py-2 border rounded-lg flex items-center hover:bg-gray-100 ${
              isCropping ? 'bg-blue-100' : ''
            }`}
          >
            Cắt ảnh
          </button>
          <button
            onClick={handleRotateLeft}
            className="px-4 py-2 border rounded-lg flex items-center hover:bg-gray-100"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Xoay trái
          </button>
          <button
            onClick={handleRotateRight}
            className="px-4 py-2 border rounded-lg flex items-center hover:bg-gray-100"
          >
            <RotateCw className="w-4 h-4 mr-2" />
            Xoay phải
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center hover:bg-green-600 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Đang thực hiện...' : 'Xác nhận'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
