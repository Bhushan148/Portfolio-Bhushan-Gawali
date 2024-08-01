const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

let reviews = [];

app.get('/api/reviews', (req, res) => {
    const totalReviews = reviews.length;
    const averageRating = (totalReviews === 0) ? 0 : (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1);
    res.json({ totalReviews, averageRating });
});

app.post('/api/reviews', (req, res) => {
    const { rating } = req.body;
    if (rating >= 1 && rating <= 5) {
        reviews.push({ rating });
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(400).json({ message: 'Invalid rating' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
