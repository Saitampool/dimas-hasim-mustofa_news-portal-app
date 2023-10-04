import {useState, useEffect, useRef} from "react";
import {  useNavigate } from "react-router-dom";
import { UserCircleIcon, BookmarkIcon} from "@heroicons/react/24/outline"
import Swal from "sweetalert2"
import axios from "axios";
import Cookies from "js-cookie";

import Card from "../components/Card"

function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState();
    const [list, setList] = useState([]);
    const username = Cookies.get("email");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

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

    const handleBookmark = (item) => {
      const token = Cookies.get("token");
      if (!token) {
        Swal.fire({
          title: "Please login before add to bookmark",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/auth/login");
          }
        });
      } else {
        let updatedList = [...list, item];
        setList(updatedList);
        Swal.fire({
          icon: "success",
          text: "Success Add Bookmark",
          confirmButtonText: "OK",
        }).then((res) => {
          if (res.isConfirmed) {
            localStorage.setItem("list", JSON.stringify(updatedList));
          }
        });
      }
    };

    

    const navigateBookmark = () => {
      navigate("/bookmark");
    };
  
    const handleLogout = () => {
      Swal.fire({
        text: "Are you sure want to log out?",
        title: "Logout",
        confirmButtonText: "OK",
      }).then((res) => {
        if (res.isConfirmed) {
          Cookies.remove("email");
          Cookies.remove("token");
          navigate("/auth/login");
        }
      });
    };

    useEffect(() => {
        getNews()
    }, [])
    console.log(data)

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
      
      console.log(list);

  return (
    <section className="w-screen h-screen">
        <nav className="bg-blue-500 sticky top-0 p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <a className="cursor-pointer text-white text-2xl font-bold">Logo</a>
                    <div className="space-x-5">
                        <a className="cursor-pointer text-white hover:text-blue-500 hover:bg-white p-1 rounded-lg">Beranda</a>
                        <div className="relative inline-block" ref={dropdownRef}>
                            <button onClick={toggleDropdown} className="cursor-pointer text-white bg-blue-500 hover:outline-none focus:outline-none hover:text-blue-500 hover:bg-white p-1 rounded-lg">Kategori</button>
                            {showDropdown && (
                                <ul className="absolute mt-2 rounded-md bg-white text-gray-800 hover:outline-none">
                                    <li><a onClick={() => getNews("politics")} href="#" className="block px-4 py-2 hover:bg-blue-500 hover:outline-none hover:text-white">Politics</a></li>
                                    <li><a onClick={() => getNews("business")} href="#" className="block px-4 py-2 hover:bg-blue-500 hover:outline-none hover:text-white">Business</a></li>
                                    <li><a onClick={() => getNews("health")} href="#" className="block px-4 py-2 hover:bg-blue-500 hover:outline-none hover:text-white">Health</a></li>
                                    <li><a onClick={() => getNews("sport")} href="#" className="block px-4 py-2 hover:bg-blue-500 hover:outline-none hover:text-white">Sport</a></li>
                                </ul>
                            )}
                        </div>
                        <a className="text-white cursor-pointer hover:text-blue-500 hover:bg-white p-1 rounded-lg">Tentang</a>
                        <a className="text-white cursor-pointer hover:text-blue-500 hover:bg-white p-1 rounded-lg">Kontak</a>
                    </div>
                    <div className="flex right-0 items-center">
                      <a
                        className="cursor-pointer flex text-white mr-4 hover:text-blue-500 hover:bg-white p-1 rounded-lg"
                        onClick={() => navigateBookmark()}
                      >
                        Bookmark
                      </a>
                      <a className="text-white flex items-center mr-4">
                        <BookmarkIcon width={25} height={25} />
                         : {list.length}
                      </a>
                      <a
                        className="text-white flex items-center cursor-pointer hover:text-blue-500 hover:bg-white p-1 rounded-lg"
                        onClick={() => handleLogout()}
                      >
                        <UserCircleIcon width={25} height={25} />
                        {username ? username : "You are not logged in"}
                      </a>
                      
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
            label="Detail"
            onClick={() => navigate(`/detail/${item?.id}`, {
              state: {
                itemId: item?.index
              }
            })}
            onRead={() => handleBookmark(item)}
            />
          )
        })
      }
     </div>
    </section>
  )
}

export default Home