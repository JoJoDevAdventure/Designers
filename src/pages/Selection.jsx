import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { headTextAnimation, slideAnimation } from "../config/motion";
import state from "../store";

const Selection = () => {
  const snap = useSnapshot(state);
  const [showTerms, setShowTerms] = useState(false); // State to manage the visibility of the Terms and Conditions

  const alertAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  };

  return (
    <>
      <motion.p
        className="px-8 md:px-64 mb-10 text-white text-xl md:text-3xl text-center"
        {...headTextAnimation}
      >
        Welcome to Plonkkaa's designer space
      </motion.p>

      <motion.div
        className="flex flex-row md:gap-8 gap-2 mb-8 h-64 md:h-full mx-8 md:mx-auto"
        {...headTextAnimation}
      >
        <motion.div
          className="border-4 border-[#F6D31F] md:px-8 md:py-16 p-4 rounded-3xl cursor-pointer flex flex-col items-center gap-8 md:min-w-96 min-h-24 group bg-transparent hover:bg-[#F6D31F] w-full"
          {...slideAnimation("left")}
          onClick={() => (state.isOnDownload = true)}
        >
          <svg
            width="183"
            height="183"
            viewBox="0 0 183 183"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:text-[#9B4191] text-[#F6D31F] w-[60px] md:w-full"
          >
            <path
              d="M5.71875 113.231C7.23546 113.231 8.69004 113.834 9.76252 114.906C10.835 115.979 11.4375 117.433 11.4375 118.95V147.544C11.4375 150.577 12.6425 153.486 14.7875 155.631C16.9324 157.776 19.8416 158.981 22.875 158.981H160.125C163.158 158.981 166.068 157.776 168.213 155.631C170.357 153.486 171.562 150.577 171.562 147.544V118.95C171.562 117.433 172.165 115.979 173.237 114.906C174.31 113.834 175.765 113.231 177.281 113.231C178.798 113.231 180.253 113.834 181.325 114.906C182.397 115.979 183 117.433 183 118.95V147.544C183 153.611 180.59 159.429 176.3 163.719C172.01 168.009 166.192 170.419 160.125 170.419H22.875C16.8082 170.419 10.9898 168.009 6.69993 163.719C2.41004 159.429 0 153.611 0 147.544V118.95C0 117.433 0.602509 115.979 1.67498 114.906C2.74746 113.834 4.20204 113.231 5.71875 113.231Z"
              fill="currentColor"
            />
            <path d="M87.451 135.58C87.9823 136.113 88.6133 136.535 89.3081 136.824C90.0029 137.112 90.7477 137.26 91.4999 137.26C92.2521 137.26 92.9969 137.112 93.6917 136.824C94.3865 136.535 95.0176 136.113 95.5488 135.58L129.861 101.268C130.935 100.194 131.538 98.7374 131.538 97.2188C131.538 95.7001 130.935 94.2437 129.861 93.1699C128.787 92.096 127.331 91.4928 125.812 91.4928C124.294 91.4928 122.837 92.096 121.764 93.1699L97.2187 117.726V17.1562C97.2187 15.6395 96.6161 14.185 95.5437 13.1125C94.4712 12.04 93.0166 11.4375 91.4999 11.4375C89.9832 11.4375 88.5286 12.04 87.4561 13.1125C86.3837 14.185 85.7812 15.6395 85.7812 17.1562V117.726L61.2363 93.1699C60.1624 92.096 58.706 91.4928 57.1874 91.4928C55.6688 91.4928 54.2124 92.096 53.1385 93.1699C52.0647 94.2437 51.4614 95.7001 51.4614 97.2188C51.4614 98.7374 52.0647 100.194 53.1385 101.268L87.451 135.58Z" />
          </svg>
          <h4 className="md:text-3xl text-xl text-[#F6D31F] group-hover:text-[#9B4191]">
            Download our template
          </h4>
        </motion.div>

        <motion.div
          className="border-4 border-[#F6D31F] md:px-8 md:py-16 p-4 rounded-3xl cursor-pointer flex flex-col items-center gap-8 md:min-w-96 min-h-24 group bg-transparent hover:bg-[#F6D31F] w-full"
          {...slideAnimation("right")}
          onClick={() => (state.isOnUpload = true)}
        >
          <svg
            width="183"
            height="183"
            viewBox="0 0 183 183"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:text-[#9B4191] text-[#F6D31F] w-[60px] md:w-full"
          >
            <path d="M5.71875 113.231C7.23546 113.231 8.69004 113.834 9.76252 114.906C10.835 115.979 11.4375 117.433 11.4375 118.95V147.544C11.4375 150.577 12.6425 153.486 14.7875 155.631C16.9324 157.776 19.8416 158.981 22.875 158.981H160.125C163.158 158.981 166.068 157.776 168.213 155.631C170.357 153.486 171.562 150.577 171.562 147.544V118.95C171.562 117.433 172.165 115.979 173.237 114.906C174.31 113.834 175.765 113.231 177.281 113.231C178.798 113.231 180.253 113.834 181.325 114.906C182.397 115.979 183 117.433 183 118.95V147.544C183 153.611 180.59 159.429 176.3 163.719C172.01 168.009 166.192 170.419 160.125 170.419H22.875C16.8082 170.419 10.9898 168.009 6.69993 163.719C2.41004 159.429 0 153.611 0 147.544V118.95C0 117.433 0.60251 115.979 1.67498 114.906C2.74746 113.834 4.20204 113.231 5.71875 113.231Z" />
            <path d="M95.5495 13.1176C95.0182 12.585 94.3872 12.1625 93.6924 11.8742C92.9976 11.5859 92.2528 11.4375 91.5006 11.4375C90.7484 11.4375 90.0036 11.5859 89.3088 11.8742C88.614 12.1625 87.9829 12.585 87.4517 13.1176L53.1392 47.4301C52.0654 48.5039 51.4621 49.9604 51.4621 51.479C51.4621 52.9976 52.0654 54.454 53.1392 55.5278C54.213 56.6017 55.6695 57.2049 57.1881 57.2049C58.7067 57.2049 60.1631 56.6017 61.237 55.5278L85.7818 30.9715L85.7818 131.541C85.7818 133.058 86.3843 134.513 87.4568 135.585C88.5293 136.658 89.9839 137.26 91.5006 137.26C93.0173 137.26 94.4719 136.658 95.5444 135.585C96.6168 134.513 97.2193 133.058 97.2193 131.541L97.2193 30.9715L121.764 55.5278C122.838 56.6017 124.294 57.2049 125.813 57.2049C127.332 57.2049 128.788 56.6017 129.862 55.5278C130.936 54.454 131.539 52.9976 131.539 51.479C131.539 49.9604 130.936 48.5039 129.862 47.4301L95.5495 13.1176Z" />
          </svg>

          <h4 className="md:text-3xl text-xl text-[#F6D31F] group-hover:text-[#9B4191]">
            Upload your design
          </h4>
        </motion.div>
      </motion.div>

      <div className="flex items-center gap-2">
        <motion.div {...alertAnimation}>
          <svg
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_221_10)">
              <path
                d="M25.4898 6.03369L42.0383 34.6955C42.2907 35.1326 42.4235 35.6283 42.4235 36.133C42.4235 36.6377 42.2907 37.1334 42.0384 37.5705C41.786 38.0075 41.4231 38.3705 40.9861 38.6228C40.549 38.8752 40.0533 39.008 39.5486 39.008H6.45159C5.94693 39.008 5.45116 38.8752 5.01411 38.6228C4.57707 38.3705 4.21414 38.0075 3.96182 37.5705C3.70949 37.1334 3.57666 36.6377 3.57666 36.133C3.57666 35.6283 3.70951 35.1326 3.96184 34.6955L20.5103 6.03369C21.6163 4.11702 24.382 4.11702 25.4898 6.03369ZM23.0001 28.75C22.4918 28.75 22.0042 28.952 21.6448 29.3114C21.2854 29.6708 21.0834 30.1584 21.0834 30.6667C21.0834 31.175 21.2854 31.6625 21.6448 32.022C22.0042 32.3814 22.4918 32.5834 23.0001 32.5834C23.5084 32.5834 23.9959 32.3814 24.3554 32.022C24.7148 31.6625 24.9168 31.175 24.9168 30.6667C24.9168 30.1584 24.7148 29.6708 24.3554 29.3114C23.9959 28.952 23.5084 28.75 23.0001 28.75ZM23.0001 15.3334C22.5306 15.3334 22.0775 15.5058 21.7267 15.8177C21.3759 16.1297 21.1518 16.5595 21.0968 17.0258L21.0834 17.25V24.9167C21.084 25.4052 21.271 25.8751 21.6064 26.2303C21.9417 26.5855 22.4001 26.7993 22.8878 26.8279C23.3754 26.8566 23.8556 26.6979 24.2303 26.3844C24.6049 26.0708 24.8456 25.626 24.9033 25.1409L24.9168 24.9167V17.25C24.9168 16.7417 24.7148 16.2542 24.3554 15.8947C23.9959 15.5353 23.5084 15.3334 23.0001 15.3334Z"
                fill="#F6D31F"
              />
            </g>
            <defs>
              <clipPath id="clip0_221_10">
                <rect width="46" height="46" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </motion.div>
        <p className="text-[#F6D31F] text-xl">
          Please submit your designs by August 30th.
        </p>
      </div>
      <div className="flex flex-row items-center mt-16  w-full justify-between md:px-64 px-8 ">
        <button
          className="bg-[#F6D31F] text-[#9B4191] py-2 px-4 rounded hover:bg-[#9B4191] hover:text-[#F6D31F]"
          onClick={() => setShowTerms(true)}
        >
          Terms and Conditions
        </button>
        <button
          className="bg-[#F6D31F] text-[#9B4191] py-2 px-4 rounded hover:bg-[#9B4191] hover:text-[#F6D31F]"
          onClick={() => (window.location = "mailto:team@plonkkaa.com")}
        >
          Contact Us
        </button>
      </div>

      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg w-11/12 md:w-3/5 max-w-4xl text-black overflow-y-auto max-h-[90vh]">
            <p className="text-3xl font-bold mb-4">
              Terms and Conditions for PLONKKAA Designers
            </p>
            <p>
              <strong>Introduction</strong>
              <br />
              Welcome to PLONKKAA! These Terms and Conditions ("Terms") govern
              your use of our platform and services as a designer. By
              registering and uploading your designs, you agree to comply with
              and be bound by these Terms.
            </p>
            <p>
              <strong>Commission and Payment</strong>
              <br />
              Commission Rate: Designers will earn a commission of 10% on the
              sale price of each product sold featuring their design.
              <br />
              Payment Schedule: Commissions are calculated monthly and paid out
              on the 2nd of each month directly to your PayPal account.
              <br />
              Minimum Payout: If your earnings do not reach a minimum threshold
              of £10, your earnings will be carried over to the next month until
              the threshold is met.
            </p>
            <p>
              <strong>Copyright and Licensing</strong>
              <br />
              Ownership: Designers retain full ownership and copyright of their
              work.
              <br />
              Licensing: By uploading your designs to PLONKKAA, you grant us a
              non-exclusive license to use, reproduce, and sell your designs on
              various products. This license is limited to the purpose of
              selling your designs on our platform.
            </p>
            <p>
              <strong>Account Setup and Usage</strong>
              <br />
              Registration: To become a designer on PLONKKAA, you must create an
              account and provide your name, address, email, and other necessary
              details.
              <br />
              Design Uploads: You can upload up to 10 designs. Designs can be
              uploaded gradually over time or all at once. More designs can be
              uploaded if another agreement is in place.
              <br />
              Design Requirements: Designs must meet our specified format and
              quality standards, including resolution and color profile
              specifications.
            </p>
            <p>
              <strong>Termination</strong>
              <br />
              Termination by You: You may terminate your account at any time by
              providing us with written notice. Termination will not affect any
              accrued rights and obligations.
              <br />
              Termination by Us: We may terminate your account if you breach
              these Terms or if we decide to discontinue the service. In such
              cases, we will provide you with notice and pay out any outstanding
              commissions.
            </p>
            <p>
              <strong>Miscellaneous</strong>
              <br />
              Changes to Terms: We may update these Terms from time to time. We
              will notify you of any significant changes.
            </p>
            <p>
              <strong>Contact Us</strong>
              <br />
              For any questions or concerns regarding these Terms, please
              contact us at team@plonkkaa.com.
            </p>
            <button
              className="mt-4 bg-[#F6D31F] text-black py-2 px-4 rounded hover:bg-[#9B4191]"
              onClick={() => setShowTerms(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Selection;
