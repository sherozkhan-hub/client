import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";

export const handleFileUpload = async (file) => {
  const cloud_name = "ddz55xfrt";
  const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
  const cloudinaryApiUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`;

  const preset_key = "social";
  console.log(file, "file");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset_key);
  // formData.append("cloud_name", cloud_name);

  try {
    console.log("print checking");
    // const res = await axios.post(
    //   `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload/${preset_key}`,
    //   formData
    // );
    // const cld = new Cloudinary({ cloud: { cloudName: "ddz55xfrt" } });
    // const upload = cld.uploader.upload(formData, {
    //   upload_preset: "social",
    // });
    // console.log(upload, "upload");
    const res = await axios.post(`${cloudinaryApiUrl}`, formData);
    console.log(res, "IMAGESSSSS");

    return res.data.secure_url;
  } catch (error) {
    console.log(error);
    return null; // Handle the error gracefully
  }
};

handleFileUpload();
