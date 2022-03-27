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
  } else {
    element.style.border = "2px solid rgb(255, 0, 0)";
    element.setAttribute("is-valid", "0");
  }
}

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
  event.stopPropagation();
  event.preventDefault();

  let form = this,
    submit = $(".submit", form),
    data = new FormData(),
    files = $("input[type=file]");

  $(".submit", form).val("Отправка...");
  $("input, textarea", form).attr("disabled", "");

  data.append("name", $('[name="name"]', form).val());
  data.append("surname", $('[name="surname"]', form).val());
  data.append("email", $('[name="email"]', form).val());
  data.append("password", $('[name="password"]', form).val());
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
    type: "POST",
    data: data,
    cache: false,
    dataType: "json",
    processData: false,
    contentType: false,
    xhr: function () {
      let myXhr = $.ajaxSettings.xhr();

      if (myXhr.upload) {
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
      form.reset();
    },
  });

  return false;
});
