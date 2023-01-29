import { useContext } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { Comment } from '@couragames/shared-types';
import styled from '@emotion/styled';
import moment from 'moment';

interface CommentProps {
  comment: Comment;
  isOwner: boolean;
  handleDelete: (id: number) => void;
}

export function UserComment({ comment, isOwner, handleDelete }: CommentProps) {
  const { id, message, likes, dislikes, date, author, author_avatar } = comment;

  const now = moment(date).fromNow();
  return (
    <Container>
      <UpVotes>
        <FiPlus />
        <p>{likes - dislikes}</p>
        <FiMinus />
      </UpVotes>
      <Message>
        <Panel>
          <Author>
            <img
              src={author_avatar}
              onError={(e) => {
                e.stopPropagation();
                e.currentTarget.src =
                  'https://www.pngitem.com/pimgs/m/421-4212341_default-avatar-svg-hd-png-download.png';
              }}
              alt="commenter avatar"
            ></img>
            <p>{author}</p>
            <span>{now}</span>
          </Author>
          {isOwner && (
            <div className="comment_edit">
              <Button onClick={() => handleDelete(id)}>
                <MdEdit />
                <p>Delete</p>
              </Button>

              <Button primary>
                <MdEdit />
                <p>Edit</p>
              </Button>
            </div>
          )}
        </Panel>

        <p>{message}</p>
      </Message>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: white;
  color: black;
  padding: 25px;
  gap: 30px;
`;

const UpVotes = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  border-radius: 5px;
  gap: 10px;
  background-color: hsl(223, 19%, 93%);

  max-height: 130px;

  svg {
    font-size: 24px;
    /* opacity: 60%; */
    color: hsl(239, 57%, 85%);
    cursor: pointer;
  }
`;

const Message = styled.div`
  width: 100%;
  p {
    color: hsl(211, 10%, 45%);
    font-weight: 500;
  }
`;

const Panel = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;

  .comment_edit {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    margin-left: auto;
    justify-content: flex-end;
    gap: 15px;

    p {
      text-align: center;
    }
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  float: left;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
    object-fit: cover;
  }

  p {
    font-weight: 500;
    font-size: 18px;
    margin-right: 25px;
    color: hsl(212, 24%, 26%);
  }

  span {
    font-weight: 500;
    /* opacity: 60%; */
    font-size: 14px;
    color: hsl(211, 10%, 45%);
  }
`;

const Button = styled.div<{ primary?: boolean }>`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 6px;
  cursor: pointer;

  p,
  svg {
    color: ${(props) =>
      props.primary ? 'hsl(238, 40%, 52%)' : 'hsl(358, 79%, 66%)'};
    /* color: hsl(238, 40%, 52%); */
  }

  :hover {
    font-size: 18px;
    transition: ease-in all 100ms;

    svg {
      /* color: ${(props) =>
        props.primary ? 'hsl(211, 10%, 45%)' : 'hsl(357, 100%, 86%)'}; */
    }
  }

  transition: ease-out all 150ms;
`;
