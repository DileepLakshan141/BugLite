import { SIGNIN_REQUEST } from "@/types/auth_types";
import { authClient } from "@/utils/auth_client";

export const signin = async (values: SIGNIN_REQUEST) => {
  try {
    const { data, error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      return { success: false, message: `${error.message} ${error.code}` };
    }

    return {
      success: true,
      message: `Signin successful. Welcome back ${data.user.name}!`,
      data,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Signin process failed." };
  }
};
