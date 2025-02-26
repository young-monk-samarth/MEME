document.addEventListener("DOMContentLoaded", function() {
    // Typewriter effect with glow loop for title
    gsap.from(".title", {
        opacity: 0,
        duration: 0.1, // Quick initial fade-in for the element
        onStart: () => {
            // Split title into characters and animate each
            const title = document.querySelector(".title");
            const text = title.textContent;
            title.innerHTML = text.split("").map(char => `<span>${char}</span>`).join("");
            gsap.from(".title span", {
                opacity: 0,
                y: 10,
                duration: 0.05,
                stagger: 0.05, // Staggered effect for typewriter feel
                ease: "power2.out",
                
                onComplete: () => {
                    // Subtle glow animation loop
                    gsap.to(".title", {
                        textShadow: "0 0 5px rgba(236, 240, 241, 0.8), 0 0 10px rgba(236, 240, 241, 0.5)", // Light glow matching #ecf0f1
                        duration: 1.5,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1 // Infinite loop
                    });
                }
            });
        }
    });

    // Initial animation for meme image (unchanged)
    gsap.from(".meme-img", {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)"
    });

    // Initial animation for next button (unchanged)
    gsap.from(".next-btn", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1,
        ease: "power2.out"
    });

    // Animate new meme images on load (unchanged)
    const img = document.querySelector(".meme-img");
    if (img) {
        img.addEventListener("load", function() {
            gsap.fromTo(
                img,
                { opacity: 0, scale: 0.9 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
            );
        });
    } else {
        console.error("Meme image element not found!");
    }
});