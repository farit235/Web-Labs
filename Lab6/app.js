const form = document.forms["form"];
const button = form.elements["button"];

const inputArr = Array.from(form); //массив всех инпутов
const inputValidArr = []; //массив валидных инпутов

//проверка всех инпутов на валидность и добавление
inputArr.forEach((element) => {
  if (element.hasAttribute("data-reg")) {
    inputValidArr.push(element);
  }
});

form.addEventListener("input", inputHandler); //обработчик событий
button.addEventListener("click", buttonHandler);

function inputHandler({ target }) {
  //target - поле для ввода
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

//поверка полей на валидность
function inputCheck(element) {
  const inputValue = element.value; //считываем инпут с формы
  const inputReg = element.getAttribute("data-reg"); //считываем аттрибут дата-рег
  const reg = new RegExp(inputReg); //преобразовываем строку в регулярное выражение
  console.log(inputValue, reg);

  if (reg.test(inputValue)) {
    element.style.border = "2px solid rgb(0, 196, 0)";
    element.setAttribute("is-valid", "1");

    console.log(localValue); //"myValue"
  } else {
    element.style.border = "2px solid rgb(255, 0, 0)";
    element.setAttribute("is-valid", "0");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // событие загрузки html страницы без стилей и тп

  // выбираем на странице все элементы типа textarea и input
  document.querySelectorAll("textarea, input").forEach(function (e) {
    // если данные значения уже записаны в sessionStorage, то вставляем их в поля формы
    // путём этого мы как раз берём данные из памяти браузера, если страница была случайно перезагружена
    if (e.value === "")
      e.value = window.sessionStorage.getItem(e.name, e.value);
    // на событие ввода данных (включая вставку с помощью мыши) вешаем обработчик
    e.addEventListener("input", function () {
      // и записываем в sessionStorage данные, в качестве имени используя атрибут name поля элемента ввода
      window.sessionStorage.setItem(e.name, e.value);
    });
  });
});

// for local storage

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("textarea, input").forEach(function (e) {
    if (e.value === "") e.value = window.localStorage.getItem(e.name, e.value);

    e.addEventListener("input", function () {
      window.localStorage.setItem(e.name, e.value);
    });
  });
});

function buttonHandler(event) {
  const isAllValid = [];
  inputValidArr.forEach((element) => {
    isAllValid.push(element.getAttribute("is-valid"));
  });
  console.log(isAllValid);
  const isValid = isAllValid.reduce((acc, current) => {
    return acc && current;
  });
  console.log(isValid);
  if (!Boolean(Number(isValid))) {
    event.preventDefault();
  }
}

// форма

$(".telegram-form").on("submit", function (event) {
  event.stopPropagation(); //JavaScript метод stopPropagation() объекта Event прекращает дальнейшую передачу текущего события
  event.preventDefault(); //событие ничего не делает

  let form = this,
    submit = $(".submit", form),
    data = new FormData(),
    files = $("input[type=file]");

  $(".submit", form).val("Отправка..."); //val() используется для получения значений элементов формы
  $("input, textarea", form).attr("disabled", ""); //получает значение заданного атрибута соответствующего элемента

  data.append("name", $('[name="name"]', form).val());
  data.append("email", $('[name="email"]', form).val());
  data.append("phone", $('[name="phone"]', form).val());

  files.each(function (key, file) {
    let cont = file.files;
    if (cont) {
      $.each(cont, function (key, value) {
        data.append(key, value);
      });
    }
  });

  $.ajax({
    url: "ajax.php",
    type: "POST", //post query
    data: data, //our data
    cache: false, //without cache
    dataType: "json", //format json
    processData: false,
    contentType: false,
    xhr: function () {
      //XMLHttpRequest
      let myXhr = $.ajaxSettings.xhr();

      if (myXhr.upload) {
        //свойство возвращает процесс загрузки
        myXhr.upload.addEventListener(
          "progress",
          function (e) {
            if (e.lengthComputable) {
              let percentage = (e.loaded / e.total) * 100;
              percentage = percentage.toFixed(0);
              $(".submit", form).html(percentage + "%");
            }
          },
          false
        );
      }

      return myXhr;
    },
    error: function (jqXHR, textStatus) {
      console.log("Error, try again later");
      // Тут выводим ошибку
    },
    complete: function () {
      // Тут можем что-то делать ПОСЛЕ успешной отправки формы
      console.log("Complete");
      alert("Форма отправлена, ждите звонка от нашего менеджера :))");
      form.reset();
    },
  });

  return false;
});

// const telegramForm = document.querySelector("input");
// const contacts = [];

// function addContact(e) {
//   e.preventDefault();
//   console.log(e.target.name.value);
// }

// telegramForm.addEventListener("submit", addContact);
