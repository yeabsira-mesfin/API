const express = require('express');
const app = express();
const PORT = 3000;
// created 
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

app.get('/api/protected', authenticate,(req,res) =>{
    res.json({message: 'You are authorized to access this resource'})
})


app.get('/api/hello',(req,res)=> {
    res.json({message: 'This is API talking'})
})

app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})