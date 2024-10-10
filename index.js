import express from 'express';
import topics from './data.js'

const app = express();
const port = process.env.PORT || 7000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/all-courses', (req, res) => {
    res.json(topics);
});

app.get("/courses/:id", (req, res) => {
    try {
        const topic = findCourseById(req.params.id);
        res.json(topic);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.get("/courses/name/:name", (req, res) => {
    try {
        const topic = findCourseByName(req.params.name);
        res.json(topic);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// UTILITY FUNCTIONS
function findCourseById(id) {
    const topic = topics.find(topic => topic.id === Number(id));
    if (topic === undefined) {
        throw new Error(`Topic with id ${id} was not found.`);
    }
    return topic;
}

function findCourseByName(name) {
    const topic = topics.find(topic => topic.topic.toLowerCase() === name.toLowerCase());
    if (topic === undefined) {
        throw new Error(`Topic with name ${name} was not found.`);
    }
    return topic;
}