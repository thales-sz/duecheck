import React from 'react'

function TableHeadComm() {
  return (
    <thead className="bg-gray-300 rounded-t-md rounded">
      <tr>
        <th className="border">Nº Processo</th>
        <th className="border max-w-10">Tribunal</th>
        <th className="border">Link de acesso</th>
        <th className="border">Conteúdo</th>
        <th className="border">Tipo do documento</th>
        <th className="border">Data de inclusão</th>
        <th className="border">Valor da causa</th>
      </tr>
    </thead>
  )
}

export default TableHeadComm
