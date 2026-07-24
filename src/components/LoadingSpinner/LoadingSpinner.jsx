import './LoadingSpinner.css';

function LoadingSpinner({ size = 40 }) {
  return (
    <div
      className="ls-spinner"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}

export default LoadingSpinner;