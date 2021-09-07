import db from './db.js';
import express from 'express'
import cors from 'cors'


const app = express();
app.use(cors());
app.use(express.json());


app.get('/matricula', async (req,resp) =>{
    try{
         let consulta = await db.tb_matricula.findAll()
         resp.send(consulta)
    }catch(e){
        resp.send(e)
    }
})


app.post('/matricula', async (req,resp) =>{
    try{
    let nomealuno = req.body.nm_aluno;
    let nrchamada = req.body.nr_chamada;
    let nomecurso = req.body.nm_curso;
    let nmturma = req.body.nm_turma;


    let adicionar = {
        nm_aluno: nomealuno,
        nr_chamada: nrchamada,
        nm_curso: nomecurso,
        nm_turma: nmturma
    }
  
    let msmusu = await db.tb_matricula.findOne({
        where:{nm_aluno:nomealuno}
    })

    if(msmusu != null)
    return resp.send("Usuário já existe")

    let resposta = await db.tb_matricula.create(adicionar);
    resp.send(resposta) 
    }catch(e){
        resp.send(e)
    }

})

app.put('/matricula/:id', async (req,resp) =>{
    try{
    let id = req.params.id;
    let nomealuno = req.body.nm_aluno;
    let nrchamada = req.body.nr_chamada;
    let nomecurso = req.body.nm_curso;
    let nmturma = req.body.nm_turma;

    let alterar = await db.tb_matricula.update({
        nm_aluno:nomealuno,
        nr_chamada:nrchamada,
        nm_curso:nomecurso,
        nm_turma:nmturma
    },
    {
        where: {id_matricula: id }
    })

    resp.sendStatus(200)

}catch(e){
 resp.send(e)
}
})

app.delete('/matricula/:id', async (req,resp) =>{
    try{
    let id = req.params.id;

    let del = db.tb_matricula.destroy({ 
        where: {id_matricula: id}
    })

    resp.sendStatus(200)
}catch(e){
   resp.send('lascou bahia')
}
})






app.listen(process.env.PORT,

    x => console.log(`Server up at port ${process.env.PORT}`))