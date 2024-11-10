

const carousels = document.querySelectorAll('.carousel');
carousels.forEach(carousel => {
    init(carousel);
})

function init(carousel) {
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const wrap = carousel.querySelector('.slides');
    const slides = carousel.querySelectorAll('.slide');

    const speed = 3000;
    const total = slides.length;
    let current = 1;

    const next = (isAuto = false) => {
        clearInterval(interval);
        current = current < total
            ? current + 1
            : isAuto ? 1 : current;
        afterChange();
    }

    const prev = () => {
        clearInterval(interval);
        current = current > 1 ? current - 1 : current;
        afterChange();
    }

    const afterChange = () => {
        wrap.style.marginLeft = (current - 1) * -100 + `%`;
        interval = setInterval(auto, speed);
        checkBtn();
    }

    const checkBtn = () => {
        current === 1
            ? prevBtn.setAttribute('disabled', true)
            : prevBtn.removeAttribute('disabled');

        current === total
            ? nextBtn.setAttribute('disabled', true)
            : nextBtn.removeAttribute('disabled');
    }

    const auto = () => next(true);
    checkBtn();

    let interval = setInterval(auto, speed);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
}