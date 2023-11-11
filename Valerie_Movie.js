const database = [
    { title: 'Fantastic Beasts: The Crimes of Grindelwald', year: 2018, time: '11:00', rating: 6.5 },
    { title: 'Jumanji: The Next Level', year: 2019, time: '15:00', rating: 6.7 },
    { title: 'Cinderella', year: 2021, time: '13:00', rating: 4.4 },
    { title: 'Enola Holmes 2', year: 2022, time: '17:00', rating: 6.8 },
    { title: 'Red White & Royal Blue', year: 2023, time: '14:00', rating: 7 },
    { title: 'The Nun', year: 2018, time: '03:00', rating: 5.3 },
    { title: 'Oppenheimer', year: 2023, time: '10:00', rating: 8.5 },
    { title: 'Harry Potter and the Sorcerer Stone', year: 2001, time: '18:00', rating: 7.6 },
    { title: 'Doctor Sleep', year: 2019, time: '12:00', rating: 7.3 },
    { title: 'Barbie', year: 2023, time: '16:00', rating: 7 },
];

const ticket = [
    { type: 'Standard', price: 17 },
    { type: 'IMAX 3D', price: 19 },
    { type: 'Gold Class', price: 29 },
    { type: 'Concession', price: 12 },
];

const seat = [
    { row: 'A', number: 1 },
    { row: 'B', number: 2 },
    { row: 'C', number: 3 },
    { row: 'D', number: 4 },
    { row: 'E', number: 5 },
];

module.exports = {
    // This fucntion is to search for movie details base on movie name 
    searchMovie(title) {
        const movies = database.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
        const titles = movies.map(movie => movie.title + ' (' + movie.year + ')');
        return titles;
    },

    // This function updates the movie timings
    updateTime(index, newTime) {
        const movie = database.find(movie => movie.title.toLowerCase().includes(index.toLowerCase()));
        const timePattern = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
        if (movie && timePattern.test(newTime)) {
            movie.time = newTime;
        }
        else {
            return "Invalid Timing";
        }
        return movie;
    },

    // This function calculates the total price base on the type of ticket & quantity 
    getTicketPrice(name, quantity) {
        let totalPrice = 0;
        for (let a = 0; a < ticket.length; a++) {
            if (ticket[a].type.toLocaleLowerCase() == name.toLocaleLowerCase()) {
                totalPrice = ticket[a].price * quantity;
                break;
            }
        }
        return totalPrice;
    },

    // This function gets the rating of user input Movie name
    getRating(index) {
        const movie = database.find(movie => movie.title.toLowerCase().includes(index.toLowerCase()));
        if (movie) {
            return movie.rating;
        } else {
            return "No Rating Found";
        }
    },

    // This function adds new Movie
    addMovie(name, year, timing, rating) {
        const movie = { 'name': name, 'year': year, 'time': timing, 'rating': rating };
        database.push(movie);
        return movie;
    },

    // This function checks the availability of the booking of seats
    bookSeat(seats, row, number) {
        const seatIndex = seats.findIndex(seat => seat.row === row && seat.number === number);

        if (seatIndex == -1) {
            seats.push({ row: row, number: number });
            return `Seat ${row}${number} has been successfully booked.`;
        } else {
            return `Seat ${row}${number} is already booked.`;
        }
    },

}

const movie = require('./Valerie_Movie.js');
//Search for Movie
console.log("Search Movie: " + movie.searchMovie("Harry")); // input from only movies in db

//Updates Movie Time
console.log(movie.updateTime("Red White & Royal Blue", "12:00")); //input from only movies in db | timing can vary

//calculate price base on type of ticket
console.log("Total Price: " + movie.getTicketPrice('gold class', 3)); // input from only ticket type in db | amount can vary

//Get Rating of the Movie
console.log("Rating of selected movie: " + movie.getRating("the nun")); // input from only movies in db

//Adds new Movie
console.log(movie.addMovie("The Shining", '1980', '02:00', '8.4'));

//Availability of seat
console.log(movie.bookSeat(seat, 'A', 1));