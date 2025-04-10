# Lab №4: Routing in React

## Installation and Project Launch Instructions

### Setting up the working environment

1. Download and install the latest or stable version of **Node.js**.

2. Check the installation of **Node.js** and **NPM** by running the following commands in the terminal:

    `node -v`
    
    `npm -v`

3. Navigate to the project folder and start the development server with `npm run dev`.

### 🧭 Routing

React Router is a popular library for routing in React applications. It provides convenient components and hooks for creating dynamic routes, nested routes, navigation transitions, and other features necessary for managing navigation in an application.

To install the React Router library, run the following command in the terminal:

    `npm i react-router`

## Lab's Description

The project demonstrates how to use React Router for client-side routing and component-based layout structuring.

## Project Structure

     src/
      │── assets/
      │── layouts/
      │   │── MainLayout.jsx
      │── components/
      │   │── AboutPage.jsx
      │   │── Cart.jsx
      │   │── ProductPage.jsx
      │   │── NotFoundPage.jsx
      │   │── Footer.jsx
      │   │── Header.jsx
      │   │── MenuItemCard.jsx
      │   │── MenuItemList.jsx
      │   │── Search.jsx
      │   │── Slider.jsx
      │── data/
      │   │── menu.json
      │── App.jsx
      │── main.jsx
      |── ...

## Usage Examples

### Each route is defined using:

- the `path` attribute — specifies the URL  
- the `element` attribute — specifies the component that should be rendered when the route is matched

```jsx

    import MenuItemList from './components/MenuItemList';
    import AboutPage from './components/AboutPage';
    import Cart from './components/Cart';
    import ProductPage from './components/ProductPage';
    import MainLayout from './layouts/MainLayout';
    import NotFoundPage from './components/NotFoundPage';
    
    import { Route, Routes } from 'react-router';
    
    function App() {
    
      return (
        <Routes>
          <Route element={<MainLayout />} >
            <Route index element={<MenuItemList />} /> // To define a default route, you can use the index attribute instead of explicitly specifying the path.
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      );
    }
    
    export default App;

```

> [!NOTE]
> The `*` in the route path `path="*"` is a wildcard that matches any URL that doesn't match any other defined routes. This is typically used to handle 404 pages or "not found" pages.

### Dynamic routes

To create dynamic routes in React Router, the `:param` syntax is used, where `param` is any parameter name. This type of route allows you to extract values from the URL and use them within a component.

In the example below route /product/:id is a dynamic route with parameter `id`. When navigating to the `/prosuct/3` URL, the `ProductPage` component will receive the parameter `id` with the value `3`.

To retrieve parameters from the URL in a page component, the `useParams` hook from the `react-router` library is used. This hook allows you to get the values of the parameters and use them within the component.

In addition here is a validation check:

 - !id ensures that the id parameter exists in the URL. If the `id` is missing, it will trigger the `NotFoundPage component`.
 - !product checks if a product was found in the menuJson based on the `id`. If no matching product is found, it displays the `NotFoundPage`.
 - isNaN(Number(id)) converts the id to a number and checks if it is a valid number. If the `id` is not a valid number, it returns the `NotFoundPage`.

   ```jsx
    
    import { useNavigate, useParams } from "react-router";
    import menuJson from "../data/menu.json";
    import MenuItemCard from "./MenuItemCard";
    import NotFoundPage from "./NotFoundPage";
    
    export default function ProductPage() {
    
        const { id } = useParams();
    
        const product = menuJson.find(product => product.id == id);
    
        if(!id || !product || isNaN(Number(id))){
            return <NotFoundPage />
        }
    
        return(
            <MenuItemCard menuItem={product}/>
        );
    }
    
    ```

### Layout 

A layout component is a wrapper that contains common elements for all pages, such as:
    1. Header
    2. Navigation menu
    3. Footer
    4. ...

To create a convenient and centralized layout for all pages in a React Router application, the `Outlet` component is used. This component acts as a container for rendering nested routes, making it easy to create a common layout for all pages of the application.

In this example, the `MainLayout` component contains common interface elements, such as the header and footer. The page components (MenuItemList, AboutPage, Cart, ProductPage) are dynamically rendered inside the layout component using the `Outlet` component, which serves as a container for nested routes.

**MainLayout.jsx**

```jsx
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import { Outlet } from 'react-router';
    
    export default function MainLayout() {
     return (
       <>
         <Header />
         <main>
           <Outlet />
         </main>
         <Footer />
       </>
     );
    }
```

**App.jsx**

```jsx
    return (
        <Routes>
          <Route element={<MainLayout />} >
            <Route index element={<MenuItemList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      );
```

## ❔The Control Questions

1. **What are dynamic routes in React Router and how to use them?**

Dynamic routing defines routes that can change based on certain parameters using route parameters or URL segments. The parameters added to the route path allow the application to handle routes dynamically and render different elements based on the URL, as you can see in the example below:

```jsx
    <Route path="profile/:id" element={<Profile />} />
```

The Profile route with a dynamic segment `:id` matching `profile/:id`.

2. **How to implement layout components in an application with routing?**

React layout components are reusable parts that specify your application's skeleton or structure. Consistently placed headers, sidebars, footers, and navigation bars are examples of layout components. When working with layouts, React Router’s `Outlet` is especially important. The Outlet component is a placeholder in your layout where the matched child route components will be rendered. 

In this example: The Layout component will wrap the `Home`, `About`, and `Contact` pages. Inside the Layout component, we use the `Outlet` component as a placeholder for the route-specific content.

```jsx
    <div>
          <header>My App Header</header>
          <nav>Navigation Bar</nav>
          <main>
            <Outlet /> {/* Content specific to the route will be rendered here */}
          </main>
          <footer>My App Footer</footer>
        </div>
```

```jsx
    function App() {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </Router>
      );
    }
```


3. **What methods can be used to validate route parameters?**

   - Checking if the parameter exists(!id)
   - Validating if the parameter is a number(isNaN(Number(id)))
   - Type checking(id !== 'string')

4. **How to set up a 404 page for invalid routes?**

   - Using the Wildcard `*` Route(path='*')
   - useNavigate hook

This is a function provided by React Router's useNavigate() hook, which is used to programmatically navigate to a different route. In this case, it's redirecting the user to the /404 page (the 404 error page).

```jxs
    if (!id || isNaN(Number(id))) {
    // replace: true - the invalid URL is replaced in the browser's history.
    // the previous invalid URL is removed from the history stack, preventing the user from returning to it with the "Back" button.
    navigate('/404', { replace: true });
    return null;
    }
```

## Source List 

1. [Dynamic route](https://www.freecodecamp.org/news/relative-vs-dynamic-routing-in-react/)
2. [Layout](https://dev.to/jps27cse/understanding-layout-components-and-react-router-outlet-in-react-3l2e)
3. [404 page](https://naveenda.medium.com/how-to-creating-a-custom-404-page-with-react-routers-v6-52efe2cd3807)
4. [Git Course](https://github.com/MSU-Courses/development-of-web-application-with-react/blob/main/07_Routing/07_02_Routing_In_React.md)
