
//Класс ibg
function ibg() {

	let ibg = document.querySelectorAll("._ibg");

	for (let i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();
/////////////////////////////
///BurgerMenu
let burger = document.querySelector(".icon-menu");
let burgerBody = document.querySelector(".header__menu")
burger.addEventListener("click", function (e) {
	burger.classList.toggle("menu-open");
	burgerBody.classList.toggle("_active")
}
);

let headerScroll = pageYOffset;
document.addEventListener('scroll', function () {
	//header scroll
	const headerWrapper = document.querySelector('.header__wrapper');
	if (pageYOffset > headerScroll) {
		headerWrapper.classList.add('_hide');
	} else {
		headerWrapper.classList.remove('_hide');
	}
	headerScroll = pageYOffset;
	//////////////////////////////////////////////
	//Animation scroll
	const animItems = document.querySelectorAll('._animeItem');

	if (animItems.length > 0) {
		function animOnScroll(params) {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = ofsset(animItem).top;
				const animStart = 4;

				let animItemPoint = window.innerHeight - animItemHeight / animStart;
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}

				if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {

					if (!animItem.classList.contains('_active')) {
						animItem.classList.add('_active');
					}
				} else {
					animItem.classList.remove('_active');
				}
			}
		}
		function ofsset(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
		}
	}
	animOnScroll();
})


//Equlaizer//////////
const MAX_BAR_HEIGHT = 18;

addBarSpans();

setInterval(() => {
	setRandomBars();
}, 200);

// Main programm (repeats)
function setRandomBars(maxBarHeight) {
	const bars = document.getElementsByClassName('equalizer-bar');

	for (let i = 0; i < bars.length; i++) {

		let spans = bars[i].getElementsByTagName('span');
		let activeSpanCount = getActiveSpans(spans);
		let newHeight = getRandomHeight(MAX_BAR_HEIGHT);

		for (let j = 0; j < spans.length; j++) {

			if (newHeight > activeSpanCount) {
				spans[j].style.opacity = '1';
			} else if (j > newHeight) {
				spans[j].style.opacity = '0';
			}

			// set little opacity
			let upperSpan = MAX_BAR_HEIGHT - j;
			if (newHeight > MAX_BAR_HEIGHT - 5 && upperSpan < 5) {
				spans[j].style.opacity = '0.' + upperSpan;
			}

		}
	}
}

// Returns the number of active spans
function getActiveSpans(spans) {
	let counter = 0;

	for (let i = 0; i < spans.length; i++) {
		if (spans[i].style.opacity > 0) counter++;
	}

	return counter;
}

// Returns a random number between 1 and 20
function getRandomHeight(maxBarHeight) {
	return Math.round(Math.random() * (maxBarHeight - 1)) + 1;
}

// Add the default spans
function addBarSpans() {
	const bars = document.getElementsByClassName('equalizer-bar');

	let html = '';
	for (let j = 0; j < MAX_BAR_HEIGHT; j++) {
		html += '<span></span>';
	}

	for (let i = 0; i < bars.length; i++) {
		bars[i].innerHTML = html;
	}
}


window.addEventListener('load', function () {
	document.querySelector('.line-image').classList.add('_active');
	document.querySelector('.subscribe__image').classList.add('_active');
	document.querySelector('.page__nextlevel').classList.add('_active');
})
//Добавляю епізоди
//Всі епізоди
//Формування епізодів
function loadEpisodes(data) {

	const episodesItems = document.querySelector('.episodes__body');


	data.episodes.forEach(item => {

		const episodeId = item.id;
		const episodeButton = item.button;
		const episodeImage = item.image;
		const episodeTitle = item.title;
		const episodeNumber = item.number;
		const episodeText = item.text;
		const episodDataSet = item.dataset;

		let episodeTemplate = `<div id="${episodeId}" class="body-episodes__episodcont animate__animated 
		animate__pulse">
			<div class="body-episodes__episod">
				<div class="body-episodes__image _ibg">
					<img src="img/episodes/${episodeImage}" alt="image">
				</div>
				<div class="body-episodes__content">
					<button data-set="${episodDataSet}" type="button" class="body-episodes__button _btn-gray">${episodeButton}</button>
					<div class="body-episodes__number">Episode ${episodeNumber}</div>
					<div class="body-episodes__title _title">${episodeTitle}</div>
					<div class="body-episodes__text">${episodeText}</div>
					<button type="button" class="body-episodes__buttondet _btn-blue">View Episode Details</button>
				</div>
			</div>
		</div>`;


		episodesItems.insertAdjacentHTML('beforeEnd', episodeTemplate);

	}
	);
};
// Запрос всі епізоди
async function getEpisodes() {
	const file = "json/episodes.json";
	let response = await fetch(file, {
		method: "GET"
	});
	if (response.ok) {
		let result = await response.json();
		loadEpisodes(result);

	} else {
		alert("Ошибка");
	}
};
//Показати всі епізоди
let buttonAll = document.querySelector('.buttons-episodes__buttonall');
buttonAll.addEventListener('click', function () {
	let episod = document.querySelectorAll('.body-episodes__episodcont');
	for (let i = 0; i < episod.length; i++) {
		episod[i].classList.add('_hide');
		setTimeout(function () {
			episod[i].remove();
		}, 300)
	}
	setTimeout(function () { getEpisodes(); }, 300);

});
//Епізоди по категорії

