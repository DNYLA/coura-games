import { MatchPreview, PublicUser } from '@couragames/shared-types';
import styled from '@emotion/styled';
import React from 'react';
import moment from 'moment';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Result } from '@prisma/client';
export interface MatchHistoryProps {
  matches: MatchPreview[];
  member: PublicUser;
}

interface DisplayMemberProps {
  username: string;
  avatarUrl: string;
}

function DisplayMember({ username, avatarUrl }: DisplayMemberProps) {
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/member/${username}`);
  };

  return (
    <MemberContainer onClick={handleNavigate}>
      <img
        src={avatarUrl}
        onError={(e) => {
          e.stopPropagation();
          e.currentTarget.src =
            'https://www.pngitem.com/pimgs/m/421-4212341_default-avatar-svg-hd-png-download.png';
        }}
        alt="commenter avatar"
      ></img>
      <p>{username}</p>
      {/* <span>{now}</span> */}
    </MemberContainer>
  );
}

export function MatchHistory({ matches, member }: MatchHistoryProps) {
  console.log(matches);

  const getTextColour = (result: Result) => {
    if (result === Result.Win) return 'green';
    else if (result === Result.Loss) return 'red';
    else return 'gray';
  };

  return (
    <Container>
      Match History
      <TableContainer width={'90%'}>
        <Table>
          <Thead>
            <Tr>
              <Th>Player</Th>
              <Th>Result</Th>
              <Th>Opponent</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {matches.map((match) => (
              <Tr>
                <Td>
                  <DisplayMember
                    username={member.username}
                    avatarUrl={member.avatarUrl}
                  />
                </Td>
                <Td>
                  <Text color={getTextColour(match.result)}>
                    {match.result}
                  </Text>
                </Td>
                <Td>
                  <DisplayMember
                    username={match.opponent.username}
                    avatarUrl={
                      match.opponent.avatarUrl ??
                      'https://www.pngitem.com/pimgs/m/421-4212341_default-avatar-svg-hd-png-download.png'
                    }
                  />
                </Td>
                <Td>
                  <span>{moment(match.timestamp).fromNow()}</span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  font-family: 'Rubik', sans-serif;
  /* background-color: hsl(226, 43%, 10%); */
  background-color: white;
  color: black;
  margin-top: 30px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  align-content: center;
  /* padding-top: 0px; */
`;

const MatchBox = styled.div`
  display: flex;
  gap: 15px;
`;

const MemberContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-bottom: 15px;
  float: left;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 5px;
    object-fit: cover;
  }

  p {
    font-weight: 500;
    font-size: 15px;
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
