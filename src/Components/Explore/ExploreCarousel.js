import React, { useRef, useState, useEffect } from 'react';
import './explore.css';
import image1 from './Image (1).png';
import image2 from './Image (3).png';
import image3 from './Image (4).png';
import Footer from '../Footer/Footer';
import iconLeft from './icon_left.svg';
import iconRight from './icon_right.svg';
import Navbar from '../Navbar/Navbar';


const slides = [
  {
    id: 1,
    imageUrl: image1,
    altText: "Women Techsters",
    title: "Women Techsters",
    description: [
      "The Women Techsters initiative is aimed at bridging the digital and technology knowledge divide between men and women as well as ensuring equal access to opportunities for all. We are empowering girls and women across Africa with varying degrees of digital, deep tech and soft skills required within the technology ecosystem.",
      "The initiative will empower 5 million African women over the next 10 years (2020-2030) through a series of activities holding simultaneously across different countries.",
      "Our objective is to grow and support an army of tech-empowered girls and women across Africa who will have equal access to decent job opportunities as well as build and scale their ideas into tech-enabled businesses and deep tech startups, which will aid Africa’s economic growth.",
      "OBJECTIVES:",
      "To empower African women to establish start-ups or technology-enabled businesses to build an entrepreneurial mindset in them.",
      "To support women to become digitally enabled, social champions, and owners of businesses.",
      "To bridge the digital divide between men and women in the tech space while contributing to economic growth.",
      "To ultimately improve the socio-economy of the Africa continent by providing skills that will elevate women from poverty.",
    ],
    link: "https://www.tech4dev.com"
  },
  {
    id: 2,
    imageUrl: image2,
    altText: "DigitalforAllChallenge",
    title: "DigitalforAllChallenge",
    description: [
      "The #DigitalforAllChallenge is a free digital skilling program and competition designed to drive digital literacy of youth across Nigeria and spur interest in acquiring digital skills and certifications via onsite and online platforms. It is aimed at equipping men and women between the ages of 16 – 45 years with digital skills as a means of enabling equal access to technology centric economic opportunities. It is a sub-program under Microsoft’s Emerging Market Model Initiative, implemented in Nigeria by Technology for Social Change and Development Initiative (Tech4Dev).",
      "OBJECTIVES",
      "Equip Nigerian youth between the ages of 16 – 45 years with digital skills as a means of enabling equal access to technology centric economic opportunities.",
      "Encourage digital skill acquisition through healthy competition and incentiviation",
    ],
    link: "https://www.tech4dev.com"
  },
  {
    id: 3,
    imageUrl: image3,
    altText: "Tech4Dev",
    title: "Tech4Dev",
    description: [
      "Technology for Social Change and Development Initiative (Tech4Dev) is a non-profit social enterprise established in 2016 that creates access to decent work and opportunities for Africans through digital skills empowerment and advocacy.",
      "Our vision is to equip Africans with digital and life skills that foster economic prosperity, financial freedom, and sustainable development, contributing immensely to the tech ecosystem and the economy of the world at large, starting with Africa.",
      "We believe in the efficacy of digital literacy as a tool for empowerment and development and commit fully to creating opportunities for people, especially those in underserved communities, through digital skills.",
    ],
    link: "https://www.tech4dev.com"
  },
];

const ExploreCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const autoScrollRef = useRef(null);

  const nextSlide = () => {
    if (activeIndex < slides.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };

  const prevSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(slides.length - 1);
    }
  };

  // Automatic scrolling
  useEffect(() => {
    if (!isUserInteracting) {
      autoScrollRef.current = setInterval(nextSlide, 8000);
    }
    return () => clearInterval(autoScrollRef.current);
  }, [activeIndex, isUserInteracting, nextSlide]); // Include nextSlide in the dependency array  

  // Handling manual navigation which pauses auto-scroll
  const manualScroll = (direction) => {
    clearInterval(autoScrollRef.current);
    setIsUserInteracting(true);
    if (direction === 'left') {
      prevSlide();
    } else {
      nextSlide();
    }

    setTimeout(() => {
      setIsUserInteracting(false);
      autoScrollRef.current = setInterval(nextSlide, 8000);
    }, 5000);
  };

  return (
    <>
      <Navbar className="z-20"/>
      <div className="carousel-container z-[-15] relative w-full">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`carousel-slide ${index === activeIndex ? 'active' : 'inactive'} w-full md:w-1/2 flex flex-col items-center transition-opacity duration-500 ease-in-out z-[-1]`}>
            <img src={slide.imageUrl} alt={slide.altText} className="carousel-image w-full h-auto md:h-96 z-[-1] object-cover" />
            <div className="carousel-description w-full md:w-1/2 p-5 bg-white text-left z-10">
              <h2 className="text-2xl font-bold">{slide.title}</h2>
              {slide.description.map((paragraph, idx) => <p key={idx} className="mt-4 text-left">{paragraph}</p>)}
              <a href={slide.link} target="_blank" rel="noopener noreferrer" className="mt-4 mb-8 inline-block font-bold text-purple-700 px-4 py-2 hover:purple-600">Visit Tech4Dev Website</a>
              <br />
              <br />
              <br />
              <div className="button-container justify-center z-2">
                {activeIndex > 0 && (
                  <button onClick={() => prevSlide()} className="prev-button">
                    <img src={iconLeft} alt="Previous" />
                  </button>
                )}
                {slides.map((_, idx) => (
                  <button key={idx} onClick={() => setActiveIndex(idx)} className={`indicator-btn ${idx === activeIndex ? 'active' : ''}`}>🌑</button>
                ))}
                {activeIndex < slides.length - 1 && (
                  <button onClick={() => nextSlide()} className="next-button">
                    <img src={iconRight} alt="Next" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
  
  export default ExploreCarousel;


