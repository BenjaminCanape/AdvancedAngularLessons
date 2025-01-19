# Advanced Angular Lessons
As a Front-end Lead Developer, I want to share my knowledge about some technologies and best practices. So, here are a few lessons for improving your knowledge about Angular


## 1. Learn to master NgRx
First of all, before trying to do these exercises, you need to read and learn about NgRx, what it is, when to use it and how to implement it
<a href="https://buymeacoffee.com/benjamincanape" target="_blank">Click here to learn first</a>

Then the goal of the exercises I will propose to you here will be to modify an notebook app using a service to store the list of notes created to create a store with NgRx and make this list available even when the navigator is refreshed.  

Here you can play with the final application: https://ngrx-notes-final.netlify.app/

The code is here: <a href="https://github.com/BenjaminCanape/AdvancedAngularLessons/tree/ngrx-notes-final">ngrx-notes-final </a>

So, let's start: 

* Clone this repository
* Go to this branch: <a href="https://github.com/BenjaminCanape/AdvancedAngularLessons/tree/ngrx-notes-start">ngrx-notes-start</a>
* ```npm i --legacy-peer-deps```
* ```ng serve --no-hmr``` (there's a problem of fouc with hmr activated)

### Exercise 1 : Configure NgRx
1. Install the necessary dependencies:

   ``` npm install @ngrx/store @ngrx/effects @ngrx/store-devtools @ngrx/schematics```



2. Configure the global state :
    * Create a **store** folder in  **src/app**. It is here that you will place any files related to the store
    * **Inside** this folder, you will create an **app.state.ts** file and a **note** folder.
    * **Inside the note folder**, create a **note.reducer.ts** file
    * In this file,  you will create an interface relate to the NoteState so: 
   ``` 
   // eslint-disable-next-line @typescript-eslint/no-empty-object-type
   export interface NoteState {}
   ```
   
    * Go back to the **app.state.ts** and edit it with this code:
   ``` 
   import { createReducer } from '@ngrx/store';

   // eslint-disable-next-line @typescript-eslint/no-empty-object-type
   export interface NoteState {}

   const initialState: NoteState = {};

   export const noteReducer = createReducer(initialState);
   ``` 

    * Now, in your **app.config.ts**, add this:
   ``` 
   const reducers: ActionReducerMap<AppState> = { notes: noteReducer };
   ``` 
   and in your appConfig object, provide the store with:
    ``` 
    provideStore(reducers),
   ``` 

Now, your store is configured. Congratulations.

(... The exercises are under construction so please wait)





