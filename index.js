const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('API is live. Use POST /bfhl with JSON array.');
});


app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({
            is_success: false,
            message: "Input must be an array under key 'data'."
        });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    data.forEach(item => {
        if (!isNaN(item)) {
            const num = parseInt(item);
            if (num % 2 === 0) {
                even_numbers.push(item);
            } else {
                odd_numbers.push(item);
            }
            sum += num;
        } else if (/^[a-zA-Z]+$/.test(item)) {
            alphabets.push(item.toUpperCase());
        } else {
            special_characters.push(item);
        }
    });

    const concat_string = alphabets
        .map(ch => ch.toLowerCase())
        .reverse()
        .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
        .join('');

    res.status(200).json({
        is_success: true,
        user_id: "Ajay_kumar_Pappuri_26112004",
        email: "pappuriajaykumar7@gmail.com",
        roll_number: "22BCE9621",
        even_numbers,
        odd_numbers,
        alphabets,
        special_characters,
        sum: sum.toString(),
        concat_string
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});