module.exports = {
  apps: [
    {
      name: "JCWD-0110-04", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8004,
      },
      time: true,
    },
  ],
};
