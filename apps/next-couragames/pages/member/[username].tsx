import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import UserContext from 'apps/next-couragames/context/auth';
import SelfProfile from 'apps/next-couragames/pages/member/SelfProfile';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { FaEnvelope, FaMapPin, FaSuitcase } from 'react-icons/fa';

export default function MemberProfile() {
  const router = useRouter();
  const { username } = router.query;
  const { user } = useContext(UserContext);

  if (
    user &&
    typeof username === 'string' &&
    user.username.toLowerCase() === username.toLowerCase()
  )
    return <SelfProfile />;

  return <div>Not Done</div>;
}

const Container = styled.div`
  /* padding: 0px 150px; */
  /* display: flex; */
`;

const BaseLayout = styled.div`
  max-width: 960px;
  margin: 100px auto;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* grid-template-columns: repeat(3, 1fr); */
  gap: 10px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }

  /* grid-template-rows: repeat(3, 1fr); */
  /* grid-auto-rows: minmax(100px, auto); */
  /* grid-template-columns: 1fr 1.5fr 1fr; */
  /* grid-template-columns: repeat(3, 1fr); */
  /* grid-gap: 1em; */
  /* grid-auto-rows: 100px; */
  /* grid-auto-rows: minmax(100px, auto); */
`;

const Item = styled.div`
  color: #fff;
  background-color: steelblue;
  font-size: 20px;
  padding: 20px;
  border: skyblue 1px solid;

  /* :nth-of-type(1) {
    color: #000;
    grid-column: 1/3;
  }

  :nth-of-type(3) {
    background: #333;
    grid-row: 2/4;
  }

  :nth-of-type(4) {
    background: #333;
    /* grid-column: 1/3; */
  /* grid-row: 2/4; */
  /* } */
`;
