import { PublicUser } from '@couragames/shared-types';
import styled from '@emotion/styled';
import moment from 'moment';
interface HeaderProps {
  member: PublicUser;
}

export function ProfileHeader({ member }: HeaderProps) {
  return (
    <Container>
      <Avatar>
        <img src={member.avatarUrl} alt="Member's Avatar" />
      </Avatar>
      <Content>
        <h2>{member.username}</h2>
        <p>{member.status}</p>
      </Content>

      <Info>
        <Item>
          <h3>Points</h3>
          <p>{member.points}</p>
        </Item>
        {/* <StatItem>
          <h3>Leagues</h3>
          <p>25</p>
        </StatItem>{' '} */}
        <Item>
          <h3>Followers</h3>
          <p>33</p>
        </Item>
        <Item>
          <h3>Joined</h3>
          <p>{moment(member.joined).format('MMM Do, YYYY')}</p>
        </Item>
      </Info>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  background-color: white;
  color: black;
  padding-bottom: 15px;
  border-radius: 8px;
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

const Content = styled.div`
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

const Info = styled.div`
  display: flex;
  justify-content: center;
`;

const Item = styled.div`
  min-width: 100px;
  margin: 0px 30px;
  text-align: center;

  h3 {
    font-weight: 500;
  }
`;
