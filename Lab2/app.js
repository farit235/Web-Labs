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
