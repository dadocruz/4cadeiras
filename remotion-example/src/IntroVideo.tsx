import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Series,
} from 'remotion';

const BRAND_COLOR = '#e63946';
const BG_COLOR = '#0d0d0d';
const WHITE = '#ffffff';
const GRAY = '#aaaaaa';

const Title: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const scale = spring({fps, frame, config: {damping: 120, stiffness: 200}});
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        fontSize: 100,
        fontWeight: 900,
        color: WHITE,
        transform: `scale(${scale})`,
        opacity,
        textAlign: 'center',
        letterSpacing: -2,
        textTransform: 'uppercase',
      }}
    >
      {text}
    </div>
  );
};

const Subtitle: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(frame, [0, 20], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontFamily: 'sans-serif',
        fontSize: 36,
        color: GRAY,
        opacity,
        transform: `translateY(${translateY}px)`,
        marginTop: 24,
        letterSpacing: 6,
        textTransform: 'uppercase',
      }}
    >
      {text}
    </div>
  );
};

const AccentLine: React.FC = () => {
  const frame = useCurrentFrame();

  const width = interpolate(frame, [0, 30], [0, 240], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        height: 4,
        width,
        background: BRAND_COLOR,
        borderRadius: 2,
        marginTop: 32,
      }}
    />
  );
};

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const progress = frame / durationInFrames;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 6,
        background: '#222',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress * 100}%`,
          background: BRAND_COLOR,
          transition: 'none',
        }}
      />
    </div>
  );
};

const CounterScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const count = Math.floor(
    interpolate(frame, [0, fps * 2], [0, 100], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const opacity = interpolate(frame, [fps * 2, fps * 2 + 15], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: BG_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: 'sans-serif',
          fontSize: 180,
          fontWeight: 900,
          color: BRAND_COLOR,
          lineHeight: 1,
        }}
      >
        {count}
        <span style={{fontSize: 60, color: WHITE}}>%</span>
      </div>
      <div
        style={{
          fontFamily: 'sans-serif',
          fontSize: 28,
          color: GRAY,
          letterSpacing: 8,
          textTransform: 'uppercase',
          marginTop: 16,
        }}
      >
        Carregando
      </div>
    </AbsoluteFill>
  );
};

export const IntroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{background: BG_COLOR}}>
      {/* Scene 1: counter 0→100 (0–75 frames) */}
      <Series>
        <Series.Sequence durationInFrames={75}>
          <CounterScene />
        </Series.Sequence>

        {/* Scene 2: title + subtitle (frames 75–210) */}
        <Series.Sequence durationInFrames={135}>
          <AbsoluteFill
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Sequence from={0} durationInFrames={135}>
              <Title text="Nova Cena" />
            </Sequence>
            <Sequence from={20} durationInFrames={115}>
              <Subtitle text="Estúdio Criativo" />
            </Sequence>
            <Sequence from={35} durationInFrames={100}>
              <AccentLine />
            </Sequence>
          </AbsoluteFill>
        </Series.Sequence>
      </Series>

      {/* Progress bar runs across the whole video */}
      <ProgressBar />
    </AbsoluteFill>
  );
};
