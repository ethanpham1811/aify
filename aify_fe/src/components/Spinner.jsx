import {LineWave} from 'react-loader-spinner'

function Spinner({message}) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <LineWave
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        firstLineColor=""
        middleLineColor=""
        lastLineColor=""
        className="m-5"
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  )
}

export default Spinner
