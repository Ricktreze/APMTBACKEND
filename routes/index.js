var express = require('express');
const cors = require('cors');
const app = express();
const { ObjectId } = require("mongodb");
const pool = require('../db/db');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
  origin: '*' // Replace with your React app's URL
}));
var router = express.Router();
const PORT = 4011;
const db = require("../db/db");


async function getDatabase(tabela, res, codAssociadoDe, codAssociadoAte, nomeAssociado) {
  try {
    const connection = await pool.getConnection();
    let query = 'SELECT * FROM ' + tabela
    if (codAssociadoAte) {
      query += " WHERE CODASSOCIADO >= '" + codAssociadoDe + "' AND CODASSOCIADO <= '" + codAssociadoAte + "'";

    } else if (codAssociadoDe) {
      query += " WHERE CODASSOCIADO = '" + codAssociadoDe + "'"
    }
    if (nomeAssociado) {
      if (codAssociadoDe || codAssociadoAte) {
        query += " AND"
      } else {
        query += " WHERE"
      }
      query += " (NOME LIKE '%" + nomeAssociado + "%' OR CODASSOCIADO LIKE '" + nomeAssociado + "')"
    }
    // query += " ORDER BY CODASSOCIADO DESC"
    const [rows, fields2] = await connection.execute(query);
    res.json(rows)
    connection.release();
    res.status(201)


  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(402)
    res.json(error.toString())
  }
}

async function deleteDatabase(tabela, codAssociado, res) {
  try {
    const connection = await pool.getConnection();
    let query = "DELETE FROM " + tabela + " WHERE CODASSOCIADO = '" + codAssociado + "'"

    const [rows, fields2] = await connection.execute(query);
    res.json(rows)
    connection.release();
    res.status(201)


  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(402)
    res.json(error.toString())
  }
}

