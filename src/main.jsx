import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
const cards = [
  {
    title: "Мечтать",
    image: "cottage",
    eyebrow: "Маленькие миры",
    description:
      "У каждой большой мечты есть маленькое начало. Представь уютный домик среди цветов, загадай желание и позволь воображению показать дорогу.",
  },
  {
    title: "Пробовать",
    image: "kitten",
    eyebrow: "Сладкие открытия",
    description:
      "Немного любопытства, щепотка смелости и что-нибудь сладкое. Пробуй новое в своём ритме — самые тёплые открытия начинаются с простого «а что, если?».",
  },
  {
    title: "Создавать",
    image: "forest",
    eyebrow: "Твоё волшебство",
    description:
      "Превращай маленькие искры вдохновения в то, что можно увидеть и обнять. Здесь можно быть собой, придумывать необычное и создавать собственные чудеса.",
  },
];
function PanelShape({ variant = "hero", mobile = false }) {
  const id = `panel-${variant}${mobile ? "-mobile" : ""}`;
  const paths = {
    hero: "M76 30 H628 Q650 30 665 14 Q679 0 701 0 H757 Q803 0 803 46 V166 Q803 185 828 185 H936 Q996 185 996 245 V448 Q996 508 936 508 H646 Q623 508 607 520 Q595 530 570 530 H76 Q4 530 4 458 V105 Q4 30 76 30 Z",
    stories:
      "M65 16 H456 Q473 16 485 8 Q496 2 515 2 H935 Q996 2 996 64 V350 Q996 413 933 413 H822 Q805 413 794 426 Q784 438 766 438 H650 Q632 438 620 427 Q604 413 582 413 H65 Q4 413 4 349 V80 Q4 16 65 16 Z",
  };
  const mobilePaths = {
    hero: "M53 35 H260 Q276 35 285 24 Q293 14 310 14 H343 Q396 14 396 68 V716 Q396 773 341 773 H293 Q278 773 267 786 Q259 796 244 796 H54 Q4 796 4 744 V94 Q4 35 53 35 Z",
    stories:
      "M51 18 H180 Q194 18 203 10 Q211 3 226 3 H345 Q396 3 396 57 V1383 Q396 1431 348 1431 H308 Q291 1431 281 1440 Q273 1448 257 1448 H218 Q203 1448 193 1440 Q183 1431 168 1431 H54 Q4 1431 4 1380 V74 Q4 18 51 18 Z",
  };
  const path = mobile ? mobilePaths[variant] : paths[variant];
  return (
    <svg
      className={`panel-shape ${mobile ? "mobile-shape" : "desktop-shape"}`}
      viewBox={
        mobile
          ? variant === "hero"
            ? "0 0 400 800"
            : "0 0 400 1452"
          : variant === "hero"
            ? "0 0 1000 534"
            : "0 0 1000 442"
      }
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2=".8">
          <stop stopColor="#fff1c6" stopOpacity=".68" />
          <stop offset=".24" stopColor="#eac3ff" stopOpacity=".46" />
          <stop offset=".54" stopColor="#a9b5ff" stopOpacity=".32" />
          <stop offset=".85" stopColor="#ffd4ea" stopOpacity=".62" />
          <stop offset="1" stopColor="#fff3cc" stopOpacity=".72" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#fffad0" />
          <stop offset=".23" stopColor="#ffbbef" />
          <stop offset=".48" stopColor="#c9eaff" />
          <stop offset=".7" stopColor="#fff0f7" />
          <stop offset="1" stopColor="#ffedbc" />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill={`url(#${id})`}
        stroke={`url(#${id}-edge)`}
        strokeWidth="15"
      />
      <path d={path} fill="none" stroke="#fffaf5" strokeWidth="9" />
      <path
        d={path}
        fill="none"
        stroke="#d7a3ff"
        strokeOpacity=".7"
        strokeWidth="5"
      />
      <path
        d={path}
        fill="none"
        stroke="#fff"
        strokeOpacity=".88"
        strokeWidth="1.8"
      />
    </svg>
  );
}
function Star({ className = "" }) {
  return (
    <span aria-hidden="true" className={`star ${className}`}>
      <span>★</span>
      <i>⌣</i>
    </span>
  );
}
function App() {
  const [active, setActive] = useState(null);
  const dialog = useRef(null);
  const lastFocus = useRef(null);
  useEffect(() => {
    if (active !== null) {
      lastFocus.current = document.activeElement;
      dialog.current.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);
  const scroll = () =>
    document
      .getElementById("stories")
      .scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
  return (
    <main className="world" id="home">
      <div className="ambient" aria-hidden="true" />
      <div className="fairy-dust" aria-hidden="true">
        {Array.from({ length: 32 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 37 + 5) % 100}%`,
              top: `${(i * 19 + 3) % 100}%`,
              animationDelay: `-${i % 7}s`,
            }}
          >
            {i % 4 === 0 ? "✦" : "·"}
          </span>
        ))}
      </div>
      <header className="glass header">
        <a href="#home" className="logo" aria-label="TATI — главная">
          TATi<span>★</span>
        </a>
        <span className="divider" />
        <nav aria-label="Главная навигация">
          <a className="nav-active" href="#home">
            Главная
          </a>
          <a href="#stories">Истории</a>
          <button onClick={() => setActive("about")}>Обо мне</button>
        </nav>
      </header>
      <section className="glass hero" aria-labelledby="hero-title">
        <PanelShape />
        <PanelShape mobile />
        <div className="panel-shimmer" aria-hidden="true" />
        <div className="hero-copy">
          <span className="dash" />
          <h1 id="hero-title">
            Здесь живёт
            <br />
            волшебство<span className="heart">♡</span>
          </h1>
          <p>
            Маленькие идеи, большие мечты
            <br className="desktop-break" /> и немного чудес.
          </p>
          <div className="cta-wrap">
            <button className="cta" onClick={scroll}>
              Заглянуть <span aria-hidden="true">⟶</span>
            </button>
            <Star className="smiling-star" />
          </div>
        </div>
        <div className="welcome-group">
          <img
            className="dragon"
            src="/images/sleeping-dragon.png"
            alt="Сонный сиреневый дракончик"
          />
          <div className="glass welcome">
            <span className="dash" />
            <h2>Привет!</h2>
            <p>
              Рада, что ты здесь<span>♡</span>
            </p>
          </div>
        </div>
        <span className="spark spark-one" aria-hidden="true">
          ✦
        </span>
        <span className="spark spark-two" aria-hidden="true">
          ✦
        </span>
        <span className="spark spark-three" aria-hidden="true">
          ✧
        </span>
      </section>
      <section
        id="stories"
        className="glass stories"
        aria-label="Маленькие шаги к волшебству"
      >
        <PanelShape variant="stories" />
        <PanelShape variant="stories" mobile />
        {cards.map((card, i) => (
          <button
            className={`story story-${i}`}
            key={card.title}
            onClick={() => setActive(i)}
            aria-haspopup="dialog"
          >
            <div
              className={`story-image ${card.image}`}
              role="img"
              aria-label={card.eyebrow}
            />
            <div className="story-label">
              <div>
                <h2>{card.title}</h2>
                <span className="mini-dash" />
              </div>
              <span className="round-arrow" aria-hidden="true">
                ➜
              </span>
            </div>
          </button>
        ))}
      </section>
      <dialog
        ref={dialog}
        className="glass modal"
        onCancel={(e) => {
          e.preventDefault();
          setActive(null);
        }}
        onClick={(e) => {
          if (e.target === dialog.current) setActive(null);
        }}
        aria-labelledby="modal-title"
      >
        <button
          className="close"
          aria-label="Закрыть окно"
          onClick={() => setActive(null)}
        >
          ×
        </button>
        {typeof active === "number" ? (
          <>
            <div className={`modal-image story-image ${cards[active].image}`} />
            <div className="modal-copy">
              <span className="eyebrow">{cards[active].eyebrow}</span>
              <h2 id="modal-title">{cards[active].title}</h2>
              <p>{cards[active].description}</p>
              <span className="modal-spark" aria-hidden="true">
                ✦
              </span>
            </div>
          </>
        ) : (
          <div className="modal-copy about">
            <Star />
            <span className="eyebrow">Давай познакомимся</span>
            <h2 id="modal-title">Привет, я Тати ♡</h2>
            <p>
              Это мой маленький уголок волшебства. Здесь живут добрые истории,
              уютные идеи и мечты, которым хочется подарить крылья. Рада, что ты
              здесь!
            </p>
          </div>
        )}
      </dialog>
    </main>
  );
}
createRoot(document.getElementById("root")).render(<App />);
