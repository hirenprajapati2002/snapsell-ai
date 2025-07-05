// // src/components/templates/TemplateEditModal.jsx
// import React, { useState, useRef } from 'react';
// import { X, Upload, Save, Loader } from 'lucide-react';
// import templateService from '../../services/templateService';

// const TemplateEditModal = ({ template, onClose, onSave }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(template?.imageUrl || '');
//   const [text, setText] = useState(template?.text || '');
//   const [error, setError] = useState('');
//   const fileInputRef = useRef(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         setError('Image size should be less than 5MB');
//         return;
//       }

//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreview(e.target.result);
//       };
//       reader.readAsDataURL(file);
//       setError('');
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const formData = new FormData();

//       if (imageFile) {
//         formData.append('image', imageFile);
//       }

//       if (text.trim()) {
//         formData.append('text', text.trim());
//       }

//       const result = await templateService.updateTemplate(template.id, formData);

//       if (result.success) {
//         onSave({
//           ...template,
//           imageUrl: result.data.imageUrl || imagePreview,
//           text: text,
//           updatedAt: new Date().toISOString()
//         });
//         onClose();
//       } else {
//         setError(result.error);
//       }
//     } catch (error) {
//       console.error('Error updating template:', error);
//       setError('Failed to update template. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh]">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-900">Edit Template</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-4">
//           {error && (
//             <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
//               {error}
//             </div>
//           )}

//           {/* Main Content */}
//           <div className="space-y-6">
//             {/* Image Preview Section */}
//             <div>
//               <div className="w-full h-56 bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center mb-4">
//                 {imagePreview ? (
//                   <img
//                     src={imagePreview}
//                     alt="Template preview"
//                     className="w-full h-full object-contain p-4"
//                   />
//                 ) : (
//                   <div className="text-gray-400 text-center">
//                     <Upload className="w-10 h-10 mx-auto mb-2" />
//                     <p className="text-sm">No image selected</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* File Input */}
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />

//             <button
//               type="button"
//               onClick={() => fileInputRef.current?.click()}
//               className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm w-full justify-center mb-2"
//             >
//               <Upload className="w-4 h-4" />
//               Choose New Image
//             </button>

//             <p className="text-xs text-gray-500 text-center mb-4">
//               JPG, PNG, WebP. Max 5MB
//             </p>

//             {/* Text Input Section */}
//             <div>
//               <label htmlFor="templateText" className="block text-sm font-medium text-gray-700 mb-2">
//                 Template Text
//               </label>
//               <textarea
//                 id="templateText"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 rows={4}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm text-gray-900 bg-white selection:bg-purple-200 selection:text-purple-900"
//                 placeholder="Enter template text..."
//                 style={{
//                   fontSize: '14px',
//                   lineHeight: '1.5',
//                   fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//                   color: '#111827'
//                 }}
//               />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
//               disabled={isLoading}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading || (!imageFile && !text.trim())}
//               className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white rounded-lg transition-colors"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader className="w-4 h-4 animate-spin" />
//                   Updating...
//                 </>
//               ) : (
//                 <>
//                   <Save className="w-4 h-4" />
//                   Save Changes
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TemplateEditModal;
// src/components/templates/TemplateEditModal.jsx
import React, { useState, useRef } from "react";
import { X, Upload, Save, Loader } from "lucide-react";
import templateService from "../../services/templateService";

const TemplateEditModal = ({ template, onClose, onSave }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(template?.imageUrl || "");
  const [text, setText] = useState(template?.text || "");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      console.log("Selected file:", file);
      console.log("e.target.result",e.target.result)
      //setImagePreview(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log("e.target.result 12",e.target.result)
        //setImagePreview(e.target.result);
        setImageFile(e.target.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("imageFile",imageFile)
      const formData = new FormData();
      console.log(imageFile);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (text.trim()) {
        formData.append("text", text.trim());
      }

      const result = await templateService.updateTemplate(
        template.id,
        formData
      );

      if (result.success) {
        onSave({
          ...template,
          imageUrl: result.data.imageUrl || imagePreview,
          text: text,
          updatedAt: new Date().toISOString(),
        });
        onClose();
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error("Error updating template:", error);
      setError("Failed to update template. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Edit Template</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-6 h-full">
            {/* Left: Image */}
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <div className="flex-1 w-full bg-white border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Template preview"
                    className="w-full h-full object-contain p-4"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <Upload className="w-10 h-10 mx-auto mb-2" />
                    <p className="text-sm">No image selected</p>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
              >
                <Upload className="w-4 h-4" />
                Choose Image
              </button>
              <p className="text-xs text-gray-500 text-center w-full">
                JPG, PNG, WebP. Max 5MB
              </p>

              <label
                htmlFor="templateText"
                className="block text-sm font-medium text-gray-700 mt-2"
              >
                Template Text
              </label>
              <textarea
                id="templateText"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={12}
                className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-sm text-gray-900 bg-white selection:bg-purple-200 selection:text-purple-900"
                placeholder="Enter template text..."
                style={{
                  fontSize: "14px",
                  lineHeight: "1.5",
                  fontFamily:
                    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  color: "#111827",
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || (!imageFile && !text.trim())}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white rounded-lg transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateEditModal;
