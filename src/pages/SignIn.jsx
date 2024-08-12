import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useSnapshot } from "valtio";
import users from "../assets/data/users.json"; // Import the users data
import CustomButton from "../components/CustomButton";
import { fadeAnimation } from "../config/motion";
import state from "../store";

const SignIn = () => {
  const snap = useSnapshot(state);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = () => {
    let valid = true;
    if (!email) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
      valid = false;
    } else {
      setPasswordError(false);
    }

    if (!valid) {
      return; // Stop the login process if any field is empty
    }

    const user = users.find(user => user.email.toLowerCase === email.toLowerCase);
    if (user && user.password === password) {
      state.name = user.name;
      state.designerEmail = user.email;
      state.auth = true;
    } else {
      setEmailError(true);
      setPasswordError(true);
    }
  };

  return (
    <AnimatePresence>
      {!snap.auth && (
      <motion.section className="flex flex-col items-center mt-4">
        <motion.h1 className="text-[46px] md:text-[72px] text-[#F6D31F] text-center mb-4">
          Welcome to Plonkkaa
        </motion.h1>
        <motion.video {...fadeAnimation}
        src="Plonkkaa.mp4"
        className="w-full max-w-[90%] md:max-w-[40%] mb-10 rounded-lg border-4 border-[#F6D31F]"
        controls
      />
        <motion.form className="flex flex-col items-center w-full" onSubmit={(e) => {e.preventDefault(); handleLogin();}}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className={`p-4 border ${emailError ? 'border-red-900' : 'border-[#F6D31F]'} bg-transparent rounded-full text-white placeholder-white w-[90%] md:w-[35%] mb-4`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`p-4 border ${passwordError ? 'border-red-900' : 'border-[#F6D31F]'} bg-transparent rounded-full text-white placeholder-white w-[90%] md:w-[35%] mb-4`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
                    {(emailError || passwordError) && <div className="text-[#F6D31F] mb-4">Please check your credentials.</div>}
          <CustomButton
            text={"Log In"}
            className="bg-[#F6D31F] py-4 px-4 w-[90%] md:w-[35%] text-[#9B4191] rounded-full mb-10"
            onClick={handleLogin}
          />
        </motion.form>
      </motion.section>
      )}
    </AnimatePresence>
  );
};

export default SignIn;