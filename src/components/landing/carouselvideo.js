import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./carouselvideo.css";

function Videocarousel() {
  const nextRef = useRef(null);
  const prevRef = useRef(null);

  // Create refs for each video slide
  const videoRefs = useRef([]);

  const [isEnd, setIsEnd] = useState(false); // To track if the last slide is reached
  const [isBeginning, setIsBeginning] = useState(true); // To track if it's the first slide

  const handleMouseEnter = (index) => {
    const video = videoRefs.current[index];
    video?.play();
  };

  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index];
    video?.pause();
    video.currentTime = 0;
  };

  const handleFullscreen = (index) => {
    const video = videoRefs.current[index];
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  // Video sources for 6 slides (only 6 videos will be shown)
  const videoSources = [
    "/video/video1.mp4", // Slide 1
    "/video/video1.mp4", // Slide 2
    "/video/video1.mp4", // Slide 3
    "/video/video1.mp4", // Slide 4
    "/video/video1.mp4", // Slide 5
    "/video/video1.mp4", // Slide 6
    "/video/video1.mp4", // Slide 6
    "/video/video1.mp4", // Slide 6
    "/video/video1.mp4", // Slide 6
    "/video/video1.mp4", // Slide 6
    "/video/video1.mp4", // Slide 6
    "/video/video1.mp4", // Slide 6
  ];

  return (
    <div>
      <div className="carousel-main">
        <div className="div-trustedtext">
          {" "}
          <h2 className="trustedtext">Get Inspiration</h2>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        spaceBetween={20} // Adjust spacing between slides
        slidesPerView={3} // Adjust this to change how many slides are visible at once
        loop={false}
        onSlideChange={(swiper) => {
          setIsEnd(swiper.isEnd);
          setIsBeginning(swiper.isBeginning);
        }}
        className="carousel-swiper"
      >
        {videoSources.map((source, index) => (
          <SwiperSlide key={index}>
            <div className="vcarousel">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={source}
                className="vcarousel-video"
                muted
                playsInline
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => handleFullscreen(index)}
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation arrows with refs */}
        <div
          className="swiper-button-next"
          ref={nextRef}
          style={{ pointerEvents: isEnd ? "none" : "auto" }} // Disable next button when last slide is reached
        ></div>
        <div
          className="swiper-button-prev"
          ref={prevRef}
          style={{ pointerEvents: isBeginning ? "none" : "auto" }} // Disable prev button when on the first slide
        ></div>
      </Swiper>
    </div>
  );
}

export default Videocarousel;
