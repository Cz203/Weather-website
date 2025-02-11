const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityElement = document.querySelector(".city");
const dateElement = document.querySelector(".date");

search.addEventListener("click", () => {
  const APIKey = "ef59a68b00b942f4cfed5029afb99e88";
  const city = document.querySelector(".search-box input").value.trim();

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px"; // Thay đổi chiều cao của phần container thành 400px khi không tìm thấy thành phố.
        weatherBox.style.display = "none"; // Ẩn phần hiển thị thông tin thời tiết.
        weatherDetails.style.display = "none"; // Ẩn phần chi tiết thời tiết.
        error404.style.display = "block"; // Hiển thị thông báo lỗi không tìm thấy thành phố.
        error404.classList.add("fadeIn"); // Thêm class "fadeIn" cho hiệu ứng khi hiển thị thông báo lỗi.

        cityElement.style.display = "none"; // Ẩn tên thành phố.
        dateElement.style.display = "none"; // Ẩn ngày tháng.
        return;
      }

      error404.style.display = "none"; // Ẩn thông báo lỗi khi thành phố hợp lệ.
      error404.classList.remove("fadeIn"); // Xóa hiệu ứng "fadeIn" khi thành phố hợp lệ.

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      // Thay đổi hình ảnh thời tiết tùy thuộc vào tình trạng thời tiết.
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png"; // Cập nhật hình ảnh cho thời tiết nắng.
          break;
        case "Rain":
          image.src = "images/rain.png"; // Cập nhật hình ảnh cho thời tiết mưa.
          break;
        case "Snow":
          image.src = "images/snow.png"; // Cập nhật hình ảnh cho thời tiết tuyết.
          break;
        case "Clouds":
          image.src = "images/cloud.png"; // Cập nhật hình ảnh cho thời tiết có mây.
          break;
        case "Haze":
          image.src = "images/mist.png"; // Cập nhật hình ảnh cho thời tiết mù sương.
          break;
        default:
          image.src = ""; // Nếu không có loại thời tiết nào khớp, không hiển thị hình ảnh.
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`; // Hiển thị nhiệt độ.
      description.innerHTML = `${json.weather[0].description}`; // Hiển thị mô tả thời tiết.
      humidity.innerHTML = `${json.main.humidity}%`; // Hiển thị độ ẩm.
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`; // Hiển thị tốc độ gió.

      cityElement.textContent = `${json.name}, ${json.sys.country}`; // Hiển thị tên thành phố và quốc gia.
      cityElement.style.display = "block"; // Hiển thị tên thành phố khi có kết quả tìm thấy.

      const today = new Date();
      const options = {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      };
      dateElement.textContent = today.toLocaleDateString("en-US", options); // Hiển thị ngày hiện tại.
      dateElement.style.display = "block"; // Hiển thị ngày khi có kết quả tìm thấy.

      weatherBox.style.display = ""; // Hiển thị hộp thông tin thời tiết.
      weatherDetails.style.display = ""; // Hiển thị chi tiết thời tiết.
      weatherBox.classList.add("fadeIn"); // Thêm hiệu ứng fadeIn cho hộp thời tiết.
      weatherDetails.classList.add("fadeIn"); // Thêm hiệu ứng fadeIn cho chi tiết thời tiết.
      container.style.height = "auto"; // Đặt chiều cao của container tự động thay đổi tùy vào nội dung.
    })
    .catch((error) => console.error("Error fetching weather data:", error));
});
