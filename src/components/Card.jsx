/* eslint-disable react/prop-types */
function Card({title, image, author, date, label, onClick, onRead}) {
  return (
    <>
      <div>
        <div  className='text-center w-80 h-96 bg-white rounded-md shadow-md grid grid-cols-1'>
            <img src={image} alt="image" className='w-2/3 rounded-md h-32 mx-auto' />
            <h2 className='font-semibold flex overflow:hidden'>{title}</h2>
            <p className='font-semibold'>{author}</p>
            <p className='font-semibold'>{date}</p>
        </div>
        <div className="flex">
          <div className='w-40 mx-auto mt-3 mb-5'>
            <button 
            onClick={onClick}
            className="hover:bg-blue-600 focus:outline-none border-none w-full h-12 bg-blue-500 rounded-md text-white font-semibold flex justify-center items-center"
            >{label}</button>
          </div>
          <div className="h-10 w-20 mx-auto mt-3 mb-5">
            <button
              onClick={onRead}
              className="hover:bg-green-600 focus:outline-none border-none w-full h-12 bg-green-500 rounded-md text-white font-semibold flex justify-center items-center"
            >Add List</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card