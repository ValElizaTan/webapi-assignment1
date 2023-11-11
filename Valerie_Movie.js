const database = [
    { title: 'Fantastic Beasts: The Crimes of Grindelwald', year: 2018, time: '11:00', rating: 6.5 },
    { title: 'Jumanji: The Next Level', year: 2019, time: '15:00', rating: 6.7 },
    { title: 'Cinderella', year: 2021, time: '13:00', rating: 4.4 },
    { title: 'Enola Holmes 2', year: 2022, time: '17:00', rating: 6.8 },
    { title: 'Red White & Royal Blue', year: 2023, time: '14:00', rating: 7 },
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
    updateMovie(index, newTime) {
        const movie = database.find(movie => movie.title.toLowerCase().includes(index.toLowerCase()));
        if (movie) {
            movie.time = newTime;
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

    // This function checks the availability of the booking of seats
    bookSeat(seats, row, number) {
        const seatIndex = seats.findIndex(seat => seat.row === row && seat.number === number);

        if (seatIndex == -1) {
            seats.push({ row: row, number: number });
            console.log(`Seat ${row}${number} has been successfully booked.`);
        } else {
            console.log(`Seat ${row}${number} is already booked.`);
        }
    },

    // This function adds new Movie
    addMovie(name, year, timing, rating) {
        const movie = { 'name': name, 'year': year, 'time': timing, 'rating': rating };
        database.push(movie);
        return movie;
    },

}

const movie = require('./Valerie_Movie.js');
//Search for Movie
console.log("Seearch Movie: " + movie.searchMovie("jumanji"));

//Updates Movie Time
console.log(movie.updateMovie("Cinderella", "12:00"));

//calculate price base on type of ticket
console.log("Total Price: " + movie.getTicketPrice('gold class', 6));

//Get Rating of the Movie
console.log("Rating of selected movie: " + movie.getRating("red"));

//Adds new Movie
console.log(movie.addMovie("The Shining", '1980', '02:00', '8.4'));

//Availability of seat
console.log(movie.bookSeat(seat, 'A', 1));