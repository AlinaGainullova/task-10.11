// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

const minWeight = document.querySelector('.minWeight__input');
const maxWeight = document.querySelector('.maxWeight__input');


// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

//вызов соответствующего цвету класса CSS
function colorToClass(color) {
  switch (color) {
    case 'фиолетовый': return 'fruit_violet';
    case 'зеленый': return 'fruit_green';
    case 'розово-красный': return 'fruit_carmazin';
    case 'желтый': return 'fruit_yellow';
    case 'светло-коричневый': return 'fruit_lightbrown';
    default: return 'fruit_new_red'
  } 
}

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    const colorClass = colorToClass(fruits[i].color)
    let liElement = document.createElement('li');
    liElement.className = `fruit__item ${colorClass}`;

    liElement.innerHTML = `<div class="fruit__info">
                        <div>index: ${i}</div>
                        <div>kind: ${fruits[i].kind}</div>
                        <div>color: ${fruits[i].color}</div>
                        <div>weight (кг): ${fruits[i].weight}</div>
                      </div>`

    fruitsList.append(liElement);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
       // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let i = getRandomInt(0, fruits.length - 1);
    result.push(fruits[i]); 
    fruits.splice(i, 1); 
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  if(fruits.length === 0){
    alert("Список пуст!");
    } else if (fruits.length === 1){
      alert("В списке 1 фрукт!");
    } else{ 
  shuffleFruits();
  display();
    }
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива

  const filterFruits = () => {
  fruits = fruits.filter((item) => { 
      // TODO: допишите функцию
        if(item.weight >= minWeight.value && item.weight <= maxWeight.value) return item;
         
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  const stringToCode = (str) => {
    let code = "";
    [...str].forEach(char => {      //... rest собирает остаток исходного массива в себя, forEach — перебор элементов массива
      code += char.charCodeAt(0);   // charCodeAt() возвращает числовое значение Юникода для символа по указанному индексу (за исключением кодовых точек Юникода, больших 0x10000).
    });
    return parseInt(code);
  };

  if (stringToCode(b) < stringToCode(a)) return true;

};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
   
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        let a = arr[i].color;
        let b = arr[i + 1].color;
        if (comparation(a, b)) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  },


  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
    if (arr.length <= 1) {
      return arr;
    }

    const pivot = arr[Math.floor(Math.random() * arr.length)].color;

    let left = [];
    let center = [];
    let right = [];

    arr.forEach(element => {
      if (element.color == pivot) { center.push(element) }
      else if ((element.color != pivot) && (element.color.length >= pivot.length)) { right.push(element) }
      else if ((element.color != pivot) && (element.color.length < pivot.length)) { left.push(element) }
    });

    return fruits = [...sortAPI.quickSort(left), ...center, ...sortAPI.quickSort(right)];

 
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if (sortKind == 'bubbleSort') {
    sortKindLabel.innerText = 'quickSort';
    sortKind = 'quickSort';
  }
  else {
    sortKindLabel.innerText = 'bubbleSort';
    sortKind = 'bubbleSort';
  }
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.innerText = 'Sorting...';
  setTimeout(() =>{
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.innerText = sortTime;
}, 50);

});

/*** ДОБАВИТЬ ФРУКТ ***/

const addFruit = (kind, color, weight) => {
  let fruit = { 
    kind: kind,
    color: color,
    weight: weight
  }
  fruits.push(fruit);

}

addActionButton.addEventListener('click', () => {

  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if ((kindInput.value == "") || (weightInput.value == "") || (weightInput.value === '0')){
    alert('Ошибка! Необходимо заполнить все поля: наименование фрукта, вес, цвет! Вес должен быть больше 0!');
    return false;
  }

  addFruit(kindInput.value, colorInput.value, weightInput.value);
    display();
  kindInput.value = "";
  colorInput.value = "";
  weightInput.value = "";
});


