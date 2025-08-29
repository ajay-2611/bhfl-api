const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/process-array', (req, res) => {
    const { array } = req.body;

    if (!Array.isArray(array)) {
        return res.status(400).json({ status: "error", message: "Input must be an array." });
    }

    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialChars = [];
    let sum = 0;

    array.forEach(item => {
        if (typeof item === 'number') {
            if (item % 2 === 0) {
                evenNumbers.push(item);
            } else {
                oddNumbers.push(item);
            }
            sum += item;
        } else if (typeof item === 'string') {
            if (/^[a-zA-Z]$/.test(item)) {
                alphabets.push(item.toUpperCase());
            } else if (/[^a-zA-Z0-9]/.test(item)) {
                specialChars.push(item);
            }
        }
    });

    const reversedAlphabets = alphabets
        .map(char => char.toLowerCase())
        .reverse()
        .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
        .join('');

    res.json({
        status: "success",
        userId: "Ajay123",
        emailId: "pappuriajaykumar7@xyz.com",
        collegeRollNumber: "22BCE9621",
        evenNumbers,
        oddNumbers,
        alphabets,
        specialCharacters: specialChars,
        sumOfNumbers: sum,
        reversedAlphabetsAlternatingCaps: reversedAlphabets
    });
});

app.get('/', (req, res) => {
    res.send('API is live. Use POST /process-array with JSON array.');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});