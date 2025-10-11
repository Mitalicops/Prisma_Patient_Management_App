"use client";

import React from "react";

import Image from "next/image";
import { IoMdStar } from "react-icons/io";
import Slider from "react-slick";
import { TestimonialsCard } from "./UI/SpecialistDoc";
import Section from "@/constants/Section";

interface StarIconProps {
  count?: number;
}

const Stars: React.FC<StarIconProps> = ({ count = 1 }) => {
  const stars: JSX.Element[] = [];

  for (let i = 0; i < count; i++) {
    stars.push(<IoMdStar key={i} color="#FFC107" size={20} />);
  }

  return <>{stars}</>;
};

const Testimonials = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="p-[5%]">
      <div className="text-center mb-7">
        <h1 className="text-3xl text-black font-bold">
          Our Special Patients Say!
        </h1>
        <p className="text-[1rem] mt-2 text-gray-500 font-medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.lafjaljf
          ajflajf ajflajie ajfajf lafjaf
        </p>
      </div>

      <div className="grid gap-6  grid-cols-[minmax(200px,1fr)] grid-flow-row mt-14">
        <Slider {...settings}>
          <TestimonialsCard
            title="Great Service"
            author="Well Jack"
            icon={<Stars count={5} />}
            imgSrc="/assets/Blog-1.jpg"
            description="lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
          />
          <TestimonialsCard
            title="Ther ER Department is Fast"
            author="Elazebth Shaw"
            icon={<Stars count={5} />}
            imgSrc="/assets/Blog-1.jpg"
            description="lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
          />
          <TestimonialsCard
            title="The Doctors Are very Hospitable"
            author="Samantha Ray"
            icon={<Stars count={5} />}
            imgSrc="/assets/Blog-1.jpg"
            description="lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
          />
          <TestimonialsCard
            title="Infrastructure Is Robust"
            author="John Elvish"
            icon={<Stars count={5} />}
            imgSrc="/assets/Blog-1.jpg"
            description="lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
          />
          <TestimonialsCard
            title="Cleanliness is average"
            author="Carter Tucker"
            icon={<Stars count={3} />}
            imgSrc="/assets/Blog-1.jpg"
            description="lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
          />
          <TestimonialsCard
            title="Staff are average"
            author="Ahmed Rashid"
            icon={<Stars count={3} />}
            imgSrc="/assets/Blog-1.jpg"
            description="lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
          />
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
