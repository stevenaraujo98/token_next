import { toast } from "react-toastify";

export const showToastMessage = (result) => {
  if (result.success) {
    toast.success(result.data.message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    toast.error(result.error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};
