import {cancelRender, continueRender, delayRender, staticFile} from "remotion";

const fontHandle = delayRender("Loading local rounded pop fonts");

const overlayFonts = [
  {
    family: "Hachi Maru Pop",
    file: "fonts/HachiMaruPop-Regular.ttf",
    descriptors: {
      style: "normal",
      weight: "400",
    },
  },
  {
    family: "Mochiy Pop One",
    file: "fonts/MochiyPopOne-Regular.ttf",
    descriptors: {
      style: "normal",
      weight: "400",
    },
  },
  {
    family: "Mochiy Pop P One",
    file: "fonts/MochiyPopPOne-Regular.ttf",
    descriptors: {
      style: "normal",
      weight: "400",
    },
  },
  {
    family: "Yusei Magic",
    file: "fonts/YuseiMagic-Regular.ttf",
    descriptors: {
      style: "normal",
      weight: "400",
    },
  },
  {
    family: "Zen Maru Gothic",
    file: "fonts/ZenMaruGothic-Regular.ttf",
    descriptors: {
      style: "normal",
      weight: "400",
    },
  },
  {
    family: "Zen Maru Gothic",
    file: "fonts/ZenMaruGothic-Bold.ttf",
    descriptors: {
      style: "normal",
      weight: "700",
    },
  },
  {
    family: "Zen Maru Gothic",
    file: "fonts/ZenMaruGothic-Black.ttf",
    descriptors: {
      style: "normal",
      weight: "900",
    },
  },
];

let loadStarted = false;
let loadFinished = false;

const finishLoading = () => {
  if (loadFinished) {
    return;
  }

  loadFinished = true;
  continueRender(fontHandle);
};

const loadFontFace = async ({descriptors, family, file}) => {
  const font = new FontFace(family, `url("${staticFile(file)}")`, descriptors);
  await font.load();
  document.fonts.add(font);
  const verified = document.fonts.check(`${descriptors.weight} 32px "${family}"`);
  if (!verified) {
    throw new Error(`Font verification failed for ${family} (${descriptors.weight}) from ${file}`);
  }
};

export const ensureLocalOverlayFonts = () => {
  if (loadStarted) {
    return;
  }

  loadStarted = true;

  if (typeof document === "undefined" || typeof FontFace === "undefined") {
    finishLoading();
    return;
  }

  Promise.all(overlayFonts.map((font) => loadFontFace(font)))
    .then(finishLoading)
    .catch((error) => {
      console.error("Failed to load local overlay fonts.", error);
      cancelRender(error);
    });
};

ensureLocalOverlayFonts();
