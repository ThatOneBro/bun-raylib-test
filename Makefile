.PHONY: build-wrapper

build-wrapper:
	mkdir -p lib/build
	zig build-lib lib/raylib_helpers.c -lraylib -I/opt/homebrew/Cellar/raylib/5.0/include -L/opt/homebrew/Cellar/raylib/5.0/lib -dynamic -search_static_only
