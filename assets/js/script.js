// variable declarations for selectors
var hamburger = document.querySelector(".hamburger"),
  headerNav = document.querySelector(".navbar"),
  activeNavBar = document.querySelectorAll(".header-list li"),
  portfolioFilterAtr = document.querySelectorAll(".portfolio-icon-list li"),
  portFolioFilterData = document.querySelectorAll(".f-protfolio-filter li"),
  blogList = document.querySelectorAll(".blog-list li"),
  blogFilterData = document.querySelectorAll(".sec-blog-container"),
  sliderClickable = document.querySelectorAll(".slider-clickable-list li"),
  sliderList = document.querySelector(".slider-list"),
  yourName = document.querySelector(".name"),
  email = document.querySelector(".email"),
  subject = document.querySelector(".subject"),
  phoneNumber = document.querySelector(".phone-number"),
  textMessage = document.querySelector(".textarea-input textarea"),
  sendMessageBtn = document.querySelector(".send-msge"),
  backToTopBtn = document.querySelector(".footer-btn"),
  modalPopup = document.querySelectorAll(".slider-list .active-images ul li img"),
  modalSection = document.querySelector(".modal"),
  modal = document.querySelector(".modal-content img"),
  closeModal = document.querySelector(".close");

// global variables declaration
var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  slideIndex = 0;

// global calls
//  hamberger remove active class 
hamburger.classList.remove("active-nav");
headerNav.classList.remove("active-nav");

showSlides(slideIndex);

// global event 
window.onclick = function (event) {
  if (event.target == modalSection) {
    modalSection.classList.remove("active");
  }
}

// event declaration starts

// check contact fields on focus out event
yourName.addEventListener("focusout", function () { checkName() });
email.addEventListener("focusout", function () { checkEmail() });
subject.addEventListener("focusout", function () { checkSubject() });
phoneNumber.addEventListener("focusout", function () { checkPhone() });
message.addEventListener("focusout", function () { checkMessage() });

// hamberger event 
hamburger.addEventListener("click", function () {
  var html = document.querySelector("html");
  hamburger.classList.toggle("active-nav");
  headerNav.classList.toggle("active-nav");

  if (hamburger.classList.contains("active-nav")) {
    // Disable scroll
    html.classList.add("hidden");
  } else {
    // Enable scroll
    html.classList.remove("hidden");
  }
});

activeNavBar.forEach(function (el) {
  el.addEventListener("click", function () {
    var removeActiveClass = document.querySelector(".active");
    removeActiveClass.classList.remove("active");
    el.classList.add("active")
  })
})

// portfolio filter event 
portfolioFilterAtr.forEach(function (el) {
  el.addEventListener("click", function () {
    portfolioFilter(el);
  })
})

// blog filter event
blogList.forEach(function (element) {
  element.addEventListener("click", function () {
    blogFilter(element);
  })
})

// slider event 
sliderClickable.forEach(function (el) {
  el.addEventListener("click", function () {
    var getUserData = el.getAttribute("data-value");
    activeSlideRemove();
    el.classList.add("active-slide");
    currentSlide(getUserData)
  })
})

/* contact form validation event */
sendMessageBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (validateFields()) {
    emptyFormFields();
    alert("Your message is submitted successfully!");
  }
});

// back to top event
backToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
})

// modal open event 
modalPopup.forEach(function (el) {
  el.addEventListener("click", function () {
    var imgSource = el.getAttribute("src");
    modal.setAttribute('src', imgSource);
    modalSection.classList.add("active")

    productHeading = el.querySelectorAll(".product-heading a");
    productHeading.forEach(function (el) {
      var prodHead = document.querySelector('.product-head');
      prodHead.innerHTML = el.innerText;
    })
  })
})

// modal close event
closeModal.addEventListener("click", function () {
  modalSection.classList.remove("active");
})

// event declaration ends

// finction declarations starts
function portfolioFilter(el) {
  var removeActiveClass = document.querySelector(".active-filter"),
    filterAtr = el.querySelector("span").innerText.toLowerCase();

  removeActiveClass.classList.remove("active-filter");
  el.classList.add("active-filter");

  portFolioFilterData.forEach(function (data) {
    var getFilteredData = data.getAttribute("data-filter-portfolio");

    if (getFilteredData.includes(filterAtr)) {
      data.classList.add("active")
      data.classList.remove("hidden")
    } else {
      data.classList.add("hidden")
      data.classList.remove("active")
    }
  })
}

