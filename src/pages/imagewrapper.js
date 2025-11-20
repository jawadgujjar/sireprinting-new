// import { useEffect } from "react";

// export default function AutoImageWrapper() {
//   useEffect(() => {
//     const applyOverlay = (img) => {
//       if (!img || img.classList.contains("logo-overlay")) return;
//       if (img.closest(".img-wrapper")) return; // already wrapped

//       const wrapper = document.createElement("div");
//       wrapper.className = "img-wrapper";

//       const parent = img.parentNode;
//       parent.insertBefore(wrapper, img);
//       wrapper.appendChild(img);

//       img.classList.add("main-img");

//       const logo = document.createElement("img");
//       logo.src = "/logo.png";
//       logo.className = "logo-overlay";
//       wrapper.appendChild(logo);
//     };

//     // Apply on all existing images
//     document.querySelectorAll("img").forEach((img) => {
//       applyOverlay(img);
//     });

//     // Apply to future images added later (product pages, sliders, lazy-loaded, etc.)
//     const observer = new MutationObserver((mutations) => {
//       mutations.forEach((mutation) => {
//         mutation.addedNodes.forEach((node) => {
//           if (node.tagName === "IMG") {
//             applyOverlay(node);
//           } else if (node.querySelectorAll) {
//             node.querySelectorAll("img").forEach(applyOverlay);
//           }
//         });
//       });
//     });

//     observer.observe(document.body, {
//       childList: true,
//       subtree: true,
//     });

//     return () => observer.disconnect();
//   }, []);

//   return null;
// }
