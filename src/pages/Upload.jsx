import { AnimatePresence, motion } from "framer-motion";
import { PDFDocument } from "pdf-lib";
import React, { useRef, useState } from "react";
import { useSnapshot } from "valtio";
import CustomBackButton from "../components/CustomBackButton";
import CustomButton from "../components/CustomButton";
import LoadingScreen from "../components/LoadingScreen";
import { slideAnimation } from "../config/motion";
import state from "../store";

const softwareStyles = [
  "Cheeky: Banter, Dirty, or Naughty",
  "Rude: Sweary or Slightly Offensive",
  "Funny: Relatable, Whimsical, or Punny",
  "Heartfelt: Platonic or Romantic",
  "Recipient Specific: Milestones, Age, or Recipients",
  "Nature: Pets, Wildlife, Botanicals, or Floral",
  "Pop Culture: Trending, Celebrity, TV/Film, News, or Politics",
  "LGBTQIA+: Sexuality or Gender",
  "Subcultures & Niche: Alternative",
  "Communities or Hobbies/Activities",
];

const occasions = [
  "Birthday",
  "Mother's Day",
  "Valentine's Day",
  "Christmas",
  "Eid",
  "Father's Day",
  "Anniversary",
  "New Year's Day",
];

const Upload = () => {
  const snapshot = useSnapshot(state);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileError, setFileError] = useState(false);
  const [styleError, setStyleError] = useState(false);
  const [occasionError, setOccasionError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading screen

  const formRef = useRef(null);
  const fileFormRef = useRef(null);

  const [formData, setFormData] = useState({
    designerName: state.name || "name",
    designerEmail: state.designerEmail || "mail",
    submissionDate: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    fileName: "", // File name if a file is selected
    style: "",
    occasion: "",
    title: "",
    description: "",
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const numPages = pdfDoc.getPageCount();

      if (numPages > 1) {
        console.error("The selected PDF has more than one page.");
        alert("Please select a file conforming to bar guidelines."); // Show the alert message
        // Reset file input
        event.target.value = null;
        setSelectedFile(null);
        setFormData((prevData) => ({
          ...prevData,
          fileName: "",
        }));
        setFileError(true);
      } else {
        // Check the dimensions and resolution of the single page
        const page = pdfDoc.getPage(0);
        const { width, height } = page.getSize();

        // Convert PDF points to pixels (1 point = 1/72 inches)
        const widthInPixels = (width * 300) / 72;
        const heightInPixels = (height * 300) / 72;

        // Add ±2 pixel margin
        const widthIsValid = widthInPixels >= 2337 && widthInPixels <= 2341;
        const heightIsValid = heightInPixels >= 2242 && heightInPixels <= 2246;

        if (!widthIsValid || !heightIsValid) {
          console.error(
            "The selected PDF does not meet the required resolution."
          );
          alert(
            "The selected PDF does not meet the required resolution. Please select a file conforming to bar guidelines."
          ); // Show the alert message
          // Reset file input
          event.target.value = null;
          setSelectedFile(null);
          setFormData((prevData) => ({
            ...prevData,
            fileName: "",
          }));
          setFileError(true);
        } else {
          // Continue processing if it's a single-page PDF with the correct resolution
          setSelectedFile(file);
          setFormData((prevData) => ({
            ...prevData,
            fileName: file.name, // Update fileName in formData
          }));
          setFileError(false);

          console.log(
            `Page 1: Width = ${widthInPixels}px, Height = ${heightInPixels}px`
          );
        }
      }
    } else {
      setFileError(true);
      alert("Please select a file conforming to bar guidelines."); // Show the alert message for non-PDF files
    }
  };

  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      style: event.target.value, // Update style in formData
    }));
    setStyleError(!event.target.value);
  };

  const handleOccasionChange = (event) => {
    setSelectedOccasion(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      occasion: event.target.value, // Update occasion in formData
    }));
    setOccasionError(!event.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      title: e.target.value, // Update title in formData
    }));
    setTitleError(!e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      description: e.target.value, // Update description in formData
    }));
    setDescriptionError(!e.target.value);
  };

  const handleSubmit = () => {
    if (
      !selectedFile ||
      !selectedStyle ||
      !selectedOccasion ||
      !title ||
      !description
    ) {
      setFileError(!selectedFile);
      setStyleError(!selectedStyle);
      setOccasionError(!selectedOccasion);
      setTitleError(!title);
      setDescriptionError(!description);
      return; // Stop the submission if any field is empty
    }

    // Form is valid, proceed with the submission logic
    formRef.current.requestSubmit();
  };

  const handleGoogle = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Convert the file to a base64 string
    const file = selectedFile;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async function () {
      const base64data = reader.result;
      formData.append("myFile", base64data); // Append base64 encoded file

      try {
        setLoading(true);
        // Submit to Google Sheets
        const scriptURL =
          "https://script.google.com/macros/s/AKfycbzEhEnOGlRkUG8EbQKH0WXIqceoHxdqLD6EfrATID8j3QEjw0aJU2pLW9x3Ydl1htuX5Q/exec";
        const googleResponse = await fetch(scriptURL, {
          method: "POST",
          body: formData,
        });

        if (googleResponse.ok) {
          setLoading(false); // Hide loading screen
          setUploaded(true);
          form.reset();
          setTimeout(() => {
            state.isOnUpload = false; // Reset the state after 3 seconds
          }, 5000);
        } else {
          window.alert("Failed to submit to Google Sheets");
          setLoading(false);
          throw new Error("Failed to submit to Google Sheets");
        }
      } catch (error) {
        console.error("Upload error:", error.message);
        setLoading(false);
      }
    };
  };

  return (
    <AnimatePresence>
      <motion.section
        className="flex flex-col items-center gap-4 mt-10 relative w-full mb-10"
        {...slideAnimation("left")}
      >
        {!uploaded ? (
          <>
            {selectedFile && (
              <div className="mb-4">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="pdf Preview"
                  className="max-w-full w-full h-auto"
                />
              </div>
            )}
            <CustomBackButton
              onClick={() => (state.isOnUpload = false)}
              className=""
            />
            <div className="flex flex-col items-center gap-4 w-[90%] md:w-[35%]">
              <form
                ref={formRef}
                onSubmit={handleGoogle}
                encType="multipart/form-data"
              >
                <label
                  className={`flex items-center cursor-pointer mb-4 text-[#9B4191]`}
                >
                  <input
                    type="file"
                    accept="application/pdf"
                    className=""
                    onChange={handleFileChange}
                  />
                  <div
                    className={`flex items-center ${
                      fileError ? "bg-red-500" : "bg-[#F6D31F]"
                    } py-4 px-8 rounded-full w-full`}
                  >
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
                {Object.keys(formData).map((key) => (
                  <input
                    className="hidden"
                    key={key}
                    name={key}
                    value={formData[key]}
                    readOnly
                  />
                ))}
              </form>
              <div className="flex flex-row justify-between items-center w-full">
                <p className="mb-2 text-xl text-white w-[35%]">
                  Design style :
                </p>
                <div
                  className={`relative mb-4 w-full ${
                    styleError ? "text-red-500" : "text-white"
                  }`}
                >
                  <select
                    className={`appearance-none border ${
                      styleError ? "border-red-500" : "border-[#F6D31F]"
                    } rounded-x pl-2 pr-6 w-[100%] py-2 bg-transparent cursor-pointer text-xl`}
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
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <p className="mb-2 text-xl text-white w-[35%]">Occasion :</p>
                <div
                  className={`relative mb-4 w-full ${
                    occasionError ? "text-red-500" : "text-white"
                  }`}
                >
                  <select
                    className={`appearance-none border ${
                      occasionError ? "border-red-500" : "border-[#F6D31F]"
                    } rounded-x pl-2 pr-6 w-[100%] py-2 bg-transparent cursor-pointer text-xl`}
                    value={selectedOccasion}
                    onChange={handleOccasionChange}
                  >
                    <option value="" disabled>
                      Occasion
                    </option>
                    {occasions.map((occasion) => (
                      <option key={occasion} value={occasion}>
                        {occasion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="w-full">
                <p className="mb-2 text-xl text-white">
                  Give a title to your design :
                </p>
                <input
                  type="text"
                  className={`p-4 border ${
                    titleError ? "border-red-500" : "border-[#F6D31F]"
                  } bg-transparent rounded-full text-white placeholder-white w-full mb-4`}
                  placeholder="Title"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="w-full">
                <p className="mb-2 text-xl text-white">
                  Give a small description to your design :
                </p>
                <textarea
                  className={`p-4 border ${
                    descriptionError ? "border-red-500" : "border-[#F6D31F]"
                  } bg-transparent rounded-xl text-white placeholder-white w-full mb-4`}
                  placeholder="Description"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </div>
              <CustomButton
                className="bg-[#F6D31F] text-[#9B4191] px-6 py-4 rounded w-full"
                onClick={handleSubmit}
                text="Submit"
              />
            </div>
          </>
        ) : (
          <p className="text-2xl md:text-[32px] text-center mt-8 text-white">
            Congrats! your file just uploaded. <br /> <br></br>You'll hear from
            us soon, stay tunned.
          </p>
        )}
      </motion.section>
      {loading && <LoadingScreen />} {/* Show loading screen */}
    </AnimatePresence>
  );
};

export default Upload;