function blogFilter(element) {
  var removeActiveClass = document.querySelector(".active-blog"),
    filterAtr = element.querySelector("h4").innerText.toLowerCase();

  removeActiveClass.classList.remove("active-blog");
  element.classList.add("active-blog");

  blogFilterData.forEach(function (data) {
    var getFilteredData = data.getAttribute("data-filter-blog");

    if (getFilteredData.includes(filterAtr)) {
      data.classList.add("active")
      data.classList.remove("hidden")
    } else {
      data.classList.add("hidden")
      data.classList.remove("active")
    }
  })
}

function activeSlideRemove() {
  activeSlide = document.querySelector(".active-slide");
  activeSlide.classList.remove("active-slide");
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides() {
  var slides = document.querySelectorAll(".slider-list .active-images");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.transform = `translateX(${slideIndex * 100}%)`
  }
}

// form validation
function validateFields() {
  var isValidName = checkName(),
    isValidEmail = checkEmail(),
    isValidSubject = checkSubject(),
    isValidPhone = checkPhone(),
    isValidMessage = checkMessage();

  // check all form fields are valid or not
  if (!isValidName || !isValidSubject || !isValidEmail || !isValidPhone || !isValidMessage) {
    return false;
  } else {
    return true;
  }
}

function checkName() {
  var nameValue = yourName.value.trim();

  if (nameValue === "") {
    var errorText = "*Name is required!",
      errorParent = yourName.parentElement;

    showError(errorText, errorParent);
    return false;
  } else if (nameValue.length < 3) {
    var errorText = "*Name should be greater than 3 characters!",
      errorParent = yourName.parentElement;

    showError(errorText, errorParent);
    return false;

  } else if (!isNaN(nameValue)) {
    var errorText = "*Please enter valid name!",
      errorParent = yourName.parentElement;

    showError(errorText, errorParent);
    return false;
  }
  else {
    showSuccess(yourName);
    return true;
  }
}

function checkEmail() {
  var emailValue = email.value.trim();

  if (emailValue === "") {
    var errorText = "*Email is required!",
      errorParent = email.parentElement;

    showError(errorText, errorParent);
    return false;
  } else if (emailValue.match(emailPattern) == null) {
    var errorText = "*Please enter valid email!",
      errorParent = email.parentElement;

    showError(errorText, errorParent);
    return false;
  }
  else {
    showSuccess(email);
    return true;
  }
}

function checkSubject() {
  var subjectValue = subject.value.trim();

  if (subjectValue === "") {
    var errorText = "*Please enter your subject!",
      errorParent = subject.parentElement;

    showError(errorText, errorParent);
    return false;
  } else if (subjectValue.length < 6) {
    var errorText = "*Subject should be greater than 6 characters!",
      errorParent = subject.parentElement;

    showError(errorText, errorParent);
    return false;
  }
  else {
    showSuccess(subject);
    return true;
  }
}

function checkPhone() {
  var contactValue = phoneNumber.value.trim();

  if (contactValue === "") {
    var errorText = "*Phone number is required!",
      errorParent = phoneNumber.parentElement;

    showError(errorText, errorParent);
    return false;
  } else if (contactValue.length > 10 || contactValue.length < 10) {
    var errorText = "*Phone number must be 10 digit long!",
      errorParent = phoneNumber.parentElement;

    showError(errorText, errorParent);
    return false;
  }
  else if (contactValue.length === 10) {
    showSuccess(phoneNumber);
    return true;
  }
}

function checkMessage() {
  var messageValue = message.value.trim();

  if (messageValue === "") {
    var errorText = "*Please enter some message!",
      errorParent = message.parentElement;

    showError(errorText, errorParent);
    return false;
  } else if (messageValue.length < 8) {
    var errorText = "*Message should be greater than 8 characters!",
      errorParent = message.parentElement;

    showError(errorText, errorParent);
    return false;
  }
  else {
    showSuccess(message);
    return true;
  }
}

function showError(errorText, errorParent) {
  var showError = errorParent.querySelector(".error-text");
  if (showError && !null) {
    showError.remove();
  }
  var p = document.createElement("p");
  p.innerText = errorText;
  errorParent.appendChild(p);
  p.classList.add("error-text")

  errorParent.classList.add("error");
  errorParent.classList.remove("success");
}

function showSuccess(element) {
  var successParent = element.parentElement,
    showError = successParent.querySelector(".error-text");

  if (showError) {
    showError.remove();
  }

  successParent.classList.add("success");
  successParent.classList.remove("error");
}

// empty contact input fields
function emptyFormFields() {
  firstName.value = "";
  lastName.value = "";
  subject.value = "";
  email.value = "";
  message.value = "";
}

// finction declarations ends