        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            document.body.classList.add(savedTheme);
            document.getElementById("modeToggle").textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";
        }

        document.getElementById("modeToggle").addEventListener("click", () => {
            const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            document.body.classList.remove(currentTheme);
            document.body.classList.add(newTheme);
            localStorage.setItem("theme", newTheme);
            document.getElementById("modeToggle").textContent = newTheme === "dark" ? "Light Mode" : "Dark Mode";
        });

        document.addEventListener("DOMContentLoaded", () => {
            const data = JSON.parse(localStorage.getItem("countryData"));
            if (data) {
                document.getElementById("flag").src = data.flags?.png;
                document.getElementById("name").textContent = data.name.common;
                document.getElementById("capital").textContent = data.capital?.[0] || "Noma'lum";
                document.getElementById("population").textContent = data.population?.toLocaleString();
                document.getElementById("area").textContent = data.area;
                document.getElementById("borders").textContent = data.borders?.join(", ") || "None";
            } else {
                window.location.href = "./index.html";
            }
        });