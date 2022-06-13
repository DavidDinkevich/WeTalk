import './chat-search.css'

import {useRef} from 'react';
import {refreshUIChatList, setUIChatList} from '../../chat-list/ChatList'
import { getContacts, updateUserContacts } from '../../DataBase';

export let searchBox;

function ChatSearch() {
    const _searchBox = useRef(null);
    searchBox = _searchBox;

    const search = function() {
        // setUIChatList(getContacts().filter((value) => {
        //     return value.name.toLowerCase().includes(searchBox.current.value.toLowerCase());
        // }));
        // refreshUIChatList();
        updateUserContacts();
    }


    return (
        <div className="input-group flex-nowrap chat-search-container" 
                    // borderTop:'none', borderRight:'none', borderLeft:'none', borderColor:'#e8e6e1', borderBottomWidth:'thin' }}>
                >
            <span className="input-group-text chat-search-icon" id="addon-wrapping" >
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
            <input ref={_searchBox} type="text" className="form-control chat-search-box" placeholder="Search a contact" aria-label="displayName" aria-describedby="addon-wrapping" onKeyUp={search} />
        </div>

    );
}

export default ChatSearch;