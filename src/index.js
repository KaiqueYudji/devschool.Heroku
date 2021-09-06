

app.get('/matricula', async (req,resp) =>{
    try{
         let r = db.tb_matricula.findAll()
         resp.send(r)
    }catch(e){
        resp.send( {erro: "ocorreu em erro!"} )
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

    let r = await db.tb_matricula.create(adicionar)
    resp.send(r) 
    }catch(e){
        resp.send(e)
    }

})


app.put('/matricula:id', async (req,resp) =>{
    let id = req.params.id;
    let nomealuno = req.body.nm_aluno;
    let nrchamada = req.body.nr_chamada;
    let nomecurso = req.body.nm_curso;
    let nmturma = req.body.nm_turma;

    let alterar={
        nm_aluno: nomealuno,
        nr_chamada: nrchamada,
        nm_curso: nomecurso,
        nm_turma: nmturma
    }

    let r = await db.tb_matricula.update(alterar, {where:{}})

})