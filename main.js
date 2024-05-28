const url = "https://api.github.com/users/kamranahmedse";

fetch(url).then(
  function(request) {
    if (request.status !== 200) {
      console.log(`Looks like there was a problem.\nStatus Code: ${request.status}`);
    }

    request.json().then(
      function(data) {
        console.log(data);
      }
    )

    return;
  }
).catch(
  function(err) {
    console.log(`The following error was found: ${err}`);
  }
);

function buildProfile(profileData) {

}