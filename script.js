var typeWriterElement = document.getElementById('typewriter');
var textArray = ["Hey I am chat GPT.", "How I can help you today ?"];

const form = document.querySelector("form");
const input = document.querySelector("input");
const submitButton = document.querySelector("form button");
const questionsButton = document.querySelectorAll(".usual-questions button");
const container = document.querySelector(".container")


function delWriter(text, i, cb) {
    if (i >= 0) {
        typeWriterElement.innerHTML = text.substring(0, i--);
        var rndBack = 10 + Math.random() * 100;
        setTimeout(function () {
            delWriter(text, i, cb);
        }, rndBack);
    } else if (typeof cb == 'function') {
        setTimeout(cb, 1000);
    }
};


function typeWriter(text, i, cb) {
    if (i < text.length + 1) {
        typeWriterElement.innerHTML = text.substring(0, i++);

        var rndTyping = 250 - Math.random() * 100;
        setTimeout(function () {
            typeWriter(text, i++, cb)
        }, rndTyping);
    } else if (i === text.length + 1) {
        setTimeout(function () {
            delWriter(text, i, cb)
        }, 1000);
    }
};


function StartWriter(i) {
    if (typeof textArray[i] == "undefined") {
        setTimeout(function () {
            StartWriter(0)
        }, 1000);
    } else if (i < textArray[i].length + 1) {
        typeWriter(textArray[i], 0, function () {
            StartWriter(i + 1);
        });
    }
};

setTimeout(function () {
    StartWriter(0);
}, 1000);

form.addEventListener("submit", (event) => {
    event.preventDefault();
})

input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        handleRequest();
    }
})

submitButton.addEventListener("click", handleRequest);

function handleRequest() {
    if (input.value === "") {
        input.classList.add("error");
    }

    else {
        input.classList.remove("error");
        fetchData();
    }
}

async function fetchData() {
    const url = 'https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '4685e83adbmshbe621af8b52500bp19db03jsna57eb0a7e344',
            'X-RapidAPI-Host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com'
        },
        body: JSON.stringify({
            query: `${input.value}`
        })
    };

    try {
        const response = await fetch(url, options);
        if(!response.ok){
            throw new Error("Error occured");
        }

        const result = await response.json();
        const answer = document.createElement("div");
        answer.innerText = result.response;
        answer.classList.add("pattern");
        container.appendChild(answer);


        console.log(result.response);
    } catch (error) {
        console.error(error);
    }
}

//fetchData();

const tabRequest = [
    "Give me ideas for what to do with my kids' art",
    "Write a text message asking a friend to be my plus-one at a wedding",
    "Explain options trading if I am familiar with buying and selling stocks",
    "Compare design principles for mobile apps and desktop software"
];

function createEventListener(index) {
    return async function () {
        const url = 'https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '4685e83adbmshbe621af8b52500bp19db03jsna57eb0a7e344',
                'X-RapidAPI-Host': 'chatgpt-gpt4-ai-chatbot.p.rapidapi.com'
            },
            body: JSON.stringify({
                query: `${tabRequest[index]}`
            })
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error("Error occurred");
            }

            const result = await response.json();
            const answer = document.createElement("div");
            answer.innerText = result.response;
            answer.classList.add("pattern");
            container.appendChild(answer);

            console.log(result.response);
        } catch (error) {
            console.error(error);
        }
    };
}

for (let i = 0; i < questionsButton.length; i++) {
    questionsButton[i].addEventListener("click", createEventListener(i));
}
