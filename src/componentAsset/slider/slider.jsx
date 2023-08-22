import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Tooltip,
  } from '@chakra-ui/react'
import { useState,useContext } from "react"
import { context } from '../../pages/discover/discover'
export default function SliderNavigation(){
  const {changeSliderValue,sliderValues} = useContext(context)
  const [showTooltip, setShowTooltip] = useState(false)
  return (
    <Slider
      id='slider'
      size='lg'
      value={sliderValues}
      defaultValue={0}
      min={0}
      max={10}
      colorScheme='telegram'
      onChange={(v) => changeSliderValue(v)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
    <SliderMark value={0.1} mt='3' ml='-2.5' fontSize='sm'>
      0
    </SliderMark>
    <SliderMark value={1.1} mt='3' ml='-2.5' fontSize='sm'>
      1
    </SliderMark>
    <SliderMark value={2.1} mt='3' ml='-2.5' fontSize='sm'>
      2
    </SliderMark>
    <SliderMark value={3.1} mt='3' ml='-2.5' fontSize='sm'>
      3
    </SliderMark>
    <SliderMark value={4.1} mt='3' ml='-2.5' fontSize='sm'>
      4
    </SliderMark>
    <SliderMark value={5.1} mt='3' ml='-2.5' fontSize='sm'>
      5
    </SliderMark>
    <SliderMark value={6.1} mt='3' ml='-2.5' fontSize='sm'>
      6
    </SliderMark>
    <SliderMark value={7.1} mt='3' ml='-2.5' fontSize='sm'>
      7
    </SliderMark>
    <SliderMark value={8.1} mt='3' ml='-2.5' fontSize='sm'>
      8
    </SliderMark>
    <SliderMark value={9.1} mt='3' ml='-2.5' fontSize='sm'>
      9
    </SliderMark>
    <SliderMark value={10} mt='3' ml='-2.5' fontSize='sm'>
      10
    </SliderMark>
    <SliderTrack>
      <SliderFilledTrack />
    </SliderTrack>
        <Tooltip
          hasArrow
          bg='blue.500'
          padding='3'
          color='white'
          placement='top'
          isOpen={showTooltip}
          label={`${sliderValues} - 10`}
          >
    <SliderThumb />
        </Tooltip>
     </Slider>
  )
}