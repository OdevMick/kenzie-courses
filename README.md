# **KenzieCourses**

Api com features de cadastro de Usuários e Cursos, com a possibilidade de se cadastrar aos cursos disponíveis.

## Rotas Users

</br>

<h3>Cadastro de usuários</h3>

`POST /users`

```json
{
  "firstName": "Teste",
  "lastName": "Teste",
  "email": "teste@mail.com",
  "age": 25,
  "password": "1234"
}
```

> Resposta para requisição que deu certo:

`POST /users - STATUS 201`

```json
{
  "id": "29788820-4fa9-4d61-bb5c-5b8b5ac9f606",
  "firstName": "Teste",
  "lastName": "Teste",
  "email": "teste@mail.com",
  "isAdm": false,
  "createdAt": "2022-07-2T10:25:36.551Z",
  "updatedAt": "2022-05-2T10:25:36.551Z",
  "courses": []
}
```

</br></br>

<h3> Login de usuários</h3>

`POST /login `

```json
{
  "email": "teste@mail.com",
  "password": "1234"
}
```

> Resposta para requisição que deu certo:

`POST /login - STATUS 200`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU0NWFiMTBkLTJmZjUtNDRmYy1hMzM0LWQ3ZGZkMzk4OTJiYiIsImlhdCI6MTY1Mzc2MDMzNywiZXhwIjoxNjUzNzYzOTM3fQ.ECH1rK8WvGkzY2ghEP5TJW4ZD8cOjeGfyvgSwn9ZAfs"
}
```

</br></br>

<h3>Atualização de usuários</h3>

`PATCH /users/:id `

**É necessário ter Bearer Token**

```json
{
  "firstName": "Teste",
  "lastName": "Teste1",
  "email": "teste@mail.com",
  "age": 25,
  "password": "1234"
}
```

> Resposta para requisição que deu certo:

`PATCH /users/:id - STATUS 200`

```json
{
  "id": "e45ab10d-2ff5-44fc-a334-d7dfd39892bb",
  "firstName": "Teste",
  "lastName": "Teste1",
  "email": "teste@mail.com",
  "isAdm": false,
  "createdAt": "2022-07-2T10:25:36.551Z",
  "updatedAt": "2022-07-2T10:30:21.742Z",
  "courses": []
}
```

</br></br>

<h3>Busca de um usuário</h3>

`GET /users/:id - NO BODY `

**É necessário ter Bearer Token**

> Resposta para requisição que deu certo:

`GET /users/:id - STATUS 200`

```json
{
  "id": "e45ab10d-2ff5-44fc-a334-d7dfd39892bb",
  "firstName": "Teste",
  "lastName": "Teste1",
  "email": "teste@mail.com",
  "isAdm": false,
  "createdAt": "2022-07-2T10:25:36.551Z",
  "updatedAt": "2022-07-2T10:30:21.742Z",
  "courses": []
}
```

</br></br>

<h3>Busca de todos os usuários</h3>

`GET /users - NO BODY `

**É necessário ter Bearer Token**

> Resposta para requisição que deu certo:

`GET /users - STATUS 200`

```json
[
  {
    "id": "e45ab10d-2ff5-44fc-a334-d7dfd39892bb",
    "firstName": "Teste",
    "lastName": "Teste1",
    "email": "teste@mail.com",
    "isAdm": false,
    "createdAt": "2022-07-2T10:25:36.551Z",
    "updatedAt": "2022-07-2T10:30:21.742Z",
  },
  {
    "id": "af6d45ff-55f7-4ebe-87fc-15a9a97293e8",
    "firstName": "Teste2",
    "lastName": "Teste2",
    "email": "teste2@mail.com",
    "isAdm": true,
    "createdAt": "2022-07-2T10:30:41.124Z",
    "updatedAt": "2022-07-2T10:30:41.124Z"
  },...
]
```

</br></br>

## Rotas Courses

</br>

<h3>Cadastro de cursos</h3>

`POST /courses `

**É necessário ter Bearer Token**

```json
{
  "courseName": "Física",
  "duration": "200h"
}
```

> Resposta para requisição que deu certo:

`POST /courses - STATUS 201`

```json
{
  "id": "f5b22474-a500-4a54-a04f-c25edf8e852c",
  "courseName": "Física",
  "duration": "200h"
}
```

</br>

<h3>Busca de todos os cursos</h3>

`GET /courses - NO BODY `

**É necessário ter Bearer Token**

> Resposta para requisição que deu certo (usuário não ADMIN):

`GET /courses - STATUS 200`

```json
[
  {
    "id": "f5b22474-a500-4a54-a04f-c25edf8e852c",
    "courseName": "Física",
    "duration": "200h"
  },
  {
    "id": "b36d5f01-a191-4796-b1c0-4713cc5e52be",
    "courseName": "Python-I",
    "duration": "3 meses"
  },...
]
```
</br>

> Resposta para requisição que deu certo (usuário ADMIN):

`GET /courses - STATUS 200`

```json
[
  {
    "id": "f5b22474-a500-4a54-a04f-c25edf8e852c",
    "courseName": "Física",
    "duration": "200h",
    "student": []
  },
  {
    "id": "b36d5f01-a191-4796-b1c0-4713cc5e52be",
    "courseName": "Python-I",
    "duration": "3 meses",
    "student": [
      {
        "id": "e45ab10d-2ff5-44fc-a334-d7dfd39892bb",
        "firstName": "Teste",
        "lastName": "Teste1",
        "email": "teste@mail.com"    
      }
    ]
  },...
]
```

</br>

<h3>Atualiza o curso</h3>

`PATCH /courses/:id `

```json
{
  "duration": "2 meses"
}
```

**É necessário ter Bearer Token**

> Resposta para requisição que deu certo

`PATCH /courses/:id - STATUS 200`

```json
[
  {
    "id": "f5b22474-a500-4a54-a04f-c25edf8e852c",
    "courseName": "Física",
    "duration": "2 meses"
  }
]
```
