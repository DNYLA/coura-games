import { Box, Skeleton, Table, Td, Th, Tr } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';

export function SkeletonTable() {
  const SkeletonRow = ({ width }: { width: string }) => (
    <Box as="tr">
      <Td>
        <Skeleton height="10px" w={width} my={4} />
      </Td>
      <Td>
        <Skeleton height="10px" w={width} my={4} />
      </Td>
      <Td>
        <Skeleton height="10px" w={width} my={4} />
      </Td>
      <Td>
        <Skeleton height="10px" w={width} my={4} />
      </Td>
    </Box>
  );

  return (
    <Container>
      <Table>
        <thead>
          <Tr>
            <Th>Player</Th>
            <Th>Result</Th>
            <Th>Opponent</Th>
            <Th>Date</Th>
          </Tr>
        </thead>
        <tbody>
          <SkeletonRow width="75px" />
          <SkeletonRow width="125px" />
          <SkeletonRow width="50px" />
          <SkeletonRow width="100px" />
          <SkeletonRow width="75px" />
        </tbody>
      </Table>
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
