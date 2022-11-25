import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import * as Palette from '../../../assets/colorPalette';
import { GameSliderContainer } from '../styles/gameslider.s';

// const convertTime = (seconds: number) => {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;
//   return `${minutes}:${remainingSeconds}`;
// };
interface propsType {
  indexSlider: (values: number) => void;
  length: number;
}
const GameSlider = (props: propsType) => {
  const [values, setValues] = useState([0]);
  const STEP = 1;
  const MIN = 0;
  const MAX = Math.trunc(props.length);
  return (
    <GameSliderContainer>
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={values => {
          setValues(values);
          console.log(values);
          props.indexSlider(values[0]);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '36px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '4px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values: values,
                  colors: [Palette.GG_RED, Palette.GG_WHITE_100],
                  min: MIN,
                  max: MAX,
                }),
                alignSelf: 'center',
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '18px',
              width: '8px',
              borderRadius: '6px',
              backgroundColor: '#d9d9d9',
              outline: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: isDragged ? '0px 0px 5px #AAA' : 'none',
            }}
          />
        )}
      />
    </GameSliderContainer>
  );
};

export default GameSlider;
