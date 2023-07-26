import React from "react";
import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
//aware this is v6, useHistory has been replaced by useNavigate

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      // console.log(response.data);
      setListOfPosts(response.data);
    });
  }, []);

  const likeApost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        {PostId: postId},
        {headers: {accessToken: localStorage.getItem("accessToken")}}
      )
      .then((response) => {
        // alert(response.data);
        //Ep12 end
        setListOfPosts(
          listOfPosts.map((post) => {  
            if (post.id === postId) {
              if (response.data.liked) {
                const likeArray = post.Likes;
                likeArray.push(0);//same as below discription, it's just adding an item to modify length
                return {...post, Likes: likeArray};
                // return {...post, Likes: [...post.Likes, 0]};
                // 0 means adding an element to the array in order to let length+1,
                //So if we want to instantly show the new number of likes we can just add a new element to the likes array (it doesn't matter what we add because we only care about the length)
              } else {
                const likeArray = post.Likes;
                likeArray.pop(); //remove the last item, so length-1
                return {...post, Likes: likeArray};
              }
            } else {
              return post;
            }
          })
        );
      });
  };

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title">{value.title} </div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">{value.username}</div>
            <ThumbUpAltIcon onClick={() => {
                likeApost(value.id);
              }}
            />
              
            <label>{value.Likes.length}</label>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
