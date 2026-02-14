This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

##Smart Book Mark App Implementation

1. Bookmark Creation
The application allows authenticated users to add bookmarks with a "Title", "URL", and "Category".
1. The user opens the Add Bookmark form.
2. The user enters the Title and URL.
3. The user selects a category from the dropdown menu.
4. The user clicks the "Add Bookmark" Button.
After submission, the bookmark is stored in the database and displayed in the user's bookmark list.

2. Category Dropdown 
A category dropdown menu is implemented in the Add Bookmark form to help users organize bookmarks.
The dropdown includes a visual arrow indicator showing it is selectable.
The available category options are:
1. Learning
2. Work
3. Personal
The user must select a category before submitting the bookmark.

3. Field Validation
The system validates the input fields before saving a bookmark.
The required fields are:
1. Title
2. URL
3. Category
If any required field is missing, the bookmark will not be saved and a warning message is displayed.
Validation behavior:
1. Missing title → Warning message is shown.
2. Missing URL → Warning message is shown.
3. Invalid URL format → Warning message is shown.
The URL must be a valid link and should include `https://` or `http://`.

4. Duplicate URL Restriction (Per Account)
The system prevents a user from saving the same URL more than once in their own account.
1. If a user tries to add a URL that already exists in their bookmarks, the bookmark will not be saved.
2. A warning message is displayed informing the user that the URL already exists.
Different users are still allowed to save the same URL.
The restriction applies only within the same user account.

5. Warning Messages
The application provides feedback messages to guide users.
1. Empty Title → Warning message displayed.
2. Empty URL → Warning message displayed.
3. Invalid URL → Warning message displayed.
4. Category not selected → Warning message displayed.
5. Duplicate URL → Bookmark is rejected and warning is displayed.


6. Successful Bookmark Addition
A bookmark is successfully added only when all conditions are satisfied:
1. Title is entered.
2. A valid URL is entered.
3. A category is selected from the dropdown.
4. The URL does not already exist in the same user account.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
