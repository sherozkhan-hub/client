import { Link } from "react-router-dom";
import NoProfile from "../assets/userprofile.png";

/* eslint-disable react/prop-types */
const FriendsCard = ({ friends }) => {
  return (
    <div>
      <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
        <div className="flex items-center justify-between text-ascent-1 pb-2 border-b border-[e666E6645]">
          <span> Friends</span>
          <span>{friends?.length}</span>
        </div>

        <div className="w-full flex flex-col gap-4 pt-4">
          {friends?.map((friend, index) => (
            <Link
              to={"/profile/" + friend?._id}
              key={index}
              className="w-full flex gap-4 items-center cursor-pointer"
            >
              <img
                src={friends?.profileUrl ?? NoProfile}
                alt={friends?.firstName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-ascent-1">
                  {friend?.firstName} {friend?.lastName}
                </p>
                <span className="text-xs text-ascent-2">
                  {friend?.profession || "No profession"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FriendsCard;
