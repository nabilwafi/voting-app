import React from 'react'
import CountdownItem, { COUNTDOWNITEMLABEL } from './CountdownItem'

interface CountdownRendererProps {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountdownRenderer = (props: CountdownRendererProps) => {
  return (
    <div className="mx-auto flex flex-row justify-center">
      {props.days && (
        <CountdownItem label={COUNTDOWNITEMLABEL.DAYS} value={props.days} />
      )}
      {props.hours && (
        <CountdownItem label={COUNTDOWNITEMLABEL.HOURS} value={props.hours} />
      )}
      {props.minutes && (
        <CountdownItem
          label={COUNTDOWNITEMLABEL.MINUTES}
          value={props.minutes}
        />
      )}
      {props.seconds && (
        <CountdownItem
          label={COUNTDOWNITEMLABEL.SECONDS}
          value={props.seconds}
        />
      )}
    </div>
  )
}

export default CountdownRenderer
