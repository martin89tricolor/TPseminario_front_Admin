import { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import {
  Badge
} from '@material-ui/core';

const DEFAULT_COLOR = '#FFC700';

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const generateSparkle = (color, text) => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: 10,
    text: text,
    style: {
      top: '0%',
      left: '50%',
      zIndex: 2,
      pointerEvents: 'none',
    },
  };
  return sparkle;
};
const ClickSparkles = ({ color = DEFAULT_COLOR, children, text, ...delegated }) => {

  const [sparkles, setSparkles] = useState([]);

  function handleClick() {
    const newSparkle = generateSparkle(color, text);
    const now = Date.now();
    let nextSparkles = sparkles.filter(sp => {
      const delta = now - sp.createdAt;
      return delta < 1000;
    });
    nextSparkles.push(newSparkle);
    setSparkles(nextSparkles);
  }

  return (
    <Wrapper onClick={handleClick} {...delegated}>
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
          text={sparkle.text}
        />
      ))}
      <ChildWrapper>{children}</ChildWrapper>
    </Wrapper>
  );
};
const Sparkle = ({ size, color, style, text }) => {
  return (
    <SparkleWrapper style={style}>
      <SparkleSpan width={size} height={size} fill="none">
        <Badge color="secondary" badgeContent={text} />
      </SparkleSpan>
    </SparkleWrapper>
  );
};

const comeInOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
const move = keyframes`
  0% {
    transform: translate(0px, 0px);
  }
  100% {
    transform: translate(0px, -300%);
  }
`;
const Wrapper = styled.span`
  display: inline-block;
  position: relative;
`;
const SparkleWrapper = styled.span`
  position: absolute;
  display: block;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${comeInOut} 2000ms forwards;
  }
`;
const SparkleSpan = styled.span`
  display: block;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${move} 2000ms linear;
  }
`;
const ChildWrapper = styled.strong`
  position: relative;
  z-index: 1;
  font-weight: bold;
`;
export default ClickSparkles;
