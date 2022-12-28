import styled from '@emotion/styled';
import React, { useContext } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { BiMinus } from 'react-icons/bi';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { FiEdit, FiMinus, FiPlus } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import UserContext from 'apps/next-couragames/context/auth';

export default function SelfProfile() {
  return (
    <Profile>
      <Container>
        <Main>
          <ProfHeader />
          <div>Time Stat Info Here</div>
          <Comments />
        </Main>
        <Sidebar>Sidebar</Sidebar>
      </Container>
    </Profile>
  );
}

function ProfHeader() {
  const url =
    'https://images.complex.com/complex/images/c_fill,dpr_2.0,f_auto,q_auto,w_1400/fl_lossy,pg_1/ved7hojt36yiabmf7bwc/roddy-dec-14?fimg-ssr';

  return (
    <ProfileHeader>
      <Avatar>
        <img src={url} />
      </Avatar>
      <ProfileContent>
        <h2>Darnius_Latwon</h2>
        <p>Winning games in my sleep zzz....</p>
      </ProfileContent>
      <MemberStats>
        <StatItem>
          <h3>Points</h3>
          <p>255</p>
        </StatItem>{' '}
        {/* <StatItem>
          <h3>Leagues</h3>
          <p>25</p>
        </StatItem>{' '} */}
        <StatItem>
          <h3>Followers</h3>
          <p>33</p>
        </StatItem>
        <StatItem>
          <h3>Joined</h3>
          <p>23 Dec, 2022</p>
        </StatItem>{' '}
      </MemberStats>
    </ProfileHeader>
  );
}

interface CommentProps {
  message: string;
  likes: number;
  dislikes: number;
  date: Date;
  author: string;
  author_avatar: string;
}

function Comment({
  message,
  likes,
  dislikes,
  date,
  author,
  author_avatar,
}: CommentProps) {
  const img_ur =
    'https://images.complex.com/complex/images/c_fill,dpr_2.0,f_auto,q_auto,w_1400/fl_lossy,pg_1/ved7hojt36yiabmf7bwc/roddy-dec-14?fimg-ssr';
  const { user } = useContext(UserContext);

  const isOwner = author.toLowerCase() === user.username.toLowerCase();

  return (
    <CommentContainer>
      <CommentUpvotes>
        <FiPlus />
        <p>{likes - dislikes}</p>
        <FiMinus />
      </CommentUpvotes>
      <Message>
        <CommentPanel>
          <CommentAuthor>
            <img src={img_ur}></img>
            <p>{author}</p>
            <span>Three Weeks Ago</span>
          </CommentAuthor>
          {isOwner && (
            <div className="comment_edit">
              <CommentButton>
                <MdEdit />
                <p>Delete</p>
              </CommentButton>

              <CommentButton primary>
                <MdEdit />
                <p>Edit</p>
              </CommentButton>
            </div>
          )}
        </CommentPanel>

        <p>{message}</p>
      </Message>
    </CommentContainer>
  );
}

const CommentButton = styled.div<{ primary?: boolean }>`
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

const CommentPanel = styled.div`
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

const CommentUpvotes = styled.div`
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

const CommentContainer = styled.div`
  display: flex;
  border-radius: 5px;
  background-color: white;
  color: black;
  padding: 25px;
  gap: 30px;
`;

const Message = styled.div`
  width: 100%;
  p {
    color: hsl(211, 10%, 45%);
    font-weight: 500;
  }
`;

const CommentAuthor = styled.div`
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

function Comments() {
  const message =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat magnam vitae itaque quae porro voluptatibus minus hic! Soluta suscipit laudantium fugiat vero tempora, ipsum accusantium illum ea vel quod molestias ut repellat, natus ducimus eaque obcaecati consequuntur libero doloremque cupiditate est dicta nam? Dicta animi libero amet officia totam quisquam!';
  return (
    <CommentBox>
      {/* Comments */}
      <Comment
        message={'Welcome to this community!'}
        likes={35}
        dislikes={2}
        date={new Date()}
        author={'Dan'}
        author_avatar={'damze'}
      />

      <Comment
        message={message}
        likes={2}
        dislikes={3}
        date={new Date()}
        author={'John2'}
        author_avatar={'damze'}
      />
    </CommentBox>
  );
}

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Rubik', sans-serif;
  margin-top: 50px;
  /* background-color: red; */
  /* border-radius: inherit; */
  border-radius: 5px;
  gap: 10px;
`;

const Main = styled.div`
  /* padding: 1rem; */
`;
const Sidebar = styled.div`
  background: #55a343;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  background-color: white;
  color: black;
  padding-bottom: 15px;
  border-radius: 8px;
`;

const MemberStats = styled.div`
  display: flex;
  justify-content: center;
`;

const StatItem = styled.div`
  min-width: 100px;
  margin: 0px 30px;
  text-align: center;

  h3 {
    font-weight: 500;
  }
`;

const ProfileContent = styled.div`
  padding: 32px;
  text-align: center;

  h2 {
    margin-top: 8px;
    font-size: 20px;
    font-weight: 500;
    color: hsl(229, 23%, 23%);
  }

  p {
    font-size: 15px;
    opacity: 60%;
  }
`;

const Avatar = styled.div`
  /* width: 500px; */
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1666795599746-0f62dfa29a07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 5px solid white;
    object-fit: cover;
    margin-bottom: -70px;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  margin: 20px 50px;
`;

const Container = styled.div`
  display: grid;
  /* grid-template-columns: minmax(0, 1fr) 30rem; */
  grid-template-columns: 2.5fr 1fr;
  gap: 2.4em;
  margin: 0 auto;
  max-width: 105rem;
  width: 100%;
`;

const Item = styled.div`
  background: #a34343;

  :nth-child(odd) {
    background: #55a343;
  }
`;
