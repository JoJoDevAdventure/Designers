import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import CustomBackButton from "../components/CustomBackButton";
import { headTextAnimation, slideAnimation } from "../config/motion";
import state from "../store";

const softwareImages = {
  Photoshop: "./ps.png", // Update these paths with your actual image paths
  Illustrator: "./illu.png",
  InDesign: "./procreate.png",
  Sketch: "./canva.png",
  Figma: "./express.png",
  Other: "./other.png",
};

const Download = () => {
  const [downloadStarted, setDownloadStarted] = React.useState(false);

  const handleSoftwareClick = (software) => {
    setDownloadStarted(true);
    // Replace '/path/to/file' with the actual path of the file to download
    const filePath = `./${software.toLowerCase()}-template.zip`;
    const link = document.createElement("a");
    link.href = filePath;
    link.download = `${software}-template.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      state.isOnDownload = false; // Reset the state after 3 seconds
    }, 3000);
  };

  return (
    <AnimatePresence>
      <motion.section
        className="flex flex-col items-center relative"
        {...slideAnimation("left")}
      >
        {!downloadStarted ? (
          <>
            <CustomBackButton onClick={() => (state.isOnDownload = false)} />
            <motion.p
              className="px-8 md:px-64 mb-10 text-white text-xl md:text-3xl text-center"
              {...headTextAnimation}
            >
              Please select your software
            </motion.p>
            <div className="flex flex-wrap justify-center gap-12 items-center mb-4 w-[80%] md:w-[60%]">
              <div
                onClick={() => handleSoftwareClick("Photoshop")}
                className="h-[130px] w-[130px] md:h-[200px] md:w-[200px] border border-[#F6D31F] rounded-3xl cursor-pointer flex justify-center items-center bg-transparent transition-all duration-500 hover:bg-[#F6D31F] group"
              >
                <img
                  src={softwareImages.Photoshop}
                  alt="Photoshop"
                  className="w-[100px] md:w-[160px] transition-all duration-500 group-hover:scale-[105%]"
                />
              </div>
              <div
                onClick={() => handleSoftwareClick("Illustrator")}
                className="h-[130px] w-[130px] md:h-[200px] md:w-[200px] border border-[#F6D31F] rounded-3xl cursor-pointer flex justify-center items-center bg-transparent transition-all duration-500 hover:bg-[#F6D31F] group"
              >
                <img
                  src={softwareImages.Illustrator}
                  alt="Illustrator"
                  className="w-[100px] md:w-[160px] transition-all duration-500 group-hover:scale-[105%]"
                />
              </div>
              <div
                onClick={() => handleSoftwareClick("Procreate")}
                className="h-[130px] w-[130px] md:h-[200px] md:w-[200px] border border-[#F6D31F] rounded-3xl cursor-pointer flex justify-center items-center bg-transparent transition-all duration-500 hover:bg-[#F6D31F] group"
              >
                <img
                  src={softwareImages.InDesign}
                  alt="InDesign"
                  className="w-[100px] md:w-[160px] transition-all duration-500 group-hover:scale-[105%]"
                />
              </div>
              <a
                href=
                  "https://www.canva.com/design/DAGOfbyg2to/3Fe0hmsuBcwyBbNELDqlcw/view?utm_content=DAGOfbyg2to&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink&mode=preview"
                
                className="h-[130px] w-[130px] md:h-[200px] md:w-[200px] border border-[#F6D31F] rounded-3xl cursor-pointer flex justify-center items-center bg-transparent transition-all duration-500 hover:bg-[#F6D31F] group"
              >
                <img
                  src={softwareImages.Sketch}
                  alt="Canva"
                  className="w-[100px] md:w-[160px] transition-all duration-500 group-hover:scale-[105%]"
                />
              </a>
              <div
                onClick={() => handleSoftwareClick("Express")}
                className="h-[130px] w-[130px] md:h-[200px] md:w-[200px] border border-[#F6D31F] rounded-3xl cursor-pointer flex justify-center items-center bg-transparent transition-all duration-500 hover:bg-[#F6D31F] group"
              >
                <img
                  src={softwareImages.Figma}
                  alt="Express"
                  className="w-[100px] md:w-[160px] transition-all duration-500 group-hover:scale-[105%]"
                />
              </div>
              <div
                onClick={() => handleSoftwareClick("Other")}
                className="h-[130px] w-[130px] md:h-[200px] md:w-[200px] border border-[#F6D31F] rounded-3xl cursor-pointer flex justify-center items-center bg-transparent transition-all duration-500 hover:bg-[#F6D31F] group"
              >
                <img
                  src={softwareImages.Other}
                  alt="Other"
                  className="w-[100px] md:w-[160px] transition-all duration-500 group-hover:scale-[105%]"
                />
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-2xl md:text-[48px] text-center mt-8 text-[#F6D31F]">
            Your template download just started!
          </h2>
        )}
      </motion.section>
    </AnimatePresence>
  );
};

export default Download;
