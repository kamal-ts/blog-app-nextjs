const codingData = [
  {
    "slug": "understanding-async-await",
    "title": "Understanding Async/Await in JavaScript",
    "desc": "A comprehensive guide to mastering asynchronous programming in JavaScript using async/await.",
    "content": "<h1>Understanding Async/Await in JavaScript</h1><p>JavaScript is a single-threaded language, which makes handling asynchronous tasks challenging. Async/await is a modern approach that simplifies asynchronous programming by allowing developers to write cleaner and more readable code.</p><h2>What is Async/Await?</h2><p>Async functions enable us to write promise-based code as if it were synchronous, and await pauses the execution until the promise resolves or rejects.</p>",
    "img": "/p1.jpeg",
    "views": 102,
    "isEditorsChoice": true,
    "catSlug": "coding",
    "userEmail": "muhammadalfatih230300@gmail.com"
  },
  {
    "slug": "css-grid-vs-flexbox",
    "title": "CSS Grid vs. Flexbox: Which Should You Use?",
    "desc": "An in-depth comparison between CSS Grid and Flexbox, helping developers choose the right tool for their layout needs.",
    "content": "<h1>CSS Grid vs. Flexbox</h1><p>When it comes to creating layouts in CSS, Grid and Flexbox are two powerful tools. But which one should you use for your next project?</p><h2>CSS Grid</h2><p>CSS Grid is a two-dimensional layout system that excels in creating grid-based designs.</p><h2>Flexbox</h2><p>Flexbox is a one-dimensional layout system ideal for aligning items along a single axis.</p>",
    "img": "/p1.jpeg",
    "views": 87,
    "isEditorsChoice": false,
    "catSlug": "coding",
    "userEmail": "kamaluddinlaode39@gmail.com"
  },
  {
    "slug": "intro-to-react-hooks",
    "title": "Introduction to React Hooks",
    "desc": "Learn how React Hooks revolutionized functional components in React and simplified state management.",
    "content": "<h1>Introduction to React Hooks</h1><p>React Hooks were introduced in React 16.8 and have since transformed how developers build functional components.</p><h2>Why Use Hooks?</h2><p>Hooks eliminate the need for class components, allowing you to use state and lifecycle methods in functional components.</p><h2>Common Hooks</h2><p><strong>useState:</strong> Manage state within a functional component.<br/><strong>useEffect:</strong> Handle side effects like API calls and subscriptions.</p>",
    "img": "/p1.jpeg",
    "views": 134,
    "isEditorsChoice": true,
    "catSlug": "coding",
    "userEmail": "sandhikag36@gmail.com"
  },
  {
    "slug": "rest-vs-graphql",
    "title": "REST vs. GraphQL: Choosing the Right API",
    "desc": "A detailed analysis of REST and GraphQL APIs to help you decide which is better for your project.",
    "content": "<h1>REST vs. GraphQL</h1><p>APIs are the backbone of modern web development, and REST and GraphQL are two popular choices. Let’s compare their strengths and weaknesses.</p><h2>REST</h2><p>REST is a traditional architecture style that uses standard HTTP methods and endpoints.</p><h2>GraphQL</h2><p>GraphQL is a query language that allows clients to request only the data they need, making it more efficient in certain scenarios.</p>",
    "img": "/p1.jpeg",
    "views": 76,
    "isEditorsChoice": false,
    "catSlug": "coding",
    "userEmail": "muhammadalfatih230300@gmail.com"
  },
  {
    "slug": "python-decorators-guide",
    "title": "A Beginner's Guide to Python Decorators",
    "desc": "Explore the power of decorators in Python and learn how they can simplify and enhance your code.",
    "content": "<h1>A Beginner's Guide to Python Decorators</h1><p>Decorators in Python are a powerful tool that allows you to modify the behavior of a function or class.</p><h2>What are Decorators?</h2><p>A decorator is a function that takes another function as an argument and extends or alters its behavior.</p><h2>Common Use Cases</h2><p>Decorators are often used for logging, authentication, and performance measurement.</p>",
    "img": "/p1.jpeg",
    "views": 91,
    "isEditorsChoice": true,
    "catSlug": "coding",
    "userEmail": "kamaluddinlaode39@gmail.com"
  }
];

