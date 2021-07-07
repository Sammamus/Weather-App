.PHONY: dev_startup
dev_startup:
	@nodemon weather/src/app.js 5000 -e js,hbs

.PHONY: staging_startup
staging_startup:
	@node weather/src/app.js 5000