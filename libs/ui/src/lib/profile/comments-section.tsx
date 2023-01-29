import {
  User,
  Comment,
  Comments as CommentsType,
} from '@couragames/shared-types';
import styled from '@emotion/styled';
import { UserComment } from './comment';
import { useState } from 'react';

interface CommentsProps {
  user?: User;
  comments: CommentsType;
}

export function Comments({ user, comments }: CommentsProps) {
  const message =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat magnam vitae itaque quae porro voluptatibus minus hic! Soluta suscipit laudantium fugiat vero tempora, ipsum accusantium illum ea vel quod molestias ut repellat, natus ducimus eaque obcaecati consequuntur libero doloremque cupiditate est dicta nam? Dicta animi libero amet officia totam quisquam!';
  const img_ur =
    'https://yt3.ggpht.com/oHmF1pFUKwRFGsUbzNYKkbhIJoaW4b-L_IZ0HZnmerBL_MdLwiVSaCg2YgNzj8LI8HXF59SYk8U=s900-c-k-c0x00ffffff-no-rj';

  const postComment = () => {
    if (!user) return;
    console.log('Running');

    // const curComments = [...fetchedComments];
    // if (curComments[0].message === newMessage || !newMessage) return; //Throw Error -> Show a message to user
    // curComments.unshift({
    //   id: fetchedComments.length - 1,
    //   message: newMessage,
    //   likes: 0,
    //   dislikes: 0,
    //   date: new Date(),
    //   author: user.username,
    //   author_avatar: user.avatarUrl,
    // });
    // setComments(curComments);
  };

  const deleteComment = (id: number) => {
    // const curComments = [...fetchedComments];
    // const index = curComments.findIndex((c) => c.id === id);
    // if (index === -1) return; //Unfindable || Already Deleted
    // curComments.splice(index, 1);
    // setComments(curComments);
  };

  const [newMessage, setNewMessage] = useState('');

  return (
    <Container>
      {user && (
        <PostComment>
          <img src={img_ur} alt="Your Avatar"></img>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter your comment..."
          />
          <button onClick={postComment}>POST</button>
        </PostComment>
      )}
      {comments.comments.map((comment) => {
        const author = comments.users.find(
          (user) => user.id === comment.fromUserId
        );

        if (!author) return null;

        return (
          <UserComment
            key={comment.id}
            comment={comment}
            handleDelete={deleteComment}
            isOwner={user?.id === comment.fromUserId}
            author={author}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Rubik', sans-serif;
  margin-top: 50px;
  /* background-color: red; */
  /* border-radius: inherit; */
  border-radius: 5px;
  gap: 10px;
`;

const PostComment = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: white;
  color: black;
  padding: 25px;
  gap: 30px;
  align-items: center;

  img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    object-fit: cover;
  }

  textarea {
    width: 100%;
    resize: none;
    padding: 15px;
    background: transparent;
    border: 1px solid black;
    border-radius: 4px;
    color: hsl(211, 10%, 45%);
    /* font-weight: 400; */
    :focus {
      outline: none;
      /* transition: ease-in 200ms all; */
      border: 1px solid hsl(239, 57%, 85%);
    }

    ::placeholder {
      color: hsl(211, 10%, 45%);
    }

    transition: ease-out 100ms all;
  }

  /* Rework CSS below isn't upto standards */
  button {
    display: flex;
    height: 20px;
    align-items: center;
    background: hsl(238, 40%, 52%);
    color: white;
    border-radius: 5px;
    padding: 25px;

    :hover {
      /* background-color: #6d87a2; */
      background-color: hsl(211, 10%, 45%);
    }
  }
`;