const cultureData = [
  {
    "slug": "understanding-workplace-culture",
    "title": "Understanding Workplace Culture",
    "desc": "An exploration of what workplace culture is and how it shapes employee experiences.",
    "content": "<h1>Understanding Workplace Culture</h1><p>Workplace culture encompasses the values, beliefs, and behaviors that shape an organization's environment. It plays a critical role in employee satisfaction and productivity.</p><h2>Key Components</h2><p>Communication, leadership style, and organizational values are central to fostering a positive workplace culture.</p>",
    "img": "/p1.jpeg",
    "views": 75,
    "isEditorsChoice": true,
    "catSlug": "culture",
    "userEmail": "risaamelia28@gmail.com"
  },
  {
    "slug": "impact-of-pop-culture",
    "title": "The Impact of Pop Culture on Society",
    "desc": "A look at how pop culture influences social norms, trends, and collective behavior.",
    "content": "<h1>The Impact of Pop Culture on Society</h1><p>Pop culture, ranging from music to movies, has a profound impact on shaping societal values and trends.</p><h2>Examples of Influence</h2><p>From fashion inspired by films to the global impact of K-pop, pop culture leaves its mark everywhere.</p>",
    "img": "/p1.jpeg",
    "views": 120,
    "isEditorsChoice": true,
    "catSlug": "culture",
    "userEmail": "budisantoso11@gmail.com"
  },
  {
    "slug": "cultural-differences-in-communication",
    "title": "Cultural Differences in Communication Styles",
    "desc": "How communication styles vary across cultures and the importance of understanding them.",
    "content": "<h1>Cultural Differences in Communication Styles</h1><p>Communication is deeply influenced by cultural backgrounds, with variations in directness, tone, and non-verbal cues.</p><h2>Examples</h2><p>In Western cultures, direct communication is often valued, while in Eastern cultures, indirect approaches are more common.</p>",
    "img": "/p1.jpeg",
    "views": 94,
    "isEditorsChoice": false,
    "catSlug": "culture",
    "userEmail": "ninapermata45@gmail.com"
  },
  {
    "slug": "role-of-traditions-in-modern-life",
    "title": "The Role of Traditions in Modern Life",
    "desc": "Exploring how traditions persist and evolve in a rapidly changing world.",
    "content": "<h1>The Role of Traditions in Modern Life</h1><p>Traditions provide a sense of identity and continuity, even as societies modernize.</p><h2>Why They Matter</h2><p>They strengthen community bonds and preserve cultural heritage, adapting to fit contemporary contexts.</p>",
    "img": "/p1.jpeg",
    "views": 88,
    "isEditorsChoice": true,
    "catSlug": "culture",
    "userEmail": "arifwibowo78@gmail.com"
  },
  {
    "slug": "cultural-heritage-in-digital-age",
    "title": "Preserving Cultural Heritage in the Digital Age",
    "desc": "How technology is being used to safeguard and promote cultural heritage.",
    "content": "<h1>Preserving Cultural Heritage in the Digital Age</h1><p>Technology offers new ways to document, share, and celebrate cultural heritage, ensuring its survival for future generations.</p><h2>Key Technologies</h2><p>From virtual reality to digital archives, tools are emerging to make cultural artifacts accessible worldwide.</p>",
    "img": "/p1.jpeg",
    "views": 102,
    "isEditorsChoice": false,
    "catSlug": "culture",
    "userEmail": "dewilestari92@gmail.com"
  }
];


