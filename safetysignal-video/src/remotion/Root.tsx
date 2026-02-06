import { Composition } from 'remotion';
import { Main } from './MyComp/Main';
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from '../../types/constants';
import { NextLogo } from './MyComp/NextLogo';
import { SafetySignalShort } from './SafetySignalShort/SafetySignalShort';
import { defaultSafetySignalProps } from './SafetySignalShort/defaults';
import { SafetySignalPropsSchema } from './SafetySignalShort/types';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Original template */}
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />

      <Composition
        id="SafetySignalShort"
        component={SafetySignalShort}
        durationInFrames={30 * 25}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultSafetySignalProps}
        schema={SafetySignalPropsSchema}
      />

      <Composition
        id="NextLogo"
        component={NextLogo}
        durationInFrames={300}
        fps={30}
        width={140}
        height={140}
        defaultProps={{
          outProgress: 0,
        }}
      />
    </>
  );
};
