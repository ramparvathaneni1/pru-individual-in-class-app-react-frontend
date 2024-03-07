# Pru Individual In Class App React Frontend Lab

## Objectives

To create a React front end application that communicates with your Node Express Backend API.

<br>

## Due Date

- Please submit a Pull Request on March 08, 2024 by end of day.
- Your app will be marked as "Complete" if you have the 4 routes working in the Requirement section below.

<br>

## Requirements

Add the following functionality to your React frontend like we did with the Todo App:

1. `GET` all of your resources
2. `POST` to create a new instance of a resource
3. `PUT` to update an instance of a resource
4. `DELETE` to delete an instance of a resource

You can use the [solution branch](https://git.generalassemb.ly/ModernEngineering/full-stack-react/blob/solution/README.md) for reference. However, feel free to take a different approach!

<br>

## Optional Additional Features

1. Filter your fields. For example: Filtering Todos into 2 sections: complete and todo
1. Implement the Finished the List! button to clear out all Todos
1. Add the ability to update the title of a todo (you could add logic to make the title input field clickable in the UI)
1. Use React Router to show the details for a single todo

<br>

## Reference Links

- [React Frontend Connect to your Express Backend Lesson](https://git.generalassemb.ly/ModernEngineering/full-stack-react/blob/main/README.md)
- [Pru Individual In Class App (Backend)](https://git.generalassemb.ly/ModernEngineering/pru-individual-in-class-app)
- [Express Backend API Lesson](https://git.generalassemb.ly/ModernEngineering/express-to-do-api)

<br>

## Make sure your Express Backend Application is running before proceeding with The React Frontend

Go into the Express Backend application that you built last week and make sure that the server is running. `cd` into your folder and run `npm run start`. It should want to run on post `3001`. If you get an error that the port is in use, try this:

##### To stop a running port

If you get a message that a port is in use, you can kill it with this command: `sudo kill -9 $(sudo lsof -t -i:3000)`

- Replace `3000` with the port number you want to stop.
- [Reference](https://tecadmin.net/kill-process-on-specific-port/)

<br>

## To get started

1. In your VM, open your Terminal and change into your Documents folder: `cd ~/mef`.

1. Fork and clone down your fork of this repo using the SSH URL option under the green "Code" button. Your URL will look similar to this: `git clone git@git.generalassemb.ly:<THIS_SHOULD_BE_YOUR_USERNAME>/pru-individual-in-class-app-react-frontend.git`.

   - [You can find Fork and Clone instructions here](https://git.generalassemb.ly/ModernEngineering/start-here#fork-and-clone-lessonslabs)

1. `cd` into the `react-frontend-starter` folder. You will build your app in this folder.
1. Run `npm i` to install the packages
1. Run `npm start` to start the server

<br>

## To submit your work

[How to commit and push your work to GitHub](https://git.generalassemb.ly/ModernEngineering/start-here#to-commit-and-push-your-work-to-github)

<br>

## Submit a Pull Request

Please put your full name in the title of the Pull Request.

[Submit a Pull Reqest](https://git.generalassemb.ly/ModernEngineering/start-here#submitting-your-work-via-pull-request)
