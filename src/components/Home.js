import React from 'react';
const axios = require('axios');

function Home(props) {
  function genNewRoom() {
    axios({
      method: 'post',
      url: 'http://localhost:3030/rooms',
      data: {
        owner: 'test_owner',
      },
    })
    .then(res => console.log(res.data.name))
    .catch(err => console.log(`There was an error: ${err}`));
  }
  return (
    <div>
      <button onClick={genNewRoom}>Create a new presentation</button>
    </div>
  );
}
export default Home;
