import React from "react";
import {Composition} from "remotion";
import {PreMilkWorkoutPopMotion} from "./compositions/PreMilkWorkoutPopMotion";
import {Variant02MilkBottleLabel} from "./compositions/variants/Variant02MilkBottleLabel.jsx";
import {Variant03StickerAlbum} from "./compositions/variants/Variant03StickerAlbum.jsx";
import {Variant04StorybookRibbon} from "./compositions/variants/Variant04StorybookRibbon.jsx";
import {Variant05ToyCatalog} from "./compositions/variants/Variant05ToyCatalog.jsx";
import {videoMetadata} from "./generated/video-metadata.jsx";

export const RemotionRoot = () => {
  const sharedProps = {
    durationInFrames: videoMetadata.durationInFrames,
    fps: videoMetadata.fps,
    width: videoMetadata.width,
    height: videoMetadata.height,
    defaultProps: {
      videoMetadata,
      videoSrc: videoMetadata.videoSrc,
    },
  };

  return (
    <>
      <Composition
        id="PreMilkWorkoutPopMotion"
        component={PreMilkWorkoutPopMotion}
        {...sharedProps}
      />
      <Composition
        id="PreMilkWorkoutBottleLabel"
        component={Variant02MilkBottleLabel}
        {...sharedProps}
      />
      <Composition
        id="PreMilkWorkoutStickerAlbum"
        component={Variant03StickerAlbum}
        {...sharedProps}
      />
      <Composition
        id="PreMilkWorkoutStorybookRibbon"
        component={Variant04StorybookRibbon}
        {...sharedProps}
      />
      <Composition
        id="PreMilkWorkoutToyCatalog"
        component={Variant05ToyCatalog}
        {...sharedProps}
      />
    </>
  );
};
