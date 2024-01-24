import React from 'react'
import { zeroPad } from 'react-countdown'

export enum COUNTDOWNITEMLABEL {
  DAYS = 'days',
  HOURS = 'hours',
  MINUTES = 'minutes',
  SECONDS = 'seconds',
}

interface CountdownItemProps {
  value: number
  label: COUNTDOWNITEMLABEL
}

const CountdownItem = (props: CountdownItemProps) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col text-center">
        <span className="text-5xl font-bold">{zeroPad(props.value, 2)}</span>
        <span className="text-xl font-light">{props.label}</span>
      </div>
      {props.label !== COUNTDOWNITEMLABEL.SECONDS && (
        <span className="mx-5 text-4xl">:</span>
      )}
    </div>
  )
}

export default CountdownItem
