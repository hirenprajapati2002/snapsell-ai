import React, { useRef, useState } from "react";
import img7 from '../../assets/images/bgRemover3.jpg';
import img8 from '../../assets/images/bgRemover3.webp';
import img9 from '../../assets/images/imageExtender.webp';
import img10 from '../../assets/images/photoShot.webp';
import img11 from '../../assets/images/replaceBg.webp';
import img12 from '../../assets/images/restorer.webp';
import img13 from '../../assets/images/socialMediaGraphic.webp';
import img14 from '../../assets/images/templates.jpg';


const sampleImages = [
     img7,
     img8,
     img9,
     img10,
     img11,
     img12,
     img13,
     img14    
];

const UploadSection = () => {
  const fileInputRef = useRef(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      console.log("Uploaded file:", file);
      // You can add preview or upload logic here
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="px-8 py-6">
      {/* Title */}
      <h2 className="text-xl font-semibold text-black mb-4">Upload Photo</h2>

      {/* Upload box */}
      <div
        className="bg-[#f5f6fa] border border-dashed border-gray-300 rounded-xl py-10 text-center cursor-pointer"
        onClick={handleBrowseClick}
      >
        <div className="flex justify-center text-4xl mb-3">📤</div>
        <p className="text-gray-600">
          Drop your file here, or{" "}
          <span className="text-purple-600 underline cursor-pointer">
            Browse
          </span>
        </p>
        <p className="text-sm text-gray-400 mt-1">
          JPEG, PNG, SVG, JPG, WEBP, BMP & PSD
        </p>

        {/* Hidden file input */}
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.svg,.bmp,.psd"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Optional: Show uploaded file name */}
      {uploadedFile && (
        <p className="mt-3 text-sm text-green-600">
          Uploaded: {uploadedFile.name}
        </p>
      )}

      {/* Link icon */}
      <div className="flex justify-center mt-6">
        <div className="text-center">
          <div className="text-orange-500 text-2xl mb-1">🔗</div>
          <p className="text-sm text-gray-600">Link</p>
        </div>
      </div>

      {/* Sample Images */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-4">Start with sample images</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sampleImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`sample-${idx}`}
              className="rounded-lg w-full object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
