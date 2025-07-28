
import React, { useState } from 'react';
import axios from 'axios';

const BulkUploadCSV = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCSVChange = (e) => setCsvFile(e.target.files[0]);
  const handleImageChange = (e) => setImageFiles(Array.from(e.target.files));

  const handleUpload = async () => {
    if (!csvFile || imageFiles.length === 0) {
      alert('Please select both CSV file and images!');
      return;
    }

    const formData = new FormData();
    formData.append('csv', csvFile);
    imageFiles.forEach((img) => formData.append('images', img));

    setUploading(true);
    setResult(null);

    try {
      const res = await axios.post('/api/products/bulk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white border-1 shadow rounded-md w-full mx-auto mb-5">
      <h2 className="text-xl font-bold mb-4">📦 Bulk Product Upload</h2>

      <div className="mb-6">
        <label
          htmlFor="csv-upload"
          className="block text-sm font-medium mb-2"
        >
          Upload CSV File
        </label>

        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="csv-upload"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50  transition hover:bg-gray-200"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-3 text-gray-400"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="mb-1 text-sm text-gray-500 ">
                <span className="font-semibold">Click to upload</span> or drag & drop your CSV
              </p>
              <p className="text-xs text-gray-500">Only .csv files allowed</p>
            </div>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleCSVChange}
              className="hidden"
            />
          </label>
        </div>
      </div>


      

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Upload Product Images</label>
        
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-200 transition"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3 text-gray-400"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V4m0 0l4 4m-4-4L3 8m14 4v8m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
                <p className="mb-1 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag & drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG (max 5MB each)</p>
              </div>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>


      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        {uploading ? 'Uploading...' : 'Upload Bulk Products'}
      </button>

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">✅ Upload Summary</h3>
          <p>Uploaded: {result.uploaded}</p>
          <p>Failed: {result.failed}</p>

          {result.successes.length > 0 && (
            <div className="mt-2">
              <strong className="text-green-700">Successes:</strong>
              <ul className="list-disc pl-6">
                {result.successes.map((name, idx) => (
                  <li key={idx}>{name}</li>
                ))}
              </ul>
            </div>
          )}

          {result.failures.length > 0 && (
            <div className="mt-4">
              <strong className="text-red-700">Failures:</strong>
              <ul className="list-disc pl-6 text-sm text-red-600">
                {result.failures.map((fail, idx) => (
                  <li key={idx}>
                    {fail.row?.name || '[Unnamed Product]'} — {fail.error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkUploadCSV;
