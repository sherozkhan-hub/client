/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import NoProfile from "../assets/userprofile.png";
import { axiosInstance } from "../services/api-client";

const CommentForm = ({ user, replyAt, getComments, id }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  // console.log({ replyAt });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      from: user.firstName,
    };
    setLoading(true);
    const res = await axiosInstance.post(`/posts/comment/${id}`, newData);
    // console.log(res.data, "creating posts");
    setLoading(false);
    getComments();
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full border-b border-[#66666645]"
    >
      <div className="flex items-center w-full gap-2 py-4">
        <img
          src={user.profileUrl ?? NoProfile}
          className="object-cover w-10 h-10 rounded-full"
        />
        <TextInput
          styles="w-full rounded-full py-3"
          placeholder={
            replyAt
              ? `Reply @${replyAt.firstName + " " + replyAt.lastName}`
              : "Comment this post"
          }
          register={register("comment", {
            required: "Comment cannot be empty",
          })}
          error={errors?.comment?.message}
        />
        {errMsg?.message && (
          <span
            role="alert"
            className={`text-sm ${
              errMsg?.status === "failed" ? "text-red-500" : "text-green-500"
            } mt-0.5`}
          >
            {errMsg?.message}
          </span>
        )}

        <div className="flex items-end justify-end pb-2">
          {loading ? (
            <Loading />
          ) : (
            <CustomButton
              type="submit"
              title="Post"
              containerStyles="bg-[#0444a4] text-white rounded-full font-semibold 
                  text-sm py-1 px-3"
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
