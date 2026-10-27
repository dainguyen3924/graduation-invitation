
const backgroundMusic = document.querySelector("#backgroundMusic");

backgroundMusic.volume = 0.5;
const envelope = document.querySelector("#openEnvelope");
const envelopeScreen = document.querySelector("#envelopeScreen");
const invitation = document.querySelector("#invitation");


envelope.addEventListener("click", () => {
  backgroundMusic.play().catch((error) => {
    console.log("Không thể phát nhạc:", error);
  });

  // Giữ nguyên phần code mở phong bì phía dưới
  envelope.disabled = true;

  envelope.classList.add("is-open");

  setTimeout(() => {
    envelopeScreen.classList.add("is-leaving");
  }, 1000);

  setTimeout(() => {
    envelopeScreen.style.display = "none";
    invitation.hidden = false;
    window.scrollTo(0, 0);
  }, 1600);
});




const translations = {
    en: {
      envelope: {
        title: "YOU ARE INVITED!",
        hint: "TAP TO OPEN"
      },
      hero: {
        title: "Happy graduation",   
        subTitle: "INFORMATION",
        date: "DATE:",
        class: "CLASS:",
        location: "LOCATION:",
        location2: "12 Nguyen Van Bao, Hanh Thong Ward, HCM",
        map: "VIEW LOCATION ↗",
        school: "INDUSTRIAL UNIVERSITY"
      },
      quote: {
        title: "A New Chapter Begins",
        content: "Graduation is not the end of the journey, but the beginning of a new chapter filled with possibilities, dreams, and endless opportunities. As one chapter closes, I carry with me the memories, lessons, and people who made the journey worthwhile."
      },
      calender: {
        subTitle: "a little note for your calendar",
        month: "November",
        mon: "MON",
        tue: "TUE",
        wed: "WED",
        thur: "THUR",
        fri: "FRI",
        sat: "SAT",
        sun: "SUN",
        detail: "Mon . 30/11/2026"
      },
      photo: {
        title: "Some photo of me"
      },
      schedule: {
        title: "DAY'S SCHEDULE",
        photo: "Photo Session",
        grad: "Graduation Ceremony",
        end: "Ceremony Ends",
        dinner: "Family Dinner"
      },
      wishes: {
        title: "Leave a wish for Van Dai ",
        name: "Your Name",
        wish: "Your wishes",
        submit: "Send your wishes ↗",
        word: "Words from you",
        count: "0 wishes",
        comment: "Your wishes will appear here ♡"
      },
      footer: {
        subT: "Having you share in this milestone means more than words can express",
        thank: "thank you"
      }
    },

    vi: {
      envelope: {
        title: "TRÂN TRỌNG MỜI BẠN!",
        hint: "NHẤN ĐỂ MỞ"
      },
      hero: {
        title: "Chúc mừng Tốt nghiệp",
        subTitle: "THÔNG TIN",
        date: "NGÀY:",
        class: "LỚP:",
        location: "ĐỊA ĐIỂM:",
        location2: "12 Nguyễn Văn Bảo, Phường Hạnh Thông, HCM",
        map: "XEM VỊ TRÍ ↗",
        school: "ĐẠI HỌC CÔNG NGHIỆP"

      },
      quote: {
        title: "Mot Chuong Moi Bat Dau",
        content: "Tốt nghiệp không phải là kết thúc của một hành trình, mà là sự khởi đầu của một chương mới tràn đầy những khả năng, ước mơ và vô vàn những cơ hội. Khi một chương khép lại, tôi mang theo bên mình những kỷ niệm, bài học và những người đã làm cho hành trình này trở nên đáng giá."
      },
      calender: {
        subTitle: "Một ghi chú nhỏ cho lịch của bạn",
        month: "Tháng Mười một",
        mon: "HAI",
        tue: "BA",
        wed: "BỐN",
        thur: "NĂM",
        fri: "SÁU",
        sat: "BẢY",
        sun: "CN",
        detail: "Thứ Hai . 30/11/2026"
      },
      photo: {
        title: "Mot vai buc hinh ve toi"
      },
      schedule: {
        title: "LỊCH TRÌNH TRONG NGÀY",
        photo: "Chụp Ảnh",
        grad: "Lễ Tốt Nghiệp",
        end: "Kết thúc Lễ Tốt Nghiệp",
        dinner: "Ăn tối với gia đình"
      },
      wishes: {
        title: "De lai loi Chuc cho Van Dai",
        name: "Tên của bạn",
        wish: "Lời chúc của bạn",
        submit: "Gửi ↗",
        word: "Những lời chúc",
        count: "0 wish",
        comment: "Những lời chúc của bạn sẽ xuất hiện ở đây ♡"
      },
      footer: {
        subT: "Được cùng bạn chia sẻ khoảng khắc này ý nghĩa hơn cả lời nào có thể diễn tả được",
        thank: "Cam On"
      }
    }
}

