const url = "https://api.github.com/users/kamranahmedse";

fetch(url).then(
  function(request) {
    if (request.status !== 200) {
      console.log(`Looks like there was a problem.\nStatus Code: ${request.status}`);
    }

    request.json().then(
      function(data) {
        console.log(data);
        buildProfile(data);
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
  const container = document.querySelector(".container");
  const profile = document.createElement("div");

  // Name
  const name = document.createElement("h1");
  name.innerText = profileData.name;

  const username = createSection(profileData.login, 't', "login", "user: ");
 const dp = createSection(profileData.avatar_url, 'i', "dp");
  const followerFollowing = createSection([profileData.followers, profileData.following], 
    'o', "follower-following", ["followers: ", "following: "]);

  profile.appendChild(name);
  profile.appendChild(username);
  profile.appendChild(dp);
  profile.appendChild(followerFollowing);

  // Bio
  if (profileData.bio) {
    const bio = createSection(profileData.bio, 't', "bio", "bio: ");
    profile.appendChild(bio);
  }

  // Twitter
  if (profileData.twitter_username) {
    const twitter = createSection(`@${profileData.twitter_username}`, 't', "twitter", "twitter: ");
    profile.appendChild(twitter);
  }

  profile.classList.add("profile");
  container.appendChild(profile);

}

function createSection(value, type, className, key=null) {
  const div = document.createElement("div");

  if (type === 't') {
    const p = document.createElement("p");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");

    span1.innerText = key;
    span2.innerText = value;

    p.appendChild(span1);
    p.appendChild(span2);
    div.appendChild(p);
    div.classList.add(className);
  }

  else if (type === 'i') {
    const img = document.createElement("img");
    img.src = value;

    div.appendChild(img);
    div.classList.add(className);
  }

  else if (type === 'o') {
    const p1 = document.createElement("p");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const p2 = document.createElement("p");
    const span3 = document.createElement("span");
    const span4 = document.createElement("span");

    span1.innerText = key[0];
    span2.innerText = value[0];
    span3.innerText = key[1];
    span4.innerText = value[1];

    p1.appendChild(span1);
    p1.appendChild(span2);
    p2.appendChild(span3);
    p2.appendChild(span4);
    div.appendChild(p1);
    div.appendChild(p2);
    div.classList.add(className);
  }

  return div;
}