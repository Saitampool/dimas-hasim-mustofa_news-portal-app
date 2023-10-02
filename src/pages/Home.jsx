import {useState, useEffect, useRef} from "react";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2"
import axios from "axios";

import Card from "../components/Card"

function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState();

    const getNews = (category) => {
        axios.get(
            `https://newsapi.org/v2/top-headlines?country=us&category=${
                !category ? "business" : category
              }&apiKey=3ffd0b20e0e746eabb76ff5f7461f225`
        )
        .then((response) => {
            setData(response?.data.articles)
        })
        .catch((error) => {
            Swal.fire({
                icon:'error',
                title: 'Gagal mengambil data',
                text: `Pesan kesalahan : ${error}`,
                confirmButtonText: "OK"
            })
        })
    }

    useEffect(() => {
        getNews()
    }, [])
    console.log(data)

    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const closeDropdownOnOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setShowDropdown(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener("mousedown", closeDropdownOnOutsideClick);
    
        return () => {
          document.removeEventListener("mousedown", closeDropdownOnOutsideClick);
        };
      }, []);
    
  return (
    <section className="w-screen h-screen">
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <a href="#" className="text-white text-2xl font-bold">Logo</a>
                    <div className="space-x-8">
                        <a href="#" className="text-white">Beranda</a>
                        <div className="relative inline-block" ref={dropdownRef}>
                            <button href="#" onClick={toggleDropdown} className="text-white bg-blue-500 hover:outline-none focus:outline-none">Kategori</button>
                            {showDropdown && (
                                <ul className="absolute mt-2 rounded-md bg-white text-gray-800 hover:outline-none">
                                    <li><a onClick={() => getNews("politics")} href="#" className="block px-4 py-2 hover:bg-blue-500 hover:outline-none hover:text-white">Politics</a></li>
                                    <li><a onClick={() => getNews("business")} href="#" className="block px-4 py-2 hover:bg-blue-500 hover:outline-none hover:text-white">Business</a></li>
                                    <li><a onClick={() => getNews("health")} href="#" className="block px-4 py-2 hover:bg-blue-500 hover:outline-none hover:text-white">Health</a></li>
                                    <li><a onClick={() => getNews("sport")} href="#" className="block px-4 py-2 hover:bg-blue-500 hover:outline-none hover:text-white">Sport</a></li>
                                </ul>
                            )}
                        </div>
                        <a href="#" className="text-white">Tentang</a>
                        <a href="#" className="text-white">Layanan</a>
                        <a href="#" className="text-white">Kontak</a>
                    </div>
                </div>
            </div>
        </nav>
     <div className="w-full h-20 flex items-center">
     </div>
     <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-15">
      {
        data &&
        data.map((item, index) => {
          return(
            <Card
            key={index}
            title={item?.title}
            image={item?.urlToImage ? item?.urlToImage : "https://placehold.co/600x400/EEE/31343C"}
            author={item?.author}
            date={item?.publishedAt}
            label="detail"
            onClick={() => navigate(`/detail/${item?.id}`, {
              state: {
                itemId: item?.index
              }
            })}
            />
          )
        })
      }
     </div>
    </section>
  )
}

export default Home