const React = require('react');
const qs = require('qs');
var moment = require('moment');

function TwitterForm(props){
    const [user, setUser] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [date, setDate] = React.useState(new Date());

    const updateUser = (event) => {
        setUser(event.target.value);
    }

    const updateMessage = (event) => {
        setMessage(event.target.value);
    }

    const updateDate = () => {
        var event = new Date;
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        var currentTime = event.toLocaleTimeString('en-US', { hour12: false }) + ' ' + "on" + ' ' + event.toLocaleDateString(undefined,options);
        const timerId = setInterval(() => {
            setDate(currentTime);
        }, 1000);
    }
    
    var textStr1 = 'A Boat, O beautiful, was the werewolf, in his evil forest, We took him, to the carnival, and he started, crying, when he saw, the Ferris wheel, Electric, green and red tears, flowed down, his furry cheeks, He looked, like a boat, out on the dark, water'
    var textArray1 = textStr1.split(',');

    const autoText1 = () => {
        var index = 0;
        const timerId = setInterval(() => {
            setUser("Richard Brautigan");
            setMessage(textArray1[index]);
            index = (index + 1) % (textArray1.length);
        }, 2000)
        return () => { clearInterval(timerId) };
    }

    const asyncSubmit = async () => {
        const response = await fetch('/api/tweet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(({user, message, date})),
        });
        if (response.status === 200) {
            setUser("");
            setMessage("");
            setDate("");
            if (props.onTweeted) props.onTweeted();
        }
    }

    updateDate();

    const handleSubmit = (event) => {
        updateDate();
        asyncSubmit();
        event.preventDefault();
    }

    const handleAutoSubmit = (event) => {
        autoText1();
        asyncSubmit();
        event.preventDefault();
    }

    return (
        <div className="inputBox">
            <form onSubmit={handleSubmit}>
                <label>
                name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#8239;
                <input type="text" value={user} onChange={updateUser} placeholder="a user" maxlength="15" size="15"/>
                </label>
                <a>&nbsp;&nbsp;&nbsp;</a>
                <label>
                <br />
                message&nbsp;&nbsp;&nbsp;
                <input type="text" value={message} onChange={updateMessage} placeholder="a message" maxlength="100" size="130"/>
                </label>
                <a>&nbsp;&nbsp;&nbsp;</a>
                <input type="submit" value="send"/>
            </form>
        </div>

    );
}

module.exports = TwitterForm;