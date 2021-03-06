var React = require('react');
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
var Program = require('./Program');

const topics = [
    {
        name: 'React Router',
        id: 'react-router',
        description: 'Declarative, component based routing for React',
        resources: [
            {
                name: 'URL Parameters',
                id: 'url-parameters',
                description: "URL parameters are parameters whose values are set dynamically in a page's URL. This allows a route to render the same component while passing that component the dynamic portion of the URL so it can change based off of it.",
                url: 'https://tylermcginnis.com/react-router-url-parameters'
            },
            {
                name: 'Programatically navigate',
                id: 'programmatically-navigate',
                description: "When building an app with React Router, eventually you'll run into the question of navigating programmatically. The goal of this post is to break down the correct approaches to programmatically navigating with React Router.",
                url: 'https://tylermcginnis.com/react-router-programmatically-navigate/'
            }
        ]
    },
    {
        name: 'React.js',
        id: 'reactjs',
        description: 'A JavaScript library for building user interfaces',
        resources: [
            {
                name: 'React Lifecycle Events',
                id: 'react-lifecycle',
                description: "React Lifecycle events allow you to tie into specific phases of a component's life cycle",
                url: 'https://tylermcginnis.com/an-introduction-to-life-cycle-events-in-react-js/'
            },
            {
                name: 'React AHA Moments',
                id: 'react-aha',
                description: "A collection of 'Aha' moments while learning React.",
                url: 'https://tylermcginnis.com/react-aha-moments/'
            }
        ]
    },
    {
        name: 'Functional Programming',
        id: 'functional-programming',
        description: 'In computer science, functional programming is a programming paradigm—a style of building the structure and elements of computer programs—that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.',
        resources: [
            {
                name: 'Imperative vs Declarative programming',
                id: 'imperative-declarative',
                description: 'A guide to understanding the difference between Imperative and Declarative programming.',
                url: 'https://tylermcginnis.com/imperative-vs-declarative-programming/'
            },
            {
                name: 'Building User Interfaces with Pure Functions and Function Composition',
                id: 'fn-composition',
                description: 'A guide to building UI with pure functions and function composition in React',
                url: 'https://tylermcginnis.com/building-user-interfaces-with-pure-functions-and-function-composition-in-react-js/'
            }
        ]
    }
]

const Home = ()=> {
    return (
        <h1>Home</h1>
    )
}
const Resource = ({match})=> {
    const topic = topics.find(({ id }) => id === match.params.topicId)
        .resources.find(({ id }) => id === match.params.subId)
    return (
        <div>
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
            <a href={topic.url}>More Info</a>
        </div>
    )
}

const Topic = ({match})=> {
    const topic = topics.find(({id})=> id === match.params.id);
    console.log(match);

    return (
        <div>
            <hr/>
            <h1>{topic.name}</h1>
            <p>{topic.description}</p>
            <ul>
                {topic.resources.map((sub)=> {
                    return (
                        <li key={sub.id}>
                            <Link to={`/topics/${topic.id}/${sub.id}`}>{sub.name}</Link>
                        </li>
                    )
                })}
            </ul>
            <hr/>
            <Route path={`/topics/:topicId/:subId`} component={Resource} />
        </div>
    )
}

const Topics = ({match})=> {
    console.log(match);
    return (
        <div>
            <h1>Topics</h1>
            <ul> 
                {topics.map(({name, id}) => {
                    return (
                        <li key={id}>
                            <Link to={`/topics/${id}`}>{name}</Link>
                        </li>
                    )
                })}
            </ul>
            <Route path='/topics/:id' component={Topic} />
        </div>
    )
}

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/topics">Topics</Link></li>
                            <li><Link to="program-navigation">Programmatically navigate using React Router</Link></li>
                        </ul>
                        <hr/>
                        <Route exact path="/" component={Home} />
                        <Route path="/topics" component={Topics} />
                        <Route path="/program-navigation" render={(props) => <Program init={true} />} />
                    </div>
                </Router>
            </div>
        )
    }
}

module.exports = App;