const data = [  {
  "slug": "intro-to-javascript",
  "title": "Introduction to JavaScript for Beginners",
  "desc": "Learn the basics of JavaScript, the most popular programming language for web development.",
  "content": "<p>JavaScript is one of the most widely used programming languages in the world. It powers the interactivity of websites and is essential for web development.</p><p>To start with JavaScript, you need to understand variables, functions, and loops. These are the building blocks of any programming language.</p><p>Practice by creating simple projects, such as a calculator or a to-do list. With consistent effort, you can master the fundamentals in no time.</p><p>In conclusion, JavaScript opens up a world of possibilities. Whether you're building websites or creating interactive apps, it's a skill worth learning.</p>",
  "img": "/p1.jpeg",
  "views": 123,
  "isEditorsChoice": true,
  "catSlug": "coding",
  "userEmail": "risaamelia28@gmail.com"
},
{
  "slug": "traditional-dances-indonesia",
  "title": "Exploring Traditional Dances in Indonesia",
  "desc": "Discover the beauty and diversity of Indonesia's traditional dances.",
  "content": "<p>Indonesia is home to a rich cultural heritage, and its traditional dances are a testament to this diversity.</p><p>From the elegant Legong dance of Bali to the dynamic Saman dance from Aceh, each region offers unique styles and stories.</p><p>These dances are often performed during cultural events and ceremonies, preserving their significance over generations.</p><p>In conclusion, exploring Indonesia's traditional dances is a journey through history and culture that everyone should experience.</p>",
  "img": "/p1.jpeg",
  "views": 89,
  "isEditorsChoice": false,
  "catSlug": "culture",
  "userEmail": "budisantoso11@gmail.com"
},
{
  "slug": "best-street-foods-asia",
  "title": "Best Street Foods to Try in Asia",
  "desc": "A guide to the most delicious and iconic street foods across Asia.",
  "content": "<p>Asia is a food lover's paradise, offering a variety of street foods that are both delicious and affordable.</p><p>From Bangkok's Pad Thai to Tokyo's Takoyaki, each dish is a reflection of the local culture and flavors.</p><p>Don't forget to try iconic street foods like Nasi Goreng in Indonesia or Pho in Vietnam. These dishes are must-haves for any traveler.</p><p>In conclusion, exploring street food is one of the best ways to experience the vibrant culinary scene in Asia.</p>",
  "img": "/p1.jpeg",
  "views": 200,
  "isEditorsChoice": true,
  "catSlug": "food",
  "userEmail": "ninapermata45@gmail.com"
},
{
  "slug": "2024-fashion-trends",
  "title": "Top Fashion Trends for 2024",
  "desc": "A sneak peek into the hottest fashion trends that will dominate 2024.",
  "content": "<p>As we step into 2024, the fashion world is abuzz with new trends and styles.</p><p>Bold colors, sustainable fabrics, and vintage-inspired designs are making a comeback this year.</p><p>Accessories like oversized sunglasses and statement handbags will also be in the spotlight.</p><p>In conclusion, 2024 is all about self-expression and sustainability in fashion. Embrace the trends and make them your own.</p>",
  "img": "/p1.jpeg",
  "views": 145,
  "isEditorsChoice": false,
  "catSlug": "fashion",
  "userEmail": "arifwibowo78@gmail.com"
},
{
  "slug": "minimalist-home-decor-style",
  "title": "Minimalist Style: Redefining Home Decor",
  "desc": "How to embrace minimalist style for a clutter-free and elegant home.",
  "content": "<p>Minimalist home decor is gaining popularity for its simplicity and elegance.</p><p>Focus on neutral colors, functional furniture, and fewer decorative items to achieve this look.</p><p>Lighting plays a crucial role in minimalist design, enhancing the overall ambiance of your space.</p><p>In conclusion, minimalism is not just a design trend but a lifestyle choice that promotes clarity and peace.</p>",
  "img": "/p1.jpeg",
  "views": 76,
  "isEditorsChoice": true,
  "catSlug": "style",
  "userEmail": "dewilestari92@gmail.com"
},
{
  "slug": "hidden-gems-europe",
  "title": "Hidden Travel Gems in Europe",
  "desc": "Uncover the lesser-known but breathtaking destinations in Europe.",
  "content": "<p>Europe is filled with hidden gems that offer unique experiences away from the tourist crowds.</p><p>Explore places like Hallstatt in Austria or the medieval town of Český Krumlov in the Czech Republic.</p><p>These destinations provide a mix of natural beauty and rich history, making them perfect for travelers seeking something different.</p><p>In conclusion, stepping off the beaten path in Europe leads to unforgettable adventures and discoveries.</p>",
  "img": "/p1.jpeg",
  "views": 300,
  "isEditorsChoice": false,
  "catSlug": "travel",
  "userEmail": "yusufrahman55@gmail.com"
},
{
  "slug": "mastering-react-hooks",
  "title": "Mastering React Hooks: A Comprehensive Guide",
  "desc": "Learn how to use React Hooks effectively in your projects.",
  "content": "<p>React Hooks revolutionized the way developers write functional components. They simplify state management and side effects in React applications.</p><p>Start with basic hooks like useState and useEffect to manage state and handle component lifecycle events.</p><p>Advance to custom hooks to encapsulate complex logic and reuse it across components.</p><p>In conclusion, mastering hooks is essential for modern React development. Practice consistently to integrate them effectively into your projects.</p>",
  "img": "/p1.jpeg",
  "views": 112,
  "isEditorsChoice": true,
  "catSlug": "coding",
  "userEmail": "lailakusuma63@gmail.com"
},
{
  "slug": "traditional-crafts-japan",
  "title": "Traditional Crafts of Japan: A Timeless Heritage",
  "desc": "Explore the exquisite craftsmanship of Japan's traditional arts.",
  "content": "<p>Japan is renowned for its traditional crafts, which embody both beauty and functionality.</p><p>From intricate origami to delicate ceramics, these crafts have been passed down through generations.</p><p>Many artisans still use centuries-old techniques, ensuring the preservation of their cultural heritage.</p><p>In conclusion, Japan's traditional crafts offer a glimpse into the nation's rich history and artistic spirit.</p>",
  "img": "/p1.jpeg",
  "views": 98,
  "isEditorsChoice": false,
  "catSlug": "culture",
  "userEmail": "adinugroho88@gmail.com"
},
{
  "slug": "ultimate-pizza-recipes",
  "title": "Ultimate Homemade Pizza Recipes",
  "desc": "Delight your taste buds with these easy and delicious pizza recipes.",
  "content": "<p>Making pizza at home is both fun and rewarding. You can customize every ingredient to your liking.</p><p>Start with a simple dough recipe and experiment with toppings like mozzarella, pepperoni, or fresh vegetables.</p><p>Try unique combinations such as BBQ chicken or pesto and arugula for a gourmet twist.</p><p>In conclusion, homemade pizzas bring family and friends together for a delightful meal experience.</p>",
  "img": "/p1.jpeg",
  "views": 85,
  "isEditorsChoice": true,
  "catSlug": "food",
  "userEmail": "sitimarlina76@gmail.com"
},
];


  import prisma from "@/utils/connect";
  import { NextResponse } from "next/server";
  
  export const GET = async () => {
      try {
          const categories = await prisma.post.createMany({data:[...codingData, ...data, ...cultureData]});
          return NextResponse.json(categories, { status: 200 });
      } catch (error) {
          console.log("error", error);
          return NextResponse.json(
          { message: "Something went wrong!" },
          { status: 500 }
          );
      }
  };
  