import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface HomeProps {}

const StyledHome = styled.div`
  color: pink;
`;

export function Home(props: HomeProps) {
  return (
    <StyledHome>
      <h1>Welcome to Home!</h1>
    </StyledHome>
  );
}

export default Home;
