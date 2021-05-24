import Loader from 'react-loader-spinner'
const LoadingSpinner = () => {
  return (
    <Loader
      type='Circles'
      color='#B33771'
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  )
}

export default LoadingSpinner