async function postDatabase(tabela, associadosBody, res) {
  let collumValues = ""
  let onlyValues = ""

  try {
    const connection = await pool.getConnection();
      collumValues += "CodAssociado,"
      const [rowsCodAssociado, fields] = await connection.execute("SELECT CODASSOCIADO FROM tblassociado ORDER BY codassociado DESC LIMIT 1");
      if (!associadosBody.CodAssociado || (associadosBody.CodAssociado <= rowsCodAssociado[0].CODASSOCIADO)) {
        onlyValues += (rowsCodAssociado[0].CODASSOCIADO + 1) + ","
      } else {
        onlyValues += associadosBody.CodAssociado + ","
      }


    if (associadosBody.Nome) {
      collumValues += "Nome,"
      onlyValues += "'" + associadosBody.Nome + "',"
    }
    if (associadosBody.Cpf) {
      collumValues += "Cpf,"
      onlyValues += "'" + associadosBody.Cpf + "',"
    }
    if (associadosBody.Pessoa) {
      collumValues += "Pessoa,"
      onlyValues += "'" + associadosBody.Pessoa + "',"
    }
    if (associadosBody.DtInclusao) {
      collumValues += "DtInclusao,"
      onlyValues += "'" + associadosBody.DtInclusao + "',"
    }
    if (associadosBody.Situacao) {
      collumValues += "Situacao,"
      onlyValues += "'" + associadosBody.Situacao.charAt(0).toUpperCase() + "',"
    }
    if (associadosBody.DtFimSituacao) {
      collumValues += "DtFimSituacao,"
      onlyValues += "'" + associadosBody.DtFimSituacao + "',"
    }
    if (associadosBody.DtNascimento) {
      collumValues += "DtNascimento,"
      onlyValues += "'" + associadosBody.DtNascimento + "',"
    }
    if (associadosBody.DtCasamento) {
      collumValues += "DtCasamento,"
      onlyValues += "'" + associadosBody.DtCasamento + "',"
    }
    if (associadosBody.Sexo) {
      collumValues += "Sexo,"
      onlyValues += "'" + associadosBody.Sexo + "',"
    }
    if (associadosBody.Conjuge) {
      collumValues += "Conjuge,"
      onlyValues += "'" + associadosBody.Conjuge + "',"
    }
    if (associadosBody.Abreviatura) {
      collumValues += "Abreviatura,"
      onlyValues += "'" + associadosBody.Abreviatura + "',"
    }
    if (associadosBody.Endereco) {
      collumValues += "Endereco,"
      onlyValues += "'" + associadosBody.Endereco + "',"
    }
    if(associadosBody.Bairro){
           collumValues += "Bairro,"
           onlyValues += "'" + associadosBody.Bairro + "',"
    }
    if(associadosBody.Cidade){
           collumValues += "Cidade,"
           onlyValues += "'" + associadosBody.Cidade + "',"
    }
    if(associadosBody.UF){
           collumValues += "UF,"
           onlyValues += "'" + associadosBody.UF + "',"
    }
    if(associadosBody.Cep){
           collumValues += "Cep,"
           onlyValues += "'" + associadosBody.Cep + "',"
    }
    if(associadosBody.Pais){
           collumValues += "Pais,"
           onlyValues += "'" + associadosBody.Pais + "',"
    }
    if(associadosBody.FoneRes){
           collumValues += "FoneRes,"
           onlyValues += "'" + associadosBody.FoneRes + "',"
    }
    if(associadosBody.FoneCom){
           collumValues += "FoneCom,"
           onlyValues += "'" + associadosBody.FoneCom + "',"
    }
    if(associadosBody.Celular){
           collumValues += "Celular,"
           onlyValues += "'" + associadosBody.Celular + "',"
    }
    if(associadosBody.EMail){
           collumValues += "EMail,"
           onlyValues += "'" + associadosBody.EMail + "',"
    }
      if(associadosBody.Profissao){
           collumValues += "Profissao,"
           onlyValues += "'" + associadosBody.Profissao + "',"
    }
    if(associadosBody.Igreja){
           collumValues += "Igreja,"
           onlyValues += "'" + associadosBody.Igreja + "',"
    }
    if(associadosBody.Complemento){
           collumValues += "Complemento,"
           onlyValues += "'" + associadosBody.Complemento+"',"
    }
    if(associadosBody.Cargo){
           collumValues += "Cargo,"
           onlyValues += "'" + associadosBody.Cargo + "',"
    }
    if(associadosBody.Denominacao){
           collumValues += "Denominacao,"
           onlyValues += "'" + associadosBody.Denominacao+"',"
    }
    if(associadosBody.EmissaoCarne){
           collumValues += "EmissaoCarne,"
           onlyValues += "'" + associadosBody.EmissaoCarne.charAt(0).toUpperCase()+"',"
    }
    if(associadosBody.Obs){
           collumValues += "Obs,"
           onlyValues += "'" + associadosBody.Obs+"',"
    }


    collumValues = collumValues.substring(0, collumValues.length - 1).toUpperCase();
    onlyValues = onlyValues.substring(0, onlyValues.length - 1).toUpperCase();


    let query = "INSERT INTO " + tabela + " (" + collumValues + ") VALUES (" + onlyValues + ")"

    const [rows, fields2] = await connection.execute(query);
    res.json(rows)
    connection.release();
    res.status(201)


  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    res.status(402)
    res.json(error.toString())
  }
}

app.get("/api/associados", async (req, res) => {
  const codAssociadoDe = req.query.codAssociadoDe;
  const codAssociadoAte = req.query.codAssociadoAte;
  const nomeAssociado = req.query.nomeAssociado;
  getDatabase("tblassociado", res, codAssociadoDe, codAssociadoAte, nomeAssociado)
});

app.get("/api/missionarios", async (req, res) => {
  getDatabase("tblmissionario", res)
});

app.get("/api/envolvimento", async (req, res) => {
  getDatabase("tblenvolvimento", res)
});

app.delete("/api/associados", async (req, res) => {
  const codAssociadoDe = req.query.codAssociado;
  deleteDatabase("tblassociado", codAssociadoDe, res)
});


app.post("/api/associados", async (req, res) => {
  const associadosBody = req.body;
  res.header('Access-Control-Allow-Origin', '*');

  postDatabase("tblassociado", associadosBody, res)

});

//authentication
app.post("/login", (req, res) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === "luiz" && req.body.password === "123"){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.JWT_EXPIRES)
      });
      return res.json({ token: token });
    }
    
    res.status(401).json({message: "Invalid credentials!"});
})

app.post("/api/missionarios", async (req, res) => {
  const card2Body = req.body;
  const objPrices = {
    nomeCard2: card2Body.nomeCard2,
    nomeCard1: card2Body.nomeCard1,
    detalhe: card2Body.detalhe,
    _idCard1: card2Body._idCard1
  }
  const result = await db.insert("card2", objPrices);
  res.status(201)

});

module.exports = router;

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));
