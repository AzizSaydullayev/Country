const cards = document.querySelector(".cards");
const searchInput = document.querySelector(".searchInput");
const mode = document.getElementById("mode");

const __API = "https://restcountries.com/v3.1/all";
let countriesData;

const getData = async () => {
    const res = await fetch(__API);
    const data = await res.json();
    countriesData = [...data];
    render(data);

    searchInput.addEventListener("input", (e) => {
        const filteredData = data.filter(item =>
            item?.name.common?.toLowerCase().includes(e.target.value.toLowerCase())
        );
        render(filteredData);
    });
};

getData();

function render(arr) {
    cards.innerHTML = "";
    arr.forEach((item) => {
        cards.innerHTML += `
            <div onclick="getMoreInfo('${item.name.common}')" class="card">
                <img src="${item.flags.png}" alt="${item.name.common}">
                <div class="text">
                    <h2>${item.name.common}</h2>
                </div>
            </div>
        `;
    });
}

function getMoreInfo(countryName) {
    const selectedCountry = countriesData.find(item => item.name.common === countryName);
    localStorage.setItem("countryData", JSON.stringify(selectedCountry));
    window.location.href = "./country.html";  
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    document.body.classList.add(savedTheme);
    mode.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";
}

mode.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.classList.remove(currentTheme);
    document.body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    mode.textContent = newTheme === "dark" ? "Light Mode" : "Dark Mode";
});