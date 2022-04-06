
import {useRef} from 'react';
import {setUIChatList} from '../../chat-list/ChatList'
import { getActiveUser } from '../../DataBase';

function ChatSearch() {
    const searchBox = useRef(null);

    const search = function() {
        console.log(searchBox.current.value);
        setUIChatList(getActiveUser().contactList.filter((value) => {
            console.log(value.name)
            return value.name.toLowerCase().includes(searchBox.current.value.toLowerCase());
        }));
    }


    return (
        <div className="input-group flex-nowrap" 
            style={{ padding: '10px', background:'white', borderRadius:'10px'
                    // borderTop:'none', borderRight:'none', borderLeft:'none', borderColor:'#e8e6e1', borderBottomWidth:'thin' }}>
                }}>
            <span className="input-group-text" id="addon-wrapping" 
                style={{ border:'black', background: 'rgb(250, 250, 250)' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>

            </span>
            <input ref={searchBox} type="text" className="form-control" placeholder="Search a contact" aria-label="Username" aria-describedby="addon-wrapping" onKeyUp={search}
                style={{ border:'none', background: 'rgb(250, 250, 250)' }} />
        </div>

    );
}

export default ChatSearch;