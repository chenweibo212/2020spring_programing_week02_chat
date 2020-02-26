const React = require("react");

function TwitterFilter(props){
  const tweetUser = props.tweetUser|| [];
  const [selecedtUser] = React.useState("");

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

  const userList = getUnique(tweetUser, "user");
  console.log(userList);

  const updateUser = event => {
    selectedUser(event.target.value);
  };

  const filterDropdown = tweetUser.filter(function(result) {
    return result.user === userList.user;
  });


  return (
    <div>
        {userSelect}
    </div>
  )
}

module.exports = TwitterFilter;