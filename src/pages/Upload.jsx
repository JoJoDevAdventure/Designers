import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import CustomButton from "../components/CustomButton";
import { slideAnimation } from "../config/motion";

// Set the workerSrc for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.js`;

const softwareStyles = [
  "Style 1",
  "Style 2",
  "Style 3",
  "Style 4",
  "Style 5",
  "Style 6",
  "Style 7",
  "Style 8",
];

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
  };

  const handleSubmit = () => {
    // Handle the form submission logic here
    console.log("File:", selectedFile);
    console.log("Style:", selectedStyle);
    console.log("Title:", title);
    console.log("Description:", description);
  };

  return (
    <AnimatePresence>
      <motion.section
        className="flex flex-col items-center relative gap-4 mt-10"
        {...slideAnimation("left")}
      >
        {selectedFile && (
          <Document file={selectedFile}>
            <Page pageNumber={1} />
          </Document>
        )}
        <label className="flex items-center cursor-pointer mb-4">
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex items-center bg-[#F6D31F] text-[#9B4191] py-4 px-8 rounded-full w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 mr-2 transform rotate-180"
            >
              <path
                fillRule="evenodd"
                d="M12 2a1 1 0 011 1v11.586l3.293-3.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L11 14.586V3a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <p>Click to upload your design</p>
          </div>
        </label>
        <div className="flex flex-row gap-12 items-center">
          <p className="mb-2 text-xl text-white">
            Please select your design style
          </p>

          <div className="relative mb-4 text-white">
            <select
              className="appearance-none border border-[#F6D31F] rounded-x px-14 py-2 bg-transparent cursor-pointer text-xl"
              value={selectedStyle}
              onChange={handleStyleChange}
            >
              <option value="" disabled>
                Styles
              </option>
              {softwareStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#F6D31F]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full">
          <p className="mb-2 text-xl text-white">Give a title to your design :</p>
          <input
            type="text"
            className={`p-4 border border-[#F6D31F] bg-transparent rounded-full text-white placeholder-white w-full mb-4`}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="w-full">
          <p className="mb-2 text-xl text-white">
            Give a small description to your design :
          </p>
          <textarea
            className={`p-4 border border-[#F6D31F] bg-transparent rounded-xl text-white placeholder-white w-full mb-4`}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <CustomButton
          className="bg-[#F6D31F] text-[#9B4191] px-6 py-4 rounded w-full"
          onClick={handleSubmit}
          text={"Submit"}
        />
        
      </motion.section>
    </AnimatePresence>
  );
};

export default Upload;