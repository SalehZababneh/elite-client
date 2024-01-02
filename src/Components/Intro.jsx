import React, { useEffect, useState } from 'react'
import intro from "../assets/Photos/intro.jpg"
import "./intro.css";
const Intro = () => {
  const [text, setText] = useState('Elite Sports Wears');

  const flickerLetter = letter => 
    `<span style="animation: text-flicker-in-glow ${Math.random()*4}s linear both">${letter}</span>`;

  const colorLetter = letter => 
    `<span style="color: hsla(${Math.random()*360}, 100%, 80%, 1);">${letter}</span>`;

  const flickerAndColorText = text => 
    text
      .split('')
      .map(flickerLetter)
      .map(colorLetter)
      .join('');

  const neonEffect = () => {
    setText(flickerAndColorText('Elite Sports Wears'));
  };

  useEffect(() => {
    neonEffect();
  }, []);
  return (
<>
    <div className='landing-page'>
    <img src={intro} alt='img'/>
    {/*Link start from root /--    and a will reload the page we do not need that Link not request just replaced */}
    
  </div>
    <h1 className='elite-header' dangerouslySetInnerHTML={{ __html: text }} onClick={neonEffect}></h1>
    </>)
}

export default Intro