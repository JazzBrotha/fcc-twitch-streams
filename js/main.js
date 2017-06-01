//jshint esversion:6

async function checkIfLive(channel) {
  try {
    const stream = await fetch(
      `https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/streams/${channel}`
    );
    const response = await stream.json();
    return response.stream;
  } catch (err) {
    console.log(err);
  }
}

async function getChannelInfo(channel) {
  try {
    const stream = await fetch(
      `https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/channels/${channel}`
    );
    const response = await stream.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

function generateStreamHtml(status, channel) {
  const streamsContainer = document.getElementById('streams-container');
  const logo =
    channel.logo ||
    'https://seeklogo.com/images/T/twitch-tv-logo-51C922E0F0-seeklogo.com.gif';
  if (channel.hasOwnProperty('error')) {
    streamsContainer.innerHTML += `
    <div class="twelve columns value pt-5">
      <img class="value-img logo-img" src="">
      <h2 class="value-multiplier"></h2>
      <p class="value-description">${channel.error}: ${channel.message}</p>
    </div>
    `;
  } else if (status !== null) {
    streamsContainer.innerHTML += `
    <div class="twelve columns value pt-5">
      <img class="value-img logo-img" src="${logo}">
      <h2 class="value-multiplier">${channel.display_name}   <span class="circle-big green">&#x25CF;</span></h2>
      <p class="value-description">${channel.game} - ${channel.status}</p>
      <p class="value-description">
        <span>
          <svg class="va-middle" height="16px" version="1.1" viewBox="0 0 16 16" width="16px" x="0px" y="0px" class="svg-glyph_live">
            <path clip-rule="evenodd" d="M11,14H5H2v-1l3-3h2L5,8V2h6v6l-2,2h2l3,3v1H11z" fill-rule="evenodd"></path>
          </svg>
          ${channel.followers}
        </span>
        <span>
          <svg class="va-middle" height="16px" version="1.1" viewBox="0 0 16 16" width="16px" x="0px" y="0px" class="svg-glyph_views">
            <path clip-rule="evenodd" d="M11,13H5L1,9V8V7l4-4h6l4,4v1v1L11,13z M8,5C6.344,5,5,6.343,5,8c0,1.656,1.344,3,3,3c1.657,0,3-1.344,3-3C11,6.343,9.657,5,8,5z M8,9C7.447,9,7,8.552,7,8s0.447-1,1-1s1,0.448,1,1S8.553,9,8,9z" fill-rule="evenodd"></path>
          </svg>
          ${channel.views}
        </span>
      </p>      <a class="button button-primary" href="${channel.url}" target="_blank">
      View Channel</a>
      </div>
      `;
  } else {
    streamsContainer.innerHTML += `
    <div class="twelve columns value pt-5">
      <img class="value-img logo-img" src="${logo}">
      <h2 class="value-multiplier">${channel.display_name} <span class="circle-big red">&#x25CF;</span></h2>
      <p class="value-description">
        <span>
          <svg class="va-middle" height="16px" version="1.1" viewBox="0 0 16 16" width="16px" x="0px" y="0px" class="svg-glyph_live">
            <path clip-rule="evenodd" d="M11,14H5H2v-1l3-3h2L5,8V2h6v6l-2,2h2l3,3v1H11z" fill-rule="evenodd"></path>
          </svg>
          ${channel.followers}
        </span>
        <span>
          <svg class="va-middle" height="16px" version="1.1" viewBox="0 0 16 16" width="16px" x="0px" y="0px" class="svg-glyph_views">
            <path clip-rule="evenodd" d="M11,13H5L1,9V8V7l4-4h6l4,4v1v1L11,13z M8,5C6.344,5,5,6.343,5,8c0,1.656,1.344,3,3,3c1.657,0,3-1.344,3-3C11,6.343,9.657,5,8,5z M8,9C7.447,9,7,8.552,7,8s0.447-1,1-1s1,0.448,1,1S8.553,9,8,9z" fill-rule="evenodd"></path>
          </svg>
          ${channel.views}
        </span>
      </p>
      <a class="button button-primary" href="${channel.url}" target="_blank">
      View Channel
      </a>
      </div>
      `;
  }
}

async function getTwitchStreams() {
  const channels = [
    'ESL_SC2',
    'OgamingSC2',
    'cretetion',
    'freecodecamp',
    'storbeck',
    'habathcx',
    'RobotCaleb',
    'noobs2ninjas',
    'brunofin',
    'comster404'
  ];
  for (const channel of channels) {
    const [status, channelInfo] = await Promise.all([
      checkIfLive(channel),
      getChannelInfo(channel)
    ]);
    generateStreamHtml(status, channelInfo);
  }
}

getTwitchStreams();
