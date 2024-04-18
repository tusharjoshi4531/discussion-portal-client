import { useState, useRef, useContext } from "react";
import FormLayout from "../FormLayout";

import UserContext, { ACTION_TYPE } from "../../../store/user-context";
import login, { signup } from "../../../api/auth";

const LoginForm = () => {
  // States
  const [isOnLogin, setIsOnLogin] = useState(true);

  // Refs
  const usernameRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const confirmPasswordRef = useRef<HTMLInputElement>(null!);

  // Context
  const { dispatch } = useContext(UserContext);

  // Handles toggle form button click event
  const toggleFormClickHandler = () => {
    // Reset text inputs
    usernameRef.current.value = "";
    passwordRef.current.value = "";
    if (!isOnLogin) confirmPasswordRef.current.value = "";

    // Toggle the form state
    setIsOnLogin((state) => !state);
  };

  const testCredentialsHandler = () => {
    usernameRef.current.value = "Guest1";
    passwordRef.current.value = "1234567";
  };

  // Handles form submit
  const submitHandler = async () => {
    // Retrieving data from text input
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    // Check if input is valid
    const isValid = username.trim().length >= 5 && password.trim().length >= 7;

    if (!isValid) {
      return;
    }

    if (!isOnLogin) {
      // For Signup form
      const confirmPassword = confirmPasswordRef.current.value;

      // Check if confirm password is epual to password
      if (confirmPassword !== password) {
        confirmPasswordRef.current.value = "";
        return;
      }

      // Signup user
      const userData = await signup(username, password);

      // Update user data
      dispatch({ type: ACTION_TYPE.SET_VALUE, payload: userData });
    } else {
      // For Login form

      // Login
      const userData = await login(username, password);

      // Update user data
      dispatch({ type: ACTION_TYPE.SET_VALUE, payload: userData });
    }
  };

  return (
    <FormLayout
      onSubmit={submitHandler}
      title={isOnLogin ? "Login" : "Sign Up"}
      control={
        <>
          <label>Username: </label>
          <input type="text" placeholder="Username" ref={usernameRef} />

          <label>Password:</label>
          <input type="password" placeholder="Password" ref={passwordRef} />

          {!isOnLogin && (
            <>
              <label>Confirm Password:</label>
              <input
                type="password"
                placeholder="Confirm Password"
                ref={confirmPasswordRef}
              />
            </>
          )}
        </>
      }
      action={
        <>
          {isOnLogin && (
            <button type="button" onClick={testCredentialsHandler}>
              Test Credentials
            </button>
          )}
          <button type="button" onClick={toggleFormClickHandler}>
            {!isOnLogin ? "Login" : "Sign Up"}
          </button>
          <button type="submit">{isOnLogin ? "Login" : "Sign Up"}</button>
        </>
      }
    />
  );
};

export default LoginForm;
