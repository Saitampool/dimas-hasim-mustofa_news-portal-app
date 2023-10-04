import { useNavigate } from "react-router-dom";

const Bookmark = () => {
  const navigate = useNavigate();
  const list = localStorage.getItem("list");
  const listParsed = JSON.parse(list);

  console.log(
    "list : ",
    listParsed.map((item) => item.title)
  );

  return (
    <section className="my-auto">
      <div className="flex justify-center items-center my-5 gap-x-5">
        <button
          onClick={() => navigate(-1)}
          className="bg-white rounded-md p-1 border border-blue-500 text-blue-500 font-bold"
        >
          Back
        </button>
        <h2 className=" text-blue-500 font-bold">BOOKMARK LIST</h2>
      </div>
      <section className="w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col gap-y-10 mt-40">
          {listParsed?.map((item, index) => {
            return (
              <div key={index} className="w-80 h-40 border shadow-md rounded-md">
                <img className="w-full h-20" src={item?.urlToImage} />
                <p>{item?.title}</p>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Bookmark;