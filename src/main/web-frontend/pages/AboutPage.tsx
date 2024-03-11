import * as React from "react";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  body: {
    color: 'green'
  }
})
export default function AboutPage() {
  const styles = useStyles();
  return (
    <div className={styles.body}>About</div>
  )
}