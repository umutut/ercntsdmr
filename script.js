const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('movie');


const seats_1 = document.querySelectorAll('.seat:not(.reserved)');
const seats_2 = document.querySelectorAll('.seat_l:not(.reserved)');

const seats = [...seats_1, ...seats_2];

function calculateTotal() {
    const selectedSeats_x = container.querySelectorAll('.seat.selected');
    const selectedSeats_l = container.querySelectorAll('.seat_l.selected');

    const reservedSeats = container.querySelectorAll('.seat.reserved, .seat_l.reserved');

    const selectedSeats = [...selectedSeats_x, ...selectedSeats_l]
    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat) {
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function(seat) {
        seatsArr.push(seat);
    });

    // [1,3,5]
    let selectedSeatIndexs = selectedSeatsArr.map(function(seat) {
        return seatsArr.indexOf(seat);
    });

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * select.value;

    saveToLocalStorage(selectedSeatIndexs);

    if(reservedSeats.length >= 0){
        let reservedArr = [];

        for(let item of reservedSeats){
            reservedArr.push(item);
        }

        let reservedIndexes = reservedArr.map(function(seat) {
            return seats.indexOf(seat);
        });

        saveReserved(reservedIndexes);
    }

}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !=null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const reservedMate = JSON.parse(localStorage.getItem('selectedReserved'));

    if (reservedMate !=null && reservedMate.length > 0) {
        seats.forEach(function(seat, index) {
            if (reservedMate.indexOf(index) > -1) {
                seat.classList.add('reserved');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex;
    }
}

function saveToLocalStorage(indexs) {
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex);
}


let saveReserved = (indexes) => {
    localStorage.setItem('selectedReserved', JSON.stringify(indexes));
}   

getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function(e) {
   if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
       e.target.classList.toggle('selected');
       calculateTotal()      
    }
});

window.addEventListener("contextmenu", e => e.preventDefault());

container.addEventListener('contextmenu', function(e) {
    if((e.target.classList.contains('seat') || e.target.classList.contains('seat_l')) && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('reserved');
        calculateTotal()      
    }else if((e.target.classList.contains('seat') || e.target.classList.contains('seat_l')) && e.target.classList.contains('reserved')){
        e.target.classList.toggle('reserved');
        calculateTotal()  
    }
});
 

container.addEventListener('click', function(e) {
    if(e.target.classList.contains('seat_l') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal()      
     }
});

select.addEventListener('change', function(e) {
    calculateTotal();  
});


