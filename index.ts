import { dlopen, FFIType, ptr, suffix } from "bun:ffi";

const raylibPath = `${process.env.HOMEBREW_PREFIX}/Cellar/raylib/5.0/lib/libraylib.${suffix}`;
const wrapperPath = `./libraylib_helpers.${suffix}`;

const {
  symbols: {
    InitWindow, // the function to call
    SetTargetFPS,
    WindowShouldClose,
    BeginDrawing,
    EndDrawing,
    CloseWindow,
  },
} = dlopen(
  raylibPath, // a library name or file path
  {
    InitWindow: {
      // no arguments, returns a string
      args: [FFIType.int, FFIType.int, FFIType.cstring],
      returns: FFIType.void,
    },
    SetTargetFPS: {
      args: [FFIType.int],
      returns: FFIType.void,
    },
    WindowShouldClose: {
      returns: FFIType.bool,
    },
    BeginDrawing: {
      returns: FFIType.void,
    },
    EndDrawing: {
      returns: FFIType.void,
    },
    CloseWindow: {
      returns: FFIType.void,
    },
  }
);

const {
  symbols: { ClearBackgroundWrapped, DrawTextWrapped },
} = dlopen(wrapperPath, {
  ClearBackgroundWrapped: {
    args: [FFIType.ptr],
    returns: FFIType.void,
  },
  DrawTextWrapped: {
    args: [FFIType.cstring, FFIType.int, FFIType.int, FFIType.int, FFIType.ptr],
    returns: FFIType.void,
  },
});

function makeColor(
  r: number,
  g: number,
  b: number,
  a: number
): Uint8ClampedArray {
  return new Uint8ClampedArray([r, g, b, a]);
}

const encoder = new TextEncoder();

function encodeCStr(str: string): Uint8Array {
  return encoder.encode(`${str}\0`);
}

const screenWidth = 800;
const screenHeight = 450;

const ENCODED_TITLE = encodeCStr("raylib [core] example - basic window");
const ENCODED_TITLE_PTR = ptr(ENCODED_TITLE);

const TEXT = encodeCStr("OINGUS MCBOINGUS");
const TEXT_PTR = ptr(TEXT);

const RAYWHITE = makeColor(245, 245, 245, 255);
const LIGHTGRAY = makeColor(200, 200, 200, 255);
const BLACK = makeColor(0, 0, 0, 255);
const BLACK_PTR = ptr(BLACK);
const RAYWHITE_PTR = ptr(RAYWHITE);
const LIGHTGRAY_PTR = ptr(LIGHTGRAY);

InitWindow(screenWidth, screenHeight, ENCODED_TITLE_PTR);
SetTargetFPS(60);

function main() {
  let framecount = 0;

  while (!WindowShouldClose()) {
    const showGray = Math.ceil(framecount / 30) % 2 === 0;

    BeginDrawing();

    ClearBackgroundWrapped(RAYWHITE_PTR);
    DrawTextWrapped(
      TEXT_PTR,
      250,
      200,
      20,
      showGray ? LIGHTGRAY_PTR : BLACK_PTR
    );

    EndDrawing();
    framecount++;
  }
  CloseWindow();
}

main();
