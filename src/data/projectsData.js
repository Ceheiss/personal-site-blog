import calculator from "../images/screenshot-calculator.png"
import ragnarok from "../images/ragnarok-title.png"
import url from "../images/url-shortener.png"
import drumMachine from "../images/percussion.png"
import randomQuoteService from "../images/random-quote.png"
import randomQuoteApp from "../images/random-quote-app.png"
import lotrIpsumApp from "../images/lotr-ipsum.png"

const projects = [
  {
    title: "Calculator App",
    image: calculator,
    alt: "a calculator",
    description:
      "This calculator was developed, as a challenge for Free Code Camp, using React and Redux to manage state. The display screen shows current entered value and current operation.",
    liveLink: "https://react-calculator-app-seven.vercel.app/",
    repoLink: "https://github.com/Ceheiss/react-calculator-app",
  },
  {
    title: "Ragnarok Game",
    image: ragnarok,
    alt: "Odin and Loki",
    description:
      "This is a turn-based game built mainly in Vanilla JS with a dash of jQuery. Players can move through a map, find weapons, danger, and if they encounter each other... fight!.",
    liveLink: "https://ceheiss.github.io/ragnarok-game/",
    repoLink: "https://github.com/Ceheiss/ragnarok-game",
  },
  {
    title: "URL-Shortener Service",
    image: url,
    alt: "The interface of the app",
    description:
      "A Node/Express backend application that generates shortened url's. I used MongoDB for data persistance. Currently loads slow because uses a free deployment service",
    liveLink: "https://ceheiss-url-shortener.glitch.me/",
    repoLink: "https://github.com/Ceheiss/url_shortener",
  },
  {
    title: "Drum Piano Machine",
    image: drumMachine,
    alt: "Letters QWEASDZXC in individual tiles",
    description:
      "This application was built with React. It has two modalities, one for percussion and the other one for piano. You can play sounds either with keyboard or clicking. Each sounds changes the background color!",
    liveLink: "https://codepen.io/ceheiss/full/WNQgWbM",
    repoLink: "https://github.com/Ceheiss/drum-piano-machine",
  },
  {
    title: "Random Quote Service",
    image: randomQuoteService,
    alt: "The Tree of Gondor with a purple background",
    description:
      "This is a small service that is opened for requests. Most people when are learning about API's struggle to find a free simple API, so I made one of the Lord of The Rings. The endpoint provides randomly a quote, character who said that quote, and a url to the image(hosted in the same server)",
    liveLink: "https://lotr-random-quote-api.herokuapp.com/",
    repoLink: "https://github.com/Ceheiss/lotr-random-quote-api",
  },
  {
    title: "Random Quote App",
    image: randomQuoteApp,
    alt: "The Tree of Gondor with a purple background",
    description:
      "This App is a simple React App that shows random Lord of The Rings quotes. I built it because it uses the backend service mentioned above, so it's and example for anyone who would like to use my API. Since both apps are hosted in free services, initial load might take a while",
    liveLink: "https://lotr-random-quote.herokuapp.com/",
    repoLink: "https://github.com/Ceheiss/react-random-lotr-quote",
  },
  {
    title: "Lord of The Ipsum",
    image: lotrIpsumApp,
    alt: "Lord of The Ipsum app screenshot",
    description:
      "This is an old but beloved app. Since at the time I was building a lot of HTML websites, I needed one lorem ipsum that I really liked, so I built mine with plain HTML, JS and CSS, and a JSON file I wrote to source the data",
    liveLink: "https://ceheiss.github.io/LordOfTheIpsum/",
    repoLink: "https://github.com/Ceheiss/LordOfTheIpsum",
  },
]

export default projects
