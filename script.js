/* Wait for the DOM to fully load */
document.addEventListener("DOMContentLoaded", function() {
    /* Select the image and button elements */
    const img = document.querySelector(".meme-img");
    const nextBtn = document.querySelector(".next-btn");

    /* Check if the required elements are found */
    if (!img || !nextBtn) {
        console.error("Required elements not found!");
        return;
    }

    /* Function to fetch and display a random meme */
    async function randomMemeGenerator() {
        console.log("randomMemeGenerator called");
        try {
            /* Fetch a random meme from the API */
            const res = await fetch("https://meme-api.com/gimme");
            if (!res.ok) throw new Error(`Network response was not ok: ${res.status}`);
            const json = await res.json();
            const url = json.url;
            console.log("Fetched meme URL:", url);

            /* Force image reload by resetting src */
            img.src = ""; // Clear it first
            img.src = url + "?t=" + Date.now(); // Then set new URL
            console.log("Image src set to:", img.src); // Confirm it’s applied

            /* Add load/error listeners for debugging */
            img.onload = () => console.log("Image loaded successfully:", img.src);
            img.onerror = () => console.error("Image failed to load:", img.src);

            /* Trigger GSAP animation */
            gsap.fromTo(img, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" });
        } catch (error) {
            console.error("Failed to fetch meme:", error);
            /* Set a placeholder image if fetching fails */
            img.src = "https://via.placeholder.com/300?text=Failed+to+load+meme";
        }
    }

    /* Load the initial meme */
    console.log("Loading initial meme...");
    randomMemeGenerator();

    /* Add click event listener to the button */
    nextBtn.addEventListener("click", function() {
        console.log("Button clicked!");
        randomMemeGenerator();
    });
});
