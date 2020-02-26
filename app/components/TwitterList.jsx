const React = require('react');


function TwitterList(props){
    const tweets = props.tweets || [];

    const [user, selectedtUser] = React.useState(null);

    const updateUserDisplay = event => {
        selectedtUser(event.target.value);
    };
    
    const tweetReversed = tweets.reverse();

    const getUnique = (arr, comp) => {
        const unique = arr
          //store the comparison values in array
          .map(e => e[comp])
    
          // store the keys of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)
    
          // eliminate the dead keys & store unique objects
          .filter(e => arr[e])
    
          .map(e => arr[e]);
    
        return unique;
      }
    
    const userList = getUnique(tweetReversed, "user");

    const userSelect = (
        <select value={user} onChange={updateUserDisplay}>
        <option value="all">view all</option>
          {userList.map(item => (
            <option key={item.id} value={item.user}>
              {item.user}
            </option>
          ))}
        </select>
    );

    const filterDropdown = tweetReversed.filter(function(result) {
        return result.user === user;
    });

    let filteredDisplay;
    let filtered;

    if (userSelect.props.value === "all" || userSelect.props.value === null) {
        filtered = false;
    } else {
        filtered = true;
    }

    const handleDeleteMessage  = async (userID) => {
        const requestOptions = {
            method: 'DELETE',
        };

        const response = await fetch ("/api/tweets/delete/" + userID, requestOptions);

        if(response === 200) {
            //console.log(tweets);
        }

        alert("deleting...");
        window.location.reload();
    }

    const handleDeleteAll = async () => {
        const requestOptions = {
            method: 'DELETE',
        };

        const response = await fetch ("/api/tweets/deleteall", requestOptions);

        if(response === 200) {
            //console.log(tweets);
        }

        alert("deleting all...");
        window.location.reload();
    }

    filteredDisplay = filtered ? 
    <div>
    {filterDropdown.map(tweetReversed => (
      <div className="singleM" key={tweetReversed._id} >
        <div className="singleMLeft"><strong>[{tweetReversed.user}]</strong><a className="time"> : </a> {tweetReversed.message} <a className="time"> at {tweetReversed.date}</a></div> 
        <div className="singleMRight"><button onClick={() => handleDeleteMessage(tweetReversed._id)}>delete</button></div>
        <br />
      </div>
    ))}
    </div> : <div>
    {tweetReversed.map(tweetReversed => (
      <div className="singleM" key={tweetReversed._id} >
        <div className="singleMLeft"><strong>[{tweetReversed.user}]</strong><a className="time"> : </a> {tweetReversed.message} <a className="time"> at {tweetReversed.date}</a></div>
        <div className="singleMRight"><button onClick={() => handleDeleteMessage(tweetReversed._id)}>delete</button></div>
        <br />
      </div>
    ))}
    </div>;

    const listComponents = tweets.map( (tweet, idx) => {
        return (
            <li key={idx}> {/* In a list of components, each one needs a unique key, or else you'll get a warning */}
                <strong>{tweet.user}:</strong> {tweet.message}
            </li>
        )
    });
  
    return (
        <div>
            <div>
            <p></p>
            <div className="viewbox"><div className="viewboxL">&nbsp;a chat room that is balancing on a wire</div><div className="viewboxM">{userSelect}</div><div className="viewboxR"><button onClick={handleDeleteAll}>delete all</button></div></div>
            </div>
            <div className="mDisplay">{filteredDisplay}</div>
        </div>
    )
}

module.exports = TwitterList;