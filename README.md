# comics-docker

## Presentation
This is a simple superheroes browser. It's based on the Comics Vine API (http://www.comicvine.com).

## Warning
This implementation makes use of a single ComicVine API key, so it's limited to 200 queries / 15 minutes.
If you need more, I invite you to use your own API key (see js/params.js) and to contact Comic Vine administrators to remove / adjust the quota.
(You could use many API key, but that would be really unfair with API editor...)

## Some technical stuff
The frontend is based on AngularJS.
It makes extensive use of Bootstrap CSS library. 