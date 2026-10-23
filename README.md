# The Ultimate MCU Tracker (Beta)

A free, fan-made MCU watch-order tracker. Check off films and episodes; progress saves in the browser.

Tabs: **Kharlemagne's Kontinuity** (fun watch order), **Canon Release Order**, **Legacy Era**, **Series Saga**.

> Fan project. Not affiliated with Marvel or Disney. Free to use; Ko-fi support goes to the developer.

## 1. Before you publish
Edit `src/config.js`:
- `KOFI_URL` → your Ko-fi page
- `GITHUB_REPO_URL` → this repo's URL (powers the "Report a bug" link)

Optional: in `.github/FUNDING.yml`, uncomment `ko_fi:` and add your name to get a Sponsor button on the repo.

## 2. Run it locally
```
npm install
npm run dev
```
Commit the `package-lock.json` that `npm install` creates.

## 3. Put it online (GitHub Pages, free)
1. Create a GitHub repo and push this folder to the `main` branch.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Every push to `main` now builds and deploys automatically. The live URL appears in the Actions run and in Settings → Pages.
4. Link that URL from your Ko-fi page and the repo description.

## 4. Updating it later
Almost every update is an edit to **`src/data.js`**; the app logic is in `src/App.jsx`.

**Adding a new release**
- Add a line to `CORE` with `e("uniqueId", phase, "Film" | "Series" | "Animated" | "Special", "Title", "Date", episodeCount, "note")`.
- Add `kc("uniqueId")` where it belongs in `KONT` (the Kontinuity order). It shows up in Canon Release Order automatically.
- Side-tab content (Defenders, X-Men, etc.) goes in `SIDE_TABS`.

**Rules that protect people's saved progress**
- Every entry needs a unique `id`. **Never rename or reuse an id**, because saved checkmarks are stored by id.
- Changing the episode count of a released season is fine. Don't change `STORAGE_KEY` unless you intend to reset everyone's progress.

**Check before you push**
```
npm run check
```
This catches duplicate ids, typos in `KONT`, missing titles, and episode ranges that don't add up. It also runs automatically on deploy and blocks a broken push.

## How saving works
Progress is stored in the visitor's browser (`localStorage`), so it's per browser and per device. There are **Export / Import progress** buttons for backups and moving between devices. Clearing browser site data erases it.
