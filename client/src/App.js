import React, { useState } from 'react';
import { FaCookie, FaCookieBite } from 'react-icons/fa';

import { useCookiesStore } from './useCookiesStore';

const App = () => {
  
  const {
    cookies,
    addCookie
  } = useCookiesStore(state => ({
    cookies: state.cookies,
    addCookie: state.addCookie
  }));

  const [isEatenList, setIsEatenList] = useState(new Array(cookies.length).fill(false));

  document.addEventListener('mousedown', (event) => {
    if (event.detail > 1) {
      event.preventDefault();
    }
  }, false);

  const eatCookie = async (id, index) => {
    const prev_id = cookies.find(cookie => cookie.id === id).prev_id;
    const is_possible = !prev_id || cookies.find(cookie => cookie.id === prev_id).count >= 10;

    if (is_possible) {
      setIsEatenList(isEatenList => ([...isEatenList.slice(0, index), true, ...isEatenList.slice(index + 1)]));
      addCookie(id);
      setTimeout(() => { 
        setIsEatenList(isEatenList => ([...isEatenList.slice(0, index), false, ...isEatenList.slice(index + 1)]));
      }, 100);

      await fetch('/eat-cookie', {
        method: 'POST', 
        body: JSON.stringify({
          id,
          cookies
        }), 
        headers: { 
          'Content-Type': 'application/json'
        }
      });
    }
  };

  return (
    <div className='App'>
      <div className='CookieClicker'>
        <h1 className='Title'>Cookies, my cookies...🤤</h1>
        <div className='Cookies'>
          {cookies.map((cookie, index) => (
            <div
              key={cookie.id} 
              className='Cookie'
            >
              <i
                className='CookieIcon'
                style={{ 
                  opacity: !cookie.prev_id || cookies.find(item => item.id === cookie.prev_id).count >= 10 ? 1 : 0.4,
                  transition: 'opacity 0.3s'
                }}
                onClick={() => eatCookie(cookie.id, index)}
              >
                { !isEatenList[index] ? (
                  <FaCookie
                    size={92} 
                    color={cookie.color}
                  />
                ) : (
                  <FaCookieBite
                    size={92} 
                    color={cookie.color}
                  />
                )}
              </i>
              <p className='CookieCount'>{cookie.id}: {cookie.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
