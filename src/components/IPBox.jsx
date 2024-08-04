import Input from "postcss/lib/input";
import React, { useState } from "react";

function IPBox() {
  const [searchedIP, setSearchedIP] = useState("");
  const [ipInfoList, setIpInfoList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    // بررسی اعتبار IP
    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ipRegex.test(searchedIP)) {
      alert("لطفاً یک آدرس IP معتبر وارد کنید.");
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_lFwRPhDgcGtMdUpMdgLhXzy1t1REp&ipAddress=${searchedIP}`
      );
      const data = await response.json();
      console.log(data);

      if (data.error) {
        alert("خطا در دریافت اطلاعات IP");
      } else {
        setIpInfoList((prevIP) => [...prevIP, data]);
        console.log(ipInfoList);
      }
    } catch (error) {
      console.error("خطا در جستجوی IP:", error);
      alert("خطا در جستجوی IP");
    } finally {
      setIsSearching(false);
      setSearchedIP(""); // Clear the input after search
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg w-[906px] text-center mx-auto py-[42px] px-[24px] mt-16">
      <h1 className="text-2xl font-bold  mb-4">
        آی پی مد نظر خود را پیدا کنید
      </h1>
      <p className="text-gray-400 font-semibold">
        اگر بتوانید آدرس IPv4 یا IPv6 یک کاربر اینترنت را بیابید، می‌توانید با
        استفاده از ابزار جستوجوی IP ما ایده‌ای از آن کشور یا جهان پیدا کنید. چه
        باید کرد: آدرس IP مورد نظر خود را در کادر زیر وارد کرده و سپس روی
        "دریافت جزئیات IP" کلیک کنید.
      </p>

      <div className="flex mx-auto w-[500px] border border-gray-300 rounded-lg overflow-hidden mt-10 ">
        <div className="relative flex items-center w-full">
          <img
            src="/leading-icon.svg"
            alt="search-icon"
            className="absolute right-3 w-6 h-6"
          />
          <input
            type="text"
            className="flex-grow pl-12 pr-4 py-4 mr-9 border-0 outline-none"
            value={searchedIP}
            onChange={(e) => setSearchedIP(e.target.value)}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className={`bg-blue-900 text-white py-2 px-6 border-gray-300 ${
            isSearching ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <img src="/search-normal.svg" alt="search" />
        </button>
      </div>

      <div>
        {ipInfoList.map((ip, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg flex mt-5 transform transition-all duration-500 ease-out"
            style={{
              opacity: 1,
              transform: "translateY(0)",
              transition: `opacity 500ms ease-out, transform 500ms ease-out`,
            }}
          >
            <div className="flex-grow">
              <div className="grid grid-cols-2 gap-2">
                <p>
                  <span className="text-gray-400 font-semibold">
                    Ip Address:
                  </span>{" "}
                  {ip.ip}
                </p>
                <p>
                  <span className="text-gray-400 font-semibold">Country:</span>{" "}
                  {ip.location.country}
                </p>
                <p>
                  <span className="text-gray-400 font-semibold">Region:</span>{" "}
                  {ip.location.region}
                </p>
                <p>
                  <span className="text-gray-400 font-semibold">City:</span>{" "}
                  {ip.location.city}
                </p>
                <p>
                  <span className="text-gray-400 font-semibold">Latitude:</span>{" "}
                  {ip.location.lat}
                </p>
                <p>
                  <span className="text-gray-400 font-semibold">
                    Longitude:
                  </span>{" "}
                  {ip.location.lng}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IPBox;
