# SCA Frontend Coding Challenge

Thanks for taking the SCA Frontend Coding Challenge! Please read the following instructions carefully.

This test is designed to be a simple real-world example. The project has been completely scaffolded for you, and the code you need to write yourself is minimal, and marked clearly with // TODO comments.

The goal is for you to showcase your ability to write Javascript, HTML and CSS in a real-ish world scenario.

## The Task

The task is to complete a mock Search Results Page.

The project includes some mock designs, an already working single page application, and an API endpoint which returns mock results.

You should only spend **2 hours** maximum on this test. So please don't feel like you need spend more time than you have available.

## Getting Started

This is a [Next.js](https://nextjs.org/) app with [styled-components](https://styled-components.com/).

You’ll need Node.js version `10.13` or later, a text editor and terminal app for this task.

- Navigate to the `front-end-take-home` directory in your terminal
- Install the dependencies `npm install`
- Start the development server `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser, and you should see the home page.

You can also open storybook `npm run storybook` to check out some of the components already built.

## Requirements

Complete the `Category` component(s) so that it correctly render the results returned from the API endpoint.

- The layout should be responsive and match the mocks (4 columns on desktop, 3 on tablet, 2 on mobile).
- The page should visually match the mocks as closely as possible.
- The show name of the Card should be truncated to a single line.
- The description of the Card should be truncated to 3 lines.
- The page only needs to work on the *latest version of Chrome*.

## Where should you start?

Review the mocks in `design-mocks` directory. There is a mock design for desktop, laptop, tablet and mobile.

The logical order to complete the tasks are:

-   Retrieve results from the API endpoint.
-   Complete the logic and responsive layout for the parent `Listings` component.
-   Complete the logic and layout for the singular `Listing` component.
-   Complete the logic for the `formatAsCurrency` utility.

You do not need to use anything but plain ol' CSS for styling. There are some root level [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) declared in `public/css/variables.css` which you can, and should, use to help save you time.

## Tips

-   Even though the API is a mock, treat it as you would a production API. What happens when there are no results? Or the request fails?
-   The API server is temperamental - 10% of the time it will return an error, and may take up to 3 seconds to return a response. Make sure the Frontend can handle it!
-   This isn't _just_ a Javascript test. The HTML structure of your component and the CSS layout are equally important.

# How to submit

- Clone this repository.
- A RESTful API for `shipments` is provided with the challenge. To run, follow: [How to run API server](#how-to-run-api-server)
- Complete your project as described above within your local repository.
- Make sure that there are scripts to start both the server and the client.
- Ensure everything you want to commit is committed before you bundle.
- Create a git bundle: `git bundle create your_name.bundle --all`
- Email the bundle file to your point of contact.

# How to run API server

The boilerplate includes a small service for data fetching. The file `db.json` includes all the necessary data to achieve the goal. Please follow the steps below to start the server:

```
yarn or npm install .
yarn server or npm run server
```

Check [json-server](https://github.com/typicode/json-server) for more information.


Good luck,

SCA Digital Team
