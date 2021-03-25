import { NextApiRequest, NextApiResponse } from 'next'

export default (request:NextApiRequest, response:NextApiResponse) => {
  const user = [
    {id: 1, name: 'Igor'},
    {id: 2, name: 'Diego'},
    {id: 3, name: 'Mayk'},
  ]
  return response.json(user)
}
