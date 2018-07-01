
console.log('Before');

// getUser(1)
//   .then(({gitHubUserName}) => getRepositories(gitHubUserName))
//   .then(repositories => displayRepositories(repositories))
//   .catch(reason => console.log('Some Error: ', reason));

// ! Async vs await approach
async function displayRepos() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUserName);
    displayRepositories(repos[0]);
  } catch (error) {
    console.error(error);
  }
}
displayRepos();


function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from DB...');
      resolve({id: id, gitHubUserName: 'Alex'});
      // reject(new Error('message'))
    },2000);
  });
}

function getRepositories(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading repositories from Db..', user, 'user');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}

function displayRepositories(repositories) {
  console.log(repositories, 'repositories');
}
