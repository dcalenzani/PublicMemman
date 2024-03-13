# MEMBERS MANAGER V.0.01
This repo contains a PostgreSQL database and a frontend NextJs app to run it. You can use any PSQL hosting method, even self-hosting, but you have to set up the .env by yourself. 

The systems manages users, lessons and special events, while also showing them on a UI. 

Management can download reports based on KPI from each month.

## V.0.01
- UI model
- DB init.sql
- SQL connections to the frontend of the page (performing CRUD operations)
- CSV downloads for predefined tables

## Future development
- User based access
- "Dashboard"

## Requirements
- NodeJs
- NextJs (with Tailwind + Typescript)
- PostgreSQL DB somewhere

## Usage

Run
```
git clone https://github.com/dcalenzani/PublicMemman.git
cd PublicMemman
npm install
```

then, setup a .env file following the template
`DATABASE_URL="postgres://USER:PASSWORD@HOST"`
