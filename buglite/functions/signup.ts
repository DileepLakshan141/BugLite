import { SIGNUP_REQUEST } from "@/types/auth_types";
import { authClient } from "@/utils/auth_client";

export const signup = async (values: SIGNUP_REQUEST) => {
  try {
    const { data, error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.username,
    });

    if (error) {
      return { success: false, message: `${error.message} ${error.code}` };
    }

    return {
      success: true,
      message: `Signup successful. Please login to continue ${data.user.name}.`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Signup process failed." };
  }
};
