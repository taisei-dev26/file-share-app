const nextconfig = {};

module.exports = nextconfig;

(async () => {
  try {
    const { initOpenNextCloudflareForDev } = await import(
      "@opennextjs/cloudflare"
    );
    initOpenNextCloudflareForDev();
  } catch (error) {
    console.error(error);
  }
})()
