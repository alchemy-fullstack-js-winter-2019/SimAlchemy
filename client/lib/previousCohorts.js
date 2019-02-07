const inquirer = require('inquirer');
const config = require('../config');
const request = require('superagent');
const { getToken } = require('../helper/tokens');
const menu = require('./menu');

const previousCohorts = (token, teacher) => {
  
  // console.log(token);
  return request
    .get(`${config.url}/teachers/${teacher._id}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .then(({ body }) => {
      const prevCohorts = body.map((c, i) => {
        return `cohort${i + 1}: stress: ${c.stress}, sleep: ${c.sleep}, knowledge: ${c.knowledge}`;
      });
      // const { stress, sleep, knowledge } = ban;
      return inquirer.prompt([
        {
          type: 'list',
          name: 'results',
          message: `Here are your previous cohorts:\n${prevCohorts.join('\n')}`,
          choices: ['Go back']
        }
      ])
        .then((choice) => {
          if(choice.results === 'back') {
            console.log('hiya');
            return menu(token, teacher);
          }
        // console.log('token', token);
        // console.log('teacher', teacher);
        // console.log('here', typeof menu);
        });
    })
    .catch(console.log);
};

module.exports = previousCohorts;
