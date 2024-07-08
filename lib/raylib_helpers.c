#include <assert.h>
#include <raylib.h>
#include <stdio.h>
#include <stdlib.h>

#ifndef NULL
#define NULL 0
#endif

void ClearBackgroundWrapped(Color *color)
{
    assert(color != NULL);
    assert(color->a >= 0 && color->a <= 255);
    ClearBackground(*color);
}

void DrawTextWrapped(unsigned char *text, int posX, int posY, int fontSize, Color *color)
{
    assert(text != NULL);
    assert(color != NULL);
    assert(color->a >= 0 && color->a <= 255);

    DrawText(text, posX, posY, fontSize, *color);
}
