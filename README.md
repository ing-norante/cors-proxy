A simple CORS proxy for allowing clientside fetches from the browser.

## Usage:

```js
fetch(
`https://thisapp.vercel.app/?url=${encodeURIComponent(`https://www.otherendpoint.com/api`)}`)
```

Make sure to `encodeURIComponent` the `url` parameter.

## Limitations
Only works if the referrer is either `localhost` or ends in `*.datocms.com`.