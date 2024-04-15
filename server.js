const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

// connect to MondoDB
mongoose.
connect('mongodb+srv://Yeab:yeab@nodejscluster0.aiwdel2.mongodb.net/?retryWrites=true&w=majority&appName=nodejsCluster0').
then(() => console.log('MongoDB connected')).
catch(err => console.error('MongoDB connection error:',err));

// Middleware to parse JSON bodies
app.use(express.json());

// Createing a Schema for messages
const messageSchema = new mongoose.Schema({
    text: String
})  

// Creating a model for messages
const Message = mongoose.model('Yeabsira',messageSchema);

// authentication
const authenticate = (req,res,next) => {
    const {authorization} = req.headers;
    if(authorization && authorization.startsWith('Bearer ')){
        const token = authorization.split(' ')[1];
        if(token === 'secret_token'){
            return next();
        }
    }
    res.status(401).json({error: 'You are unauthorized'})
}

// Route to get all messages
app.get('/api/messages',authenticate,async(req, res)=>{
    try{
        const messages = await Message.find();
        res.json(messages);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})



// app.get('/api/protected', authenticate,(req,res) =>{
//     res.json({message: 'You are authorized to access this resource'})
// })


// app.get('/api/hello',(req,res)=> {
//     res.json({message: 'This is API talking'})
// })

// Route to add new message
app.post('/api/messages', authenticate, async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    try {
        const newMessage = await Message.create({ text });
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})