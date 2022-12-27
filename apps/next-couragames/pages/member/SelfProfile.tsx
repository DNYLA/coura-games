import styled from '@emotion/styled';
import React from 'react';

export default function SelfProfile() {
  return (
    <Profile>
      <Container>
        <Main>
          <ProfHeader />
        </Main>
        <Sidebar>Sidebar</Sidebar>
      </Container>
    </Profile>
  );
}

function ProfHeader() {
  return (
    <ProfileHeader>
      <Avatar>
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
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
