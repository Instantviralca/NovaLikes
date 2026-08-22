module.exports = {
  apps: [
    {
      name: 'novalikes',
      cwd: '/var/www/novalikes',
      script: './node_modules/next/dist/bin/next',
      // Bind as "localhost" (not 127.0.0.1): Next middleware rewrites to /i18n/…
      // and the runtime must proxy over plain HTTP. HOSTNAME=127.0.0.1 makes
      // Next attempt https://localhost:3000 and fail with EPROTO.
      args: 'start -H localhost -p 3000',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        HOSTNAME: 'localhost',
        PORT: '3000',
      },
    },
  ],
};
