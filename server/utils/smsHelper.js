import axios from "axios";
import twilio from "twilio";

import dotenv from "dotenv";
dotenv.config();

//FAST 2 SMS
// export const sendSMS = async (contactNumber, message) => {
//   try {
//     const response = await axios.post(
//       "https://www.fast2sms.com/dev/bulkV2",
//       {
//         message: message,
//         language: "english",
//         route: "q", // This is usually provided by Fast2SMS
//         numbers: contactNumber,
//       },
//       {
//         headers: {
//           authorization: process.env.FAST2SMS_API_KEY,
//         },
//       }
//     );
//     console.log("SMS sent successfully:", {
//       response,
//       contactNumber,
//       message,
//       env: process.env.FAST2SMS_API_KEY,
//     });
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//   }
// };

//Twilio
// Twilio credentials from the Twilio Console
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export const sendSMS = async (contactNumber, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: contactNumber,
    });

    console.log("SMS sent successfully:", response.sid);
  } catch (error) {
    console.error("Error sending SMS:", error.message);
  }
};
