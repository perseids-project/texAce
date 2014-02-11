#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
build() {
	_home=$1
	_squish=$_home/third_party/sqUIsh
	
	cd $_squish
	
	# Build javascript
	./sqUI.sh $_home/build/texAce.js.list
	
	# Build css
	./sqUI.sh $_home/build/texAce.css.list
	mv $_squish/build/texAce* $_home/
}
build $DIR