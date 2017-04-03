---
layout: post
title: "Scaling Pixel Art Without Destroying It"
---

When I started using pixel art in game development, I assumed that it would easily work at any screen resolution, since screen resolutions are much higher than the native resolution of a pixel art game. However, I quickly came to realize that this is not the case and that it's actually quite tricky to get pixel art to look correct when scaling it up by an arbitrary amount. It works fine when it's scaled by an integer multiple (2x, 3x, etc.), but the issues come when scaling by a non-integer multiple. This causes problems because your texture pixels (in other words, the pixels in your artwork, also known as *texels*) get scaled to fractional pixels on the screen. Because screens can't display fractional pixels, it has to either round to the nearest whole pixel, or it has to blend different texels into the same screen pixel. In the end, depending on the selected texture filter mode, this either ends up making some of the pixels in your pixel art bigger than others, or it makes them all blurry. Neither of these options look great, as seen in the example below:

(insert example image here)

This led me to do a lot of googling to try to find a solution to the problem. Most resources I found said that you have to just stick with scaling by integer multiples if you want it to look good, but I was not satisfied with that answer. I knew I'd played plenty of pixel art games that could scale to my screen size and look just fine. So I kept searching, and I finally came across a great solution using a shader at a blog called [A Personal Wonderland](https://csantosbh.wordpress.com/2014/01/25/manual-texture-filtering-for-pixelated-games-in-webgl/). The author does a really nice job of explaining and illustrating the solution in a very mathematical way. It still took me awhile to understand how it works, but I got there, and I was able to implement it in a Unity shader. Since it's so hard to find information about how to solve this problem, I wanted to write a tutorial about it here, explaining it in a way that makes more sense to my brain, and also giving an example of the solution in Unity.

## Standard Scaling Approaches

The pixel art scaling shader is sort of a mix between nearest neighbor filtering and bilinear filtering. Since fully understanding how this works depends on understanding how these two filtering approaches work, I'm going to first spend some time explaining them.

### Nearest Neighbor Filtering

Nearest neighbor filtering is the simplest way to scale an image. With this method, you're basically just taking the pixels from the texture and making them bigger to form the scaled image. This is done by giving a pixel in the scaled image the same color as the nearest texel.

The algorithm for performing nearest neighbor filtering is illustrated in the diagram below. First, the texture is taken, represented by a point at the center of each of the texels. This is then stretched to the size of the final scaled image and overlaid onto it. Each pixel in the scaled image is also represented by a point in its center. Next, for each point in the scaled image, the nearest point in the texture is found. The pixel represented by the scaled image point takes the same color as the texel represented by the texture point.

(insert diagram here)

In the diagram above, the scaled image turns out perfectly, since it's an integer multiple of the texture (in this case, 2x, since the texture is 3x3 and the scaled image is 6x6). However, if the scaled image is not an integer multiple of the texture, the final product won't turn out quite right. See the diagram below for an example of this. Here, the texture is still 3x3, but the scaled image is 7x7. You can see that some of the pixels from the texture are bigger in the scaled image, since it's slightly larger than an integer multiple of the texture (2.333x).

(insert diagram here)

### Bilinear Filtering

With bilinear filtering, instead of making the texels bigger to form the scaled image, you're blending the colors of the texels in the space between them. The term *bilinear* refers to the blending of colors in both the x and y directions.

As with nearest neighbor filtering, the bilinear filtering algorithm starts out by taking the set of points representing the texels, stretching it to the size of the scaled image, and overlaying it onto the set of points representing the pixels in the scaled image. Then, for each point in the scaled image, the four surrounding texel points are found. The colors of both pairs of texel points are first interpolated in one direction (either the x or y direction), so that the two new points are collinear with the point of the pixel being looked at. Finally, the color of the pixel is determined by interpolating the colors of the two new points at the location of the pixel point. See the diagram below for an illustration of this.

One other thing to note here is that some pixels around the edge might not be surrounded by four texels. The way this is generally dealt with is by creating imaginary texels past the edges of the texture with the same colors as edge texels.

(insert diagram here)

Here, we scaled the same 3x3 texture to 6x6, as we did with nearest neighbor filtering. However, as we can see here, bilinear filtering produces a very blurry-looking result. This is not great for pixel art, obviously. However, there is one advantage to bilinear filtering, as seen in the diagram below (scaling the 3x3 texture to 7x7, as we did with nearest neighbor filtering). Even though the texture isn't scaled to an integer multiple, it still looks pretty uniform, rather than having some color blocks look wider than they should. This is due to the interpolation between colors that is done in bilinear filtering.

