import {
  User,
  Comment,
  Comments as CommentsType,
} from '@couragames/shared-types';
import styled from '@emotion/styled';
import { UserComment } from './comment';
import { useState } from 'react';
import { postComment, deleteComment as deleteCommentAPI } from '@couragames/ui';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

interface CommentsProps {
  username: string;
  user?: User;
  comments: CommentsType;
  isLoading: boolean;
  addComment: (comment: Comment) => void;
  deleteComment: (id: number) => void;
}

export function Comments({
  username,
  user,
  comments,
  addComment,
  deleteComment,
  isLoading,
}: CommentsProps) {
  const [message, setMessage] = useState('');
  const handlePost = async () => {
    if (!user) return;
    //Throw Error -> Show a message to user informing them they cant send the same message as before or an empty message
    if (!message) return;

    try {
      const { data } = await postComment(username, message);
      addComment(data);
    } catch (err) {
      //Show Notification
      console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCommentAPI(username, id);
      deleteComment(id);
    } catch (err) {}
  };

  return (
    <Container>
      {user && (
        <PostComment>
          <img src={user.avatarUrl} alt="Your Avatar"></img>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your comment..."
          />
          <button onClick={handlePost}>POST</button>
        </PostComment>
      )}
      {isLoading &&
        new Array(5).fill(0).map((key) => (
          <Box padding="6" boxShadow="lg" bg="white" key={key}>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        ))}
      {!isLoading &&
        comments.comments.map((comment) => {
          const author = comments.users.find(
            (user) => user.id === comment.authorId
          );

          if (!author) return <div key={comment.id}></div>;

          return (
            <UserComment
              key={comment.id}
              comment={comment}
              handleDelete={handleDelete}
              isOwner={user?.id === comment.authorId}
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
  width: 100%;
  height: 100%;

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
