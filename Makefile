start:
	HUGO_BASEURL=http://mdzhang.com hugo server -D --ignoreCache

# set HUGO_BASEURL
build:
	hugo --minify

deploy:
	yarn run deploy

init:
	git submodule init && git submodule update --init --recursive

clean:
	rm -rf resources