(insert diagram here)

## Pixel Art Scaling Shader

Now that I've gone through how nearest neighbor and bilinear filtering work, I can go ahead and explain how the pixel art scaling shader works. As I mentioned earlier, this shader works by combining both nearest neighbor and bilinear filtering. For the most part, the shader uses nearest neighbor filtering, as this is best suited to pixel art. However, at the borders between texels, bilinear filtering is used. This is because, at these borders, there might be a screen pixel that contains parts of more than one texel. Remember, if we were to use nearest neighbor, that pixel would have to choose the color of only one of the texels, making the pixel art look distorted. The use of bilinear filtering here blends the colors of the texels that share the same pixel, making it look more natural. This will not cause a noticeable blur, like pure bilinear filtering does, since we only use it at these borders. An example is shown in the diagram below.

(insert diagram here)

### Shader Code

Now that I've explained how the shader works conceptually, I'll go through the code. Note that the code I'm showing is for Unity, but it should be relatively straightforward to translate it to something that works with another game engine or graphics library.

I'll try to explain the code pretty clearly, but if you don't have any experience with shaders, it might be a good idea to read up on them. When I was learning how to write shaders in Unity, I found [this Cg Programming Wikibook](https://en.wikibooks.org/wiki/Cg_Programming) to be an extremely helpful resource. Unity also has [some helpful examples in their documentation](https://docs.unity3d.com/Manual/SL-VertexFragmentShaderExamples.html).

#### Vertex Shader

Here is the code for the vertex shader:

```hlsl
vertexOutput vertexShader(vertexInput input)
{
    vertexOutput output;
    output.vertex = mul(UNITY_MATRIX_MVP, input.vertex);
    output.textureCoord = input.textureCoord * _MainTex_TexelSize.zw;
    output.color = input.color;
    return output;
}
```

#### Fragment Shader

Here is the code for the fragment shader:

```hlsl
fixed4 fragmentShader(vertexOutput input) : SV_Target
{
    float2 locationWithinTexel = frac(input.textureCoord);
    float2 interpolationAmount = clamp(locationWithinTexel / texelsPerPixel, 0, .5)
        + clamp((locationWithinTexel - 1) / texelsPerPixel + .5, 0, .5);
    float2 finalTextureCoords = (floor(input.textureCoord) + interpolationAmount) / _MainTex_TexelSize.zw;
    return tex2D(_MainTex, finalTextureCoords) * input.color;
}
```

#### Entire Shader

```hlsl
Shader "Custom/PixelArtShader"
{
	Properties
	{
		_MainTex("Texture", 2D) = "" {}
	}

	SubShader
	{
		Tags { "Queue" = "Transparent" "IgnoreProjector" = "True" "RenderType" = "Transparent" }
		ZWrite Off
		Blend SrcAlpha OneMinusSrcAlpha

		Pass
		{
			CGPROGRAM
			#pragma vertex vertexShader
			#pragma fragment fragmentShader

			sampler2D _MainTex;
			float4 _MainTex_ST;
			float4 _MainTex_TexelSize;
			float texelsPerPixel;

			struct vertexInput
			{
				float4 vertex : POSITION;
				fixed4 color : COLOR;
				float2 textureCoord : TEXCOORD0;
			};

			struct vertexOutput
			{
				float4 vertex : SV_POSITION;
				fixed4 color : COLOR;
				float2 textureCoord : TEXCOORD0;
			};

			vertexOutput vertexShader(vertexInput input)
			{
				vertexOutput output;
				output.vertex = mul(UNITY_MATRIX_MVP, input.vertex);
				output.textureCoord = input.textureCoord * _MainTex_TexelSize.zw;
				output.color = input.color;
				return output;
			}

			fixed4 fragmentShader(vertexOutput input) : SV_Target
			{
				float2 locationWithinTexel = frac(input.textureCoord);
				float2 interpolationAmount = clamp(locationWithinTexel / texelsPerPixel, 0, .5)
					+ clamp((locationWithinTexel - 1) / texelsPerPixel + .5, 0, .5);
				float2 finalTextureCoords = (floor(input.textureCoord) + interpolationAmount) / _MainTex_TexelSize.zw;
				return tex2D(_MainTex, finalTextureCoords) * input.color;
			}

			ENDCG
		}
	}
}
```
