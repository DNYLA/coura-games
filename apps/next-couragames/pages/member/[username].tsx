import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import UserContext from '../../context/auth';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Comments, ProfileHeader, Sidebar, UserStats } from '@couragames/ui';
import { PublicUser } from '@couragames/shared-types';
import { fetchUserProfile } from '../../utils/api/axios';
export default function MemberProfile() {
  const router = useRouter();
  const { username } = router.query;
  const { user } = useContext(UserContext);
  const [member, setMember] = useState<PublicUser>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (Array.isArray(username)) return;
    if (!username || !user.username) return;
    fetchUserProfile(username ?? user.username).then(({ data }) => {
      setMember(data);
      setLoading(false);
    });
  }, [username, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Profile>
      <Container>
        <Main>
          <ProfileHeader member={member} />
          <UserStats />
          <Comments user={user} />
        </Main>
        <Sidebar>Sidebar</Sidebar>
      </Container>
    </Profile>
  );
}
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

const Main = styled.div`
  /* padding: 1rem; */
`;
