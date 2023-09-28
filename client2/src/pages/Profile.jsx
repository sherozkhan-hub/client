import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import ProfileCard from "../components/ProfileCard";
import FriendsCard from "../components/FriendsCard";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import { axiosInstance } from "../services/api-client";
import { setPosts } from "../redux/postSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const [userInfo, setUserInfo] = useState(user);

  const fetchPost = async () => {
    const res = await axiosInstance.get("/posts/get-user-post/" + id);
    dispatch(setPosts(res.data.data));
  };

  const getUser = async () => {
    const res = await axiosInstance.get("/users/get-user/" + id);
    // console.log(res.data.data, "user info");
    dispatch(setUserInfo(res.data.data));
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    fetchPost();
    setLoading(false);
  }, []);

  const handleDelete = (id) => {};

  const handleLikePost = (id) => {};
  return (
    <>
      <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor ">
        <TopBar />
        <div className="w-full flex gap-2 lg:gap-4 md:pl-4 pt-5 pb-10 h-full">
          <div className="hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow">
            <ProfileCard user={userInfo} />

            <div className="block lg:hidden">
              <FriendsCard friends={userInfo?.friends} />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-6 h-full px-6 ">
            {loading ? (
              <Loading />
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  user={userInfo}
                  post={post}
                  deletePost={() => {
                    handleDelete;
                  }}
                  likePost={() => {
                    handleLikePost;
                  }}
                />
              ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center gap-4 py-10">
                <p className="text-lg text-ascent-2">No Posts available</p>
              </div>
            )}
          </div>

          <div className=" lg:block w-1/4 flex flex-col gap-6 overflow">
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
