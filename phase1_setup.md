# Phase 1 Setup — Step by Step

End state of this phase: a Vercel URL is live with the placeholder home page, hooked to a GitHub repo so any commit auto-deploys.

You'll need: Node.js (you almost certainly have it from your Vercel projects — `node -v` in a terminal will confirm, anything 18+ works), a GitHub account, your existing Vercel account.

---

## 1. Clean up the partial install I left behind

I tried to verify the build in my sandbox and a half-finished `node_modules` got stranded. Delete it before running anything.

In File Explorer, open the project folder and delete the `node_modules` folder if it's there. Or in a terminal:

```powershell
cd "C:\Users\dmf23\Documents\Claude\Projects\AI Environmental Impact Comparisons"
Remove-Item -Recurse -Force node_modules
```

Also delete `package-lock.json` if it exists (it shouldn't, but just in case).

## 2. Install dependencies

In the same terminal:

```
npm install
```

This will take a minute or two and create a fresh `node_modules` plus a `package-lock.json`. Expect a fair amount of warning chatter; that's normal. The thing to watch for is whether the final exit is clean (no red `ERR!` lines).

## 3. Run the dev server

```
npm run dev
```

You should see something like:

```
astro  v5.x.x ready in ___ ms
┃ Local    http://localhost:4321/
```

Open that URL. You should see the placeholder home page: title, lede paragraph, and a small "Under construction" line. The page has subtle styling (warm off-white background, restrained type) that gives a hint of where the visual identity is going, but it's deliberately barebones — the real design lands in Phase 3.

When you're done looking, stop the dev server with `Ctrl+C` in the terminal.

## 4. Create the GitHub repo

If you have the GitHub CLI installed (`gh --version` to check), this is two commands:

```
git init
git add .
git commit -m "Phase 1: Astro scaffold and placeholder home"
gh repo create ai-environmental-impact-comparisons --public --source=. --remote=origin --push
```

If you don't have `gh`, do it via the web:

1. Go to https://github.com/new
2. Repository name: `ai-environmental-impact-comparisons` (or whatever you prefer; the rest of these instructions assume that name)
3. Public, no README/gitignore/license (the project already has them)
4. Create repository
5. In your terminal, in the project folder:

```
git init
git add .
git commit -m "Phase 1: Astro scaffold and placeholder home"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ai-environmental-impact-comparisons.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

## 5. Connect Vercel

1. Go to https://vercel.com/new
2. "Import Git Repository" → select `ai-environmental-impact-comparisons`
3. Vercel will detect Astro automatically. The defaults are correct:
   - Framework Preset: Astro
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**.

Vercel will build and deploy. After about a minute you'll get a URL like `ai-environmental-impact-comparisons-xxx.vercel.app`. Open it. The placeholder home page should be there.

## 6. Verify the auto-deploy loop

Make a tiny edit — for instance, change "soon" to "shortly" in `src/pages/index.astro` — then:

```
git add .
git commit -m "test: trigger redeploy"
git push
```

Watch your Vercel dashboard. A new deployment should kick off automatically. When it's green, refresh the URL and confirm the change is live.

That's the loop that powers the rest of the project: edit → commit → push → Vercel rebuilds → site updates. We never deploy by hand again.

---

## When you're done

Tell me the live URL (and the GitHub repo URL if you want me to refer to it directly), and we'll move into Phase 2: the first real comparison card, end to end. That phase introduces the data file, the comparison component, the source-line pattern, and the "last verified" stamp — all the pieces the rest of the site uses repeatedly.

If anything in steps 1–6 errors out, paste the exact error text and the step you were on. We'll fix one thing at a time.