function loadEpisodesBtn(data, btn) {

	const episodesItems = document.querySelector('.episodes__body');

	data.episodes.forEach(item => {
		if (item.dataset == btn) {
			const episodeId = item.id;
			const episodeButton = item.button;
			const episodeImage = item.image;
			const episodeTitle = item.title;
			const episodeNumber = item.number;
			const episodeText = item.text;
			const episodDataSet = item.dataset;

			let episodeTemplate = `<div id="${episodeId}" class="body-episodes__episodcont animate__animated 
			animate__pulse">
			<div class="body-episodes__episod">
				<div class="body-episodes__image _ibg">
					<img src="img/episodes/${episodeImage}" alt="image">
				</div>
				<div class="body-episodes__content">
					<button data-set="${episodDataSet}" type="button" class="body-episodes__button _btn-gray">${episodeButton}</button>
					<div class="body-episodes__number">Episode ${episodeNumber}</div>
					<div class="body-episodes__title _title">${episodeTitle}</div>
					<div class="body-episodes__text">${episodeText}</div>
					<button type="button" class="body-episodes__buttondet _btn-blue">View Episode Details</button>
				</div>
			</div>
			</div>`;
			episodesItems.insertAdjacentHTML('beforeEnd', episodeTemplate);

		}
	}
	);
};
async function getEpisodesBtn(btn) {
	const file = "json/episodes.json";
	let response = await fetch(file, {
		method: "GET"
	});
	if (response.ok) {
		let result = await response.json();
		loadEpisodesBtn(result, btn);

	} else {
		alert("Помилка");
	}
};

let episodesContainer = document.querySelector('.episodes__container');
episodesContainer.addEventListener('click', function (e) {
	let targetElement = e.target;
	let btn = targetElement.getAttribute('data-set');
	let episod = document.querySelectorAll('.body-episodes__episodcont');

	if (btn == "gear") {
		for (let i = 0; i < episod.length; i++) {
			episod[i].classList.add('_hide');
			setTimeout(function () {
				episod[i].remove();
			}, 300)
		}
		setTimeout(function () { getEpisodesBtn(btn); }, 300);
	}
	if (btn == "TipsTricks") {
		for (let i = 0; i < episod.length; i++) {
			episod[i].classList.add('_hide');
			setTimeout(function () {
				episod[i].remove();
			}, 300)
		}
		setTimeout(function () { getEpisodesBtn(btn); }, 300);
	}
	// Show details
	if (targetElement.classList.contains('h')) {
		let parentTarget = targetElement.parentNode;
		let textremove = parentTarget.querySelector('.body-episodes__textadd');
		textremove.classList.add('_hide');
		setTimeout(function () {
			textremove.remove();
		}, 500);
		targetElement.classList.remove('h');
		setTimeout(function () { targetElement.innerHTML = "View Episode Details"; }, 500)

	} else {
		if (targetElement.classList.contains('body-episodes__buttondet')) {
			let textadd = `<div class="body-episodes__textadd">
		<p class="body-episodes__p">Details List:</p>
		<ul>
			<li class="body-episodes__item">Lorem ipsum dolor sit amet consectetur adipisicing elit</li>
			<li class="body-episodes__item">Lorem ipsum dolor sit amet.</li>
			<li class="body-episodes__item">Lorem ipsum dolor sit, amet consectetur adipisicing.</li>
		</ul>
	</div>`;
			targetElement.insertAdjacentHTML('beforeBegin', textadd);
			let parentTarget = targetElement.parentNode;
			let textremove = parentTarget.querySelector('.body-episodes__textadd');
			setTimeout(function () { textremove.classList.add('_show'); }, 500);
			setTimeout(function () { targetElement.innerHTML = "Hide Episode details"; }, 500);
			targetElement.classList.add('h')
		}
	}
});
// Form validation

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const input = document.querySelector('.body-subscribe__email');
const button = document.querySelector('.body-subscribe__button');
const inputName = document.querySelector('.body-subscribe__name');

function isNameLat(value) {
	return /[a-z]/i.test(value);
}
function isEmailValid(value) {
	return EMAIL_REGEXP.test(value);
}

button.addEventListener('click', function (event) {
	if (isEmailValid(input.value)) {
		input.style.color = 'green';
	} else {
		input.style.color = 'red';
		event.preventDefault();
		input.value = "Wrong Email!"
	}
	if (isNameLat(inputName.value)) {
		inputName.style.color = 'green';
	} else {
		inputName.style.color = 'red';
		event.preventDefault();
		inputName.value = "Enter name in Latin!"
	}

})
document.addEventListener("click", function (e) {
	const targetElement = e.target;
	if (!targetElement.closest('.body-subscribe__button') && !targetElement.closest('.body-subscribe__email')) {
		inputName.value = "";
		inputName.style.color = `rgba(255, 255, 255, 0.7)`;
		input.value = "";
		input.style.color = `rgba(255, 255, 255, 0.7)`;
	}
})
//

