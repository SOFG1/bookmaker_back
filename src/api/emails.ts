import axios from "axios";

const EMAILS_API_URL = "https://api.emailjs.com/api/v1.0/email";

const eventsApiInstance = axios.create({
  baseURL: EMAILS_API_URL,
});

export const emailsApi = {
  sendEmail(email: string, code: string) {
    const data = {
      service_id: "service_0vs4zf9",
      template_id: "template_f4618kc",
      user_id: "QWrx6LY0SCtxlKbss",
      template_params: {
        to_name: "Dear user",
        code,
        email,
      },
    };
    return eventsApiInstance.post("/send", data);
  },
};
