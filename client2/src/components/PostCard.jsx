/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import NoProfile from "../assets/userprofile.png";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import moment from "moment";
import CommentForm from "./CommentForm";
import Loading from "./Loading";
import ReplyCard from "./ReplyCard";
import { set } from "react-hook-form";
import { axiosInstance } from "../services/api-client";
import ReplyForm from "./ReplyForm";

const PostCard = ({ post, user, likePost, deletePost }) => {
  // console.log("user PostCard", user);

  // console.log("postPOstCaRD......", post);
  const [showAll, setShowAll] = useState(0);
  const [showReply, setShowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(true);
  const [loading, setloading] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [commentLikes, setCommentlikes] = useState(true);
  const [likecomment, setLikecomment] = useState(0);

  const getComments = async (postId) => {
    setloading(true);
    const { data } = await axiosInstance.get("/posts/comments/" + postId);
    console.log(data.data);
    setReplyComments(0);
    setComments(data.data);

    setloading(false);
  };

  const handleLike = async (url) => {};

  return (
    <div className="p-4 bg-primary rounded-xl my-2">
      <div className="flex items-center gap-3 mb-2">
        <Link to={"/profile/" + post?.userId?._id}>
          {console.log("post.userId.profileUr1", post.userId.profileUrl)}
          <img
            src={post.userId.profileUrl || NoProfile}
            alt={post?.userId?.firstName}
            className="object-cover rounded-full w-14 h-14"
          />
        </Link>
        <div className="flex justify-between w-full">
          <div className="text-ascent-1">
            <Link to={"/profile/" + post?.userId?._id}>
              {post?.userId?.firstName} {post?.userId?.lastName}
            </Link>
            <span className="flex flex-col text-sm text-ascent-2">
              {post.userId?.location}
            </span>
          </div>

          <span className="text-ascent-2">
            {moment(post?.createdAt ?? "2023-05-25").fromNow()}
          </span>
        </div>
      </div>

      <div className="text-ascent-2">
        {showAll === post.id
          ? post?.description
          : post?.description?.slice(0, 200)}
        {post.description.length > 200 &&
          (showAll === post.id ? (
            <span
              className="ml-2 font-medium cursor-pointer text-blue"
              onClick={() => setShowAll(0)}
            >
              Show less
            </span>
          ) : (
            <span
              className="ml-2 font-medium cursor-pointer text-blue"
              onClick={() => setShowAll(post.id)}
            >
              Show more
            </span>
          ))}
        {post.image && (
          <img
            src={post.image}
            alt="post"
            className="object-cover w-full mt-4 h-96 rounded-xl"
          />
        )}
        {/* Likes */}

        <div className="mt-4 border-t border-[#66666645] flex justify-between items-center px-3 py-2 text-ascent-2">
          <p className="flex items-center gap-2 text-base cursor-pointer">
            {post?.likes?.includes(user?._id) || likes ? (
              <BiLike size={20} onClick={() => setLikes(false)} />
            ) : (
              <BiSolidLike
                size={20}
                color="blue"
                onClick={() => setLikes(true)}
              />
            )}
            {post?.likes?.length} likes
          </p>
          {/* Comments */}
          <p
            className="flex items-center gap-2 text-base cursor-pointer"
            onClick={() => {
              setShowComments(!showComments);
              getComments(post._id);
            }}
          >
            <BiComment size={20} />
            {post?.likes?.length} Comments
          </p>
          {/* Delete */}
          {user._id === post.userId._id && (
            <div
              className="flex items-center gap-1 text-base cursor-pointer text-ascent-1"
              onClick={() => deletePost(post._id)}
            >
              <MdOutlineDeleteOutline size={20} />
              <span>Delete</span>
            </div>
          )}
          {/* <div
            className="flex items-center gap-1 text-base cursor-pointer text-ascent-1"
            onClick={() => deletePost(post._id)}
          >
            <MdOutlineDeleteOutline size={20} />
            <span>Delete</span>
          </div> */}
        </div>
      </div>

      {/* Comments Form */}
      {showComments && (
        <div className="w-full mt-4 border-t">
          <CommentForm
            key={post._id}
            user={user}
            id={post._id}
            getComments={() => getComments(post._id)}
          />
        </div>
      )}

      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div className="w-full py-2" key={comment._id}>
            <div className="flex items-center gap-3 mb-2">
              <Link to={"/profile/" + comment?.userId?._id}>
                <img
                  src={comment.userId?.profileUr1 || NoProfile}
                  alt={comment.userId.firstName}
                  className="object-cover rounded-full w-14 h-14"
                />
              </Link>
              <div>
                <Link to={"/profile/" + comment?.userId._id}>
                  <p className="font-medium text-ascent-1 text base">
                    {comment.userId.firstName} {comment.userId.lastName}
                  </p>
                </Link>
                <span className="flex flex-col text-sm text-ascent-2">
                  {moment(comment.createdAt).fromNow()}
                </span>
              </div>
            </div>
            <div className="ml-12">
              <p className="text-ascent-2">{comment.comment}</p>
              <div className="flex gap-6 mt-2">
                <p
                  className="flex items-center gap-2 text-base cursor-pointer"
                  onClick={() => handleLike("/posts/likes")}
                >
                  {comment?.likes?.includes(user?._id) ? (
                    <BiSolidLike size={20} color="blue" />
                  ) : (
                    <BiLike size={20} />
                  )}
                  {comment?.likes?.length} likes
                </p>
                <span
                  className="cursor-pointer text-blue"
                  onClick={() => setReplyComments(comment._id)}
                >
                  Reply
                </span>
              </div>
              {replyComments === comment._id && (
                <ReplyForm
                  user={user}
                  id={comment._id}
                  replyAt={comment.userId}
                  getComments={() => getComments(post._id)}
                />
              )}
            </div>

            {/* Problem */}
            <div className="px-8 py-2 mt-6">
              {comment.replies.length > 0 && (
                <p
                  className="text-base cursor-pointer text-ascent-1"
                  onClick={() => {
                    setShowReply(
                      showReply === comment.replies[index]._id
                        ? 0
                        : comment.replies[index]._id
                    );
                  }}
                >
                  Show Replies {comment?.replies[index]?.length}
                </p>
              )}
              {showReply === comment?.replies[index]?._id &&
                comment.replies.map((reply) => (
                  <ReplyCard
                    reply={reply}
                    user={user}
                    key={reply._id}
                    handleLike={() =>
                      handleLike(
                        "/posts/like-comment/" + comment._id + "/" + reply._id
                      )
                    }
                  />
                ))}
            </div>
          </div>
        ))
      ) : (
        <span className="mt-2 text-sm text-ascent-2">
          No comments available
        </span>
      )}
    </div>
  );
};

export default PostCard;
