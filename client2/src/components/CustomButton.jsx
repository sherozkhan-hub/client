import { useDispatch, useSelector } from "react-redux";
import { setDenyButton, setDisable, setValue } from "../redux/postSlice";
import { useEffect } from "react";
import { MdOutlineDoneOutline } from "react-icons/md";


/* eslint-disable react/prop-types */
const CustomButton = ({ title, containerStyles, iconRight, type, onClick , friendrequest ,buttonID }) => {
  const { acceptButton,disable,denyButton,value  } = useSelector((state) => state.posts);
  const dispatch = useDispatch()



  useEffect(()=>{
   
        if(title === acceptButton)
            {
              dispatch(setValue('Deny'))
            }
            else if(title === denyButton)
            {
              dispatch(setValue('Accept'))
            }
  },[acceptButton,denyButton])
  return (
    <>
       <button
        onClick={onClick}
        type={type || "button"}
        disabled={title== value? disable: false}
        className={` inline-flex items-center text-base ${containerStyles} ${title == value ? 'hidden': ''}
      `}
      >
        {(title === acceptButton && "64df3aec4180b81adfe41d32" === "64df3aec4180b81adfe41d32" ) ? <div className="px-4 py-2"> Accepted</div> : title=== denyButton? <div className="px-12 py-2"> Denied</div>  : title }
        {title ===acceptButton? <div className="px-3 animate__animated animate__fadeInUp"><MdOutlineDoneOutline size={20}/></div> : ''}
      </button>
    </>
  );
};
export default CustomButton;


































 {/* <button
        onClick={onClick}
        type={type || "button"}
        disabled={title== value? disable: false}
        className={` inline-flex items-center text-base ${containerStyles}
      `}
      >
        {title === acceptButton ? 'Accepted' : title=== denyButton? 'Denied' : title }
        {iconRight && <div className="ml-2">{iconRight}</div>}
      </button> */}