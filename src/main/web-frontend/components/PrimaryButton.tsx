import * as React from "react";
import {createUseStyles} from "react-jss";

type Props = {
  text: string,
  onClick: () => void,
  enabled: boolean
}

const useStyles = createUseStyles({
  button: {
    cursor: 'pointer'
  }
})

export default function PrimaryButton(props: Props) {
  const styles = useStyles();
  return (
    <button className={styles.button} onClick={() => props.onClick()}>
      {props.text}
    </button>
  )
}