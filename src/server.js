import app from "./app.js"

const PORT = 3666

app.listen(PORT, ()=>{
    console.log(`Servifor rodando em http://localhost:${PORT}`);
    
})