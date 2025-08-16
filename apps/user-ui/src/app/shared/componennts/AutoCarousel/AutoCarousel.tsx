import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Summer Collection 2024",
    description:
      "Discover the latest trends in fashion with our exclusive summer collection featuring vibrant colors and comfortable fabrics.",
    buttonText: "Shop Summer",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Premium Electronics",
    description:
      "Experience cutting-edge technology with our curated selection of premium electronics and smart devices.",
    buttonText: "Explore Tech",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    title: "Home & Living",
    description:
      "Transform your space with our beautiful collection of home decor, furniture, and lifestyle accessories.",
    buttonText: "Shop Home",
  },
];

const AutoCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection("next");
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? "next" : "prev");
    setCurrentSlide(index);
  };
  const goToPrevious = () => {
    setDirection("prev");
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const goToNext = () => {
    setDirection("next");
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden -mx-6 -my-6">
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
              isActive
                ? "translate-x-0 z-10"
                : direction === "next"
                ? "translate-x-full z-0"
                : "-translate-x-full z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#582E3A]/70 to-[#582E3A]/30" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <h2 className="text-4xl md:text-6xl font-extrabold text-[#FBF9F6] mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl max-w-2xl text-[#FBF9F6] opacity-90 mb-6 drop-shadow-md">
                {slide.description}
              </p>
              <button className="bg-[#FBF9F6] text-[#582E3A] font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-[#f3f0ed] hover:scale-105 transition-all duration-300">
                {slide.buttonText}
              </button>
            </div>
          </div>
        );
      })}

      {/* Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-[#FBF9F6]/80 text-[#582E3A] p-3 rounded-full shadow-lg hover:bg-[#FBF9F6] transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-[#FBF9F6]/80 text-[#582E3A] p-3 rounded-full shadow-lg hover:bg-[#FBF9F6] transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#FBF9F6] scale-125 shadow-md"
                : "bg-[#FBF9F6] bg-opacity-50 hover:bg-opacity-80"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FBF9F6]/30">
        <div
          className="h-full bg-[#FBF9F6] transition-all duration-3000 ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default AutoCarousel;
