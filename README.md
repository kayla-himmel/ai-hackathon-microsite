# ai-hackathon-microsite

## Building the Project

First-time users, run these commands in the terminal:

1. `npm install`
2. `npm run build` to watch for SCSS changes (and update the compiled CSS file) and launch the project with node

After the time, you can just run:

1. `npm run build`

View the built project at http://localhost:8080/

## Git Naming Conventions

- Branches:
  - type of ticket / short name of ticket
  - Ex: `feature/project-setup`
- Commit Messages:
  - Ticket number: Commit message written in past tense
  - Ex: `AI-16: Added project setup`
- See for ticket numbers: <https://github.com/users/kayla-himmel/projects/1>

## Releases

- Project is setup to use Github Pages
- On merge, Github automatically starts a workflow in Actions to build and deploy to production
