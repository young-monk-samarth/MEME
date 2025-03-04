document.addEventListener("DOMContentLoaded", function() {
    const img = document.querySelector(".meme-img");
    const nextBtn = document.querySelector(".next-btn");

    if (!img || !nextBtn) {
        console.error("Required elements not found!");
        return;
    }

    async function randomMemeGenerator() {
        try {
            // Should call YOUR backend server here, not directly use credentials
            const res = await fetch('https://api.imgflip.com/get_memes');
            if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
            
            const data = await res.json();
            if (!data.success) throw new Error(`API error: ${data.error_message}`);
            
            const memes = data.data.memes;
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];
            
            img.src = randomMeme.url + "?t=" + Date.now();

            gsap.fromTo(img, { opacity: 0, scale: 0.9 }, { 
                opacity: 1, 
                scale: 1, 
                duration: 0.8, 
                ease: "power2.out" 
            });

        } catch (error) {
            console.error("Error:", error);
            img.src = "https://via.placeholder.com/300?text=Error+loading+meme";
        }
    }

    randomMemeGenerator();
    nextBtn.addEventListener("click", randomMemeGenerator);
});
