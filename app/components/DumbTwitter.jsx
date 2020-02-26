const React = require("react");
const TwitterList = require("./TwitterList");
const TwitterForm = require("./TwitterForm"); 

/* the main page for the index route of this app */
const DumbTwitter = function() {

  const [tweets, setTweets] = React.useState( [] );

  const fetchTweets = async () => {
    const response = await fetch("api/tweets");
    const body = await response.json();
    setTweets(body);
  }

  React.useEffect(async () => {
    fetchTweets();
  }, []); 


  return ( 
    <div className="whole">
      <p></p>
      <TwitterList tweets={tweets}/>
      <TwitterForm onTweeted={fetchTweets}/>
      <div className="aLine"></div>
    </div>
  );
}

module.exports = DumbTwitter;