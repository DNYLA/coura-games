import styled from '@emotion/styled';
import { fetchMatches, SkeletonTable, UserContext } from '@couragames/ui';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import {
  Comments as CommentsSection,
  fetchComments,
  fetchUserProfile,
  ProfileHeader,
  UserStats,
  MatchHistory,
} from '@couragames/ui';
import {
  Comments,
  Comment,
  PublicUser,
  MatchPreview,
} from '@couragames/shared-types';
import {
  Avatar,
  Box,
  Button,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Table,
  Td,
  Th,
  Tr,
} from '@chakra-ui/react';
import Link from 'next/link';
export default function MemberProfile() {
  const router = useRouter();
  const { username } = router.query;
  const { user } = useContext(UserContext);
  const [member, setMember] = useState<PublicUser>(null);
  const [matches, setMatches] = useState<MatchPreview[]>([]);
  const [comments, setComments] = useState<Comments>({
    comments: [],
    users: [],
  });

  const [commentsLoading, setCommentsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const [matchesLoading, setMatchesLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(username) || !user) return;
    if (!username || !user.username) return;
    console.log('On Profile');
    setMatchesLoading(true);
    setProfileLoading(true);
    setCommentsLoading(true);

    fetchUserProfile(username ?? user.username)
      .then(({ data }) => {
        console.log('On 2');

        if (!data) {
          router.push('/test');
          return;
        }
        setMember(data);
        setTimeout(() => setProfileLoading(false), 1000);
      })
      .catch(() => {
        setTimeout(() => router.push('/'), 1000);
      })
      .finally(() => console.log('Done'));

    fetchComments(username ?? user.username)
      .then(({ data }) => {
        setComments(data);
      })
      .finally(() => setTimeout(() => setCommentsLoading(false), 2500));

    fetchMatches(username ?? user.username)
      .then(({ data }) => {
        setMatches(data);
      })
      .finally(() => setTimeout(() => setMatchesLoading(false), 3000));
  }, [username, user, router]);

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
          <Skeleton isLoaded={!profileLoading}>
            <ProfileHeader member={member} selfName={user.username} />
          </Skeleton>

          <UserStats
            userStats={member?.stats as object}
            rating={member?.points}
            isLoading={profileLoading}
          />
          {matchesLoading && <SkeletonTable />}
          {!matchesLoading && (
            <MatchHistory matches={matches} member={member} />
          )}
          <CommentsSection
            username={username}
            user={user}
            comments={comments}
            addComment={handleNewComment}
            deleteComment={handleDelete}
            isLoading={commentsLoading}
          />
        </Main>

        <Skeleton isLoaded={!profileLoading}>
          <Sidebar>
            <h1>Friends</h1>
            {!profileLoading &&
              member.friends.map((user) => (
                <Link href={`/member/${user.username}`} key={user.username}>
                  <FriendContainer>
                    <Avatar src={user.avatarUrl}></Avatar>
                    <span>{user.username}</span>
                  </FriendContainer>
                </Link>
              ))}
          </Sidebar>
        </Skeleton>
      </Container>
    </Profile>
  );
}

const Sidebar = styled.div`
  background: #282f27c2;

  height: fit-content;
  padding: 5px;

  h1 {
    font-size: 25px;
    text-align: center;
  }
`;

const FriendContainer = styled.div`
  display: flex;
  cursor: pointer;
  /* background-color: red; */
  padding: 5px;
  /* justify-content: center; */
  align-items: center;
  gap: 15px;
  /* border-bottom: 2px solid gray; */
`;

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
