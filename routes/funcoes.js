



async function getLgin(tabela, res, req) {
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