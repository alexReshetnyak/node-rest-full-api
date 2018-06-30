
console.log('Before');
getUser(1, getRepositories);

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading a user from DB...');
    callback({id: id, gitHubUserName: 'Alex'});
  },2000);
}

function getRepositories(username) {
  setTimeout(() => {
    console.log('Reading repositories from Db..');
    displayRepositories(['repo1', 'repo2', 'repo3']);
  }, 2000);
}

function displayRepositories(repositories) {
  console.log(repositories, 'repositories');
}
