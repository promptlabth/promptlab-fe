import styles from './LoadingScreen.module.css'
import Spinner from 'react-bootstrap/Spinner';

export const LoadingScreen = () => {
  return (
    <div className={`${styles.shadow_bg} d-flex align-items-center justify-content-center`}>
      <Spinner animation="border" role="status" className="text-white" style={{ width: "3rem", height: "3rem" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}