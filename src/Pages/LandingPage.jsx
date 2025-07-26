import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/navigation";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Google Font
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);
document.body.classList.add("font-poppins");

const participants = [
  { name: "IYANUOLUWA ADETONA", gender: "BOY", zone: "CATHEDRAL ZONE", category: "AGE 10 CATEGORY", image: "https://res.cloudinary.com/dang2kjfr/image/upload/v1753389745/1753389665754_ewfh3h.jpg" },
  { name: "", gender: "GIRL", zone: "CATHEDRAL ZONE", category: "AGE 10 CATEGORY", image: "" },

  { name: "", gender: "BOY", zone: "IKOSI ZONE", category: "AGE 10 CATEGORY", image: "" },
  { name: "IKECHUKWU NMESOMA", gender: "GIRL", zone: "IKOSI ZONE", category: "AGE 10 CATEGORY", image: "https://res.cloudinary.com/dang2kjfr/image/upload/v1753299392/1753299053415_dlghtz.jpg" },
  
  { name: "NWABUEZE ST JOSEPH", gender: "BOY", zone: "FESTAC ZONE", category: "AGE 15 CATEGORY", image: "https://res.cloudinary.com/dang2kjfr/image/upload/v1753471525/1753471436751_cwfgf6.jpg" },
  { name: "NWANFULUME PRECIOUS", gender: "GIRL", zone: "FESTAC ZONE", category: "AGE 15 CATEGORY", image: "https://res.cloudinary.com/dang2kjfr/image/upload/v1753388907/1753299053406_lypjg3.jpg" },
  
  { name: "ADETONA AYODEJI",gender: "BOY", zone: "CATHEDRAL ZONE", category: "AGE 15 CATEGORY", image: "https://res.cloudinary.com/dang2kjfr/image/upload/v1753389744/1753389665688_v4ktuz.jpg" },
  { name: "",gender: "BOY", zone: "CATHEDRAL ZONE", category: "AGE 15 CATEGORY", image: "" },

  { name: "OLUKUNLE ISRAEL", gender: "BOY", zone: "IPAJA ZONE", category: "AGE 20 CATEGORY", image: "https://randomuser.me/api/portraits/women/11.jpg" },
  { name: "ENITILO BLESSING", gender: "GIRL", zone: "IPAJA ZONE", category: "AGE 20 CATEGORY", image: "https://randomuser.me/api/portraits/men/12.jpg" },
  
  { name: "ONUZUIKE CHINEDU", gender: "BOY", zone: "ISOLO ZONE", category: "AGE 20 CATEGORY", image: "https://res.cloudinary.com/dang2kjfr/image/upload/v1753389145/1753299053386_nzurgm.jpg" },
  { name: "ONUORA VICTOR", gender: "BOY", zone: "ISOLO ZONE", category: "AGE 20 CATEGORY", image: "https://res.cloudinary.com/dang2kjfr/image/upload/v1753389381/1753299053397_njxfoc.jpg" },


];

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false,  offset: 120, });
  }, []);

  return (
    <div className="font-sans font-poppins text-blue-900 bg-white">
      
      {/* Header */}
      <header className="bg-blue-900 text-white p-5" data-aos="zoom-in">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center text-center">
          <img src="https://res.cloudinary.com/dang2kjfr/image/upload/v1752011242/Dlw_k4x4zg.jpg" alt="DLW Logo" className="rounded w-[10%]" />
          <h1 className="text-xl font-bold">
            Diocese of Lagos West (Anglican Communion) <br /> Anglican Communion Brigade
          </h1>
          <img src="https://res.cloudinary.com/dang2kjfr/image/upload/v1752010982/ACB_iqt7od.jpg" alt="ACB Logo" className="rounded w-[10%]" />
        </div>
      </header>

      {/* Welcome Hero Section */}
      <section
        className="text-white text-center py-24 px-6 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10, 61, 145, 0.6), rgba(10, 61, 145, 0.6)), url('https://res.cloudinary.com/dang2kjfr/image/upload/v1752272795/FB_IMG_1752271780072_sxqnpa.jpg')",
        }}
        data-aos="zoom-in"
      >
        <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">Welcome to the Quiz Platform</h2>
        <p className="text-lg mb-6" data-aos="fade-up" data-aos-delay="300">
          An exciting way to grow in Scripture, knowledge, and fellowship through friendly competition.
        </p>
        <Link to="/quiz" data-aos="zoom-in-up" data-aos-delay="500">
          <button className="bg-blue-900 text-white px-6 py-2 rounded-full text-base cursor-pointer">
            Get Started
          </button>
        </Link>
      </section>

     {/* Participants Swiper */}
<section className="text-center py-16 px-6" data-aos="fade-up">
  <h3 className="text-2xl font-bold mb-8" data-aos="fade-down">Meet Our Participants</h3>

  <Swiper
    modules={[Navigation]}
    spaceBetween={5}
    slidesPerView={2}
    slidesPerGroup={2} 
    navigation
    breakpoints={{
      640: { slidesPerView: 1, slidesPerGroup: 1 },
      768: { slidesPerView: 2, slidesPerGroup: 2 },
    }}
    className="relative"
  >
    {participants.map((p, index) => (
      <SwiperSlide key={index} className="w-full">
        <div
          className="bg-white p-4 rounded-lg text-center shadow max-w-sm mx-auto"
          data-aos="zoom-in-up"
          data-aos-delay={index * 150}
        >
          <h2 className="text-base font-extrabold mb-6" data-aos="fade-right">
  {p.gender}
</h2>

          <img
            src={p.image}
            alt={p.name}
            className="w-40 h-40 rounded-full object-cover mb-3 mx-auto"
            data-aos="flip-left"
            data-aos-delay={index * 100}
          />
          <h2 className="text-base font-semibold" data-aos="fade-right">{p.name}</h2>
          <p className="text-sm" data-aos="fade-left">{p.zone}</p>
          <p className="text-sm" data-aos="fade-left" data-aos-delay="300">{p.category}</p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Swiper navigation styling */}
  <style>{`
    .swiper-button-prev, .swiper-button-next {
      color: #3B82F6;
      top: 40%;
      width: 35px;
      height: 35px;
    }
    .swiper-pagination {
      display: none;
    }
  `}</style>
</section>

      {/* Highlights Section */}
      <section className="bg-blue-50 text-center py-16 px-6" data-aos="fade-up">
        <h3 className="text-2xl font-bold mb-8" data-aos="fade-down">Platform Highlights</h3>
        <div className="flex justify-center flex-wrap gap-8">
          <div className="bg-white rounded-xl shadow p-6 w-64 text-left" data-aos="fade-up-right" data-aos-delay="100">
            <h4 className="font-semibold text-lg mb-2">Scripture-Based Questions</h4>
            <p>Grow in your knowledge of God's word with engaging and challenging questions.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 w-64 text-left" data-aos="fade-up" data-aos-delay="200">
            <h4 className="font-semibold text-lg mb-2">Youth Engagement</h4>
            <p>Designed to keep the Boys and Girls Brigade excited and spiritually informed.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 w-64 text-left" data-aos="fade-up-left" data-aos-delay="300">
            <h4 className="font-semibold text-lg mb-2">Upcoming Events</h4>
            <p>Stay updated on diocesan quiz competitions and training sessions.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-4 mt-16" data-aos="fade-in">
        <p>&copy; {new Date().getFullYear()} Diocese of Lagos West - Anglican Communion Brigade</p>
      </footer>
    </div>
  );
};

export default LandingPage;
