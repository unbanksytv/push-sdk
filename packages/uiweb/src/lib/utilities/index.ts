import { format } from "date-fns";
const IPFS_BASE_URL = "https://ipfs.io/ipfs/";

/**
 * @description extract the ipfs HASH from the name of an image i.e www.xyz.com/abc/ipfshash.jpg => ipfshash
 * @param notificationBody
 * @returns the ipfs hash extracted from the image name
 */
export function extractIPFSHashFromImageURL(imageURL: string | undefined) {
  if (!imageURL) return { type: "http", url: "" };
  if (imageURL.includes("ipfs")) return { type: "ipfs", url: imageURL };
  if (imageURL.includes("base64")) return { type: "base64", url: imageURL };
  const match = imageURL.match(/(\w+).jpg/);
  const output = match ? `${IPFS_BASE_URL}${match[1]}` : "";
  return { type: "http", url: output };
}

/**
 * @description Parse the contents of the markdown version of the notification body
 * @param message the notification body we wish to parse
 * @returns 
 */
export const FormatBody = (message: string) => {
  // firstly replace all new line content of the text with <br />
  // in order to parse it as HTML i.e "\n\n" => "<br /><br />"
  const parsedNewLine =  message.replace(/\n/g, "<br />");
  // remove leading slashes from text i.e \alex => alex
  const removedLeadingSlash = parsedNewLine.replace(/^\\/g, "");

  return removedLeadingSlash;
}

/**
 * @description parse and extract the timestamp from the body of the notification and remove the text from the body
 * @param notificationBody the text which would represent the body of the notification
 * @returns
 */
 export function extractTimeStamp(notificationBody: string): {
  notificationBody: string;
  timeStamp: string;
  originalBody: string;
} {
  const parsedBody = {
    notificationBody: FormatBody(notificationBody),
    timeStamp: "",
    originalBody: notificationBody,
  };
  const matches = notificationBody.match(/\[timestamp:(.*?)\]/);
  if (matches) {
    parsedBody.timeStamp = matches[1];
    const textWithoutTimeStamp = notificationBody.replace(
      / *\[timestamp:[^)]*\] */g,
      ""
    );
    parsedBody.notificationBody = FormatBody(textWithoutTimeStamp);
    parsedBody.originalBody = textWithoutTimeStamp;
  }
  return parsedBody;
}

export function convertTimeStamp(timeStamp: string) {
  return format(new Date(Number(timeStamp) * 1000), 'dd MMM yyyy | hh:mm a')
}