/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NoProfile from "../assets/userprofile.png";
import { UpdateProfile } from "../redux/userSlice";
import { LiaEditSolid } from "react-icons/lia";
import { BsFacebook, BsInstagram, BsPersonFillAdd } from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import moment from "moment/moment";

const ProfileCard = ({ user }) => {
  const { user: data, edit } = useSelector((state) => state.user);
  // console.log("ProfileCarddata", data);
  console.log("ProfileCardUser", user);
  const dispatch = useDispatch();
  return (
    <div>
      <div
        className="w-full bg-primary flex 
    items-center shadow-sm rounded-xl px-6 py-4"
      >
        <div
          className="w-full flex flex-col items-center 
        justify-between border-b pb-5 border-[#66666645]"
        >
          <Link to={"/profile/" + user._id} className="flex gap-2">
            <img
              src={user.profileUrl ? user.profileUrl : NoProfile}
              alt={user?.email}
              className="rounded-full w-16 h-16 object-cover"
            />
          </Link>
          <div className="text-ascent-1">
            {user.firstName} {user.lastName}
          </div>
          <div>
            {user?._id === data?.userFound._id ? (
              <LiaEditSolid
                size={22}
                className="text-blue cursor-pointer "
                onClick={() => dispatch(UpdateProfile(true))}
              />
            ) : (
              <button
                className="bg-[#0444a430] text-sm text-white 
                p-1 rounded"
                onClick={() => {}}
              >
                <BsPersonFillAdd size={22} className="text-[#0f52b6]" />
              </button>
            )}
          </div>
          <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645] ">
            <div className="flex gap-2 items-center text-ascent-2">
              <CiLocationOn className="text-xl text-ascent-1" />
              <span>{user?.profession ?? "Add Profession"}</span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645] ">
            <p className="text-ascent-2 text-sm">
              {user?.friends?.length} Friends
            </p>

            <div className="flex gap-2 items-center justify-between">
              <span className="text-ascent-2">Who viewed your profile?</span>
              <span className="text-ascent-1 text-lg">
                {user?.views?.length}
              </span>
            </div>

            <span className="text-base text-blue">
              {user?.verified ? "Verified Account" : "Not Verified"}
            </span>

            <div className="flex gap-2 items-center justify-between">
              <span className="text-ascent-2">Joined</span>
              <span className="text-ascent-1 text-base">
                {moment(user?.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <div className="flex justify-start space-x-4 flex-row h-full items-center pt-4">
            <div className="bg-bgColor p-3 rounded-lg shadow-md w-1/4 flex justify-center items-center">
              <BsFacebook className="text-[#595b64] text-2xl" />{" "}
            </div>
            <div className="bg-blue-400 p-3 rounded-lg shadow-md w-1/4 flex justify-center items-center">
              <FaTwitterSquare className="text-[#595b64] text-2xl" />
            </div>
            <div className="bg-pink-500 p-3 rounded-lg shadow-md w-1/4 flex justify-center items-center">
              <BsInstagram className="text-[#595b64] text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
