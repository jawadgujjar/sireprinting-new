import React from "react";
import "./testimonial.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const testimonials = [
  {
    name: "Anna M., Portland, OR",
    text: "I ordered custom candle boxes from Cheap Custom Packaging, and I’m honestly amazed by the quality. The print colors are vivid, and the box texture feels premium. They handled everything perfectly from design proof to delivery. My customers love the new packaging — it truly adds a luxurious touch to my brand. Highly recommended!",
    image: "https://i.pravatar.cc/90?img=15",
    rating: 5,
  },
  {
    name: "Marcus T., Austin, TX",
    text: "Our tincture boxes came out better than expected. Cheap Custom Packaging provided durable materials, sharp logo printing, and an eco-friendly finish that matched our brand style. Delivery was fast, prices were reasonable, and the support team kept us updated through every step. Couldn’t ask for a smoother experience.",
    image: "https://i.pravatar.cc/90?img=32",
    rating: 5,
  },
  {
    name: "Samantha L., Brooklyn, NY",
    text: "I wanted something elegant yet protective for my chocolate boxes, and Cheap Custom Packaging nailed it. The design team understood my vision instantly. The custom printed boxes turned out stunning, and the unboxing experience is exactly what I hoped for. I’ll definitely reorder for our next seasonal launch.",
    image: "https://i.pravatar.cc/90?img=10",
    rating: 4,
  },
  {
    name: "David R., Miami, FL",
    text: "Our company needed rigid custom boxes for a premium product line, and Cheap Custom Packaging delivered perfection. The material quality, print accuracy, and turnaround time exceeded our expectations. These boxes truly boost our brand presentation and give customers that high-end feel we wanted. Excellent service and craftsmanship!",
    image: "https://i.pravatar.cc/90?img=22",
    rating: 5,
  },
  {
    name: "Emily S., Seattle, WA",
    text: "The team at Cheap Custom Packaging made our product boxes exactly how we imagined them. The digital proof was accurate, and the final boxes matched perfectly. They helped us with size adjustments and printing suggestions, which made our packaging look more professional. Super happy with the results!",
    image: "https://i.pravatar.cc/90?img=44",
    rating: 4,
  },
  {
    name: "James K., Chicago, IL",
    text: "We switched to Cheap Custom Packaging for our display boxes, and it’s been a great decision. The boxes are sturdy, printed beautifully, and easy to assemble. Our retail shelves now look more organized and attractive. Customers have even commented on how premium our packaging looks. Highly impressed!",
    image: "https://i.pravatar.cc/90?img=47",
    rating: 5,
  },
];

export default function Testimonial() {
  return (
    <div className="testimonial-wrapper">
      <h2 className="testimonial-title">What Our Clients Say</h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop
        spaceBetween={50}
        slidesPerView={1}
        centeredSlides={true}
        speed={800}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
        }}
        className="testimonial-swiper"
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src={item.image}
                  className="testimonial-avatar"
                  alt={item.name}
                />
                <div className="testimonial-info">
                  <p className="testimonial-author">{item.name}</p>
                  <div className="testimonial-rating">
                    {"★".repeat(item.rating)}
                    {"☆".repeat(5 - item.rating)}
                  </div>
                </div>
              </div>

              <p className="testimonial-text">“{item.text}”</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
