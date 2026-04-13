import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {Video} from "@remotion/media";
import {
  BASE_CREDIT_SECTIONS,
  clamp,
  FONT_DISPLAY_HACHI_POP,
  FONT_DISPLAY_MOCHIY_POP,
  FONT_DISPLAY_MOCHIY_POP_P,
  FONT_DISPLAY_YUSEI_MAGIC,
  FONT_DISPLAY_POP,
  FONT_DISPLAY_POP_BOLD,
  FONT_UI,
  FONT_ZEN_MARU_BLACK,
  FONT_ZEN_MARU,
  FONT_ZEN_MARU_BOLD,
  MOTION_TITLE,
} from "./overlay-content.jsx";

const hexToRgba = (value, alpha) => {
  const normalized = value.replace("#", "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((character) => character + character)
          .join("")
      : normalized;

  return `rgba(${Number.parseInt(expanded.slice(0, 2), 16)}, ${Number.parseInt(
    expanded.slice(2, 4),
    16,
  )}, ${Number.parseInt(expanded.slice(4, 6), 16)}, ${alpha})`;
};

const getSectionOpacity = (currentTimeMs, startMs, endMs, enterMs, exitMs) => {
  if (currentTimeMs < startMs || currentTimeMs >= endMs) {
    return 0;
  }

  const enter = interpolate(currentTimeMs, [startMs, startMs + enterMs], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exit = interpolate(currentTimeMs, [endMs - exitMs, endMs], [1, 0], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return enter * exit;
};

const getPlacement = (position, sidePadding) => {
  if (position === "center") {
    return {
      left: "50%",
      transformBase: "translateX(-50%)",
    };
  }

  if (position === "right") {
    return {
      right: sidePadding,
      transformBase: "translateX(0)",
    };
  }

  return {
    left: sidePadding,
    transformBase: "translateX(0)",
  };
};

const getAlignStyle = (align) => {
  if (align === "left") {
    return {
      alignItems: "flex-start",
      textAlign: "left",
    };
  }

  if (align === "right") {
    return {
      alignItems: "flex-end",
      textAlign: "right",
    };
  }

  return {
    alignItems: "center",
    textAlign: "center",
  };
};

const getFontFamily = (fontKey) => {
  if (fontKey === "hachi-pop") {
    return FONT_DISPLAY_HACHI_POP;
  }

  if (fontKey === "mochiy-pop") {
    return FONT_DISPLAY_MOCHIY_POP;
  }

  if (fontKey === "mochiy-pop-p") {
    return FONT_DISPLAY_MOCHIY_POP_P;
  }

  if (fontKey === "yusei-magic") {
    return FONT_DISPLAY_YUSEI_MAGIC;
  }

  if (fontKey === "pop-bold") {
    return FONT_DISPLAY_POP_BOLD;
  }

  if (fontKey === "zen-bold") {
    return FONT_ZEN_MARU_BOLD;
  }

  if (fontKey === "zen-black") {
    return FONT_ZEN_MARU_BLACK;
  }

  if (fontKey === "zen") {
    return FONT_ZEN_MARU;
  }

  if (fontKey === "ui") {
    return FONT_UI;
  }

  return FONT_DISPLAY_POP;
};

const getJustifyContent = (align) => {
  if (align === "left") {
    return "flex-start";
  }

  if (align === "right") {
    return "flex-end";
  }

  return "center";
};

const TitleAccent = ({theme}) => {
  if (theme.title.decoration === "none") {
    return null;
  }

  if (theme.title.decoration === "dots") {
    return (
      <div
        style={{
          display: "flex",
          gap: 10,
          justifyContent: theme.title.align === "left" ? "flex-start" : theme.title.align === "right" ? "flex-end" : "center",
          width: "100%",
        }}
      >
        {theme.title.decorationColors.map((color, index) => (
          <div
            key={`${color}-${index}`}
            style={{
              background: color,
              borderRadius: 999,
              boxShadow: `0 0 0 1.5px ${theme.title.outlineColor}`,
              height: 10,
              width: index % 2 === 0 ? 28 : 16,
            }}
          />
        ))}
      </div>
    );
  }

  if (theme.title.decoration === "line") {
    return (
      <div
        style={{
          background: `linear-gradient(90deg, ${theme.title.decorationColors.join(", ")})`,
          borderRadius: 999,
          boxShadow: `0 0 0 1px ${hexToRgba(theme.title.outlineColor, 0.38)}`,
          height: 6,
          width: theme.title.align === "center" ? 200 : 150,
        }}
      />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        justifyContent: theme.title.align === "left" ? "flex-start" : theme.title.align === "right" ? "flex-end" : "center",
        width: "100%",
      }}
    >
      {theme.title.decorationColors.map((color, index) => (
        <div
          key={`${color}-${index}`}
          style={{
            background: color,
            borderRadius: 999,
            height: 4,
            opacity: 0.96,
            width: index % 2 === 0 ? 44 : 18,
          }}
        />
      ))}
    </div>
  );
};

const CreditMarker = ({accent, theme}) => {
  if (theme.credit.marker === "none") {
    return null;
  }

  if (theme.credit.marker === "dot") {
    return (
      <div
        style={{
          background: accent,
          borderRadius: 999,
          boxShadow: `0 0 0 1.5px ${theme.credit.markerOutlineColor}`,
          height: 10,
          width: 10,
        }}
      />
    );
  }

  return (
    <div
      style={{
        background: `linear-gradient(90deg, ${accent} 0%, ${hexToRgba(accent, 0.20)} 100%)`,
        borderRadius: 999,
        height: 4,
        width: theme.credit.marker === "long-line" ? 84 : 56,
      }}
    />
  );
};

const CreditItem = ({item, theme}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <div
        style={{
          color: theme.credit.labelColor,
          fontFamily: getFontFamily(theme.credit.bodyFont),
          fontSize: theme.credit.labelFontSize,
          fontWeight: 700,
          letterSpacing: theme.credit.labelLetterSpacing,
          lineHeight: 1.2,
          textShadow: theme.credit.labelShadow,
        }}
      >
        {item.label}
      </div>
      <div
        style={{
          color: theme.credit.valueColor,
          fontFamily: getFontFamily(theme.credit.valueFont),
          fontSize: theme.credit.valueFontSize,
          fontWeight: theme.credit.valueWeight,
          lineHeight: 1.22,
          textShadow: theme.credit.valueShadow,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {item.value}
      </div>
    </div>
  );
};

const CreditSection = ({section, theme, compact}) => {
  const wide = theme.credit.layout === "grid" && section.wide && !compact && theme.credit.allowWide;

  return (
    <div
      style={{
        borderLeft:
          theme.credit.sectionFrame === "left-bar"
            ? `${theme.credit.sectionFrameWidth}px solid ${section.accent}`
            : "none",
        borderTop:
          theme.credit.sectionFrame === "top-line"
            ? `${theme.credit.sectionFrameWidth}px solid ${section.accent}`
            : "none",
        display: "flex",
        flexDirection: "column",
        gap: theme.credit.itemGap,
        gridColumn: wide ? "1 / span 2" : "auto",
        minWidth: 0,
        paddingLeft: theme.credit.sectionFrame === "left-bar" ? 14 : 0,
        paddingTop: theme.credit.sectionFrame === "top-line" ? 10 : 0,
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: 10,
          justifyContent:
            theme.credit.align === "right"
              ? "flex-end"
              : theme.credit.align === "center"
                ? "center"
                : "flex-start",
        }}
      >
        <CreditMarker accent={section.accent} theme={theme} />
        <div
          style={{
            color: section.accent,
            fontFamily: getFontFamily(theme.credit.headingFont),
            fontSize: theme.credit.sectionTitleFontSize,
            fontWeight: 700,
            letterSpacing: theme.credit.sectionTitleLetterSpacing,
            lineHeight: 1.15,
            textShadow: theme.credit.sectionTitleShadow,
          }}
        >
          {section.title}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gap: theme.credit.innerGap,
          gridTemplateColumns:
            theme.credit.layout === "grid" && wide
              ? "repeat(2, minmax(0, 1fr))"
              : "minmax(0, 1fr)",
        }}
      >
        {section.items.map((item) => (
          <CreditItem
            item={item}
            key={`${section.title}-${item.label}`}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

const TitleCard = ({endMs, startMs, theme, videoMetadata}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;
  const opacity = getSectionOpacity(currentTimeMs, startMs, endMs, 700, 520);

  if (opacity <= 0) {
    return null;
  }

  const localFrame = Math.max(0, frame - Math.round((startMs / 1000) * fps));
  const enter = spring({
    fps,
    frame: localFrame,
    config: {
      damping: 16,
      mass: 0.82,
      stiffness: 100,
    },
  });
  const sidePadding = Math.round(videoMetadata.width * 0.06);
  const safeWidth = Math.max(0, videoMetadata.width - sidePadding * 2);
  const width = Math.min(safeWidth, theme.title.widthMax);
  const titleSize = Math.round(clamp(width * theme.title.fontScale, theme.title.fontMin, theme.title.fontMax));
  const subtitleSize = Math.round(
    clamp(width * theme.title.subtitleScale, theme.title.subtitleMin, theme.title.subtitleMax),
  );
  const placement = getPlacement(theme.title.position, sidePadding);
  const alignStyle = getAlignStyle(theme.title.align);
  const translateY = interpolate(enter, [0, 1], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleTextStyle =
    theme.title.fillMode === "gradient"
      ? {
          backgroundImage: theme.title.fill,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          WebkitTextStroke: `${theme.title.strokeWidth}px ${theme.title.outlineColor}`,
        }
      : {
          color: theme.title.fill,
          WebkitTextStroke: `${theme.title.strokeWidth}px ${theme.title.outlineColor}`,
        };
  const titleCharacters = Array.from(MOTION_TITLE.main);
  const titleBackdropStyle = theme.title.backdrop
    ? {
        alignSelf:
          theme.title.align === "left"
            ? "flex-start"
            : theme.title.align === "right"
              ? "flex-end"
              : "center",
        backdropFilter: theme.title.backdrop.backdropBlur
          ? `blur(${theme.title.backdrop.backdropBlur}px)`
          : undefined,
        background: theme.title.backdrop.background,
        border: theme.title.backdrop.border,
        borderRadius: theme.title.backdrop.borderRadius,
        boxShadow: theme.title.backdrop.shadow,
        maxWidth: theme.title.backdrop.maxWidth ?? "100%",
        overflow: "hidden",
        padding: theme.title.backdrop.padding,
        position: "relative",
        transform: theme.title.backdrop.rotateDeg
          ? `rotate(${theme.title.backdrop.rotateDeg}deg)`
          : undefined,
        width: theme.title.backdrop.fitContent ? "fit-content" : "100%",
      }
    : {
        width: "100%",
      };

  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      <div
        style={{
          ...alignStyle,
          left: placement.left,
          opacity,
          position: "absolute",
          right: placement.right,
          top: Math.round(videoMetadata.height * theme.title.topRatio),
          transform: `${placement.transformBase} translateY(${Math.round(translateY)}px)`,
          width,
        }}
      >
        <div style={titleBackdropStyle}>
          {theme.title.kicker ? (
            <div
              style={{
                color: theme.title.kickerColor,
                fontFamily: getFontFamily(theme.title.kickerFont),
                fontSize: theme.title.kickerSize,
                fontWeight: 700,
                letterSpacing: theme.title.kickerLetterSpacing,
                lineHeight: 1.2,
                marginBottom: 10,
                textShadow: theme.title.kickerShadow,
              }}
            >
              {theme.title.kicker}
            </div>
          ) : null}
          {theme.title.fillMode === "per-character" ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                fontFamily: getFontFamily(theme.title.font),
                fontSize: titleSize,
                fontWeight: theme.title.fontWeight,
                justifyContent: getJustifyContent(theme.title.align),
                lineHeight: 1.08,
                maxWidth: "100%",
                whiteSpace: "pre-wrap",
                wordBreak: "keep-all",
                width: "100%",
              }}
            >
              {titleCharacters.map((character, index) => {
                const palette = theme.title.characterPalette ?? theme.title.decorationColors;
                const color = palette[index % palette.length];
                return (
                  <span
                    key={`${character}-${index}`}
                    style={{
                      WebkitTextStroke: `${theme.title.strokeWidth}px ${theme.title.outlineColor}`,
                      color,
                      marginRight: theme.title.characterGap ?? 0,
                      textShadow: theme.title.shadow,
                    }}
                  >
                    {character === " " ? "\u00A0" : character}
                  </span>
                );
              })}
            </div>
          ) : (
            <div
              style={{
                fontFamily: getFontFamily(theme.title.font),
                fontSize: titleSize,
                fontWeight: theme.title.fontWeight,
                letterSpacing: theme.title.letterSpacing,
                lineHeight: 1.08,
                textShadow: theme.title.shadow,
                whiteSpace: "pre-wrap",
                wordBreak: "keep-all",
                ...titleTextStyle,
              }}
            >
              {MOTION_TITLE.main}
            </div>
          )}
          <div
            style={{
              color: theme.title.subtitleColor,
              fontFamily: getFontFamily(theme.title.subtitleFont),
              fontSize: subtitleSize,
              fontWeight: 700,
              letterSpacing: theme.title.subtitleLetterSpacing,
              lineHeight: 1.2,
              marginTop: 8,
              textShadow: theme.title.subtitleShadow,
            }}
          >
            {MOTION_TITLE.sub}
          </div>
          <div
            style={{
              marginTop: theme.title.decorationMarginTop,
              width: "100%",
            }}
          >
            <TitleAccent theme={theme} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CreditBoard = ({endMs, startMs, theme, videoMetadata}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;
  const opacity = getSectionOpacity(currentTimeMs, startMs, endMs, 720, 620);

  if (opacity <= 0) {
    return null;
  }

  const localFrame = Math.max(0, frame - Math.round((startMs / 1000) * fps));
  const enter = spring({
    fps,
    frame: localFrame,
    config: {
      damping: 18,
      mass: 0.86,
      stiffness: 96,
    },
  });
  const sidePadding = Math.round(videoMetadata.width * 0.06);
  const safeWidth = Math.max(0, videoMetadata.width - sidePadding * 2);
  const width = Math.min(safeWidth, theme.credit.widthMax);
  const compact = width < theme.credit.compactThreshold;
  const placement = getPlacement(theme.credit.position, sidePadding);
  const anchorY =
    theme.credit.anchor === "bottom"
      ? {
          bottom: Math.round(videoMetadata.height * theme.credit.bottomRatio),
        }
      : {
          top: Math.round(videoMetadata.height * theme.credit.topRatio),
        };
  const headingAlign = getAlignStyle(theme.credit.align);
  const headingSize = Math.round(clamp(width * theme.credit.headingScale, theme.credit.headingMin, theme.credit.headingMax));
  const translateY = interpolate(enter, [0, 1], [28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sections = BASE_CREDIT_SECTIONS.map((section, index) => ({
    ...section,
    accent: theme.credit.sectionAccents[index % theme.credit.sectionAccents.length],
  }));

  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      <div
        style={{
          left: placement.left,
          opacity,
          position: "absolute",
          right: placement.right,
          transform: `${placement.transformBase} translateY(${Math.round(translateY)}px)`,
          width,
          ...anchorY,
        }}
      >
        <div
          style={{
            ...headingAlign,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            marginBottom: theme.credit.headingGap,
            width: "100%",
          }}
        >
          <div
            style={{
              color: theme.credit.eyebrowColor,
              fontFamily: getFontFamily(theme.credit.eyebrowFont),
              fontSize: theme.credit.eyebrowSize,
              fontWeight: 700,
              letterSpacing: theme.credit.eyebrowLetterSpacing,
              lineHeight: 1.2,
              textShadow: theme.credit.eyebrowShadow,
            }}
          >
            制作クレジット
          </div>
          <div
            style={{
              color: theme.credit.headingColor,
              fontFamily: getFontFamily(theme.credit.headingFont),
              fontSize: headingSize,
              fontWeight: 700,
              letterSpacing: theme.credit.headingLetterSpacing,
              lineHeight: 1.08,
              textShadow: theme.credit.headingShadow,
            }}
          >
            {MOTION_TITLE.main}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gap: theme.credit.gridGap,
            gridTemplateColumns:
              theme.credit.layout === "stack" || compact
                ? "minmax(0, 1fr)"
                : "repeat(2, minmax(0, 1fr))",
          }}
        >
          {sections.map((section) => (
            <CreditSection
              compact={compact}
              key={section.title}
              section={section}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const OverlayMotionTemplate = ({theme, videoMetadata, videoSrc}) => {
  return (
    <AbsoluteFill>
      <Video
        src={staticFile(videoSrc)}
        style={{height: "100%", objectFit: "cover", width: "100%"}}
      />
      <TitleCard
        endMs={videoMetadata.titleEndMs}
        startMs={0}
        theme={theme}
        videoMetadata={videoMetadata}
      />
      <CreditBoard
        endMs={videoMetadata.durationInSeconds * 1000}
        startMs={videoMetadata.creditStartMs}
        theme={theme}
        videoMetadata={videoMetadata}
      />
    </AbsoluteFill>
  );
};

const mergeTheme = (baseTheme, themeOverride = {}) => {
  if (!themeOverride) {
    return baseTheme;
  }

  return {
    ...baseTheme,
    ...themeOverride,
    credit: {
      ...baseTheme.credit,
      ...(themeOverride.credit ?? {}),
    },
    title: {
      ...baseTheme.title,
      ...(themeOverride.title ?? {}),
    },
  };
};

export const createOverlayMotionVariant = (theme) => {
  const VariantComponent = ({themeOverride, videoMetadata, videoSrc}) => {
    const resolvedTheme = mergeTheme(theme, themeOverride);
    return (
      <OverlayMotionTemplate
        theme={resolvedTheme}
        videoMetadata={videoMetadata}
        videoSrc={videoSrc}
      />
    );
  };

  VariantComponent.displayName = theme.name;
  return VariantComponent;
};