i18next.init({
  lng: localStorage.getItem("siteLanguage") || "en",
  fallbackLng: "en",
  resources: {
    en: { translation: translations.en },
    vi: { translation: translations.vi }
  }
}).then(() => {
  updateLanguage(i18next.resolvedLanguage || "en");
});

function updateLanguage(language) {
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translatedText = i18next.t(key, { lng: language });

    if (translatedText !== key) {
      element.textContent = translatedText;
    }
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const isActive = button.dataset.lang === language;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  localStorage.setItem("siteLanguage", language);
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.dataset.lang;

    i18next.changeLanguage(language).then(() => {
      updateLanguage(language);
    });
  });
});






const wishForm = document.querySelector("#wishes__form");
const wishName = document.querySelector("#wishName");
const wishMessage = document.querySelector("#wishMessage");
const wishList = document.querySelector("#wishList");
const wishCount = document.querySelector("#wishCount");

const WISH_STORAGE_KEY = "dai-graduation-wishes";

const avatarColors = [
  "#9B7764",
  "#7D8B72",
  "#B28D5D",
  "#827B9B",
  "#66858A",
  "#B77C7C",
  "#777777"
];

// Đọc lời chúc đã lưu trên trình duyệt
function getWishes() {
  try {
    const saved = localStorage.getItem(WISH_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Lưu lời chúc
function saveWishes(wishes) {
  try {
    localStorage.setItem(
      WISH_STORAGE_KEY,
      JSON.stringify(wishes)
    );
  } catch {
    alert("Không thể lưu dữ liệu trên trình duyệt này.");
  }
}

// Tạo một thẻ HTML cho mỗi lời chúc
function createWishCard(wish) {
  const card = document.createElement("article");
  card.className = "wish-card";

  const avatar = document.createElement("div");
  avatar.className = "wish-card__avatar";
  avatar.style.backgroundColor = wish.color;
  avatar.textContent = wish.name.trim().charAt(0).toUpperCase();
  avatar.setAttribute("aria-hidden", "true");

  const content = document.createElement("div");
  content.className = "wish-card__content";

  const name = document.createElement("h4");
  name.className = "wish-card__name";
  name.textContent = wish.name;

  const message = document.createElement("p");
  message.className = "wish-card__message";
  message.textContent = wish.message;

  const likeButton = document.createElement("button");
  likeButton.className = "wish-card__like";
  likeButton.type = "button";
  likeButton.textContent = wish.liked ? "♥" : "♡";
  likeButton.classList.toggle("is-liked", wish.liked);
  likeButton.setAttribute("aria-pressed", String(wish.liked));
  likeButton.setAttribute(
    "aria-label",
    wish.liked ? "Bỏ thả tim lời chúc" : "Thả tim lời chúc"
  );

  // Nhấn tim để đổi trạng thái
  likeButton.addEventListener("click", () => {
    const wishes = getWishes();
    const currentWish = wishes.find(
      (item) => item.id === wish.id
    );

    if (!currentWish) return;

    currentWish.liked = !currentWish.liked;
    saveWishes(wishes);
    renderWishes();
  });

  content.append(name, message);
  card.append(avatar, content, likeButton);

  return card;
}

// Hiển thị danh sách lời chúc
function renderWishes() {
  const wishes = getWishes();

  wishList.replaceChildren();

  wishCount.textContent = `${wishes.length} ${
    wishes.length === 1 ? "wish" : "wishes"
  }`;

  if (wishes.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "wishes__empty";
    emptyMessage.textContent =
      "No wishes yet. Be the first to leave one!";

    wishList.append(emptyMessage);
    return;
  }

  wishes.forEach((wish) => {
    wishList.append(createWishCard(wish));
  });
}

// Xử lý khi gửi lời chúc
wishForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = wishName.value.trim();
  const message = wishMessage.value.trim();

  if (!name || !message) return;

  const wishes = getWishes();

  const newWish = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name,
    message,
    color:
      avatarColors[
        Math.floor(Math.random() * avatarColors.length)
      ],
    liked: false
  };

  wishes.unshift(newWish);
  saveWishes(wishes);

  renderWishes();
  wishForm.reset();
});

// Hiển thị lời chúc đã lưu khi mở trang
renderWishes();
