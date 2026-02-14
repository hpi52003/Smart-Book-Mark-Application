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

## Smart Book Mark App Implementation

1. The application allows authenticated users to add bookmarks containing a Title, URL, and Category.

2. The user opens the Add Bookmark form.

3. The user enters the Title and URL.

4. The user selects a category from the dropdown menu. The available options are Learning, Work, and Personal. The dropdown includes a visual arrow indicator showing it is selectable.

5. The user clicks the "Add Bookmark" button. After submission, the bookmark is stored in the database and displayed in the user’s bookmark list.

6. The system validates required fields before saving the bookmark. The required fields are Title, URL, and Category.

7. If the Title field is empty, a warning message is displayed and the bookmark is not saved.

8. If the URL field is empty, a warning message is displayed and the bookmark is not saved.

9. If the URL format is invalid, a warning message is displayed. The URL must include http:// or https://.

10. If a category is not selected, a warning message is displayed and the bookmark will not be saved.

11. The system prevents duplicate bookmarks within the same user account. If the same URL is added again by the same user, the bookmark is rejected and a warning message is displayed.

12. Different users are allowed to save the same URL because bookmarks are private to each user.

13. A bookmark is successfully added only when a Title is provided, a valid URL is entered, a category is selected, and the URL does not already exist in that user’s account.

14. After successful addition, the bookmark appears immediately in the user’s list.

15. Bookmarks are private to each user. A logged-in user cannot view, modify, or delete bookmarks belonging to another user.

16. Privacy is enforced at the database level using Supabase Row Level Security (RLS), ensuring users can only read, insert, and delete their own bookmarks.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Problems Faced and Solutions

1. Logout not working correctly after deployment
   After deploying on Vercel, the app sometimes opened the dashboard again even after logout.

   Fix: Updated the Supabase *Site URL* to the Vercel domain instead of `localhost`. This cleared the session properly and logout worked.

3. Google account switching issue
   While trying to log in with another Google account, it automatically logged into the previous account.

   Fix: Correct redirect URLs were added in Supabase Authentication settings.

5. Duplicate bookmarks being saved
   The same user could add the same URL multiple times.

   Fix: Added a unique constraint in the database so a user cannot save the same URL twice (but different users can).

7. User data security- Privacy issue
   Without proper protection, users could potentially access other users’ bookmarks.

   Fix: Enabled Row Level Security (RLS) and created policies so users can only read, insert, and delete their own bookmarks.

9. Sign-in page flashing before dashboard after choosing the account already
   Sometimes the login page appeared briefly before the dashboard loaded.

   Fix: Added a loading state and checked the session before rendering the dashboard.

11. Invalid inputs (empty title or URL)
   Users could try to submit empty or incorrect data.

   Fix:Added form validation and warning messages for empty fields, invalid URL, or missing category.

