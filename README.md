***Vible-API***

| Method | Route | Description |
| --- | --- | --- |
| POST | `/signup` | Creates a new user in the database |
| POST | `/login` | Verifies email and password and returns a JWT |
| GET | `/verify` | Used to verify JWT stored on the client |
| POST | `/notes` | Creates a new note in the database |
| GET | `/notes` | Retrieves all notes from the database |
| GET | `/notes/:noteId` | Retrieves a specific note by ID |
| PUT | `/notes/:noteId` | Updates a specific note by ID |
| DELETE | `/notes/:noteId` | Deletes a specific note by ID |
| POST | `/todo` | Creates a new to-do item in the database |
| GET | `/todo` | Retrieves all to-do items for the authenticated user |
| GET | `/todo/:toDoId` | Retrieves a specific to-do item by ID |
| PUT | `/todo/:toDoId` | Updates a specific to-do item by ID |
| DELETE | `/todo/:toDoId` | Deletes a specific to-do item by ID |
