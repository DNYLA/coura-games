import styled from '@emotion/styled';
import React from 'react';

export default function TestFunction() {
  const image_daniel =
    'https://raw.githubusercontent.com/bradtraversy/grid-crash/main/project/images/image-daniel.jpg';
  const image_jnette =
    'https://raw.githubusercontent.com/bradtraversy/grid-crash/main/project/images/image-jeanette.jpg';
  const image_johnathan =
    'https://raw.githubusercontent.com/bradtraversy/grid-crash/main/project/images/image-jonathan.jpg';
  const image_kira =
    'https://raw.githubusercontent.com/bradtraversy/grid-crash/main/project/images/image-kira.jpg';
  const image_patrick =
    'https://raw.githubusercontent.com/bradtraversy/grid-crash/main/project/images/image-patrick.jpg';
  const quotes =
    'https://raw.githubusercontent.com/bradtraversy/grid-crash/1221df8c8a75ed77e8cd8939cba3f8083f09c088/project/images/bg-pattern-quotation.svg';

  return (
    <Container>
      <Testimonials>
        <Card className="card_image" color="hsl(263, 55%, 52%)">
          <CardHeader>
            <img src={image_daniel} className="card__img" />
            <div>
              <h3>Daniel Cliffard</h3>
              <p>Verified Graduate</p>
            </div>
          </CardHeader>
          <p className="card_lead">
            I received a job offer mid-course, and the subjects I learned were
            current, if not more so, in the company I joined. I honestly feel I
            got every penny's worth.
          </p>
          <p className="card_quote">
            "I was an EMT for many years before I joined the bootcamp. I've been
            looking to make a transition and have heard some people who had an
            amazing experience here. I signed up for the free intro course and
            found it incredibly fun! I enrolled shortly thereafter. The next 12
            weeks was the best - and most grueling - time of my life. Since
            completing the course, I've successfully switched careers, working
            as a Software Engineer at a VR startup."
          </p>
        </Card>

        <Card color="hsl(217, 19%, 35%)">
          <CardHeader>
            <img src={image_johnathan} className="card__img" />
            <div>
              <h3>Jonathan Walters</h3>
              <p>Verified Graduate</p>
            </div>
          </CardHeader>
          <p className="card_lead">
            The team was very supportive and kept me motivated
          </p>
          <p className="card_quote">
            "I started as a total newbie with virtually no coding skills. I now
            work as a mobile engineer for a big company. This was one of the
            best investments I've made in myself."
          </p>
        </Card>

        <Card color="#fff" dark={true}>
          <CardHeader>
            <img src={image_jnette} className="card__img" />

            <div>
              <h3>Jeanette Harmon</h3>
              <p>Verified Graduate</p>
            </div>
          </CardHeader>
          <p className="card_lead">
            An overall wonderful and rewarding experience
          </p>
          <p className="card_quote">
            "Thank you for the wonderful experience! I now have a job I really
            enjoy, and make a good living while doing something I love."
          </p>
        </Card>

        <Card color="hsl(219, 29%, 14%)">
          <CardHeader>
            <img src={image_patrick} className="card__img" />
            <div>
              <h3>Patrick Abrahms</h3>
              <p>Verified Graduate</p>
            </div>
          </CardHeader>
          <p className="card_lead">
            Awesome teaching support from TAs who did the bootcamp themselves.
            Getting guidance from them and learning from their experiences was
            easy.
          </p>
          <p className="card_quote">
            "The staff seem genuinely concerned about my progress which I find
            really refreshing. The program gave me the confidence necessary to
            be able to go out in the world and present myself as a capable
            junior developer. The standard is above the rest. You will get the
            personal attention you need from an incredible community of smart
            and amazing people."
          </p>
        </Card>

        <Card color="#fff" dark={true}>
          <CardHeader>
            <img src={image_kira} className="card__img" />
            <div>
              <h3>Kira Whittle</h3>
              <p>Verified Graduate</p>
            </div>
          </CardHeader>
          <p className="card_lead">
            Such a life-changing experience. Highly recommended!
          </p>
          <p className="card_quote">
            "Before joining the bootcamp, I've never written a line of code. I
            needed some structure from professionals who can help me learn
            programming step by step. I was encouraged to enroll by a former
            student of theirs who can only say wonderful things about the
            program. The entire curriculum and staff did not disappoint. They
            were very hands-on and I never had to wait long for assistance. The
            agile team project, in particular, was outstanding. It took my
            learning to the next level in a way that no tutorial could ever
            have. In fact, I've often referred to it during interviews as an
            example of my developent experience. It certainly helped me land a
            job as a full-stack developer after receiving multiple offers. 100%
            recommend!"
          </p>
        </Card>
      </Testimonials>
    </Container>
  );
}

const Container = styled.h3`
  box-sizing: border-box;
  margin: 0;
  padding: 0;

  background: #edf2f8;
  color: black;
  font-family: 'Barlow Semi Condensed', sans-serif;
  line-height: 1.7;
  font-size: 13px;

  @import url('https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@200;300;400;700&display=swap');
`;

const Card = styled.h3<{ color: string; dark?: boolean }>`
  background-color: ${(props) => props.color};
  color: ${(props) => (props.dark ? '#000' : '#fff')};
  border-radius: 10px;
  padding: 30px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  margin-bottom: 10px;

  .card_lead {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.3;
    margin-bottom: 20px;
  }

  .card_quote {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.4;
    opacity: 70%;
  }

  &.card_image {
    background-repeat: no-repeat;
    background-position: top 10px right;
    background-image: url('https://raw.githubusercontent.com/bradtraversy/grid-crash/1221df8c8a75ed77e8cd8939cba3f8083f09c088/project/images/bg-pattern-quotation.svg');
  }

  :nth-of-type(1) {
    grid-column: 1/3;
  }

  :nth-of-type(4) {
    grid-column: 2/4;
    grid-row: 2;
  }

  :nth-of-type(5) {
    grid-row: 1/3;
    grid-column: 4;
  }
`;

const CardHeader = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  h3 {
    font-size: 15px;
  }

  p {
    opacity: 50%;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #996ed9;
    margin-right: 10px;
  }
`;

const Testimonials = styled.h3`
  max-width: 1440px;
  margin: 100px auto;
  padding: 20px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-rows: repeat(2, minmax(auto-fill, 200px)); */

  gap: 1.5em;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;

    ${Card}:nth-of-type(1) {
      grid-column: auto;
      grid-row: auto;
    }

    ${Card}:nth-of-type(4) {
      grid-column: auto;
      grid-row: auto;
    }

    ${Card}:nth-of-type(5) {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;
