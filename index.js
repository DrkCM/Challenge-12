const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const idList = []
const teamMembers = []

const appMenu = () => {
//Function to creat your team template
   function buildTeam() {
      if(!fs.existsSync(OUTPUT_DIR)) {
         fs.mkdirSync(OUTPUT_DIR)
      }
      fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
   }
// Function to create a new intern into the team
   function addIntern() {
      inquirer.prompt([
         {
             type: "input",
             name: "internName",
             message: "What is your intern name"
         },
         {
            type: "input",
            name: "internId",
            message: "What is your intern id"
        },
        {
         type: "input",
         name: "internEmail",
         message: "What is your intern email"
        },
        {
         type: "input",
         name: "internSchool",
         message: "What is your intern school"
        }
       ]).then(answers => {
          const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internGithub);
          teamMembers.push(intern);
          idList.push(answers.internId);
          createTeam()
       })
   }
// Function to create a new engineer into the team
   function addEngineer() {
      inquirer.prompt([
         {
             type: "input",
             name: "engineerName",
             message: "What is your engineer name"
         },
         {
            type: "input",
            name: "engineerId",
            message: "What is your engineer id"
        },
        {
         type: "input",
         name: "engineerEmail",
         message: "What is your engineer email"
        },
        {
         type: "input",
         name: "engineerGithub",
         message: "What is your engineer github"
        }
       ]).then(answers => {
          const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
          teamMembers.push(engineer);
          idList.push(answers.engineerId);
          createTeam()
       })
   }
// Funtion to create your team
   function createTeam() {
      inquirer.prompt([
        {
           type: "list",
           name: "memberChoice",
           message: "Which type of team member would you like to add?",
           choices: [
               "Engineer",
               "Intern",
               "I do not want to add any more team members"
           ]
        }
      ]).then(userChoices => {
         if(userChoices.memberChoice === "Engineer")  {
            // Add Engineer
            addEngineer();
         } else if(userChoices.memberChoice === "Intern") {
            // Add Intern
            addIntern();
         } else {
            // build team function
            buildTeam();
         }
      })
   }
// Funtion to create the manager of your team
   function createManager(){
    console.log("Please build your team");
    inquirer.prompt([
       {
         type: "input",
         name: "managerName",
         message: "What is the team manager's name?",
         validate: answer => {
            if(answer !== ""){
                return true
            }
            return "Please enter at least one character."
         }
       },
       {
         type: "input",
         name: "managerId",
         message: "What is the team manager's id?"
       },
       {
         type: "input",
         name: "managerEmail",
         message: "What is the team manager's email?"
       },
       {
         type: "input",
         name: "managerOfficeNumber",
         message: "What is the team manager's office number?"
       }
    ]).then(answers => {
         const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
         console.log(manager);
         teamMembers.push(manager);
         idList.push(answers.managerId);
         createTeam();
    })
   }

   createManager();
}

appMenu();