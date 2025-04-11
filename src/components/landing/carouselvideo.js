import { useRef } from "react";
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
  const videoSources = [
    "/video/video1.mp4", // Slide 1
    "/video/video1.mp4", // Slide 2
    "/video/video1.mp4", // Slide 3
    "/video/video1.mp4", // Slide 4
    "/video/video1.mp4", // Slide 5
    "/video/video1.mp4", // Slide 6
  ];

  return (
    <div className="carousel-main">
      <Swiper
        modules={[Navigation]}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        spaceBetween={0}
        slidesPerView={3}
        className="carousel-swiper"
      >
        {[1, 2, 3, 4, 5, 6].map((slide, index) => (
          <SwiperSlide key={slide}>
            <div className="vcarousel">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={videoSources[slide - 1]} // Get the correct video source based on the slide index
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
        <div className="swiper-button-next" ref={nextRef}></div>
        <div className="swiper-button-prev" ref={prevRef}></div>
      </Swiper>
    </div>
  );
}

export default Videocarousel;
