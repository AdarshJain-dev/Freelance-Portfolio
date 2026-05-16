# Adarsh Jain Portfolio

Static portfolio website for Adarsh Jain, an end-to-end DevOps Engineer.

## Project Structure

```text
adarsh-devops-portfolio/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── netlify.toml
├── .nojekyll
├── .gitignore
└── README.md
```

## Run Locally

Open `index.html` directly in a browser, or run a tiny local server:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Recommended Free Deployment: GitHub Pages

GitHub Pages is a good fit for this portfolio because it serves static HTML, CSS, and JavaScript directly from a GitHub repository.

1. Create a new GitHub repository named `adarsh-devops-portfolio`.
2. Push this folder to the repository.
3. Open the repository on GitHub.
4. Go to `Settings` → `Pages`.
5. Under `Build and deployment`, choose `Deploy from a branch`.
6. Select branch `main` and folder `/root`.
7. Save.

Your site will be available at:

```text
https://YOUR_GITHUB_USERNAME.github.io/adarsh-devops-portfolio/
```

For a cleaner URL, create the repository as:

```text
YOUR_GITHUB_USERNAME.github.io
```

Then your portfolio will publish at:

```text
https://YOUR_GITHUB_USERNAME.github.io/
```

## Alternative Free Deployment: Netlify

Netlify also works well for static portfolios.

1. Push this folder to GitHub.
2. Log in to Netlify.
3. Choose `Add new site` → `Import an existing project`.
4. Select the GitHub repository.
5. Leave build command empty.
6. Set publish directory to `.`.
7. Deploy.

## Notes

- No build step is required.
- The site is ready for GitHub Pages, Netlify, or Vercel.
- Keep future images inside `assets/images/`.
