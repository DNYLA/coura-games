import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { UserContext } from '@couragames/ui';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import {
  Comments as CommentsSection,
  fetchComments,
  fetchUserProfile,
  ProfileHeader,
  Sidebar,
  UserStats,
} from '@couragames/ui';
import { Comments, Comment, PublicUser } from '@couragames/shared-types';
export default function MemberProfile() {
  const router = useRouter();
  const { username } = router.query;
  const { user } = useContext(UserContext);
  const [member, setMember] = useState<PublicUser>(null);
  const [comments, setComments] = useState<Comments>({
    comments: [],
    users: [],
  });

  const [commentsLoading, setCommentsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(username) || !user) return;
    if (!username || !user.username) return;

    fetchUserProfile(username ?? user.username)
      .then(({ data }) => {
        setMember(data);
      })
      .finally(() => setProfileLoading(false));

    fetchComments(username ?? user.username)
      .then(({ data }) => {
        setComments(data);
      })
      .finally(() => setCommentsLoading(false));
  }, [username, user]);

  if (commentsLoading || profileLoading) {
    return <div>Loading...</div>;
  }

  const handleNewComment = (comment: Comment) => {
    const curComments = [...comments.comments];
    curComments.unshift(comment);
    setComments({ ...comments, comments: curComments });
  };

  const handleDelete = (id: number) => {
    const curComments = [...comments.comments];
    const index = curComments.findIndex((c) => c.id === id);
    if (index === -1) return; //Unfindable || Already Deleted
    curComments.splice(index, 1);
    setComments({ ...comments, comments: curComments });
  };

  if (Array.isArray(username)) return <div>Why</div>;

  return (
    <Profile>
      <Container>
        <Main>
          <ProfileHeader member={member} selfName={user.username} />
          <UserStats />
          <CommentsSection
            username={username}
            user={user}
            comments={comments}
            addComment={handleNewComment}
            deleteComment={handleDelete}
          />
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
  justify-content: center;
  align-items: center;
  justify-items: center;
  width: 100vw;
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
