import React from 'react';
import {Composition} from 'remotion';
import {IntroVideo} from './IntroVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={IntroVideo}
        durationInFrames={210}
        width={1920}
        height={1080}
        fps={30}
        defaultProps={{}}
      />
    </>
  );
};
