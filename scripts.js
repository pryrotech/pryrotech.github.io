 // Array of sentences
        const sentences = [
            "Because flashing constantly is for chumps.",
            "Where your SD card won't break.",
            "The more Operating Systems, the better.",
            "Did we mention that it was free?",
            "Corruption no more.",
            "For all the OS's you could've had, there's UniFiPi.",
            "Think of all the things you can do with your time now!",
            "No need for another Pi... Unless...",
            "They said it couldn't be done..."
        ];

        // Function to pick a random sentence
        function pickRandomSentence() {
            const randomIndex = Math.floor(Math.random() * sentences.length);
            return sentences[randomIndex];
        }

        // Function to display the random sentence on the website
        function displayRandomSentence() {
            const randomSentence = pickRandomSentence();
            const sentenceElement = document.getElementById("randomSentence");
            sentenceElement.textContent = randomSentence;
        }

        // Call the displayRandomSentence function to show a random sentence on page load
        displayRandomSentence();