# gh-window Production Embed Test

This file uses the production deployment directly:

`https://gh-window.vercel.app`

Use it to verify how the cards render in markdown contexts like GitHub README files.

## Default

![GitHub Stats](https://gh-window.vercel.app/api/ivorisnoob)

```md
![GitHub Stats](https://gh-window.vercel.app/api/ivorisnoob)
```

## Light Theme

![GitHub Stats](https://gh-window.vercel.app/api/ivorisnoob?theme=light)

```md
![GitHub Stats](https://gh-window.vercel.app/api/ivorisnoob?theme=light)
```

## Focused Stats

![GitHub Stats](https://gh-window.vercel.app/api/ivorisnoob?show=repos,stars,streak)

```md
![GitHub Stats](https://gh-window.vercel.app/api/ivorisnoob?show=repos,stars,streak)
```

## Swap Username

Replace `ivorisnoob` with your own username in any of these:

```md
![GitHub Stats](https://gh-window.vercel.app/api/YOUR_USERNAME)
![GitHub Stats](https://gh-window.vercel.app/api/YOUR_USERNAME?theme=light)
![GitHub Stats](https://gh-window.vercel.app/api/YOUR_USERNAME?show=repos,stars,streak)
```

## HTML Test Page

For a non-markdown browser test of the same production URLs, open:

`/readme-test.html`
