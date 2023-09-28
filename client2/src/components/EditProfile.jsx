import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { UpdateProfile, Userlogin } from "../redux/userSlice";
import { handleFileUpload } from "../utils";
import { axiosInstance } from "../services/api-client";
import Loading from "./Loading";

const EditProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();
  const [picture, setPicture] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // console.log(user, "user response");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: user.userFound?.firstName,
      lastName: user.userFound?.lastName,
      location: user.userFound?.location,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      // console.log(picture, "checking picture");
      const pictureUrl = picture && (await handleFileUpload(picture));

      // console.log(pictureUrl, "picturing");
      // console.log(data, "data checking");
      // Update the user profile
      const res = await axiosInstance.put(`users/update-user`, {
        ...data,
        profileUrl: pictureUrl ? pictureUrl : user.userFound.profileUrl,
      });

      // console.log(res, "res");
      // console.log(user.token, "token");
      if (res.status) {
        const newUser = {
          ...res.data,
          token: user.token,
          userFound: res.data.user,
        };

        console.log(newUser, "newUser");

        dispatch(Userlogin(newUser));

        setTimeout(() => {
          dispatch(UpdateProfile(false));
        }, 2000);
      }
      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(UpdateProfile(false));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Your modal content here */}
      {/* ... */}
      <div
        className="inline-block align-bottom bg-[#385170] text-left
      overflow-hidden shadow-xl transform rounded-lg w-[]  transition-all sm:my-8
      sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="flex justify-between px-6 pt-5 pb-2 bg-blue">
          <label className="text-2xl font-medium text-left text-ascent-1">
            Edit Profile
          </label>

          <button className="text-ascent-1" onClick={handleClose}>
            <MdClose size={22} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 px-10 py-10 sm:px-2xl:gap-6 bg-ascent-1"
          encType="multipart/form-data"
        >
          <div>
            <label className="text-lg font-semibold">First Name</label>
            <Controller
              name="firstName"
              control={control}
              defaultValue={user?.firstName}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter your First Name"
                  className="w-full rounded-lg py-5"
                />
              )}
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </div>
          <div>
            <label className="text-lg font-semibold">First Name</label>
            <Controller
              name="lastName"
              control={control}
              defaultValue={user?.lastName}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter your First Name"
                  className="w-full rounded-lg py-5"
                />
              )}
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </div>
          <div>
            <label className="text-lg font-semibold">First Name</label>
            <Controller
              name="location"
              control={control}
              defaultValue={user?.location}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Enter your First Name"
                  className="w-full rounded-lg py-5"
                />
              )}
            />
            {errors.location && (
              <span className="text-red-500">{errors.location.message}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="imageUpload"
              className="flex items-center gap-2 cursor-pointer pl-4 mt-[2rem] text-ascent-2 hover:text-ascent-1"
            >
              <input
                type="file"
                onChange={(e) => setPicture(e.target.files[0])}
                id="imageUpload"
                accept=".jpg, .jpeg, .png"
              />
            </label>
          </div>

          {/* <label
            htmlFor="imageUpload"
            className="flex items-center gap-2 cursor-pointer text-ascent-2 hover:text-ascent-1"
          >
            <input
              type="file"
              onChange={(e) => console.log(e.target, "consoling")}
              // id="imageUpload"
              data-max-size="51200"
              accept=".jpg, .jpeg, .png"
              className="hidden"
            />
            <BiImages />
            <span>Image</span>
          </label> */}

          {errMsg && (
            <span
              role="alert"
              className={`text-sm ${
                errMsg.status === "failed" ? "text-red-500" : "text-green-500"
              } mt-0.5`}
            >
              {errMsg.message}
            </span>
          )}

          <div className="py- sm:flex sm:flex-row-reverse border-t border-[#66666645]">
            {isSubmitting ? (
              <Loading />
            ) : (
              <button
                type="submit"
                className="inline-flex justify-center rounded-md
              bg-blue px-8 py-3 text-sm font-medium text-white outline-none mt-[2rem]"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
