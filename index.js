import express from 'express';
import topics from './data.js'
const app = express();
const port = 7000;


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/all-courses' , (req, res) => {
    res.json(topics);
});

app.get("/courses/:id", (req, res) => {
    const topic = findCourseById(req.params.id);
    res.json(topic);
});

app.listen(port, () => {
    console.log(`App listening on localhost:${port}`);
});


// UTILITY FUNCTIONS
function findCourseById(id) {
    const topic = topics.find(topic => topic.id === Number(id));
    if (topic === undefined) {
        throw new Error(`Topic with id ${id} was not found.`);
    }
    return topic;
}
