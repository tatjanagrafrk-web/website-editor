import React, {useState, useRef, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';
const cards = [
 {title:'Мечтать',image:'cottage',eyebrow:'Маленькие миры',description:'У каждой большой мечты есть маленькое начало. Представь уютный домик среди цветов, загадай желание и позволь воображению показать дорогу.'},
 {title:'Пробовать',image:'kitten',eyebrow:'Сладкие открытия',description:'Немного любопытства, щепотка смелости и что-нибудь сладкое. Пробуй новое в своём ритме — самые тёплые открытия начинаются с простого «а что, если?».'},
 {title:'Создавать',image:'forest',eyebrow:'Твоё волшебство',description:'Превращай маленькие искры вдохновения в то, что можно увидеть и обнять. Здесь можно быть собой, придумывать необычное и создавать собственные чудеса.'}
];
function Star({className=''}) {return <span aria-hidden="true" className={`star ${className}`}><span>★</span><i>⌣</i></span>}
function App(){
 const [active,setActive]=useState(null); const dialog=useRef(null); const lastFocus=useRef(null);
 useEffect(()=>{if(active!==null){lastFocus.current=document.activeElement;dialog.current.showModal();document.body.style.overflow='hidden';}else{dialog.current?.close();document.body.style.overflow='';lastFocus.current?.focus();}return()=>{document.body.style.overflow='';}},[active]);
 const scroll=()=>document.getElementById('stories').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 return <main className="world" id="home">
 <div className="ambient" aria-hidden="true"/>
 <header className="glass header"><a href="#home" className="logo" aria-label="TATI — главная">TATi<span>★</span></a><span className="divider"/><nav aria-label="Главная навигация"><a className="nav-active" href="#home">Главная</a><a href="#stories">Истории</a><button onClick={()=>setActive('about')}>Обо мне</button></nav></header>
 <section className="glass hero" aria-labelledby="hero-title"><div className="hero-tab" aria-hidden="true"/><div className="hero-copy"><span className="dash"/><h1 id="hero-title">Здесь живёт<br/>волшебство<span className="heart">♡</span></h1><p>Маленькие идеи, большие мечты<br className="desktop-break"/> и немного чудес.</p><div className="cta-wrap"><button className="cta" onClick={scroll}>Заглянуть <span aria-hidden="true">⟶</span></button><Star className="smiling-star"/></div></div>
 <div className="welcome-group"><div className="dragon" role="img" aria-label="Сонный сиреневый дракончик"/><div className="glass welcome"><span className="dash"/><h2>Привет!</h2><p>Рада, что ты здесь<span>♡</span></p></div></div>
 <span className="spark spark-one" aria-hidden="true">✦</span><span className="spark spark-two" aria-hidden="true">✦</span><span className="spark spark-three" aria-hidden="true">✧</span>
 </section>
 <section id="stories" className="glass stories" aria-label="Маленькие шаги к волшебству"><div className="stories-tab" aria-hidden="true"/>{cards.map((card,i)=><button className={`story story-${i}`} key={card.title} onClick={()=>setActive(i)} aria-haspopup="dialog"><div className={`story-image ${card.image}`} role="img" aria-label={card.eyebrow}/><div className="story-label"><div><h2>{card.title}</h2><span className="mini-dash"/></div><span className="round-arrow" aria-hidden="true">➜</span></div></button>)}</section>
 <dialog ref={dialog} className="glass modal" onCancel={e=>{e.preventDefault();setActive(null)}} onClick={e=>{if(e.target===dialog.current)setActive(null)}} aria-labelledby="modal-title"><button className="close" aria-label="Закрыть окно" onClick={()=>setActive(null)}>×</button>{typeof active==='number'?<><div className={`modal-image story-image ${cards[active].image}`}/><div className="modal-copy"><span className="eyebrow">{cards[active].eyebrow}</span><h2 id="modal-title">{cards[active].title}</h2><p>{cards[active].description}</p><span className="modal-spark" aria-hidden="true">✦</span></div></>:<div className="modal-copy about"><Star/><span className="eyebrow">Давай познакомимся</span><h2 id="modal-title">Привет, я Тати ♡</h2><p>Это мой маленький уголок волшебства. Здесь живут добрые истории, уютные идеи и мечты, которым хочется подарить крылья. Рада, что ты здесь!</p></div>}</dialog>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);
