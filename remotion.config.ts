// See all configuration options: https://remotion.dev/docs/config
// Each option also is available as a CLI flag: https://remotion.dev/docs/cli

// Note: When using the Node.JS APIs, the config file doesn't apply. Instead, pass options directly to the APIs

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

// Use JPEG for faster renders while keeping maximum quality.
Config.setStillImageFormat("jpeg");
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(100);
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig((config) => {
  const tailwindConfig = enableTailwind(config);
  return {
    ...tailwindConfig,
    experiments: {
      ...tailwindConfig.experiments,
      lazyCompilation: false,
    },
  };
});

// Set explicit codec and encoding settings for stability
Config.setCodec("h264");
Config.setConcurrency(6);
