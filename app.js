const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, function() {
    console.log(`Server running. PORT: ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("OK!");
});