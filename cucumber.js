// cucumber.js config for dynamic tag execution and TypeScript support
module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require step-definitions/**/*.ts',
    '--format progress',
    '--format html:reports/cucumber-report.html',
  // Los tags se pasan dinámicamente desde la terminal, ejemplo: npx cucumber-js --tags "@login"
  ].join(' ')
};
