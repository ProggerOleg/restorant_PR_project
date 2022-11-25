window.addEventListener('DOMContentLoaded', ()=>{
    // tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if (target == item ) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
         }
    });
    //btns and images
    const photoTabs = document.querySelectorAll('.offer__slide'),
        order = document.querySelector('#current'),
        maxOrder = document.querySelector('#total'),
        btnNext = document.querySelector('.offer__slider-next'),
        btnPrev = document.querySelector('.offer__slider-prev');
    
    function hidePhotos() {
        photoTabs.forEach(item=>{
            item.classList.add('hide');
            item.classList.remove('show');
        });

        order.style.innerHTML = '';
    }

    function showPhotos(i=1){
        photoTabs[i-1].classList.add('show');
        photoTabs[i-1].classList.remove('hide');
    }

    function counter(i='3'){
        if ('0'+ i == maxOrder.innerHTML) {
            order.innerHTML = '01';
             btnNext.classList.add('hide');
        } else {
            btnNext.classList.remove('hide');}

            if ('0'+ i == '01') {
                order.innerHTML = '01';
                 btnPrev.classList.add('hide');
            } else {
                btnPrev.classList.remove('hide');}
        order.innerHTML = '0'+ i;
    }

    hidePhotos();
    showPhotos();
    counter();

    btnNext.addEventListener('click',() => {
        const currentVal = order.innerHTML;
        let a = +currentVal.slice(1);
        hidePhotos();
        counter(a+1);
        showPhotos(+a+1);
    });

    btnPrev.addEventListener('click',() => {
        const currentVal = order.innerHTML;
        let a = +currentVal.slice(1);
        hidePhotos();
        counter(a-1);
        showPhotos(+a-1);
    });



    //timer
    const deadline = '2022-12-19T23:59:59.00Z';


    function getTimeRemaining(endtime){
        const t = Date.parse(endtime)- new Date();
        let days, hours, minutes, seconds;
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000*60*60*24)),
            hours = Math.floor((t/(1000*60*60*60))% 24),
            minutes = Math.floor((t/(1000*60))% 60),
            seconds = Math.floor((t/1000) % 60);
        }
            
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else{
            return num;
        }
    }
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }    
    }

    setClock('.timer', deadline);

    //scrollelements
    const menuItems = document.querySelectorAll('.menu__item'), 
          btnNextItem = document.querySelector('#nextItem'),
          btnPrevItem = document.querySelector('#prevItem');
    let counterItems = 0;
    btnNextItem.addEventListener('click', ()=>{
        menuItems[counterItems].classList.add('hide');
        if (menuItems[counterItems+3]){
            menuItems[counterItems+3].classList.remove('hide');
            counterItems++;
            console.log(counterItems);
        } else {
            btnNextItem.classList.add('hide');
        }
        
    });

    btnPrevItem.addEventListener('click', ()=>{
        // if (menuItems[counterItems] == menuItems[0]) {
        //     btnPrevItem.classList.add('hide');
        // }
        menuItems[counterItems+3].classList.add('hide');
        menuItems[counterItems].classList.remove('hide');
        counterItems--;
        console.log(counterItems);
    });

    //Modal window
    const btnsModal = document.querySelectorAll('[data-modal]'),
            modalWindow = document.querySelector('.modal'),
            closeModal = document.querySelector('[data-close]');

    function OpenModal() {
        modalWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    btnsModal.forEach(item=>{
        item.addEventListener('click',()=>{
            OpenModal();
        });
    });

    function CloseModalFunk() {
        modalWindow.style.display = 'none';
        document.body.style.overflow = '';
    }

    closeModal.addEventListener('click', CloseModalFunk);

    modalWindow.addEventListener('click', (e) =>{
        if (e.target == modalWindow) {
            CloseModalFunk();
        }
    });

    document.addEventListener('keydown', (e)=>{
        if (e.code == "Escape" && modalWindow.style.display!='none') {
            CloseModalFunk() ;
        }
    });

    const modalTimerId = setTimeout(OpenModal, 1000000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            OpenModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
});