import { useDispatch, useSelector } from "react-redux";
import TopBar from "../components/TopBar";
import ProfileCard from "../components/ProfileCard";
import FriendsCard from "../components/FriendsCard";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NoProfile from "../assets/userprofile.png";
import CustomButton from "../components/CustomButton";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import TextInput from "../components/TextInput";
import { useForm } from "react-hook-form";
import EditProfile from "../components/EditProfile";
import axios from "axios";
import { axiosInstance } from "../services/api-client";
import {
  setAcceptButton,
  setButtonValue,
  setDenyButton,
  setDisable,
  setPosts,
  setValue,
} from "../redux/postSlice";
import { handleFileUpload } from "../utils/index.js";
import { Userlogin } from "../redux/userSlice";

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);

  const [friendRequest, setFriendRequest] = useState([]);
  const [suggestedFriend, setSuggestedFriend] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [userHome, setUserHome] = useState({});
  // const userHome = user.userFound;
  // redux
  const dispatch = useDispatch();
  const { acceptButton, posts } = useSelector((state) => state.posts);
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  // console.log(user, "chhhh");

  const fetchPost = async () => {
    const { data } = await axiosInstance.get("/posts");
    dispatch(setPosts(data.data));
  };

  const getUser = async () => {
    try {
      // const id = id || user.userFound._id;
      const res = await axiosInstance.get(
        "/users/get-user/" + user.userFound._id
      );
      // console.log(, "user home info userss");
      // const newData = { ...res.data.data };
      // console.log(newData, "user home info");
      dispatch(setUserHome(res.data.data));
    } catch (error) {
      setErrMsg(error);
    }
  };

  useEffect(() => {
    getUser();
    fetchPost();
    fetchFriendRequest();
    fetchSuggestedFriend();
    // setLoading(false);
  }, []);

  const handlePostSubmit = async (data) => {
    setPosting(true);
    try {
      // console.log("file", file);
      // console.log("hammad", await handleFileUpload(file));
      const uri = file && (await handleFileUpload(file));
      // console.log(uri, "URI");
      // console.log("filehowm", typeof file);
      const newData = uri ? { ...data, image: uri } : data;

      const res = await axiosInstance.post("/posts/create-post", newData);
      console.log(res.data, "Post created");
      dispatch(setPosts([res.data.data, ...posts]));
      setPosting(false);

      if (!res) {
        setErrMsg(res.data);
        return;
      }

      setFile(null);
      reset();
      await fetchPost();
      setPosting(false);
    } catch (error) {
      setPosting(false);
      console.log(error);
    }
    // console.log(data.imageUpload[0].name)
  };

  const deletePost = async (id) => {
    try {
      // console.log("HomePost id...", id);
      const newPosts = posts.filter((post) => post._id !== id);
      dispatch(setPosts(newPosts));
      axiosInstance.delete(`/posts/${id}`).then((res) => {
        // console.log(res.data);
      });
    } catch (error) {
      setErrMsg(error);
    }
  };

  const handleLikePost = async () => {};
  const fetchFriendRequest = async () => {
    try {
      const { data } = await axiosInstance.get("/users/get-friend-request");
      // console.log(data.data, "friend request");
      setFriendRequest(data.data);
    } catch (error) {
      setErrMsg(error);
    }
  };
  const fetchSuggestedFriend = async () => {
    try {
      const res = await axiosInstance.post("/users/suggested-friends", {
        userId: user.userFound._id,
      });
      // console.log(res.data.data, "suggested");
      setSuggestedFriend(res.data.data);
    } catch (error) {
      setErrMsg(error);
    }
  };

  // sending request
  const handleFriendRequest = async (id) => {
    try {
      const res = await axiosInstance.post("/users/friend-request", {
        requestTo: id,
      });
      console.log(res.data, "sending friend request");
      await fetchSuggestedFriend();
    } catch (error) {
      setErrMsg(error);
    }
  };

  // accept request
  const acceptFriendRequest = async (id, status) => {
    try {
      const res = await axiosInstance.post("/users/accept-request", {
        rid: id,
        status,
      });
      console.log(res.data, "sending friend request");
      // fetchSuggestedFriend();
    } catch (error) {
      setErrMsg(error);
    }
  };

  return (
    <>
      <div className="w-full h-screen px-0 pb-20 overflow-hidden border-r-0 home lg:px-10 2xl:px-40 bg-bgColor">
        <TopBar />

        <div className="flex w-full h-full gap-2 pt-5 pb-10 lg:gap-4">
          {/* LEFT */}
          <div
            className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6
          overflow-y-auto border-r border-[#66666645]"
          >
            <ProfileCard user={userHome} />
            <FriendsCard friends={userHome?.friends} />
          </div>

          {/* CENTER */}
          <div
            className="flex-1 h-full bg-primary px-4 flex flex-col 
      gap-6 overflow-y-auto border-r border-[#66666645]"
          >
            <form
              onSubmit={handleSubmit((data) => handlePostSubmit(data))}
              className="px-4 rounded-lg bg-primary"
              encType="multipart/form-data"
            >
              <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                <img
                  src={user?.profileUrl || NoProfile}
                  alt=""
                  className="object-cover w-10 h-10 rounded-full"
                />
                <TextInput
                  placeholder="What's on your mind?"
                  styles="w-full rounded-full py-5"
                  name="description"
                  register={register("description", {
                    required: "Write Something about post",
                  })}
                  error={errors?.description?.message}
                />
              </div>

              <div className="flex items-center justify-between w-full py-2">
                <label
                  htmlFor="imageUpload"
                  className="flex items-center gap-2 cursor-pointer text-ascent-2 hover:text-ascent-1"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="imageUpload"
                    data-max-size="51200"
                    accept=".jpg, .jpeg, .png"
                    className="hidden"
                  />
                  <BiImages />
                  <span>Image</span>
                </label>
                <label
                  htmlFor="videoUpload"
                  className="flex items-center gap-2 cursor-pointer text-ascent-2 hover:text-ascent-1"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="videoUpload"
                    data-max-size="5120"
                    className="hidden"
                    {...register("videoUpload")}
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  htmlFor="imageUpload"
                  className="flex items-center gap-2 cursor-pointer text-ascent-2 hover:text-ascent-1"
                >
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    id="gifUpload"
                    data-max-size="5120"
                    accept=".gif"
                    className="hidden"
                    {...register("gifUpload")}
                  />
                  <BiImages />
                  <span>Gif</span>
                </label>
                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      title="Post"
                      // onClick={handlePostSubmit}
                      containerStyles="bg-[#0444a4] text-white rounded-full font-semibold 
                  text-sm py-1 px-6"
                    />
                  )}
                </div>
              </div>
            </form>

            {posts &&
              posts.map((post) => {
                return (
                  <>
                    {/* <div> {post.description} </div> */}
                    <PostCard
                      key={post._id}
                      user={user.userFound}
                      post={post}
                      deletePost={deletePost}
                      likePost={handleLikePost}
                    />
                    ;
                  </>
                );
              })}
          </div>
          {/* RIGHT */}
          <div className="flex-col hidden w-1/4 h-full gap-8 overflow-y-auto lg:flex">
            <div className="w-full px-6 py-5 rounded-lg shadow-sm bg-primary">
              <div
                className="flex items-center justify-between 
            text-xl text-ascent-2 pb-2 border-b border-[e666E6645]"
              >
                <span> Friend Request</span>
                <span>{friendRequest?.length}</span>
              </div>
            </div>
            {/* {/ FRIEND REQUEST */}
            {/* {console.log(friendRequest, "friend request")} */}
            <div className="flex flex-col w-full gap-4 pt-4">
              {friendRequest?.map((from) => (
                <div
                  key={from._id}
                  className="flex items-center justify-between"
                >
                  <Link
                    to={"/profile/" + from._id}
                    className="flex items-center w-full gap-4 cursor-pointer"
                  >
                    <img
                      src={from?.requestFrom?.profileUrl || NoProfile}
                      alt={from?.requestFrom?.firstName}
                      className="object-cover w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-base font-medium text-ascent-1">
                        {from?.requestFrom?.firstName}{" "}
                        {from?.requestFrom?.lastName}
                      </p>
                      <span className="text-sm text-ascent-2">
                        {from?.requestFrom?.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>
                  <div className="flex gap-1">
                    <CustomButton
                      title="Accept"
                      onClick={() => {
                        acceptFriendRequest(from._id, "Accepted");
                        // console.log(from._id, "from id");
                      }}
                      containerStyles="bg-[#0444a4] text-xs text-white px-1.5
                      py-1 rounded-full"
                      // onClick={() => {
                      //    umarFunc(from._id);
                      // }}
                      friendrequest={friendRequest}
                      buttonID={from._id}
                    />
                    <CustomButton
                      title="Deny"
                      onClick={() => acceptFriendRequest(from._id, "Deny")}
                      containerStyles="l border border-[#666] text-xs
                      text-ascent-1 px-1.5 py-1 rounded-full"
                      // onClick={() => {
                      //   dispatch(setDenyButton("Deny"));
                      //   dispatch(setDisable(true));
                      //   dispatch(setValue("Accept"));
                      // }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* {/ SUGGESTED FRIENDS */}
            <div className="w-full px-5 py-5 rounded-lg shadow-sm bg-primary">
              <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
                <span>Friend Suggestion</span>
              </div>

              <div className="flex flex-col w-full gap-4 pt-4">
                {suggestedFriend?.map((friend) => {
                  return (
                    <div
                      className="flex items-center justify-between "
                      key={friend._id}
                    >
                      <Link
                        to={"/profile/" + friend._id}
                        className="flex items-center w-full gap-4 cursor-pointer"
                      >
                        <img
                          src={friend?.profileUrl || NoProfile}
                          alt=""
                          className="object-cover w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <p className="text-base font-medium text-ascent-1">
                            {friend.firstName} {friend.lastName}
                          </p>
                          <span className="text-sm text-ascent-2">
                            {friend.profession ?? "No Profession"}
                          </span>
                        </div>
                      </Link>

                      <div className="flex gap-1">
                        <button
                          className="bg-[#0444a430] text-sm text-white p-1 rounded"
                          onClick={() => {
                            handleFriendRequest(friend._id);
                          }}
                        >
                          <BsPersonFillAdd
                            size={20}
                            className="text-[#0f52b6]"
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {edit && <EditProfile />}
    </>
  );
};

export default Home;
