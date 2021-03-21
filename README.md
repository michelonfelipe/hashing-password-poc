# hashing password poc

## Setup and running
First, you'll need to run docker-compose to run both app and database:

```bash
docker-compose up
```

After it's finished, run **on another terminal**, the command to run the migrations:

```bash
docker-compose run app npm run migrate
```

And that's it for the setup.

## How to test?
### Seeing the data on the database
It's better to see directly from the database, so it would be the same thing as a hacker would see.
To connect to the database, you can run:

```bash
psql postgres://user:pass@localhost:35432/hashing-password-poc
```

After that, you can see how the passwords are being stored on the _users_ table:

```sql
SELECT * FROM users;
```

And the result should be somehing like this:
```
 id |     email      | password | salt |         createdAt          |         updatedAt
----+----------------+----------+------+----------------------------+----------------------------
  1 | email@mail.com | password |      | 2021-03-21 19:32:00.808+00 | 2021-03-21 19:32:00.808+00
```

### Saving data on the database
To save password and see how they are stored, you can make a request with the following body (simulating an user sing-in):

```json
{
  "email": "email@mail.com",
  "password": "password"
}
```

The path will depend on which method of encryption you'll want to use:

`POST /{plain | md5 | sha256 | salt | pepper}`

A curl request, as an example, would be as this:

```bash
curl -X POST \
  -d '{"email": "email@mail.com", "password": "password"}' \
  --header "Content-Type: application/json" \
  localhost:3000/pepper
```

**NOTE:** Remember to send the _Content-Type: application/json_ header

## Why do we need all of this?

Well... I'm sure some people have already talked about this:

- [OWASP guide: Password Storage Cheat Sheet ~~those guys know something about security~~](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [Tom Scott on Computerphile: How NOT to Store Passwords!](https://www.youtube.com/watch?v=8ZtInClXe1Q)
- [Some random person o StackOverflow](https://stackoverflow.com/a/1054033)
