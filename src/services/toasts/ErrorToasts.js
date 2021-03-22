import Materialize from "materialize-css";
import "./Toasts.css";

export default {
  custom: {
    error: (message, length) => {
      Materialize.toast({
        html: message,
        displayLength: length,
        classes: "rounded error-toasts"
      });
    }
  }
};
